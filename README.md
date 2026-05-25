<div align="center">
  <h1>Souvik Biswas — Portfolio</h1>
  <p>A high-performance, immersive personal portfolio built with <strong>React</strong>, <strong>GSAP</strong>, <strong>WebGL (OGL)</strong>, and an <strong>Express API</strong> backend.</p>

  [![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Express](https://img.shields.io/badge/Express-API-grey?logo=express)](https://expressjs.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](#)
</div>

---

## Overview

Personal portfolio of **Souvik Biswas** — Full-Stack Developer. This project bridges high-end frontend animations with a robust Node.js backend, featuring advanced scroll animations, 3D elements, and a live guestbook powered by PostgreSQL.

---

## Key Features

### Frontend
- **Smooth Scrolling** — Lenis physics-based scrolling integrated with GSAP ScrollTrigger
- **Cinematic Animations** — GSAP and Framer Motion for text reveals, parallax, and page transitions
- **WebGL / 3D** — OGL and Spline for lightweight 3D elements in the browser
- **Ambient Experience** — Background music player and custom interactive cursor
- **Dark / Light Theme** — Persistent theme toggle with smooth transitions
- **PWA Support** — Installable with service worker via vite-plugin-pwa

### Backend
- **Express API** — Node.js `/api` server handling guestbook, contact, and data proxies
- **PostgreSQL (Neon)** — Live guestbook with full CRUD via pg connection pool
- **Email (Nodemailer)** — Collaboration form submissions sent directly to inbox
- **Swagger Docs** — Auto-generated API docs at `/api/docs`

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm
- Git

### 1. Clone the repository
```bash
git clone https://github.com/souvik-biswas-dev/Souvik_Portfolio.git
cd Souvik_Portfolio
```

### 2. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd api && npm install && cd ..
```

### 3. Environment Variables

Root `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

`api/.env`:
```env
PORT=5000
DATABASE_URL=your_neon_postgres_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_email_address
```

### 4. Run the Development Server
```bash
npm run dev:all
```
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## Project Structure

```text
Souvik_Portfolio/
├── api/                        # Express.js backend
│   ├── index.ts                # Server entry point
│   ├── swagger.yaml            # API documentation
│   └── package.json
├── public/                     # Static assets
│   ├── previews/               # Resume PDF and theme screenshots
│   └── music/                  # Ambient background track
├── src/
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Full-page views
│   ├── context/                # Theme, Music, Transition providers
│   ├── data/                   # Project metadata
│   ├── hooks/                  # Custom React hooks
│   ├── App.tsx                 # Routing and layout
│   └── main.tsx                # App entry point
└── package.json
```

---

## License

MIT License — feel free to use this as a reference or starting point.
