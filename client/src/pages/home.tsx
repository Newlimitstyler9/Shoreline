import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PropertyCard from "@/components/property-card";
import PropertySearch from "@/components/property-search";
import GoogleReviews from "@/components/google-reviews";
import { Property, BlogPost, Neighborhood } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Users, Award, TrendingUp, Shield, Star, Zap } from "lucide-react";

export default function Home() {
  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"]
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"]
  });

  const { data: neighborhoods, isLoading: neighborhoodsLoading } = useQuery<Neighborhood[]>({
    queryKey: ["/api/neighborhoods"]
  });

  const handleCTAClick = (action: string) => {
    trackEvent('cta_click', 'engagement', action);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Enhanced with stronger messaging */}
      <section className="relative hero-bg py-20 md:py-32">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}} />
        
        <div className="container-width relative z-10">
          <div className="text-center text-white mb-12">
            <h1 className="text-responsive-xl font-bold mb-6 leading-tight">
              EXPERIENCE THE<br />
              <span className="text-soft-blue">SHORELINE DIFFERENCE</span>
            </h1>
            <p className="text-responsive-md mb-8 text-gray-100 max-w-3xl mx-auto">
              Your Success Is Our Mission. Premier waterfront properties and exceptional service from St. Petersburg's most trusted real estate experts.
            </p>
          </div>
          
          <PropertySearch />
        </div>
      </section>

      {/* Value Propositions Section - New */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-gray mb-2">Find Your Dream Home</h3>
              <p className="text-gray-600">Discover exclusive waterfront properties and luxury homes in St. Petersburg's most desirable neighborhoods.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-gray mb-2">Trusted Expertise</h3>
              <p className="text-gray-600">15+ years of local market knowledge and proven track record of successful transactions.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-gray mb-2">Cutting-Edge Service</h3>
              <p className="text-gray-600">Advanced technology and personalized approach to make your real estate journey seamless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Featured Properties</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked selection of premium waterfront and luxury homes in St. Petersburg
            </p>
          </div>
          
          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/properties">
              <Button 
                className="bg-soft-blue text-white px-8 py-3 hover:bg-ocean-blue text-lg"
                onClick={() => handleCTAClick('view_all_properties')}
              >
                Search All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-responsive-lg font-bold text-slate-gray mb-6">
                Welcome To<br />
                <span className="text-soft-blue">Shoreline Realty Group</span>
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Your Success Is Our Goal. With over 15 years of combined experience in the St. Petersburg real estate market, 
                we've helped hundreds of families find their perfect waterfront homes and achieve their real estate dreams.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Local market expertise and insider knowledge</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Personalized service and dedicated support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Cutting-edge marketing and technology</span>
                </div>
              </div>
              <Link href="/contact">
                <Button 
                  className="bg-slate-gray text-white px-6 py-3 hover:bg-gray-700"
                  onClick={() => handleCTAClick('schedule_consultation')}
                >
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Shoreline Realty Group team" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-soft-blue">500+</div>
                  <div className="text-gray-600 font-medium">Properties Sold</div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-soft-blue">300+</div>
                  <div className="text-gray-600 font-medium">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - New */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-soft-blue hover:text-white transition-colors group">
                             <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-soft-blue">
                 <MapPin className="w-6 h-6" />
               </div>
              <h3 className="font-bold mb-2">Buying</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">Find your perfect home with expert guidance</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-soft-blue hover:text-white transition-colors group">
              <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-soft-blue">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Selling</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">Maximize your property's value and exposure</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-soft-blue hover:text-white transition-colors group">
              <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-soft-blue">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Investment</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">Build wealth through strategic real estate investments</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-soft-blue hover:text-white transition-colors group">
              <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-soft-blue">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Consulting</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">Expert advice for all your real estate decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Neighborhoods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Explore St. Petersburg Neighborhoods</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From historic downtown to pristine waterfront communities, discover the unique character of each St. Petersburg neighborhood
            </p>
          </div>
          
          {neighborhoodsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {neighborhoods?.map((neighborhood) => (
                <div key={neighborhood.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={neighborhood.image} 
                      alt={neighborhood.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{neighborhood.name}</h3>
                      <p className="text-gray-200">{neighborhood.description}</p>
                      <p className="text-sm text-gray-300 mt-2">Avg: {neighborhood.averagePriceRange}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/neighborhoods">
              <Button 
                className="bg-soft-blue text-white px-8 py-3 hover:bg-ocean-blue text-lg"
                onClick={() => handleCTAClick('explore_neighborhoods')}
              >
                Explore All Neighborhoods
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Enhanced */}
      <section className="section-padding bg-slate-gray text-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-responsive-lg font-bold mb-6">
                YOUR SUCCESS<br />
                <span className="text-soft-blue">IS OUR GOAL</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Make today the day you begin the next fulfilling chapter in your life and career. 
                Find out more by contacting our team today!
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-soft-blue mr-3" />
                  <span className="text-gray-300">(727) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-soft-blue mr-3" />
                  <span className="text-gray-300">info@shorelinestpete.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-soft-blue mr-3" />
                  <span className="text-gray-300">St. Petersburg, FL</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-gray mb-6">Get Started Today</h3>
              <div className="space-y-4">
                <Link href="/contact">
                  <Button 
                    className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
                    onClick={() => handleCTAClick('contact_form')}
                  >
                    Contact Us
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button 
                    variant="outline" 
                    className="w-full border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white"
                    onClick={() => handleCTAClick('search_properties')}
                  >
                    Search Properties
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
