# Prossimi Passi - Deploy ErnestiMa

## ✅ Cosa hai già fatto

1. ✅ Creato database Supabase
2. ✅ Configurato integrazione Supabase su Vercel
3. ✅ Database collegato a Vercel

## 🚀 Prossimi Passi

### 1. Verifica Variabili d'Ambiente su Vercel

1. Vai su **Vercel Dashboard** → Il tuo progetto backend
2. **Settings** → **Environment Variables**
3. Verifica che ci siano queste variabili (create automaticamente dall'integrazione):
   - ✅ `POSTGRES_URL` (connection string con pooling)
   - ✅ `POSTGRES_PRISMA_URL`
   - ✅ `POSTGRES_URL_NON_POOLING`
   - ✅ `POSTGRES_USER`
   - ✅ `POSTGRES_PASSWORD`
   - ✅ `POSTGRES_DATABASE`
   - ✅ `POSTGRES_HOST`

### 2. Configura CORS (se non già fatto)

1. Vai su **Vercel Dashboard** → Il tuo progetto backend
2. **Settings** → **Environment Variables**
3. Aggiungi (se non presenti):
   - **Name**: `CORS_ORIGINS`
   - **Value**: `https://[URL-FRONTEND-VERCEL]` (senza trailing slash)
   - **Environment**: Production (e Preview se vuoi)
   
   Esempio: `https://ernestima-frontend.vercel.app`

4. Aggiungi anche:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://[URL-FRONTEND-VERCEL]` (senza trailing slash)
   - **Environment**: Production

### 3. Deploy Backend su Vercel

**Opzione A: Se il backend non è ancora deployato**

1. Vai su https://vercel.com/new
2. Importa repository `wUltimaProject/ernestiMa`
3. **Root Directory**: `backend`
4. **Framework Preset**: Other
5. Clicca **Deploy**

**Opzione B: Se il backend è già deployato**

1. Vai su **Vercel Dashboard** → Il tuo progetto backend
2. **Deployments**
3. Clicca sui tre puntini (...) dell'ultimo deployment
4. **Redeploy** (per applicare le nuove variabili d'ambiente)

### 4. Configura Frontend

1. Vai su **Vercel Dashboard** → Il tuo progetto frontend
2. **Settings** → **Environment Variables**
3. Aggiungi:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://[URL-BACKEND-VERCEL]/api`
   - **Environment**: Production (e Preview)
   
   Esempio: `https://ernestima-backend.vercel.app/api`

4. **Deployments** → **Redeploy** del frontend

### 5. Verifica che Funzioni

1. **Test Backend**:
   - Vai su `https://[URL-BACKEND]/api/health`
   - Dovrebbe rispondere: `{"status":"healthy"}`

2. **Test Database**:
   - Vai su `https://[URL-BACKEND]/api/estimations/`
   - Dovrebbe rispondere: `[]` (lista vuota, nessuna stima ancora)

3. **Test Frontend**:
   - Vai su `https://[URL-FRONTEND]`
   - Dovrebbe caricare l'app
   - Clicca su "Vedi Storico Stime" → dovrebbe essere vuoto
   - Crea una nuova stima → dovrebbe salvarsi nel database

## 🐛 Troubleshooting

### Backend non si connette al database

- Verifica che `POSTGRES_URL` sia presente nelle variabili d'ambiente
- Controlla i logs su Vercel Dashboard → Deployments → Logs
- Verifica che la connection string sia corretta

### CORS errors

- Verifica che `CORS_ORIGINS` includa l'URL del frontend
- Assicurati che non ci sia trailing slash (`/`) alla fine
- Controlla che `FRONTEND_URL` sia configurato

### Frontend non chiama il backend

- Verifica che `VITE_API_URL` sia configurato correttamente
- Controlla la console del browser per errori
- Verifica che l'URL del backend sia corretto

## 📝 Note

- Il backend usa automaticamente `POSTGRES_URL` se disponibile (dall'integrazione Vercel)
- Se `POSTGRES_URL` non è disponibile, usa `DATABASE_URL` (per configurazione manuale)
- Se nessuna delle due è disponibile, usa SQLite locale (solo per sviluppo)

## ✅ Checklist Finale

- [ ] Variabili d'ambiente backend configurate
- [ ] CORS configurato
- [ ] Backend deployato su Vercel
- [ ] Frontend configurato con `VITE_API_URL`
- [ ] Frontend deployato su Vercel
- [ ] Test backend: `/api/health` funziona
- [ ] Test database: `/api/estimations/` funziona
- [ ] Test frontend: app carica correttamente
- [ ] Test completo: creare una stima e verificare che si salvi

