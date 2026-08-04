import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag, Phone, MessageSquare, ShieldCheck,
  Truck, Award, DollarSign, ArrowRight, MapPin, Clock
} from 'lucide-react';

interface SplashLandingPageProps {
  onEnterStore: () => void;
  onSelectCategory?: (catName: string) => void;
}

export const SplashLandingPage: React.FC<SplashLandingPageProps> = ({ onEnterStore }) => {
  const { siteContent } = useStore();

  const handleEnterClick = () => {
    onEnterStore();
  };

  const features = [
    { title: '100% Genuine Brands', desc: 'JSW, ACC, Dalmia, Bharathi, Tata Tiscon & Vizag Steel', icon: ShieldCheck, color: 'from-blue-500 to-indigo-600' },
    { title: 'Wholesale Direct Rates', desc: 'Best daily prices for home builders & contractors', icon: DollarSign, color: 'from-fuchsia-500 to-teal-600' },
    { title: 'Express Site Transport', desc: 'Direct site delivery in Kalikiri & nearby mandals', icon: Truck, color: 'from-blue-500 to-teal-600' },
    { title: '15+ Years Trust', desc: 'Serving thousands of residential & commercial projects', icon: Award, color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 font-sans selection:bg-pink-500 selection:text-white overflow-y-auto">

      {/* Full Screen Image Background (No Glassy Effect) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
        <img 
          src={siteContent.splashImage || '/hero_bg_ultra_8k.png'} 
          alt="HSN Cement & Steel Facility" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex-grow flex flex-col min-h-screen justify-between py-2">

        {/* Top Header styled with modern Glassmorphic panel */}
        {/* Top Header - Fully transparent with light border to blend into background */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 relative z-20">
          <div className="relative rounded-2xl bg-slate-950/25 backdrop-blur-sm border border-white/10 shadow-lg px-5 py-3">

            <div className="flex justify-between items-center h-14">
              <div className="flex items-center space-x-3.5 group cursor-pointer" onClick={onEnterStore}>
                <div className="relative">
                  <img
                    src="/windows-h-logo.png"
                    alt="Logo"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain border border-white/10 bg-slate-950/40 p-1 shadow-md group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-slate-200 transition font-industrial">
                    HSN CEMENT & STEEL
                  </span>
                  <p className="text-[9px] sm:text-[10px] tracking-wider font-semibold flex items-center gap-1.5 text-slate-300">
                    <span className="text-slate-200 font-bold uppercase tracking-wide">Premium Building Materials</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300 font-medium">Kalikiri, AP</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <a
                  href={`tel:${siteContent.phone}`}
                  className="bg-slate-900/40 hover:bg-slate-800/60 border border-white/10 hover:border-white/30 text-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden sm:inline">Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-fuchsia-500/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </header>

        {/* Main Hero Content */}
        <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 flex flex-col justify-center">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Side: Welcome Content */}
            <div className="md:col-span-7 space-y-6 text-center sm:text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-xs font-bold">
                <span className="bg-white/5 text-white border border-white/10 px-3.5 py-1.5 rounded-full flex items-center space-x-1 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                  <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
                  <span>GSTIN Registered Dealer</span>
                </span>
                <span className="bg-white/5 text-white border border-white/10 px-3.5 py-1.5 rounded-full flex items-center space-x-1 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Kalikiri, AP</span>
                </span>
              </div>

              {/* Title with Gradient Polish */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl font-industrial">
                Welcome to <br />
                <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                  HSN CEMENT AND STEEL
                </span>
              </h1>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center sm:justify-start">
                <button 
                  onClick={handleEnterClick} 
                  className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center space-x-3 text-base sm:text-lg transition transform group border backdrop-blur-md cursor-pointer bg-white/10 hover:bg-white/20 border-white/20 hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-white transition" />
                  <span className="text-white font-black tracking-wider drop-shadow-md">
                    ENTER WEBSITE & SHOP CATALOG
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:translate-x-2 group-hover:text-white transition" />
                </button>

                <a href={`tel:${siteContent.phone}`} className="bg-slate-900/60 hover:bg-slate-800/85 border border-white/10 text-white font-bold px-6 py-4 sm:py-5 rounded-2xl text-center transition flex items-center justify-center space-x-2 text-sm sm:text-base backdrop-blur-md shadow-xl">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                  <span>Call Store Now</span>
                </a>
              </div>

              {/* Location & Time Footer info */}
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-slate-200 font-bold">
                <div className="flex items-center space-x-1.5 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                  <MapPin className="w-4 h-4 text-slate-300" />
                  <span>Kalikiri, AP - 517234</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                  <Clock className="w-4 h-4 text-slate-300" />
                  <span>Open 12 Hours Daily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-20">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="bg-slate-900/70 border border-slate-700/60 p-3.5 sm:p-4 rounded-2xl flex items-center space-x-3 backdrop-blur-xl shadow-2xl hover:bg-slate-800/80 hover:border-blue-500/40 transition duration-300 hover:scale-105">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${f.color} shadow-lg shrink-0`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white">{f.title}</h4>
                    <p className="text-[10px] text-slate-300 leading-tight mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <footer className="relative z-10 border-t border-slate-900 bg-slate-950/95 py-3 text-center text-[11px] text-slate-400 font-medium max-w-7xl mx-auto w-full">
          © {new Date().getFullYear()} HSN CEMENT AND STEEL. Kalikiri, Andhra Pradesh. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

