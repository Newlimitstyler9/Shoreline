import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LeadForms from "@/components/lead-forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [activeForm, setActiveForm] = useState<"contact" | "consultation" | "valuation">("contact");
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: "123 Beach Drive NE\nSt. Petersburg, FL 33701",
      action: () => {
        trackEvent('contact_info_click', 'engagement', 'address');
        window.open('https://maps.google.com/?q=123+Beach+Drive+NE+St+Petersburg+FL', '_blank');
      }
    },
    {
      icon: Phone,
      title: "Phone",
      details: "(727) 555-0123",
      action: () => {
        trackEvent('contact_info_click', 'engagement', 'phone');
        window.open('tel:+17275550123');
      }
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@shorelinerealty.com",
      action: () => {
        trackEvent('contact_info_click', 'engagement', 'email');
        window.open('mailto:info@shorelinerealty.com');
      }
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon-Fri: 9AM-6PM\nSat-Sun: 10AM-4PM",
      action: null
    }
  ];

  const handleFormSwitch = (formType: "contact" | "consultation" | "valuation") => {
    setActiveForm(formType);
    trackEvent('contact_form_switch', 'engagement', formType);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32">
        <div className="container-width">
          <div className="text-center text-white">
            <h1 className="text-responsive-xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-responsive-md text-gray-100 max-w-3xl mx-auto">
              Ready to start your real estate journey? Contact us today for personalized service 
              and expert guidance in the St. Petersburg market.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white border-b">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center ${info.action ? 'cursor-pointer hover:transform hover:scale-105 transition-transform duration-200' : ''}`}
                  onClick={info.action || undefined}
                >
                  <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-gray mb-2">{info.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-beige">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Forms */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-gray mb-4">How Can We Help You?</h2>
                <p className="text-gray-600 mb-6">
                  Choose the service that best fits your needs, and we'll get back to you promptly.
                </p>
                
                {/* Form Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={activeForm === "contact" ? "default" : "outline"}
                    className={activeForm === "contact" ? "bg-soft-blue text-white" : ""}
                    onClick={() => handleFormSwitch("contact")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    General Inquiry
                  </Button>
                  <Button
                    variant={activeForm === "consultation" ? "default" : "outline"}
                    className={activeForm === "consultation" ? "bg-soft-blue text-white" : ""}
                    onClick={() => handleFormSwitch("consultation")}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                  <Button
                    variant={activeForm === "valuation" ? "default" : "outline"}
                    className={activeForm === "valuation" ? "bg-soft-blue text-white" : ""}
                    onClick={() => handleFormSwitch("valuation")}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Home Valuation
                  </Button>
                </div>
              </div>

              {/* Dynamic Form Content */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  {activeForm === "contact" && (
                    <div>
                      <h3 className="text-xl font-semibold text-slate-gray mb-4">Send us a Message</h3>
                      <LeadForms.Contact />
                    </div>
                  )}
                  
                  {activeForm === "consultation" && (
                    <div>
                      <h3 className="text-xl font-semibold text-slate-gray mb-4">Schedule a Free Consultation</h3>
                      <p className="text-gray-600 mb-6">
                        Meet with our team to discuss your real estate goals and get personalized advice.
                      </p>
                      <LeadForms.Consultation />
                    </div>
                  )}
                  
                  {activeForm === "valuation" && (
                    <div>
                      <h3 className="text-xl font-semibold text-slate-gray mb-4">Get Your Free Home Valuation</h3>
                      <p className="text-gray-600 mb-6">
                        Discover your home's current market value with our comprehensive analysis.
                      </p>
                      <LeadForms.HomeValuation />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Placeholder */}
              <Card className="shadow-lg overflow-hidden">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Find Our Office</h3>
                    <p className="text-sm">123 Beach Drive NE</p>
                    <p className="text-sm">St. Petersburg, FL 33701</p>
                    <Button 
                      className="mt-4 bg-soft-blue text-white hover:bg-ocean-blue"
                      onClick={() => {
                        trackEvent('map_directions_click', 'engagement', 'google_maps');
                        window.open('https://maps.google.com/?q=123+Beach+Drive+NE+St+Petersburg+FL', '_blank');
                      }}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Why Choose Us */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-slate-gray mb-6">Why Choose Shoreline Realty?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-soft-blue rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-gray">Local Expertise</h4>
                        <p className="text-gray-600 text-sm">15+ years of St. Petersburg market knowledge</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-soft-blue rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-gray">Proven Results</h4>
                        <p className="text-gray-600 text-sm">500+ successful transactions</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-soft-blue rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-gray">Client Focused</h4>
                        <p className="text-gray-600 text-sm">Personalized service every step of the way</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="shadow-lg bg-slate-gray text-white">
                <CardContent className="p-8 text-center">
                  <Phone className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Need Immediate Assistance?</h3>
                  <p className="mb-4">Call us directly for urgent real estate matters</p>
                  <Button 
                    className="bg-soft-blue text-white hover:bg-ocean-blue w-full"
                    onClick={() => {
                      trackEvent('emergency_contact_click', 'engagement', 'phone_call');
                      window.open('tel:+17275550123');
                    }}
                  >
                    Call (727) 555-0123
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-gray mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Quick answers to common questions about our services and the St. Petersburg market
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-gray mb-3">How long does it take to sell a home?</h3>
                  <p className="text-gray-600 text-sm">
                    On average, homes in St. Petersburg sell within 30-60 days. However, pricing, condition, 
                    and market conditions all affect timing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-gray mb-3">What's my home worth?</h3>
                  <p className="text-gray-600 text-sm">
                    We provide free, comprehensive market analyses using recent sales data, 
                    current market conditions, and property-specific factors.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-gray mb-3">Do you work with first-time buyers?</h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely! We specialize in helping first-time buyers navigate the process, 
                    from pre-approval to closing and beyond.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-gray mb-3">What areas do you serve?</h3>
                  <p className="text-gray-600 text-sm">
                    We serve all of St. Petersburg and surrounding Pinellas County areas, 
                    with special expertise in waterfront and historic properties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
