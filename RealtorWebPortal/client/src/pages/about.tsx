import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { 
  Award, 
  Users, 
  TrendingUp, 
  Home, 
  Star, 
  Clock, 
  Phone, 
  Mail,
  MapPin,
  Heart,
  Shield,
  Target
} from "lucide-react";

export default function About() {
  const handleCTAClick = (action: string) => {
    trackEvent('about_cta_click', 'engagement', action);
  };

  const teamMembers = [
    {
      name: "Sarah Johnson",
      title: "Principal Broker",
      experience: "15+ years",
      specialties: ["Waterfront Properties", "Luxury Homes", "Investment Properties"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Michael Rodriguez",
      title: "Senior Real Estate Agent",
      experience: "12+ years",
      specialties: ["First-Time Buyers", "Relocation", "Downtown Properties"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Emily Chen",
      title: "Real Estate Agent",
      experience: "8+ years",
      specialties: ["Historic Homes", "Neighborhoods", "Market Analysis"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ];

  const stats = [
    { number: "500+", label: "Properties Sold", icon: Home },
    { number: "300+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: "Client-Focused Service",
      description: "We put our clients' needs first, providing personalized attention and dedicated support throughout their real estate journey."
    },
    {
      icon: Shield,
      title: "Integrity & Trust",
      description: "We operate with complete transparency and honesty, building lasting relationships based on trust and mutual respect."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We're committed to achieving the best outcomes for our clients, whether buying, selling, or investing in real estate."
    },
    {
      icon: Award,
      title: "Market Expertise",
      description: "Our deep knowledge of the St. Petersburg market ensures our clients make informed decisions and get the best value."
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
              About Shoreline Realty Group
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto">
              Your trusted real estate experts in St. Petersburg, Florida, dedicated to helping you 
              achieve your property dreams with personalized service and local expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-gray">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-responsive-lg font-bold text-slate-gray mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Founded in 2009, Shoreline Realty Group began with a simple mission: to provide 
                exceptional real estate service to families looking to call St. Petersburg home. 
                What started as a small team has grown into one of the area's most trusted real estate agencies.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Our deep roots in the community and extensive knowledge of the local market have 
                helped hundreds of families find their perfect homes, from charming historic properties 
                to modern waterfront estates.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Today, we continue to build on our reputation for integrity, expertise, and 
                personalized service, always putting our clients' needs first.
              </p>
              <Link href="/contact">
                <Button 
                  className="bg-soft-blue text-white px-6 py-3 hover:bg-ocean-blue"
                  onClick={() => handleCTAClick('learn_more_contact')}
                >
                  Get to Know Us
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Shoreline Realty Group office" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and ensure exceptional service for every client
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-soft-blue rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-gray mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to helping you achieve your real estate goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-gray mb-1">{member.name}</h3>
                  <p className="text-soft-blue font-medium mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.experience} in Real Estate</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, specIndex) => (
                        <Badge key={specIndex} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="St. Petersburg skyline" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-responsive-lg font-bold text-slate-gray mb-6">
                Why Choose Shoreline Realty Group?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-gray mb-2">Local Market Expertise</h3>
                    <p className="text-gray-600">Deep knowledge of St. Petersburg neighborhoods, pricing trends, and market conditions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-gray mb-2">Personalized Service</h3>
                    <p className="text-gray-600">Tailored approach to meet your unique needs, whether buying your first home or selling an investment property.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4 mt-1">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-gray mb-2">Proven Results</h3>
                    <p className="text-gray-600">Track record of successful transactions and satisfied clients across all price ranges and property types.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <div className="text-center text-white">
            <h2 className="text-responsive-lg font-bold mb-6">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Contact our experienced team today for personalized service and expert guidance in the St. Petersburg market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                  onClick={() => handleCTAClick('contact_team')}
                >
                  Contact Our Team
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                onClick={() => handleCTAClick('schedule_consultation')}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
