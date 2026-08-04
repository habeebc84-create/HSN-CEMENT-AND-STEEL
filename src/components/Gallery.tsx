import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Image as ImageIcon, X, ArrowRight } from 'lucide-react';

interface GalleryProps {
  onViewAll?: () => void;
  limit?: number;
}

export const Gallery: React.FC<GalleryProps> = ({ onViewAll, limit }) => {
  const { siteContent, products } = useStore();
  const [activeImage, setActiveImage] = useState<{ url: string; title: string; category: string } | null>(null);

  // Map products to gallery image format
  const galleryItems = products.map((p) => ({
    id: p.id,
    url: p.image,
    title: p.name,
    category: p.category,
  }));

  const imagesToShow = limit ? galleryItems.slice(0, limit) : galleryItems;

  return (
    <section className="py-16 bg-slate-900/30 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-white uppercase tracking-widest mb-1">
              <ImageIcon className="w-4 h-4" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100">
              Warehouse & Stock Gallery
            </h2>
          </div>

          {limit && onViewAll && (
            <button
              onClick={onViewAll}
              className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition border border-slate-700"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imagesToShow.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900 aspect-[4/3]"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-100 transition"></div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded border border-blue-500/30">
                  {img.category}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-1.5">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeImage.url} 
              alt={activeImage.title} 
              className="w-full max-h-[75vh] object-contain bg-slate-950"
            />
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-100">{activeImage.title}</h3>
                <p className="text-xs text-white font-semibold">{activeImage.category} Collection</p>
              </div>
              <a
                href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(activeImage.title)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
