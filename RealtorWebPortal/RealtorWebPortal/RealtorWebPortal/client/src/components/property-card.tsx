import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Property } from "@shared/schema";
import { Link } from "wouter";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const isMobile = useIsMobile();

  const handlePropertyClick = () => {
    trackEvent('property_card_click', 'property_view', property.title);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    trackEvent('property_favorite_toggle', 'engagement', property.title, isFavorited ? 0 : 1);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Card className={`property-card overflow-hidden cursor-pointer ${isMobile ? 'shadow-md' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
      <div className="relative">
        {/* Property Image */}
        <div className={`relative ${isMobile ? 'h-48' : 'h-64'} bg-gray-200 overflow-hidden`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.isFeatured && (
              <Badge className="bg-soft-blue text-white text-xs font-semibold">
                Featured
              </Badge>
            )}
            {property.isWaterfront && (
              <Badge className="bg-ocean-blue text-white text-xs font-semibold">
                Waterfront
              </Badge>
            )}
          </div>
          
          {/* Price Overlay for Mobile */}
          {isMobile && (
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-lg font-bold text-soft-blue">
                {formatPrice(property.price)}
              </span>
            </div>
          )}
          
          {/* Favorite Button */}
          <button 
            className={`absolute ${isMobile ? 'bottom-3 right-3' : 'top-3 right-3'} p-2 rounded-full bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 transition-all touch-target`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
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
      </div>
      
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        {/* Title and Price */}
        <div className={`${isMobile ? 'mb-3' : 'flex justify-between items-start mb-3'}`}>
          <Link href={`/property/${property.id}`}>
            <h3 
              className={`font-semibold text-slate-gray hover:text-soft-blue transition-colors cursor-pointer line-clamp-2 ${
                isMobile ? 'text-lg mb-2' : 'text-xl'
              }`}
              onClick={handlePropertyClick}
            >
              {property.title}
            </h3>
          </Link>
          {!isMobile && (
            <span className="text-2xl font-bold text-soft-blue ml-3">
              {formatPrice(property.price)}
            </span>
          )}
        </div>
        
        {/* Address */}
        <div className={`flex items-center text-gray-600 ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm truncate">
            {property.address}, {property.city}, {property.state}
          </span>
        </div>
        
        {/* Property Details */}
        <div className={`${isMobile ? 'grid grid-cols-3 gap-2 text-xs' : 'flex justify-between items-center text-sm'} text-gray-700 mb-4`}>
          <div className="flex items-center justify-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} {isMobile ? 'Bed' : `Bed${property.bedrooms !== 1 ? 's' : ''}`}</span>
          </div>
          <div className="flex items-center justify-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} {isMobile ? 'Bath' : `Bath${parseFloat(property.bathrooms.toString()) !== 1 ? 's' : ''}`}</span>
          </div>
          <div className="flex items-center justify-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{isMobile ? `${Math.round(property.squareFeet / 1000)}K` : `${property.squareFeet.toLocaleString()}`} sq ft</span>
          </div>
        </div>
        
        {/* Property Type and Neighborhood */}
        <div className={`flex items-center justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <Badge variant="secondary" className="text-xs">
            {property.propertyType}
          </Badge>
          <span className="text-xs text-gray-500 truncate ml-2">
            {property.neighborhood}
          </span>
        </div>
        
        {/* CTA Button */}
        <Link href={`/property/${property.id}`}>
          <Button 
            className={`w-full bg-slate-gray text-white hover:bg-gray-700 transition-colors font-medium ${
              isMobile ? 'py-3 text-sm touch-target' : ''
            }`}
            onClick={handlePropertyClick}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
