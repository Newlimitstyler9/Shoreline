import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Calculator, 
  DollarSign, 
  Home, 
  TrendingUp,
  ArrowRight,
  Users
} from "lucide-react";

export default function MortgageCalculator() {
  const [formData, setFormData] = useState({
    homePrice: 500000,
    downPayment: 100000,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTax: 5000,
    insurance: 1200
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateMortgage = () => {
    const principal = formData.homePrice - formData.downPayment;
    const monthlyRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;
    
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const monthlyPaymentAmount = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(monthlyPaymentAmount);
    }
    
    const totalMonthlyPayment = monthlyPayment + (formData.propertyTax / 12) + (formData.insurance / 12);
    setMonthlyPayment(totalMonthlyPayment);
    
    const totalPayments = totalMonthlyPayment * numberOfPayments;
    setTotalPayment(totalPayments);
    
    const totalInterestPaid = totalPayments - principal;
    setTotalInterest(totalInterestPaid);
  };

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downPaymentPercentage = ((formData.downPayment / formData.homePrice) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              Mortgage Calculator
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto mb-8">
              Calculate your monthly mortgage payments and understand the true cost of homeownership
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg font-semibold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Get Pre-Approved
                </Button>
              </Link>
              <Link href="/buyers-guide">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg font-semibold"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Buyer's Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-gray">
                  <Calculator className="w-6 h-6 mr-2 text-soft-blue" />
                  Calculate Your Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="homePrice" className="text-sm font-medium text-slate-gray">
                    Home Price
                  </Label>
                  <Input
                    id="homePrice"
                    type="number"
                    value={formData.homePrice}
                    onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                    className="mt-1"
                    placeholder="500,000"
                  />
                </div>

                <div>
                  <Label htmlFor="downPayment" className="text-sm font-medium text-slate-gray">
                    Down Payment
                  </Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="mt-1"
                    placeholder="100,000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {downPaymentPercentage}% down payment
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interestRate" className="text-sm font-medium text-slate-gray">
                      Interest Rate (%)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                      className="mt-1"
                      placeholder="6.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm" className="text-sm font-medium text-slate-gray">
                      Loan Term (Years)
                    </Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                      className="mt-1"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyTax" className="text-sm font-medium text-slate-gray">
                      Annual Property Tax
                    </Label>
                    <Input
                      id="propertyTax"
                      type="number"
                      value={formData.propertyTax}
                      onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                      className="mt-1"
                      placeholder="5,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance" className="text-sm font-medium text-slate-gray">
                      Annual Insurance
                    </Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', Number(e.target.value))}
                      className="mt-1"
                      placeholder="1,200"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateMortgage}
                  className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-slate-gray">Monthly Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-soft-blue">
                      {formatCurrency(monthlyPayment)}
                    </div>
                    <p className="text-gray-600">per month</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600">Principal & Interest</div>
                      <div className="font-semibold text-slate-gray">
                        {formatCurrency(monthlyPayment - (formData.propertyTax / 12) - (formData.insurance / 12))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600">Property Tax</div>
                      <div className="font-semibold text-slate-gray">
                        {formatCurrency(formData.propertyTax / 12)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600">Insurance</div>
                      <div className="font-semibold text-slate-gray">
                        {formatCurrency(formData.insurance / 12)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600">Down Payment</div>
                      <div className="font-semibold text-slate-gray">
                        {formatCurrency(formData.downPayment)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-slate-gray">Total Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Interest Paid</span>
                    <span className="font-semibold text-slate-gray">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-semibold text-slate-gray">{formatCurrency(totalPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-semibold text-slate-gray">
                      {formatCurrency(formData.homePrice - formData.downPayment)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get pre-approved and start your home buying journey with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-gray mb-2">Get Pre-Approved</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Work with our trusted mortgage partners to get pre-approved quickly
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Start Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-gray mb-2">Find Your Home</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Search our extensive database of properties in St. Petersburg
                </p>
                <Link href="/idx-search">
                  <Button variant="outline" className="w-full">
                    Search Properties
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-gray mb-2">Market Insights</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay informed about current market trends and interest rates
                </p>
                <Link href="/blog">
                  <Button variant="outline" className="w-full">
                    Read Blog
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 