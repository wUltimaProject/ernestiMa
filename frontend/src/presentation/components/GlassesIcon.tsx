/**
 * Icona occhiali da vista minimale
 */
export function GlassesIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lente sinistra */}
      <circle
        cx="25"
        cy="30"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Lente destra */}
      <circle
        cx="75"
        cy="30"
        r="18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Ponte (filo che unisce le stecche) */}
      <line
        x1="43"
        y1="30"
        x2="57"
        y2="30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Stecca sinistra */}
      <line
        x1="7"
        y1="30"
        x2="0"
        y2="30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Stecca destra */}
      <line
        x1="93"
        y1="30"
        x2="100"
        y2="30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

