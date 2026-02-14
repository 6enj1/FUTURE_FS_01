import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface Props extends HTMLMotionProps<'div'> {
  hover?: boolean
}

export default function GlassCard({ className, hover = true, children, ...props }: Props) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'glass-hover',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
