# Come Trovare la Connection String su Supabase

## Metodo 1: Dashboard Supabase (Manuale)

### Passo 1: Accedi al Progetto
1. Vai su https://supabase.com/dashboard
2. Clicca sul tuo progetto (quello che hai creato)

### Passo 2: Vai su Settings
1. Nel menu laterale sinistro, cerca l'icona **⚙️ Settings** (in basso)
2. Clicca su **Settings**

### Passo 3: Sezione Database
1. Nel menu di Settings, cerca **"Database"** o **"Connection string"**
2. Clicca su **"Database"**

### Passo 4: Trova Connection String
Nella pagina Database, dovresti vedere diverse sezioni:

**Opzione A: Se vedi "Connection string" o "Connection info"**
- Cerca una sezione chiamata "Connection string", "Connection info", o "Database URL"
- Dovresti vedere qualcosa tipo:
  ```
  postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
  ```

**Opzione B: Se vedi "Connection Pooling"**
- Cerca "Connection Pooling" o "Session mode"
- Clicca su "Connection Pooling"
- Dovresti vedere la connection string

**Opzione C: Se vedi "Connection Parameters"**
- Potresti vedere parametri separati (Host, Database, User, Password, Port)
- Dovrai costruire la connection string manualmente:
  ```
  postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
  ```

### Passo 5: Copia la Connection String
- Se vedi un pulsante "Copy" o un'icona di copia, cliccaci
- Oppure seleziona tutto il testo e copia (Cmd+C / Ctrl+C)

## Metodo 2: Sezione API (Alternativa)

1. Settings → **API**
2. Cerca "Database URL" o "Postgres Connection String"
3. Se non la trovi qui, torna a Settings → Database

## Metodo 3: Se Non Trovi Nulla

Se non trovi la connection string nella dashboard:

1. **Verifica che il progetto sia completamente creato**
   - Il progetto potrebbe essere ancora in fase di setup
   - Attendi qualche minuto e ricarica

2. **Cerca in altre sezioni**
   - Settings → **General** → potrebbe esserci "Database URL"
   - Settings → **Database** → cerca tutte le sottosezioni

3. **Usa l'integrazione Vercel**
   - Se hai già fatto l'integrazione Vercel-Supabase, le variabili potrebbero essere già su Vercel
   - Vai su Vercel → Settings → Environment Variables
   - Cerca `POSTGRES_URL` - potrebbe essere già lì!

## Costruire la Connection String Manualmente

Se trovi solo i parametri separati:

1. Vai su Settings → Database
2. Trova:
   - **Host**: tipo `db.xxxxx.supabase.co` o `aws-0-eu-central-1.pooler.supabase.com`
   - **Database**: di solito `postgres`
   - **User**: di solito `postgres`
   - **Password**: quella che hai scelto durante la creazione (`Pt4D6VgrELewD4E8`)
   - **Port**: `5432` (direct) o `6543` (pooling)

3. Costruisci la stringa:
   ```
   postgresql://postgres:Pt4D6VgrELewD4E8@[HOST]:[PORT]/postgres
   ```

   Per pooling (consigliato per Vercel):
   ```
   postgresql://postgres.[PROJECT_REF]:Pt4D6VgrELewD4E8@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

## Nota Importante

Se hai fatto l'integrazione Vercel-Supabase, la connection string potrebbe essere già disponibile su Vercel come `POSTGRES_URL` nelle variabili d'ambiente, anche se non la vedi nella lista (potrebbe essere nascosta o sincronizzata automaticamente).

