import { motion } from 'framer-motion'

interface Props {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--text-secondary)]">{subtitle}</p>
      )}
    </motion.div>
  )
}
