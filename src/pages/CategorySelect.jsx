import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import StepTrail from "../components/StepTrail.jsx";
import TileCard from "../components/TileCard.jsx";
import { api } from "../lib/api.js";

export default function CategorySelect() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getCategories()
      .then((data) => {
        setCategories(data.categories);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <StepTrail current="type" />

      <section className="dot-grid">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mb-3">
            Step 01 of 03
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink max-w-2xl">
            What kind of ground do you want under your feet?
          </h1>
          <p className="mt-4 text-muted max-w-xl font-body">
            Pick a landscape. We'll narrow it down to states, then to the exact
            spots worth the trip.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {status === "loading" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-3xl bg-cloud animate-pulse" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="border border-coral/30 bg-coral/5 rounded-2xl p-6 text-ink">
            <p className="font-display font-bold text-xl">Couldn't reach the trailhead.</p>
            <p className="text-muted text-sm mt-1 font-body">
              Make sure the backend is running at the configured API URL, then refresh.
            </p>
          </div>
        )}

        {status === "ready" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((c) => (
              <TileCard
                key={c.id}
                image={c.image_url}
                title={c.name}
                subtitle={c.tagline}
                accent={c.accent}
                onClick={() => navigate(`/state/${c.slug}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
