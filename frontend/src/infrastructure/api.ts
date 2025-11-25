/**
 * API client for backend communication
 */

// In produzione usa l'URL assoluto, in sviluppo usa il proxy
// VITE_API_URL deve includere /api alla fine (es: https://backend.vercel.app/api)
let API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Se VITE_API_URL è impostato ma non termina con /api, aggiungilo
if (API_BASE_URL !== "/api" && !API_BASE_URL.endsWith("/api")) {
  // Rimuovi trailing slash se presente, poi aggiungi /api
  API_BASE_URL = API_BASE_URL.replace(/\/$/, "") + "/api";
}

export interface EstimationListItem {
  id: number;
  project_description: string;
  created_at: string;
}

export interface EstimationDetail {
  id: number;
  project_description: string;
  created_at: string;
  use_cases: Array<{
    id: string;
    name: string;
    description: string;
    complexity: string;
  }>;
  actors: Array<{
    id: string;
    name: string;
    description: string;
    complexity: string;
  }>;
  technical_factors: Array<{
    code: string;
    name: string;
    description: string;
    weight: number;
    perceived_complexity: number;
  }>;
  environmental_factors: Array<{
    code: string;
    name: string;
    description: string;
    weight: number;
    perceived_complexity: number;
  }>;
  uucw: number;
  uaw: number;
  uucp: number;
  tcf: number;
  ecf: number;
  ucp: number;
  productivity_factor: number;
  estimated_hours: number;
  estimated_days: number;
}

export interface SaveEstimationRequest {
  project_description: string;
  use_cases: Array<{
    id: string;
    name: string;
    description: string;
    complexity: string;
  }>;
  actors: Array<{
    id: string;
    name: string;
    description: string;
    complexity: string;
  }>;
  technical_factors: Array<{
    code: string;
    name: string;
    description: string;
    weight: number;
    perceived_complexity: number;
  }>;
  environmental_factors: Array<{
    code: string;
    name: string;
    description: string;
    weight: number;
    perceived_complexity: number;
  }>;
  ucp_result: {
    uucw: number;
    uaw: number;
    uucp: number;
    tcf: number;
    ecf: number;
    ucp: number;
    productivity_factor: number;
    estimated_hours: number;
    estimated_days: number;
  };
}

export const api = {
  async getAllEstimations(): Promise<EstimationListItem[]> {
    const response = await fetch(`${API_BASE_URL}/estimations/`);
    if (!response.ok) {
      throw new Error("Failed to fetch estimations");
    }
    return response.json();
  },

  async getEstimationById(id: number): Promise<EstimationDetail> {
    const response = await fetch(`${API_BASE_URL}/estimations/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch estimation");
    }
    return response.json();
  },

  async saveEstimation(data: SaveEstimationRequest): Promise<EstimationListItem> {
    const response = await fetch(`${API_BASE_URL}/estimations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to save estimation");
    }
    return response.json();
  },
};

