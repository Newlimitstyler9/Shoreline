import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Rate limiting configuration
export const createRateLimiters = () => {
  // General API rate limiter
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: '15 minutes'
      });
    }
  });

  // Stricter limiter for form submissions
  const formSubmissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 form submissions per hour
    message: {
      error: 'Too many form submissions from this IP, please try again later.',
      retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many form submissions from this IP, please try again later.',
        retryAfter: '1 hour'
      });
    }
  });

  // Newsletter subscription limiter
  const newsletterLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 3, // limit each IP to 3 newsletter subscriptions per day
    message: {
      error: 'Too many newsletter subscription attempts, please try again tomorrow.',
      retryAfter: '24 hours'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many newsletter subscription attempts, please try again tomorrow.',
        retryAfter: '24 hours'
      });
    }
  });

  return {
    generalLimiter,
    formSubmissionLimiter,
    newsletterLimiter
  };
};

// Speed limiting configuration
export const createSpeedLimiters = () => {
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: 500, // begin adding 500ms of delay per request above 50
    maxDelayMs: 20000, // max delay of 20 seconds
  });

  return { speedLimiter };
};

// Input validation middleware
export const validateLeadData = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
  
  body('propertyInterest')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Property interest must be less than 200 characters'),
  
  body('priceRange')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Price range must be less than 100 characters'),
];

export const validateNewsletterData = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
];

// Validation result handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg
      }))
    });
  }
  next();
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()'
  ].join(', '));
  
  next();
};

// Request size limiting middleware
export const requestSizeLimit = (req: Request, res: Response, next: NextFunction) => {
  const contentLength = parseInt(req.headers['content-length'] || '0');
  const maxSize = 1024 * 1024; // 1MB
  
  if (contentLength > maxSize) {
    return res.status(413).json({
      error: 'Request entity too large',
      message: 'Request body must be less than 1MB'
    });
  }
  
  next();
};

// IP address validation
export const validateIP = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const origin = req.headers.origin;
  
  // Allow blog API endpoint from private IPs and Render (for n8n automation)
  if (req.path === '/api/admin/blog') {
    // Allow requests from Render domains (n8n-hub.onrender.com)
    if (origin && origin.includes('onrender.com')) {
      return next();
    }
    // Allow requests from private IPs for local n8n instances
    return next();
  }
  
  // Block private IP ranges in production for other endpoints
  if (process.env.NODE_ENV === 'production') {
    const privateIPRanges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^127\./,
      /^::1$/
    ];
    
    if (clientIP && privateIPRanges.some(range => range.test(clientIP))) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Private IP addresses are not allowed'
      });
    }
  }
  
  next();
};

// Request logging for security monitoring
export const securityLogging = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: clientIP,
      userAgent: userAgent,
      contentLength: req.headers['content-length'] || '0'
    };
    
    // Log suspicious activities
    if (res.statusCode >= 400 || duration > 5000) {
      console.warn('Security Warning:', logData);
    }
    
    // Log all API requests for monitoring
    if (req.path.startsWith('/api')) {
      console.log('API Request:', logData);
    }
  });
  
  next();
};

// Simple CSRF token generation and validation
export const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const validateCSRFToken = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF validation for GET requests
  if (req.method === 'GET') {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const sessionToken = (req as any).session?.csrfToken;
  
  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({
      error: 'CSRF token validation failed',
      message: 'Invalid or missing CSRF token'
    });
  }
  
  next();
};

// Environment variable validation
export const validateEnvironment = () => {
  const requiredEnvVars = [
    'DATABASE_URL',
    'NODE_ENV'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate NODE_ENV
  const validEnvs = ['development', 'production', 'test'];
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv || !validEnvs.includes(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}. Must be one of: ${validEnvs.join(', ')}`);
  }
};

// Export all security middleware
export const securityMiddleware = {
  createRateLimiters,
  createSpeedLimiters,
  validateLeadData,
  validateNewsletterData,
  handleValidationErrors,
  securityHeaders,
  requestSizeLimit,
  validateIP,
  securityLogging,
  generateCSRFToken,
  validateCSRFToken,
  validateEnvironment
}; 