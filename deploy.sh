#!/bin/bash

# Script automatico per deploy completo su Vercel
# Questo script automatizza il deploy di frontend, backend e configurazione

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploy Automatico ErnestiMa su Vercel${NC}"
echo ""

# Verifica Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI non trovato. Installazione...${NC}"
    npm install -g vercel
fi

# Verifica login
echo -e "${YELLOW}Verifica login Vercel...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Non sei loggato su Vercel${NC}"
    echo -e "${YELLOW}Eseguendo login...${NC}"
    vercel login
fi

echo -e "${GREEN}✓ Loggato su Vercel${NC}"
echo ""

# Chiedi informazioni database
echo -e "${YELLOW}📊 Configurazione Database${NC}"
echo "Hai già un database PostgreSQL cloud? (Supabase/Neon/Railway)"
read -p "Inserisci DATABASE_URL (o premi Enter per saltare): " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  Nessun database configurato. Creeremo un database SQLite locale per ora.${NC}"
    echo -e "${YELLOW}   Per produzione, configura un database PostgreSQL cloud.${NC}"
    DATABASE_URL="sqlite:///./ucp_estimation.db"
fi

# Deploy Backend
echo ""
echo -e "${GREEN}📦 Deploy Backend...${NC}"
cd backend

# Crea .vercelignore se non esiste
if [ ! -f ".vercelignore" ]; then
    cat > .vercelignore << EOF
venv/
__pycache__/
*.pyc
*.db
*.sqlite
.env
*.log
EOF
fi

# Deploy backend
echo "Eseguendo deploy backend..."
vercel --prod --yes

# Ottieni URL backend
BACKEND_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "")
if [ -z "$BACKEND_URL" ]; then
    BACKEND_URL=$(vercel inspect --json | jq -r '.url' 2>/dev/null || echo "")
fi

if [ -n "$BACKEND_URL" ]; then
    BACKEND_URL="https://${BACKEND_URL}"
    echo -e "${GREEN}✓ Backend deployato: ${BACKEND_URL}${NC}"
else
    echo -e "${YELLOW}⚠️  Impossibile ottenere URL backend. Controlla manualmente su Vercel Dashboard${NC}"
    read -p "Inserisci URL backend Vercel: " BACKEND_URL
fi

# Configura variabili ambiente backend
echo "Configurando variabili ambiente backend..."
vercel env add DATABASE_URL production <<< "$DATABASE_URL" 2>/dev/null || \
    vercel env rm DATABASE_URL production --yes 2>/dev/null; \
    vercel env add DATABASE_URL production <<< "$DATABASE_URL"

cd ..

# Deploy Frontend
echo ""
echo -e "${GREEN}🎨 Deploy Frontend...${NC}"
cd frontend

# Configura variabile ambiente frontend
FRONTEND_API_URL="${BACKEND_URL}/api"
echo "Configurando VITE_API_URL: $FRONTEND_API_URL"
vercel env add VITE_API_URL production <<< "$FRONTEND_API_URL" 2>/dev/null || \
    vercel env rm VITE_API_URL production --yes 2>/dev/null; \
    vercel env add VITE_API_URL production <<< "$FRONTEND_API_URL"

# Deploy frontend
echo "Eseguendo deploy frontend..."
vercel --prod --yes

# Ottieni URL frontend
FRONTEND_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "")
if [ -z "$FRONTEND_URL" ]; then
    FRONTEND_URL=$(vercel inspect --json | jq -r '.url' 2>/dev/null || echo "")
fi

if [ -n "$FRONTEND_URL" ]; then
    FRONTEND_URL="https://${FRONTEND_URL}"
    echo -e "${GREEN}✓ Frontend deployato: ${FRONTEND_URL}${NC}"
else
    echo -e "${YELLOW}⚠️  Impossibile ottenere URL frontend. Controlla manualmente su Vercel Dashboard${NC}"
    read -p "Inserisci URL frontend Vercel: " FRONTEND_URL
fi

cd ..

# Aggiorna CORS backend
echo ""
echo -e "${GREEN}🔧 Configurazione CORS...${NC}"
cd backend
vercel env add CORS_ORIGINS production <<< "$FRONTEND_URL" 2>/dev/null || \
    vercel env rm CORS_ORIGINS production --yes 2>/dev/null; \
    vercel env add CORS_ORIGINS production <<< "$FRONTEND_URL"

vercel env add FRONTEND_URL production <<< "$FRONTEND_URL" 2>/dev/null || \
    vercel env rm FRONTEND_URL production --yes 2>/dev/null; \
    vercel env add FRONTEND_URL production <<< "$FRONTEND_URL"

cd ..

echo ""
echo -e "${GREEN}✅ Deploy Completato!${NC}"
echo ""
echo "📍 Frontend: $FRONTEND_URL"
echo "📍 Backend:  $BACKEND_URL"
echo "📍 API Docs: $BACKEND_URL/docs"
echo ""
echo -e "${YELLOW}⚠️  Nota: Se hai usato SQLite, configura un database PostgreSQL cloud${NC}"
echo -e "${YELLOW}   e aggiorna DATABASE_URL su Vercel Dashboard${NC}"

