"""
Repository for database operations
"""
import logging
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from infrastructure.models import Estimation
from domain.entities import (
    UseCase, Actor, TechnicalFactor, EnvironmentalFactor, UCPEstimation
)
from datetime import datetime

logger = logging.getLogger(__name__)


class EstimationRepository:
    """Repository for estimation operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_estimation(
        self,
        project_description: str,
        use_cases: List[UseCase],
        actors: List[Actor],
        technical_factors: List[TechnicalFactor],
        environmental_factors: List[EnvironmentalFactor],
        ucp_result: UCPEstimation
    ) -> Estimation:
        """Save a new estimation to database"""
        
        # Convert domain entities to dict for JSON storage
        use_cases_data = [
            {
                "id": uc.id,
                "name": uc.name,
                "description": uc.description,
                "complexity": uc.complexity.value
            }
            for uc in use_cases
        ]
        
        actors_data = [
            {
                "id": actor.id,
                "name": actor.name,
                "description": actor.description,
                "complexity": actor.complexity.value
            }
            for actor in actors
        ]
        
        technical_factors_data = [
            {
                "code": tf.code,
                "name": tf.name,
                "description": tf.description,
                "weight": tf.weight,
                "perceived_complexity": tf.perceived_complexity
            }
            for tf in technical_factors
        ]
        
        environmental_factors_data = [
            {
                "code": ef.code,
                "name": ef.name,
                "description": ef.description,
                "weight": ef.weight,
                "perceived_complexity": ef.perceived_complexity
            }
            for ef in environmental_factors
        ]
        
        estimation = Estimation(
            project_description=project_description,
            use_cases=use_cases_data,
            actors=actors_data,
            technical_factors=technical_factors_data,
            environmental_factors=environmental_factors_data,
            uucw=ucp_result.uucw,
            uaw=ucp_result.uaw,
            uucp=ucp_result.uucp,
            tcf=ucp_result.tcf,
            ecf=ucp_result.ecf,
            ucp=ucp_result.ucp,
            productivity_factor=ucp_result.productivity_factor,
            estimated_hours=ucp_result.estimated_hours,
            estimated_days=ucp_result.estimated_days
        )
        
        self.db.add(estimation)
        self.db.commit()
        self.db.refresh(estimation)
        return estimation
    
    def get_all_estimations(self) -> List[Estimation]:
        """Get all estimations ordered by creation date (newest first)"""
        try:
            logger.info("Querying database for all estimations...")
            estimations = self.db.query(Estimation).order_by(Estimation.created_at.desc()).all()
            logger.info(f"Successfully retrieved {len(estimations)} estimations from database")
            return estimations
        except SQLAlchemyError as e:
            logger.error(f"Database error while getting estimations: {e}", exc_info=True)
            raise
        except Exception as e:
            logger.error(f"Unexpected error while getting estimations: {e}", exc_info=True)
            raise
    
    def get_estimation_by_id(self, estimation_id: int) -> Optional[Estimation]:
        """Get a specific estimation by ID"""
        return self.db.query(Estimation).filter(Estimation.id == estimation_id).first()
    
    def delete_estimation(self, estimation_id: int) -> bool:
        """Delete an estimation by ID"""
        estimation = self.get_estimation_by_id(estimation_id)
        if estimation:
            self.db.delete(estimation)
            self.db.commit()
            return True
        return False

