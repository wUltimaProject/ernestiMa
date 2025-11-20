/**
 * Calcolatore UCP lato frontend
 */
import {
  UseCase,
  Actor,
  TechnicalFactor,
  EnvironmentalFactor,
  UCPEstimation,
  UseCaseComplexity,
  ActorComplexity,
} from "./types";

const USE_CASE_WEIGHTS = {
  [UseCaseComplexity.SIMPLE]: 5,
  [UseCaseComplexity.AVERAGE]: 10,
  [UseCaseComplexity.COMPLEX]: 15,
};

const ACTOR_WEIGHTS = {
  [ActorComplexity.SIMPLE]: 1,
  [ActorComplexity.AVERAGE]: 2,
  [ActorComplexity.COMPLEX]: 3,
};

export class UCPCalculator {
  static calculateUUCW(useCases: UseCase[]): number {
    return useCases.reduce(
      (sum, uc) => sum + USE_CASE_WEIGHTS[uc.complexity],
      0
    );
  }

  static calculateUAW(actors: Actor[]): number {
    return actors.reduce(
      (sum, actor) => sum + ACTOR_WEIGHTS[actor.complexity],
      0
    );
  }

  static calculateUUCP(uucw: number, uaw: number): number {
    return uucw + uaw;
  }

  static calculateTCF(technicalFactors: TechnicalFactor[]): number {
    const totalWeightedSum = technicalFactors.reduce(
      (sum, factor) => sum + factor.weight * factor.perceivedComplexity,
      0
    );
    return 0.6 + 0.01 * totalWeightedSum;
  }

  static calculateECF(environmentalFactors: EnvironmentalFactor[]): number {
    const totalWeightedSum = environmentalFactors.reduce(
      (sum, factor) => sum + factor.weight * factor.perceivedComplexity,
      0
    );
    return 1.4 + -0.03 * totalWeightedSum;
  }

  static calculateUCP(
    useCases: UseCase[],
    actors: Actor[],
    technicalFactors: TechnicalFactor[],
    environmentalFactors: EnvironmentalFactor[],
    productivityFactor: number = 20.0
  ): UCPEstimation {
    const uucw = this.calculateUUCW(useCases);
    const uaw = this.calculateUAW(actors);
    const uucp = this.calculateUUCP(uucw, uaw);
    const tcf = this.calculateTCF(technicalFactors);
    const ecf = this.calculateECF(environmentalFactors);
    const ucp = uucp * tcf * ecf;
    const estimatedHours = ucp * productivityFactor;
    const estimatedDays = estimatedHours / 8.0;

    return {
      uucw,
      uaw,
      uucp,
      tcf,
      ecf,
      ucp,
      productivityFactor,
      estimatedHours,
      estimatedDays,
    };
  }
}

