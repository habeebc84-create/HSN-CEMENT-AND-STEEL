import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MessageSquare, ShoppingBag, Menu, X, UserCheck, Search, Heart, User } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openCart }) => {
  const { siteContent, cartCount, isAdmin, logoutAdmin } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    // Sync URL hash for user portal pages
    const hashMap: Record<string, string> = {
      home: '/home', products: '/products', services: '/services',
      gallery: '/gallery', about: '/about', contact: '/contact',
    };
    if (hashMap[id]) window.location.hash = '#' + hashMap[id];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Header / Contact Info */}
      <div className="bg-slate-50 border-b border-slate-200 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-xs text-slate-500 font-medium">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> {siteContent.phone}</span>
            <span className="flex items-center gap-1.5 text-green-600 font-semibold"><MessageSquare className="w-3.5 h-3.5"/> WhatsApp Available</span>
          </div>
          <div>
            <span>Premium Building Materials • Delivered to your site</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/windows-h-logo.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-[18px] font-black tracking-tight uppercase leading-tight text-slate-900 font-industrial">
              HSN Cement & Steel
            </h2>
          </div>
        </div>

        {/* Center: Search Bar (Figma Style) */}
        <div className="hidden lg:flex flex-1 max-w-xl px-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white text-sm rounded-full py-2.5 pl-4 pr-10 outline-none transition"
              disabled
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Icons & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden sm:flex text-slate-600 hover:text-slate-900 transition flex-col items-center gap-1 cursor-not-allowed">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium hidden lg:block">Account</span>
          </button>
          
          <button className="hidden sm:flex text-slate-600 hover:text-slate-900 transition flex-col items-center gap-1 cursor-not-allowed">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-medium hidden lg:block">Wishlist</span>
          </button>

          <button
            onClick={openCart}
            className="relative text-slate-600 hover:text-slate-900 transition flex flex-col items-center gap-1 cursor-pointer"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium hidden lg:block">Cart</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <nav className="flex items-center gap-8 py-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold transition-colors ${
                  activeTab === link.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 shadow-lg flex flex-col gap-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`py-3 px-4 rounded-lg text-sm font-semibold transition text-left ${
                activeTab === link.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="h-px bg-slate-200 my-2"></div>
          
          <a
            href={`tel:${siteContent.phone}`}
            className="py-3 px-4 text-sm font-semibold text-slate-600 flex items-center gap-3"
          >
            <Phone className="w-4 h-4" /> Call Store ({siteContent.phone})
          </a>
          <a
            href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
            className="py-3 px-4 text-sm font-semibold text-green-600 flex items-center gap-3"
          >
            <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
          </a>

          {isAdmin && (
            <button
              onClick={() => {
                logoutAdmin();
                window.location.hash = '#/0x8f3a9c';
              }}
              className="mt-2 py-3 px-4 text-sm font-semibold text-purple-600 bg-purple-50 rounded-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Admin Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
};
