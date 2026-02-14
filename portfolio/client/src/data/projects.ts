export interface Project {
  id: string
  title: string
  role: string
  description: string
  longDescription: string
  highlights: string[]
  tags: string[]
  github?: string
  live?: string
  image?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'kula',
    title: 'Kula',
    role: 'Founder & Lead Developer',
    description:
      'AI-powered food waste marketplace connecting students with restaurants selling surplus meals at 50% off.',
    longDescription:
      'Kula is a native iOS application built to tackle food waste in Johannesburg. It connects university students with nearby restaurants that have surplus meals, offering them at half price. The platform uses geolocation, voice search, and mobile payments via Yoco to create a seamless experience. On the backend, a TypeScript/Express API manages 18 database tables through Prisma ORM, handling OAuth authentication, order management, and a secure payment pipeline.',
    highlights: [
      'Native iOS app built with Swift and SwiftUI featuring geolocation and voice search',
      'TypeScript/Express backend with PostgreSQL (18 tables, Prisma ORM)',
      'OAuth integration (Google/Apple) with secure session management',
      'AI module "Kula Brain" for demand prediction and stock optimization',
      'Mobile payment integration via Yoco with IPN handling',
    ],
    tags: ['Swift', 'SwiftUI', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'AI'],
    github: 'https://github.com/6enj1',
    featured: true,
  },
  {
    id: 'zenziai',
    title: 'ZenziAI',
    role: 'Founder & Full-Stack AI Developer',
    description:
      'Multimodal AI assistant platform for African SMEs — WhatsApp, web dashboard, and voice channels.',
    longDescription:
      'ZenziAI is a beta platform that provides AI-powered assistants to small and medium businesses across Africa. It operates across three channels: WhatsApp, a web dashboard, and voice — all backed by a Node/Express + PostgreSQL stack. The AI layer integrates GPT-4o for text and ElevenLabs for voice synthesis through dedicated /api/chat and /api/voice endpoints. The platform includes a full subscription system powered by Yoco with IPN handling, automatic PDF/CSV invoice generation, and secure OTP + JWT authentication.',
    highlights: [
      'Multi-channel AI assistant: WhatsApp, web dashboard, and voice',
      'GPT-4o integration for intelligent responses with context awareness',
      'ElevenLabs voice synthesis for natural-sounding voice interactions',
      'Full subscription system with Yoco payments, upgrades/downgrades',
      'Automated PDF/CSV invoice generation',
      'OTP + JWT authentication with admin-protected routes',
    ],
    tags: ['Node.js', 'Express', 'PostgreSQL', 'OpenAI', 'ElevenLabs', 'React', 'WhatsApp API'],
    github: 'https://github.com/6enj1',
    live: 'https://zenziai.africa',
    featured: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    role: 'Designer & Developer',
    description:
      'This site — a liquid glass UI portfolio built with React, TypeScript, and Tailwind CSS.',
    longDescription:
      'A personal portfolio designed with an iOS-inspired liquid glass aesthetic. Built from scratch with React and TypeScript, featuring custom glassmorphism components, Framer Motion animations, dark/light mode, and a Node.js backend for the contact form with full email delivery. The goal was to create something that feels premium and custom rather than templated.',
    highlights: [
      'Custom glassmorphism design system built from scratch',
      'Framer Motion animations with spring-based easing',
      'Dark and light mode with system preference detection',
      'Accessible: keyboard navigation, ARIA labels, focus states',
      'Contact form with server-side validation and email delivery',
      'SEO optimized with OpenGraph tags and structured markup',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    github: 'https://github.com/6enj1',
    featured: false,
  },
  {
    id: 'freelance-sites',
    title: 'Client Web Projects',
    role: 'Freelance Developer',
    description:
      'Responsive websites and Shopify stores delivered end-to-end for small businesses.',
    longDescription:
      'A collection of freelance projects ranging from portfolio sites to Shopify stores, all built from design to deployment. Each project was delivered with multilingual content support (English, French, Swahili) and included onboarding guides so clients could manage their own content. Deployed on Vercel and Netlify with CI/CD pipelines.',
    highlights: [
      'End-to-end delivery from design mockup to production deployment',
      'Multilingual content support (English, French, Swahili)',
      'Shopify theme customization and e-commerce setup',
      'CI/CD pipelines with GitHub Actions and Vercel',
      'Client onboarding documentation for content management',
    ],
    tags: ['React', 'Next.js', 'Shopify', 'Vercel', 'Tailwind CSS'],
    featured: false,
  },
]

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort()
