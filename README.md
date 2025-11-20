# ErnestiMa

Web application per la stima di progetti software utilizzando il metodo **Use Case Points (UCP)**.

**ErnestiMa** è un gioco di parole tra "Ernesta" (nome di donna) e "stima", perché l'app aiuta a stimare progetti software in modo preciso e professionale.

## Stack Tecnologico

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python + FastAPI + SQLAlchemy
- **Database**: PostgreSQL (locale)
- **Architettura**: Clean Architecture

## Struttura Progetto

```
stime_uucp/
├── frontend/          # React application
│   ├── src/
│   │   ├── domain/    # Business logic, entities
│   │   ├── application/ # Use cases
│   │   ├── infrastructure/ # API clients, storage
│   │   └── presentation/ # UI components, pages
├── backend/          # FastAPI application
│   ├── domain/        # Entities, business logic
│   ├── application/   # Use cases, services
│   ├── infrastructure/ # Database, repositories
│   └── presentation/  # API routes, controllers
├── database/          # Database migrations, scripts
└── docs/              # Documentation
```

## Metodologia UCP

Il metodo Use Case Points (UCP) calcola la stima di un progetto software basandosi su:

1. **UUCP** (Unadjusted Use Case Points) = UUCW + UAW
2. **TCF** (Technical Complexity Factor)
3. **ECF** (Environmental Complexity Factor)
4. **UCP Finale** = UUCP × TCF × ECF

## Setup

### Prerequisiti
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+ (opzionale per ora, l'app funziona anche senza database)

### Installazione

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # su Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Avvio

```bash
# Frontend (terminale 1)
cd frontend
npm run dev
# L'app sarà disponibile su http://localhost:3002

# Backend (terminale 2) - Opzionale per ora
cd backend
uvicorn main:app --reload
# L'API sarà disponibile su http://localhost:8000
```

## Funzionalità Implementate

✅ Calcolo UCP completo (UUCP, TCF, ECF)
✅ Questionario guidato con domande in linguaggio non tecnico
✅ Carousel interattivo per la raccolta dati
✅ Schermata risultati con dettagli della stima
✅ Export risultati in formato TXT

## Prossimi Sviluppi

- [ ] Integrazione database PostgreSQL
- [ ] Salvataggio storico stime
- [ ] Training modello AI per migliorare le stime
- [ ] Import stime da Excel

## Sviluppo

Il progetto segue il workflow Git:
- `develop`: branch principale di sviluppo
- `feature/*`: nuove funzionalità
- Ogni modifica parte da `develop`

