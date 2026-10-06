export default function TileCard({ image, title, subtitle, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-line bg-white text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo shadow-card"
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {accent && (
          <span
            className="absolute top-3 left-3 h-3 w-3 rounded-full ring-4 ring-white/70"
            style={{ backgroundColor: accent }}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg leading-snug text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted font-body">{subtitle}</p>}
      </div>
    </button>
  );
}
