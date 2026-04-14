import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import emailRouter from './routes/email.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  
  // Todas las rutas no API devuelven el index.html (SPA)
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler (solo para rutas API en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Versat API running on http://0.0.0.0:${PORT}`)
  console.log(`📧 Email service: Azure Communication Services`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
