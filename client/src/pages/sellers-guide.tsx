import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Home, 
  Calculator, 
  DollarSign, 
  FileText, 
  Users, 
  Award, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Shield
} from "lucide-react";

export default function SellersGuide() {
  const steps = [
    {
      number: "01",
      title: "Get a Home Valuation",
      description: "Understand your home's current market value and potential selling price.",
      icon: Calculator,
      details: [
        "Professional market analysis",
        "Comparable sales review",
        "Property condition assessment",
        "Pricing strategy development"
      ]
    },
    {
      number: "02",
      title: "Prepare Your Home",
      description: "Make necessary repairs, improvements, and staging to maximize your home's appeal.",
      icon: Home,
      details: [
        "Repairs and maintenance",
        "Decluttering and cleaning",
        "Professional staging",
        "Curb appeal enhancement"
      ]
    },
    {
      number: "03",
      title: "List Your Property",
      description: "Your agent will create compelling marketing materials and list your home.",
      icon: FileText,
      details: [
        "Professional photography",
        "Virtual tours and videos",
        "MLS listing creation",
        "Marketing campaign launch"
      ]
    },
    {
      number: "04",
      title: "Show Your Home",
      description: "Host open houses and private showings to attract potential buyers.",
      icon: Users,
      details: [
        "Open house scheduling",
        "Private showing coordination",
        "Buyer feedback collection",
        "Market response monitoring"
      ]
    },
    {
      number: "05",
      title: "Review Offers",
      description: "Evaluate offers with your agent and negotiate the best terms.",
      icon: DollarSign,
      details: [
        "Offer analysis and comparison",
        "Negotiation strategy",
        "Counter-offer preparation",
        "Acceptance and contract signing"
      ]
    },
    {
      number: "06",
      title: "Close the Sale",
      description: "Complete inspections, appraisals, and finalize the transaction.",
      icon: Award,
      details: [
        "Buyer inspections",
        "Property appraisal",
        "Title and escrow process",
        "Final closing and move-out"
      ]
    }
  ];

  const resources = [
    {
      title: "Home Valuation",
      description: "Get an accurate estimate of your home's current market value.",
      href: "/home-valuation",
      icon: Calculator
    },
    {
      title: "Selling Process",
      description: "Learn about the complete selling process and timeline.",
      href: "/selling-process",
      icon: FileText
    },
    {
      title: "Market Analysis",
      description: "Understand current market trends and conditions in St. Petersburg.",
      href: "/market-analysis",
      icon: TrendingUp
    }
  ];

  const tips = [
    {
      title: "Price It Right",
      description: "Set a competitive price based on market analysis, not emotions.",
      icon: DollarSign
    },
    {
      title: "First Impressions Matter",
      description: "Invest in curb appeal and professional photography to attract buyers.",
      icon: Home
    },
    {
      title: "Be Flexible",
      description: "Consider reasonable offers and be open to negotiation on terms.",
      icon: Shield
    },
    {
      title: "Work with Professionals",
      description: "Choose an experienced agent who knows the local market well.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              Complete Seller's Guide
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto mb-8">
              Maximize your home's value and sell quickly with our proven strategies and expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home-valuation">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg font-semibold"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Valuation
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg font-semibold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find a Listing Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Home Selling Process */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              The Home Selling Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow these 6 steps to successfully sell your home for maximum value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-soft-blue text-white text-lg px-3 py-1">
                        {step.number}
                      </Badge>
                      <IconComponent className="w-8 h-8 text-soft-blue group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-xl text-slate-gray">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selling Tips */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              Pro Tips for Sellers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow these expert tips to maximize your home's selling potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-gray mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              Additional Resources
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore these helpful tools and guides to maximize your selling success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Link key={index} href={resource.href}>
                  <Card className="group hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="w-8 h-8 text-soft-blue" />
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-soft-blue transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-gray mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {resource.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-gray text-white">
        <div className="container-width">
          <div className="text-center">
            <h2 className="text-responsive-lg font-bold mb-6">
              Ready to Sell Your Home?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Our experienced listing agents will help you get the best price and terms for your property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/home-valuation">
                <Button 
                  size="lg"
                  className="bg-soft-blue text-white px-8 py-4 hover:bg-ocean-blue text-lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Home Valuation
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Contact a Listing Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 