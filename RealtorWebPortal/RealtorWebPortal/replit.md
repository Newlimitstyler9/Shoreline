# Shoreline Realty Group - Real Estate Website

## Overview

This is a full-featured real estate website for Shoreline Realty Group in St. Petersburg, Florida. Built with modern web technologies, it provides a comprehensive platform for property search, lead generation, and content management. The application follows a full-stack architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for consistent branding
- **State Management**: TanStack Query for server state and form state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the stack
- **API Design**: RESTful endpoints following conventional patterns
- **Middleware**: Custom logging, CORS, and error handling
- **Development**: Hot reload with Vite integration in development mode

### Database & ORM
- **Database**: PostgreSQL configured for production deployment
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless connection for scalability

## Key Components

### Property Management System
- Property listings with advanced filtering (price, type, location, features)
- Featured property showcase on homepage
- Detailed property pages with image galleries
- Waterfront property categorization
- MLS integration ready structure

### Lead Generation & CRM
- Multiple lead capture forms (contact, consultation, valuation)
- Property inquiry tracking
- Newsletter subscription system
- Lead source attribution and analytics
- Integration-ready for external CRM systems

### Content Management
- Blog system with categories (Market Updates, Buying Tips, Selling Tips, Neighborhood Guides)
- SEO-optimized content structure
- Author attribution and publication workflow
- Social sharing capabilities

### Analytics & Tracking
- Google Analytics 4 integration
- Custom event tracking for user interactions
- Lead conversion funnel monitoring
- Property search behavior analysis

### UI/UX Features
- Mobile-first responsive design
- Accessible components following WCAG guidelines
- Professional real estate branding (slate gray/soft blue theme)
- Interactive chatbot for customer engagement
- Toast notifications for user feedback

## Data Flow

### Client-Server Communication
1. Frontend makes API requests through a centralized query client
2. Express server handles routing and business logic
3. Drizzle ORM manages database operations
4. Response data flows back through the same pipeline

### State Management Flow
1. TanStack Query manages server state caching and synchronization
2. React Hook Form handles form state and validation
3. Local component state for UI interactions
4. Analytics events captured and sent to Google Analytics

### Lead Processing Pipeline
1. Lead forms capture user information
2. Data validated using Zod schemas
3. Lead stored in PostgreSQL database
4. Optional integrations (email, CRM) triggered
5. Analytics events tracked for conversion measurement

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Google Analytics**: User behavior tracking and conversion monitoring
- **Hostinger**: Production hosting platform

### UI & Component Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling framework
- **Class Variance Authority**: Component variant management

### Development Tools
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: CSS vendor prefix management

### Planned Integrations
- **IDX Plugin**: MLS listing integration for real-time property data
- **CRM System**: Lead management and follow-up automation
- **Email Marketing**: Newsletter and drip campaign management
- **Social Media**: Automated posting and engagement tracking

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Express server with TypeScript compilation via tsx
- Database migrations managed through Drizzle Kit
- Environment-specific configuration management

### Production Build Process
1. Frontend: Vite builds optimized static assets
2. Backend: ESBuild compiles TypeScript to optimized JavaScript
3. Database: Migrations applied via Drizzle Kit push command
4. Assets: Static files served through Express in production

### Environment Configuration
- Database connections managed via environment variables
- Google Analytics tracking ID configurable per environment
- API endpoints and external service keys environment-specific
- Production optimizations enabled automatically

### Scalability Considerations
- Serverless database connection pooling
- Static asset optimization and caching
- API response caching strategies
- CDN integration for image and asset delivery