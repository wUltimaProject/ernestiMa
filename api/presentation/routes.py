"""
API routes for estimations
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from infrastructure.database import get_db
from infrastructure.repository import EstimationRepository
from presentation.schemas import (
    EstimationCreateRequest,
    EstimationListItem,
    EstimationDetail
)
from domain.entities import (
    UseCase, Actor, TechnicalFactor, EnvironmentalFactor,
    UseCaseComplexity, ActorComplexity, UCPEstimation
)

router = APIRouter(prefix="/estimations", tags=["estimations"])


@router.post("/", response_model=EstimationListItem)
async def create_estimation(
    request: EstimationCreateRequest,
    db: Session = Depends(get_db)
):
    """Save a new estimation"""
    repository = EstimationRepository(db)
    
    # Convert schemas to domain entities
    use_cases = [
        UseCase(
            id=uc.id,
            name=uc.name,
            description=uc.description,
            complexity=UseCaseComplexity(uc.complexity)
        )
        for uc in request.use_cases
    ]
    
    actors = [
        Actor(
            id=actor.id,
            name=actor.name,
            description=actor.description,
            complexity=ActorComplexity(actor.complexity)
        )
        for actor in request.actors
    ]
    
    technical_factors = [
        TechnicalFactor(
            code=tf.code,
            name=tf.name,
            description=tf.description,
            weight=tf.weight,
            perceived_complexity=tf.perceived_complexity
        )
        for tf in request.technical_factors
    ]
    
    environmental_factors = [
        EnvironmentalFactor(
            code=ef.code,
            name=ef.name,
            description=ef.description,
            weight=ef.weight,
            perceived_complexity=ef.perceived_complexity
        )
        for ef in request.environmental_factors
    ]
    
    ucp_result = UCPEstimation(
        uucw=request.ucp_result.uucw,
        uaw=request.ucp_result.uaw,
        uucp=request.ucp_result.uucp,
        tcf=request.ucp_result.tcf,
        ecf=request.ucp_result.ecf,
        ucp=request.ucp_result.ucp,
        productivity_factor=request.ucp_result.productivity_factor,
        estimated_hours=request.ucp_result.estimated_hours,
        estimated_days=request.ucp_result.estimated_days
    )
    
    estimation = repository.create_estimation(
        project_description=request.project_description,
        use_cases=use_cases,
        actors=actors,
        technical_factors=technical_factors,
        environmental_factors=environmental_factors,
        ucp_result=ucp_result
    )
    
    return EstimationListItem(
        id=estimation.id,
        project_description=estimation.project_description,
        created_at=estimation.created_at
    )


@router.get("/", response_model=List[EstimationListItem])
async def get_all_estimations(db: Session = Depends(get_db)):
    """Get all estimations"""
    repository = EstimationRepository(db)
    estimations = repository.get_all_estimations()
    
    return [
        EstimationListItem(
            id=est.id,
            project_description=est.project_description,
            created_at=est.created_at
        )
        for est in estimations
    ]


@router.get("/{estimation_id}", response_model=EstimationDetail)
async def get_estimation(
    estimation_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific estimation by ID"""
    repository = EstimationRepository(db)
    estimation = repository.get_estimation_by_id(estimation_id)
    
    if not estimation:
        raise HTTPException(status_code=404, detail="Estimation not found")
    
    return EstimationDetail(
        id=estimation.id,
        project_description=estimation.project_description,
        created_at=estimation.created_at,
        use_cases=estimation.use_cases,
        actors=estimation.actors,
        technical_factors=estimation.technical_factors,
        environmental_factors=estimation.environmental_factors,
        uucw=estimation.uucw,
        uaw=estimation.uaw,
        uucp=estimation.uucp,
        tcf=estimation.tcf,
        ecf=estimation.ecf,
        ucp=estimation.ucp,
        productivity_factor=estimation.productivity_factor,
        estimated_hours=estimation.estimated_hours,
        estimated_days=estimation.estimated_days
    )


@router.delete("/{estimation_id}")
async def delete_estimation(
    estimation_id: int,
    db: Session = Depends(get_db)
):
    """Delete an estimation"""
    repository = EstimationRepository(db)
    success = repository.delete_estimation(estimation_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Estimation not found")
    
    return {"message": "Estimation deleted successfully"}

