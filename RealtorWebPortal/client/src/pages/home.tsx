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
import { MapPin, Phone, Mail, Clock, Users, Award, TrendingUp } from "lucide-react";

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
      
      {/* Hero Section */}
      <section className="relative hero-bg py-20 md:py-32">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"}} />
        
        <div className="container-width relative z-10">
          <div className="text-center text-white mb-12">
            <h1 className="text-responsive-xl font-bold mb-6 leading-tight">
              Discover Your Dream Home<br />
              <span className="text-gray-100">in St. Petersburg</span>
            </h1>
            <p className="text-responsive-md mb-8 text-gray-100 max-w-3xl mx-auto">
              Premier waterfront properties and exceptional service from your trusted local real estate experts
            </p>
          </div>
          
          <PropertySearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Featured Properties</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium waterfront and luxury homes in St. Petersburg
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

      {/* About Section */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-responsive-lg font-bold text-slate-gray mb-6">
                Your Trusted St. Petersburg Real Estate Experts
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                With over 15 years of combined experience in the St. Petersburg real estate market, 
                Shoreline Realty Group has helped hundreds of families find their perfect waterfront homes 
                and achieve their real estate dreams.
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

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Neighborhoods Section */}
      <section className="section-padding bg-white">
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

      {/* Blog Section */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Real Estate Insights & Market Updates</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay informed with the latest market trends, buying tips, and neighborhood insights from our real estate experts
            </p>
          </div>
          
          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.slice(0, 3).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge variant="secondary" className="bg-soft-blue text-white">
                        {post.category}
                      </Badge>
                      <span className="text-gray-500 text-sm ml-3">
                        {new Date(post.publishedAt!).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-gray mb-3 hover:text-soft-blue transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="text-soft-blue font-medium hover:underline">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button 
                className="bg-slate-gray text-white px-8 py-3 hover:bg-gray-700 text-lg"
                onClick={() => handleCTAClick('view_all_blog_posts')}
              >
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-responsive-lg font-bold mb-6">Free St. Petersburg Relocation Guide</h2>
            <p className="text-xl mb-8 text-gray-100">
              Everything you need to know about moving to St. Petersburg, including neighborhoods, schools, amenities, and insider tips
            </p>
            
            <Link href="/relocation-guide">
              <Button 
                size="lg"
                className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg font-semibold"
                onClick={() => handleCTAClick('download_relocation_guide')}
              >
                Get Your Free Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ready to start your real estate journey? Contact us today for personalized service and expert guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-gray mb-2">Office Address</h3>
              <p className="text-gray-600">123 Beach Drive NE<br />St. Petersburg, FL 33701</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-gray mb-2">Phone</h3>
              <p className="text-gray-600">(727) 555-0123</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-gray mb-2">Email</h3>
              <p className="text-gray-600">info@shorelinerealty.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-gray mb-2">Office Hours</h3>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button 
                className="bg-soft-blue text-white px-8 py-3 hover:bg-ocean-blue text-lg"
                onClick={() => handleCTAClick('contact_us')}
              >
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
