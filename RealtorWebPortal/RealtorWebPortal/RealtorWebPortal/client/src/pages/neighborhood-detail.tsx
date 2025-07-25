import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SEOMeta from "@/components/seo-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, TrendingUp, Home, Users, School, Coffee, Car, Heart, TreePine, Building2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { generateNeighborhoodMetaData } from "@/lib/meta";
import { neighborhoodsData, NeighborhoodData } from "@/data/neighborhoods";

export default function NeighborhoodDetail() {
  const [location] = useLocation();
  const neighborhoodSlug = location.split('/').pop() || '';
  
  // Convert slug back to neighborhood name (e.g., "downtown-st-petersburg" -> "Downtown")
  const neighborhoodName = neighborhoodSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Find neighborhood from local data
  const neighborhood = neighborhoodsData.find(n => 
    n.name.toLowerCase().replace(/\s+/g, '-') === neighborhoodSlug ||
    n.name.toLowerCase() === neighborhoodName.toLowerCase()
  );

  const isLoading = false; // No loading state needed for local data

  // Generate SEO meta data
  const metaData = neighborhood ? generateNeighborhoodMetaData(neighborhood) : null;

  const handleSearchClick = () => {
    trackEvent('neighborhood_search_click', 'engagement', neighborhoodName);
    // Navigate to MLS search with neighborhood filter
    window.location.href = `/properties?city=${encodeURIComponent(neighborhoodName)}`;
  };

  const handleContactClick = () => {
    trackEvent('neighborhood_contact_click', 'engagement', neighborhoodName);
    window.location.href = '/contact';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-20">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-gray mb-4">Neighborhood Not Found</h1>
          <p className="text-gray-600 mb-8">The neighborhood you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = '/neighborhoods'}>
            View All Neighborhoods
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      {metaData && <SEOMeta metaData={metaData} isNeighborhood={true} />}
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative hero-bg py-20 md:py-32">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" 
             style={{backgroundImage: `url('${neighborhood.image}')`}} />
        
        <div className="container-width relative z-10">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              {neighborhood.name} Real Estate
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto mb-8">
              {neighborhood.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-soft-blue text-white px-8 py-3 hover:bg-ocean-blue text-lg"
                onClick={handleSearchClick}
              >
                <Home className="w-5 h-5 mr-2" />
                Search Homes in {neighborhood.name}
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-soft-blue border-white hover:bg-gray-100 px-8 py-3 text-lg"
                onClick={handleContactClick}
              >
                <Heart className="w-5 h-5 mr-2" />
                Get Neighborhood Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Stats */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent>
                <TrendingUp className="w-12 h-12 text-soft-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-gray mb-2">Average Price</h3>
                <p className="text-2xl font-bold text-soft-blue">{neighborhood.averagePriceRange}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <MapPin className="w-12 h-12 text-soft-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-gray mb-2">Location</h3>
                <p className="text-lg text-gray-600">St. Petersburg, FL</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <Users className="w-12 h-12 text-soft-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-gray mb-2">Community</h3>
                <p className="text-lg text-gray-600">Active & Welcoming</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighborhood Highlights */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">
              What Makes {neighborhood.name} Special
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the unique features and amenities that make {neighborhood.name} a desirable place to call home
            </p>
          </div>
          
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {neighborhood.highlights.map((highlight: string, index: number) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent>
                    <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Coffee className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-gray mb-2">{highlight}</h3>
                    <p className="text-gray-600 text-sm">
                      Enjoy the convenience and lifestyle benefits of {highlight.toLowerCase()} in {neighborhood.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-soft-blue">
        <div className="container-width text-center text-white">
          <h2 className="text-responsive-lg font-bold mb-4">
            Ready to Find Your Home in {neighborhood.name}?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our local experts help you discover the perfect property in this amazing neighborhood
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-soft-blue px-8 py-3 hover:bg-gray-100 text-lg"
              onClick={handleSearchClick}
            >
              <Home className="w-5 h-5 mr-2" />
              Search {neighborhood.name} Homes
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-soft-blue px-8 py-3 text-lg"
              onClick={handleContactClick}
            >
              <Heart className="w-5 h-5 mr-2" />
              Contact Local Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 