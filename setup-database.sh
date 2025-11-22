#!/bin/bash

# Script per creare automaticamente un database PostgreSQL cloud
# Supporta Supabase, Neon e Railway

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}📊 Setup Database Cloud per ErnestiMa${NC}"
echo ""

echo "Scegli un provider:"
echo "1) Supabase (Consigliato - Gratuito)"
echo "2) Neon (Gratuito)"
echo "3) Railway (Gratuito con limiti)"
echo "4) Ho già un database (inserisci URL)"
read -p "Scelta [1-4]: " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}📘 Setup Supabase${NC}"
        echo "1. Vai su https://supabase.com"
        echo "2. Crea un account (se non ce l'hai)"
        echo "3. Crea un nuovo progetto"
        echo "4. Vai su Settings → Database"
        echo "5. Copia la Connection String"
        echo ""
        read -p "Incolla la Connection String: " DATABASE_URL
        ;;
    2)
        echo ""
        echo -e "${BLUE}📘 Setup Neon${NC}"
        echo "1. Vai su https://neon.tech"
        echo "2. Crea un account (se non ce l'hai)"
        echo "3. Crea un nuovo progetto"
        echo "4. Copia la Connection String"
        echo ""
        read -p "Incolla la Connection String: " DATABASE_URL
        ;;
    3)
        echo ""
        echo -e "${BLUE}📘 Setup Railway${NC}"
        echo "1. Vai su https://railway.app"
        echo "2. Crea un account (se non ce l'hai)"
        echo "3. Crea un nuovo progetto → Add PostgreSQL"
        echo "4. Vai su Variables → DATABASE_URL"
        echo "5. Copia la Connection String"
        echo ""
        read -p "Incolla la Connection String: " DATABASE_URL
        ;;
    4)
        read -p "Inserisci DATABASE_URL: " DATABASE_URL
        ;;
    *)
        echo -e "${YELLOW}Scelta non valida${NC}"
        exit 1
        ;;
esac

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  DATABASE_URL non fornito${NC}"
    exit 1
fi

# Test connessione
echo ""
echo -e "${YELLOW}Test connessione database...${NC}"
cd backend
source venv/bin/activate 2>/dev/null || python3 -m venv venv && source venv/bin/activate
pip install -q psycopg2-binary sqlalchemy python-dotenv

python3 << EOF
import os
from sqlalchemy import create_engine, text

DATABASE_URL = "$DATABASE_URL"
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("✅ Connessione database riuscita!")
except Exception as e:
    print(f"❌ Errore connessione: {e}")
    exit(1)
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database configurato correttamente!${NC}"
    echo ""
    echo "Salva questa variabile per il deploy:"
    echo -e "${BLUE}DATABASE_URL=$DATABASE_URL${NC}"
    echo ""
    echo "Puoi usarla con: ./deploy.sh"
else
    echo -e "${YELLOW}⚠️  Verifica la connection string${NC}"
fi

cd ..

