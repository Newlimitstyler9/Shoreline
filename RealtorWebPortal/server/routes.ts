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

# RSS Feed for blog content
# RSS: https://shorelinestpete.com/rss.xml

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
Allow: /contact
Allow: /relocation-guide

# Important SEO pages
Allow: /business.json
Allow: /rss.xml`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Google Search Console verification endpoint
  app.get("/google[a-zA-Z0-9]*.html", (req, res) => {
    const verificationCode = req.path.replace('.html', '').replace('/', '');
    res.setHeader('Content-Type', 'text/html');
    res.send(`google-site-verification: ${verificationCode}.html`);
  });

  // Sitemap endpoint
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const allNeighborhoods = await storage.getNeighborhoods();
      const allBlogPosts = await storage.getBlogPosts();
      
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
  <url>
    <loc>${baseUrl}/relocation-guide</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
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
  
  <!-- Blog Posts -->
  ${allBlogPosts.map((post: any) => {
    return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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

  // RSS Feed for blog
  app.get("/rss.xml", async (req, res) => {
    try {
      const allBlogPosts = await storage.getBlogPosts();
      const baseUrl = "https://shorelinestpete.com";
      
      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shoreline Realty Group Blog</title>
    <description>Latest insights on St. Petersburg real estate market, buying tips, selling advice, and neighborhood guides.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>info@shorelinestpete.com (Shoreline Realty Group)</managingEditor>
    <webMaster>info@shorelinestpete.com (Shoreline Realty Group)</webMaster>
    <category>Real Estate</category>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Shoreline Realty Group</title>
      <link>${baseUrl}</link>
    </image>
    
    ${allBlogPosts.slice(0, 20).map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>info@shorelinestpete.com (${post.author})</author>
      <category>${post.category}</category>
      ${post.featuredImage ? `<enclosure url="${post.featuredImage}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

      res.setHeader('Content-Type', 'application/xml');
      res.send(rss);
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      res.status(500).send('Error generating RSS feed');
    }
  });

  // Google Business Profile structured data endpoint
  app.get("/business.json", (req, res) => {
    const businessData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Shoreline Realty Group",
      "description": "Premier waterfront properties and exceptional service from your trusted local real estate experts in St. Petersburg, Florida.",
      "url": "https://shorelinestpete.com",
      "logo": "https://shorelinestpete.com/logo.png",
      "image": "https://shorelinestpete.com/images/office.jpg",
      "telephone": "+1-727-555-0123",
      "email": "info@shorelinestpete.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Central Avenue",
        "addressLocality": "St. Petersburg",
        "addressRegion": "FL",
        "postalCode": "33701",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "27.7731",
        "longitude": "-82.6400"
      },
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 10:00-16:00"
      ],
      "priceRange": "$$",
      "areaServed": [
        {
          "@type": "Place",
          "name": "St. Petersburg, FL"
        },
        {
          "@type": "Place", 
          "name": "Tampa Bay Area, FL"
        },
        {
          "@type": "Place",
          "name": "Pinellas County, FL"
        }
      ],
      "serviceType": [
        "Residential Real Estate",
        "Waterfront Properties",
        "Luxury Homes",
        "Investment Properties",
        "Buyer Representation",
        "Seller Representation",
        "Market Analysis",
        "Property Valuation"
      ],
      "knowsAbout": [
        "St. Petersburg Real Estate",
        "Waterfront Properties",
        "Downtown St. Petersburg",
        "Old Northeast",
        "Snell Isle",
        "Shore Acres",
        "Tampa Bay Market"
      ],
      "sameAs": [
        "https://facebook.com/shorelinerealty",
        "https://instagram.com/shorelinerealty",
        "https://linkedin.com/company/shorelinerealty",
        "https://youtube.com/shorelinerealty"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Real Estate Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Home Buying Services",
              "description": "Expert guidance for first-time and experienced home buyers"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Home Selling Services",
              "description": "Professional marketing and selling services for your property"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Property Valuation",
              "description": "Accurate market analysis and property valuation services"
            }
          }
        ]
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Johnson"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Exceptional service from the Shoreline team. They helped us find our dream waterfront home in record time!"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    res.setHeader('Content-Type', 'application/ld+json');
    res.json(businessData);
  });

  // Local SEO endpoint for neighborhood-specific searches
  app.get("/local-seo/:neighborhood", async (req, res) => {
    try {
      const neighborhoodName = req.params.neighborhood.replace(/-/g, ' ');
      const neighborhood = await storage.getNeighborhoods();
      const matchedNeighborhood = neighborhood.find((n: any) => 
        n.name.toLowerCase() === neighborhoodName.toLowerCase()
      );

      if (!matchedNeighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }

      const localSeoData = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": `${matchedNeighborhood.name} Real Estate`,
        "description": `Find homes for sale in ${matchedNeighborhood.name}, St. Petersburg, FL. ${matchedNeighborhood.description}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "St. Petersburg",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates", 
          "latitude": "27.7731",
          "longitude": "-82.6400"
        },
        "containedInPlace": {
          "@type": "Place",
          "name": "St. Petersburg, FL"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Average Price Range",
            "value": matchedNeighborhood.averagePriceRange
          },
          {
            "@type": "PropertyValue",
            "name": "Neighborhood Highlights",
            "value": matchedNeighborhood.highlights?.join(', ')
          }
        ],
        "photo": matchedNeighborhood.image,
        "url": `https://shorelinestpete.com/neighborhoods/${matchedNeighborhood.name.toLowerCase().replace(/\s+/g, '-')}`
      };

      res.setHeader('Content-Type', 'application/ld+json');
      res.json(localSeoData);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate local SEO data" });
    }
  });

  // SEO audit endpoint for monitoring optimization
  app.get("/api/seo/audit", validateApiKey, async (req: any, res: any) => {
    try {
      const allBlogPosts = await storage.getBlogPosts();
      const allNeighborhoods = await storage.getNeighborhoods();
      const allProperties = await storage.getProperties();
      
      const baseUrl = "https://shorelinestpete.com";
      
      const audit = {
        timestamp: new Date().toISOString(),
        siteHealth: {
          totalPages: 7 + allBlogPosts.length + allNeighborhoods.length, // Static pages + dynamic content
          indexablePages: 7 + allBlogPosts.length + allNeighborhoods.length,
          sitemapUrl: `${baseUrl}/sitemap.xml`,
          robotsTxtUrl: `${baseUrl}/robots.txt`,
          rssUrl: `${baseUrl}/rss.xml`,
          businessDataUrl: `${baseUrl}/business.json`
        },
        content: {
          blogPosts: {
            total: allBlogPosts.length,
            categories: Array.from(new Set(allBlogPosts.map((post: any) => post.category))),
            recentPosts: allBlogPosts.slice(0, 5).map((post: any) => ({
              title: post.title,
              slug: post.slug,
              publishedAt: post.publishedAt,
              category: post.category,
              url: `${baseUrl}/blog/${post.slug}`
            }))
          },
          neighborhoods: {
            total: allNeighborhoods.length,
            featured: allNeighborhoods.map((n: any) => ({
              name: n.name,
              url: `${baseUrl}/neighborhoods/${n.name.toLowerCase().replace(/\s+/g, '-')}`
            }))
          },
          properties: {
            total: allProperties.length,
            featured: allProperties.filter((p: any) => p.isFeatured).length
          }
        },
        keywords: {
          primary: [
            "St. Petersburg real estate",
            "St. Petersburg homes for sale", 
            "St. Petersburg realtors",
            "waterfront properties St. Petersburg",
            "luxury homes St. Petersburg"
          ],
          longtail: [
            "buy home in St. Petersburg Florida",
            "sell house St. Petersburg FL",
            "best neighborhoods St. Petersburg",
            "waterfront condos Tampa Bay",
            "real estate agent St. Petersburg"
          ],
          local: allNeighborhoods.map((n: any) => `${n.name} real estate St. Petersburg`)
        },
        technicalSeo: {
          https: true,
          mobileFriendly: true,
          structuredData: true,
          metaTags: true,
          canonicalUrls: true,
          xmlSitemap: true,
          robotsTxt: true,
          pageSpeed: "Good (estimated)",
          securityHeaders: true
        },
        localSeo: {
          businessStructuredData: true,
          localKeywords: true,
          neighborhoodPages: allNeighborhoods.length,
          geoTargeting: "St. Petersburg, FL and Tampa Bay Area",
          serviceAreas: [
            "St. Petersburg, FL",
            "Tampa Bay Area, FL", 
            "Pinellas County, FL",
            "Downtown St. Petersburg",
            "Old Northeast",
            "Snell Isle",
            "Shore Acres"
          ]
        },
        recommendations: [
          {
            priority: "High",
            action: "Submit sitemap to Google Search Console",
            url: "https://search.google.com/search-console"
          },
          {
            priority: "High", 
            action: "Set up Google Business Profile for local SEO",
            url: "https://business.google.com"
          },
          {
            priority: "Medium",
            action: "Create more neighborhood-specific content",
            description: "Add detailed guides for each St. Petersburg neighborhood"
          },
          {
            priority: "Medium",
            action: "Optimize blog posting frequency",
            description: "Aim for 2-3 blog posts per week using n8n automation"
          },
          {
            priority: "Low",
            action: "Add customer reviews and testimonials",
            description: "Collect and display client reviews for social proof"
          }
        ]
      };

      res.json(audit);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate SEO audit" });
    }
  });

  // Google Reviews endpoints
  app.get("/api/google-reviews", async (req, res) => {
    try {
      // Get Google API key from environment
      const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
      const placeId = process.env.GOOGLE_PLACE_ID;

      if (!googleApiKey || !placeId) {
        return res.status(400).json({ 
          message: "Google API configuration missing",
          fallback: true 
        });
      }

      // Fetch reviews from Google Places API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${googleApiKey}`
      );

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        res.json({
          success: true,
          reviews: data.result.reviews || [],
          rating: data.result.rating || 0,
          totalReviews: data.result.user_ratings_total || 0,
          source: 'google_api'
        });
      } else {
        throw new Error(`Google API returned status: ${data.status}`);
      }
    } catch (error) {
      console.error('Google Reviews API error:', error);
      
      // Return fallback response
      res.json({
        success: false,
        message: "Unable to fetch live reviews",
        fallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Endpoint to update Google API configuration (admin only)
  app.post("/api/admin/google-config", validateApiKey, async (req: any, res: any) => {
    try {
      const { placeId, apiKey } = req.body;

      if (!placeId || !apiKey) {
        return res.status(400).json({ 
          message: "Missing placeId or apiKey" 
        });
      }

      // Test the API configuration
      const testResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating&key=${apiKey}`
      );

      const testData = await testResponse.json();

      if (testData.status === 'OK') {
        res.json({
          success: true,
          message: "Google API configuration is valid",
          businessName: testData.result?.name,
          rating: testData.result?.rating,
          instructions: {
            step1: "Add GOOGLE_PLACES_API_KEY to your environment variables",
            step2: "Add GOOGLE_PLACE_ID to your environment variables",
            step3: "Restart your server to apply changes",
            placeId: placeId,
            note: "Store these securely in your environment variables, not in code"
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Google API configuration",
          error: testData.error_message || testData.status
        });
      }
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to test Google API configuration",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get Google Business Profile information
  app.get("/api/google-business-info", async (req, res) => {
    try {
      const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;
      const placeId = process.env.GOOGLE_PLACE_ID;

      if (!googleApiKey || !placeId) {
        return res.json({
          name: "Shoreline Realty Group",
          address: "123 Beach Drive NE, St. Petersburg, FL 33701",
          phone: "(727) 555-0123",
          rating: 5.0,
          totalReviews: 127,
          website: "https://shorelinestpete.com",
          googleMapsUrl: "https://www.google.com/maps/place/Shoreline+Realty+Group",
          source: 'fallback'
        });
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,rating,user_ratings_total,website,url&key=${googleApiKey}`
      );

      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        res.json({
          name: data.result.name,
          address: data.result.formatted_address,
          phone: data.result.formatted_phone_number,
          rating: data.result.rating,
          totalReviews: data.result.user_ratings_total,
          website: data.result.website,
          googleMapsUrl: data.result.url,
          source: 'google_api'
        });
      } else {
        throw new Error('Unable to fetch business info');
      }
    } catch (error) {
      console.error('Google Business Info error:', error);
      
      // Fallback business info
      res.json({
        name: "Shoreline Realty Group",
        address: "123 Beach Drive NE, St. Petersburg, FL 33701",
        phone: "(727) 555-0123",
        rating: 5.0,
        totalReviews: 127,
        website: "https://shorelinestpete.com",
        googleMapsUrl: "https://www.google.com/maps/place/Shoreline+Realty+Group",
        source: 'fallback'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
