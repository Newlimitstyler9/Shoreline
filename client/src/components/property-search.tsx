import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PropertySearch() {
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "all",
    priceRange: "all",
    bedrooms: "all"
  });

  const handleInputChange = (key: string, value: string) => {
    setSearchData(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the search event
    trackEvent('property_search', 'search', 'hero_form');
    
    // Build IDX parameters for MLS Matrix system with correct field names
    const idxParams = new URLSearchParams();
    
    // Set base IDX parameters
    idxParams.append('idx', 'cfc86fc2'); // Your IDX ID
    idxParams.append('embed', 'true'); // For iframe embedding
    
    // Map property type to correct MLS Matrix PropertyType field
    if (searchData.propertyType && searchData.propertyType !== 'all') {
      let propertyType = '';
      switch (searchData.propertyType) {
        case 'house':
          propertyType = 'Single Family Detached,Single Family Attached'; 
          break;
        case 'condo':
          propertyType = 'Condominium,Townhouse'; 
          break;
        case 'townhouse':
          propertyType = 'Townhouse'; 
          break;
        default:
          propertyType = 'Single Family Detached';
      }
      idxParams.append('PropertyType', propertyType);
    }
    
    // Map price range to correct MLS Matrix ListPrice fields
    if (searchData.priceRange && searchData.priceRange !== 'all') {
      const [min, max] = searchData.priceRange.split('-');
      if (min && min !== 'any') {
        const minPrice = min.replace('K', '000').replace('M', '000000');
        idxParams.append('ListPriceMin', minPrice);
      }
      if (max && max !== 'any') {
        const maxPrice = max.replace('K', '000').replace('M', '000000');
        idxParams.append('ListPriceMax', maxPrice);
      }
    }
    
    // Map bedrooms to correct MLS Matrix BedroomsTotal field
    if (searchData.bedrooms && searchData.bedrooms !== 'all') {
      idxParams.append('BedroomsMin', searchData.bedrooms);
    }
    
    // Add location to correct MLS Matrix City field
    if (searchData.location.trim()) {
      idxParams.append('City', searchData.location.trim());
    }
    
    // Additional common search parameters for better filtering
    idxParams.append('Status', 'Active'); // Only show active listings
    idxParams.append('count', '20'); // Results per page
    
    // Navigate to IDX search page with parameters
    const queryString = idxParams.toString();
    setLocation(`/idx-search${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
        <h3 className={`text-slate-gray font-semibold mb-6 text-center ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Find Your Perfect Property
        </h3>
        
        <form onSubmit={handleSearch} className={`space-y-4 ${!isMobile && 'md:space-y-0 md:grid md:grid-cols-4 md:gap-4'}`}>
          {/* Location */}
          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Location
            </label>
            <Input
              type="text"
              placeholder={isMobile ? "St. Pete, FL" : "St. Petersburg, FL"}
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`focus:ring-2 focus:ring-soft-blue focus:border-soft-blue ${isMobile ? 'h-11' : ''}`}
            />
          </div>
          
          {/* Property Type */}
          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Property Type
            </label>
            <Select 
              value={searchData.propertyType} 
              onValueChange={(value) => handleInputChange('propertyType', value)}
            >
              <SelectTrigger className={`focus:ring-2 focus:ring-soft-blue focus:border-soft-blue ${isMobile ? 'h-11' : ''}`}>
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
          
          {/* Price Range */}
          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Price Range
            </label>
            <Select 
              value={searchData.priceRange} 
              onValueChange={(value) => handleInputChange('priceRange', value)}
            >
              <SelectTrigger className={`focus:ring-2 focus:ring-soft-blue focus:border-soft-blue ${isMobile ? 'h-11' : ''}`}>
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="0-300K">Under $300K</SelectItem>
                <SelectItem value="300K-500K">$300K - $500K</SelectItem>
                <SelectItem value="500K-750K">$500K - $750K</SelectItem>
                <SelectItem value="750K-1M">$750K - $1M</SelectItem>
                <SelectItem value="1M-any">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Bedrooms */}
          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              Bedrooms
            </label>
            <Select 
              value={searchData.bedrooms} 
              onValueChange={(value) => handleInputChange('bedrooms', value)}
            >
              <SelectTrigger className={`focus:ring-2 focus:ring-soft-blue focus:border-soft-blue ${isMobile ? 'h-11' : ''}`}>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1+ Bed</SelectItem>
                <SelectItem value="2">2+ Beds</SelectItem>
                <SelectItem value="3">3+ Beds</SelectItem>
                <SelectItem value="4">4+ Beds</SelectItem>
                <SelectItem value="5">5+ Beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Search Button */}
          <div className={`${!isMobile && 'md:col-span-4 md:flex md:justify-center md:mt-6'} ${isMobile && 'mt-6'}`}>
            <Button 
              type="submit" 
              className={`w-full bg-soft-blue text-white hover:bg-ocean-blue font-medium flex items-center justify-center ${
                isMobile 
                  ? 'py-3 px-6 text-base h-12' 
                  : 'md:w-auto py-3 px-8'
              }`}
            >
              <Search className={`mr-2 ${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`} />
              {isMobile ? 'Search Properties' : 'Search Properties'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
