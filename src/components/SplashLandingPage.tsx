import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ShieldCheck, Truck, Award, DollarSign, ArrowRight, MapPin, Clock } from 'lucide-react';

interface SplashLandingPageProps {
  onEnterStore: () => void;
  onAdminPortal?: () => void;
  onSelectCategory?: (catName: string) => void;
}

export const SplashLandingPage: React.FC<SplashLandingPageProps> = ({ onEnterStore }) => {
  const { siteContent } = useStore();

  const features = [
    { title: '100% Genuine Brands', desc: 'JSW, ACC, Dalmia, Bharathi, Tata', icon: ShieldCheck },
    { title: 'Wholesale Rates', desc: 'Best daily prices for home builders', icon: DollarSign },
    { title: 'Express Transport', desc: 'Direct site delivery in Kalikiri', icon: Truck },
    { title: '15+ Years Trust', desc: 'Serving residential & commercial projects', icon: Award }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 font-sans selection:bg-blue-500 selection:text-white overflow-y-auto">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/windows-h-logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase font-industrial">
                HSN CEMENT & STEEL
              </h1>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                Premium Building Materials
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Kalikiri, AP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Banner Section matching Figma style */}
        <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200">
          <div className="absolute inset-0 z-0">
            {/* Fallback color if image is missing, otherwise image */}
            <div className="w-full h-full bg-slate-100 relative">
              <img 
                src={siteContent.splashImage || '/hero_bg_ultra_8k.png'} 
                alt="Banner" 
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 p-8 sm:p-16 lg:p-24 md:w-2/3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full mb-4">
              WELCOME TO OUR STORE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 font-industrial">
              Build With <br className="hidden sm:block" />
              <span className="text-blue-600">Confidence</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-md font-medium">
              Explore our catalog of premium cement, steel, and construction materials at wholesale prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onEnterStore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-5 h-5" />
                SHOP CATALOG
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <a 
                href={`tel:${siteContent.phone}`}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Call Store Now
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid below banner */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-slate-50 rounded-lg shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{f.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Categories Preview (Matches Figma category layout idea) */}
        <div className="mt-16">
          <h3 className="text-2xl font-black text-slate-900 mb-8 font-industrial text-center">TOP CATEGORIES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {['Cement', 'Steel', 'Pipes', 'Aggregates'].map((cat, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat);
                  onEnterStore();
                }}
                className="cursor-pointer group"
              >
                <div className="aspect-square bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 mx-auto w-32 h-32 sm:w-40 sm:h-40 shadow-sm group-hover:shadow-md group-hover:border-blue-300 transition-all">
                  <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    {/* Placeholder icon space */}
                    <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500 font-medium">
          <div className="flex justify-center items-center gap-4 mb-2">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Kalikiri, AP</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Open Daily</span>
          </div>
          © {new Date().getFullYear()} HSN CEMENT AND STEEL. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};


