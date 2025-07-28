import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import PropertyDetail from "@/pages/property-detail";
import About from "@/pages/about";
import Neighborhoods from "@/pages/neighborhoods";
import NeighborhoodDetail from "@/pages/neighborhood-detail";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contact from "@/pages/contact";
import RelocationGuide from "@/pages/relocation-guide";
import IDXSearch from "@/pages/idx-search";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/properties" component={IDXSearch} />
        <Route path="/property/:id" component={PropertyDetail} />
        <Route path="/about" component={About} />
        <Route path="/neighborhoods" component={Neighborhoods} />
        <Route path="/neighborhoods/:slug" component={NeighborhoodDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route path="/relocation-guide" component={RelocationGuide} />
        <Route path="/idx-search" component={IDXSearch} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
