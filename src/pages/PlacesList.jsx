import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import StepTrail from "../components/StepTrail.jsx";
import Stars from "../components/Stars.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../lib/api.js";

const DIFFICULTY_STYLES = {
  Easy: "text-teal border-teal/30 bg-teal/10",
  Moderate: "text-sun border-sun/40 bg-sun/10",
  Hard: "text-coral border-coral/30 bg-coral/10",
};

export default function PlacesList() {
  const { categorySlug, stateSlug } = useParams();
  const { user } = useAuth();
  const [places, setPlaces] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [status, setStatus] = useState("loading");

  const [nameQuery, setNameQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [regionQuery, setRegionQuery] = useState("");

  useEffect(() => {
    setStatus("loading");
    Promise.all([
      api.getPlaces({ category: categorySlug, state: stateSlug }),
      api.getCategories(),
      api.getStates(),
    ])
      .then(([placeData, catData, stateData]) => {
        setPlaces(placeData.places);
        const cat = catData.categories.find((c) => c.slug === categorySlug);
        const st = stateData.states.find((s) => s.slug === stateSlug);
        setCategoryName(cat ? cat.name : categorySlug);
        setStateName(st ? st.name : stateSlug);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [categorySlug, stateSlug]);

  const regions = useMemo(
    () => Array.from(new Set(places.map((p) => p.region))).sort(),
    [places]
  );

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesName = nameQuery ? p.name.toLowerCase().includes(nameQuery.toLowerCase()) : true;
      const matchesCity = cityQuery ? p.city.toLowerCase().includes(cityQuery.toLowerCase()) : true;
      const matchesRegion = regionQuery ? p.region === regionQuery : true;
      return matchesName && matchesCity && matchesRegion;
    });
  }, [places, nameQuery, cityQuery, regionQuery]);

  const clearFilters = () => {
    setNameQuery("");
    setCityQuery("");
    setRegionQuery("");
  };

  const hasFilters = nameQuery || cityQuery || regionQuery;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <StepTrail current="places" categoryName={categoryName} stateName={stateName} />

      <section className="dot-grid">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <Link
            to={`/state/${categorySlug}`}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted hover:text-indigo transition-colors"
          >
            ← Change state
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mt-4 mb-3">
            Step 03 of 03
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink max-w-2xl">
            {categoryName} in {stateName}
          </h1>
          <p className="mt-4 text-muted max-w-xl font-body">
            {status === "ready"
              ? `${filtered.length} spot${filtered.length === 1 ? "" : "s"} worth the trip.`
              : "Loading the map..."}
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="mb-8 flex flex-wrap items-end gap-4 bg-cloud border border-line rounded-3xl p-5">
          <div className="flex-1 min-w-[160px]">
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="Search by place name"
              className="w-full bg-white border border-line rounded-xl px-3 py-2 text-ink placeholder:text-muted/60 font-body text-sm focus:outline-none focus:border-indigo"
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              City
            </label>
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              placeholder="Search by city"
              className="w-full bg-white border border-line rounded-xl px-3 py-2 text-ink placeholder:text-muted/60 font-body text-sm focus:outline-none focus:border-indigo"
            />
          </div>
          <div className="min-w-[160px]">
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              Region
            </label>
            <select
              value={regionQuery}
              onChange={(e) => setRegionQuery(e.target.value)}
              className="w-full bg-white border border-line rounded-xl px-3 py-2 text-ink font-body text-sm focus:outline-none focus:border-indigo"
            >
              <option value="">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="font-mono text-xs uppercase tracking-wider text-coral hover:text-indigo transition-colors px-2 py-2"
            >
              Clear filters
            </button>
          )}
        </div>

        {status === "loading" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-cloud animate-pulse h-80" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="border border-coral/30 bg-coral/5 rounded-2xl p-6 text-ink">
            <p className="font-display font-bold text-xl">Couldn't load places.</p>
            <p className="text-muted text-sm mt-1 font-body">Check the backend connection and try again.</p>
          </div>
        )}

        {status === "ready" && filtered.length === 0 && (
          <div className="border border-line bg-cloud rounded-2xl p-10 text-center">
            <p className="font-display font-bold text-2xl text-ink">Nothing matches that search</p>
            <p className="text-muted text-sm mt-1 font-body">
              Try clearing a filter or widening the name/city search.
            </p>
          </div>
        )}

        {status === "ready" && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group rounded-3xl overflow-hidden border border-line bg-white shadow-card flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-xl leading-tight text-ink">
                      {p.name}
                    </h3>
                    <span
                      className={`shrink-0 font-mono text-[10px] uppercase tracking-wider border rounded-full px-2 py-1 ${
                        DIFFICULTY_STYLES[p.difficulty] || "text-muted border-line"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-indigo uppercase tracking-wider">
                    {p.city} · {p.region}
                  </p>
                  <p className="text-sm text-muted font-body leading-relaxed">{p.description}</p>

                  <div className="flex items-center gap-2 text-xs">
                    <Stars value={p.avg_rating} />
                    <span className="text-muted font-mono">
                      {p.review_count > 0
                        ? `${p.avg_rating.toFixed(1)} (${p.review_count})`
                        : "No reviews yet"}
                    </span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-line flex items-center justify-between text-xs font-mono text-muted">
                    <span>{p.activity}</span>
                    <span>{p.best_season}</span>
                  </div>

                  <Link
                    to={user ? `/vlogs?place=${p.id}` : "/login"}
                    className="text-center mt-1 text-xs font-semibold text-indigo hover:text-violet transition-colors font-body"
                  >
                    Share your story about this place →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
