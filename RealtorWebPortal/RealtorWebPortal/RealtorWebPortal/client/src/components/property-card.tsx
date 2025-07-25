import { Link } from "wouter";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    trackEvent('property_favorite', 'engagement', isFavorited ? 'unfavorite' : 'favorite', property.id);
  };

  const handlePropertyClick = () => {
    trackEvent('property_click', 'engagement', 'view_details', property.id);
  };

  return (
    <Card className="property-card border-0 shadow-lg overflow-hidden bg-white">
      <div className="relative">
        <Link href={`/property/${property.id}`}>
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={handlePropertyClick}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {property.isFeatured && (
            <Badge className="bg-soft-blue text-white">
              Featured
            </Badge>
          )}
          {property.isWaterfront && (
            <Badge className="bg-blue-600 text-white">
              Waterfront
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isFavorited 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>
      
      <CardContent className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <Link href={`/property/${property.id}`}>
            <h3 
              className="text-xl font-semibold text-slate-gray hover:text-soft-blue transition-colors cursor-pointer line-clamp-2"
              onClick={handlePropertyClick}
            >
              {property.title}
            </h3>
          </Link>
          <span className="text-2xl font-bold text-soft-blue ml-3">
            {formatPrice(property.price)}
          </span>
        </div>
        
        {/* Address */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
        
        {/* Property Details */}
        <div className="flex justify-between items-center text-gray-700 mb-4 text-sm">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} Bath{parseFloat(property.bathrooms.toString()) !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.squareFeet.toLocaleString()} sq ft</span>
          </div>
        </div>
        
        {/* Property Type and Neighborhood */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs">
            {property.propertyType}
          </Badge>
          <span className="text-xs text-gray-500">
            {property.neighborhood}
          </span>
        </div>
        
        {/* CTA Button */}
        <Link href={`/property/${property.id}`}>
          <Button 
            className="w-full bg-slate-gray text-white hover:bg-gray-700 transition-colors font-medium"
            onClick={handlePropertyClick}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
