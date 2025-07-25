import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPropertySchema } from "@shared/schema";
import { z } from "zod";

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

  // Blog endpoints
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
  app.post("/api/leads", async (req, res) => {
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
  app.post("/api/contact", async (req, res) => {
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
  app.post("/api/consultation", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
