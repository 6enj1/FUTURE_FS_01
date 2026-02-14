import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, allTags, type Project } from '@/data/projects'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'
import SectionHeading from '@/components/SectionHeading'
import ProjectModal from '@/components/ProjectModal'
import { cn } from '@/utils/cn'

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(true)

  const filtered = useMemo(() => {
    return projects.filter(p => !activeTag || p.tags.includes(activeTag))
  }, [activeTag])

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built from the ground up."
        />

        {/* filter toggle + tags */}
        <div className="mb-8 flex items-start gap-3">
          {/* filter toggle box */}
          <button
            onClick={() => setFiltersOpen(prev => !prev)}
            aria-label={filtersOpen ? 'Hide filters' : 'Show filters'}
            aria-expanded={filtersOpen}
            className={cn(
              'flex-shrink-0 flex items-center justify-center rounded-xl h-[38px] w-[38px] border transition-all duration-300 ease-spring',
              filtersOpen
                ? 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)]'
                : 'bg-[var(--accent)] border-[var(--accent)] text-white',
            )}
          >
            {filtersOpen ? (
              <FilterIcon />
            ) : (
              <span className="text-[10px] font-semibold leading-none">Filter</span>
            )}
          </button>

          {/* filter tags — staggered slide in/out */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
            <AnimatePresence initial={false}>
              {filtersOpen && (
                <>
                  <FilterChip
                    index={0}
                    active={!activeTag}
                    onClick={() => setActiveTag(null)}
                  >
                    All
                  </FilterChip>
                  {allTags.map((tag, i) => (
                    <FilterChip
                      key={tag}
                      index={i + 1}
                      active={activeTag === tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    >
                      {tag}
                    </FilterChip>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* project grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard
                className="flex h-full cursor-pointer flex-col"
                onClick={() => setSelected(project)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') setSelected(project) }}
                aria-label={`View details for ${project.title}`}
              >
                {project.featured && (
                  <span className="mb-3 inline-block w-fit rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                    Featured
                  </span>
                )}
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{project.role}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 5).map(tag => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs text-[var(--accent)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="text-xs text-[var(--text-muted)]">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-3">
                  {project.github && (
                    <GlassButton
                      as="a"
                      href={project.github}
                      size="sm"
                      variant="ghost"
                      onClick={e => e.stopPropagation()}
                    >
                      GitHub
                    </GlassButton>
                  )}
                  {project.live && (
                    <GlassButton
                      as="a"
                      href={project.live}
                      size="sm"
                      variant="ghost"
                      onClick={e => e.stopPropagation()}
                    >
                      Live
                    </GlassButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-[var(--text-muted)]">
            No projects match your search.
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

const STAGGER = 0.03
const EASE = [0.16, 1, 0.3, 1] as const

function FilterChip({
  index,
  active,
  onClick,
  children,
}: {
  index: number
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  // reverse stagger on exit — last chip leaves first
  const total = allTags.length + 1
  const enterDelay = index * STAGGER
  const exitDelay = (total - 1 - index) * STAGGER

  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -16, scale: 0.85 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { delay: enterDelay, duration: 0.3, ease: EASE },
      }}
      exit={{
        opacity: 0,
        x: -16,
        scale: 0.85,
        transition: { delay: exitDelay, duration: 0.2, ease: EASE },
      }}
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200',
        active
          ? 'bg-[var(--accent)] text-white'
          : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
      )}
    >
      {children}
    </motion.button>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  )
}
