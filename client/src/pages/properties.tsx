import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PropertyCard from "@/components/property-card";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Properties() {
  const [location] = useLocation();
  const [filters, setFilters] = useState({
    propertyType: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "all",
    neighborhood: "all",
    isWaterfront: false
  });
  const [showIDX, setShowIDX] = useState(false);
  const [idxUrl, setIdxUrl] = useState("");

  // Check if we have IDX parameters from search
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('idx')) {
      setShowIDX(true);
      const baseUrl = "https://stellar.mlsmatrix.com/Matrix/public/IDX.aspx";
      setIdxUrl(`${baseUrl}?${urlParams.toString()}`);
      trackEvent('idx_search_view', 'property_search', 'mls_integration');
    } else {
      // Default to the main IDX search
      setIdxUrl("https://stellar.mlsmatrix.com/Matrix/public/IDX.aspx?idx=cfc86fc2");
    }
  }, [location]);

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters]
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    trackEvent('property_filter', 'search', key, typeof value === 'string' ? value.length : value ? 1 : 0);
  };

  const clearFilters = () => {
    setFilters({
      propertyType: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "all",
      neighborhood: "all",
      isWaterfront: false
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="bg-beige py-16">
        <div className="container-width">
          <div className="text-center">
            <h1 className="text-responsive-lg font-bold text-slate-gray mb-4">
              Search Properties in St. Petersburg
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find your perfect home from our extensive collection of properties in St. Petersburg, Florida
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-width">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-gray flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Properties
              </h3>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="text-sm"
              >
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select 
                  value={filters.propertyType} 
                  onValueChange={(value) => handleFilterChange('propertyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minPrice">Min Price</Label>
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select 
                  value={filters.bedrooms} 
                  onValueChange={(value) => handleFilterChange('bedrooms', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+ Bed</SelectItem>
                    <SelectItem value="2">2+ Beds</SelectItem>
                    <SelectItem value="3">3+ Beds</SelectItem>
                    <SelectItem value="4">4+ Beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Select 
                  value={filters.neighborhood} 
                  onValueChange={(value) => handleFilterChange('neighborhood', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Bayshore">Bayshore</SelectItem>
                    <SelectItem value="Old Northeast">Old Northeast</SelectItem>
                    <SelectItem value="Pinellas Point">Pinellas Point</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="waterfront"
                  checked={filters.isWaterfront}
                  onCheckedChange={(checked) => handleFilterChange('isWaterfront', checked)}
                />
                <Label htmlFor="waterfront" className="text-sm">
                  Waterfront Only
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDX/MLS Integration Section */}
      {showIDX && (
        <section className="section-padding">
          <div className="container-width">
            <div className="bg-soft-blue text-white rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold">Live MLS Search Results</h3>
                    <p className="text-blue-100 text-sm">
                      Showing real-time properties from the MLS based on your search criteria
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white text-soft-blue border-white hover:bg-gray-100"
                  onClick={() => setShowIDX(false)}
                >
                  Show Featured Properties
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '800px' }}>
              <iframe 
                src={idxUrl}
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                title="MLS Property Search Results"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {!showIDX && (
        <section className="section-padding">
          <div className="container-width">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-gray">
                {isLoading ? "Loading..." : `${properties?.length || 0} Featured Properties`}
              </h2>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="text-soft-blue border-soft-blue hover:bg-soft-blue hover:text-white"
                  onClick={() => {
                    setShowIDX(true);
                    setIdxUrl("https://stellar.mlsmatrix.com/Matrix/public/IDX.aspx?idx=cfc86fc2");
                  }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Quick MLS Search
                </Button>
                <Button 
                  variant="outline" 
                  className="text-soft-blue border-soft-blue hover:bg-soft-blue hover:text-white"
                  onClick={() => window.location.href = '/idx-search'}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Full MLS Search
                </Button>
              </div>
            </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria to find more properties.
              </p>
              <Button onClick={clearFilters} className="bg-soft-blue text-white hover:bg-ocean-blue">
                Clear Filters
              </Button>
            </div>
          )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
