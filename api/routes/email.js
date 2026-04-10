import express from 'express'
import { body, validationResult } from 'express-validator'
import { EmailClient } from '@azure/communication-email'

const router = express.Router()

// Validaciones
const contactValidation = [
  body('client_name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('client_email').isEmail().withMessage('Email inválido'),
  body('client_phone').trim().notEmpty().withMessage('El teléfono es requerido'),
  body('service').trim().notEmpty().withMessage('El servicio es requerido'),
  body('message').trim().notEmpty().withMessage('El mensaje es requerido'),
]

// NO inicializar el cliente aquí, se hará en cada request
// const emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING)

/**
 * POST /api/email/contact
 * Envía correo de contacto a los destinatarios configurados
 */
router.post('/contact', contactValidation, async (req, res) => {
  try {
    // Validar datos
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      client_name,
      client_email,
      client_phone,
      client_company = 'No especificada',
      service,
      preferred_date = 'No especificada',
      preferred_time = 'No especificada',
      message
    } = req.body

    // Crear cliente de Azure aquí (después de que dotenv se haya cargado)
    const emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING)

    // Destinatarios
    const recipients = process.env.RECIPIENT_EMAILS.split(',').map(email => ({
      address: email.trim()
    }))

    // Contenido del correo
    const emailContent = {
      senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS,
      content: {
        subject: `Nueva solicitud de contacto - ${client_name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #00C2A8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #00C2A8; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nueva Solicitud de Contacto</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Cliente:</div>
                  <div class="value">${client_name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${client_email}">${client_email}</a></div>
                </div>
                <div class="field">
                  <div class="label">📞 Teléfono:</div>
                  <div class="value">${client_phone}</div>
                </div>
                <div class="field">
                  <div class="label">🏢 Empresa:</div>
                  <div class="value">${client_company}</div>
                </div>
                <div class="field">
                  <div class="label">🛠 Servicio:</div>
                  <div class="value">${service}</div>
                </div>
                <div class="field">
                  <div class="label">📅 Fecha preferida:</div>
                  <div class="value">${preferred_date}</div>
                </div>
                <div class="field">
                  <div class="label">🕐 Hora preferida:</div>
                  <div class="value">${preferred_time}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Mensaje:</div>
                  <div class="value">${message}</div>
                </div>
                <div class="field">
                  <div class="label">🗓 Fecha de envío:</div>
                  <div class="value">${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</div>
                </div>
              </div>
              <div class="footer">
                <p>Este correo fue enviado desde el formulario de contacto de Versat</p>
              </div>
            </div>
          </body>
          </html>
        `
      },
      recipients: { to: recipients }
    }

    // Enviar correo
    const poller = await emailClient.beginSend(emailContent)
    const result = await poller.pollUntilDone()

    console.log('✅ Email sent successfully:', result.id)

    res.json({
      success: true,
      message: 'Correo enviado exitosamente',
      messageId: result.id
    })

  } catch (error) {
    console.error('❌ Error sending email:', error)
    res.status(500).json({
      success: false,
      error: 'Error al enviar el correo',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

export default router
