export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface NeighborhoodMetaData extends MetaData {
  neighborhoodName: string;
  averagePrice: string;
  location: string;
  schools?: string[];
  amenities?: string[];
  demographics?: string;
  marketTrends?: string;
}

export const defaultMetaData: MetaData = {
  title: 'Shoreline Realty Group - St. Petersburg Real Estate',
  description: 'Premier waterfront properties and exceptional service from your trusted local real estate experts in St. Petersburg, Florida.',
  keywords: ['St. Petersburg real estate', 'Florida waterfront homes', 'Shoreline Realty Group', 'St. Petersburg homes for sale'],
  image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
  url: 'https://shorelinestpete.com',
  type: 'website'
};

export function generateNeighborhoodMetaData(neighborhood: any): NeighborhoodMetaData {
  const baseUrl = 'https://shorelinestpete.com';
  
  return {
    title: `${neighborhood.name} Real Estate - Homes for Sale in St. Petersburg, FL | Shoreline Realty Group`,
    description: `Discover ${neighborhood.name} real estate in St. Petersburg, FL. Find homes for sale in ${neighborhood.name} with average prices around ${neighborhood.averagePriceRange}. Expert local real estate services.`,
    keywords: [
      `${neighborhood.name} real estate`,
      `${neighborhood.name} homes for sale`,
      'St. Petersburg real estate',
      'Florida waterfront homes',
      'Shoreline Realty Group',
      ...(neighborhood.highlights || []).map((highlight: string) => `${highlight} homes St. Petersburg`)
    ],
    image: neighborhood.image || defaultMetaData.image,
    url: `${baseUrl}/neighborhoods/${neighborhood.name.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'website',
    neighborhoodName: neighborhood.name,
    averagePrice: neighborhood.averagePriceRange,
    location: 'St. Petersburg, FL',
    schools: neighborhood.schools,
    amenities: neighborhood.highlights,
    demographics: neighborhood.demographics,
    marketTrends: neighborhood.marketTrends
  };
}

export function generateStructuredData(metaData: NeighborhoodMetaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Shoreline Realty Group',
    'description': metaData.description,
    'url': metaData.url,
    'logo': 'https://shorelinestpete.com/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'St. Petersburg',
      'addressRegion': 'FL',
      'addressCountry': 'US'
    },
    'areaServed': {
      '@type': 'Place',
      'name': metaData.neighborhoodName,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'St. Petersburg',
        'addressRegion': 'FL'
      }
    },
    'serviceType': 'Real Estate Services',
    'priceRange': metaData.averagePrice
  };
}

export function generateNeighborhoodStructuredData(metaData: NeighborhoodMetaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    'name': `${metaData.neighborhoodName} Neighborhood`,
    'description': metaData.description,
    'url': metaData.url,
    'image': metaData.image,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'St. Petersburg',
      'addressRegion': 'FL',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '27.7731',
      'longitude': '-82.6400'
    },
    'amenityFeature': metaData.amenities?.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      'name': amenity
    })),
    'additionalProperty': {
      '@type': 'Property',
      'name': `${metaData.neighborhoodName} Real Estate`,
      'description': `Homes for sale in ${metaData.neighborhoodName}`,
      'priceRange': metaData.averagePrice
    }
  };
} 