import { Router, type Request, type Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import { contactSchema } from '../validators/contact.js'
import { sendContactEmail } from '../lib/mailer.js'

export const contactRouter = Router()

// stricter rate limit for the contact endpoint
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

contactRouter.post('/contact', contactLimiter, async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.safeParse(req.body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input'
      res.status(400).json({ success: false, message: firstError })
      return
    }

    // honeypot check
    if (parsed.data._honey) {
      // pretend it succeeded so bots don't retry
      res.json({ success: true, message: 'Message sent successfully.' })
      return
    }

    await sendContactEmail(parsed.data)
    res.json({ success: true, message: 'Message sent successfully. I\'ll get back to you soon!' })
  } catch (err) {
    console.error('[contact] Failed to process:', err)
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' })
  }
})
