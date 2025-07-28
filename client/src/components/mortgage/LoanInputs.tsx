import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, DollarSign, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MortgageInputs } from '@/hooks/useMortgageCalculator';

interface LoanInputsProps {
  inputs: MortgageInputs;
  updateInput: (key: keyof MortgageInputs, value: any) => void;
  errors: Record<string, string>;
}

export function LoanInputs({ inputs, updateInput, errors }: LoanInputsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handleHomePriceChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
      updateInput('homePrice', numValue);
    }
  };

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
      updateInput('downPayment', numValue);
    }
  };

  const downPaymentAmount = inputs.downPaymentType === 'percent' 
    ? (inputs.homePrice * inputs.downPayment) / 100
    : inputs.downPayment;

  const downPaymentPercent = (downPaymentAmount / inputs.homePrice) * 100;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Home Price */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="homePrice" className="text-slate-700 font-medium">
              Home Price
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The total purchase price of the home</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="homePrice"
            type="text"
            value={formatCurrency(inputs.homePrice)}
            onChange={(e) => handleHomePriceChange(e.target.value)}
            className="text-lg h-12 text-slate-800"
            placeholder="$400,000"
          />
          {errors.homePrice && (
            <p className="text-red-500 text-sm">{errors.homePrice}</p>
          )}
        </motion.div>

        {/* Down Payment */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-slate-700 font-medium">Down Payment</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Amount paid upfront. 20% or more avoids PMI.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={inputs.downPaymentType === 'dollar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateInput('downPaymentType', 'dollar')}
                className="h-8"
              >
                <DollarSign className="w-3 h-3" />
              </Button>
              <Button
                variant={inputs.downPaymentType === 'percent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateInput('downPaymentType', 'percent')}
                className="h-8"
              >
                <Percent className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {inputs.downPaymentType === 'percent' ? (
            <div className="space-y-3">
              <div className="px-4">
                <Slider
                  value={[inputs.downPayment]}
                  onValueChange={(value) => updateInput('downPayment', value[0])}
                  max={50}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPercent(inputs.downPayment)}</span>
                <span>{formatCurrency(downPaymentAmount)}</span>
              </div>
            </div>
          ) : (
            <Input
              type="text"
              value={formatCurrency(inputs.downPayment)}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="h-12 text-lg"
              placeholder="$80,000"
            />
          )}

          {downPaymentPercent < 20 && (
            <motion.div 
              className="text-amber-600 text-sm bg-amber-50 p-3 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              💡 With less than 20% down, you'll likely need PMI insurance
            </motion.div>
          )}
        </motion.div>

        {/* Interest Rate */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Label className="text-slate-700 font-medium">Interest Rate</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Annual interest rate for your mortgage loan</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="px-4">
            <Slider
              value={[inputs.interestRate]}
              onValueChange={(value) => updateInput('interestRate', value[0])}
              max={12}
              min={3}
              step={0.1}
              className="w-full"
            />
          </div>
          <div className="text-center text-lg font-semibold text-slate-800">
            {formatPercent(inputs.interestRate)}
          </div>
        </motion.div>

        {/* Loan Term */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Label className="text-slate-700 font-medium">Loan Term</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of years to pay off the loan</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={inputs.loanTerm === term ? 'default' : 'outline'}
                onClick={() => updateInput('loanTerm', term)}
                className="h-12"
              >
                {term} years
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between text-slate-600 hover:text-slate-800"
            >
              Advanced Options
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </CollapsibleTrigger>
          
          <AnimatePresence>
            {showAdvanced && (
              <CollapsibleContent asChild>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mt-4">
                    <CardContent className="p-4 space-y-4">
                      {/* Property Tax Rate */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-slate-700 font-medium">Property Tax Rate</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Annual property tax as % of home value</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="px-2">
                          <Slider
                            value={[inputs.propertyTaxRate]}
                            onValueChange={(value) => updateInput('propertyTaxRate', value[0])}
                            max={5}
                            min={0.1}
                            step={0.1}
                            className="w-full"
                          />
                        </div>
                        <div className="text-center text-sm text-slate-600">
                          {formatPercent(inputs.propertyTaxRate)} 
                          <span className="text-gray-500"> ({formatCurrency((inputs.homePrice * inputs.propertyTaxRate / 100) / 12)}/month)</span>
                        </div>
                      </div>

                      {/* Home Insurance */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label className="text-slate-700 font-medium">Home Insurance (Annual)</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Annual homeowner's insurance premium</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          type="text"
                          value={formatCurrency(inputs.homeInsurance)}
                          onChange={(e) => {
                            const numValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                            if (!isNaN(numValue)) {
                              updateInput('homeInsurance', numValue);
                            }
                          }}
                          className="h-10"
                          placeholder="$1,200"
                        />
                      </div>

                      {/* PMI Toggle */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-slate-700 font-medium">Include PMI</Label>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Private Mortgage Insurance (required if down payment &lt; 20%)</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Switch
                          checked={inputs.includePMI}
                          onCheckedChange={(checked) => updateInput('includePMI', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CollapsibleContent>
            )}
          </AnimatePresence>
        </Collapsible>
      </div>
    </TooltipProvider>
  );
} 