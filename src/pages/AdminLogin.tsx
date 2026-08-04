import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { loginWithEmail, isAuthLoading, siteContent } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    const success = await loginWithEmail(email, password);
    if (success) {
      onSuccess();
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
        <p className="text-slate-400 mt-4 font-bold text-sm">Verifying secure session...</p>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-950">
      
      {/* 8K ULTRA HD BACKGROUND WITH DRONE AERIAL MOTION */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
        <img 
          src={siteContent.heroImage || '/hero_bg_ultra_8k.png'} 
          alt="HSN Cement & Steel Admin Login HD" 
          className="w-full h-full object-cover object-center transition-all duration-700 brightness-[0.4] contrast-100 drone-wallpaper-motion"
          style={{
            imageRendering: 'auto'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/hero_bg_ultra_8k.png';
          }}
          loading="eager" 
          decoding="async" 
        />
      {/* Ambient Background Glows - Neutral Glass */}
      <div className="absolute -top-40 -left-40 w-[45rem] h-[45rem] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[45rem] h-[45rem] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]"></div>
    </div>

    <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-slate-800/80 shadow-2xl relative z-10 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner overflow-hidden">
          <img 
            src="/windows-h-logo.png" 
            alt="HSN Logo" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
        <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
          Restricted access. Only authorized personnel can manage the HSN Cement & Steel platform.
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-xl text-xs flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Access Denied!</strong> Your account is not authorized or credentials are invalid.
            </div>
          </div>
        )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition shadow-inner"
            required 
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition shadow-inner"
            required 
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white/10 hover:bg-white/20 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center space-x-3 text-sm transition transform active:scale-95 border border-white/10 backdrop-blur-md"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <span>Sign In Securely</span>}
        </button>
        <button
          type="button"
          onClick={() => {
            setEmail(import.meta.env.VITE_ADMIN_EMAIL || 'habeebc84@gmail.com');
            setPassword(localStorage.getItem('admin_dev_password') || 'admin123');
          }}
          className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 cursor-pointer font-bold py-3 rounded-xl flex items-center justify-center text-xs transition transform active:scale-95 border border-blue-500/30"
        >
          Load Direct Entry Credentials
        </button>
      </form>
      </div>

      <div className="text-center pt-4 border-t border-slate-800/50">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3 h-3 text-white" />
          <span>Secure Admin Session</span>
        </span>
      </div>

      </div>
    </div>
  );
};
