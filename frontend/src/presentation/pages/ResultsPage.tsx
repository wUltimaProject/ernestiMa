/**
 * Pagina dei risultati della stima UCP
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UCPEstimation, QuestionnaireState } from "../../domain/types";
import { GlassesIcon } from "../components/GlassesIcon";
import { api } from "../../infrastructure/api";

interface ResultsPageProps {
  estimation: UCPEstimation;
  projectDescription: string;
  questionnaireData: QuestionnaireState;
}

export function ResultsPage({ estimation, projectDescription, questionnaireData }: ResultsPageProps) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Salva automaticamente la stima quando viene mostrata
    saveEstimation();
  }, []);

  const saveEstimation = async () => {
    try {
      setSaving(true);
      await api.saveEstimation({
        project_description: projectDescription,
        use_cases: questionnaireData.useCases.map((uc) => ({
          id: uc.id,
          name: uc.name,
          description: uc.description,
          complexity: uc.complexity,
        })),
        actors: questionnaireData.actors.map((actor) => ({
          id: actor.id,
          name: actor.name,
          description: actor.description,
          complexity: actor.complexity,
        })),
        technical_factors: questionnaireData.technicalFactors.map((tf) => ({
          code: tf.code,
          name: tf.name,
          description: tf.description,
          weight: tf.weight,
          perceived_complexity: tf.perceivedComplexity,
        })),
        environmental_factors: questionnaireData.environmentalFactors.map((ef) => ({
          code: ef.code,
          name: ef.name,
          description: ef.description,
          weight: ef.weight,
          perceived_complexity: ef.perceivedComplexity,
        })),
        ucp_result: {
          uucw: estimation.uucw,
          uaw: estimation.uaw,
          uucp: estimation.uucp,
          tcf: estimation.tcf,
          ecf: estimation.ecf,
          ucp: estimation.ucp,
          productivity_factor: estimation.productivityFactor,
          estimated_hours: estimation.estimatedHours,
          estimated_days: estimation.estimatedDays,
        },
      });
      setSaved(true);
    } catch (error) {
      console.error("Errore nel salvataggio della stima:", error);
      // Non blocchiamo l'utente se il salvataggio fallisce
    } finally {
      setSaving(false);
    }
  };

  const exportToTxt = () => {
    const content = `ERNESTIMA - STIMA PROGETTO SOFTWARE
METODO USE CASE POINTS (UCP)
==================================================

RISULTATI CALCOLO
------------------
Unadjusted Use Case Weight (UUCW): ${estimation.uucw}
Unadjusted Actor Weight (UAW): ${estimation.uaw}
Unadjusted Use Case Points (UUCP): ${estimation.uucp}

Technical Complexity Factor (TCF): ${estimation.tcf.toFixed(3)}
Environmental Complexity Factor (ECF): ${estimation.ecf.toFixed(3)}

Use Case Points Finale (UCP): ${estimation.ucp.toFixed(2)}

STIMA EFFORT
------------
Fattore di Produttività: ${estimation.productivityFactor} ore per UCP
Ore Stimate Totali: ${estimation.estimatedHours.toFixed(2)} ore
Giorni Lavorativi Stimati: ${estimation.estimatedDays.toFixed(2)} giorni
(considerando 8 ore per giorno lavorativo)

==================================================
Generato il: ${new Date().toLocaleString('it-IT')}
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stima_ucp_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-200/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-green-300/50 text-green-700">
                <GlassesIcon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-green-600">
                Risultati Stima - Ernesti<span className="text-green-500">Ma</span>
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            <section className="bg-green-50/50 backdrop-blur-sm p-6 rounded-lg border border-green-200/50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Calcoli Base
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">UUCW</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.uucw}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">UAW</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.uaw}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">UUCP</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.uucp}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-green-50/50 backdrop-blur-sm p-6 rounded-lg border border-green-200/50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Fattori di Complessità
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">TCF</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.tcf.toFixed(3)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ECF</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.ecf.toFixed(3)}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-green-50/50 backdrop-blur-sm p-6 rounded-lg border border-green-200/50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Stima Finale
              </h2>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Use Case Points (UCP)</p>
                <p className="text-4xl font-bold text-green-600 mb-6">
                  {estimation.ucp.toFixed(2)}
                </p>
              </div>
            </section>

            <section className="bg-green-50/50 backdrop-blur-sm p-6 rounded-lg border border-green-200/50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Effort Stimato
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ore Totali</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.estimatedHours.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giorni Lavorativi</p>
                  <p className="text-2xl font-bold text-green-600">
                    {estimation.estimatedDays.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (8 ore/giorno)
                  </p>
                </div>
              </div>
            </section>

            {saving && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800">Salvataggio in corso...</p>
              </div>
            )}
            {saved && !saving && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800">✓ Stima salvata con successo!</p>
              </div>
            )}

            <div className="flex justify-center gap-4 pt-6">
              <button
                onClick={exportToTxt}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold"
              >
                Esporta in TXT
              </button>
              <button
                onClick={() => navigate("/estimations")}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold"
              >
                Vedi Storico Stime
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold"
              >
                Nuova Stima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

