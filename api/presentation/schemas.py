"""
Pydantic schemas for API requests and responses
"""
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class UseCaseSchema(BaseModel):
    id: str
    name: str
    description: str
    complexity: str


class ActorSchema(BaseModel):
    id: str
    name: str
    description: str
    complexity: str


class TechnicalFactorSchema(BaseModel):
    code: str
    name: str
    description: str
    weight: float
    perceived_complexity: int


class EnvironmentalFactorSchema(BaseModel):
    code: str
    name: str
    description: str
    weight: float
    perceived_complexity: int


class UCPResultSchema(BaseModel):
    uucw: int
    uaw: int
    uucp: int
    tcf: float
    ecf: float
    ucp: float
    productivity_factor: float
    estimated_hours: float
    estimated_days: float


class EstimationCreateRequest(BaseModel):
    project_description: str
    use_cases: List[UseCaseSchema]
    actors: List[ActorSchema]
    technical_factors: List[TechnicalFactorSchema]
    environmental_factors: List[EnvironmentalFactorSchema]
    ucp_result: UCPResultSchema


class EstimationListItem(BaseModel):
    id: int
    project_description: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class EstimationDetail(BaseModel):
    id: int
    project_description: str
    created_at: datetime
    use_cases: List[dict]
    actors: List[dict]
    technical_factors: List[dict]
    environmental_factors: List[dict]
    uucw: int
    uaw: int
    uucp: int
    tcf: float
    ecf: float
    ucp: float
    productivity_factor: float
    estimated_hours: float
    estimated_days: float
    
    class Config:
        from_attributes = True

