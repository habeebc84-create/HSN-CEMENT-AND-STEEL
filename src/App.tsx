import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SplashLandingPage } from './components/SplashLandingPage';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { ToastContainer } from './components/ToastContainer';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Order } from './types';

import { TermsPage } from './pages/TermsPage';

const MainContent: React.FC = () => {
  const { isAdmin, logoutAdmin, siteContent } = useStore();
  
  // Synchronous check to avoid Splash screen flash (covers any URL starting with /admin)
  const isInitiallyAdmin = window.location.pathname.toLowerCase().startsWith('/admin');

  const [hasEnteredStore, setHasEnteredStore] = useState<boolean>(isInitiallyAdmin);
  const [isEnteringStore, setIsEnteringStore] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(isInitiallyAdmin ? 'admin-login' : 'home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [hasBypassedMaintenance, setHasBypassedMaintenance] = useState<boolean>(false);

  const isAdminView = activeTab === 'admin-login' || activeTab === 'admin-dashboard';

  // Clean URL and force logout to ensure email & password are always requested
  React.useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/admin')) {
      logoutAdmin();
      window.history.replaceState({}, document.title, '/');
    }
  }, [logoutAdmin]);

  // When admin logs out, redirect from dashboard to home (but NOT from login page)
  React.useEffect(() => {
    if (!isAdmin && activeTab === 'admin-dashboard') {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAdmin, activeTab]);

  // Lock admin to admin-dashboard during maintenance mode
  React.useEffect(() => {
    if (siteContent.maintenanceMode && isAdmin && activeTab !== 'admin-dashboard') {
      setActiveTab('admin-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [siteContent.maintenanceMode, isAdmin, activeTab]);

  const handleOrderCompleted = (order: Order) => {
    setLastPlacedOrder(order);
    setActiveTab('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterStore = (callback?: () => void) => {
    setIsEnteringStore(true);
    setTimeout(() => {
      setHasEnteredStore(true);
      setIsEnteringStore(false);
      if (callback) callback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  if (siteContent.maintenanceMode && !isAdmin && !hasBypassedMaintenance && activeTab !== 'admin-login') {
    return (
      <MaintenanceScreen onBypass={(isCodeOnly) => {
        if (isCodeOnly) {
          setHasBypassedMaintenance(true);
        } else {
          setActiveTab('admin-dashboard');
        }
      }} />
    );
  }

  if (isEnteringStore) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 font-sans selection:bg-pink-500 selection:text-white overflow-hidden">
        {/* Dynamic Construction Wallpaper Background with 3D macOS Drone Motion */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src={siteContent.splashImage || '/splash_bg_ultra_8k.png'} 
            alt="HSN Entering Wallpaper" 
            className="w-full h-full object-cover object-center brightness-50 contrast-125 scale-110 drone-wallpaper-motion"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
        </div>

        {/* Cinematic Multi-Color Mesh Backdrop - Amber, Cyan, Pink & Orange Liquid Glows */}
        <div className="absolute -top-60 -left-60 w-[60rem] h-[60rem] bg-amber-500/25 blur-[140px] shape-liquid animate-glow-1 pointer-events-none z-0"></div>
        <div className="absolute -bottom-60 -right-60 w-[60rem] h-[60rem] bg-blue-500/25 blur-[140px] shape-liquid animate-glow-2 pointer-events-none z-0"></div>
        <div className="absolute -top-40 right-20 w-[50rem] h-[50rem] bg-pink-500/20 blur-[130px] shape-liquid animate-glow-3 pointer-events-none z-0"></div>
        <div className="absolute bottom-20 -left-40 w-[50rem] h-[50rem] bg-pink-500/20 blur-[130px] shape-liquid animate-glow-4 pointer-events-none z-0"></div>
        
        <div className="perspective-[1000px] flex flex-col items-center justify-center h-screen relative z-10 text-center px-4">
          <div className="relative w-72 h-72 preserve-3d animate-logo-3d">
            {/* Front Face */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/20 p-2.5 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img src="/windows-h-logo.png" alt="Logo" className="w-56 h-56 object-contain drop-shadow-2xl" />
            </div>
            {/* Back Face - Apple Style Checkmark */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] bg-fuchsia-500/20 backdrop-blur-xl border border-fuchsia-500/30 p-2.5 shadow-[0_0_60px_rgba(16,185,129,0.2)] flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <svg className="w-40 h-40 text-fuchsia-400 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-white text-3xl font-black tracking-wider uppercase mt-8 font-industrial">
            {siteContent.businessName || 'HSN CEMENT & STEEL'}
          </h2>
          <p className="text-xs text-white font-extrabold tracking-widest uppercase mt-2">
            {siteContent.tagline || 'Premium Building Materials'}
          </p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
            Kalikiri, AP
          </p>

          {/* Fully Animated Progress Bar & Scanner Graph */}
          <div className="w-72 h-[8px] bg-slate-900/60 border border-white/10 rounded-full overflow-hidden mt-8 relative shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="h-full bg-gradient-to-r from-fuchsia-400 via-fuchsia-300 to-white animate-loading-bar relative rounded-full">
              {/* Sweeping Laser Scanner Beam */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-[120px] h-full animate-loader-scan pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-fuchsia-400/80 uppercase tracking-widest font-black mt-3 animate-pulse">
            Authenticating Secure Portal...
          </p>
        </div>
      </div>
    );
  }

  if (!hasEnteredStore) {
    return (
      <SplashLandingPage
        onEnterStore={() => handleEnterStore()}
        onSelectCategory={(catName: string) => {
          handleEnterStore(() => {
            setSelectedCategoryFilter(catName || 'All');
            setActiveTab('products');
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-slate-100 font-sans relative selection:bg-pink-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Global Blue & Pink Theme Ambient Background (hidden in admin) */}
      {!isAdminView && (
        <>
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
            <div className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] bg-pink-600/30 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-[10%] -right-[5%] w-[65vw] h-[65vw] bg-blue-600/30 blur-[100px] rounded-full"></div>
            <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-fuchsia-500/15 blur-[80px] rounded-full"></div>
            <div className="absolute top-[10%] right-[20%] w-[30vw] h-[30vw] bg-violet-600/15 blur-[90px] rounded-full"></div>
          </div>
          
          {/* Subtle Glass Effect */}
          <div className="fixed inset-0 z-0 pointer-events-none bg-black/20 backdrop-blur-[40px]"></div>
        </>
      )}

      {/* Hide public UI elements when in admin view */}
      {!isAdminView && (
        <>
          <AnnouncementTicker />
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              if (tab === 'gateway') {
                setHasEnteredStore(false);
              } else {
                setActiveTab(tab);
              }
            }} 
            openCart={() => setIsCartOpen(true)} 
          />
        </>
      )}

      {/* Main View Router */}
      {isAdminView ? (
        /* Admin views render full-screen without padding */
        <div className="flex-grow relative z-10">
          {activeTab === 'admin-login' && (
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <AdminLogin onSuccess={() => setActiveTab('admin-dashboard')} />
            )
          )}

          {activeTab === 'admin-dashboard' && (
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <AdminLogin onSuccess={() => setActiveTab('admin-dashboard')} />
            )
          )}
        </div>
      ) : (
        <main className="flex-grow relative z-10 pt-4 md:pt-6">
          {activeTab === 'home' && (
            <Home onNavigate={(tab, category) => {
              setActiveTab(tab);
              if (category) {
                setSelectedCategoryFilter(category);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          )}

          {activeTab === 'products' && <ProductsPage initialCategory={selectedCategoryFilter} />}
          {activeTab === 'services' && <ServicesPage />}
          {activeTab === 'gallery' && <GalleryPage />}
          {activeTab === 'about' && <AboutPage />}
          {activeTab === 'contact' && <ContactPage />}
          {activeTab === 'terms' && <TermsPage onNavigate={setActiveTab} />}

          {activeTab === 'checkout' && (
            <CheckoutPage 
              onBackToCart={() => setActiveTab('products')} 
              onOrderCompleted={handleOrderCompleted} 
            />
          )}

          {activeTab === 'order-success' && lastPlacedOrder && (
            <OrderSuccessPage 
              order={lastPlacedOrder} 
              onContinueShopping={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          )}
        </main>
      )}

      {/* Footer & Floating Actions (Hidden in Admin) */}
      {!isAdminView && (
        <>
          <Footer onNavClick={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
          <FloatingActions />
        </>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActiveTab('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      {/* Global Toast Notifications */}
      <ToastContainer />

    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

export default App;
