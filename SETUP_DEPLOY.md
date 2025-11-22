# Setup Deploy Automatico - ErnestiMa

Per abilitare il deploy automatico completo, segui questi passi **una sola volta**:

## 1. Crea Database Cloud (5 minuti)

Scegli uno di questi provider gratuiti:

### Supabase (Consigliato)
1. Vai su https://supabase.com
2. Crea account → New Project
3. Settings → Database → Connection String
4. Copia la stringa (formato: `postgresql://postgres:[password]@[host]:5432/postgres`)

### Neon
1. Vai su https://neon.tech
2. Crea account → New Project
3. Copia la Connection String

### Railway
1. Vai su https://railway.app
2. Crea account → New Project → Add PostgreSQL
3. Variables → DATABASE_URL → Copia

## 2. Crea Token Vercel (2 minuti)

1. Vai su https://vercel.com/account/tokens
2. Crea un nuovo token (nome: "ErnestiMa Deploy")
3. **Copia il token** (lo vedrai solo una volta!)

## 3. Configura GitHub Secrets (2 minuti)

1. Vai su https://github.com/wUltimaProject/ernestiMa/settings/secrets/actions
2. Clicca "New repository secret"
3. Aggiungi questi secrets:

   - **Nome**: `VERCEL_TOKEN`
   - **Valore**: (incolla il token Vercel)

## 4. Crea Progetti Vercel (5 minuti)

### Backend
1. Vai su https://vercel.com/new
2. Importa repository `wUltimaProject/ernestiMa`
3. **Root Directory**: `backend`
4. **Framework Preset**: Other
5. Clicca "Deploy"
6. Dopo il deploy, vai su Settings → Environment Variables
7. Aggiungi:
   - `DATABASE_URL` = (la connection string del database)
   - `CORS_ORIGINS` = (lo imposteremo dopo, per ora lascia vuoto)
   - `FRONTEND_URL` = (lo imposteremo dopo)

### Frontend
1. Vai su https://vercel.com/new
2. Importa repository `wUltimaProject/ernestiMa`
3. **Root Directory**: `frontend`
4. **Framework Preset**: Vite
5. Clicca "Deploy"
6. Dopo il deploy, copia l'URL (es: `https://ernestima-frontend.vercel.app`)

## 5. Completa Configurazione (2 minuti)

### Backend
1. Vai su Vercel Dashboard → Progetto Backend → Settings → Environment Variables
2. Aggiorna:
   - `CORS_ORIGINS` = `https://[URL-FRONTEND]` (senza trailing slash)
   - `FRONTEND_URL` = `https://[URL-FRONTEND]` (senza trailing slash)
3. Vai su Deployments → Redeploy (per applicare le nuove variabili)

### Frontend
1. Vai su Vercel Dashboard → Progetto Frontend → Settings → Environment Variables
2. Aggiungi:
   - `VITE_API_URL` = `https://[URL-BACKEND]/api`
3. Vai su Deployments → Redeploy

## ✅ Fatto!

Ora ogni push su `main` attiverà automaticamente:
- ✅ Deploy backend
- ✅ Deploy frontend
- ✅ Configurazione automatica

## Verifica

1. Fai un push su `main`:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. Controlla GitHub Actions: https://github.com/wUltimaProject/ernestiMa/actions

3. Verifica i deploy su Vercel Dashboard

## Troubleshooting

### Deploy fallisce
- Verifica che `VERCEL_TOKEN` sia configurato in GitHub Secrets
- Controlla i logs su GitHub Actions
- Verifica che i progetti Vercel esistano

### Database non funziona
- Verifica che `DATABASE_URL` sia corretto
- Controlla che il database permetta connessioni esterne
- Verifica firewall/whitelist del database

### CORS errors
- Verifica che `CORS_ORIGINS` includa l'URL del frontend
- Assicurati che `FRONTEND_URL` sia configurato
- Controlla che entrambi siano senza trailing slash

