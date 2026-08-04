import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

interface MaintenanceScreenProps {
  onBypass: (isCodeOnly: boolean) => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({ onBypass }) => {
  const { siteContent, submitFeedback, loginWithEmail } = useStore();
  const [logoClicks, setLogoClicks] = useState(0);
  const [showBackdoor, setShowBackdoor] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogoClick = () => {
    const clicks = logoClicks + 1;
    setLogoClicks(clicks);
    if (clicks >= 5) {
      setShowBackdoor(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      submitFeedback(feedback);
      setFeedbackSent(true);
      setFeedback('');
    }
  };

  const handleBackdoorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check access code first
    if (accessCode && accessCode === siteContent.maintenanceAccessCode) {
      onBypass(true); // Grant access (via code)
      return;
    }

    // Otherwise check admin email/password
    if (email && password) {
      const success = await loginWithEmail(email, password);
      if (success) {
        onBypass(false); // Grant access (via login)
      } else {
        setError('Invalid credentials.');
      }
    } else {
      setError('Enter a valid access code or admin credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-950 to-pink-950 font-sans p-6 text-center overflow-hidden relative">
      {/* Background with abstract two-color gradient glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full bg-blue-600/40 blur-[130px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-pink-600/40 blur-[130px]"></div>
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[2rem] max-w-lg w-full shadow-[0_0_50px_rgba(59,130,246,0.15)] relative z-10 transition-all duration-500">
        <img 
          src="/windows-h-logo.png" 
          alt="Logo" 
          className="w-24 h-24 mx-auto mb-6 opacity-70 drop-shadow-lg cursor-pointer transition hover:opacity-100 hover:scale-105" 
          onClick={handleLogoClick}
        />
        
        {!showBackdoor ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-widest mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              System Update
            </h1>
            <p className="text-pink-200 text-sm font-mono tracking-[0.15em] bg-pink-900/30 py-2 px-6 rounded-full border border-pink-500/30 mb-6 inline-block shadow-[0_0_20px_rgba(236,72,153,0.1)]">
              {siteContent.maintenanceEndTime ? `EXPECTED END TIME: ${siteContent.maintenanceEndTime}` : 'MAINTENANCE IN PROGRESS'}
            </p>
            <p className="text-slate-200 text-base font-medium leading-relaxed mb-8 max-w-sm mx-auto font-sans">
              We are currently upgrading our systems to serve you better. We apologize for the inconvenience and appreciate your patience.
            </p>

            {/* Feedback Form */}
            <div className="bg-slate-950/40 p-5 rounded-3xl border border-pink-500/20 text-left backdrop-blur-md">
              <h3 className="text-xs font-mono text-white mb-4 uppercase tracking-[0.2em] text-center">Send us a message</h3>
              {feedbackSent ? (
                <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 p-4 rounded-2xl text-sm font-medium text-center animate-pulse">
                  Thank you! Your feedback has been submitted.
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <textarea 
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="Enter your message here..."
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-pink-500 transition resize-none shadow-inner"
                    required
                  ></textarea>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold tracking-wider py-3 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 cursor-pointer hover:scale-[1.02]"
                  >
                    SUBMIT FEEDBACK
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-left">
            <h2 className="text-xl font-black text-blue-400 mb-2 uppercase tracking-widest text-center">Admin Backdoor Access</h2>
            <p className="text-xs text-slate-400 text-center mb-6">Enter your secret access code or admin credentials to bypass maintenance mode.</p>
            
            <form onSubmit={handleBackdoorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Access Code</label>
                <input 
                  type="text" 
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  placeholder="Secret Code"
                  className="w-full bg-slate-950 border border-slate-700 text-blue-400 font-mono font-bold tracking-widest rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition text-center"
                />
              </div>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs font-bold uppercase">OR</span>
                <div className="flex-grow border-t border-slate-700"></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Admin Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {error && <div className="text-rose-400 text-xs font-bold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</div>}

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition mt-2 shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                Authenticate & Bypass
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowBackdoor(false)}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-400 font-bold py-2 rounded-xl text-xs transition mt-2 cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
