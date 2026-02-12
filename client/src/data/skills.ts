export interface SkillGroup {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'SwiftUI', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'GraphQL', 'JWT/OTP', 'Webhooks'],
  },
  {
    category: 'AI & ML',
    items: ['OpenAI (GPT-4o)', 'LangChain', 'ElevenLabs', 'Hugging Face', 'Prompt Engineering', 'RAG Pipelines'],
  },
  {
    category: 'Data & Infrastructure',
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'Prisma ORM', 'Redis'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Git/GitHub', 'Docker', 'GitHub Actions', 'Vercel', 'AWS (EC2/S3)', 'Linux'],
  },
]

export interface Experience {
  title: string
  company: string
  period: string
  location: string
  description: string[]
}

export const experience: Experience[] = [
  {
    title: 'Founder & Full-Stack AI Developer',
    company: 'ZenziAI',
    period: 'Jan 2025 — Present',
    location: 'Johannesburg, South Africa',
    description: [
      'Built and launched a multi-channel AI assistant platform (WhatsApp, web, voice) for African SMEs.',
      'Integrated GPT-4o and ElevenLabs for intelligent text and voice interactions.',
      'Implemented subscription billing with Yoco, automated invoicing, and secure OTP+JWT auth.',
    ],
  },
  {
    title: 'Founder & Lead Developer',
    company: 'Kula',
    period: 'Jan 2025 — Present',
    location: 'Johannesburg, South Africa',
    description: [
      'Designed and built a native iOS food waste marketplace using Swift/SwiftUI.',
      'Developed a TypeScript/Express backend with PostgreSQL (18 tables) and Prisma ORM.',
      'Architected the "Kula Brain" AI module for demand prediction and stock optimization.',
    ],
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-employed',
    period: 'Jun 2023 — Present',
    location: 'Johannesburg, South Africa',
    description: [
      'Delivered responsive websites and Shopify stores from design to deployment.',
      'Integrated multilingual content (English, French, Swahili) with client onboarding guides.',
    ],
  },
]

export interface Education {
  degree: string
  institution: string
  period: string
  details: string
}

export const education: Education[] = [
  {
    degree: 'Diploma in Business Information Technology (NQF 6)',
    institution: 'University of Johannesburg',
    period: 'Graduated 2025',
    details: 'Programming, Web Development, Databases (SQL), Systems & Business Analysis, IT Security.',
  },
]

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  { name: 'IBM AI Developer Professional Certificate', issuer: 'Coursera', year: '2025' },
  { name: 'AI for Everyone', issuer: 'DeepLearning.AI / Coursera', year: '2025' },
]
