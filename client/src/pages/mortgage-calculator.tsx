import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Home, TrendingUp, Users, Phone } from 'lucide-react';
import { useMortgageCalculator } from '@/hooks/useMortgageCalculator';
import { LoanInputs } from '@/components/mortgage/LoanInputs';
import { PaymentBreakdown } from '@/components/mortgage/PaymentBreakdown';
import { trackEvent, trackContact } from '@/lib/analytics';
import { Link } from 'wouter';

export default function MortgageCalculator() {
  const { inputs, updateInput, results, errors, validateInputs } = useMortgageCalculator();

  const handleContactClick = () => {
    trackContact('click', 'mortgage_calculator');
    window.location.href = '/contact';
  };

  const handlePropertiesClick = () => {
    trackEvent('navigation', 'engagement', 'mortgage_calculator_to_properties');
    window.location.href = '/properties';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-16 md:py-24">
        <div className="container-width">
          <motion.div 
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <Calculator className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mortgage Calculator
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Calculate your monthly mortgage payments and see how different loan terms 
              affect your budget. Plan your home purchase with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-slate-700 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Loan Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <LoanInputs 
                    inputs={inputs} 
                    updateInput={updateInput} 
                    errors={errors} 
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PaymentBreakdown results={results} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Why Use Our Calculator?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get accurate estimates and understand all aspects of your future mortgage payment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'Accurate Calculations',
                description: 'Uses standard mortgage formulas with real-time updates as you adjust inputs'
              },
              {
                icon: TrendingUp,
                title: 'Complete Breakdown',
                description: 'See exactly where your money goes: principal, interest, taxes, and insurance'
              },
              {
                icon: Users,
                title: 'Expert Guidance',
                description: 'Get tips and insights to help you make informed financial decisions'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Ready to Start Your Home Search?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Now that you know your budget, explore available properties or get pre-approved with our recommended lenders
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link href="/properties">
              <Button 
                size="lg" 
                className="w-full bg-soft-blue text-white hover:bg-ocean-blue h-16 text-lg"
                onClick={handlePropertiesClick}
              >
                <Home className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white h-16 text-lg"
                onClick={handleContactClick}
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to an Expert
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-gray mb-6">
              Helpful Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'First-Time Buyer Guide',
                  description: 'Everything you need to know about buying your first home',
                  link: '/buyers-guide'
                },
                {
                  title: 'Mortgage Pre-Approval',
                  description: 'Learn how to get pre-approved and strengthen your offer',
                  link: '/contact'
                },
                {
                  title: 'St. Petersburg Market',
                  description: 'Current market trends and neighborhood insights',
                  link: '/neighborhoods'
                }
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <Link href={resource.link}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-slate-700 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {resource.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 