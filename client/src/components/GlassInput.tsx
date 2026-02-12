import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  multiline: true
}

type Props = InputProps | TextareaProps

function isTextarea(props: Props): props is TextareaProps {
  return 'multiline' in props && props.multiline === true
}

const baseStyles = cn(
  'w-full rounded-xl px-4 py-3 text-sm',
  'bg-[var(--glass-bg)] backdrop-blur-md',
  'border border-[var(--glass-border)]',
  'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
  'transition-all duration-200 ease-spring',
  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0',
  'focus:border-transparent',
)

const GlassInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (props, ref) => {
    const { label, error, className, ...rest } = props

    const id = rest.id || rest.name || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </label>
        {isTextarea(props) ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            className={cn(baseStyles, 'min-h-[120px] resize-y', className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            className={cn(baseStyles, className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

GlassInput.displayName = 'GlassInput'
export default GlassInput
