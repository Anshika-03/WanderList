import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import StepTrail from "../components/StepTrail.jsx";
import TileCard from "../components/TileCard.jsx";
import { api } from "../lib/api.js";

export default function StateSelect() {
  const { categorySlug } = useParams();
  const [states, setStates] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("loading");
    Promise.all([api.getStates(categorySlug), api.getCategories()])
      .then(([stateData, catData]) => {
        setStates(stateData.states);
        const match = catData.categories.find((c) => c.slug === categorySlug);
        setCategoryName(match ? match.name : categorySlug);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <StepTrail current="state" categoryName={categoryName} />

      <section className="dot-grid">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted hover:text-indigo transition-colors"
          >
            ← Change type
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mt-4 mb-3">
            Step 02 of 03
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink max-w-2xl">
            Which state{categoryName ? ` has the ${categoryName.toLowerCase()} you're after` : ""}?
          </h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {status === "loading" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-3xl bg-cloud animate-pulse" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="border border-coral/30 bg-coral/5 rounded-2xl p-6 text-ink">
            <p className="font-display font-bold text-xl">Couldn't load states.</p>
            <p className="text-muted text-sm mt-1 font-body">Check the backend connection and try again.</p>
          </div>
        )}

        {status === "ready" && states.length === 0 && (
          <div className="border border-line bg-cloud rounded-2xl p-10 text-center">
            <p className="font-display font-bold text-2xl text-ink">No states mapped yet</p>
            <p className="text-muted text-sm mt-1 font-body">
              There's no {categoryName.toLowerCase()} listed in the database yet. Try another type.
            </p>
          </div>
        )}

        {status === "ready" && states.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {states.map((s) => (
              <TileCard
                key={s.id}
                image={s.image_url}
                title={s.name}
                subtitle={`${s.region} India`}
                onClick={() => navigate(`/places/${categorySlug}/${s.slug}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
