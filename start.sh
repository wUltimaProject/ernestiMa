#!/bin/bash

# Script per avviare tutta l'applicazione ErnestiMa

echo "🚀 Avvio ErnestiMa..."

# Colori per output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funzione per verificare se una porta è in uso
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Funzione per killare un processo su una porta
kill_port() {
    if check_port $1; then
        echo -e "${YELLOW}⚠️  Porta $1 già in uso, termino processo esistente...${NC}"
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Verifica e termina processi esistenti
echo -e "${YELLOW}Verifica porte...${NC}"
kill_port 3002
kill_port 8000

# Avvia Backend
echo -e "${GREEN}📦 Avvio Backend...${NC}"
cd backend

# Crea venv se non esiste
if [ ! -d "venv" ]; then
    echo "Creazione virtual environment..."
    python3 -m venv venv
fi

# Attiva venv e installa dipendenze se necessario
source venv/bin/activate

# Verifica se le dipendenze sono installate
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Installazione dipendenze backend..."
    pip install -q -r requirements.txt
fi

# Inizializza database se non esiste
if [ ! -f "ucp_estimation.db" ]; then
    echo "Inizializzazione database..."
    python -c "from infrastructure.database import Base, engine; Base.metadata.create_all(bind=engine)"
fi

# Avvia backend in background
uvicorn main:app --reload --host 0.0.0.0 --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend avviato (PID: $BACKEND_PID) su http://localhost:8000"

cd ..

# Attendi che il backend sia pronto
echo "Attendo che il backend sia pronto..."
for i in {1..10}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend pronto!${NC}"
        break
    fi
    sleep 1
done

# Avvia Frontend
echo -e "${GREEN}🎨 Avvio Frontend...${NC}"
cd frontend

# Installa dipendenze se necessario
if [ ! -d "node_modules" ]; then
    echo "Installazione dipendenze frontend..."
    npm install
fi

# Avvia frontend in background
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend avviato (PID: $FRONTEND_PID) su http://localhost:3002"

cd ..

echo ""
echo -e "${GREEN}✅ ErnestiMa è in esecuzione!${NC}"
echo ""
echo "📍 Frontend: http://localhost:3002"
echo "📍 Backend:  http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "Per fermare l'applicazione, usa: ./stop.sh"
echo "Oppure premi Ctrl+C e poi esegui: ./stop.sh"
echo ""

# Mantieni lo script in esecuzione
wait

