# Benjamin Malemo — Portfolio

Personal portfolio website with an iOS-inspired liquid glass design. Built with React, TypeScript, Tailwind CSS, and a Node.js backend for the contact form.

![Screenshot placeholder](./screenshots/hero.png)

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Hook Form, Zod

**Backend:** Node.js, Express, TypeScript, Nodemailer, Helmet, CORS, express-rate-limit, Zod

## Project Structure

```
portfolio/
  client/          # React frontend
    src/
      app/         # App entry point
      components/  # Reusable glass UI components
      sections/    # Page sections (Hero, Projects, About, Contact, Footer)
      data/        # Typed data files (projects, skills)
      styles/      # Global CSS and Tailwind config
      utils/       # Theme, API helpers, classname utility
    public/        # Static assets (favicon, robots.txt, sitemap)
  server/          # Express backend
    src/
      routes/      # API route handlers
      middleware/   # (extensible)
      lib/         # Nodemailer setup
      validators/  # Zod schemas
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Client

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

The API runs on [http://localhost:3001](http://localhost:3001).

> If no SMTP credentials are configured, contact form submissions are logged to the console instead of being emailed. This lets you demo the form without setting up email.

## Environment Variables

### Client (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001` |

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |
| `SMTP_HOST` | SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `you@gmail.com` |
| `SMTP_PASS` | SMTP password (app password) | `xxxx xxxx xxxx xxxx` |
| `TO_EMAIL` | Recipient for contact submissions | `you@gmail.com` |

## Deployment

### Frontend (Vercel / Netlify)

1. Push the `client/` directory to a Git repo (or use the monorepo root with the build directory set to `client`).
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add `VITE_API_BASE_URL` env var pointing to your deployed backend URL.

### Backend (Render / Fly.io)

1. Push the `server/` directory to a Git repo.
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add all server environment variables from the table above.
5. For Gmail SMTP, use an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password).

## Features

- Liquid glass UI components (GlassCard, GlassButton, GlassInput, GlassNavbar)
- Dark / Light mode with system preference detection and localStorage persistence
- Smooth animations with Framer Motion
- Contact form with client + server Zod validation
- Honeypot anti-spam + rate limiting
- SEO: meta tags, OpenGraph, robots.txt, sitemap.xml
- Responsive mobile-first design
- Keyboard accessible with focus states

## License

MIT
