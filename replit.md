# Carbioo AI - Sustainable Construction Platform

## Overview

Carbioo AI is an AI-powered platform for sustainable construction that helps identify construction materials, calculate carbon footprints, and recommend eco-friendly alternatives. The platform enables architects, engineers, and construction professionals to make environmentally conscious material choices by scanning materials and receiving instant carbon impact analysis.

The application follows a client-server architecture with a React frontend and Express.js backend, currently deployed with the frontend on Vercel and backend on Render.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for smooth UI transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React Context for auth state
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` to `shared/`, `@assets/` to `attached_assets/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with CORS support for cross-origin requests
- **API Structure**: RESTful API routes under `/api` prefix
- **Authentication**: JWT-based authentication with middleware for protected routes
- **File Uploads**: Multer for handling image uploads (scans, avatars)
- **Build**: esbuild bundles server code for production

### Database
- **Primary Database**: MongoDB Atlas (NoSQL)
- **ORM**: Mongoose for MongoDB object modeling
- **Schema Definition**: Drizzle is configured for PostgreSQL but MongoDB is the active database
- **Note**: The codebase has Drizzle config for PostgreSQL which may be used for future migrations or secondary storage

### Key Features
- **Material Scanner**: AI-powered image recognition for construction materials
- **Carbon Footprint Analysis**: Calculates embodied carbon and energy for identified materials
- **Alternative Recommendations**: Suggests eco-friendly material alternatives with carbon savings
- **Waitlist System**: Email verification flow for early access signups
- **Investor Interest**: Form for investor inquiries with automatic acknowledgment emails
- **Project Management**: Track materials and sustainability scores across construction projects
- **Report Generation**: Generate sustainability reports for projects

### API Routes Structure
- `/api/auth` - Authentication (login, register, profile management)
- `/api/scans` - Material scanning and analysis
- `/api/materials` - Material database with ICE data
- `/api/projects` - Project CRUD operations
- `/api/reports` - Report generation
- `/api/models` - ML model management
- `/api/waitlist` - Waitlist signup with email verification
- `/api/contact` - Contact form submissions
- `/api/investor` - Investor interest submissions
- `/api/health` - Health check endpoint

## External Dependencies

### Third-Party Services
- **MongoDB Atlas**: Cloud-hosted MongoDB database for all application data
- **Resend**: Email delivery service for verification emails and notifications
- **Vercel**: Frontend hosting and CDN
- **Render**: Backend API hosting

### Environment Variables

**Backend (Required)**:
- `MONGODB_URI` - MongoDB Atlas connection string
- `ALLOWED_ORIGINS` - Comma-separated CORS origins (e.g., `https://carbiooai.com`)
- `JWT_SECRET` - Secret key for JWT token signing (has default fallback)

**Backend (Optional)**:
- `RESEND_API_KEY` - For email verification functionality
- `FRONTEND_URL` - Base URL for email verification links

**Frontend**:
- `VITE_API_URL` - Backend API URL (defaults to `/api` for same-origin)

### Key npm Dependencies
- `@tanstack/react-query` - Server state management
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `resend` - Email service SDK
- `multer` - File upload handling
- `framer-motion` - Animations
- `recharts` - Data visualization charts
- `zod` - Schema validation