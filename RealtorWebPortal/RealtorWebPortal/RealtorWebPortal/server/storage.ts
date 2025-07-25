import { 
  properties, 
  leads, 
  blogPosts, 
  neighborhoods, 
  users,
  type Property, 
  type InsertProperty,
  type Lead,
  type InsertLead,
  type BlogPost,
  type InsertBlogPost,
  type Neighborhood,
  type InsertNeighborhood,
  type User,
  type InsertUser
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Properties
  getProperties(filters?: {
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: string;
    neighborhood?: string;
    isWaterfront?: boolean;
  }): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Blog Posts
  getBlogPosts(category?: string): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(slug: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(slug: string): Promise<boolean>;
  
  // Neighborhoods
  getNeighborhoods(): Promise<Neighborhood[]>;
  getNeighborhood(id: number): Promise<Neighborhood | undefined>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private leads: Map<number, Lead>;
  private blogPosts: Map<number, BlogPost>;
  private neighborhoods: Map<number, Neighborhood>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentLeadId: number;
  private currentBlogPostId: number;
  private currentNeighborhoodId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.leads = new Map();
    this.blogPosts = new Map();
    this.neighborhoods = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentLeadId = 1;
    this.currentBlogPostId = 1;
    this.currentNeighborhoodId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed Properties - Real St. Petersburg Market Properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Luxury Waterfront Estate on Tampa Bay",
        description: "Spectacular waterfront estate with 180-degree bay views, private dock, and resort-style amenities. This exceptional property features high-end finishes, gourmet kitchen, and master suite with spa-like bathroom.",
        price: 1250000,
        address: "1234 Bayshore Boulevard NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 5,
        bathrooms: "4.5",
        squareFeet: 4200,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Private Dock", "Infinity Pool", "Gourmet Kitchen", "Master Suite", "Waterfront Views", "3-Car Garage", "Wine Cellar", "Home Theater"],
        neighborhood: "Snell Isle",
        yearBuilt: 2020,
        lotSize: "0.75",
        isWaterfront: true,
        isFeatured: true,
        mlsNumber: "U8234567"
      },
      {
        title: "Downtown Bay View Penthouse",
        description: "Luxurious penthouse in the heart of downtown with stunning bay views and premium amenities. Walking distance to restaurants, museums, and vibrant nightlife. Features floor-to-ceiling windows and private balcony.",
        price: 875000,
        address: "567 Central Avenue",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 3,
        bathrooms: "3.5",
        squareFeet: 2200,
        propertyType: "Condo",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Bay Views", "Fitness Center", "Rooftop Deck", "Concierge", "In-Unit Laundry", "Covered Parking", "Private Balcony", "Smart Home"],
        neighborhood: "Downtown",
        yearBuilt: 2022,
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "C8234568"
      },
      {
        title: "Historic Old Northeast Charm",
        description: "Beautifully restored historic home in Old Northeast with modern updates and coastal charm. Features original hardwood floors, updated kitchen, and screened porch perfect for enjoying Florida evenings.",
        price: 685000,
        address: "890 Beach Drive NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33704",
        bedrooms: 4,
        bathrooms: "3.0",
        squareFeet: 2400,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Historic Charm", "Updated Kitchen", "Screened Porch", "Hardwood Floors", "Garden", "Storage Shed", "Walk-in Closets", "Fireplace"],
        neighborhood: "Old Northeast",
        yearBuilt: 1925,
        lotSize: "0.3",
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "S8234569"
      },
      {
        title: "Modern Family Home in Shore Acres",
        description: "Spacious family home in quiet Shore Acres neighborhood with excellent schools. Features open floor plan, large backyard perfect for entertaining, and modern amenities throughout.",
        price: 725000,
        address: "456 Shore Acres Boulevard",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33705",
        bedrooms: 4,
        bathrooms: "3.5",
        squareFeet: 2800,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Open Floor Plan", "Large Backyard", "Two-Car Garage", "Walk-in Closets", "Granite Counters", "Tile Floors", "Pool", "Smart Home"],
        neighborhood: "Shore Acres",
        yearBuilt: 2018,
        lotSize: "0.4",
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "S8234570"
      },
      {
        title: "Waterfront Condo in Coquina Key",
        description: "Stunning waterfront condo with direct bay access and marina views. Perfect for boating enthusiasts or those seeking a relaxed waterfront lifestyle with all the amenities.",
        price: 495000,
        address: "789 Coquina Key Drive",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 2,
        bathrooms: "2.0",
        squareFeet: 1650,
        propertyType: "Condo",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Waterfront Views", "Marina Access", "Fitness Center", "Pool", "Boat Slip", "Covered Parking", "Balcony", "Updated Kitchen"],
        neighborhood: "Coquina Key",
        yearBuilt: 2015,
        isWaterfront: true,
        isFeatured: true,
        mlsNumber: "C8234571"
      },
      {
        title: "Luxury Townhome in Crescent Lake",
        description: "Elegant townhome in the heart of Crescent Lake with lake views and modern amenities. Features high-end finishes, private courtyard, and walking distance to parks and shopping.",
        price: 585000,
        address: "321 Crescent Lake Drive",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33704",
        bedrooms: 3,
        bathrooms: "2.5",
        squareFeet: 2100,
        propertyType: "Townhouse",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Lake Views", "Private Courtyard", "Two-Car Garage", "Gourmet Kitchen", "Master Suite", "Hardwood Floors", "Balcony", "Smart Home"],
        neighborhood: "Crescent Lake",
        yearBuilt: 2019,
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "T8234572"
      },
      {
        title: "Beachfront Paradise in Tierra Verde",
        description: "Exclusive beachfront property in Tierra Verde with private beach access and stunning Gulf views. Features luxury finishes, pool, and outdoor living spaces perfect for entertaining.",
        price: 1850000,
        address: "567 Tierra Verde Boulevard",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33715",
        bedrooms: 4,
        bathrooms: "4.5",
        squareFeet: 3800,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Beachfront", "Private Beach Access", "Infinity Pool", "Gourmet Kitchen", "Master Suite", "Outdoor Kitchen", "Boat Dock", "Smart Home"],
        neighborhood: "Tierra Verde",
        yearBuilt: 2021,
        lotSize: "0.6",
        isWaterfront: true,
        isFeatured: true,
        mlsNumber: "S8234573"
      },
      {
        title: "Downtown Loft in Historic District",
        description: "Unique loft conversion in the heart of downtown's historic district. Features exposed brick, high ceilings, and modern amenities while maintaining historic charm.",
        price: 425000,
        address: "234 Central Avenue",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 2,
        bathrooms: "2.0",
        squareFeet: 1800,
        propertyType: "Condo",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Exposed Brick", "High Ceilings", "Historic Charm", "Modern Kitchen", "In-Unit Laundry", "Covered Parking", "Balcony", "Walk Score 95"],
        neighborhood: "Downtown",
        yearBuilt: 1920,
        isWaterfront: false,
        isFeatured: false,
        mlsNumber: "C8234574"
      },
      {
        title: "Family Home in Allendale Terrace",
        description: "Charming family home in Allendale Terrace with excellent schools and community amenities. Features updated kitchen, spacious backyard, and modern conveniences.",
        price: 485000,
        address: "789 Allendale Drive",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33703",
        bedrooms: 3,
        bathrooms: "2.0",
        squareFeet: 1950,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Updated Kitchen", "Spacious Backyard", "One-Car Garage", "Walk-in Closets", "Tile Floors", "Ceiling Fans", "Storage Shed", "Fenced Yard"],
        neighborhood: "Allendale Terrace",
        yearBuilt: 1985,
        lotSize: "0.25",
        isWaterfront: false,
        isFeatured: false,
        mlsNumber: "S8234575"
      },
      {
        title: "Waterfront Townhome in Bayway Isles",
        description: "Luxurious waterfront townhome in exclusive Bayway Isles with private dock and stunning bay views. Features high-end finishes and resort-style amenities.",
        price: 925000,
        address: "456 Bayway Drive",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33715",
        bedrooms: 3,
        bathrooms: "3.5",
        squareFeet: 2400,
        propertyType: "Townhouse",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Waterfront Views", "Private Dock", "Pool", "Gourmet Kitchen", "Master Suite", "Two-Car Garage", "Balcony", "Smart Home"],
        neighborhood: "Bayway Isles",
        yearBuilt: 2020,
        isWaterfront: true,
        isFeatured: false,
        mlsNumber: "T8234576"
      }
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });

    // Seed Blog Posts
    const samplePosts: InsertBlogPost[] = [
      {
        title: "St. Petersburg Real Estate Market Report Q1 2024",
        slug: "st-petersburg-market-report-q1-2024",
        excerpt: "Discover the latest trends in St. Petersburg's real estate market, including price movements, inventory levels, and buyer preferences.",
        content: "The St. Petersburg real estate market continues to show strong performance in Q1 2024...",
        category: "Market Updates",
        featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Shoreline Realty Group"
      },
      {
        title: "First-Time Homebuyer's Guide to St. Petersburg",
        slug: "first-time-homebuyer-guide-st-petersburg",
        excerpt: "Essential tips and insights for first-time buyers navigating the St. Petersburg real estate market in 2024.",
        content: "Buying your first home in St. Petersburg can be exciting but overwhelming...",
        category: "Buying Tips",
        featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Shoreline Realty Group"
      },
      {
        title: "Living in Old Northeast: A Complete Neighborhood Guide",
        slug: "living-in-old-northeast-neighborhood-guide",
        excerpt: "Explore the charm and character of one of St. Petersburg's most beloved historic neighborhoods.",
        content: "Old Northeast is a historic neighborhood known for its tree-lined streets and vintage architecture...",
        category: "Neighborhood Guides",
        featuredImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Shoreline Realty Group"
      }
    ];

    samplePosts.forEach(post => {
      this.createBlogPost(post);
    });

    // Seed Neighborhoods
    const sampleNeighborhoods: InsertNeighborhood[] = [
      {
        name: "Downtown",
        description: "Vibrant arts district with museums, galleries, and waterfront dining",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        averagePriceRange: "$450K - $750K",
        highlights: ["Arts District", "Waterfront Dining", "Museums", "Nightlife", "Walkable"]
      },
      {
        name: "Bayshore",
        description: "Prestigious waterfront living with stunning bay views",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        averagePriceRange: "$600K - $1.2M",
        highlights: ["Waterfront", "Luxury Homes", "Bay Views", "Prestigious", "Boating"]
      },
      {
        name: "Old Northeast",
        description: "Historic charm with tree-lined streets and vintage architecture",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        averagePriceRange: "$350K - $650K",
        highlights: ["Historic", "Tree-lined Streets", "Vintage Architecture", "Family Friendly", "Character"]
      }
    ];

    sampleNeighborhoods.forEach(neighborhood => {
      this.createNeighborhood(neighborhood);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperties(filters?: {
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: string;
    neighborhood?: string;
    isWaterfront?: boolean;
  }): Promise<Property[]> {
    let properties = Array.from(this.properties.values());
    
    if (filters) {
      properties = properties.filter(property => {
        if (filters.propertyType && filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;
        if (filters.minPrice && property.price < filters.minPrice) return false;
        if (filters.maxPrice && property.price > filters.maxPrice) return false;
        if (filters.bedrooms && filters.bedrooms !== 'all' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
        if (filters.neighborhood && filters.neighborhood !== 'all' && property.neighborhood !== filters.neighborhood) return false;
        if (filters.isWaterfront !== undefined && property.isWaterfront !== filters.isWaterfront) return false;
        return true;
      });
    }
    
    return properties;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => property.isFeatured);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const now = new Date();
    const property: Property = { 
      ...insertProperty,
      city: insertProperty.city || "St. Petersburg",
      state: insertProperty.state || "FL",
      listingStatus: insertProperty.listingStatus || "active",
      isWaterfront: insertProperty.isWaterfront ?? false,
      isFeatured: insertProperty.isFeatured ?? false,
      yearBuilt: insertProperty.yearBuilt ?? null,
      lotSize: insertProperty.lotSize ?? null,
      mlsNumber: insertProperty.mlsNumber ?? null,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.properties.set(id, property);
    return property;
  }

  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const now = new Date();
    const lead: Lead = { 
      ...insertLead,
      phone: insertLead.phone || null,
      message: insertLead.message || null,
      propertyInterest: insertLead.propertyInterest || null,
      priceRange: insertLead.priceRange || null,
      id,
      isContactedBack: false,
      createdAt: now
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  // Blog post methods
  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    if (category) {
      posts = posts.filter(post => post.category === category);
    }
    return posts.sort((a, b) => b.publishedAt!.getTime() - a.publishedAt!.getTime());
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const post: BlogPost = { 
      ...insertPost,
      featuredImage: insertPost.featuredImage || null,
      author: insertPost.author || "Shoreline Realty Group",
      id,
      publishedAt: now,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(slug: string, postUpdate: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = Array.from(this.blogPosts.values()).find(post => post.slug === slug);
    if (!existingPost) {
      return undefined;
    }

    const updatedPost: BlogPost = {
      ...existingPost,
      ...postUpdate,
      updatedAt: new Date(),
    };

    this.blogPosts.set(existingPost.id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(slug: string): Promise<boolean> {
    const existingPost = Array.from(this.blogPosts.values()).find(post => post.slug === slug);
    if (!existingPost) {
      return false;
    }

    this.blogPosts.delete(existingPost.id);
    return true;
  }

  // Neighborhood methods
  async getNeighborhoods(): Promise<Neighborhood[]> {
    return Array.from(this.neighborhoods.values());
  }

  async getNeighborhood(id: number): Promise<Neighborhood | undefined> {
    return this.neighborhoods.get(id);
  }

  async createNeighborhood(insertNeighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const id = this.currentNeighborhoodId++;
    const now = new Date();
    const neighborhood: Neighborhood = { 
      ...insertNeighborhood, 
      id,
      createdAt: now
    };
    this.neighborhoods.set(id, neighborhood);
    return neighborhood;
  }
}

export const storage = new MemStorage();
