import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageSquare, ShoppingBag, Menu, X, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openCart }) => {
  const { siteContent, cartCount, isAdmin, logoutAdmin } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({
    width: 0,
    transform: 'translateX(0px)',
    opacity: 0,
    transition: 'none',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        logoutAdmin();
        setActiveTab('admin-login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [logoutAdmin, setActiveTab]);

  useEffect(() => {
    const updatePill = (smooth = true) => {
      const activeElement = document.getElementById(`nav-btn-${activeTab}`);
      if (activeElement) {
        setPillStyle({
          width: `${activeElement.offsetWidth}px`,
          transform: `translateX(${activeElement.offsetLeft}px)`,
          opacity: 1,
          transition: smooth
            ? 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.3s ease'
            : 'none',
        });
      } else {
        setPillStyle({
          width: 0,
          transform: 'translateX(0px)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        });
      }
    };

    updatePill(false);
    const timeoutId = setTimeout(() => updatePill(false), 50);

    const handleResize = () => updatePill(false);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-2.5 pointer-events-none">
      {/* Liquid Glass Navbar Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-2.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 pointer-events-auto">
        
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition duration-300">
            <img 
              src="/windows-h-logo.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-[15px] font-black tracking-wide uppercase leading-tight text-white font-industrial">
              HSN Cement & Steel
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Building Materials</p>
          </div>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 relative">
          {/* Sliding Active Pill (Liquid Running Effect, No Glow) */}
          <div 
            className="absolute top-1 bottom-1 left-0 bg-white/10 backdrop-blur-md border border-white/20 pointer-events-none transition-all duration-500 shape-liquid"
            style={pillStyle}
          />
          {navLinks.map(link => (
            <button
              id={`nav-btn-${link.id}`}
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative z-10 px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === link.id
                  ? 'text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Quick CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href={`tel:${siteContent.phone}`} 
            className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20"
          >
            📞 Call Now
          </a>

          <a 
            href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-sm font-bold text-white shadow-[0_4px_15px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden lg:inline">WhatsApp</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2.5 bg-black/40 hover:bg-white/10 text-slate-100 border border-white/10 hover:border-white/20 rounded-xl transition shadow-md group cursor-pointer flex items-center justify-center"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-6 h-6 group-hover:text-white transition" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none bg-black/40 border border-white/10 rounded-xl hover:bg-white/10 transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Admin Dashboard */}
          {isAdmin && (
            <button
              onClick={() => {
                logoutAdmin();
                handleNavClick('admin-login');
              }}
              className="hidden sm:flex bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border border-purple-400/40 px-3.5 py-2 rounded-xl text-xs font-black transition items-center space-x-1.5 shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-white" />
              <span className="hidden xl:inline">Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 bg-black/80 border border-white/10 p-4 rounded-2xl space-y-3 shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-3 rounded-xl text-xs font-bold transition text-center border ${
                  activeTab === link.id
                    ? 'bg-gradient-to-r from-pink-500 to-blue-600 text-white font-black shadow-lg border-pink-400/30'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border-transparent hover:border-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col space-y-2">
            <a
              href={`tel:${siteContent.phone}`}
              className="bg-white/10 hover:bg-white/20 text-slate-100 border border-white/10 hover:border-white/20 font-bold py-2.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs transition"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call Store ({siteContent.phone})</span>
            </a>

            <a
              href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-fuchsia-600 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {isAdmin && (
              <button
                onClick={() => {
                  logoutAdmin();
                  handleNavClick('admin-login');
                }}
                className="bg-purple-950/80 text-purple-300 font-bold py-2.5 rounded-xl text-center flex items-center justify-center space-x-2 text-xs border border-purple-500/40"
              >
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
