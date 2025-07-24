export interface NeighborhoodData {
  name: string;
  city: string;
  description: string;
  image: string;
  averagePriceRange: string;
  highlights: string[];
  schools?: string[];
  amenities?: string[];
  demographics?: string;
  marketTrends?: string;
}

export const neighborhoodsData: NeighborhoodData[] = [
  {
    name: "St. Petersburg",
    city: "St. Petersburg",
    description: "Nestled along the serene Florida Gulf Coast, the St. Petersburg neighborhood is a dynamic community that blends cultural richness with coastal charm. Known for its vibrant arts scene and a plethora of outdoor activities, this neighborhood offers something for everyone.",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $800K",
    highlights: ["Vibrant Arts Scene", "Coastal Charm", "Cultural Richness", "Outdoor Activities", "World-Class Museums", "Beautiful Parks"],
    amenities: ["Fort De Soto Park", "Vinoy Park", "Museum of Fine Arts", "Dalí Museum", "Central Avenue", "Waterfront Views"],
    demographics: "Diverse community of artists, professionals, and families",
    marketTrends: "Growing arts and cultural scene with increasing property values"
  },
  {
    name: "Historic Kenwood",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, Historic Kenwood is a vibrant neighborhood known for its charming bungalows, artistic flair, and welcoming community spirit. Known as the 'Neighborhood of the Arts,' Kenwood boasts an eclectic mix of galleries and home studios.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $750K",
    highlights: ["Historic Bungalows", "Artistic Community", "Gallery District", "Charming Architecture", "Walkable Streets", "Arts Enclave"],
    amenities: ["Gladden Park", "Dell Holmes Park", "Museum of Fine Arts", "Morean Arts Center", "Kenwood Artists Enclave", "Downtown Access"],
    demographics: "Artists, young professionals, and families seeking historic charm",
    marketTrends: "Historic preservation with growing arts community"
  },
  {
    name: "Old Northeast",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, the Old Northeast neighborhood offers an enchanting blend of historic charm and modern conveniences. Known for its beautiful brick streets, vintage architecture, and vibrant community, Old Northeast is the perfect place to experience Florida living with a touch of nostalgia.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$500K - $1.2M",
    highlights: ["Historic Architecture", "Brick Streets", "Vintage Charm", "Waterfront Views", "Walkable Community", "Preserved Homes"],
    amenities: ["North Shore Park", "Vinoy Park", "Museum of Fine Arts", "Central Avenue", "Bayside Vistas", "Historic Landmarks"],
    demographics: "Families, professionals, and history enthusiasts",
    marketTrends: "Historic preservation with premium property values"
  },
  {
    name: "Snell Isle",
    city: "St. Petersburg",
    description: "Welcome to the picturesque Snell Isle neighborhood in St. Petersburg, Florida. Known for its elegant waterfront homes and lush landscapes, Snell Isle offers residents a tranquil yet vibrant living environment. Explore a community that balances relaxation with cultural enrichment, offering a plethora of exciting amenities.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$800K - $2.5M",
    highlights: ["Waterfront Homes", "Luxury Living", "Elegant Architecture", "Lush Landscapes", "Tranquil Environment", "Cultural Access"],
    amenities: ["North Shore Park", "Vinoy Park", "Museum of Fine Arts", "Dalí Museum", "Downtown St. Petersburg", "Water Views"],
    demographics: "Affluent families, executives, and luxury home buyers",
    marketTrends: "Premium waterfront properties with high demand"
  },
  {
    name: "Shore Acres",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, Shore Acres is a picturesque neighborhood renowned for its scenic beauty and vibrant community. With its appealing mix of residential comfort and natural charm, this area offers a perfect blend for families and professionals alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Scenic Beauty", "Natural Charm", "Residential Comfort", "Waterfront Access", "Family-Friendly", "Community Spirit"],
    amenities: ["Shore Acres Mini Park", "ELVA R. Estel Memorial Garden Park", "Museum of Fine Arts", "The Studio@620", "Downtown Access", "Water Activities"],
    demographics: "Families and professionals seeking natural beauty",
    marketTrends: "Growing demand for waterfront and natural settings"
  },
  {
    name: "Historic Roser Park",
    city: "St. Petersburg",
    description: "Nestled within the vibrant city of St. Petersburg, the Historic Roser Park neighborhood is renowned for its unique blend of historic charm and modern conveniences. This picturesque area is a treasure trove for those seeking an active and culturally enriched lifestyle.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$450K - $950K",
    highlights: ["Mediterranean Revival", "Historic Charm", "Walkable Community", "Cultural Enrichment", "Preserved Architecture", "Active Lifestyle"],
    amenities: ["Boyd Hill Nature Preserve", "Del Holmes Park", "Museum of Fine Arts", "Florida Holocaust Museum", "The Left Bank Bistro", "The Inverted Arts Studio"],
    demographics: "History enthusiasts, professionals, and culture lovers",
    marketTrends: "Historic preservation with growing cultural scene"
  },
  {
    name: "Crescent Lake",
    city: "St. Petersburg",
    description: "Welcome to the Crescent Lake neighborhood, a serene oasis nestled in the heart of St. Petersburg, Florida. Renowned for its lush landscapes and vibrant community, Crescent Lake is the perfect blend of urban convenience and natural beauty.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $750K",
    highlights: ["Lush Landscapes", "Natural Beauty", "Urban Convenience", "Community Spirit", "Recreational Activities", "Cultural Access"],
    amenities: ["Crescent Lake Park", "Museum of Fine Arts", "St. Petersburg Arts Alliance", "Central Avenue", "Walking Trails", "Picnic Areas"],
    demographics: "Families, nature lovers, and community-oriented residents",
    marketTrends: "Growing demand for natural settings with urban access"
  },
  {
    name: "Allendale Terrace",
    city: "St. Petersburg",
    description: "Welcome to Allendale Terrace, a picturesque neighborhood nestled in the heart of St. Petersburg, Florida. Known for its historic architecture and friendly community atmosphere, Allendale Terrace is an ideal location for families, young professionals, and retirees alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Historic Architecture", "Friendly Community", "Family-Friendly", "Walkable Streets", "Suburban Tranquility", "Urban Access"],
    amenities: ["Crescent Lake Park", "Lealman Community Park", "Museum of Fine Arts", "Dalí Museum", "Downtown St. Petersburg", "Excellent Schools"],
    demographics: "Families, young professionals, and retirees",
    marketTrends: "Affordable historic homes with strong community appeal"
  },
  {
    name: "Edgemoor",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, the Edgemoor neighborhood offers a blend of tranquil suburban living and vibrant urban amenities. Ideal for families and professionals alike, Edgemoor boasts lush greenery, serene streets, and a close-knit community atmosphere.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Tranquil Living", "Suburban Charm", "Lush Greenery", "Close-Knit Community", "Family-Friendly", "Urban Access"],
    amenities: ["Weedon Island Preserve", "Great Explorations Children's Museum", "Museum of Fine Arts", "Sunken Gardens", "Urban Brew and BBQ", "The Birchwood"],
    demographics: "Families and professionals seeking suburban tranquility",
    marketTrends: "Affordable family homes with growing demand"
  },
  {
    name: "Coquina Key",
    city: "St. Petersburg",
    description: "Discover the serene charm of Coquina Key, a picturesque neighborhood in St. Petersburg, Florida, renowned for its tranquil waterfront living and close-knit community. Often referred to as the 'Friendly Island,' Coquina Key offers an idyllic lifestyle with easy access to vibrant city amenities.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Waterfront Living", "Friendly Island", "Tranquil Environment", "Close-Knit Community", "Recreational Parks", "Cultural Access"],
    amenities: ["Coquina Key Park", "Wekiva Park", "Museum of Fine Arts", "Dalí Museum", "Chattaway Restaurant", "Fleamasters Fleamarket"],
    demographics: "Families and professionals seeking waterfront tranquility",
    marketTrends: "Growing demand for waterfront properties with community appeal"
  },
  {
    name: "Old Southeast",
    city: "St. Petersburg",
    description: "Welcome to the Old Southeast neighborhood in St. Petersburg, Florida, a charming area known for its scenic beauty, rich history, and vibrant community life. Nestled along the sparkling shores of Tampa Bay, this neighborhood offers a unique blend of historic architecture and modern amenities.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$450K - $950K",
    highlights: ["Scenic Beauty", "Rich History", "Vibrant Community", "Historic Architecture", "Waterfront Views", "Cultural Access"],
    amenities: ["Lassing Park", "Museum of Fine Arts", "Dalí Museum", "Downtown St. Petersburg", "Waterfront Activities", "Local Dining"],
    demographics: "History enthusiasts, families, and culture lovers",
    marketTrends: "Historic preservation with growing waterfront appeal"
  },
  {
    name: "Greater Pinellas Point",
    city: "St. Petersburg",
    description: "Welcome to the vibrant neighborhood of Greater Pinellas Point in the beautiful city of St. Petersburg, Florida. Known for its scenic views and lush greenery, Greater Pinellas Point offers an ideal blend of relaxed lifestyle and city convenience.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $750K",
    highlights: ["Scenic Views", "Lush Greenery", "Relaxed Lifestyle", "City Convenience", "Nature Preserves", "Cultural Access"],
    amenities: ["Boyd Hill Nature Preserve", "Lake Vista Park", "Museum of Fine Arts", "Dalí Museum", "Downtown St. Petersburg", "Local Markets"],
    demographics: "Nature enthusiasts, families, and professionals seeking tranquility",
    marketTrends: "Growing demand for natural settings with urban convenience"
  },
  {
    name: "Broadwater",
    city: "St. Petersburg",
    description: "The Broadwater neighborhood in St. Petersburg offers a unique blend of tranquility and vibrancy, making it an ideal place for families, retirees, and young professionals alike. This coastal community is renowned for its stunning waterfront views, diverse architecture, and friendly atmosphere.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$500K - $1.1M",
    highlights: ["Waterfront Views", "Diverse Architecture", "Friendly Atmosphere", "Coastal Community", "Cultural Access", "Outdoor Activities"],
    amenities: ["Fort De Soto Park", "Boyd Hill Nature Preserve", "Museum of Fine Arts", "Museum of the American Arts and Crafts Movement", "Fresco's Waterfront Bistro", "Jannus Live"],
    demographics: "Families, retirees, and young professionals seeking coastal living",
    marketTrends: "Premium coastal properties with strong cultural appeal"
  },
  {
    name: "Jungle Terrace",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Jungle Terrace offers residents a blend of natural beauty and cultural richness. Known for its vibrant community and lush landscapes, this neighborhood is a hidden gem in Florida's Tampa Bay area.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Natural Beauty", "Cultural Richness", "Vibrant Community", "Lush Landscapes", "Outdoor Activities", "Arts District"],
    amenities: ["Walter Fuller Park", "War Veterans Memorial Park", "Museum of Fine Arts", "Sunken Gardens", "Central Avenue Arts District", "Local Eateries"],
    demographics: "Nature lovers, culture enthusiasts, and community-oriented residents",
    marketTrends: "Affordable homes with growing cultural and natural appeal"
  },
  {
    name: "Disston Heights",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, Disston Heights is a charming, family-friendly neighborhood offering a perfect blend of convenience and community charm. Known for its suburban feel and tree-lined streets, Disston Heights provides a warm and welcoming atmosphere for residents and visitors alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Family-Friendly", "Suburban Feel", "Tree-Lined Streets", "Warm Community", "Convenient Location", "Cultural Access"],
    amenities: ["Azalea Park", "Leslie Currie Park", "St. Petersburg Waterfront", "Museum of Fine Arts", "St. Petersburg Arts Alliance", "Local Shopping"],
    demographics: "Families, young professionals, and retirees seeking suburban comfort",
    marketTrends: "Affordable family homes with strong community appeal"
  },
  {
    name: "Bayway Isles",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Florida, Bayway Isles is a prestigious gated community known for its stunning waterfront views and luxurious homes. This exclusive neighborhood offers unparalleled access to the vibrant lifestyle and natural beauty of the Sunshine State, making it a prime destination for homeowners seeking tranquility and elegance.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$1M - $3M",
    highlights: ["Prestigious Gated Community", "Waterfront Views", "Luxurious Homes", "Exclusive Living", "Natural Beauty", "Cultural Access"],
    amenities: ["Fort De Soto Park", "Museum of Fine Arts", "Dalí Museum", "St. Pete Beach", "St. Petersburg Saturday Morning Market", "Downtown Access"],
    demographics: "Affluent homeowners seeking luxury and exclusivity",
    marketTrends: "Premium luxury properties with high demand and exclusivity"
  },
  {
    name: "Tierra Verde",
    city: "St. Petersburg",
    description: "Nestled along Florida's Gulf Coast, Tierra Verde is a captivating neighborhood that offers an unparalleled blend of coastal living and vibrant Florida charm. Known for its stunning waterfront views, Tierra Verde is a sanctuary for those seeking both serenity and adventure.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$600K - $1.5M",
    highlights: ["Coastal Living", "Waterfront Views", "Florida Charm", "Serenity", "Adventure", "Cultural Access"],
    amenities: ["Fort De Soto Park", "Museum of Fine Arts", "Warehouse Arts District", "The Island Grille & Raw Bar", "Local Boutiques", "Water Activities"],
    demographics: "Seasonal and year-round residents seeking coastal luxury",
    marketTrends: "Growing demand for coastal properties with luxury amenities"
  },
  {
    name: "Largo",
    city: "Largo",
    description: "The vibrant Largo neighborhood is a hidden gem offering a perfect blend of urban charm and natural beauty. Nestled in a strategic location, Largo presents an inviting atmosphere for families, young professionals, and retirees alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Urban Charm", "Natural Beauty", "Strategic Location", "Inviting Atmosphere", "Community Spirit", "Cultural Access"],
    amenities: ["John S. Taylor Park", "Eagle Lake Park", "Largo Arts Center", "Largo History Museum", "Largo Mall", "Local Dining"],
    demographics: "Families, young professionals, and retirees seeking community",
    marketTrends: "Affordable homes with growing community and cultural appeal"
  },
  {
    name: "Gulfport",
    city: "Gulfport",
    description: "Gulfport, nestled along the picturesque shores of Florida's Gulf Coast, offers a unique blend of natural beauty and cultural richness. Known for its charming atmosphere and community spirit, this neighborhood attracts visitors and residents alike who are looking for a dynamic coastal lifestyle.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Natural Beauty", "Cultural Richness", "Charming Atmosphere", "Community Spirit", "Coastal Lifestyle", "Arts Scene"],
    amenities: ["Gulfport's Local Parks", "War Veterans' Memorial Park", "Clam Bayou Nature Park", "Gulfport Historical Society", "Z Gallery", "Gulfport Art Walk"],
    demographics: "Artists, culture enthusiasts, and coastal lifestyle seekers",
    marketTrends: "Growing demand for coastal properties with cultural appeal"
  },
  {
    name: "Kenneth City",
    city: "Kenneth City",
    description: "Nestled in the heart of Pinellas County, Kenneth City offers a unique blend of suburban tranquility and urban excitement. This charming neighborhood is perfect for families and individuals seeking a community-oriented atmosphere. With its tree-lined streets, welcoming vibe, and proximity to major attractions, Kenneth City is an ideal place to call home.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$200K - $500K",
    highlights: ["Suburban Tranquility", "Urban Excitement", "Community-Oriented", "Tree-Lined Streets", "Welcoming Vibe", "Strategic Location"],
    amenities: ["Fossil Park", "Walsingham Park", "Museum of Fine Arts", "Tampa Bay Center", "Top-Rated Schools", "Community Events"],
    demographics: "Families and individuals seeking community atmosphere",
    marketTrends: "Affordable suburban homes with growing community appeal"
  },
  {
    name: "Clearwater",
    city: "Clearwater",
    description: "Welcome to the Clearwater neighborhood, a thriving and picturesque community known for its beautiful landscapes and vibrant lifestyle. Whether you're a nature enthusiast or a culture lover, Clearwater offers something for everyone.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $800K",
    highlights: ["Beautiful Landscapes", "Vibrant Lifestyle", "Nature Enthusiasts", "Culture Lovers", "Outdoor Activities", "Community Spirit"],
    amenities: ["Cooper's Park", "Clearwater Mountain Park", "Clearwater Historical Museum", "Clearwater Art Gallery", "Clearwater Tavern", "Clearwater Farmers Market"],
    demographics: "Nature enthusiasts, culture lovers, and families",
    marketTrends: "Growing demand for properties with natural and cultural amenities"
  },
  {
    name: "Pinellas Park",
    city: "Pinellas Park",
    description: "Nestled in the heart of Florida's bustling Tampa Bay area, Pinellas Park is a thriving community known for its charm, entertainment, and outdoor adventures. This neighborhood offers an inviting blend of suburban tranquility and urban conveniences, making it a sought-after destination for families and professionals alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Charm", "Entertainment", "Outdoor Adventures", "Suburban Tranquility", "Urban Conveniences", "Family-Friendly"],
    amenities: ["Helen Howarth Park", "England Brothers Bandshell Park", "Pinellas Park Equestrian Center", "Pinellas Arts Village", "Great Explorations Children's Museum", "Country in the Park Festival"],
    demographics: "Families and professionals seeking suburban-urban balance",
    marketTrends: "Affordable homes with growing entertainment and cultural appeal"
  },
  {
    name: "Seminole",
    city: "Seminole",
    description: "Discover the Seminole neighborhood, a place where community, culture, and nature thrive in perfect harmony. Known for its stunning green spaces, Seminole offers access to several local parks that perfectly capture the beauty of the area.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Community Harmony", "Cultural Richness", "Natural Beauty", "Stunning Green Spaces", "Dynamic Lifestyle", "Family-Friendly"],
    amenities: ["XYZ Park", "ABC Nature Preserve", "Seminole Museum", "Contemporary Art Center", "Local Dining", "Shopping Centers"],
    demographics: "Families, professionals, and retirees seeking community harmony",
    marketTrends: "Growing demand for properties with community and cultural appeal"
  },
  {
    name: "Dunedin",
    city: "Dunedin",
    description: "Nestled along the Gulf Coast in Florida, the Dunedin neighborhood offers a delightful blend of natural beauty and cultural richness. Known for its quaint downtown area, Dunedin is a vibrant community with much to offer. Whether you're a resident or a visitor, the neighborhood provides a remarkable experience for all.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $800K",
    highlights: ["Natural Beauty", "Cultural Richness", "Quaint Downtown", "Vibrant Community", "Gulf Coast Living", "Artistic Scene"],
    amenities: ["Honeymoon Island State Park", "Pioneer Park", "Dunedin Fine Art Center", "The Oat Depot", "Main Street Boutiques", "Local Breweries"],
    demographics: "Artists, nature lovers, and community-oriented residents",
    marketTrends: "Growing demand for coastal properties with cultural amenities"
  },
  {
    name: "Palm Harbor",
    city: "Palm Harbor",
    description: "Welcome to Palm Harbor, a picturesque community nestled along the Gulf Coast of Florida, known for its relaxing lifestyle and abundant recreational activities. This beloved neighborhood offers everything you need for a serene yet engaging living experience.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Relaxing Lifestyle", "Abundant Recreation", "Gulf Coast Living", "Serene Environment", "Community Events", "Natural Beauty"],
    amenities: ["John Chesnut Sr. Park", "Honeymoon Island State Park", "Palm Harbor Museum", "Downtown Boutiques", "Local Eateries", "Farmers Markets"],
    demographics: "Families, retirees, and nature enthusiasts seeking coastal living",
    marketTrends: "Growing demand for coastal properties with community amenities"
  },
  {
    name: "Tarpon Springs",
    city: "Tarpon Springs",
    description: "Welcome to Tarpon Springs, a vibrant neighborhood known for its rich Greek heritage, waterfront scenery, and thriving cultural scene. Nestled along Florida's stunning Gulf Coast, Tarpon Springs offers an inviting blend of historical charm and modern amenities.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $800K",
    highlights: ["Greek Heritage", "Waterfront Scenery", "Thriving Cultural Scene", "Historical Charm", "Modern Amenities", "Gulf Coast Living"],
    amenities: ["Anclote Key Preserve State Park", "Fred Howard Park", "Tarpon Springs Heritage Museum", "Leepa-Rattner Museum of Art", "Hellas Restaurant", "Sponge Docks"],
    demographics: "Culture enthusiasts, history buffs, and waterfront lovers",
    marketTrends: "Growing demand for properties with cultural and waterfront appeal"
  },
  {
    name: "Redington Shores",
    city: "Redington Shores",
    description: "Located in the picturesque Gulf Coast of Florida, Redington Shores is a vibrant neighborhood known for its sun-kissed beaches and delightful community atmosphere. This charming locale offers an ideal blend of relaxation and recreational activities, perfect for both residents and visitors alike.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$500K - $1.2M",
    highlights: ["Sun-Kissed Beaches", "Delightful Community", "Relaxation", "Recreational Activities", "Gulf Coast Living", "Waterfront Views"],
    amenities: ["Fort De Soto Park", "Boca Ciega Millennium Park", "Heritage Village", "Florida Holocaust Museum", "The Conch Republic Grill", "John's Pass Village & Boardwalk"],
    demographics: "Beach lovers, retirees, and waterfront enthusiasts",
    marketTrends: "Premium beachfront properties with high demand"
  },
  {
    name: "Redington Beach",
    city: "Redington Beach",
    description: "Redington Beach is a captivating coastal enclave that offers a perfect blend of relaxation, community, and adventure on Florida's stunning Gulf Coast. Known for its pristine sandy shores and tranquil ambiance, this charming neighborhood is an ideal destination for both homeowners and visitors seeking a slice of paradise.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$600K - $1.5M",
    highlights: ["Coastal Enclave", "Relaxation", "Community Spirit", "Adventure", "Pristine Sandy Shores", "Tranquil Ambiance"],
    amenities: ["North Redington Beach Park", "Seminole City Park", "Armed Forces History Museum", "Florida Holocaust Museum", "Seabreeze Island Grill", "Gulf Boulevard"],
    demographics: "Coastal lifestyle seekers, retirees, and vacation home buyers",
    marketTrends: "Premium coastal properties with luxury appeal"
  },
  {
    name: "North Redington Beach",
    city: "North Redington Beach",
    description: "Located along the stunning Gulf Coast, North Redington Beach is a serene neighborhood that promises a perfect blend of relaxation and recreation. With its pristine sands, clear waters, and warm community vibe, this area is ideal for those looking to escape the hustle and bustle of city life.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$550K - $1.3M",
    highlights: ["Serene Environment", "Relaxation", "Recreation", "Pristine Sands", "Clear Waters", "Warm Community"],
    amenities: ["Boca Ciega Millennium Park", "Del Bello Park", "Gulf Beaches Historical Museum", "Wahoo's Waterside Pub & Patio", "Local Boutiques", "Beach Activities"],
    demographics: "Beach enthusiasts, nature lovers, and history buffs",
    marketTrends: "Premium beachfront properties with growing demand"
  },
  {
    name: "Indian Rocks Beach",
    city: "Indian Rocks Beach",
    description: "Nestled along Florida's stunning Gulf Coast, Indian Rocks Beach is a picturesque neighborhood offering serene beaches, vibrant community life, and abundant recreational opportunities. With its inviting atmosphere and natural beauty, it's no wonder visitors and residents alike are drawn to this idyllic area.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$450K - $1.1M",
    highlights: ["Serene Beaches", "Vibrant Community", "Recreational Opportunities", "Inviting Atmosphere", "Natural Beauty", "Gulf Coast Living"],
    amenities: ["Indian Rocks Beach", "Indian Rocks Beach Nature Preserve", "Indian Rocks Historical Museum", "Kolb Park", "Brown Park", "John's Pass Village & Boardwalk"],
    demographics: "Beach lovers, families, and recreational enthusiasts",
    marketTrends: "Growing demand for beachfront properties with community appeal"
  },
  {
    name: "Indian Shores",
    city: "Indian Shores",
    description: "Nestled along the picturesque Gulf Coast of Florida, Indian Shores is a vibrant neighborhood known for its stunning beaches, thriving arts scene, and family-friendly environment. Its prime location makes it a popular destination for both residents and visitors seeking the perfect blend of relaxation and cultural enrichment.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$500K - $1.2M",
    highlights: ["Stunning Beaches", "Thriving Arts Scene", "Family-Friendly", "Prime Location", "Relaxation", "Cultural Enrichment"],
    amenities: ["Myakka River State Park", "Fort De Soto Park", "Salvador Dali Museum", "Florida Museum of Photographic Arts", "Sea Critters Café", "Local Boutiques"],
    demographics: "Art enthusiasts, families, and beach lovers",
    marketTrends: "Premium beachfront properties with cultural appeal"
  },
  {
    name: "Madeira Beach",
    city: "Madeira Beach",
    description: "Madeira Beach, located on Florida's beautiful Gulf coast, is a vibrant neighborhood known for its stunning beaches and lively community life. Whether you're a resident or a visitor, Madeira Beach offers a plethora of activities and attractions that cater to all ages.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$450K - $1.1M",
    highlights: ["Stunning Beaches", "Lively Community", "Gulf Coast Living", "All-Ages Activities", "Waterfront Views", "Community Spirit"],
    amenities: ["John's Pass Park", "Archibald Memorial Beach Park", "Gulf Beaches Historical Museum", "Alligator & Wildlife Discovery Center", "John's Pass Village and Boardwalk", "Mad Beach Fish House"],
    demographics: "Families, beach enthusiasts, and community-oriented residents",
    marketTrends: "Growing demand for beachfront properties with family appeal"
  },
  {
    name: "Treasure Island",
    city: "Treasure Island",
    description: "Nestled within the iconic San Francisco Bay, the Treasure Island neighborhood offers a unique blend of rich history and modern lifestyle amenities. Whether you're seeking breathtaking views, cultural experiences, or an active lifestyle, Treasure Island has something for everyone.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Rich History", "Modern Lifestyle", "Breathtaking Views", "Cultural Experiences", "Active Lifestyle", "Bay Views"],
    amenities: ["Treasure Island Yacht Club", "San Francisco Museum of Modern Art", "Treasure Island Memorial Park", "Golden Gate National Parks", "Treasure Island Flea Market", "Food Trucks"],
    demographics: "History enthusiasts, culture lovers, and active lifestyle seekers",
    marketTrends: "Growing demand for properties with bay views and cultural amenities"
  },
  {
    name: "South Pasadena",
    city: "South Pasadena",
    description: "Welcome to South Pasadena, a picturesque enclave nestled in the heart of Los Angeles County. Known for its tree-lined streets, architectural charm, and vibrant community spirit, South Pasadena offers an idyllic setting for families and professionals alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$800K - $2M",
    highlights: ["Tree-Lined Streets", "Architectural Charm", "Vibrant Community", "Idyllic Setting", "Cultural Richness", "Family-Friendly"],
    amenities: ["Garfield Park", "Eddy Park", "South Pasadena Public Library", "South Pasadena Historical Museum", "South Pasadena Farmers Market", "Mission Street Boutiques"],
    demographics: "Families, professionals, and culture enthusiasts",
    marketTrends: "Premium properties with strong community and cultural appeal"
  },
  {
    name: "Tangerine Terrace",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, Tangerine Terrace is a vibrant neighborhood known for its welcoming community and abundant amenities. Whether you're a nature lover or a culture enthusiast, Tangerine Terrace offers something for everyone.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Welcoming Community", "Abundant Amenities", "Nature Access", "Cultural Enrichment", "Convenient Location", "Family-Friendly"],
    amenities: ["Sunken Gardens", "North Shore Park", "Dalí Museum", "Museum of Fine Arts", "Local Restaurants", "Cozy Cafes"],
    demographics: "Nature lovers, culture enthusiasts, and families",
    marketTrends: "Affordable homes with growing cultural and natural appeal"
  },
  {
    name: "Tanglewood",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, the Tanglewood neighborhood offers residents a lively blend of community spirit, cultural attractions, and beautiful landscapes. With its tree-lined streets and charming homes, this neighborhood is an ideal destination for both families and singles looking for a vibrant lifestyle.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $750K",
    highlights: ["Community Spirit", "Cultural Attractions", "Beautiful Landscapes", "Tree-Lined Streets", "Charming Homes", "Vibrant Lifestyle"],
    amenities: ["Pinellas Community Park", "Judge Arbor Park", "Museum of Fine Arts", "Florida Historical Society", "Downtown St. Petersburg", "Top-Rated Schools"],
    demographics: "Families, singles, and culture enthusiasts",
    marketTrends: "Growing demand for properties with community and cultural appeal"
  },
  {
    name: "Twin Brooks",
    city: "St. Petersburg",
    description: "Welcome to Twin Brooks, a vibrant community nestled in the heart of St. Petersburg, Florida. Known for its friendly atmosphere and picturesque surroundings, Twin Brooks offers an ideal blend of suburban tranquility and urban convenience. This welcoming neighborhood is perfect for families, professionals, and retirees alike, providing a unique lifestyle with a touch of local charm.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Friendly Atmosphere", "Picturesque Surroundings", "Suburban Tranquility", "Urban Convenience", "Local Charm", "Family-Friendly"],
    amenities: ["Twin Brooks Golf Course", "Boyd Hill Nature Preserve", "Lake Vista Park", "Museum of Fine Arts", "Dalí Museum", "Local Shopping Centers"],
    demographics: "Families, professionals, and retirees seeking community",
    marketTrends: "Affordable homes with growing community and natural appeal"
  },
  {
    name: "Tyrone Landing",
    city: "St. Petersburg",
    description: "Welcome to Tyrone Landing, an inviting neighborhood nestled in the heart of sunny St. Petersburg, Florida. Known for its warm community spirit and convenient location, Tyrone Landing offers residents a blend of comfort, style, and accessibility to some of the best attractions that the area has to offer.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Warm Community", "Convenient Location", "Comfort", "Style", "Accessibility", "Strategic Location"],
    amenities: ["Azalea Park", "Warrior Challenge Course", "Museum of Fine Arts", "Dalí Museum", "Tyrone Square Mall", "Community Events"],
    demographics: "Families, professionals, and community-oriented residents",
    marketTrends: "Affordable homes with growing community and cultural appeal"
  },
  {
    name: "Tyrone Park",
    city: "St. Petersburg",
    description: "Welcome to Tyrone Park, a thriving and picturesque community nestled in the heart of St. Petersburg, Florida. Known for its lush landscapes and friendly atmosphere, Tyrone Park offers an ideal blend of suburban tranquility and urban convenience. This charming neighborhood is perfect for families, professionals, and retirees alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Lush Landscapes", "Friendly Atmosphere", "Suburban Tranquility", "Urban Convenience", "Charming Community", "Family-Friendly"],
    amenities: ["Northwest Park", "Walter Fuller Park", "Museum of Fine Arts", "Great Explorations Children's Museum", "Tyrone Square Mall", "Local Eateries"],
    demographics: "Families, professionals, and retirees seeking community",
    marketTrends: "Affordable homes with growing community and cultural appeal"
  },
  {
    name: "Venetian Isles",
    city: "St. Petersburg",
    description: "Located in the heart of St. Petersburg, Florida, Venetian Isles is a paradise for those seeking serene waterfront living with modern conveniences. This picturesque neighborhood is known for its beautiful homes, stunning views of Tampa Bay, and a sense of community that makes it one of the most desirable places to live in the area.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$800K - $2M",
    highlights: ["Serene Waterfront", "Modern Conveniences", "Beautiful Homes", "Tampa Bay Views", "Community Spirit", "Desirable Location"],
    amenities: ["North Shore Park", "Museum of Fine Arts", "Dalí Museum", "Local Cafes", "Boutiques", "Waterfront Dining"],
    demographics: "Waterfront enthusiasts, affluent families, and luxury home buyers",
    marketTrends: "Premium waterfront properties with high demand"
  },
  {
    name: "Waterway Estates",
    city: "St. Petersburg",
    description: "Located in the heart of St. Petersburg, Waterway Estates is a vibrant and picturesque neighborhood perfect for families, retirees, and young professionals. Known for its stunning waterfront views and lush greenery, this community offers an idyllic lifestyle. Whether you're a nature enthusiast or a culture seeker, Waterway Estates has something for everyone.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$600K - $1.5M",
    highlights: ["Stunning Waterfront Views", "Lush Greenery", "Idyllic Lifestyle", "Nature Access", "Cultural Richness", "Family-Friendly"],
    amenities: ["North Shore Park", "Weedon Island Preserve", "Museum of Fine Arts", "Dalí Museum", "Sundial St. Pete", "Local Dining"],
    demographics: "Families, retirees, and young professionals seeking waterfront living",
    marketTrends: "Premium waterfront properties with growing demand"
  },
  {
    name: "Weedon Island Preserve",
    city: "St. Petersburg",
    description: "Nestled in the heart of St. Petersburg, the Weedon Island Preserve neighborhood offers a harmonious blend of natural beauty and cultural richness. Known for its pristine landscapes and vibrant community, this area is a haven for nature enthusiasts and culture lovers alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$400K - $900K",
    highlights: ["Natural Beauty", "Cultural Richness", "Pristine Landscapes", "Vibrant Community", "Nature Haven", "Cultural Access"],
    amenities: ["Weedon Island Preserve", "Florida Fishing Museum", "Dali Museum", "Downtown St. Petersburg", "Hiking Trails", "Kayaking"],
    demographics: "Nature enthusiasts, culture lovers, and outdoor adventurers",
    marketTrends: "Growing demand for natural settings with cultural amenities"
  },
  {
    name: "Winston Park",
    city: "St. Petersburg",
    description: "Discover the charming Winston Park neighborhood in the heart of St. Petersburg, Florida. A blend of scenic beauty, urban convenience, and cultural attractions makes it an ideal place for families and young professionals alike.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $750K",
    highlights: ["Scenic Beauty", "Urban Convenience", "Cultural Attractions", "Family-Friendly", "Young Professional Appeal", "Community Spirit"],
    amenities: ["Crescent Lake Park", "Sunken Gardens", "Museum of Fine Arts", "Dalí Museum", "Florida Orchestra", "Local Dining"],
    demographics: "Families and young professionals seeking urban convenience",
    marketTrends: "Growing demand for properties with cultural and recreational access"
  },
  {
    name: "Woodlawn Oaks",
    city: "St. Petersburg",
    description: "Welcome to Woodlawn Oaks, a picturesque neighborhood nestled in the heart of St. Petersburg. Known for its lush oak trees and charming homes, this community offers a tranquil escape with convenient access to the city's vibrant lifestyle.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Lush Oak Trees", "Charming Homes", "Tranquil Escape", "City Access", "Vibrant Lifestyle", "Natural Beauty"],
    amenities: ["Woodlawn Park", "North Shore Park", "Museum of Fine Arts", "Salvador Dali Museum", "Local Dining", "Boutiques"],
    demographics: "Nature lovers, families, and professionals seeking tranquility",
    marketTrends: "Affordable homes with growing natural and cultural appeal"
  },
  {
    name: "Yacht Club Estates",
    city: "St. Petersburg",
    description: "Located in picturesque St. Petersburg, the Yacht Club Estates neighborhood is a premier destination for those seeking a vibrant waterfront lifestyle. Known for its luxury homes and stunning views, Yacht Club Estates is the perfect place for boating enthusiasts and beach lovers.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$900K - $2.5M",
    highlights: ["Vibrant Waterfront", "Luxury Homes", "Stunning Views", "Boating Enthusiasts", "Beach Lovers", "Premier Location"],
    amenities: ["War Veterans' Memorial Park", "Fort De Soto Park", "Dalí Museum", "Museum of Fine Arts", "Downtown St. Petersburg", "Waterfront Activities"],
    demographics: "Boating enthusiasts, beach lovers, and luxury home buyers",
    marketTrends: "Premium waterfront properties with luxury appeal"
  },
  {
    name: "Tierra Verde",
    city: "St. Petersburg",
    description: "Nestled along the stunning Gulf Coast, Tierra Verde is a picturesque neighborhood in St. Petersburg, Florida, offering a perfect blend of coastal beauty and community charm. Renowned for its serene environment and exclusive waterfront properties, Tierra Verde is a haven for those seeking a relaxed yet vibrant lifestyle.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$700K - $1.8M",
    highlights: ["Coastal Beauty", "Community Charm", "Serene Environment", "Exclusive Waterfront", "Relaxed Lifestyle", "Gulf Coast Living"],
    amenities: ["Fort De Soto Park", "Museum of Fine Arts", "The Island Grille & Raw Bar", "3 Daughters Brewing", "Beach Access", "Bike Trails"],
    demographics: "Coastal lifestyle seekers, retirees, and luxury home buyers",
    marketTrends: "Premium coastal properties with growing demand"
  },
  {
    name: "Largo Central Park",
    city: "Largo",
    description: "The Largo Central Park neighborhood in beautiful Largo, Florida, offers a vibrant community atmosphere with plenty of amenities and attractions. Known for its lush landscapes and friendly lifestyle, this neighborhood is perfect for families, retirees, and anyone seeking a charming place to call home.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$250K - $600K",
    highlights: ["Vibrant Community", "Lush Landscapes", "Friendly Lifestyle", "Family-Friendly", "Retiree Appeal", "Charming Atmosphere"],
    amenities: ["Largo Central Park", "Largo Central Park Nature Preserve", "Largo Public Library", "Blaylock Museum", "Largo Market", "Boutique Shops"],
    demographics: "Families, retirees, and community-oriented residents",
    marketTrends: "Affordable homes with strong community appeal"
  },
  {
    name: "Highpoint",
    city: "Clearwater",
    description: "The Highpoint neighborhood in Clearwater is a flourishing community that seamlessly blends convenience, leisure, and suburban charm. This family-friendly area is renowned for its lush surroundings, welcoming locals, and a wide range of amenities that cater to every lifestyle.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Convenience", "Leisure", "Suburban Charm", "Family-Friendly", "Lush Surroundings", "Welcoming Community"],
    amenities: ["Shell Key Preserve", "Philippe Park", "Clearwater Marine Aquarium", "Dunedin Fine Art Center", "Local Dining", "Commercial Hubs"],
    demographics: "Families, professionals, and outdoor enthusiasts",
    marketTrends: "Growing demand for family-friendly suburban properties"
  },
  {
    name: "Harbor Bluffs",
    city: "Largo",
    description: "Nestled in the heart of Largo, Florida, Harbor Bluffs is a charming neighborhood offering serene living with easy access to vibrant city life. This sought-after enclave is known for its picturesque landscapes and welcoming community atmosphere, making it the perfect place to call home.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$300K - $700K",
    highlights: ["Serene Living", "City Access", "Picturesque Landscapes", "Welcoming Community", "Sought-After Location", "Perfect Home"],
    amenities: ["Eagle Lake Park", "Largo Central Park", "Museum of Fine Arts", "Largo Historical Society", "Largo Mall", "Local Restaurants"],
    demographics: "Families, professionals, and community-oriented residents",
    marketTrends: "Growing demand for serene suburban living"
  },
  {
    name: "Feather Sound",
    city: "Clearwater",
    description: "Welcome to Feather Sound, one of Clearwater's most desirable neighborhoods, offering a unique blend of tranquility and accessibility. Perfectly situated for both families and professionals, Feather Sound provides easy access to Tampa and St. Petersburg, while being a peaceful retreat from city life.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    averagePriceRange: "$350K - $800K",
    highlights: ["Tranquility", "Accessibility", "Desirable Location", "Family-Friendly", "Professional Appeal", "Peaceful Retreat"],
    amenities: ["Shines Park", "Lee Leeman Park", "Clearwater Arts Alliance", "Clearwater Historical Society Museum", "Bascom's Chop House", "Local Cafes"],
    demographics: "Families, professionals, and tranquility seekers",
    marketTrends: "Growing demand for accessible yet peaceful properties"
  }
]; 