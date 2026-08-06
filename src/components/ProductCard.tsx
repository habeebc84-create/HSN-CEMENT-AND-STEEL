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
      className="bg-white rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer border border-slate-200 hover:shadow-md transition-shadow relative"
    >
      <div>
        {/* Product Image Box with Quick View Overlay */}
        <div className="relative aspect-video bg-slate-50 overflow-hidden border-b border-slate-100 p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition duration-500 mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-white/60 backdrop-blur-sm">
            <span className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </span>
          </div>

          {/* Brand Tag */}
          <div className="absolute top-3 left-3 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.brand}
          </div>

          {/* Grade Tag */}
          {product.grade && (
            <div className="absolute top-3 right-3 bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
              {product.grade}
            </div>
          )}

          {/* Freshness Signal */}
          <div className="absolute bottom-3 left-3 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-green-200 shadow-sm flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Updated Today</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-blue-600 font-bold uppercase flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5" />
              <span>{product.category}</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">
              <ShieldCheck className="w-3 h-3" />
              <span>Genuine</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 transition leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Size Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <label className="text-[11px] font-bold text-slate-500 block mb-1.5 flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Select Specs:</span>
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
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition ${
                      selectedSize === sizeItem.size
                        ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    {sizeItem.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Stock Header */}
          <div className="pt-3 mt-1 flex items-center justify-between border-t border-slate-100">
            <div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Daily Rate</div>
              <div className="text-xl font-black text-slate-900 tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN')}
                <span className="text-[10px] text-slate-500 font-medium ml-1">
                  / {unitLabel}
                </span>
              </div>
            </div>

            <div className="text-right">
              {currentStock > 0 ? (
                <div className="inline-flex items-center space-x-1 text-green-700 text-[11px] font-bold bg-green-50 px-2 py-1 rounded-md border border-green-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>{currentStock} {unitLabel}s In Stock</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-1 text-red-600 text-[11px] font-bold bg-red-50 px-2 py-1 rounded-md border border-red-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Cart Action */}
      <div className="p-4 pt-0 space-y-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-2">
          
          {/* Qty Counter */}
          <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-slate-500 hover:text-slate-900 font-bold text-sm bg-white hover:bg-slate-50 transition"
              disabled={currentStock === 0}
            >
              -
            </button>
            <span className="px-2 text-xs font-bold text-slate-900 min-w-[28px] text-center border-x border-slate-200">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-slate-500 hover:text-slate-900 font-bold text-sm bg-white hover:bg-slate-50 transition"
              disabled={currentStock === 0}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0 || !product.enabled}
            className={`flex-1 py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition ${
              currentStock > 0 && product.enabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

        </div>
      </div>

    </div>
  );
};

