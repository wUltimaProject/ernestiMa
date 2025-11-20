/**
 * Hook per gestire lo stato del questionario UCP
 */
import { useState } from "react";
import {
  UseCase,
  Actor,
  TechnicalFactor,
  EnvironmentalFactor,
  UseCaseComplexity,
  ActorComplexity,
} from "../domain/types";
import {
  TECHNICAL_FACTOR_QUESTIONS,
  ENVIRONMENTAL_FACTOR_QUESTIONS,
  TECHNICAL_FACTOR_WEIGHTS,
  ENVIRONMENTAL_FACTOR_WEIGHTS,
} from "../domain/questions";

interface QuestionnaireData {
  useCases: UseCase[];
  actors: Actor[];
  technicalFactors: TechnicalFactor[];
  environmentalFactors: EnvironmentalFactor[];
}

export function useQuestionnaire() {
  const [data, setData] = useState<QuestionnaireData>({
    useCases: [],
    actors: [],
    technicalFactors: TECHNICAL_FACTOR_QUESTIONS.map((q) => ({
      code: q.id,
      name: q.title,
      description: q.description,
      weight: TECHNICAL_FACTOR_WEIGHTS[q.id] || 1.0,
      perceivedComplexity: 0,
    })),
    environmentalFactors: ENVIRONMENTAL_FACTOR_QUESTIONS.map((q) => ({
      code: q.id,
      name: q.title,
      description: q.description,
      weight: ENVIRONMENTAL_FACTOR_WEIGHTS[q.id] || 1.0,
      perceivedComplexity: 3, // Default medio
    })),
  });

  const addUseCase = (name: string, description: string, complexity: UseCaseComplexity) => {
    const newUseCase: UseCase = {
      id: `uc_${Date.now()}`,
      name,
      description,
      complexity,
    };
    setData((prev) => ({
      ...prev,
      useCases: [...prev.useCases, newUseCase],
    }));
  };

  const addActor = (name: string, description: string, complexity: ActorComplexity) => {
    const newActor: Actor = {
      id: `actor_${Date.now()}`,
      name,
      description,
      complexity,
    };
    setData((prev) => ({
      ...prev,
      actors: [...prev.actors, newActor],
    }));
  };

  const updateTechnicalFactor = (code: string, complexity: number) => {
    setData((prev) => ({
      ...prev,
      technicalFactors: prev.technicalFactors.map((tf) =>
        tf.code === code ? { ...tf, perceivedComplexity: complexity } : tf
      ),
    }));
  };

  const updateEnvironmentalFactor = (code: string, complexity: number) => {
    setData((prev) => ({
      ...prev,
      environmentalFactors: prev.environmentalFactors.map((ef) =>
        ef.code === code ? { ...ef, perceivedComplexity: complexity } : ef
      ),
    }));
  };

  const removeUseCase = (id: string) => {
    setData((prev) => ({
      ...prev,
      useCases: prev.useCases.filter((uc) => uc.id !== id),
    }));
  };

  const removeActor = (id: string) => {
    setData((prev) => ({
      ...prev,
      actors: prev.actors.filter((actor) => actor.id !== id),
    }));
  };

  return {
    data,
    addUseCase,
    addActor,
    updateTechnicalFactor,
    updateEnvironmentalFactor,
    removeUseCase,
    removeActor,
  };
}

