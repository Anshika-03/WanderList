import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Stars from "../components/Stars.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../lib/api.js";

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, secs] of units) {
    const n = Math.floor(seconds / secs);
    if (n >= 1) return `${n} ${label}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function Vlogs() {
  const { user, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const preselectedPlace = searchParams.get("place") || "";

  const [reviews, setReviews] = useState([]);
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("loading");

  const [placeId, setPlaceId] = useState(preselectedPlace);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [formError, setFormError] = useState("");

  const loadReviews = () => {
    api
      .getReviews()
      .then((data) => setReviews(data.reviews))
      .catch(() => {});
  };

  useEffect(() => {
    setStatus("loading");
    Promise.all([api.getReviews(), api.getPlaces({})])
      .then(([reviewData, placeData]) => {
        setReviews(reviewData.reviews);
        setPlaces(placeData.places);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const selectedPlace = useMemo(
    () => places.find((p) => String(p.id) === String(placeId)),
    [places, placeId]
  );

  const handlePost = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!placeId) return setFormError("Choose which place this is about.");
    setPosting(true);
    try {
      await api.postReview({ place_id: Number(placeId), rating, content }, token);
      setContent("");
      setRating(5);
      loadReviews();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteReview(id, token);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      // silently ignore — the row simply won't disappear
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <section className="dot-grid">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mb-3">Community vlogs</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] text-ink">
            Real trips, real feedback
          </h1>
          <p className="mt-4 text-muted max-w-xl font-body">
            Travellers share how their visit actually went. Signed-in members can post their own —
            everyone else is welcome to read.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        {/* Composer */}
        <div className="mb-10 rounded-3xl border border-line bg-cloud p-6">
          {!user ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-sm text-muted">
                <span className="font-semibold text-ink">Sign in to share your own story.</span>{" "}
                Anyone can read the vlogs below.
              </p>
              <Link
                to="/login"
                state={{ from: "/vlogs" }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-indigo hover:bg-violet transition-colors shadow-card shrink-0"
              >
                Log in to post
              </Link>
            </div>
          ) : (
            <form onSubmit={handlePost} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-semibold font-display shrink-0"
                  style={{ backgroundColor: user.avatar_color }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-body text-sm text-ink">
                  Posting as <span className="font-semibold">{user.name}</span>
                </p>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto] gap-3">
                <select
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  className="w-full bg-white border border-line rounded-xl px-3 py-2.5 text-ink font-body text-sm focus:outline-none focus:border-indigo"
                >
                  <option value="">Choose a place...</option>
                  {places.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.city}, {p.state_name}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 bg-white border border-line rounded-xl px-3">
                  <span className="font-mono text-[11px] text-muted uppercase">Rating</span>
                  <Stars value={rating} onChange={setRating} size="text-lg" />
                </div>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder={
                  selectedPlace
                    ? `What was your trip to ${selectedPlace.name} like?`
                    : "What was your trip like?"
                }
                className="w-full bg-white border border-line rounded-xl px-4 py-3 text-ink placeholder:text-muted/60 font-body text-sm focus:outline-none focus:border-indigo resize-none"
              />

              {formError && (
                <p className="text-sm text-coral font-body bg-coral/5 border border-coral/20 rounded-xl px-4 py-2.5">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={posting}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo hover:bg-violet transition-colors shadow-card disabled:opacity-60"
              >
                {posting ? "Posting..." : "Post your vlog"}
              </button>
            </form>
          )}
        </div>

        {/* Feed */}
        {status === "loading" && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 rounded-3xl bg-cloud animate-pulse" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="border border-coral/30 bg-coral/5 rounded-2xl p-6 text-ink">
            <p className="font-display font-bold text-xl">Couldn't load the feed.</p>
            <p className="text-muted text-sm mt-1 font-body">Check the backend connection and try again.</p>
          </div>
        )}

        {status === "ready" && reviews.length === 0 && (
          <div className="border border-line bg-cloud rounded-2xl p-10 text-center">
            <p className="font-display font-bold text-2xl text-ink">No vlogs yet</p>
            <p className="text-muted text-sm mt-1 font-body">Be the first to share how your trip went.</p>
          </div>
        )}

        {status === "ready" && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-3xl border border-line bg-white shadow-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-semibold font-display shrink-0"
                      style={{ backgroundColor: r.avatar_color }}
                    >
                      {r.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-ink">{r.user_name}</p>
                      <p className="font-mono text-[11px] text-muted uppercase tracking-wider">
                        {timeAgo(r.created_at)}
                      </p>
                    </div>
                  </div>
                  <Stars value={r.rating} />
                </div>

                <p className="mt-4 text-ink/90 font-body leading-relaxed">{r.content}</p>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/vlogs?place=${r.place_id}`}
                    onClick={() => setSearchParams({ place: r.place_id })}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-indigo hover:text-violet transition-colors"
                  >
                    {r.place_name} · {r.place_city}, {r.state_name}
                  </Link>
                  {user && user.id === r.user_id && (
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-xs font-mono uppercase tracking-wider text-coral hover:text-ink transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
