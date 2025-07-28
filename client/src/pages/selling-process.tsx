import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  Camera, 
  FileText, 
  Users, 
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'wouter';

export default function SellingProcess() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('normal');

  const handleGetStartedClick = () => {
    trackEvent('selling_process_get_started', 'engagement', 'cta_button');
  };

  const handleValuationClick = () => {
    trackEvent('selling_process_valuation_click', 'engagement', 'valuation_cta');
  };

  const sellingSteps = [
    {
      step: 1,
      title: "Initial Consultation & Market Analysis",
      duration: "Week 1",
      description: "We'll meet to discuss your goals, timeline, and provide a comprehensive market analysis of your home's value.",
      details: [
        "Free in-home consultation",
        "Comparative Market Analysis (CMA)",
        "Pricing strategy discussion",
        "Timeline and goals assessment"
      ],
      icon: MessageSquare,
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Preparation & Home Staging",
      duration: "Weeks 2-3",
      description: "Prepare your home to make the best impression on potential buyers with strategic improvements and staging.",
      details: [
        "Home staging consultation",
        "Recommended improvements",
        "Deep cleaning coordination",
        "Decluttering guidance"
      ],
      icon: Home,
      color: "bg-green-500"
    },
    {
      step: 3,
      title: "Professional Photography & Marketing",
      duration: "Week 4",
      description: "Showcase your home with professional photography and create compelling marketing materials.",
      details: [
        "Professional photography session",
        "Virtual tour creation",
        "Marketing materials design",
        "MLS listing preparation"
      ],
      icon: Camera,
      color: "bg-purple-500"
    },
    {
      step: 4,
      title: "Launch Marketing Campaign",
      duration: "Week 5",
      description: "Go live with your listing across all major platforms and begin showing your home to qualified buyers.",
      details: [
        "MLS listing activation",
        "Online marketing launch",
        "Social media promotion",
        "Schedule showings and open houses"
      ],
      icon: TrendingUp,
      color: "bg-orange-500"
    },
    {
      step: 5,
      title: "Showings & Negotiations",
      duration: "Weeks 6-8",
      description: "Host showings, review offers, and negotiate the best terms for your sale.",
      details: [
        "Coordinate showings",
        "Collect and review offers",
        "Negotiate terms and price",
        "Accept best offer"
      ],
      icon: Users,
      color: "bg-red-500"
    },
    {
      step: 6,
      title: "Closing Process",
      duration: "Weeks 9-12",
      description: "Navigate the closing process from contract to keys, ensuring a smooth transaction.",
      details: [
        "Contract execution",
        "Buyer inspections coordination",
        "Appraisal facilitation",
        "Final walkthrough and closing"
      ],
      icon: Award,
      color: "bg-indigo-500"
    }
  ];

  const timeframes = [
    {
      id: 'fast',
      title: 'Fast Sale (6-8 Weeks)',
      description: 'Aggressive pricing and marketing for quick sale',
      pros: ['Quick closing', 'Less time on market', 'Reduced holding costs'],
      cons: ['May sell below market value', 'Limited negotiation time']
    },
    {
      id: 'normal',
      title: 'Standard Timeline (8-12 Weeks)',
      description: 'Balanced approach for optimal price and timeline',
      pros: ['Market value pricing', 'Time for multiple offers', 'Better negotiation position'],
      cons: ['Longer market exposure', 'Ongoing maintenance costs']
    },
    {
      id: 'premium',
      title: 'Premium Strategy (12+ Weeks)',
      description: 'Maximum value approach with premium marketing',
      pros: ['Highest possible price', 'Luxury marketing', 'Selective buyer pool'],
      cons: ['Longer time commitment', 'Higher holding costs', 'Market risk']
    }
  ];

  const whyChooseUs = [
    {
      icon: Star,
      title: "5-Star Service",
      description: "Consistently rated as the top real estate team in St. Petersburg"
    },
    {
      icon: TrendingUp,
      title: "Above Market Results",
      description: "Our homes sell for an average of 3% above market price"
    },
    {
      icon: Zap,
      title: "Faster Sales",
      description: "Average time on market: 18 days vs. 45 days market average"
    },
    {
      icon: ShieldCheck,
      title: "Full-Service Support",
      description: "From staging to closing, we handle every detail of your sale"
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
              Our Proven Selling Process
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
              A step-by-step approach that maximizes your home's value and minimizes time on market. 
              From consultation to closing, we're with you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleGetStartedClick}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                  onClick={handleValuationClick}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Free Home Valuation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 6-Step Process */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-gray mb-4">
              Our 6-Step Selling Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven system that has helped hundreds of St. Petersburg homeowners achieve their selling goals
            </p>
          </motion.div>

          <div className="space-y-8">
            {sellingSteps.map((step, index) => {
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
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <Badge variant="outline" className="text-sm font-medium">
                          Step {step.step}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          {step.duration}
                        </p>
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

      {/* Timeline Options */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Choose Your Selling Strategy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every seller has different priorities. We'll customize our approach based on your timeline and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeframes.map((timeframe, index) => (
              <motion.div
                key={timeframe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all hover:shadow-lg ${
                    selectedTimeframe === timeframe.id ? 'ring-2 ring-soft-blue border-soft-blue' : ''
                  }`}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-gray">
                      {timeframe.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {timeframe.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Advantages:</h4>
                      <ul className="space-y-1">
                        {timeframe.pros.map((pro, proIndex) => (
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
                        {timeframe.cons.map((con, conIndex) => (
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

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-4">
              Why Sellers Choose Shoreline Realty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven track record speaks for itself. Here's what sets us apart in the St. Petersburg market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
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

      {/* CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Sell Your Home?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Get started with a free consultation and home valuation. 
              No obligation – just expert advice about your selling options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link href="/contact" className="flex-1">
                <Button 
                  size="lg"
                  className="w-full bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={handleGetStartedClick}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-soft-blue px-8 py-4 text-lg"
                  onClick={handleValuationClick}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Get Home Value
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-gray mb-6">
              Additional Resources for Sellers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Seller's Guide",
                  description: "Complete guide to selling your home in today's market",
                  link: "/sellers-guide",
                  icon: FileText
                },
                {
                  title: "Market Analysis",
                  description: "Current St. Petersburg market trends and pricing data",
                  link: "/market-analysis",
                  icon: TrendingUp
                },
                {
                  title: "Home Staging Tips",
                  description: "Prepare your home to sell faster and for more money",
                  link: "/blog",
                  icon: Home
                }
              ].map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
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