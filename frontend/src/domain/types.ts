/**
 * Tipi TypeScript per il dominio UCP
 */

export enum UseCaseComplexity {
  SIMPLE = "simple",
  AVERAGE = "average",
  COMPLEX = "complex",
}

export enum ActorComplexity {
  SIMPLE = "simple",
  AVERAGE = "average",
  COMPLEX = "complex",
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  complexity: UseCaseComplexity;
}

export interface Actor {
  id: string;
  name: string;
  description: string;
  complexity: ActorComplexity;
}

export interface TechnicalFactor {
  code: string;
  name: string;
  description: string;
  weight: number;
  perceivedComplexity: number; // 0-5
}

export interface EnvironmentalFactor {
  code: string;
  name: string;
  description: string;
  weight: number;
  perceivedComplexity: number; // 1-5
}

export interface UCPEstimation {
  uucw: number;
  uaw: number;
  uucp: number;
  tcf: number;
  ecf: number;
  ucp: number;
  productivityFactor: number;
  estimatedHours: number;
  estimatedDays: number;
}

export enum QuestionType {
  USE_CASE = "use_case",
  ACTOR = "actor",
  TECHNICAL_FACTOR = "technical_factor",
  ENVIRONMENTAL_FACTOR = "environmental_factor",
  NUMERIC = "numeric",
  SELECT = "select",
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description: string;
  helpText?: string;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  required: boolean;
}

export interface QuestionnaireState {
  useCases: UseCase[];
  actors: Actor[];
  technicalFactors: TechnicalFactor[];
  environmentalFactors: EnvironmentalFactor[];
  currentStep: number;
  totalSteps: number;
}

