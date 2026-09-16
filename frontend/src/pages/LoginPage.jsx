import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('agent@ma-estate.jp');
  const [password, setPassword] = useState('zen2025');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('agent@ma-estate.jp');
    setPassword('zen2025');
    const res = login('agent@ma-estate.jp', 'zen2025');
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-washi)] flex flex-col justify-between py-12 px-4 sm:px-6">
      
      {/* Top subtle bar */}
      <div className="max-w-md mx-auto w-full text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mist)] block">
          間 不動産 • Tokyo & Kyoto Architecture
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full">
        <div className="bg-white border border-stone-300/80 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative">
          
          {/* Kanji Seal */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto border border-[var(--color-sumi)] text-[var(--color-sumi)] flex items-center justify-center text-xl font-light select-none mb-3">
              間
            </div>
            <h1 className="text-xl font-light tracking-[0.2em] uppercase text-[var(--color-sumi)]">
              Ma Estate
            </h1>
            <p className="text-xs text-[var(--color-mist)] tracking-widest uppercase mt-1">
              Agent Portfolio Access • ログイン
            </p>
          </div>

          {/* Error notification */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span>⚠</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)] mb-1.5">
                Agent Email / Identifier
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@ma-estate.jp"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)] transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-[var(--color-mist)]">
                  Access Key / Password
                </label>
                <span className="text-[10px] text-stone-400">
                  Demo: zen2025
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-stone-300 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)] transition-colors"
                required
              />
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full py-3 text-xs uppercase tracking-[0.2em] bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors cursor-pointer"
              >
                Enter Portal
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 text-xs uppercase tracking-[0.15em] border border-[var(--color-take)] text-[var(--color-take)] hover:bg-emerald-50/50 transition-colors cursor-pointer"
              >
                1-Click Quick Demo Login
              </button>
            </div>
          </form>

          {/* Subtle separator */}
          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
              "Ma" (間) — the Japanese aesthetic concept of negative space, simplicity, and unhurried calm.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-stone-400 tracking-wider">
        © {new Date().getFullYear()} Ma Estate Realty. All rights reserved.
      </div>
    </div>
  );
}
