"""
Logica di business per il calcolo UCP
"""
from typing import List
from .entities import (
    UseCase,
    Actor,
    TechnicalFactor,
    EnvironmentalFactor,
    UCPEstimation,
)


class UCPCalculator:
    """Calcolatore Use Case Points"""

    @staticmethod
    def calculate_uucw(use_cases: List[UseCase]) -> int:
        """
        Calcola Unadjusted Use Case Weight (UUCW)
        Somma dei pesi di tutti i casi d'uso
        """
        return sum(uc.weight for uc in use_cases)

    @staticmethod
    def calculate_uaw(actors: List[Actor]) -> int:
        """
        Calcola Unadjusted Actor Weight (UAW)
        Somma dei pesi di tutti gli attori
        """
        return sum(actor.weight for actor in actors)

    @staticmethod
    def calculate_uucp(uucw: int, uaw: int) -> int:
        """
        Calcola Unadjusted Use Case Points (UUCP)
        UUCP = UUCW + UAW
        """
        return uucw + uaw

    @staticmethod
    def calculate_tcf(technical_factors: List[TechnicalFactor]) -> float:
        """
        Calcola Technical Complexity Factor (TCF)
        TCF = 0.6 + (0.01 * somma dei fattori ponderati)
        """
        total_weighted_sum = sum(
            factor.weight * factor.perceived_complexity
            for factor in technical_factors
        )
        return 0.6 + (0.01 * total_weighted_sum)

    @staticmethod
    def calculate_ecf(environmental_factors: List[EnvironmentalFactor]) -> float:
        """
        Calcola Environmental Complexity Factor (ECF)
        ECF = 1.4 + (-0.03 * somma dei fattori ponderati)
        """
        total_weighted_sum = sum(
            factor.weight * factor.perceived_complexity
            for factor in environmental_factors
        )
        return 1.4 + (-0.03 * total_weighted_sum)

    @staticmethod
    def calculate_ucp(
        uucp: int,
        tcf: float,
        ecf: float,
        productivity_factor: float = 20.0,
    ) -> UCPEstimation:
        """
        Calcola Use Case Points finale e stima in ore/giorni
        UCP = UUCP × TCF × ECF
        """
        ucp_final = uucp * tcf * ecf
        estimated_hours = ucp_final * productivity_factor
        estimated_days = estimated_hours / 8.0  # 8 ore per giorno lavorativo

        return UCPEstimation(
            uucw=0,  # Sarà calcolato separatamente
            uaw=0,  # Sarà calcolato separatamente
            uucp=uucp,
            tcf=tcf,
            ecf=ecf,
            ucp=ucp_final,
            productivity_factor=productivity_factor,
            estimated_hours=estimated_hours,
            estimated_days=estimated_days,
        )

    @classmethod
    def calculate_full_estimation(
        cls,
        use_cases: List[UseCase],
        actors: List[Actor],
        technical_factors: List[TechnicalFactor],
        environmental_factors: List[EnvironmentalFactor],
        productivity_factor: float = 20.0,
    ) -> UCPEstimation:
        """
        Calcola la stima UCP completa
        """
        uucw = cls.calculate_uucw(use_cases)
        uaw = cls.calculate_uaw(actors)
        uucp = cls.calculate_uucp(uucw, uaw)
        tcf = cls.calculate_tcf(technical_factors)
        ecf = cls.calculate_ecf(environmental_factors)

        estimation = cls.calculate_ucp(uucp, tcf, ecf, productivity_factor)
        estimation.uucw = uucw
        estimation.uaw = uaw

        return estimation

