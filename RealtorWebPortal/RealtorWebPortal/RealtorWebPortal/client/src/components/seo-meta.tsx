import { useEffect } from 'react';
import { MetaData, NeighborhoodMetaData, generateStructuredData, generateNeighborhoodStructuredData } from '@/lib/meta';

interface SEOMetaProps {
  metaData: MetaData | NeighborhoodMetaData;
  isNeighborhood?: boolean;
}

export default function SEOMeta({ metaData, isNeighborhood = false }: SEOMetaProps) {
  useEffect(() => {
    // Update document title
    document.title = metaData.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic SEO meta tags
    updateMetaTag('description', metaData.description);
    updateMetaTag('keywords', metaData.keywords.join(', '));
    updateMetaTag('author', 'Shoreline Realty Group');
    updateMetaTag('robots', 'index, follow');

    // Open Graph meta tags (Facebook, LinkedIn)
    updatePropertyTag('og:title', metaData.title);
    updatePropertyTag('og:description', metaData.description);
    updatePropertyTag('og:image', metaData.image);
    updatePropertyTag('og:url', metaData.url);
    updatePropertyTag('og:type', metaData.type);
    updatePropertyTag('og:site_name', 'Shoreline Realty Group');
    updatePropertyTag('og:locale', 'en_US');

    // Twitter Card meta tags
    updatePropertyTag('twitter:card', 'summary_large_image');
    updatePropertyTag('twitter:title', metaData.title);
    updatePropertyTag('twitter:description', metaData.description);
    updatePropertyTag('twitter:image', metaData.image);
    updatePropertyTag('twitter:site', '@shorelinerealty');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = metaData.url;

    // Add structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    if (isNeighborhood) {
      const neighborhoodMeta = metaData as NeighborhoodMetaData;
      script.textContent = JSON.stringify([
        generateStructuredData(neighborhoodMeta),
        generateNeighborhoodStructuredData(neighborhoodMeta)
      ]);
    } else {
      script.textContent = JSON.stringify(generateStructuredData(metaData as NeighborhoodMetaData));
    }
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Reset to default meta data when component unmounts
      document.title = 'Shoreline Realty Group - St. Petersburg Real Estate';
    };
  }, [metaData, isNeighborhood]);

  return null; // This component doesn't render anything
} 