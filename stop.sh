#!/bin/bash

# Script per fermare tutta l'applicazione ErnestiMa

echo "🛑 Arresto ErnestiMa..."

# Colori
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Funzione per killare un processo su una porta
kill_port() {
    PORT=$1
    if lsof -ti:$PORT > /dev/null 2>&1; then
        echo -e "${RED}Termino processo sulla porta $PORT...${NC}"
        lsof -ti:$PORT | xargs kill -9 2>/dev/null
        sleep 1
        echo -e "${GREEN}✓ Porta $PORT liberata${NC}"
    else
        echo "Porta $PORT già libera"
    fi
}

# Termina frontend
kill_port 3002

# Termina backend
kill_port 8000

echo ""
echo -e "${GREEN}✅ ErnestiMa fermato${NC}"

