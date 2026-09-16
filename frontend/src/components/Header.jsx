import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { setIsAddModalOpen, properties } = useProperties();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-washi)]/90 backdrop-blur-sm border-b border-stone-300/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Mark */}
        <Link to="/" className="flex items-center gap-3 group select-none">
          <div className="w-9 h-9 flex items-center justify-center border border-[var(--color-sumi)] text-[var(--color-sumi)] text-sm font-light tracking-widest transition-transform group-hover:bg-[var(--color-sumi)] group-hover:text-[var(--color-washi)]">
            間
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--color-sumi)]">
              Ma Estate
            </span>
            <span className="text-[10px] tracking-[0.18em] text-[var(--color-mist)]">
              間 不動産 • Tokyo & Kyoto
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-xs tracking-wider text-[var(--color-mist)]">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-take)]"></span>
                <span>{properties.length} Properties in Portfolio</span>
              </div>

              {/* Add Property CTA */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase border border-[var(--color-take)] text-[var(--color-take)] hover:bg-[var(--color-take)] hover:text-white transition-colors cursor-pointer"
                title="Add New Real Estate Property"
              >
                <span className="text-base leading-none">+</span>
                <span>Add Property</span>
              </button>

              {/* User profile & Logout */}
              <div className="flex items-center gap-3 pl-3 border-l border-stone-300/70">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-medium text-[var(--color-sumi)] tracking-wide">
                    {user?.name || 'Agent'}
                  </span>
                  <span className="text-[10px] text-[var(--color-mist)]">
                    {user?.kanji || 'エージェント'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-[11px] tracking-widest uppercase border border-stone-300 text-[var(--color-mist)] hover:text-[var(--color-sumi)] hover:border-[var(--color-sumi)] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 text-xs tracking-[0.15em] uppercase border border-[var(--color-sumi)] text-[var(--color-sumi)] hover:bg-[var(--color-sumi)] hover:text-[var(--color-washi)] transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
