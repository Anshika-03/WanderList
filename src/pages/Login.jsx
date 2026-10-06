import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/vlogs";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectTo);
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
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo mb-3">Welcome back</p>
        <h1 className="font-display font-extrabold text-4xl text-ink mb-8">Log in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-line rounded-xl px-4 py-3 text-ink font-body text-sm focus:outline-none focus:border-indigo"
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted font-body">
          New here?{" "}
          <Link to="/signup" className="text-indigo font-semibold hover:text-violet">
            Create an account
          </Link>
        </p>

        <p className="mt-4 text-xs text-muted/70 font-mono bg-cloud rounded-xl px-4 py-3">
          Demo login — aisha@example.com / password123
        </p>
      </main>
    </div>
  );
}
