# ErnestiMa

Web application for software project estimation using the **Use Case Points (UCP)** method.

**ErnestiMa** is a wordplay between "Ernesta" (a woman's name) and "stima" (estimation), because the app helps estimate software projects accurately and professionally.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python + FastAPI + SQLAlchemy
- **Database**: PostgreSQL (local)
- **Architecture**: Clean Architecture

## Project Structure

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

## UCP Methodology

The Use Case Points (UCP) method calculates software project estimation based on:

1. **UUCP** (Unadjusted Use Case Points) = UUCW + UAW
2. **TCF** (Technical Complexity Factor)
3. **ECF** (Environmental Complexity Factor)
4. **Final UCP** = UUCP × TCF × ECF

## Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+ (optional for now, the app works without database)

### Installation

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running

```bash
# Frontend (terminal 1)
cd frontend
npm run dev
# The app will be available at http://localhost:3002

# Backend (terminal 2) - Optional for now
cd backend
uvicorn main:app --reload
# The API will be available at http://localhost:8000
```

## Implemented Features

✅ Complete UCP calculation (UUCP, TCF, ECF)
✅ Guided questionnaire with non-technical language questions
✅ Interactive carousel for data collection
✅ Results screen with estimation details
✅ Export results to TXT format

## Next Steps

- [ ] PostgreSQL database integration
- [ ] Historical estimates saving
- [ ] AI model training to improve estimates
- [ ] Import estimates from Excel

## Development

The project follows Git workflow:
- `develop`: main development branch
- `feature/*`: new features
- Every change starts from `develop`

### Local Development

Use the provided scripts to start everything:

```bash
# Start everything (frontend + backend)
./start.sh

# Stop everything
./stop.sh
```

Or manually:

```bash
# Frontend (terminal 1)
cd frontend
npm run dev

# Backend (terminal 2)
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

## Deployment

The application is configured for full deployment on Vercel with cloud database.

### Quick Deploy

1. **Setup Database**: Create a PostgreSQL database on Supabase, Neon, or Railway
2. **Deploy Backend**: Deploy `backend/` folder as a separate Vercel project
3. **Deploy Frontend**: Deploy `frontend/` folder as a Vercel project
4. **Configure Environment Variables**: Set `DATABASE_URL`, `CORS_ORIGINS`, and `VITE_API_URL`

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Environment Variables

**Backend** (set in Vercel):
- `DATABASE_URL`: PostgreSQL connection string
- `CORS_ORIGINS`: Comma-separated allowed origins
- `FRONTEND_URL`: Frontend Vercel URL

**Frontend** (set in Vercel):
- `VITE_API_URL`: Backend API URL (e.g., `https://your-backend.vercel.app/api`)

See `backend/env.example` and `frontend/env.example` for reference.

