# Carbioo AI - Sustainable Construction Platform

## Overview
Carbioo AI is an AI-powered platform for sustainable construction that helps identify construction materials, calculate carbon footprints, and recommend eco-friendly alternatives. Currently running as a waitlist/landing page.

## Project Structure
```
├── client/           # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and API client
│   │   └── hooks/        # Custom React hooks
│   └── vercel.json       # Vercel deployment config
├── server/           # Express backend
│   ├── db/           # MongoDB models and connection
│   ├── routes/       # API routes
│   ├── services/     # Email and inference services
│   └── index.ts      # Server entry point
├── shared/           # Shared types/schemas
└── attached_assets/  # Static assets
```

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript
- **Database**: MongoDB Atlas
- **Email**: Resend (for verification emails)

## Environment Variables

### Backend (Render)
- `MONGODB_URI` - MongoDB Atlas connection string
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins (e.g., `https://carbiooai.com,https://www.carbiooai.com`)
- `RESEND_API_KEY` - (Optional) For email verification

### Frontend (Vercel)
- `VITE_API_URL` - Backend API URL (e.g., `https://carbioo-api.onrender.com/api`)

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Deployment (Split Setup)

### Frontend → Vercel (Always On)
1. Connect GitHub repo to Vercel
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL`

### Backend → Render (Free Tier)
1. Connect GitHub repo to Render
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Add environment variables: `MONGODB_URI`, `ALLOWED_ORIGINS`

## Recent Changes
- 2024-12-12: Prepared for split frontend/backend deployment
- Added CORS support for cross-origin API requests
- Updated API calls to use configurable base URL
- Removed hardcoded MongoDB credentials (now uses env vars)
