import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import emailRouter from './routes/email.js'

// Cargar variables de entorno PRIMERO
dotenv.config()

// Validar variables críticas de Azure
if (!process.env.AZURE_COMMUNICATION_CONNECTION_STRING || !process.env.AZURE_COMMUNICATION_SENDER_ADDRESS) {
  console.error('❌ ERROR: Variables de Azure no configuradas')
  console.error('Por favor configura en api/.env:')
  console.error('- AZURE_COMMUNICATION_CONNECTION_STRING')
  console.error('- AZURE_COMMUNICATION_SENDER_ADDRESS')
  console.error('\nArchivo .env actual:', process.env.AZURE_COMMUNICATION_CONNECTION_STRING ? 'Encontrado' : 'No encontrado')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['POST', 'GET'],
  credentials: true
}))

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Versat API',
    timestamp: new Date().toISOString()
  })
})

// Routes
app.use('/api/email', emailRouter)

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`✅ Versat API running on http://localhost:${PORT}`)
  console.log(`📧 Email service: Azure Communication Services`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
