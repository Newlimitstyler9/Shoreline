import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { 
  validateLeadData, 
  validateNewsletterData, 
  handleValidationErrors
} from "./security";

// Simple API key validation middleware
const validateApiKey = (req: any, res: any, next: any) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  // Use environment variable for API key, fallback to default for development
  const validApiKey = process.env.API_KEY || 'shoreline-blog-api-2024';
  
  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Valid API key required in X-API-Key header or Authorization Bearer token' 
    });
  }
  
  next();
};

// Blog post validation
const validateBlogPost = [
  // Title validation
  (req: any, res: any, next: any) => {
    const { title, content, category, excerpt } = req.body;
    
    if (!title || title.trim().length < 5) {
      return res.status(400).json({ error: 'Title is required and must be at least 5 characters' });
    }
    
    if (!content || content.trim().length < 50) {
      return res.status(400).json({ error: 'Content is required and must be at least 50 characters' });
    }
    
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }
    
    if (!excerpt || excerpt.trim().length < 20) {
      return res.status(400).json({ error: 'Excerpt is required and must be at least 20 characters' });
    }
    
    // Auto-generate slug if not provided
    if (!req.body.slug) {
      req.body.slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    next();
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = {
        propertyType: req.query.propertyType as string,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        bedrooms: req.query.bedrooms as string,
        neighborhood: req.query.neighborhood as string,
        isWaterfront: req.query.isWaterfront === "true" ? true : req.query.isWaterfront === "false" ? false : undefined,
      };
      
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Blog endpoints (public)
  app.get("/api/blog", async (req, res) => {
    try {
      const category = req.query.category as string;
      const posts = await storage.getBlogPosts(category);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin/API endpoints for blog management (for n8n automation)
  app.post("/api/admin/blog", validateApiKey, validateBlogPost, async (req: any, res: any) => {
    try {
      const blogData = {
        title: req.body.title,
        slug: req.body.slug,
        excerpt: req.body.excerpt,
        content: req.body.content,
        category: req.body.category,
        featuredImage: req.body.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: req.body.author || "Shoreline Realty Group"
      };
      
      const post = await storage.createBlogPost(blogData);
      res.status(201).json({ 
        message: "Blog post created successfully", 
        post: post,
        url: `https://shorelinestpete.com/blog/${post.slug}`
      });
    } catch (error) {
      console.error('Blog creation error:', error);
      res.status(500).json({ message: "Failed to create blog post", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Get all blog posts for admin (with API key)
  app.get("/api/admin/blog", validateApiKey, async (req: any, res: any) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Update blog post
  app.put("/api/admin/blog/:slug", validateApiKey, validateBlogPost, async (req: any, res: any) => {
    try {
      const blogData = {
        title: req.body.title,
        slug: req.body.slug,
        excerpt: req.body.excerpt,
        content: req.body.content,
        category: req.body.category,
        featuredImage: req.body.featuredImage,
        author: req.body.author || "Shoreline Realty Group"
      };
      
      const post = await storage.updateBlogPost(req.params.slug, blogData);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json({ 
        message: "Blog post updated successfully", 
        post: post,
        url: `https://shorelinestpete.com/blog/${post.slug}`
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  // Delete blog post
  app.delete("/api/admin/blog/:slug", validateApiKey, async (req: any, res: any) => {
    try {
      const success = await storage.deleteBlogPost(req.params.slug);
      if (!success) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // API endpoint to check API key validity
  app.get("/api/admin/auth/check", validateApiKey, (req: any, res: any) => {
    res.json({ message: "API key is valid", authenticated: true });
  });

  // Neighborhoods endpoint
  app.get("/api/neighborhoods", async (req, res) => {
    try {
      const neighborhoods = await storage.getNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  // Lead capture endpoints
  app.post("/api/leads", validateLeadData, handleValidationErrors, async (req: any, res: any) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", validateLeadData, handleValidationErrors, async (req: any, res: any) => {
    try {
      const contactData = insertLeadSchema.parse({
        ...req.body,
        leadSource: "contact_form",
        leadType: "general_inquiry"
      });
      const lead = await storage.createLead(contactData);
      res.status(201).json({ message: "Contact form submitted successfully", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Consultation scheduling endpoint
  app.post("/api/consultation", validateLeadData, handleValidationErrors, async (req: any, res: any) => {
    try {
      const consultationData = insertLeadSchema.parse({
        ...req.body,
        leadSource: "consultation_form",
        leadType: "consultation_request"
      });
      const lead = await storage.createLead(consultationData);
      res.status(201).json({ message: "Consultation scheduled successfully", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid consultation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to schedule consultation" });
    }
  });

  // Home valuation endpoint
  app.post("/api/valuation", async (req, res) => {
    try {
      const valuationData = insertLeadSchema.parse({
        ...req.body,
        leadSource: "valuation_form",
        leadType: "home_valuation"
      });
      const lead = await storage.createLead(valuationData);
      res.status(201).json({ message: "Valuation request submitted successfully", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid valuation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit valuation request" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertLeadSchema.parse({
        firstName: req.body.firstName || "Newsletter",
        lastName: req.body.lastName || "Subscriber",
        email: req.body.email,
        leadSource: "newsletter",
        leadType: "newsletter_subscription"
      });
      const lead = await storage.createLead(newsletterData);
      res.status(201).json({ message: "Newsletter subscription successful", lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Robots.txt endpoint
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: https://shorelinestpete.com/sitemap.xml

# Crawl delay (optional - helps with server load)
Crawl-delay: 1

# Disallow admin or private areas (if any)
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# Allow important pages
Allow: /
Allow: /properties
Allow: /neighborhoods
Allow: /blog
Allow: /about
Allow: /contact`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Sitemap endpoint
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const allNeighborhoods = await storage.getNeighborhoods();
      
      const baseUrl = "https://shorelinestpete.com";
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/properties</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/neighborhoods</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Neighborhood Pages -->
  ${allNeighborhoods.map((neighborhood: any) => {
    const slug = neighborhood.name.toLowerCase().replace(/\s+/g, '-');
    return `  <url>
    <loc>${baseUrl}/neighborhoods/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
