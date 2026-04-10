# Versat API - Email Service

Backend Node.js para envío de correos con Azure Communication Services.

## Setup

### 1. Instalar dependencias

```bash
cd api
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Azure:

```env
AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://...;accesskey=...
AZURE_COMMUNICATION_SENDER_ADDRESS=DoNotReply@...azurecomm.net
RECIPIENT_EMAILS=juan.garcia@versat.ai,heider.higuita@versat.ai
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor estará en `http://localhost:3001`

### 4. Probar el endpoint

```bash
curl -X POST http://localhost:3001/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Juan Pérez",
    "client_email": "juan@example.com",
    "client_phone": "+57 300 123 4567",
    "client_company": "Mi Empresa",
    "service": "Desarrollo Web",
    "message": "Necesito una cotización"
  }'
```

## Endpoints

### Health Check
- **GET** `/health`
- Verifica que el servidor esté funcionando

### Enviar correo de contacto
- **POST** `/api/email/contact`
- Body:
  ```json
  {
    "client_name": "string (requerido)",
    "client_email": "string (requerido)",
    "client_phone": "string (requerido)",
    "client_company": "string (opcional)",
    "service": "string (requerido)",
    "preferred_date": "string (opcional)",
    "preferred_time": "string (opcional)",
    "message": "string (requerido)"
  }
  ```

## Deploy a Azure App Service

### Opción 1: Azure CLI

```bash
# Login
az login

# Crear App Service
az webapp up --name versat-api --runtime "NODE:18-lts" --sku B1

# Configurar variables de entorno
az webapp config appsettings set --name versat-api \
  --settings \
  AZURE_COMMUNICATION_CONNECTION_STRING="tu_connection_string" \
  AZURE_COMMUNICATION_SENDER_ADDRESS="tu_sender_address" \
  RECIPIENT_EMAILS="email1@versat.ai,email2@versat.ai" \
  NODE_ENV="production"
```

### Opción 2: VS Code Extension

1. Instala "Azure App Service" extension
2. Click derecho en la carpeta `api`
3. "Deploy to Web App..."
4. Configura variables en Azure Portal

## Estructura

```
api/
├── server.js           # Servidor Express
├── routes/
│   └── email.js        # Rutas de email
├── package.json
├── .env                # Variables de entorno (no subir a git)
└── .env.example        # Ejemplo de variables
```

## Seguridad

- ✅ CORS configurado
- ✅ Validación de datos con express-validator
- ✅ Variables sensibles en .env
- ✅ Rate limiting recomendado para producción
- ✅ HTTPS en producción (Azure lo maneja)
