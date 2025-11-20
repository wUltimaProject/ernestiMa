/**
 * Pagina principale del questionario UCP
 */
import { useState } from "react";
import { QuestionCard } from "../components/QuestionCard";
import {
  TECHNICAL_FACTOR_QUESTIONS,
  ENVIRONMENTAL_FACTOR_QUESTIONS,
} from "../../domain/questions";
import { useQuestionnaire } from "../../application/useQuestionnaire";
import { UCPCalculator } from "../../domain/ucpCalculator";
import { ResultsPage } from "./ResultsPage";
import { QuestionType } from "../../domain/types";
import { GlassesIcon } from "../components/GlassesIcon";

type Step =
  | "use_cases_count"
  | "use_cases"
  | "actors_count"
  | "actors"
  | "technical_factors"
  | "environmental_factors"
  | "results";

export function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState<Step>("use_cases_count");
  const [useCasesCount, setUseCasesCount] = useState<number>(0);
  const [actorsCount, setActorsCount] = useState<number>(0);
  const [currentUseCaseIndex, setCurrentUseCaseIndex] = useState(0);
  const [currentActorIndex, setCurrentActorIndex] = useState(0);
  const [useCaseData, setUseCaseData] = useState<
    Array<{ name: string; description: string; complexity: string }>
  >([]);
  const [actorData, setActorData] = useState<
    Array<{ name: string; description: string; complexity: string }>
  >([]);
  const [currentTechnicalIndex, setCurrentTechnicalIndex] = useState(0);
  const [currentEnvironmentalIndex, setCurrentEnvironmentalIndex] = useState(0);
  const [technicalValues, setTechnicalValues] = useState<Record<string, number>>({});
  const [environmentalValues, setEnvironmentalValues] = useState<Record<string, number>>({});
  const [estimation, setEstimation] = useState<any>(null);

  const questionnaire = useQuestionnaire();

  const handleUseCasesCount = (count: number) => {
    setUseCasesCount(count);
    // Reset dati casi d'uso
    questionnaire.data.useCases.forEach((uc) => {
      questionnaire.removeUseCase(uc.id);
    });
    setUseCaseData(new Array(count).fill(null).map(() => ({ name: "", description: "", complexity: "" })));
    if (count > 0) {
      setCurrentStep("use_cases");
      setCurrentUseCaseIndex(0);
    } else {
      setCurrentStep("actors_count");
    }
  };

  const handleUseCaseNext = (name: string, description: string, complexity: string) => {
    const newData = [...useCaseData];
    newData[currentUseCaseIndex] = { name, description, complexity };
    setUseCaseData(newData);

    if (currentUseCaseIndex < useCasesCount - 1) {
      setCurrentUseCaseIndex(currentUseCaseIndex + 1);
    } else {
      // Aggiungi tutti i casi d'uso (incluso l'ultimo appena inserito)
      newData.forEach((uc) => {
        if (uc.name && uc.description && uc.complexity) {
          questionnaire.addUseCase(
            uc.name,
            uc.description,
            uc.complexity as any
          );
        }
      });
      setCurrentStep("actors_count");
    }
  };

  const handleActorsCount = (count: number) => {
    setActorsCount(count);
    // Reset dati attori
    questionnaire.data.actors.forEach((actor) => {
      questionnaire.removeActor(actor.id);
    });
    setActorData(new Array(count).fill(null).map(() => ({ name: "", description: "", complexity: "" })));
    if (count > 0) {
      setCurrentStep("actors");
      setCurrentActorIndex(0);
    } else {
      setCurrentStep("technical_factors");
      setCurrentTechnicalIndex(0);
    }
  };

  const handleActorNext = (name: string, description: string, complexity: string) => {
    const newData = [...actorData];
    newData[currentActorIndex] = { name, description, complexity };
    setActorData(newData);

    if (currentActorIndex < actorsCount - 1) {
      setCurrentActorIndex(currentActorIndex + 1);
    } else {
      // Aggiungi tutti gli attori (incluso l'ultimo appena inserito)
      newData.forEach((actor) => {
        if (actor.name && actor.description && actor.complexity) {
          questionnaire.addActor(
            actor.name,
            actor.description,
            actor.complexity as any
          );
        }
      });
      setCurrentStep("technical_factors");
      setCurrentTechnicalIndex(0);
    }
  };

  const handleTechnicalNext = (value: number) => {
    const question = TECHNICAL_FACTOR_QUESTIONS[currentTechnicalIndex];
    setTechnicalValues({ ...technicalValues, [question.id]: value });
    questionnaire.updateTechnicalFactor(question.id, value);

    if (currentTechnicalIndex < TECHNICAL_FACTOR_QUESTIONS.length - 1) {
      setCurrentTechnicalIndex(currentTechnicalIndex + 1);
    } else {
      setCurrentStep("environmental_factors");
      setCurrentEnvironmentalIndex(0);
    }
  };

  const handleEnvironmentalNext = (value: number) => {
    const question = ENVIRONMENTAL_FACTOR_QUESTIONS[currentEnvironmentalIndex];
    setEnvironmentalValues({ ...environmentalValues, [question.id]: value });
    questionnaire.updateEnvironmentalFactor(question.id, value);

    if (currentEnvironmentalIndex < ENVIRONMENTAL_FACTOR_QUESTIONS.length - 1) {
      setCurrentEnvironmentalIndex(currentEnvironmentalIndex + 1);
    } else {
      // Calcola la stima
      const result = UCPCalculator.calculateUCP(
        questionnaire.data.useCases,
        questionnaire.data.actors,
        questionnaire.data.technicalFactors,
        questionnaire.data.environmentalFactors
      );
      setEstimation(result);
      setCurrentStep("results");
    }
  };

  if (currentStep === "results" && estimation) {
    return <ResultsPage estimation={estimation} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-16 h-16 bg-green-200/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-green-300/50 transform rotate-3 hover:rotate-0 transition-transform duration-300 text-green-700">
              <GlassesIcon className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-extrabold text-green-600 drop-shadow-sm">
              Ernesti<span className="text-green-500">Ma</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Stima Progetti Software con il metodo Use Case Points</p>
        </div>
        {currentStep === "use_cases_count" && (
          <div className="max-w-3xl mx-auto">
            <QuestionCard
              question={{
                id: "use_cases_count",
                type: QuestionType.NUMERIC,
                title: "Quanti casi d'uso ha il sistema?",
                description:
                  "Un caso d'uso rappresenta una funzionalità che il sistema deve fornire. Conta tutte le funzionalità principali.",
                helpText: "Inserisci il numero totale di casi d'uso (funzionalità) del sistema",
                minValue: 0,
                maxValue: 100,
                required: true,
              }}
              value={useCasesCount}
              onChange={(val) => setUseCasesCount(val as number)}
              onNext={() => handleUseCasesCount(useCasesCount)}
              isFirst={true}
            />
            <div className="mt-6 bg-green-50/50 backdrop-blur-sm border-l-4 border-green-300/70 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                💡 Esempi di funzionalità (casi d'uso)
              </h3>
              <p className="text-sm text-green-800 mb-3">
                Una funzionalità è qualcosa che l'utente può fare con il sistema. Ecco alcuni esempi:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-green-800">
                <li><strong>Login/Registrazione:</strong> L'utente può accedere al sistema o creare un account</li>
                <li><strong>Gestione profilo:</strong> L'utente può modificare i propri dati personali</li>
                <li><strong>Ricerca prodotti:</strong> L'utente può cercare prodotti nel catalogo</li>
                <li><strong>Carrello acquisti:</strong> L'utente può aggiungere prodotti al carrello e procedere all'acquisto</li>
                <li><strong>Gestione ordini:</strong> L'utente può visualizzare e tracciare i propri ordini</li>
                <li><strong>Report/Statistiche:</strong> Il sistema genera report o statistiche</li>
                <li><strong>Notifiche:</strong> Il sistema invia notifiche agli utenti</li>
                <li><strong>Gestione documenti:</strong> L'utente può caricare, visualizzare o scaricare documenti</li>
              </ul>
              <p className="text-sm text-green-700 mt-4 italic">
                💬 <strong>Suggerimento:</strong> Pensa a tutte le azioni principali che gli utenti possono compiere con il sistema. Ogni azione significativa è una funzionalità!
              </p>
            </div>
          </div>
        )}

        {currentStep === "use_cases" && (
          <UseCaseForm
            index={currentUseCaseIndex + 1}
            total={useCasesCount}
            onNext={handleUseCaseNext}
            onPrevious={() => {
              if (currentUseCaseIndex > 0) {
                setCurrentUseCaseIndex(currentUseCaseIndex - 1);
              } else {
                setCurrentStep("use_cases_count");
              }
            }}
            initialData={useCaseData[currentUseCaseIndex]}
          />
        )}

        {currentStep === "actors_count" && (
          <div className="max-w-3xl mx-auto">
            <QuestionCard
              question={{
                id: "actors_count",
                type: QuestionType.NUMERIC,
                title: "Quanti attori interagiscono con il sistema?",
                description:
                  "Un attore è chi o cosa interagisce con il sistema (utenti, sistemi esterni, etc.)",
                helpText: "Inserisci il numero totale di attori",
                minValue: 0,
                maxValue: 50,
                required: true,
              }}
              value={actorsCount}
              onChange={(val) => setActorsCount(val as number)}
              onNext={() => handleActorsCount(actorsCount)}
              isFirst={false}
            />
            <div className="mt-6 bg-green-50/50 backdrop-blur-sm border-l-4 border-green-300/70 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                👥 Cosa sono gli attori?
              </h3>
              <p className="text-sm text-green-700 mb-3">
                Un <strong>attore</strong> è qualsiasi persona, sistema o dispositivo che <strong>interagisce con il software</strong> che stai sviluppando.
              </p>
              <p className="text-sm text-green-700 mb-3">
                <strong>Interagire significa:</strong> inviare dati al sistema, ricevere informazioni dal sistema, o far eseguire operazioni al sistema.
              </p>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded border border-green-200/50 mb-3">
                <p className="text-sm font-semibold text-green-800 mb-2">Esempi di attori:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-green-700">
                  <li><strong>Utente finale:</strong> La persona che usa l'applicazione (es. cliente che fa un ordine, dipendente che inserisce dati)</li>
                  <li><strong>Amministratore:</strong> Chi gestisce il sistema (es. admin che configura utenti, manager che visualizza report)</li>
                  <li><strong>Sistema esterno con API:</strong> Un altro software che comunica con il tuo sistema tramite interfacce programmate (es. sistema di pagamento, servizio di notifiche)</li>
                  <li><strong>Sistema via protocollo:</strong> Un sistema che comunica usando standard di comunicazione (es. sistema che invia email, server che sincronizza dati)</li>
                  <li><strong>Dispositivo:</strong> Hardware che invia dati (es. sensore, scanner, dispositivo IoT)</li>
                </ul>
              </div>
              <p className="text-sm text-green-600 italic">
                💡 <strong>Suggerimento:</strong> Pensa a chi o cosa "parla" con il tuo sistema. Ogni entità che invia o riceve informazioni è un attore!
              </p>
            </div>
          </div>
        )}

        {currentStep === "actors" && (
          <ActorForm
            index={currentActorIndex + 1}
            total={actorsCount}
            onNext={handleActorNext}
            onPrevious={() => {
              if (currentActorIndex > 0) {
                setCurrentActorIndex(currentActorIndex - 1);
              } else {
                setCurrentStep("actors_count");
              }
            }}
            initialData={actorData[currentActorIndex]}
          />
        )}

        {currentStep === "technical_factors" && (
          <QuestionCard
            question={TECHNICAL_FACTOR_QUESTIONS[currentTechnicalIndex]}
            value={technicalValues[TECHNICAL_FACTOR_QUESTIONS[currentTechnicalIndex].id] || 0}
            onChange={(val) => {
              const question = TECHNICAL_FACTOR_QUESTIONS[currentTechnicalIndex];
              setTechnicalValues({ ...technicalValues, [question.id]: val as number });
            }}
            onNext={() => {
              const question = TECHNICAL_FACTOR_QUESTIONS[currentTechnicalIndex];
              const value = technicalValues[question.id] || 0;
              handleTechnicalNext(value);
            }}
            onPrevious={() => {
              if (currentTechnicalIndex > 0) {
                setCurrentTechnicalIndex(currentTechnicalIndex - 1);
              } else {
                if (actorsCount > 0) {
                  setCurrentStep("actors");
                  setCurrentActorIndex(actorsCount - 1);
                } else {
                  setCurrentStep("actors_count");
                }
              }
            }}
            isFirst={currentTechnicalIndex === 0}
            isLast={currentTechnicalIndex === TECHNICAL_FACTOR_QUESTIONS.length - 1}
          />
        )}

        {currentStep === "environmental_factors" && (
          <QuestionCard
            question={ENVIRONMENTAL_FACTOR_QUESTIONS[currentEnvironmentalIndex]}
            value={environmentalValues[ENVIRONMENTAL_FACTOR_QUESTIONS[currentEnvironmentalIndex].id] || 3}
            onChange={(val) => {
              const question = ENVIRONMENTAL_FACTOR_QUESTIONS[currentEnvironmentalIndex];
              setEnvironmentalValues({ ...environmentalValues, [question.id]: val as number });
            }}
            onNext={() => {
              const question = ENVIRONMENTAL_FACTOR_QUESTIONS[currentEnvironmentalIndex];
              const value = environmentalValues[question.id] || 3;
              handleEnvironmentalNext(value);
            }}
            onPrevious={() => {
              if (currentEnvironmentalIndex > 0) {
                setCurrentEnvironmentalIndex(currentEnvironmentalIndex - 1);
              } else {
                setCurrentStep("technical_factors");
                setCurrentTechnicalIndex(TECHNICAL_FACTOR_QUESTIONS.length - 1);
              }
            }}
            isFirst={currentEnvironmentalIndex === 0}
            isLast={currentEnvironmentalIndex === ENVIRONMENTAL_FACTOR_QUESTIONS.length - 1}
          />
        )}
      </div>
    </div>
  );
}

// Componenti helper per casi d'uso e attori
function UseCaseForm({
  index,
  total,
  onNext,
  onPrevious,
  initialData,
}: {
  index: number;
  total: number;
  onNext: (name: string, description: string, complexity: string) => void;
  onPrevious: () => void;
  initialData?: { name: string; description: string; complexity: string };
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [complexity, setComplexity] = useState(initialData?.complexity || "");

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Caso d'Uso {index} di {total}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name && description && complexity) {
            onNext(name, description, complexity);
          }
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome del caso d'uso
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrizione
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complessità
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Seleziona --</option>
            <option value="simple">Semplice</option>
            <option value="average">Medio</option>
            <option value="complex">Complesso</option>
          </select>
          <div className="mt-3 bg-green-50/50 backdrop-blur-sm border-l-4 border-green-300/70 p-4 rounded">
            <p className="text-sm font-semibold text-green-800 mb-2">
              ⚠️ Come determinare la complessità (secondo metodologia UCP ufficiale):
            </p>
            <p className="text-xs text-green-800 mb-3">
              <strong>La complessità UCP si basa SOLO sul numero di transazioni</strong> (interazioni attore-sistema con risultato visibile).
            </p>
            
            <div className="text-xs text-green-800 mb-3 bg-green-50/30 backdrop-blur-sm p-3 rounded border border-green-200/50">
              <p className="font-semibold text-green-800 mb-2">📋 Cosa sono le transazioni?</p>
              <p className="text-green-800 mb-2">
                Una <strong>transazione</strong> è ogni scambio di informazioni tra l'utente (o sistema esterno) e il software che produce un risultato visibile o un cambiamento di stato.
              </p>
              <p className="text-green-800 mb-2">Esempi di transazioni:</p>
              <ul className="list-disc list-inside space-y-1 text-green-800 ml-2">
                <li>L'utente inserisce dati in un form e clicca "Salva" → 1 transazione</li>
                <li>Il sistema valida i dati e mostra un messaggio → 1 transazione</li>
                <li>L'utente cerca qualcosa e il sistema mostra i risultati → 1 transazione</li>
                <li>L'utente seleziona un'opzione e il sistema aggiorna la schermata → 1 transazione</li>
                <li>L'utente conferma un'azione e il sistema esegue un'operazione → 1 transazione</li>
              </ul>
              <p className="text-green-700 mt-2 italic">
                💡 <strong>In pratica:</strong> Conta ogni volta che l'utente fa qualcosa (click, inserimento dati, selezione) e il sistema risponde o cambia qualcosa di visibile.
              </p>
            </div>

            <p className="text-xs text-green-800 mb-2">
              <strong>NON dipende da:</strong> difficoltà tecnica, skill richieste, tempo di sviluppo, esperienza necessaria.
            </p>
            <div className="text-xs text-green-800 space-y-2 mt-3 bg-white/50 backdrop-blur-sm p-3 rounded border border-green-200/50">
              <p><strong>🔵 Semplice:</strong> fino a 3 transazioni</p>
              <p><strong>🟡 Medio:</strong> 4-7 transazioni</p>
              <p><strong>🔴 Complesso:</strong> più di 7 transazioni</p>
            </div>
            <div className="text-xs text-green-700 mt-3 space-y-1">
              <p className="font-semibold">💡 Esempi pratici:</p>
              <p>• Task tecnicamente semplice ma con molti passi (&gt;7 transazioni) = <strong>Complesso</strong></p>
              <p>• Task che richiede skill avanzate ma ha pochi passi (≤3 transazioni) = <strong>Semplice</strong></p>
              <p>• Task veloce ma con 4-7 interazioni utente-sistema = <strong>Medio</strong></p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Indietro
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {index === total ? "Avanti" : "Prossimo Caso d'Uso"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ActorForm({
  index,
  total,
  onNext,
  onPrevious,
  initialData,
}: {
  index: number;
  total: number;
  onNext: (name: string, description: string, complexity: string) => void;
  onPrevious: () => void;
  initialData?: { name: string; description: string; complexity: string };
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [complexity, setComplexity] = useState(initialData?.complexity || "");

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Attore {index} di {total}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name && description && complexity) {
            onNext(name, description, complexity);
          }
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome dell'attore
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrizione
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo di attore
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Seleziona --</option>
            <option value="simple">Semplice (sistema con API)</option>
            <option value="average">Medio (sistema via protocollo)</option>
            <option value="complex">Complesso (persona)</option>
          </select>
          <div className="mt-3 bg-green-50/50 backdrop-blur-sm border-l-4 border-green-300/70 p-4 rounded">
            <p className="text-xs font-semibold text-green-800 mb-2">
              📋 Come scegliere il tipo di attore (secondo metodologia UCP ufficiale):
            </p>
            <div className="text-xs text-green-800 space-y-2">
              <p><strong>🔵 Semplice (peso 1):</strong> Un altro sistema software che comunica con il tuo sistema tramite un'API ben definita e standardizzata. Esempi: sistema di pagamento (Stripe, PayPal), servizio di invio email (SendGrid), API di Google Maps, servizi esterni con interfacce programmate.</p>
              <p><strong>🟡 Medio (peso 2):</strong> Un sistema o utente che comunica usando protocolli standard (HTTP, FTP, TCP/IP). Esempi: server email, sistema di sincronizzazione dati, servizio di backup automatico, utenti che accedono via protocolli standard.</p>
              <p><strong>🔴 Complesso (peso 3):</strong> Un utente umano che usa il sistema tramite un'interfaccia grafica (GUI). Esempi: utente finale che usa l'applicazione, cliente che compra online, dipendente che inserisce dati tramite schermo, amministratore che gestisce il sistema con interfaccia grafica.</p>
            </div>
            <p className="text-xs text-green-700 mt-3 italic">
              💡 <strong>Nota importante:</strong> L'utente finale (persona che usa la tua applicazione) è sempre un attore e viene classificato come <strong>Complesso</strong> (peso 3) perché interagisce tramite interfaccia grafica.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Indietro
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {index === total ? "Avanti" : "Prossimo Attore"}
          </button>
        </div>
      </form>
    </div>
  );
}

