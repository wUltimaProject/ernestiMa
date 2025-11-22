/**
 * Pagina dettaglio stima
 */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, EstimationDetail } from "../../infrastructure/api";
import { GlassesIcon } from "../components/GlassesIcon";

export function EstimationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [estimation, setEstimation] = useState<EstimationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadEstimation(parseInt(id));
    }
  }, [id]);

  const loadEstimation = async (estimationId: number) => {
    try {
      setLoading(true);
      const data = await api.getEstimationById(estimationId);
      setEstimation(data);
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento della stima");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getComplexityLabel = (complexity: string) => {
    const labels: Record<string, string> = {
      simple: "Semplice",
      average: "Medio",
      complex: "Complesso",
    };
    return labels[complexity] || complexity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (error || !estimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md">
          <p className="text-red-600 mb-4">{error || "Stima non trovata"}</p>
          <button
            onClick={() => navigate("/estimations")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Torna alla Lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <GlassesIcon className="w-12 h-12 text-green-600 mr-4" />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
            ErnestiMa
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                  {estimation.project_description || "Stima senza descrizione"}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(estimation.created_at)}
                </p>
              </div>
              <button
                onClick={() => navigate("/estimations")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Torna alla Lista
              </button>
            </div>
          </div>

          {/* Risultati Calcolo */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Risultati Calcolo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">UUCW</p>
                <p className="text-2xl font-bold text-green-700">{estimation.uucw}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">UAW</p>
                <p className="text-2xl font-bold text-green-700">{estimation.uaw}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">UUCP</p>
                <p className="text-2xl font-bold text-green-700">{estimation.uucp}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">UCP Finale</p>
                <p className="text-2xl font-bold text-green-700">{estimation.ucp.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">TCF</p>
                <p className="text-xl font-semibold text-green-700">{estimation.tcf.toFixed(3)}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">ECF</p>
                <p className="text-xl font-semibold text-green-700">{estimation.ecf.toFixed(3)}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Ore Stimate</p>
                  <p className="text-2xl font-bold text-blue-700">{estimation.estimated_hours.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Giorni Stimati</p>
                  <p className="text-2xl font-bold text-blue-700">{estimation.estimated_days.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Produttività</p>
                  <p className="text-2xl font-bold text-blue-700">{estimation.productivity_factor} ore/UCP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Casi d'Uso */}
          {estimation.use_cases.length > 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Casi d'Uso ({estimation.use_cases.length})
              </h3>
              <div className="space-y-4">
                {estimation.use_cases.map((uc) => (
                  <div key={uc.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{uc.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{uc.description}</p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {getComplexityLabel(uc.complexity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attori */}
          {estimation.actors.length > 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Attori ({estimation.actors.length})
              </h3>
              <div className="space-y-4">
                {estimation.actors.map((actor) => (
                  <div key={actor.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{actor.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{actor.description}</p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {getComplexityLabel(actor.complexity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fattori Tecnici */}
          {estimation.technical_factors.length > 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Fattori Tecnici
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {estimation.technical_factors.map((tf) => (
                  <div key={tf.code} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{tf.code}: {tf.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{tf.description}</p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tf.perceived_complexity}/5
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Peso: {tf.weight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fattori Ambientali */}
          {estimation.environmental_factors.length > 0 && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Fattori Ambientali
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {estimation.environmental_factors.map((ef) => (
                  <div key={ef.code} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{ef.code}: {ef.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{ef.description}</p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {ef.perceived_complexity}/5
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Peso: {ef.weight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

