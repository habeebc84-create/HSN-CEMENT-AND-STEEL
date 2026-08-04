import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { siteContent } = useStore();
  const phoneClean = siteContent.phone.replace(/[^0-9]/g, '');
  const waClean = siteContent.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 pointer-events-auto">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${waClean}`}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-pink-500 hover:bg-pink-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/50 hover:scale-110 active:scale-95 transition-all group relative"
        aria-label="WhatsApp Us"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute right-16 bg-slate-900 text-pink-400 border border-pink-500/30 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneClean}`}
        className="w-14 h-14 bg-gradient-to-br from-blue-500 to-yellow-600 hover:from-blue-400 hover:to-yellow-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all group relative"
        aria-label="Call Store"
      >
        <Phone className="w-7 h-7" />
        <span className="absolute right-16 bg-slate-900 text-white border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          Call {siteContent.phone}
        </span>
      </a>
    </div>
  );
};
