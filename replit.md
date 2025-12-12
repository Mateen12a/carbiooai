# Carbioo AI - Sustainable Construction Platform

## Overview
Carbioo AI is a waitlist landing page for an AI-powered sustainable construction platform. The app helps architects and construction professionals identify materials, calculate carbon footprints, and discover eco-friendly alternatives.

## Project Structure
- `/client` - React frontend with Vite and Tailwind CSS
- `/server` - Express.js backend API
- `/shared` - Shared types and utilities
- `/attached_assets` - Generated images and assets

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS 4, Wouter (routing)
- **Backend**: Express.js, TypeScript
- **Database**: MongoDB Atlas (via Mongoose)
- **Email**: Resend for verification emails

## Running the App
The app runs on port 5000 serving both frontend and API:
```bash
npm run dev
```

## Environment Variables
- `MONGODB_URI` - MongoDB connection string (currently uses default Atlas connection)
- `RESEND_API_KEY` - For sending verification emails (optional for basic waitlist)

## Key Features
- Waitlist signup with email verification
- Rate limiting for spam protection
- Landing page with feature showcase

## Deployment
Configured for Replit autoscale deployment:
- Build: `npm run build`
- Start: `npm run start`
