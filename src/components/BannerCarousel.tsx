import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BannerCarousel: React.FC = () => {
  const { banners } = useStore();
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl group my-8">
      {/* Aspect ratio container (e.g., 21:9 for banners) */}
      <div className="relative w-full pt-[40%] sm:pt-[35%] md:pt-[25%] lg:pt-[20%]">
        
        {/* Slides */}
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover object-center contrast-110 saturate-105 brightness-105"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40"></div>
          </div>
        ))}

        {/* Controls (visible on hover) */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600/50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600/50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx ? 'w-8 h-2 bg-blue-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]' : 'w-2 h-2 bg-slate-900/40 hover:bg-slate-900/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
