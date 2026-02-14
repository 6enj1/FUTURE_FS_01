import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import GlassButton from '@/components/GlassButton'

const FIRST_NAME = 'BENJAMIN'
const LAST_NAME = 'MALEMO'
const LETTER_STAGGER = 0.08
const FIRST_NAME_DURATION = FIRST_NAME.length * LETTER_STAGGER + 0.5
const LAST_NAME_DELAY = FIRST_NAME_DURATION + 0.2

const spring = [0.16, 1, 0.3, 1] as const

const letterVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * LETTER_STAGGER,
      duration: 0.55,
      ease: spring,
    },
  }),
}

const blockFadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: spring },
  },
})

// max px the portrait shifts from center
const FOLLOW_RANGE = 30
const SPRING_CONFIG = { damping: 25, stiffness: 150, mass: 0.5 }

export default function Hero() {
  const contentStart = LAST_NAME_DELAY + 0.5
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { once: true, amount: 0.3 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const portraitX = useSpring(mouseX, SPRING_CONFIG)
  const portraitY = useSpring(mouseY, SPRING_CONFIG)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) {
      // use device gyroscope on mobile
      const onOrientation = (e: DeviceOrientationEvent) => {
        const gamma = e.gamma ?? 0 // left-right tilt (-90..90)
        const beta = e.beta ?? 0   // front-back tilt (-180..180)
        mouseX.set((gamma / 45) * FOLLOW_RANGE)
        mouseY.set(((beta - 45) / 45) * FOLLOW_RANGE) // offset by 45° for natural hold angle
      }
      window.addEventListener('deviceorientation', onOrientation)
      return () => window.removeEventListener('deviceorientation', onOrientation)
    }

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set(((e.clientX - cx) / cx) * FOLLOW_RANGE)
      mouseY.set(((e.clientY - cy) / cy) * FOLLOW_RANGE)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)' }}
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto flex flex-col items-center">
        {/* name + portrait stack */}
        <div className="relative flex flex-col items-center">
          {/* name sits behind the portrait */}
          <h1 className="pointer-events-none select-none text-center font-bold uppercase leading-[0.9] tracking-tighter text-[var(--text-primary)]" style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}>
            {/* first name — letter by letter */}
            <span className="inline-flex" aria-label={FIRST_NAME}>
              {FIRST_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="inline-block"
                  aria-hidden="true"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <br />

            {/* last name — single block after first name finishes */}
            <motion.span
              variants={blockFadeUp(LAST_NAME_DELAY)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="inline-block text-gradient"
            >
              {LAST_NAME}
            </motion.span>
          </h1>

          {/* portrait — dead center over the name, follows mouse */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: LAST_NAME_DELAY + 0.1, duration: 0.7, ease: spring }}
          >
            <div
              className="overflow-hidden border-2 border-[var(--glass-border)] shadow-glass"
              style={{
                width: 'clamp(100px, 18vw, 240px)',
                height: 'clamp(130px, 24vw, 320px)',
                borderRadius: '50% / 45%',
              }}
            >
              <img
                src="/portrait.png"
                alt="Benjamin Malemo"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        {/* subtitle */}
        <motion.p
          variants={blockFadeUp(contentStart)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-8 text-sm font-medium tracking-widest uppercase text-[var(--accent)]"
        >
          Full-Stack Developer & AI Engineer
        </motion.p>

        {/* tagline */}
        <motion.p
          variants={blockFadeUp(contentStart + 0.1)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-4 max-w-xl text-center text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
        >
          I turn business problems into functional, simple products.
          Building AI-powered platforms and scalable web apps from Johannesburg.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={blockFadeUp(contentStart + 0.2)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GlassButton as="a" href="#projects" size="lg">
            View Projects
          </GlassButton>
          <GlassButton as="a" href="/resume.pdf" size="lg" variant="ghost">
            <DownloadIcon /> Resume
          </GlassButton>
          <GlassButton as="a" href="#contact" size="lg" variant="ghost">
            Get in Touch
          </GlassButton>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0 }}
        transition={{ delay: contentStart + 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-[var(--text-muted)]">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="2" />
          <motion.circle
            cx="10" cy="10" r="3" fill="currentColor"
            animate={{ cy: [8, 18, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
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
