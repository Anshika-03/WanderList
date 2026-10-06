import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/vlogs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="max-w-md mx-auto px-6 pt-16 pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mb-3">Join in</p>
        <h1 className="font-display font-extrabold text-4xl text-ink mb-8">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-line rounded-xl px-4 py-3 text-ink font-body text-sm focus:outline-none focus:border-indigo"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-line rounded-xl px-4 py-3 text-ink font-body text-sm focus:outline-none focus:border-indigo"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-line rounded-xl px-4 py-3 text-ink font-body text-sm focus:outline-none focus:border-indigo"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-sm text-coral font-body bg-coral/5 border border-coral/20 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo hover:bg-violet transition-colors text-white font-semibold rounded-xl py-3 shadow-card disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted font-body">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo font-semibold hover:text-violet">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}
