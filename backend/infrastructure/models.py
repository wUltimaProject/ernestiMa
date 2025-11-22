"""
SQLAlchemy models for database tables
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from infrastructure.database import Base


class Estimation(Base):
    """Model for storing historical UCP estimations"""
    __tablename__ = "estimations"

    id = Column(Integer, primary_key=True, index=True)
    project_description = Column(String(500), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    # Use Cases data (stored as JSON)
    use_cases = Column(JSON, nullable=False)
    
    # Actors data (stored as JSON)
    actors = Column(JSON, nullable=False)
    
    # Technical Factors data (stored as JSON)
    technical_factors = Column(JSON, nullable=False)
    
    # Environmental Factors data (stored as JSON)
    environmental_factors = Column(JSON, nullable=False)
    
    # UCP Calculation results
    uucw = Column(Integer, nullable=False)
    uaw = Column(Integer, nullable=False)
    uucp = Column(Integer, nullable=False)
    tcf = Column(Float, nullable=False)
    ecf = Column(Float, nullable=False)
    ucp = Column(Float, nullable=False)
    productivity_factor = Column(Float, nullable=False)
    estimated_hours = Column(Float, nullable=False)
    estimated_days = Column(Float, nullable=False)

