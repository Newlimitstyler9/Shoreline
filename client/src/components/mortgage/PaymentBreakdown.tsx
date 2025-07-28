import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Home, Shield, Receipt, CreditCard, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { MortgageResults } from '@/hooks/useMortgageCalculator';

interface PaymentBreakdownProps {
  results: MortgageResults;
}

export function PaymentBreakdown({ results }: PaymentBreakdownProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const paymentComponents = [
    {
      label: 'Principal & Interest',
      amount: results.principalAndInterest,
      icon: Home,
      color: 'bg-blue-500',
      description: 'The main loan payment'
    },
    {
      label: 'Property Taxes',
      amount: results.propertyTaxes,
      icon: Receipt,
      color: 'bg-green-500',
      description: 'Monthly property tax escrow'
    },
    {
      label: 'Home Insurance',
      amount: results.homeInsurance,
      icon: Shield,
      color: 'bg-orange-500',
      description: 'Monthly insurance premium'
    },
    {
      label: 'PMI',
      amount: results.pmi,
      icon: CreditCard,
      color: 'bg-purple-500',
      description: 'Private mortgage insurance'
    }
  ].filter(component => component.amount > 0);

  const getPercentage = (amount: number) => {
    return (amount / results.monthlyPayment) * 100;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Main Payment Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="text-center border-2 border-soft-blue shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-2">
              <p className="text-slate-600 text-lg">Monthly Payment</p>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-soft-blue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {formatCurrency(results.monthlyPayment)}
              </motion.div>
              <p className="text-slate-500">Principal, Interest, Taxes & Insurance</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentComponents.map((component, index) => {
              const Icon = component.icon;
              const percentage = getPercentage(component.amount);
              
              return (
                <motion.div
                  key={component.label}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${component.color} text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{component.label}</p>
                        <p className="text-sm text-slate-500">{component.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-800">
                        {formatCurrency(component.amount)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Loan Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-soft-blue" />
                <h3 className="font-semibold text-slate-700">Loan Details</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Loan Amount:</span>
                  <span className="font-medium">{formatCurrency(results.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Down Payment:</span>
                  <span className="font-medium">{formatCurrency(results.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payoff Date:</span>
                  <span className="font-medium">{formatDate(results.payoffDate)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-soft-blue" />
                <h3 className="font-semibold text-slate-700">Total Cost</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Interest:</span>
                  <span className="font-medium text-orange-600">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Payments:</span>
                  <span className="font-medium">
                    {formatCurrency(results.loanAmount + results.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold text-slate-700">Total Cost:</span>
                  <span className="font-bold text-slate-800">
                    {formatCurrency(results.loanAmount + results.totalInterest + results.downPaymentAmount)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Helpful Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-800 mb-3">💡 Money-Saving Tips</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• <strong>20% down payment</strong> eliminates PMI, saving you {formatCurrency(results.pmi)} monthly</p>
              <p>• <strong>Shorter loan terms</strong> mean higher monthly payments but significant interest savings</p>
              <p>• <strong>Extra payments</strong> toward principal can reduce your loan term by years</p>
              <p>• <strong>Shop around</strong> for better interest rates - even 0.25% can save thousands</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 