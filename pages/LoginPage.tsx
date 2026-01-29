
import React, { useState } from 'react';
import { User } from '../types';
import { Database } from '../services/database';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const authenticatedUser = await Database.authenticate(email, password);
    if (authenticatedUser) {
      onLogin(authenticatedUser);
    } else {
      setError("Identification failed. Please verify credentials.");
    }
    setLoading(false);
  };

  const quickLogin = async (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    setLoading(true);
    const user = await Database.authenticate(e, p);
    if (user) onLogin(user);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050506] relative overflow-hidden font-inter">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5E6AD2]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[420px] z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-[#0D0D0E]/80 backdrop-blur-xl border border-white/[0.05] rounded-[24px] p-10 shadow-2xl flex flex-col items-center">
          
          {/* Logo Section */}
          <div className="relative w-12 h-10 mb-8">
            <div className="absolute top-0 left-2 w-6 h-6 rounded-full bg-[#00E5FF] opacity-90 blur-[0.3px]"></div>
            <div className="absolute bottom-0 right-2 w-7 h-7 rounded-full bg-[#5E6AD2] opacity-90 blur-[0.3px]"></div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Onboard Hub</h1>
            <p className="text-[#6B6B6E] text-sm">
              Secure employee identification terminal.
            </p>
          </div>

          {/* Available Test Accounts */}
          <div className="w-full mb-10 text-center">
            <p className="text-[9px] font-bold text-[#3F3F41] uppercase tracking-[0.2em] mb-4">Available Test Accounts</p>
            <div className="flex gap-2 justify-center">
              {[
                { name: 'Alex (Backend)', email: 'backend@onboard.hub', pass: 'password123' },
                { name: 'Sarah (Frontend)', email: 'frontend@onboard.hub', pass: 'design456' }
              ].map((acc) => (
                <button 
                  key={acc.name}
                  onClick={() => quickLogin(acc.email, acc.pass)}
                  className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                >
                  {acc.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block ml-1">Work Email</label>
              <input
                type="email"
                required
                className="w-full bg-[#161618] border border-white/[0.08] rounded-xl py-3.5 px-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#5E6AD2]/50 transition-all text-sm"
                placeholder="identity@onboard.hub"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block ml-1">Secure Token (Password)</label>
              <input
                type="password"
                required
                className="w-full bg-[#161618] border border-white/[0.08] rounded-xl py-3.5 px-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#5E6AD2]/50 transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-[10px] text-red-500 text-center font-medium animate-in fade-in">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group mt-4"
            >
              <div className="relative w-full bg-[#5E6AD2] hover:bg-[#6e7ae0] text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#5E6AD2]/10">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <i className="fas fa-shield-halved text-[10px] opacity-80"></i>
                    <span className="text-sm tracking-tight">Login</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
