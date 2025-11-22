# Setup Supabase per ErnestiMa

Guida completa per configurare Supabase e collegarlo a Vercel.

## 📋 Passo 1: Ottenere la Connection String da Supabase

### Metodo 1: Dashboard Supabase (Manuale)

1. **Accedi a Supabase Dashboard**
   - Vai su https://supabase.com/dashboard
   - Seleziona il tuo progetto

2. **Vai su Settings → Database**
   - Nel menu laterale, clicca su **Settings** (⚙️)
   - Clicca su **Database**

3. **Trova la Connection String**
   - Scorri fino alla sezione **"Connection string"** o **"Connection pooling"**
   - Vedrai diverse opzioni:
     - **URI**: Connection string completa
     - **Connection Pooling**: Per serverless (consigliato per Vercel)
     - **Direct connection**: Per connessioni dirette

4. **Copia la Connection String**
   - Per Vercel (serverless), usa **"Connection Pooling"** o **"Session mode"**
   - La stringa sarà tipo:
     ```
     postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
   - Oppure in formato URI:
     ```
     postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
     ```

### Metodo 2: Integrazione Vercel Marketplace (Automatico - Consigliato)

1. **Installa l'integrazione Supabase su Vercel**
   - Vai su https://vercel.com/marketplace/supabase
   - Clicca su **"Add Integration"**
   - Seleziona il tuo progetto Vercel
   - Collega il tuo progetto Supabase

2. **Variabili automatiche**
   - L'integrazione aggiunge automaticamente queste variabili:
     - `POSTGRES_URL` (connection string con pooling)
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_USER`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DATABASE`
     - `POSTGRES_HOST`
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `SUPABASE_ANON_KEY`

## 🔧 Passo 2: Configurare Vercel

### Opzione A: Con Integrazione Marketplace (Automatico)

Se hai usato l'integrazione Vercel Marketplace, le variabili sono già configurate! ✅

### Opzione B: Configurazione Manuale

1. **Vai su Vercel Dashboard**
   - Seleziona il progetto backend

2. **Settings → Environment Variables**
   - Clicca su **Settings**
   - Clicca su **Environment Variables**

3. **Aggiungi DATABASE_URL**
   - Clicca su **"Add"**
   - **Name**: `DATABASE_URL`
   - **Value**: Incolla la connection string di Supabase
   - **Environment**: Seleziona **Production** (e **Preview** se vuoi)
   - Clicca su **Save**

4. **Verifica altre variabili necessarie**
   - `CORS_ORIGINS`: URL del frontend Vercel
   - `FRONTEND_URL`: URL del frontend Vercel

## 🧪 Passo 3: Testare la Connessione

### Test Locale (Opzionale)

1. Crea un file `.env` in `backend/`:
   ```bash
   DATABASE_URL=postgresql://[la-tua-connection-string]
   ```

2. Testa la connessione:
   ```bash
   cd backend
   source venv/bin/activate
   python -c "from infrastructure.database import engine; from sqlalchemy import text; conn = engine.connect(); print('✅ Connessione riuscita!')"
   ```

## 📝 Note Importanti

### Connection Pooling vs Direct Connection

- **Connection Pooling** (consigliato per Vercel):
  - Porta: `6543`
  - URL contiene `pooler.supabase.com`
  - Gestisce automaticamente le connessioni per serverless

- **Direct Connection**:
  - Porta: `5432`
  - URL contiene `db.[PROJECT_REF].supabase.co`
  - Per connessioni persistenti (non ideale per serverless)

### Sicurezza

- ✅ **NON** committare mai la connection string nel repository
- ✅ Usa sempre variabili d'ambiente
- ✅ La password è già inclusa nella connection string
- ✅ Usa Connection Pooling per Vercel (più sicuro)

## 🚀 Dopo la Configurazione

1. **Redeploy su Vercel**
   - Vai su Deployments
   - Clicca sui tre puntini (...) → **Redeploy**
   - Questo applica le nuove variabili d'ambiente

2. **Verifica**
   - Controlla i logs su Vercel
   - Testa l'endpoint: `https://your-backend.vercel.app/api/health`
   - Prova a creare una stima e verifica che venga salvata

## 🔗 Link Utili

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Vercel Marketplace - Supabase](https://vercel.com/marketplace/supabase)
- [Supabase Docs - Database](https://supabase.com/docs/guides/database)
- [Supabase Docs - Vercel Integration](https://supabase.com/docs/guides/integrations/vercel-marketplace)

