import { motion } from 'framer-motion'
import { skills, experience, education, certifications } from '@/data/skills'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'
import SectionHeading from '@/components/SectionHeading'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="About Me"
          subtitle="Background, skills, and experience."
        />

        {/* skills grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map(group => (
            <motion.div key={group.category} variants={fadeUp}>
              <GlassCard className="h-full">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* experience timeline */}
        <div className="mb-16">
          <h3 className="mb-8 text-xl font-semibold text-[var(--text-primary)]">Experience</h3>
          <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--glass-border)]">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* timeline dot */}
                <div className="absolute -left-8 top-1.5 h-[9px] w-[9px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

                <GlassCard hover={false} className="!p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)]">{exp.title}</h4>
                      <p className="text-sm text-[var(--accent)]">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--text-muted)]">{exp.period}</p>
                      <p className="text-xs text-[var(--text-muted)]">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-muted)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* education + certifications */}
        <div className="grid gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard hover={false}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                Education
              </h3>
              {education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm">{edu.degree}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{edu.institution}</p>
                  <p className="text-xs text-[var(--text-muted)]">{edu.period}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{edu.details}</p>
                </div>
              ))}
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard hover={false}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={i}>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{cert.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{cert.issuer} — {cert.year}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>

        {/* download resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <GlassButton as="a" href="/resume.pdf" size="lg">
            <DownloadIcon /> Download Full Resume
          </GlassButton>
        </motion.div>
      </div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}
