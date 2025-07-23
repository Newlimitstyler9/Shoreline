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
    // Seed Properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Luxury Waterfront Estate",
        description: "Stunning waterfront estate with panoramic bay views, private dock, and resort-style amenities. This exceptional property features high-end finishes throughout.",
        price: 850000,
        address: "1234 Bayshore Boulevard",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 4,
        bathrooms: "3.5",
        squareFeet: 2850,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Private Dock", "Pool", "Gourmet Kitchen", "Master Suite", "Waterfront Views", "3-Car Garage"],
        neighborhood: "Bayshore",
        yearBuilt: 2018,
        lotSize: "0.5",
        isWaterfront: true,
        isFeatured: true,
        mlsNumber: "U8234567"
      },
      {
        title: "Downtown Bay View Condo",
        description: "Modern condo in the heart of downtown with stunning bay views and luxury amenities. Walking distance to restaurants, museums, and nightlife.",
        price: 425000,
        address: "567 Central Avenue",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33701",
        bedrooms: 2,
        bathrooms: "2.0",
        squareFeet: 1450,
        propertyType: "Condo",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Bay Views", "Fitness Center", "Rooftop Deck", "Concierge", "In-Unit Laundry", "Covered Parking"],
        neighborhood: "Downtown",
        yearBuilt: 2020,
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "C8234568"
      },
      {
        title: "Charming Beach Cottage",
        description: "Beautifully renovated beach cottage with coastal charm and modern updates. Perfect for those seeking a relaxed beachside lifestyle.",
        price: 385000,
        address: "890 Beach Drive NE",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33704",
        bedrooms: 3,
        bathrooms: "2.0",
        squareFeet: 1850,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Beach Access", "Updated Kitchen", "Screened Porch", "Hardwood Floors", "Garden", "Storage Shed"],
        neighborhood: "Old Northeast",
        yearBuilt: 1965,
        lotSize: "0.25",
        isWaterfront: false,
        isFeatured: true,
        mlsNumber: "S8234569"
      },
      {
        title: "Modern Family Home",
        description: "Spacious family home in quiet neighborhood with excellent schools. Features open floor plan and large backyard perfect for entertaining.",
        price: 525000,
        address: "456 Elm Street",
        city: "St. Petersburg",
        state: "FL",
        zipCode: "33705",
        bedrooms: 4,
        bathrooms: "3.0",
        squareFeet: 2400,
        propertyType: "Single Family",
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Open Floor Plan", "Large Backyard", "Two-Car Garage", "Walk-in Closets", "Granite Counters", "Tile Floors"],
        neighborhood: "Pinellas Point",
        yearBuilt: 2015,
        lotSize: "0.3",
        isWaterfront: false,
        isFeatured: false,
        mlsNumber: "S8234570"
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
