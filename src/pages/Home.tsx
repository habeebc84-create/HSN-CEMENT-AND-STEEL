import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSection } from '../components/HeroSection';
import { BannerCarousel } from '../components/BannerCarousel';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Testimonials } from '../components/Testimonials';
import { Gallery } from '../components/Gallery';
import { LocationMap } from '../components/LocationMap';
import { ScrollReveal } from '../components/ScrollReveal';
import { Product } from '../types';
import { ArrowRight, Layers, Sparkles, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string, category?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { products, categories } = useStore();
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const featuredSteel = products.filter(p => p.type === 'steel' && p.enabled);
  const featuredBlades = products.filter(p => p.category.includes('Blades') && p.enabled);

  return (
    <div className="space-y-0">
      
      {/* Hero Banner */}
      <HeroSection 
        onShopNow={() => onNavigate('products')} 
        onContactClick={() => onNavigate('contact')} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BannerCarousel />
      </div>

      {/* Featured Cement, Steel & Cutting Blades Showcase Section */}
      <section className="py-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-xs font-black text-white uppercase tracking-widest mb-1">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>FEATURED CATALOGUE</span>
                </div>
                <h2 className="text-3xl font-black text-slate-100">
                  Cement, Steel & Cutting Blades Range
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Click any product to view detailed technical specifications, size options, and quantity estimator.
                </p>
              </div>

              <button
                onClick={() => onNavigate('products')}
                className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition shadow-purple-500/20 shadow-lg border border-purple-400/30 cursor-pointer"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          {/* Cutting Blades Grid */}
          {featuredBlades.length > 0 && (
            <div className="mb-12">
              <ScrollReveal animation="fade-up">
                <h3 className="text-base sm:text-lg font-black text-gradient theme-lovable text-gradient-animated mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <Zap className="w-5 h-5 text-white" />
                  <span>CUTTING BLADES & DISCS (BOSCH & DONGCHENG)</span>
                </h3>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlades.map((product, idx) => (
                  <ScrollReveal key={product.id} animation="scale-up" delay={idx * 100}>
                    <ProductCard 
                      product={product} 
                      onSelectProduct={(p) => setSelectedProductModal(p)}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}



          {/* Steel Cards Grid */}
          <div>
            <ScrollReveal animation="fade-up">
              <h3 className="text-base sm:text-lg font-black text-gradient theme-lovable text-gradient-animated mb-4 flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Layers className="w-5 h-5 text-white" />
                <span>TMT STEEL BARS (6mm - 32mm)</span>
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredSteel.map((product, idx) => (
                <ScrollReveal key={product.id} animation="scale-up" delay={idx * 100}>
                  <ProductCard 
                    product={product} 
                    onSelectProduct={(p) => setSelectedProductModal(p)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-extrabold text-gradient theme-lovable text-gradient-animated uppercase tracking-widest mb-1">Browse Categories</h2>
              <h3 className="text-3xl font-black text-slate-100">Complete Building Materials Range</h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.id} animation="scale-up" delay={idx * 50}>
                <div
                  onClick={() => onNavigate('products', cat.name)}
                  className="antigravity-card rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 hover:border-blue-500/50 transition duration-300 h-full flex flex-col"
                >
                  <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500 hd-img-crisp"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition">{cat.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Gallery Preview */}
      <Gallery onViewAll={() => onNavigate('gallery')} limit={6} />

      {/* Testimonials */}
      <Testimonials />

      {/* Location & Map Banner */}
      <LocationMap />

      {/* Product Details Lightbox Modal */}
      <ProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
      />

    </div>
  );
};
