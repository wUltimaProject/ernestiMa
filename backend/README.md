# Ernestima Backend

Backend API per la stima di progetti software utilizzando il metodo Use Case Points (UCP).

## Setup

1. Crea un virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # su Windows: venv\Scripts\activate
```

2. Installa le dipendenze:
```bash
pip install -r requirements.txt
```

3. Configura il database:
- Crea un database PostgreSQL chiamato `ucp_estimation`
- Copia `.env.example` in `.env` e configura `DATABASE_URL`

4. Avvia il server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

L'API sarà disponibile su `http://localhost:8000`

## Documentazione API

Una volta avviato il server, la documentazione interattiva è disponibile su:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

