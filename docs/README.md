# Portfolio Website Documentation

## Overview

Personal portfolio of **Souvik Biswas** — Full-Stack Developer. Built with React, TypeScript, and Tailwind CSS following Swiss design principles: clean typography, generous whitespace, and purposeful interactions.

## Features

### Core
- **Responsive Design** — Fully responsive across all devices
- **Dark/Light Theme** — Persistent theme switching with smooth transitions
- **Smooth Scrolling** — Lenis-powered scrolling experience
- **Custom Cursor** — Interactive cursor with hover effects (desktop only)
- **GSAP Animations** — Performant animations throughout
- **PWA** — Installable progressive web app

### Pages
1. **Home** — Main portfolio showcase
2. **Projects** — Detailed project gallery
3. **GuestBook** — Live guestbook powered by Neon PostgreSQL
4. **Collaborate** — Project inquiry form with email notification

### Components
- **Navigation** — Fixed header with theme toggle and resume download
- **Hero** — Large typography-focused introduction with Spline 3D
- **About** — Personal introduction with decorative elements
- **Skills** — Technical expertise showcase
- **Timeline** — Professional journey visualization
- **Blog Section** — Latest articles
- **Testimonials** — Client feedback display
- **Contact** — Contact methods and availability
- **DevActivity** — Live GitHub contribution stats
- **SystemArchitecture** — Mermaid-powered architecture diagrams

## Technology Stack

### Frontend
- React 18, TypeScript, React Router DOM, Tailwind CSS

### Animations
- GSAP + ScrollTrigger, Framer Motion, Lenis

### Backend
- Express.js, TypeScript, PostgreSQL (Neon), Nodemailer

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components
├── context/             # Theme, Music, Transition providers
├── data/                # Project metadata
├── hooks/               # Custom hooks
├── App.tsx              # Routing and layout
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Design System

### Colors
- **Accent**: Red-600 for highlights and interactions
- **Light Theme**: Gray-50 background, Gray-900 text
- **Dark Theme**: Black background, Gray-100 text

### Typography
- Syncopate for headings (via @fontsource/syncopate)
- System font stack for body text

## Development

```bash
# Install dependencies
npm install && cd api && npm install && cd ..

# Development (frontend + backend)
npm run dev:all

# Frontend only
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment guide.

---

Built by [Souvik Biswas](https://github.com/souvik-biswas-dev)
