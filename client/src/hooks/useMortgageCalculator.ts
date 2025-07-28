import { useState, useMemo } from 'react';
import { z } from 'zod';

const MortgageInputSchema = z.object({
  homePrice: z.number().min(1000).max(10000000),
  downPayment: z.number().min(0),
  downPaymentType: z.enum(['dollar', 'percent']),
  loanTerm: z.number().min(1).max(50),
  interestRate: z.number().min(0).max(50),
  propertyTaxRate: z.number().min(0).max(10),
  homeInsurance: z.number().min(0),
  includePMI: z.boolean(),
});

export type MortgageInputs = z.infer<typeof MortgageInputSchema>;

export interface MortgageResults {
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTaxes: number;
  homeInsurance: number;
  pmi: number;
  loanAmount: number;
  downPaymentAmount: number;
  totalInterest: number;
  payoffDate: Date;
}

export function useMortgageCalculator() {
  const [inputs, setInputs] = useState<MortgageInputs>({
    homePrice: 400000,
    downPayment: 20,
    downPaymentType: 'percent',
    loanTerm: 30,
    interestRate: 6.5,
    propertyTaxRate: 1.2,
    homeInsurance: 1200,
    includePMI: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateInput = (key: keyof MortgageInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateInputs = () => {
    try {
      MortgageInputSchema.parse(inputs);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const results = useMemo<MortgageResults>(() => {
    const {
      homePrice,
      downPayment,
      downPaymentType,
      loanTerm,
      interestRate,
      propertyTaxRate,
      homeInsurance,
      includePMI
    } = inputs;

    // Calculate down payment amount
    const downPaymentAmount = downPaymentType === 'percent' 
      ? (homePrice * downPayment) / 100
      : downPayment;

    // Calculate loan amount
    const loanAmount = homePrice - downPaymentAmount;

    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate principal and interest using mortgage formula
    let principalAndInterest = 0;
    if (monthlyRate > 0) {
      principalAndInterest = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      principalAndInterest = loanAmount / numberOfPayments;
    }

    // Calculate monthly property taxes
    const propertyTaxes = (homePrice * propertyTaxRate / 100) / 12;

    // Calculate monthly home insurance
    const monthlyInsurance = homeInsurance / 12;

    // Calculate PMI (typically 0.3% to 1.5% of loan amount annually)
    const downPaymentPercent = (downPaymentAmount / homePrice) * 100;
    let pmi = 0;
    if (includePMI && downPaymentPercent < 20) {
      pmi = (loanAmount * 0.005) / 12; // 0.5% annually
    }

    // Calculate total monthly payment
    const monthlyPayment = principalAndInterest + propertyTaxes + monthlyInsurance + pmi;

    // Calculate total interest over life of loan
    const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;

    // Calculate payoff date
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + numberOfPayments);

    return {
      monthlyPayment,
      principalAndInterest,
      propertyTaxes,
      homeInsurance: monthlyInsurance,
      pmi,
      loanAmount,
      downPaymentAmount,
      totalInterest,
      payoffDate,
    };
  }, [inputs]);

  return {
    inputs,
    updateInput,
    results,
    errors,
    validateInputs,
  };
} 