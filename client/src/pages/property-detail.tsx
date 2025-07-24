import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Bed, Bath, Square, Calendar, Car, Waves, Home } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";
import LeadForms from "@/components/lead-forms";

export default function PropertyDetail() {
  const [, params] = useRoute("/property/:id");
  const propertyId = params?.id;
  const [showContactForm, setShowContactForm] = useState(false);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", propertyId],
    enabled: !!propertyId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-8">
          <Skeleton className="h-96 w-full mb-8 rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-width py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-gray mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContactClick = (action: string) => {
    trackEvent('property_contact', 'engagement', action, property.id);
    setShowContactForm(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px]">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            {property.isFeatured && (
              <Badge className="bg-soft-blue text-white">Featured</Badge>
            )}
            {property.isWaterfront && (
              <Badge className="bg-blue-600 text-white">Waterfront</Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
          <p className="text-xl flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
      </section>

      {/* Property Details */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Price and Basic Info */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="text-4xl font-bold text-soft-blue mb-4 md:mb-0">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      className="bg-soft-blue text-white hover:bg-ocean-blue"
                      onClick={() => handleContactClick('schedule_showing')}
                    >
                      Schedule Showing
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleContactClick('get_more_info')}
                    >
                      Get More Info
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center">
                    <Bed className="w-6 h-6 text-soft-blue mr-3" />
                    <div>
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-6 h-6 text-soft-blue mr-3" />
                    <div>
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-6 h-6 text-soft-blue mr-3" />
                    <div>
                      <div className="font-semibold">{property.squareFeet.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-6 h-6 text-soft-blue mr-3" />
                    <div>
                      <div className="font-semibold">{property.yearBuilt}</div>
                      <div className="text-sm text-gray-600">Year Built</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-slate-gray mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">{property.propertyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Neighborhood:</span>
                      <span className="font-medium">{property.neighborhood}</span>
                    </div>
                    {property.lotSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="font-medium">{property.lotSize} acres</span>
                      </div>
                    )}
                    {property.mlsNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">MLS #:</span>
                        <span className="font-medium">{property.mlsNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold text-slate-gray mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold text-slate-gray mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-soft-blue rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Images */}
              {property.images.length > 1 && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-slate-gray mb-6">Property Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${property.title} - Image ${index + 2}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-slate-gray mb-4">Interested in this property?</h3>
                <LeadForms.PropertyInquiry propertyId={property.id} propertyTitle={property.title} />
              </div>

              {/* Agent Info */}
              <div className="bg-slate-gray rounded-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Contact Our Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span className="text-sm">123 Beach Drive NE, St. Petersburg, FL</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">(727) 555-0123</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">info@shorelinerealty.com</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-soft-blue text-white hover:bg-ocean-blue"
                  onClick={() => handleContactClick('call_agent')}
                >
                  Call Now
                </Button>
              </div>

              {/* Mortgage Calculator Preview */}
              <div className="bg-beige rounded-xl p-6">
                <h3 className="text-xl font-semibold text-slate-gray mb-4">Estimate Your Payment</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Home Price:</span>
                    <span className="font-semibold">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment (20%):</span>
                    <span className="font-semibold">{formatPrice(property.price * 0.2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">{formatPrice(property.price * 0.8)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span>Est. Monthly Payment:</span>
                      <span className="font-bold text-soft-blue">
                        {formatPrice((property.price * 0.8 * 0.007) + (property.price * 0.005 / 12))}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  *Estimate includes principal, interest, taxes, and insurance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
