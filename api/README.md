# ErnestiMa Backend

Backend API for software project estimation using the Use Case Points (UCP) method.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure the database:
- Create a PostgreSQL database named `ucp_estimation`
- Copy `.env.example` to `.env` and configure `DATABASE_URL`

4. Start the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, interactive documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

