import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  MapPin, 
  GraduationCap, 
  Car, 
  Utensils, 
  Building, 
  Waves,
  Sun,
  Users,
  DollarSign,
  CheckCircle
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function RelocationGuide() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (data: LeadFormData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        leadSource: "relocation_guide",
        leadType: "lead_magnet",
        message: "Downloaded St. Petersburg Relocation Guide"
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      trackEvent('relocation_guide_download', 'lead_generation', 'form_submission');
      toast({
        title: "Success!",
        description: "Your free relocation guide will be emailed to you shortly.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LeadFormData) => {
    downloadMutation.mutate(data);
  };

  const guideFeatures = [
    {
      icon: MapPin,
      title: "Neighborhood Profiles",
      description: "Detailed breakdown of St. Petersburg's most popular neighborhoods with pricing insights"
    },
    {
      icon: GraduationCap,
      title: "Schools & Education",
      description: "Complete guide to public and private schools, colleges, and educational resources"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Public transit, major highways, airports, and commuting information"
    },
    {
      icon: Utensils,
      title: "Dining & Entertainment",
      description: "Best restaurants, nightlife, cultural attractions, and local hotspots"
    },
    {
      icon: Building,
      title: "Cost of Living",
      description: "Housing costs, utilities, taxes, and general living expenses breakdown"
    },
    {
      icon: Waves,
      title: "Recreation & Lifestyle",
      description: "Beaches, parks, sports, boating, and year-round outdoor activities"
    }
  ];

  const stPeteHighlights = [
    {
      category: "Climate",
      icon: Sun,
      facts: ["260+ sunny days per year", "Average temp: 73°F", "Mild winters, warm summers"]
    },
    {
      category: "Population",
      icon: Users,
      facts: ["265,000+ residents", "Diverse demographics", "Growing tech industry"]
    },
    {
      category: "Economy",
      icon: DollarSign,
      facts: ["No state income tax", "Growing job market", "Tourism & healthcare hubs"]
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="section-padding">
          <div className="container-width">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-gray mb-4">Thank You!</h1>
              <p className="text-gray-600 text-lg mb-8">
                Your free St. Petersburg Relocation Guide has been sent to your email. 
                Check your inbox (and spam folder) for the download link.
              </p>
              <div className="space-y-4">
                <Button 
                  className="bg-soft-blue text-white hover:bg-ocean-blue w-full sm:w-auto"
                  onClick={() => {
                    trackEvent('post_download_action', 'engagement', 'browse_properties');
                    window.location.href = '/properties';
                  }}
                >
                  Browse Properties
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto ml-0 sm:ml-4"
                  onClick={() => {
                    trackEvent('post_download_action', 'engagement', 'schedule_consultation');
                    window.location.href = '/contact';
                  }}
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              Free St. Petersburg Relocation Guide
            </h1>
            <p className="text-responsive-md text-gray-100 mb-8">
              Everything you need to know about moving to St. Petersburg, including neighborhoods, 
              schools, amenities, and insider tips from our local experts.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-white bg-opacity-20 text-white text-lg px-4 py-2">
                <Download className="w-5 h-5 mr-2" />
                40+ Page Guide
              </Badge>
              <Badge className="bg-white bg-opacity-20 text-white text-lg px-4 py-2">
                Local Expert Insights
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Preview and Form */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Guide Content */}
            <div>
              <h2 className="text-2xl font-bold text-slate-gray mb-6">What's Inside the Guide</h2>
              <div className="space-y-6">
                {guideFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-soft-blue rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-gray mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Download Form */}
            <div className="lg:sticky lg:top-8">
              <Card className="shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-gray mb-2">Get Your Free Guide</h3>
                    <p className="text-gray-600">
                      Instant download - no waiting required
                    </p>
                  </div>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className="focus-ring"
                        placeholder="Your first name"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className="focus-ring"
                        placeholder="Your last name"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="focus-ring"
                        placeholder="your@email.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        className="focus-ring"
                        placeholder="(727) 555-0123"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-soft-blue text-white hover:bg-ocean-blue text-lg py-3"
                      disabled={downloadMutation.isPending}
                    >
                      {downloadMutation.isPending ? (
                        "Sending Guide..."
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download Free Guide
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    We respect your privacy. Your information is secure and will not be shared.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* St. Pete Highlights */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-gray mb-4">Why St. Petersburg?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes St. Petersburg one of Florida's most desirable places to call home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stPeteHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-gray mb-4">{highlight.category}</h3>
                    <ul className="space-y-2">
                      {highlight.facts.map((fact, factIndex) => (
                        <li key={factIndex} className="text-gray-600">{fact}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-gray mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-slate-gray">Sarah & Mike Johnson</h4>
                    <p className="text-gray-600 text-sm">Relocated from Denver</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The relocation guide was incredibly helpful! It gave us such great insight into 
                  the different neighborhoods. We ended up in Old Northeast and absolutely love it."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-slate-gray">Robert Chen</h4>
                    <p className="text-gray-600 text-sm">Relocated from Seattle</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Moving from across the country felt overwhelming, but this guide and the Shoreline 
                  team made the process so much easier. Highly recommend!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
