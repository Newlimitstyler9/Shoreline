import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Home, Search, Menu, AlertCircle, RefreshCw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

export default function IDXSearch() {
  const [location, setLocation] = useLocation();
  const [idxUrl, setIdxUrl] = useState("https://stellar.mlsmatrix.com/Matrix/Public/IDXMap.aspx?count=1&idx=cfc86fc2&pv=&or=&embed=true");
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [iframeError, setIframeError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check for URL parameters to customize the IDX search
    const urlParams = new URLSearchParams(window.location.search);
    
    // Build the correct MLS Matrix IDX URL
    const baseUrl = "https://stellar.mlsmatrix.com/Matrix/Public/IDX.aspx";
    const idxParams = new URLSearchParams();
    
    // Always include your IDX ID
    idxParams.append('idx', 'cfc86fc2');
    
    // Copy all search parameters to IDX URL - MLS Matrix will handle them correctly
    Array.from(urlParams.entries()).forEach(([key, value]) => {
      idxParams.append(key, value);
    });
    
    // Build filter display for user
    const filters: string[] = [];
    if (urlParams.has('PropertyType')) {
      filters.push(`Property Type: ${urlParams.get('PropertyType')?.replace(',', ', ')}`);
    }
    if (urlParams.has('ListPriceMin') || urlParams.has('ListPriceMax')) {
      const min = urlParams.get('ListPriceMin');
      const max = urlParams.get('ListPriceMax');
      const priceRange = `${min ? '$' + Number(min).toLocaleString() : 'Any'} - ${max ? '$' + Number(max).toLocaleString() : 'Any'}`;
      filters.push(`Price: ${priceRange}`);
    }
    if (urlParams.has('BedroomsMin')) {
      filters.push(`Min Bedrooms: ${urlParams.get('BedroomsMin')}`);
    }
    if (urlParams.has('City')) {
      filters.push(`Location: ${urlParams.get('City')}`);
    }
    
    setSearchFilters(filters);
    
    // Set the complete IDX URL
    const finalUrl = `${baseUrl}?${idxParams.toString()}`;
    setIdxUrl(finalUrl);
    
    // Track IDX usage
    trackEvent('idx_search_view', 'property_search', 'mls_integration');

    // Check if iframe fails to load after 5 seconds
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [location]);

  const handleBackToHome = () => {
    setLocation('/');
  };

  const handleClearSearch = () => {
    setLocation('/properties');
  };

  const handleOpenNewTab = () => {
    window.open(idxUrl, '_blank');
    trackEvent('idx_external_open', 'property_search', 'new_tab');
  };

  const handleRetryIframe = () => {
    setIframeError(false);
    setShowFallback(false);
    // Force iframe reload by updating URL
    setIdxUrl(idxUrl + (idxUrl.includes('?') ? '&' : '?') + 'reload=' + Date.now());
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Mobile-Optimized IDX Header */}
      <section className="bg-soft-blue text-white py-4 md:py-6 flex-shrink-0">
        <div className="container-width">
          {isMobile ? (
            // Mobile Layout
            <div className="space-y-4">
              {/* Mobile Header Row */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-soft-blue border-white hover:bg-gray-100 text-xs px-2 py-1"
                  onClick={handleBackToHome}
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Back
                </Button>
                <h1 className="text-lg font-bold">MLS Search</h1>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-soft-blue border-white hover:bg-gray-100 text-xs px-2 py-1"
                  onClick={handleOpenNewTab}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open
                </Button>
              </div>
              
              {/* Mobile Description */}
              <div className="text-center">
                <p className="text-blue-100 text-sm">
                  Live MLS search for St. Petersburg properties
                </p>
              </div>
              
              {/* Mobile Search Filters */}
              {searchFilters.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center">
                  {searchFilters.map((filter, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {filter}
                    </span>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-30 text-xs px-2 py-1 ml-2"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Desktop Layout (unchanged)
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
                    onClick={handleOpenNewTab}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Responsive IDX iframe or Fallback */}
      <section className="flex-1 bg-gray-100">
        <div className="w-full h-full relative">
          {showFallback || iframeError ? (
            // Fallback content when iframe is blocked
            <div className="flex items-center justify-center h-full min-h-[500px] bg-white m-4 rounded-lg shadow-lg">
              <div className="text-center max-w-md mx-auto p-8">
                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  MLS Search Temporarily Unavailable
                </h3>
                <p className="text-gray-600 mb-6">
                  The MLS system is currently blocking embedded access. You can still search properties directly on the MLS website.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleOpenNewTab}
                    className="w-full bg-soft-blue text-white hover:bg-ocean-blue py-3"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open MLS Search in New Window
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleRetryIframe}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Loading Again
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleBackToHome}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Browse Featured Properties
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Need help?</strong> Call us at (727) 555-0123 and we'll search the MLS for you!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Normal iframe
            <iframe 
              src={idxUrl}
              width="100%" 
              height="100%" 
              style={{ 
                border: 'none',
                minHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 220px)'
              }}
              title="MLS Matrix Property Search"
              className="w-full h-full"


              allow="fullscreen"
              onError={() => setIframeError(true)}
              onLoad={(e) => {
                // Check if iframe content is blocked
                try {
                  const iframe = e.target as HTMLIFrameElement;
                  if (iframe.contentDocument === null) {
                    setIframeError(true);
                  }
                } catch (error) {
                  setIframeError(true);
                }
              }}
            />
          )}
        </div>
      </section>

      {/* Mobile-only footer for quick actions */}
      {isMobile && (
        <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
          <div className="flex justify-between items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-xs"
              onClick={handleBackToHome}
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Button>
            <Button 
              size="sm"
              className="flex-1 bg-soft-blue text-white hover:bg-ocean-blue text-xs"
              onClick={handleOpenNewTab}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Full Screen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 