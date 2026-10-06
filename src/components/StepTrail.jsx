const STEPS = [
  { n: "Yo", label: "View", key: "type" },
  { n: "Ye", label: "Select", key: "state" },
  { n: "Yup", label: "Shoot", key: "places" },
];

export default function StepTrail({ current, categoryName, stateName }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-6">
      <nav className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm flex-wrap">
        {STEPS.map((s, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const label =
            s.key === "state" && categoryName
              ? categoryName
              : s.key === "places" && stateName
              ? stateName
              : s.label;
          return (
            <div key={s.key} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "border-indigo text-indigo bg-indigo/5 font-semibold"
                    : done
                    ? "border-teal/50 text-teal"
                    : "border-line text-muted"
                }`}
              >
                <span>{s.n}</span>
                <span className="uppercase tracking-wider">{label}</span>
              </div>
              {i < STEPS.length - 1 && <span className="text-line">→</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
