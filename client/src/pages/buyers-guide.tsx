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
  ArrowRight
} from "lucide-react";

export default function BuyersGuide() {
  const steps = [
    {
      number: "01",
      title: "Get Pre-Approved",
      description: "Start by getting pre-approved for a mortgage to understand your budget and show sellers you're serious.",
      icon: FileText,
      details: [
        "Gather financial documents",
        "Check your credit score",
        "Compare mortgage rates",
        "Get pre-approval letter"
      ]
    },
    {
      number: "02",
      title: "Define Your Needs",
      description: "Create a list of must-haves, nice-to-haves, and deal-breakers for your new home.",
      icon: Home,
      details: [
        "Location preferences",
        "Number of bedrooms/bathrooms",
        "Property type (house, condo, townhouse)",
        "Budget range"
      ]
    },
    {
      number: "03",
      title: "Start Your Search",
      description: "Work with your agent to find properties that match your criteria and schedule viewings.",
      icon: MapPin,
      details: [
        "Search online listings",
        "Attend open houses",
        "Schedule private showings",
        "Compare properties"
      ]
    },
    {
      number: "04",
      title: "Make an Offer",
      description: "When you find the right home, your agent will help you craft a competitive offer.",
      icon: DollarSign,
      details: [
        "Review comparable sales",
        "Determine offer price",
        "Include contingencies",
        "Submit offer letter"
      ]
    },
    {
      number: "05",
      title: "Due Diligence",
      description: "Conduct inspections and review all property documents before closing.",
      icon: CheckCircle,
      details: [
        "Home inspection",
        "Property appraisal",
        "Title search",
        "Review disclosures"
      ]
    },
    {
      number: "06",
      title: "Close & Move In",
      description: "Complete the final paperwork, get your keys, and move into your new home!",
      icon: Award,
      details: [
        "Final walkthrough",
        "Sign closing documents",
        "Pay closing costs",
        "Receive keys"
      ]
    }
  ];

  const resources = [
    {
      title: "Mortgage Calculator",
      description: "Calculate your monthly payments and see how different down payments affect your loan.",
      href: "/mortgage-calculator",
      icon: Calculator
    },
    {
      title: "First-Time Buyer Guide",
      description: "Special resources and programs for first-time homebuyers in St. Petersburg.",
      href: "/first-time-buyers",
      icon: Users
    },
    {
      title: "Investment Properties",
      description: "Learn about buying investment properties and building your real estate portfolio.",
      href: "/investment-properties",
      icon: DollarSign
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
              Complete Buyer's Guide
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto mb-8">
              Everything you need to know about buying a home in St. Petersburg, from pre-approval to closing day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg font-semibold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find a Buyer's Agent
                </Button>
              </Link>
              <Link href="/mortgage-calculator">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg font-semibold"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Mortgage Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Home Buying Process */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              The Home Buying Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow these 6 steps to successfully purchase your dream home in St. Petersburg
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

      {/* Additional Resources */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              Additional Resources
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore these helpful tools and guides to make your home buying journey easier
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
              Ready to Start Your Home Buying Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Our experienced buyer's agents are here to guide you through every step of the process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-soft-blue text-white px-8 py-4 hover:bg-ocean-blue text-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Contact a Buyer's Agent
                </Button>
              </Link>
              <Link href="/idx-search">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Search Properties
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