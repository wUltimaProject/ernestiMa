# Deploy Guide - ErnestiMa

Questa guida spiega come deployare ErnestiMa su Vercel con backend e database cloud.

## 🚀 Deploy Automatico (Consigliato)

### Opzione 1: GitHub Actions (Completamente Automatico)

Dopo il setup iniziale (vedi [SETUP_DEPLOY.md](./SETUP_DEPLOY.md)), ogni push su `main` deploya automaticamente tutto!

**Setup una sola volta**: Segui [SETUP_DEPLOY.md](./SETUP_DEPLOY.md)

### Opzione 2: Script Manuale

```bash
# 1. Setup database (opzionale, se non ce l'hai già)
./setup-database.sh

# 2. Deploy automatico completo
./deploy.sh
```

Lo script `deploy.sh` automatizza:
- ✅ Installazione Vercel CLI (se necessario)
- ✅ Login su Vercel
- ✅ Deploy backend
- ✅ Deploy frontend
- ✅ Configurazione variabili d'ambiente
- ✅ Configurazione CORS

## Architettura Deploy

- **Frontend**: Vercel (React)
- **Backend**: Vercel Serverless Functions (FastAPI)
- **Database**: PostgreSQL Cloud (Supabase, Neon, o Railway)

## Setup Database Cloud

### Opzione 1: Supabase (Consigliato - Gratuito)

1. Vai su [supabase.com](https://supabase.com)
2. Crea un nuovo progetto
3. Vai su Settings → Database
4. Copia la connection string (formato: `postgresql://postgres:[password]@[host]:5432/postgres`)

### Opzione 2: Neon (Gratuito)

1. Vai su [neon.tech](https://neon.tech)
2. Crea un nuovo progetto
3. Copia la connection string

### Opzione 3: Railway (Gratuito con limiti)

1. Vai su [railway.app](https://railway.app)
2. Crea un nuovo progetto PostgreSQL
3. Copia la connection string

## Setup Vercel

### 1. Deploy Frontend

1. Vai su [vercel.com](https://vercel.com)
2. Importa il repository GitHub
3. Seleziona la cartella `frontend`
4. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Deploy Backend

**Opzione A: Stesso progetto Vercel (Monorepo)**

1. Nello stesso progetto Vercel, aggiungi una nuova configurazione:
   - Crea un file `vercel.json` nella root del progetto
   - Configura per gestire sia frontend che backend

**Opzione B: Progetto separato (Consigliato)**

1. Crea un nuovo progetto Vercel
2. Seleziona la cartella `backend`
3. Vercel rileverà automaticamente `vercel.json` nella cartella backend

### 3. Configura Variabili d'Ambiente

Nel progetto Vercel del backend, aggiungi:

```
DATABASE_URL=postgresql://user:password@host:5432/database
CORS_ORIGINS=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
```

Nel progetto Vercel del frontend, aggiungi:

```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Deploy Monorepo (Tutto in uno)

Se vuoi deployare tutto in un unico progetto Vercel:

1. Crea `vercel.json` nella root del progetto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/api/index.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

2. Configura le variabili d'ambiente come sopra

## Verifica Deploy

1. Frontend: `https://your-app.vercel.app`
2. Backend API: `https://your-app.vercel.app/api/health`
3. API Docs: `https://your-app.vercel.app/api/docs`

## Note Importanti

- Il database deve essere PostgreSQL (non SQLite) in produzione
- Le variabili d'ambiente devono essere configurate su Vercel
- Il CORS deve includere il dominio Vercel del frontend
- Il frontend deve avere `VITE_API_URL` configurato per chiamare il backend

## Troubleshooting

### Backend non risponde
- Verifica che `DATABASE_URL` sia configurato correttamente
- Controlla i logs su Vercel Dashboard
- Verifica che `mangum` sia nelle dipendenze

### CORS errors
- Verifica che `CORS_ORIGINS` includa il dominio del frontend
- Controlla che `FRONTEND_URL` sia configurato

### Database connection errors
- Verifica la connection string del database
- Assicurati che il database cloud permetta connessioni esterne
- Controlla firewall/whitelist del database

