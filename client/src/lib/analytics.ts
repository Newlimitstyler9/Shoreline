// Google Analytics 4 (GA4) implementation
// Enhanced tracking for Shoreline Realty website

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // GA4 is already initialized via the script tag in index.html
    console.log('Google Analytics initialized');
  }
};

// Track page views for SPA navigation
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', 'G-6GEJ2E2X4M', {
      page_title: title || document.title,
      page_location: url,
      page_path: url
    });
    console.log('Page view tracked:', url);
  }
};

// Track custom events
export const trackEvent = (action: string, category?: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category || 'engagement',
      event_label: label,
      value: value
    });
    console.log('Event tracked:', action, category, label, value);
  }
};

// Track lead generation events
export const trackLead = (source: string, type: string, value?: number) => {
  trackEvent('lead_generation', 'conversion', `${source}_${type}`, value);
};

// Track property interactions
export const trackPropertyView = (propertyId: string, propertyType: string) => {
  trackEvent('property_view', 'engagement', `${propertyType}_${propertyId}`);
};

// Track search interactions
export const trackSearch = (searchType: string, filters: string) => {
  trackEvent('search', 'engagement', `${searchType}_${filters}`);
};

// Track form submissions
export const trackFormSubmission = (formType: string, source: string) => {
  trackEvent('form_submit', 'conversion', `${formType}_${source}`);
};

// Track phone calls and contact clicks
export const trackContact = (method: string, source: string) => {
  trackEvent('contact', 'engagement', `${method}_${source}`);
};

// Track neighborhood page views
export const trackNeighborhoodView = (neighborhood: string) => {
  trackEvent('neighborhood_view', 'engagement', neighborhood);
};

// Track mortgage calculator usage
export const trackCalculatorUsage = (action: string, details?: string) => {
  trackEvent('calculator_usage', 'engagement', `${action}_${details || ''}`);
};