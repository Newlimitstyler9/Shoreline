import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Home, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function IDXSearch() {
  const [location, setLocation] = useLocation();
  const [idxUrl, setIdxUrl] = useState("https://stellar.mlsmatrix.com/Matrix/public/IDX.aspx?idx=cfc86fc2");
  const [searchFilters, setSearchFilters] = useState<string[]>([]);

  useEffect(() => {
    // Check for URL parameters to customize the IDX search
    const urlParams = new URLSearchParams(window.location.search);
    const baseUrl = "https://stellar.mlsmatrix.com/Matrix/public/IDX.aspx";
    
    if (urlParams.has('idx')) {
      // If idx parameter exists, use all parameters as-is
      setIdxUrl(`${baseUrl}?${urlParams.toString()}`);
    } else {
      // Build IDX URL with search parameters
      const idxParams = new URLSearchParams();
      idxParams.append('idx', 'cfc86fc2'); // Base IDX parameter
      
      // Map search parameters to IDX parameters
      if (urlParams.has('property_class')) {
        idxParams.append('property_class', urlParams.get('property_class')!);
      }
      
      if (urlParams.has('min_price')) {
        idxParams.append('min_price', urlParams.get('min_price')!);
      }
      
      if (urlParams.has('max_price')) {
        idxParams.append('max_price', urlParams.get('max_price')!);
      }
      
      if (urlParams.has('min_bedrooms')) {
        idxParams.append('min_bedrooms', urlParams.get('min_bedrooms')!);
      }
      
      if (urlParams.has('city')) {
        idxParams.append('city', urlParams.get('city')!);
      }
      
      setIdxUrl(`${baseUrl}?${idxParams.toString()}`);
      
      // Build search filters display
      const filters: string[] = [];
      if (urlParams.has('property_class')) {
        const propertyClass = urlParams.get('property_class')!;
        const propertyTypeMap: { [key: string]: string } = {
          'SFR': 'Single Family',
          'CON': 'Condominium',
          'TWH': 'Townhouse'
        };
        filters.push(propertyTypeMap[propertyClass] || propertyClass);
      }
      
      if (urlParams.has('min_price') || urlParams.has('max_price')) {
        const minPrice = urlParams.get('min_price');
        const maxPrice = urlParams.get('max_price');
        if (minPrice && maxPrice) {
          filters.push(`$${parseInt(minPrice).toLocaleString()} - $${parseInt(maxPrice).toLocaleString()}`);
        } else if (minPrice) {
          filters.push(`$${parseInt(minPrice).toLocaleString()}+`);
        } else if (maxPrice) {
          filters.push(`Up to $${parseInt(maxPrice).toLocaleString()}`);
        }
      }
      
      if (urlParams.has('min_bedrooms')) {
        const beds = urlParams.get('min_bedrooms')!;
        filters.push(`${beds}+ Bedrooms`);
      }
      
      if (urlParams.has('city')) {
        filters.push(urlParams.get('city')!);
      }
      
      setSearchFilters(filters);
    }
    
    trackEvent('idx_page_view', 'property_search', 'mls_matrix_fullscreen');
  }, [location]);

  const handleBackToHome = () => {
    setLocation('/');
  };

  const handleClearSearch = () => {
    setLocation('/properties');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* IDX Header */}
      <section className="bg-soft-blue text-white py-6">
        <div className="container-width">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white text-soft-blue border-white hover:bg-gray-100"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Search Listings</h1>
                <p className="text-blue-100 text-sm">
                  Search all available properties in the St. Petersburg area using our MLS database
                </p>
                {searchFilters.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {searchFilters.map((filter, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white text-soft-blue border-white hover:bg-gray-100"
                onClick={handleBackToHome}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                {searchFilters.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white text-soft-blue border-white hover:bg-gray-100"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-soft-blue border-white hover:bg-gray-100"
                  onClick={() => window.open(idxUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open MLS in New Tab
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDX iframe */}
      <section className="flex-1" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="w-full h-full">
          <iframe 
            src={idxUrl}
            width="100%" 
            height="100%" 
            style={{ border: 'none' }}
            title="MLS Matrix Property Search"
            className="w-full h-full"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
} 