import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Youtube, Home } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import logo1 from "@assets/ChatGPT Image Jul 22, 2025, 07_33_29 PM_1753231947309.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      setEmail("");
      trackEvent('newsletter_signup', 'lead_generation', 'footer');
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const handleSocialClick = (platform: string) => {
    trackEvent('social_media_click', 'engagement', platform);
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Search Properties", href: "/properties" },
    { name: "About Us", href: "/about" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Buying Homes", href: "/properties", id: "buying" },
    { name: "Selling Homes", href: "/contact", id: "selling" },
    { name: "Property Valuation", href: "/contact", id: "valuation" },
    { name: "Investment Properties", href: "/properties", id: "investment" },
    { name: "Market Analysis", href: "/blog", id: "analysis" },
    { name: "Relocation Services", href: "/relocation-guide", id: "relocation" },
  ];

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: "https://facebook.com/shorelinerealty",
      color: "hover:bg-blue-600"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "https://instagram.com/shorelinerealty",
      color: "hover:bg-pink-600"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://linkedin.com/company/shorelinerealty",
      color: "hover:bg-blue-700"
    },
    { 
      name: "YouTube", 
      icon: Youtube, 
      href: "https://youtube.com/shorelinerealty",
      color: "hover:bg-red-600"
    },
  ];

  return (
    <footer className="bg-slate-gray text-white py-12">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logo1} 
                alt="Shoreline Realty Group Logo" 
                className="w-12 h-12 bg-soft-blue rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-xl">SHORELINE</h3>
                <p className="text-gray-300 text-sm">REALTY GROUP</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted real estate partner in St. Petersburg, Florida. 
              Helping families find their dream homes since 2009.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-soft-blue rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                    onClick={() => handleSocialClick(social.name.toLowerCase())}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={`quick-${link.href}`}>
                  <Link href={link.href}>
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={`service-${service.id}`}>
                  <Link href={service.href}>
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Get the latest market insights and property updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-soft-blue focus:border-soft-blue"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-soft-blue text-white py-2 hover:bg-ocean-blue font-medium"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 Shoreline Realty Group. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </span>
            </Link>
            <Link href="/cookies">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Cookie Policy
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
