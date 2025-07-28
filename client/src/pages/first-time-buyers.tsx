import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Home, 
  CheckCircle, 
  DollarSign, 
  Calculator, 
  Users, 
  Shield,
  TrendingUp,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Award,
  Clock,
  MapPin,
  CreditCard,
  Building2,
  Heart
} from 'lucide-react';
import { trackEvent, trackContact } from '@/lib/analytics';
import { Link } from 'wouter';

export default function FirstTimeBuyers() {
  const handleContactClick = () => {
    trackContact('click', 'first_time_buyers');
  };

  const handleCalculatorClick = () => {
    trackEvent('navigation', 'engagement', 'first_time_buyers_to_calculator');
  };

  const buyingSteps = [
    {
      step: 1,
      title: "Get Pre-Approved",
      description: "Understand your budget and get pre-approved for a mortgage before house hunting.",
      details: [
        "Check your credit score",
        "Gather financial documents",
        "Meet with mortgage lenders",
        "Get pre-approval letter"
      ],
      icon: CreditCard
    },
    {
      step: 2,
      title: "Define Your Needs",
      description: "Create a clear picture of what you want in your first home and where you want to live.",
      details: [
        "List must-have features",
        "Choose preferred neighborhoods",
        "Set realistic budget range",
        "Consider future needs"
      ],
      icon: Home
    },
    {
      step: 3,
      title: "Start House Hunting",
      description: "Work with your agent to find homes that match your criteria and budget.",
      details: [
        "Set up property alerts",
        "Schedule home tours",
        "Compare properties",
        "Ask questions during viewings"
      ],
      icon: MapPin
    },
    {
      step: 4,
      title: "Make an Offer",
      description: "When you find the right home, your agent will help you make a competitive offer.",
      details: [
        "Review comparable sales",
        "Determine offer price",
        "Include contingencies",
        "Submit offer package"
      ],
      icon: DollarSign
    },
    {
      step: 5,
      title: "Home Inspection & Appraisal",
      description: "Protect your investment with thorough inspections and ensure proper valuation.",
      details: [
        "Schedule home inspection",
        "Review inspection report",
        "Address any issues",
        "Complete appraisal process"
      ],
      icon: Shield
    },
    {
      step: 6,
      title: "Closing Day",
      description: "Sign final paperwork and get the keys to your new home!",
      details: [
        "Review closing documents",
        "Bring required funds",
        "Sign final paperwork",
        "Receive keys and move in"
      ],
      icon: Award
    }
  ];

  const commonMistakes = [
    {
      title: "Skipping Pre-Approval",
      description: "Getting pre-approved first saves time and shows sellers you're serious.",
      tip: "Get pre-approved before house hunting to know your true budget."
    },
    {
      title: "Not Considering All Costs",
      description: "Beyond the purchase price, factor in taxes, insurance, maintenance, and utilities.",
      tip: "Budget 1-3% of home value annually for maintenance and repairs."
    },
    {
      title: "Making Emotional Decisions",
      description: "Don't let emotions override practical considerations and budget constraints.",
      tip: "Stick to your must-have list and don't compromise on major deal-breakers."
    },
    {
      title: "Skipping Home Inspection",
      description: "A professional inspection can reveal costly issues before you buy.",
      tip: "Always get a home inspection, even if the home looks perfect."
    },
    {
      title: "Not Researching Neighborhoods",
      description: "Visit neighborhoods at different times to understand the area fully.",
      tip: "Check crime rates, school districts, and future development plans."
    }
  ];

  const firstTimeBuyerPrograms = [
    {
      name: "FHA Loans",
      description: "Federal Housing Administration loans with low down payment requirements.",
      downPayment: "3.5%",
      creditScore: "580+",
      pros: ["Low down payment", "Flexible credit requirements", "Competitive rates"],
      cons: ["Mortgage insurance required", "Loan limits apply"]
    },
    {
      name: "VA Loans",
      description: "Veterans Affairs loans for military service members and veterans.",
      downPayment: "0%",
      creditScore: "580+",
      pros: ["No down payment", "No PMI", "Competitive rates", "Limited closing costs"],
      cons: ["Military service required", "Funding fee applies"]
    },
    {
      name: "Conventional Loans",
      description: "Traditional mortgages with various down payment options.",
      downPayment: "3-20%",
      creditScore: "620+",
      pros: ["No PMI with 20% down", "Flexible terms", "Competitive rates"],
      cons: ["Higher credit requirements", "Larger down payment needed"]
    },
    {
      name: "USDA Loans",
      description: "Rural Development loans for eligible rural and suburban areas.",
      downPayment: "0%",
      creditScore: "640+",
      pros: ["No down payment", "Low rates", "No PMI"],
      cons: ["Location restrictions", "Income limits apply"]
    }
  ];

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
                <Home className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              First-Time Homebuyer Guide
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
              Your complete guide to buying your first home in St. Petersburg. 
              We'll walk you through every step of the process with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleContactClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get Started Today
                </Button>
              </Link>
              <Link href="/mortgage-calculator">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                  onClick={handleCalculatorClick}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Mortgage Calculator
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us for First-Time Buyers */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Why First-Time Buyers Choose Shoreline Realty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in helping first-time buyers navigate the complex home buying process with confidence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "First-Time Buyer Specialists",
                description: "Our team has helped hundreds of first-time buyers achieve their homeownership dreams"
              },
              {
                icon: Shield,
                title: "Complete Protection",
                description: "We guide you through every step to avoid common pitfalls and protect your investment"
              },
              {
                icon: Clock,
                title: "Patient Guidance",
                description: "We take the time to explain everything and answer all your questions thoroughly"
              },
              {
                icon: Star,
                title: "Proven Results",
                description: "95% of our first-time buyers successfully close on their dream home"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-gray mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6-Step Buying Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-gray mb-4">
              Your 6-Step Home Buying Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven process that makes buying your first home simple and stress-free
            </p>
          </motion.div>

          <div className="space-y-8">
            {buyingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Step Number & Icon */}
                      <div className="lg:col-span-2 bg-gray-50 p-6 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <Badge variant="outline" className="text-sm font-medium">
                          Step {step.step}
                        </Badge>
                      </div>

                      {/* Content */}
                      <CardContent className="lg:col-span-10 p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-gray mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* First-Time Buyer Programs */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              First-Time Buyer Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Special loan programs designed to make homeownership more accessible for first-time buyers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {firstTimeBuyerPrograms.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-slate-gray">{program.name}</CardTitle>
                    <p className="text-gray-600">{program.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Down Payment:</span>
                        <p className="text-soft-blue font-semibold">{program.downPayment}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Credit Score:</span>
                        <p className="text-soft-blue font-semibold">{program.creditScore}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {program.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-amber-600 mb-2">Considerations:</h4>
                      <ul className="space-y-1">
                        {program.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-center gap-2 text-sm">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes to Avoid */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Common First-Time Buyer Mistakes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from others' experiences and avoid these common pitfalls
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonMistakes.map((mistake, index) => (
              <motion.div
                key={mistake.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-gray mb-3">
                      {mistake.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {mistake.description}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-800 text-sm font-medium">
                        💡 {mistake.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions from first-time buyers
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How much do I need for a down payment?",
                  answer: "Down payment requirements vary by loan type. FHA loans require 3.5%, conventional loans can be as low as 3%, and VA/USDA loans require 0%. We'll help you find the best option for your situation."
                },
                {
                  question: "What credit score do I need to buy a home?",
                  answer: "Credit score requirements range from 580 for FHA loans to 620+ for conventional loans. Higher scores get better rates. We can help you improve your credit if needed."
                },
                {
                  question: "How long does the home buying process take?",
                  answer: "From pre-approval to closing typically takes 30-60 days. The timeline depends on market conditions, loan type, and how quickly you find the right home."
                },
                {
                  question: "What are closing costs?",
                  answer: "Closing costs typically range from 2-5% of the home price and include loan origination fees, title insurance, appraisal, and other expenses. We'll provide a detailed estimate upfront."
                },
                {
                  question: "Should I get pre-approved or pre-qualified?",
                  answer: "Get pre-approved, not just pre-qualified. Pre-approval involves a thorough credit and financial review, making your offer more attractive to sellers and giving you confidence in your budget."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold text-slate-gray">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Buy Your First Home?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Let our first-time buyer specialists guide you through every step of the process. 
              We'll make your homeownership dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link href="/contact" className="flex-1">
                <Button 
                  size="lg"
                  className="w-full bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleContactClick}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/mortgage-calculator" className="flex-1">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-soft-blue px-8 py-4 text-lg"
                  onClick={handleCalculatorClick}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Payments
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-gray mb-6">
              Additional Resources for First-Time Buyers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Mortgage Calculator",
                  description: "Calculate your monthly payments and see how much home you can afford",
                  link: "/mortgage-calculator",
                  icon: Calculator
                },
                {
                  title: "Neighborhood Guide",
                  description: "Explore St. Petersburg neighborhoods to find your perfect location",
                  link: "/neighborhoods",
                  icon: MapPin
                },
                {
                  title: "Market Analysis",
                  description: "Stay informed about current market trends and pricing in St. Petersburg",
                  link: "/market-analysis",
                  icon: TrendingUp
                }
              ].map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={resource.link}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-ocean-blue transition-colors">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-slate-gray mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {resource.description}
                          </p>
                          <div className="inline-flex items-center text-soft-blue text-sm group-hover:text-ocean-blue transition-colors">
                            Learn More
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 