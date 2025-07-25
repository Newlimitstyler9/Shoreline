import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { 
  createRateLimiters, 
  createSpeedLimiters, 
  securityHeaders, 
  requestSizeLimit, 
  validateIP, 
  securityLogging, 
  validateEnvironment 
} from "./security";

const app = express();

// Validate environment variables
validateEnvironment();

// Apply Helmet for security headers - TEMPORARILY DISABLED FOR IDX TESTING
// app.use(helmet({
//   contentSecurityPolicy: false, // Disable CSP temporarily to test
//   crossOriginEmbedderPolicy: false,
//   hsts: {
//     maxAge: 31536000,
//     includeSubDomains: true,
//     preload: true
//   }
// }));

// CORS configuration to allow domain access
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
  'http://148.230.82.61',
  'https://148.230.82.61',
  'http://localhost:3000',
  'http://localhost:5173',
  // Add your domain here
  'https://shorelinestpete.com',
  'http://shorelinestpete.com',
  // n8n automation origins
  'https://app.n8n.cloud',
  'https://n8n.io',
  'http://localhost:5678',
  'https://localhost:5678',
  // Your n8n instance on Render
  'https://n8n-hub.onrender.com',
  // MLS Matrix domains
  'https://stellar.mlsmatrix.com',
  'https://matrix.mlsmatrix.com',
  'https://mlsmatrix.com'
];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Allow iframe embedding for IDX/MLS content (remove X-Frame-Options to allow all iframes)
  // res.header('X-Frame-Options', 'SAMEORIGIN');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Security middleware
app.use(securityHeaders);
app.use(requestSizeLimit);
app.use(validateIP);
app.use(securityLogging);

// Rate limiting
const { generalLimiter, formSubmissionLimiter, newsletterLimiter } = createRateLimiters();
const { speedLimiter } = createSpeedLimiters();

app.use(generalLimiter);
app.use(speedLimiter);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 3000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
