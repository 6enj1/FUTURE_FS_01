import { type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export default function GlassButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as = 'button',
  href,
  ...props
}: Props) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
    'transition-all duration-300 ease-spring',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    'active:scale-[0.97]',
    sizes[size],
    variant === 'primary' && [
      'glass text-[var(--text-primary)]',
      'hover:shadow-glow hover:bg-[var(--accent-soft)]',
      'border border-[var(--glass-border)]',
    ],
    variant === 'ghost' && [
      'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
      'hover:bg-[var(--glass-bg)]',
    ],
    className,
  )

  if (as === 'a' && href) {
    return (
      <motion.a
        href={href}
        className={base}
        whileTap={{ scale: 0.97 }}
        target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
        rel={href.startsWith('http') || href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={base}
      whileTap={{ scale: 0.97 }}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}
