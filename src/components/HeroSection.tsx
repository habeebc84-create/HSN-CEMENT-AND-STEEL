import React from 'react';
import { useStore } from '../context/StoreContext';
import { BulkPricingTable } from './BulkPricingTable';
import { 
  ShoppingBag, Phone, ArrowRight, MapPin, ShieldCheck
} from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  const { siteContent } = useStore();

  return (
    <div className="relative overflow-hidden pt-8 pb-32 lg:py-40 bg-liquid">
      
      {/* Vibrant Ambient Liquid Theme Blobs */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-blue-500/15 blur-[120px] shape-liquid pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[35rem] h-[35rem] bg-pink-500/15 blur-[100px] shape-liquid pointer-events-none"></div>

      {/* 8K ULTRA HD BUILDING CONSTRUCTION BACKGROUND WITH DRONE MOTION */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
        <img 
          src={siteContent.heroImage || '/hero_bg_ultra_8k.png'} 
          alt="Building Under Construction 8K Ultra HD" 
          className="w-full h-full object-cover object-top transition-all duration-700 brightness-110 contrast-105 drone-wallpaper-motion"
          style={{ 
            imageRendering: 'auto'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/hero_bg_ultra_8k.png';
          }}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/30 to-slate-950/75"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="max-w-3xl space-y-6 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-xs font-bold">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>GSTIN: 37AAAAA0000A1Z5</span>
            </span>
            <span className="bg-slate-900/90 text-slate-100 border border-slate-700 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 backdrop-blur-md shadow-md">
              <MapPin className="w-4 h-4 text-white" />
              <span>Serving Kalikiri & Annamayya District, AP</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-tight font-industrial">
            HSN CEMENT AND STEEL
          </h1>

          <div className="pt-2 flex flex-wrap gap-3.5 justify-center sm:justify-start">
            
            <button
              onClick={onShopNow}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-black px-8 py-4 rounded-2xl flex items-center space-x-2.5 text-base shadow-purple-500/25 shadow-2xl transition transform hover:scale-105 active:scale-95 border border-purple-400/30 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Explore Materials Catalogue</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={`tel:${siteContent.phone}`}
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 font-bold px-6 py-4 rounded-2xl transition flex items-center space-x-2 text-base backdrop-blur-md shadow-xl"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call ({siteContent.phone})</span>
            </a>

          </div>

        </div>

        <BulkPricingTable />
      </div>

      {/* Liquid Wave Divider */}
      <div className="wave-divider text-slate-950 drop-shadow-2xl">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

    </div>
  );
};
