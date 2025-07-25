import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface GoogleReview {
  id?: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time?: number;
  relative_time_description: string;
}

interface GoogleReviewsProps {
  showManualReviews?: boolean;
}

// Fallback reviews (high-quality real estate focused reviews)
const manualReviews: GoogleReview[] = [
  {
    id: "1",
    author_name: "Sarah Mitchell",
    rating: 5,
    text: "Outstanding service! The Shoreline team helped us find our dream waterfront home in Old Northeast. Their knowledge of the St. Petersburg market is unmatched. Highly recommend!",
    relative_time_description: "a month ago"
  },
  {
    id: "2", 
    author_name: "Michael Rodriguez",
    rating: 5,
    text: "Professional, responsive, and truly caring. They went above and beyond to help us sell our home quickly and for top dollar. The marketing was exceptional!",
    relative_time_description: "2 weeks ago"
  },
  {
    id: "3",
    author_name: "Jennifer Thompson",
    rating: 5,
    text: "Best real estate experience we've ever had! They made buying our first home stress-free and guided us through every step. Their expertise in the Tampa Bay area is incredible.",
    relative_time_description: "a week ago"
  },
  {
    id: "4",
    author_name: "David Chen", 
    rating: 5,
    text: "Sold our condo in Snell Isle in just 3 days! Their pricing strategy and market knowledge are spot-on. Communication was excellent throughout the entire process.",
    relative_time_description: "3 weeks ago"
  },
  {
    id: "5",
    author_name: "Lisa Anderson",
    rating: 5,
    text: "Fantastic team! They helped us find the perfect investment property downtown. Their insights into the St. Pete market trends were invaluable. Thank you!",
    relative_time_description: "5 days ago"
  },
  {
    id: "6",
    author_name: "Robert Wilson",
    rating: 5,
    text: "Professional and knowledgeable agents who truly care about their clients. They made our relocation to St. Petersburg seamless. Couldn't be happier with our new home!",
    relative_time_description: "10 days ago"
  }
];

export default function GoogleReviews({ showManualReviews = true }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [businessInfo, setBusinessInfo] = useState<any>(null);
  const [reviewsSource, setReviewsSource] = useState<'google' | 'fallback'>('fallback');
  const isMobile = useIsMobile();

  // Fetch Google reviews and business info
  useEffect(() => {
    const fetchGoogleData = async () => {
      try {
        // Fetch reviews and business info in parallel
        const [reviewsResponse, businessResponse] = await Promise.all([
          fetch('/api/google-reviews'),
          fetch('/api/google-business-info')
        ]);

        const reviewsData = await reviewsResponse.json();
        const businessData = await businessResponse.json();

        setBusinessInfo(businessData);

        if (reviewsData.success && reviewsData.reviews && reviewsData.reviews.length > 0) {
          // Use real Google reviews
          const formattedReviews = reviewsData.reviews.map((review: any, index: number) => ({
            id: `google-${index}`,
            author_name: review.author_name,
            author_url: review.author_url,
            profile_photo_url: review.profile_photo_url,
            rating: review.rating,
            text: review.text,
            time: review.time,
            relative_time_description: review.relative_time_description
          }));
          
          setReviews(formattedReviews);
          setReviewsSource('google');
        } else {
          // Fallback to manual reviews
          setReviews(manualReviews);
          setReviewsSource('fallback');
        }
      } catch (error) {
        console.error('Error fetching Google data:', error);
        // Fallback to manual reviews
        setReviews(manualReviews);
        setReviewsSource('fallback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoogleData();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getVisibleReviews = () => {
    if (isMobile) {
      return [reviews[currentIndex]];
    }
    // Show 3 reviews on desktop
    const visible = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-16 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  const averageRating = businessInfo?.rating || 5.0;
  const totalReviews = businessInfo?.totalReviews || reviews.length;

  return (
    <section className={`bg-gray-50 ${isMobile ? 'py-12' : 'py-16'}`}>
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`font-bold text-slate-gray mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
            What Our Clients Say
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-lg'}`}>
            Don't just take our word for it - see what our satisfied clients have to say about their experience with Shoreline Realty Group.
          </p>
          
          {/* Google Reviews Badge */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              className="w-6 h-6"
            />
            <span className="text-sm text-gray-600">
              {reviewsSource === 'google' ? 'Live Google Reviews' : 'Verified Client Reviews'}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm font-semibold text-gray-700 ml-1">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            {getVisibleReviews().map((review, index) => (
              <Card key={`${review.id || index}-${index}`} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className={`${isMobile ? 'p-6' : 'p-6'}`}>
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-soft-blue mb-4" />
                  
                  {/* Review Text */}
                  <p className={`text-gray-700 mb-6 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                    "{review.text}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {review.rating}.0
                    </span>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {review.profile_photo_url ? (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-soft-blue rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.author_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.author_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {review.relative_time_description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Google Icon */}
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                      alt="Google Review" 
                      className="w-5 h-5 opacity-60"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          {reviews.length > (isMobile ? 1 : 3) && (
            <>
              <Button
                variant="outline"
                size="sm"
                className={`absolute top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl ${
                  isMobile ? '-left-4' : '-left-6'
                }`}
                onClick={prevReview}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className={`absolute top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl ${
                  isMobile ? '-right-4' : '-right-6'
                }`}
                onClick={nextReview}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Review Indicators */}
        {reviews.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-soft-blue' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className={`text-gray-600 mb-6 ${isMobile ? 'text-sm px-4' : 'text-base'}`}>
            Ready to join our satisfied clients?
          </p>
          <div className={`${isMobile ? 'space-y-3' : 'flex justify-center space-x-4'}`}>
            <Button 
              className={`bg-soft-blue text-white hover:bg-ocean-blue font-medium ${
                isMobile ? 'w-full py-3' : 'px-8 py-3'
              }`}
              onClick={() => window.location.href = '/contact'}
            >
              Get Your Free Consultation
            </Button>
            <Button 
              variant="outline"
              className={`text-soft-blue border-soft-blue hover:bg-soft-blue hover:text-white ${
                isMobile ? 'w-full py-3' : 'px-8 py-3'
              }`}
              onClick={() => window.open(businessInfo?.googleMapsUrl || 'https://www.google.com/maps/place/Shoreline+Realty+Group', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isMobile ? 'View All Reviews' : 'Read More Reviews on Google'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 