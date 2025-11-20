/**
 * Componente per visualizzare una singola domanda
 */
import { Question } from "../../domain/types";

interface QuestionCardProps {
  question: Question;
  value: number | string;
  onChange: (value: number | string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function QuestionCard({
  question,
  value,
  onChange,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
}: QuestionCardProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = typeof value === "number" ? value : (question.minValue || 0);
    if (numValue !== undefined && numValue !== null) {
      onNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {question.title}
        </h2>
        <p className="text-gray-600 mb-4">{question.description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {(question.type === "numeric" || question.type === "technical_factor" || question.type === "environmental_factor") && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valore (da {question.minValue} a {question.maxValue})
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={typeof value === "number" ? value.toString() : ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Permette campo vuoto temporaneamente durante la digitazione
                if (inputValue === "") {
                  // Non cambiare il valore se è vuoto durante la digitazione
                  // L'utente può cancellare tutto per inserire un nuovo numero
                  return;
                } else {
                  const numValue = parseInt(inputValue, 10);
                  if (!isNaN(numValue)) {
                    // Limita il valore tra min e max
                    const clampedValue = Math.max(
                      question.minValue || 0,
                      Math.min(numValue, question.maxValue || 100)
                    );
                    onChange(clampedValue);
                  }
                }
              }}
              onBlur={(e) => {
                // Se il campo è vuoto, imposta il valore minimo
                if (e.target.value === "") {
                  onChange(question.minValue || 0);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={question.required}
              placeholder={`Inserisci un valore tra ${question.minValue} e ${question.maxValue}`}
            />
            {question.minValue !== undefined && question.maxValue !== undefined && (
              <div className="mt-4">
                <input
                  type="range"
                  min={question.minValue}
                  max={question.maxValue}
                  value={typeof value === "number" ? value : (question.minValue || 0)}
                  onChange={(e) => onChange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{question.minValue}</span>
                  <span className="font-semibold text-blue-600">
                    {typeof value === "number" ? value : (question.minValue || 0)}
                  </span>
                  <span>{question.maxValue}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {question.type === "select" && question.options && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleziona un'opzione
            </label>
            <select
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={question.required}
            >
              <option value="">-- Seleziona --</option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {question.helpText && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="text-sm text-blue-700 whitespace-pre-line">{question.helpText}</div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className={`px-6 py-2 rounded-md ${
              isFirst
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Indietro
          </button>
          <button
            type="submit"
            disabled={value === undefined || value === null || (typeof value === "number" && isNaN(value))}
            className={`px-6 py-2 rounded-md ${
              value === undefined || value === null || (typeof value === "number" && isNaN(value))
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLast ? "Calcola Stima" : "Avanti"}
          </button>
        </div>
      </form>
    </div>
  );
}

