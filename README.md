# Carbioo AI

## Overview

Carbioo AI is a sustainable construction platform that uses machine learning to identify construction materials from images and analyze their carbon footprint. The platform helps architects and construction professionals make eco-friendly material choices by providing embodied carbon data, suggesting lower-impact alternatives, and tracking project sustainability metrics.

The application consists of two main components:
1. **Main Platform** - A React/TypeScript frontend with Express.js backend for user-facing features (waitlist, material scanning, project management)
2. **ML Studio** - A separate admin tool for training and managing ML models used for material recognition

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Main Platform** (`/client`): React 18 with TypeScript, built using Vite. Uses Shadcn/ui components (Radix UI primitives) with Tailwind CSS v4. Routing via Wouter, state management through TanStack Query for server state and React Context for auth. Framer Motion handles animations, Recharts for data visualization.

**ML Studio** (`/MLStudio-main/client`): Separate React app with Vite, also using Tailwind CSS. Runs on port 3002 and proxies API calls to its own backend on port 3001.

### Backend Architecture

**Main Platform** (`/server`): Express.js with TypeScript, compiled with esbuild. RESTful API with route modules organized by feature (auth, projects, materials, scans, reports, waitlist). JWT-based authentication with bcrypt password hashing. Multer handles image uploads (10MB limit, JPEG/PNG/WebP).

**ML Studio** (`/MLStudio-main/server`): Separate Express.js server (JavaScript) on port 3001. Manages training data, model training lifecycle, and WebSocket connections for real-time training progress. Spawns Python worker for actual model training.

**ML Training Worker** (`/MLStudio-main/worker`): Python scripts using TensorFlow/Keras for transfer learning (MobileNetV2/EfficientNet). Reads training images from MongoDB, outputs model files and training events via JSON stdout.

### Data Storage

**Database**: MongoDB Atlas (connection string via `MONGODB_URI` or `MONGO_URI` environment variable). Mongoose ODM for schema definitions.

Key collections:
- Users, Projects, Scans, Reports (main platform)
- MaterialImage (training images stored as binary data, 224x224 pixels)
- TrainedModel (model metadata, training history, optional model binary)
- CustomMaterial (user-defined material classes)

**Drizzle Configuration**: The codebase includes Drizzle ORM configured for PostgreSQL (`drizzle.config.ts`, `shared/schema.ts`), but the actual application uses MongoDB. Drizzle may be used for future features or was part of initial scaffolding.

**File Storage**: 
- Uploaded scan images: `/uploads/scans`
- User avatars: `/uploads/avatars`
- Trained models: `/MLStudio-main/data/models/<modelId>/` (contains `model.keras`, `labels.json`, `metadata.json`)

## External Dependencies

### Databases & Storage
- **MongoDB Atlas**: Primary database for all application data and training images
- **PostgreSQL** (via Drizzle): Configured but not actively used in current implementation

### AI/ML Services
- **TensorFlow/Keras**: Model training using transfer learning (MobileNetV2, EfficientNetB0/B2)
- **Sharp**: Image processing and resizing to 224x224 for model input

### Third-Party APIs
- **Google Custom Search API**: Image search for training data collection (`GOOGLE_API_KEY`, `GOOGLE_SEARCH_CX`)
- **Pixabay API**: Alternative image source for training data (`PIXABAY_API_KEY`)

### Authentication
- **JWT**: Token-based authentication (`JWT_SECRET` environment variable)
- **bcryptjs**: Password hashing

### Development Tools
- **Replit Plugins**: Vite plugins for cartographer, dev banner, and runtime error modal (development only)
- **Concurrently**: Running multiple dev servers simultaneously

### Email Service
- **Resend**: Email delivery service for waitlist verification and welcome emails
  - Sends from: `hello@carbiooai.com`
  - Beautiful HTML email templates for verification and welcome messages
  - Rate-limited to prevent spam (5 requests per hour per IP)

### Key Environment Variables
- `MONGODB_URI` / `MONGO_URI`: MongoDB connection string
- `DATABASE_URL`: PostgreSQL connection (for Drizzle)
- `JWT_SECRET`: JWT signing key
- `GOOGLE_API_KEY`: Google Custom Search API key
- `PIXABAY_API_KEY`: Pixabay API key
- `NODE_ENV`: Environment mode (development/production)
- `RESEND_API_KEY`: Resend API key for email delivery
- `APP_URL`: Base URL for email verification links (defaults to REPLIT_DEV_DOMAIN)

## Recent Changes

### December 2024 - Waitlist-Focused Mode
- **Simplified Landing Page**: Removed demo scanner and inflated statistics, focused on waitlist signup for pre-launch phase
- **Calmer Messaging**: Updated copy to reflect pre-launch status without overstated claims
- **Removed Auth Routes**: Sign in and register pages removed from navigation, focusing solely on waitlist
- **About Page Update**: Removed stats section and "built by architects for architects" positioning, replaced with broader team messaging
- **Accessibility Fix**: Added proper DialogTitle/DialogDescription for screen reader support in welcome popup

### December 2024 - Landing Page & Waitlist Enhancement
- **Waitlist Modal**: Multi-step form with name, email validation, construction professional question with profession dropdown, interest reason field
- **Welcome Popup**: Beautiful onboarding popup for new visitors with slides explaining Carbioo AI's value proposition
- **Email Verification Flow**: Backend email verification using Resend, 24-hour token expiry, rate limiting, spam prevention
- **Email Templates**: Professional HTML email templates for verification and welcome emails
- **Waitlist Schema**: Extended to include firstName, lastName, isConstructionProfessional, profession, professionOther, nonProfessionalRole, interestReason, verification fields