import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Check, AlertTriangle, Layers, Tag, ShieldCheck, Eye, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useStore();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].size : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Dynamic price & stock based on selected size
  let currentPrice = product.price;
  let currentStock = product.stock;

  if (selectedSize && product.sizes) {
    const sizeObj = product.sizes.find(s => s.size === selectedSize);
    if (sizeObj) {
      currentPrice = sizeObj.price;
      currentStock = sizeObj.stock;
    }
  }

  const unitLabel = product.type === 'steel' || product.type === 'wire' ? 'kg' : product.type === 'cement' ? 'bag' : 'unit';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity, selectedSize);
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="construction-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer border border-slate-800 hover:border-blue-500/50 relative"
    >
      <div>
        {/* Product Image Box with Quick View Overlay */}
        <div className="relative aspect-video bg-slate-950 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition duration-500 hd-img-crisp drop-shadow-2xl"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-40"></div>
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-slate-950/40 backdrop-blur-xs">
            <span className="bg-slate-900/90 text-white border border-blue-500/40 text-xs font-bold px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-2">
              <Eye className="w-4 h-4 text-white" />
              <span>Specs & Bulk Calculator</span>
            </span>
          </div>

          {/* Brand Tag */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-blue-500/40 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-md">
            {product.brand}
          </div>

          {/* Grade Tag */}
          {product.grade && (
            <div className="absolute top-3 right-3 bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-xl border border-slate-700 shadow-md backdrop-blur-md">
              {product.grade}
            </div>
          )}

          {/* Freshness Signal */}
          <div className="absolute bottom-3 left-3 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30 shadow flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>Rate Updated Today</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4.5 space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-white font-bold uppercase flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>{product.category}</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-amber-300 font-bold">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Genuine</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-100 transition leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Size Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <label className="text-[11px] font-bold text-slate-300 block mb-1.5 flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-white" />
                <span>Trade Specs:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {product.sizes.map(sizeItem => (
                  <button
                    key={sizeItem.size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(sizeItem.size);
                    }}
                    className={`py-1 px-2 text-[11px] font-bold rounded-xl border transition ${
                      selectedSize === sizeItem.size
                        ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-md font-black'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {sizeItem.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Stock Header */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Daily Rate</div>
              <div className="text-xl font-black text-white tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN')}
                <span className="text-[10px] text-slate-400 font-normal ml-1">
                  / {unitLabel}
                </span>
              </div>
            </div>

            <div className="text-right">
              {currentStock > 0 ? (
                <div className="inline-flex items-center space-x-1 text-fuchsia-400 text-[11px] font-bold bg-fuchsia-500/10 px-2.5 py-1 rounded-lg border border-fuchsia-500/30">
                  <Check className="w-3.5 h-3.5" />
                  <span>{currentStock} {unitLabel}s In Yard</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1 text-rose-400 text-[11px] font-bold bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Cart Action */}
      <div className="p-4.5 pt-0 space-y-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-2">
          
          {/* Qty Counter */}
          <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1.5 text-slate-400 hover:text-white font-bold text-xs"
              disabled={currentStock === 0}
            >
              -
            </button>
            <span className="px-2 text-xs font-black text-slate-100 min-w-[28px] text-center">
              {quantity} {unitLabel}s
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1.5 text-slate-400 hover:text-white font-bold text-xs"
              disabled={currentStock === 0}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button (Solid Clean & Non-Glowy) */}
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0 || !product.enabled}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition ${
              currentStock > 0 && product.enabled
                ? 'bg-white hover:bg-slate-200 text-slate-900 shadow-md active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-slate-900" />
            <span>Add Order</span>
          </button>

        </div>
      </div>

    </div>
  );
};
