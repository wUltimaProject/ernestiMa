/**
 * Pagina lista stime storiche
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, EstimationListItem } from "../../infrastructure/api";
import { GlassesIcon } from "../components/GlassesIcon";

export function EstimationsListPage() {
  const [estimations, setEstimations] = useState<EstimationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEstimations();
  }, []);

  const loadEstimations = async () => {
    try {
      setLoading(true);
      const data = await api.getAllEstimations();
      setEstimations(data);
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento delle stime");
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

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Storico Stime
              </h2>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Nuova Stima
              </button>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Caricamento...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!loading && !error && estimations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Nessuna stima salvata. Crea la tua prima stima!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Crea Nuova Stima
                </button>
              </div>
            )}

            {!loading && !error && estimations.length > 0 && (
              <div className="space-y-4">
                {estimations.map((estimation) => (
                  <div
                    key={estimation.id}
                    onClick={() => navigate(`/estimations/${estimation.id}`)}
                    className="bg-white rounded-lg border-2 border-green-200 p-6 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {estimation.project_description || "Stima senza descrizione"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(estimation.created_at)}
                        </p>
                      </div>
                      <div className="ml-4">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

