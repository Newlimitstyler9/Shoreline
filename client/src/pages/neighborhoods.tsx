import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Home, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";
import { neighborhoodsData } from "@/data/neighborhoods";

export default function Neighborhoods() {
  const neighborhoods = neighborhoodsData;
  const isLoading = false;

  const handleNeighborhoodClick = (neighborhoodName: string) => {
    trackEvent('neighborhood_click', 'engagement', neighborhoodName);
  };

  const neighborhoodFeatures = {
    "Downtown": {
      schools: ["Northeast High School", "St. Petersburg College"],
      amenities: ["Museums", "Restaurants", "Nightlife", "Shopping"],
      transportation: ["Bus Routes", "Walking Friendly", "Bike Lanes"],
      demographics: "Young professionals, artists, empty nesters"
    },
    "Bayshore": {
      schools: ["Bayfront Elementary", "John Hopkins Middle"],
      amenities: ["Marina", "Private Beach Access", "Golf Clubs", "Fine Dining"],
      transportation: ["Private Transportation", "Water Access"],
      demographics: "Affluent families, retirees, executives"
    },
    "Old Northeast": {
      schools: ["Vinoy Elementary", "Campbell Park Elementary"],
      amenities: ["Historic District", "Parks", "Coffee Shops", "Boutiques"],
      transportation: ["Bike Friendly", "Walking Paths", "Transit Access"],
      demographics: "Families, young professionals, history enthusiasts"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              St. Petersburg Neighborhoods
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto">
              Discover the unique character and charm of St. Petersburg's diverse neighborhoods, 
              each offering its own lifestyle and community benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods Overview */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Find Your Perfect Community</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From historic charm to modern luxury, explore what makes each St. Petersburg neighborhood special
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 w-full rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {neighborhoods?.map((neighborhood, index) => (
                <Card key={neighborhood.name} className="border-0 shadow-lg overflow-hidden">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img 
                        src={neighborhood.image} 
                        alt={neighborhood.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r"></div>
                      <div className="absolute bottom-4 left-4 text-white lg:hidden">
                        <h3 className="text-2xl font-bold">{neighborhood.name}</h3>
                        <p className="text-gray-200">{neighborhood.averagePriceRange}</p>
                      </div>
                    </div>
                    <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="hidden lg:block mb-4">
                        <h3 className="text-3xl font-bold text-slate-gray mb-2">{neighborhood.name}</h3>
                        <div className="flex items-center text-soft-blue font-semibold">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          {neighborhood.averagePriceRange}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        {neighborhood.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-gray mb-3">Neighborhood Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {neighborhood.highlights.map((highlight, highlightIndex) => (
                            <Badge key={highlightIndex} variant="secondary" className="bg-soft-blue text-white">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {neighborhoodFeatures[neighborhood.name as keyof typeof neighborhoodFeatures] && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <h5 className="font-medium text-slate-gray mb-2">Schools Nearby:</h5>
                            <p className="text-gray-600 text-sm">
                              {neighborhoodFeatures[neighborhood.name as keyof typeof neighborhoodFeatures].schools.join(", ")}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-slate-gray mb-2">Amenities:</h5>
                            <p className="text-gray-600 text-sm">
                              {neighborhoodFeatures[neighborhood.name as keyof typeof neighborhoodFeatures].amenities.join(", ")}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-slate-gray mb-2">Demographics:</h5>
                            <p className="text-gray-600 text-sm">
                              {neighborhoodFeatures[neighborhood.name as keyof typeof neighborhoodFeatures].demographics}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/properties?neighborhood=${encodeURIComponent(neighborhood.name)}`}>
                          <Button 
                            className="bg-soft-blue text-white hover:bg-ocean-blue w-full sm:w-auto"
                            onClick={() => handleNeighborhoodClick(neighborhood.name)}
                          >
                            <Home className="w-4 h-4 mr-2" />
                            View Properties
                          </Button>
                        </Link>
                        <Link href={`/neighborhoods/${neighborhood.name.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button 
                            variant="outline" 
                            className="w-full sm:w-auto border-soft-blue text-soft-blue hover:bg-soft-blue hover:text-white"
                            onClick={() => handleNeighborhoodClick(neighborhood.name)}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Neighborhood Comparison */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-slate-gray mb-4">Compare Neighborhoods</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Quick comparison of key features across St. Petersburg's popular neighborhoods
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-slate-gray text-white">
                <tr>
                  <th className="text-left p-4">Neighborhood</th>
                  <th className="text-left p-4">Price Range</th>
                  <th className="text-left p-4">Lifestyle</th>
                  <th className="text-left p-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Downtown</td>
                  <td className="p-4">$450K - $750K</td>
                  <td className="p-4">Urban, Vibrant</td>
                  <td className="p-4">Young professionals, Art lovers</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Bayshore</td>
                  <td className="p-4">$600K - $1.2M</td>
                  <td className="p-4">Luxury, Waterfront</td>
                  <td className="p-4">Executives, Boating enthusiasts</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Old Northeast</td>
                  <td className="p-4">$350K - $650K</td>
                  <td className="p-4">Historic, Family-friendly</td>
                  <td className="p-4">Families, History buffs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding hero-bg">
        <div className="container-width">
          <div className="text-center text-white">
            <h2 className="text-responsive-lg font-bold mb-6">Ready to Explore Your New Neighborhood?</h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Our local experts can help you find the perfect neighborhood that matches your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button 
                  size="lg"
                  className="bg-white text-soft-blue px-8 py-4 hover:bg-gray-100 text-lg"
                >
                  Search Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-4 hover:bg-white hover:text-soft-blue text-lg"
                >
                  Schedule Neighborhood Tour
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
