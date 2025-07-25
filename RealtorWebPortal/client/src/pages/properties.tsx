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
import { Search, Filter, ExternalLink, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Properties() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
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
  const [showFilters, setShowFilters] = useState(false);

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

  const toggleIDXView = () => {
    setShowIDX(!showIDX);
    trackEvent('idx_toggle', 'property_search', showIDX ? 'hide' : 'show');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <section className={`bg-beige ${isMobile ? 'py-8' : 'py-16'}`}>
        <div className="container-width">
          <div className="text-center">
            <h1 className={`font-bold text-slate-gray mb-4 ${isMobile ? 'text-2xl' : 'text-responsive-lg'}`}>
              Search Properties in St. Petersburg
            </h1>
            <p className={`text-gray-600 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-lg'}`}>
              Find your perfect home from our extensive collection of properties in St. Petersburg, Florida
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      {isMobile && !showIDX && (
        <section className="bg-white border-b border-gray-200 py-3">
          <div className="container-width">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>
        </section>
      )}

      {/* Filters Section */}
      {!showIDX && (
        <section className={`${isMobile ? (showFilters ? 'block' : 'hidden') : 'block'} bg-white border-b border-gray-200 ${isMobile ? 'py-4' : 'py-6'}`}>
          <div className="container-width">
            <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-6 gap-4 items-end'}`}>
              {/* Property Type */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Property Type</Label>
                <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                  <SelectTrigger className={`mt-1 ${isMobile ? 'h-11' : ''}`}>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Condo">Condominium</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'col-span-2 grid grid-cols-2 gap-2'}`}>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Min Price</Label>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className={`mt-1 ${isMobile ? 'h-11' : ''}`}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Max Price</Label>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className={`mt-1 ${isMobile ? 'h-11' : ''}`}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
                <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                  <SelectTrigger className={`mt-1 ${isMobile ? 'h-11' : ''}`}>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Neighborhood */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Neighborhood</Label>
                <Select value={filters.neighborhood} onValueChange={(value) => handleFilterChange('neighborhood', value)}>
                  <SelectTrigger className={`mt-1 ${isMobile ? 'h-11' : ''}`}>
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Old Northeast">Old Northeast</SelectItem>
                    <SelectItem value="Snell Isle">Snell Isle</SelectItem>
                    <SelectItem value="Shore Acres">Shore Acres</SelectItem>
                    <SelectItem value="Coquina Key">Coquina Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className={`${isMobile ? 'space-y-2' : 'flex space-x-2'}`}>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className={`${isMobile ? 'w-full h-11' : ''} text-gray-600 border-gray-300`}
                >
                  Clear
                </Button>
                {isMobile && (
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="w-full h-11 bg-soft-blue text-white hover:bg-ocean-blue"
                  >
                    Apply Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Waterfront Checkbox */}
            {!isMobile && (
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox 
                  id="waterfront"
                  checked={filters.isWaterfront}
                  onCheckedChange={(checked) => handleFilterChange('isWaterfront', checked)}
                />
                <Label htmlFor="waterfront" className="text-sm text-gray-700">
                  Waterfront properties only
                </Label>
              </div>
            )}
          </div>
        </section>
      )}

      {/* IDX Search Results */}
      {showIDX && (
        <section className="bg-white">
          <div className="container-width">
            <div className={`bg-soft-blue text-white rounded-lg ${isMobile ? 'p-4 m-4' : 'p-6 mb-8'}`}>
              <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
                <div className={`${isMobile ? 'text-center' : 'flex items-center space-x-3'}`}>
                  <ExternalLink className={`${isMobile ? 'mx-auto mb-2' : ''} w-6 h-6`} />
                  <div>
                    <h3 className={`font-semibold ${isMobile ? 'text-base mb-1' : 'text-lg'}`}>Live MLS Search Results</h3>
                    <p className={`text-blue-100 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      Showing real-time properties from the MLS based on your search criteria
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className={`bg-white text-soft-blue border-white hover:bg-gray-100 ${isMobile ? 'w-full' : ''}`}
                  onClick={toggleIDXView}
                >
                  {isMobile && <X className="w-4 h-4 mr-2" />}
                  Show Featured Properties
                </Button>
              </div>
            </div>
            
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isMobile ? 'mx-4 mb-4' : 'mb-8'}`} 
                 style={{ height: isMobile ? '500px' : '800px' }}>
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
            <div className={`${isMobile ? 'space-y-4 mb-6' : 'flex justify-between items-center mb-8'}`}>
              <h2 className={`font-semibold text-slate-gray ${isMobile ? 'text-xl text-center' : 'text-2xl'}`}>
                {isLoading ? "Loading..." : `${properties?.length || 0} Featured Properties`}
              </h2>
              <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex space-x-3'}`}>
                <Button 
                  variant="outline" 
                  className={`text-soft-blue border-soft-blue hover:bg-soft-blue hover:text-white ${isMobile ? 'w-full h-11' : ''}`}
                  onClick={toggleIDXView}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isMobile ? 'Search MLS' : 'Quick MLS Search'}
                </Button>
                <Button 
                  variant="outline" 
                  className={`text-soft-blue border-soft-blue hover:bg-soft-blue hover:text-white ${isMobile ? 'w-full h-11' : ''}`}
                  onClick={() => window.location.href = '/idx-search'}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {isMobile ? 'Full Search' : 'Full MLS Search'}
                </Button>
              </div>
            </div>
          
          {isLoading ? (
            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className={`w-full rounded-xl ${isMobile ? 'h-48' : 'h-64'}`} />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1 px-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className={`text-center ${isMobile ? 'py-12 px-4' : 'py-16'}`}>
              <Search className={`text-gray-400 mx-auto mb-4 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`} />
              <h3 className={`font-semibold text-gray-600 mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>No Properties Found</h3>
              <p className={`text-gray-500 mb-6 ${isMobile ? 'text-sm' : ''}`}>
                Try adjusting your search criteria to find more properties.
              </p>
              <Button 
                onClick={clearFilters} 
                className={`bg-soft-blue text-white hover:bg-ocean-blue ${isMobile ? 'w-full h-11' : ''}`}
              >
                Clear Filters
              </Button>
            </div>
          )}
          </div>
        </section>
      )}

      {!isMobile && <Footer />}
    </div>
  );
}
