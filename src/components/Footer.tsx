import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { siteContent, logoutAdmin } = useStore();

  return (
    <footer className="bg-gradient-to-b from-slate-950/80 to-slate-950 border-t border-blue-500/30 text-slate-400 text-xs pt-16 pb-8 relative z-10 overflow-hidden">
      {/* Liquid Wave Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-pink-500 to-indigo-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
      
      {/* Floating Liquid Blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none shape-liquid"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none shape-liquid"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavClick('home')}>
              <img 
                src="/windows-h-logo.png" 
                alt="HSN Cement & Steel Logo"
                onDoubleClick={() => {
                  logoutAdmin();
                  onNavClick('admin-login');
                }}
                className="w-12 h-12 rounded-xl object-contain bg-slate-900 border border-slate-800 p-1 shadow-sm group-hover:border-pink-500 transition"
              />
              <span className="text-xl font-black text-white tracking-tight group-hover:text-pink-400 transition font-industrial">
                HSN CEMENT & STEEL
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Kalikiri's leading construction materials supplier. Authorised dealer for JSW, ACC, Dalmia, Bharathi Cement, Tata Tiscon, Vizag Steel & Bosch Cutting Blades.
            </p>
            <div className="flex items-center space-x-2 text-white font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              <span>100% Factory Certified Genuine Quality</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">Quick Navigation</h4>
            <ul className="space-y-2 font-medium">
              {['home', 'products', 'services', 'gallery', 'about', 'contact'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => {
                      onNavClick(link);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition capitalize text-xs"
                  >
                    {link === 'about' ? 'About Us' : link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">Top Categories</h4>
            <ul className="space-y-2 font-medium text-xs">
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">OPC & PPC Cement Bags</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">Tata Tiscon TMT (6mm-32mm)</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">Vizag Steel Rebar</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">Bosch Diamond & Metal Cutting Blades</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">18G & 20G Binding Wires</button></li>
              <li><button onClick={() => onNavClick('products')} className="hover:text-white transition">Waterproofing & Construction Chemicals</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">Store Contact</h4>
            <ul className="space-y-3 font-medium">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{siteContent.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${siteContent.phone}`} className="hover:text-white font-bold">{siteContent.phone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-pink-400 shrink-0" />
                <a href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-pink-400 font-bold">{siteContent.whatsapp}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>{siteContent.businessHours}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
          <div className="flex items-center space-x-2">
            <img src="/windows-h-logo.png" alt="HSN Cement & Steel Logo" className="w-6 h-6 rounded-md object-contain" />
            <p 
              onDoubleClick={() => {
                logoutAdmin();
                onNavClick('admin-login');
              }} 
              className="cursor-default text-slate-400"
            >
              © {new Date().getFullYear()} HSN CEMENT AND STEEL. All Rights Reserved. Kalikiri, AP.
            </p>
          </div>
          <button
            onClick={() => {
              onNavClick('terms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-2 sm:mt-0 text-slate-300 hover:text-amber-400 font-bold transition flex items-center gap-1 cursor-pointer border border-white/15 px-3 py-1.5 rounded-full bg-slate-900/5"
          >
            <span>Terms & Conditions</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
