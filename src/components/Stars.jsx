export default function Stars({ value, onChange, size = "text-base" }) {
  const interactive = typeof onChange === "function";
  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={interactive ? () => onChange(n) : undefined}
          className={`${interactive ? "cursor-pointer" : ""} ${
            n <= Math.round(value) ? "text-sun" : "text-line"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
