import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function PropertySearch() {
  const [, setLocation] = useLocation();
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "all",
    priceRange: "all",
    bedrooms: "all"
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the search event
    trackEvent('property_search', 'search', 'hero_form');
    
    // Build IDX parameters for your MLS Matrix system
    const idxParams = new URLSearchParams();
    
    // Set base IDX parameters
    idxParams.append('idx', 'cfc86fc2');
    
    // Map property type to IDX categories
    if (searchData.propertyType && searchData.propertyType !== 'all') {
      let propertyClass = '';
      switch (searchData.propertyType) {
        case 'house':
          propertyClass = 'SFR'; // Single Family Residential
          break;
        case 'condo':
          propertyClass = 'CON'; // Condominium
          break;
        case 'townhouse':
          propertyClass = 'TWH'; // Townhouse
          break;
        default:
          propertyClass = 'SFR';
      }
      idxParams.append('property_class', propertyClass);
    }
    
    // Map price range to IDX min/max price
    if (searchData.priceRange && searchData.priceRange !== 'all') {
      const [min, max] = searchData.priceRange.split('-');
      if (min && min !== 'any') {
        const minPrice = min.replace('K', '000').replace('M', '000000');
        idxParams.append('min_price', minPrice);
      }
      if (max && max !== 'any') {
        const maxPrice = max.replace('K', '000').replace('M', '000000');
        idxParams.append('max_price', maxPrice);
      }
    }
    
    // Map bedrooms to IDX
    if (searchData.bedrooms && searchData.bedrooms !== 'all') {
      idxParams.append('min_bedrooms', searchData.bedrooms);
    }
    
    // Add location if provided
    if (searchData.location.trim()) {
      idxParams.append('city', searchData.location.trim());
    }
    
    // Navigate to properties page (now IDX search) with parameters
    const queryString = idxParams.toString();
    setLocation(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-slate-gray text-xl font-semibold mb-6 text-center">
          Find Your Perfect Property
        </h3>
        
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
          {/* Location */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Location
            </label>
            <Input
              type="text"
              placeholder="St. Petersburg, FL"
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="focus:ring-2 focus:ring-soft-blue focus:border-soft-blue"
            />
          </div>
          
          {/* Property Type */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Property Type
            </label>
            <Select 
              value={searchData.propertyType} 
              onValueChange={(value) => handleInputChange('propertyType', value)}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-soft-blue focus:border-soft-blue">
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
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Price Range
            </label>
            <Select 
              value={searchData.priceRange} 
              onValueChange={(value) => handleInputChange('priceRange', value)}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-soft-blue focus:border-soft-blue">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="200K-400K">$200K - $400K</SelectItem>
                <SelectItem value="400K-600K">$400K - $600K</SelectItem>
                <SelectItem value="600K-800K">$600K - $800K</SelectItem>
                <SelectItem value="800K-1200K">$800K - $1.2M</SelectItem>
                <SelectItem value="1200K-any">$1.2M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Bedrooms
            </label>
            <Select 
              value={searchData.bedrooms} 
              onValueChange={(value) => handleInputChange('bedrooms', value)}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-soft-blue focus:border-soft-blue">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1+ Bedroom</SelectItem>
                <SelectItem value="2">2+ Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
                <SelectItem value="5">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Search Button - Full Width on Mobile */}
          <div className="md:col-span-4 md:flex md:justify-center md:mt-6">
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-soft-blue text-white py-3 px-8 hover:bg-ocean-blue font-medium flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
