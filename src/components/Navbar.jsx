import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout, ready } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-ink">
          <span className="relative flex h-7 w-7 shrink-0">
            <span className="absolute inset-0 rounded-blob bg-gradient-to-br from-indigo via-violet to-coral" />
          </span>
          Wander<span className="text-indigo">list</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="hidden sm:inline-block px-3 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-indigo hover:bg-cloud transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/vlogs"
            className="px-3 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-indigo hover:bg-cloud transition-colors"
          >
            Vlogs
          </Link>

          {!ready ? (
            <div className="h-9 w-20 rounded-full bg-cloud animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 pl-2">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-semibold font-display"
                style={{ backgroundColor: user.avatar_color }}
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-2 rounded-full text-sm font-medium text-ink/60 hover:text-coral transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-indigo transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-indigo hover:bg-violet transition-colors shadow-card"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
