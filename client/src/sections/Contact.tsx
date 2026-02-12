import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'
import GlassInput from '@/components/GlassInput'
import SectionHeading from '@/components/SectionHeading'
import { sendContactForm } from '@/utils/api'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _honey: z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      await sendContactForm(data)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or want to connect? Send me a message."
        />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard hover={false} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Message Sent</h3>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <GlassButton
                  className="mt-6"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </GlassButton>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard hover={false}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <GlassInput
                      label="Name"
                      placeholder="Your name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <GlassInput
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <GlassInput
                    label="Subject"
                    placeholder="What's this about?"
                    error={errors.subject?.message}
                    {...register('subject')}
                  />

                  <GlassInput
                    label="Message"
                    multiline
                    placeholder="Tell me about your project or idea..."
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  {/* honeypot — visually hidden */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('_honey')}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400" role="alert">
                      {errorMsg || 'Failed to send. Please try again.'}
                    </div>
                  )}

                  <GlassButton
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Spinner /> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </GlassButton>
                </form>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
