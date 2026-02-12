import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: CLIENT_URL, methods: ['POST'] }))
app.use(express.json({ limit: '16kb' }))

// global rate limit — 100 requests per 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}))

app.use('/api', contactRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
