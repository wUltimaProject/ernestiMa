"""
Domain entities per il calcolo UCP
"""
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum


class UseCaseComplexity(Enum):
    """Complessità dei casi d'uso"""
    SIMPLE = "simple"
    AVERAGE = "average"
    COMPLEX = "complex"


class ActorComplexity(Enum):
    """Complessità degli attori"""
    SIMPLE = "simple"
    AVERAGE = "average"
    COMPLEX = "complex"


@dataclass
class UseCase:
    """Entità caso d'uso"""
    id: str
    name: str
    description: str
    complexity: UseCaseComplexity

    @property
    def weight(self) -> int:
        """Peso del caso d'uso in base alla complessità"""
        weights = {
            UseCaseComplexity.SIMPLE: 5,
            UseCaseComplexity.AVERAGE: 10,
            UseCaseComplexity.COMPLEX: 15,
        }
        return weights[self.complexity]


@dataclass
class Actor:
    """Entità attore"""
    id: str
    name: str
    description: str
    complexity: ActorComplexity

    @property
    def weight(self) -> int:
        """Peso dell'attore in base alla complessità"""
        weights = {
            ActorComplexity.SIMPLE: 1,
            ActorComplexity.AVERAGE: 2,
            ActorComplexity.COMPLEX: 3,
        }
        return weights[self.complexity]


@dataclass
class TechnicalFactor:
    """Fattore tecnico per TCF"""
    code: str  # T1, T2, ..., T13
    name: str
    description: str
    weight: float
    perceived_complexity: int  # 0-5


@dataclass
class EnvironmentalFactor:
    """Fattore ambientale per ECF"""
    code: str  # E1, E2, ..., E8
    name: str
    description: str
    weight: float
    perceived_complexity: int  # 0-5


@dataclass
class UCPEstimation:
    """Risultato della stima UCP"""
    uucw: int  # Unadjusted Use Case Weight
    uaw: int  # Unadjusted Actor Weight
    uucp: int  # Unadjusted Use Case Points
    tcf: float  # Technical Complexity Factor
    ecf: float  # Environmental Complexity Factor
    ucp: float  # Use Case Points finale
    productivity_factor: float  # Ore per UCP
    estimated_hours: float  # Ore stimate totali
    estimated_days: float  # Giorni lavorativi stimati (8 ore/giorno)

