import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Bell, X } from 'lucide-react';

export const AnnouncementTicker: React.FC = () => {
  const { notifications } = useStore();
  const [closedPopups, setClosedPopups] = useState<string[]>([]);
  const [closedBanners, setClosedBanners] = useState<string[]>([]);

  const activeBanners = notifications.filter(n => n.active && n.type === 'banner' && !closedBanners.includes(n.id));
  const activePopups = notifications.filter(n => n.active && n.type === 'popup' && !closedPopups.includes(n.id));

  return (
    <>
      {/* Top Banner Announcements (Liquid Glassy Bar) */}
      {activeBanners.map(banner => (
        <div key={banner.id} className="bg-slate-950/70 backdrop-blur-2xl border-b border-white/20 text-white px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg relative z-50">
          <div className="flex items-center space-x-2 mx-auto">
            <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
            <span><strong className="text-amber-400">{banner.title}:</strong> {banner.content}</span>
          </div>
          <button 
            onClick={() => setClosedBanners(prev => [...prev, banner.id])}
            className="hover:bg-slate-900/10 p-1 rounded-full text-slate-200 transition"
            aria-label="Close Announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Popup Modal Announcement */}
      {activePopups.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-center">
            <button 
              onClick={() => setClosedPopups(prev => [...prev, activePopups[0].id])}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-100 mb-2">{activePopups[0].title}</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{activePopups[0].content}</p>
            <div className="flex space-x-3 justify-center">
              <a 
                href="https://wa.me/919179173040" 
                target="_blank" 
                rel="noreferrer"
                className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg inline-flex items-center space-x-2"
              >
                Inquire on WhatsApp
              </a>
              <button 
                onClick={() => setClosedPopups(prev => [...prev, activePopups[0].id])}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-sm font-medium transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
