import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import logo1 from "@assets/ChatGPT Image Jul 22, 2025, 07_33_29 PM_1753231947309.png";

export default function Header() {
  const [location] = useLocation();
  
  const handleCTAClick = () => {
    trackEvent('header_cta_click', 'engagement', 'free_home_valuation');
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Search Listings", href: "/properties" },
    { name: "About", href: "/about" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container-width py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={logo1} 
                alt="Shoreline Realty Group Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-slate-gray font-bold text-xl">SHORELINE</h1>
                <p className="text-gray-600 text-sm">REALTY GROUP</p>
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-6 h-6 text-slate-gray" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-6 border-b">
                    <img 
                      src={logo1} 
                      alt="Shoreline Realty Group Logo" 
                      className="w-10 h-10"
                    />
                    <div>
                      <h2 className="text-slate-gray font-bold text-lg">SHORELINE</h2>
                      <p className="text-gray-600 text-xs">REALTY GROUP</p>
                    </div>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <div className="space-y-4">
                      {navigation.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <div 
                            className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                              isActive(item.href)
                                ? "bg-soft-blue text-white"
                                : "text-slate-gray hover:bg-gray-100"
                            }`}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mobile CTA */}
                  <div className="pt-6 border-t">
                    <Link href="/contact">
                      <Button 
                        className="bg-soft-blue text-white w-full py-3 hover:bg-ocean-blue font-medium"
                        onClick={handleCTAClick}
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
