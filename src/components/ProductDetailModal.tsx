import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  X, ShoppingBag, Check, AlertTriangle, Layers, 
  Tag, ShieldCheck, Truck, MessageSquare, Info, 
  Calculator
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useStore();

  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'calculator'>('overview');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0].size : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Calculator State
  const [constructionAreaSqFt, setConstructionAreaSqFt] = useState<number>(1000);

  if (!product) return null;

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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    onClose();
  };

  // Quantity estimator logic
  const estimatedQuantity = product.type === 'cement' 
    ? Math.ceil(constructionAreaSqFt * 0.4) // ~400 bags per 1000 sq ft RCC construction
    : product.type === 'steel'
    ? Math.ceil(constructionAreaSqFt * 3.5) // ~3.5 kg per sq ft
    : Math.ceil(constructionAreaSqFt / 100);

  const estimatedTotalCost = estimatedQuantity * currentPrice;

  const whatsappMsg = `Hi, I am inquiring about *${product.name}* ${selectedSize ? `(${selectedSize})` : ''}. Price: ₹${currentPrice}. Please provide delivery quote to Kalikiri.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-slate-900 border-2 border-blue-500/40 rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(245,158,11,0.3)] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-slate-700 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black text-white uppercase tracking-widest">
              <Layers className="w-4 h-4 text-white" />
              <span>{product.category} — Product Info</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-0.5">
              {product.name}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-slate-950 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl border border-blue-500/30">
              Brand: {product.brand}
            </span>
          </div>
        </div>

        {/* Tab Navigation: ONLY Price & Calculation */}
        <div className="flex items-center space-x-3 bg-slate-950 px-6 py-3 border-b border-slate-800">
          {[
            { id: 'overview', label: '1. Price & Product Details', icon: Info },
            { id: 'calculator', label: '2. Quantity & Cost Calculation', icon: Calculator },
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                  activeDetailTab === tab.id
                    ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-md font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* ================= TAB 1: PRICE & DETAILS ================= */}
          {activeDetailTab === 'overview' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Product Image Lightbox */}
              <div className="lg:col-span-6 relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-700 hd-img-crisp drop-shadow-2xl" 
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/90 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center space-x-1 text-pink-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>100% Genuine Plant Certified</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white font-bold">
                    <Truck className="w-4 h-4" />
                    <span>Kalikiri Site Delivery</span>
                  </div>
                </div>
              </div>

              {/* Purchasing & Price Controls */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-bold uppercase">Wholesale Price Rate</div>
                  <div className="text-3xl font-black text-white">
                    ₹{currentPrice.toLocaleString('en-IN')}
                    <span className="text-xs text-slate-400 font-normal ml-1">
                      {product.type === 'steel' || product.type === 'wire' ? '/ kg' : product.type === 'cement' ? '/ bag' : '/ unit'}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {currentStock > 0 ? (
                      <span className="text-pink-400 text-xs font-bold bg-pink-500/10 px-3 py-1 rounded-lg border border-pink-500/30 flex items-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>In Stock ({currentStock} available)</span>
                      </span>
                    ) : (
                      <span className="text-rose-400 text-xs font-bold bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/30 flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Out of Stock</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {product.description}
                </p>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5 text-white" />
                      <span>Select Size / Gauge Variant:</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.sizes.map(sizeObj => (
                        <button
                          key={sizeObj.size}
                          type="button"
                          onClick={() => setSelectedSize(sizeObj.size)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                            selectedSize === sizeObj.size
                              ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-lg font-black'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {sizeObj.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-slate-400 font-bold text-sm">-</button>
                      <span className="px-3 text-sm font-black text-slate-100 min-w-[28px] text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-slate-400 font-bold text-sm">+</button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={currentStock === 0}
                      className={`flex-1 py-3.5 rounded-xl font-black text-sm flex items-center justify-center space-x-2 transition ${
                        currentStock > 0 ? 'bg-white hover:bg-slate-200 text-slate-900 shadow-md active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart (₹{(currentPrice * quantity).toLocaleString('en-IN')})</span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/919179173040?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-fuchsia-900/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 2: QUANTITY & COST CALCULATION ================= */}
          {activeDetailTab === 'calculator' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-gradient theme-lovable text-gradient-animated flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-white" />
                <span>Site Material Quantity & Cost Calculation</span>
              </h3>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Enter Built-Up Construction Area (Square Feet):</label>
                  <input
                    type="number"
                    value={constructionAreaSqFt}
                    onChange={(e) => setConstructionAreaSqFt(Math.max(100, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-800 text-white font-bold text-base px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400">Calculated Quantity Needed:</div>
                    <div className="text-xl font-black text-slate-100 mt-1">
                      {estimatedQuantity} {product.type === 'cement' ? 'Bags' : product.type === 'steel' ? 'Kg Rebar' : 'Units'}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-400">Calculated Total Cost:</div>
                    <div className="text-xl font-black text-white mt-1">
                      ₹{estimatedTotalCost.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuantity(estimatedQuantity);
                    setActiveDetailTab('overview');
                  }}
                  className="w-full gold-btn-glow text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg"
                >
                  Apply Calculated Quantity ({estimatedQuantity} units) to Order
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
