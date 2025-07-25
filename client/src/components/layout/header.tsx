import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, Mail, ChevronDown, Home, DollarSign, FileText, Calculator, Users, Award } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";
import logo1 from "@assets/ChatGPT Image Jul 22, 2025, 07_33_29 PM_1753231947309.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleCTAClick = () => {
    trackEvent('header_cta_click', 'engagement', 'free_home_valuation');
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Search Listings", href: "/idx-search" },
    { name: "About", href: "/about" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const buyersSellersMenu = {
    name: "Buyers & Sellers",
    items: [
      {
        title: "For Buyers",
        items: [
          { name: "Buyer's Guide", href: "/buyers-guide", icon: Home },
          { name: "Mortgage Calculator", href: "/mortgage-calculator", icon: Calculator },
          { name: "First-Time Buyers", href: "/first-time-buyers", icon: Users },
          { name: "Investment Properties", href: "/investment-properties", icon: DollarSign },
        ]
      },
      {
        title: "For Sellers",
        items: [
          { name: "Seller's Guide", href: "/sellers-guide", icon: FileText },
          { name: "Home Valuation", href: "/home-valuation", icon: Calculator },
          { name: "Selling Process", href: "/selling-process", icon: Award },
          { name: "Market Analysis", href: "/market-analysis", icon: DollarSign },
        ]
      }
    ]
  };

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Contact Info Bar - Desktop */}
      <div className="hidden lg:block bg-gray-50 border-b">
        <div className="container-width py-2">
          <div className="flex justify-end space-x-6 text-sm">
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-soft-blue mr-2" />
              <a href="tel:7275550123" className="text-gray-700 hover:text-soft-blue">
                (727) 555-0123
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-soft-blue mr-2" />
              <a href="/contact" className="text-gray-700 hover:text-soft-blue">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className={`container-width ${isMobile ? 'py-3' : 'py-4'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={logo1} 
                alt="Shoreline Realty Group Logo" 
                className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
              />
              <div>
                <h1 className={`text-slate-gray font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>SHORELINE</h1>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>REALTY GROUP</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className={`font-medium transition-colors cursor-pointer ${
                    isActive(item.href) 
                      ? "text-soft-blue" 
                      : "text-slate-gray hover:text-soft-blue"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            
            {/* Buyers & Sellers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`font-medium transition-colors flex items-center space-x-1 ${
                    location.includes('/buyers') || location.includes('/sellers') || location.includes('/mortgage') || location.includes('/valuation')
                      ? "text-soft-blue" 
                      : "text-slate-gray hover:text-soft-blue"
                  }`}
                >
                  <span>{buyersSellersMenu.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-4">
                <div className="grid grid-cols-2 gap-6">
                  {buyersSellersMenu.items.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="font-semibold text-slate-gray mb-3 text-sm uppercase tracking-wide">
                        {section.title}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => {
                          const IconComponent = item.icon;
                          return (
                            <Link key={itemIndex} href={item.href}>
                              <DropdownMenuItem className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <IconComponent className="w-4 h-4 text-soft-blue" />
                                <span className="text-sm text-slate-gray">{item.name}</span>
                              </DropdownMenuItem>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button 
                className="bg-soft-blue text-white px-6 py-2 hover:bg-ocean-blue font-medium"
                onClick={handleCTAClick}
              >
                Free Home Valuation
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-6 h-6 text-slate-gray" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={logo1} 
                        alt="Shoreline Realty Group Logo" 
                        className="w-8 h-8"
                      />
                      <div>
                        <h2 className="text-slate-gray font-bold text-sm">SHORELINE</h2>
                        <p className="text-gray-600 text-xs">REALTY GROUP</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-soft-blue mr-2" />
                        <a href="tel:7275550123" className="text-gray-700">
                          (727) 555-0123
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-soft-blue mr-2" />
                        <a href="/contact" className="text-gray-700">
                          Email Us
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-4">
                    <nav className="space-y-4">
                      {navigation.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <div 
                            className={`block py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                              isActive(item.href) 
                                ? "bg-soft-blue text-white" 
                                : "text-slate-gray hover:bg-gray-100"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                      
                      {/* Mobile Buyers & Sellers Section */}
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-semibold text-slate-gray mb-3 uppercase tracking-wide">
                          {buyersSellersMenu.name}
                        </h3>
                        {buyersSellersMenu.items.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-4">
                            <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                              {section.title}
                            </h4>
                            <div className="space-y-1 ml-2">
                              {section.items.map((item, itemIndex) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link key={itemIndex} href={item.href}>
                                    <div 
                                      className="flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors cursor-pointer text-slate-gray hover:bg-gray-100"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      <IconComponent className="w-4 h-4 text-soft-blue" />
                                      <span className="text-sm">{item.name}</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-4 border-t">
                    <Link href="/contact">
                      <Button 
                        className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
                        onClick={() => {
                          handleCTAClick();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Free Home Valuation
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
