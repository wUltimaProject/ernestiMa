"""
Script per creare una stima fake nel database per test
"""
import sys
import os

# Aggiungi il path del backend al PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from infrastructure.database import SessionLocal, Base, engine
from infrastructure.repository import EstimationRepository
from domain.entities import (
    UseCase, Actor, TechnicalFactor, EnvironmentalFactor, UCPEstimation,
    UseCaseComplexity, ActorComplexity
)
import uuid

# Crea le tabelle se non esistono
Base.metadata.create_all(bind=engine)

def create_fake_estimation():
    """Crea una stima fake nel database"""
    db = SessionLocal()
    try:
        repository = EstimationRepository(db)
        
        # Crea casi d'uso fake
        use_cases = [
            UseCase(
                id=str(uuid.uuid4()),
                name="Login e Autenticazione",
                description="Sistema di login con username e password, recupero password",
                complexity=UseCaseComplexity.SIMPLE
            ),
            UseCase(
                id=str(uuid.uuid4()),
                name="Gestione Profilo Utente",
                description="Visualizzazione e modifica dati personali, cambio password",
                complexity=UseCaseComplexity.AVERAGE
            ),
            UseCase(
                id=str(uuid.uuid4()),
                name="Ricerca e Filtraggio Prodotti",
                description="Ricerca prodotti con filtri avanzati, ordinamento risultati",
                complexity=UseCaseComplexity.AVERAGE
            ),
            UseCase(
                id=str(uuid.uuid4()),
                name="Gestione Carrello",
                description="Aggiunta, rimozione prodotti, calcolo totale, checkout",
                complexity=UseCaseComplexity.COMPLEX
            ),
        ]
        
        # Crea attori fake
        actors = [
            Actor(
                id=str(uuid.uuid4()),
                name="Cliente",
                description="Utente finale che acquista prodotti",
                complexity=ActorComplexity.SIMPLE
            ),
            Actor(
                id=str(uuid.uuid4()),
                name="Amministratore",
                description="Gestisce il sistema e gli utenti",
                complexity=ActorComplexity.AVERAGE
            ),
            Actor(
                id=str(uuid.uuid4()),
                name="Sistema di Pagamento",
                description="API esterna per processare pagamenti",
                complexity=ActorComplexity.COMPLEX
            ),
        ]
        
        # Crea fattori tecnici fake (valori medi) - pesi standard UCP
        technical_factors = [
            TechnicalFactor(code="T1", name="Sistema Distribuito", description="", weight=2.0, perceived_complexity=3),
            TechnicalFactor(code="T2", name="Performance", description="", weight=1.0, perceived_complexity=2),
            TechnicalFactor(code="T3", name="Usabilità", description="", weight=1.0, perceived_complexity=3),
            TechnicalFactor(code="T4", name="Complessità Logica", description="", weight=1.0, perceived_complexity=2),
            TechnicalFactor(code="T5", name="Riusabilità", description="", weight=1.0, perceived_complexity=3),
            TechnicalFactor(code="T6", name="Installabilità", description="", weight=0.5, perceived_complexity=2),
            TechnicalFactor(code="T7", name="Facilità Operativa", description="", weight=0.5, perceived_complexity=2),
            TechnicalFactor(code="T8", name="Portabilità", description="", weight=2.0, perceived_complexity=2),
            TechnicalFactor(code="T9", name="Modificabilità", description="", weight=1.0, perceived_complexity=3),
            TechnicalFactor(code="T10", name="Concorrenza", description="", weight=1.0, perceived_complexity=2),
            TechnicalFactor(code="T11", name="Sicurezza", description="", weight=1.0, perceived_complexity=3),
            TechnicalFactor(code="T12", name="Accesso a Sistemi Esterni", description="", weight=1.0, perceived_complexity=3),
            TechnicalFactor(code="T13", name="Training", description="", weight=1.0, perceived_complexity=2),
        ]
        
        # Crea fattori ambientali fake (valori medi) - pesi standard UCP
        environmental_factors = [
            EnvironmentalFactor(code="E1", name="Familiarità Metodologia", description="", weight=1.5, perceived_complexity=3),
            EnvironmentalFactor(code="E2", name="Esperienza Applicazione", description="", weight=0.5, perceived_complexity=3),
            EnvironmentalFactor(code="E3", name="Esperienza OO", description="", weight=1.0, perceived_complexity=3),
            EnvironmentalFactor(code="E4", name="Capacità Analista", description="", weight=0.5, perceived_complexity=4),
            EnvironmentalFactor(code="E5", name="Motivazione Team", description="", weight=1.0, perceived_complexity=4),
            EnvironmentalFactor(code="E6", name="Stabilità Requisiti", description="", weight=2.0, perceived_complexity=3),
            EnvironmentalFactor(code="E7", name="Part-time Staff", description="", weight=-1.0, perceived_complexity=1),
            EnvironmentalFactor(code="E8", name="Difficoltà Linguaggio", description="", weight=2.0, perceived_complexity=1),
        ]
        
        # Calcola UCP
        from domain.ucp_calculator import UCPCalculator
        ucp_result = UCPCalculator.calculate_full_estimation(
            use_cases=use_cases,
            actors=actors,
            technical_factors=technical_factors,
            environmental_factors=environmental_factors,
            productivity_factor=20.0
        )
        
        # Salva la stima
        estimation = repository.create_estimation(
            project_description="E-commerce Platform - Sistema di vendita online con gestione prodotti, carrello e pagamenti",
            use_cases=use_cases,
            actors=actors,
            technical_factors=technical_factors,
            environmental_factors=environmental_factors,
            ucp_result=ucp_result
        )
        
        print(f"✓ Stima fake creata con successo!")
        print(f"  ID: {estimation.id}")
        print(f"  Descrizione: {estimation.project_description}")
        print(f"  UCP: {estimation.ucp:.2f}")
        print(f"  Giorni stimati: {estimation.estimated_days:.2f}")
        
    except Exception as e:
        print(f"Errore: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    create_fake_estimation()

