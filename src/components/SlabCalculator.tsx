import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SlabCalculator: React.FC = () => {
  const { products, addToCart, showToast } = useStore();
  const [lengthInput, setLengthInput] = useState<string>('40');
  const [widthInput, setWidthInput] = useState<string>('25');

  // Parse inputs safely
  const length = useMemo(() => {
    const parsed = parseFloat(lengthInput);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [lengthInput]);

  const width = useMemo(() => {
    const parsed = parseFloat(widthInput);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [widthInput]);

  const areaSqFt = length * width;

  // Standard RCC Slab estimation per 100 sq ft
  const multiplier = areaSqFt / 100;
  const estimatedCementBags = Math.ceil(multiplier * 40);
  const estimatedSteelKg = Math.ceil(multiplier * 350);
  const estimatedSteelTons = (estimatedSteelKg / 1000).toFixed(2);
  const estimatedWireKg = Math.ceil(multiplier * 3.5);

  const cementPricePerBag = 380;
  const steelPricePerKg = 65;
  const wirePricePerKg = 85;

  const totalCementCost = estimatedCementBags * cementPricePerBag;
  const totalSteelCost = estimatedSteelKg * steelPricePerKg;
  const totalWireCost = estimatedWireKg * wirePricePerKg;
  const grandTotalCost = totalCementCost + totalSteelCost + totalWireCost;

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setter(val);
    }
  };

  const handleReset = () => {
    setLengthInput('40');
    setWidthInput('25');
  };

  const handleAddEstimateToCart = () => {
    if (areaSqFt <= 0) {
      showToast('Please enter valid length and width.');
      return;
    }

    const cementProd = products.find(p => p.type === 'cement');
    const steelProd = products.find(p => p.type === 'steel');
    let added = 0;

    if (cementProd && estimatedCementBags > 0) { addToCart(cementProd, estimatedCementBags); added++; }
    if (steelProd && estimatedSteelKg > 0) { addToCart(steelProd, estimatedSteelKg); added++; }

    if (added > 0) {
      showToast(`Added estimated materials for ${areaSqFt.toLocaleString('en-IN')} sq.ft to cart.`);
    } else {
      showToast('No matching products found in inventory.');
    }
  };

  const hasResults = areaSqFt > 0;

  return (
    <div className="relative overflow-hidden border border-blue-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/steel_banner_new.png" 
          alt="Calculator Background" 
          className="w-full h-full object-cover object-center opacity-40 contrast-110 saturate-105"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4 text-white" />
            <span>INSTANT SITE ESTIMATOR</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 font-industrial">
            Material Calculator
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Length × Width Input */}
        <div className="lg:col-span-6 space-y-4 text-xs">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Length (Feet):</label>
              <input
                type="text"
                inputMode="decimal"
                value={lengthInput}
                onChange={handleInputChange(setLengthInput)}
                placeholder="e.g. 40"
                className="w-full bg-slate-950 border border-slate-800 text-white font-bold text-base px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">Width (Feet):</label>
              <input
                type="text"
                inputMode="decimal"
                value={widthInput}
                onChange={handleInputChange(setWidthInput)}
                placeholder="e.g. 25"
                className="w-full bg-slate-950 border border-slate-800 text-white font-bold text-base px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Calculated Area */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400 font-bold">Total Area:</span>
            <span className="text-white font-black text-base">{hasResults ? `${areaSqFt.toLocaleString('en-IN')} sq.ft` : '—'}</span>
          </div>

          {/* Material Breakdown */}
          {hasResults && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-slate-400">
              <div className="flex justify-between">
                <span>Cement (OPC 53 / PPC):</span>
                <strong className="text-slate-100">{estimatedCementBags} Bags (₹{totalCementCost.toLocaleString('en-IN')})</strong>
              </div>
              <div className="flex justify-between">
                <span>TMT Steel Rebar (Fe 550D):</span>
                <strong className="text-slate-100">{estimatedSteelKg} Kg / {estimatedSteelTons} Tons (₹{totalSteelCost.toLocaleString('en-IN')})</strong>
              </div>
              <div className="flex justify-between">
                <span>Binding Wire (18G/20G):</span>
                <strong className="text-slate-100">{estimatedWireKg} Kg (₹{totalWireCost.toLocaleString('en-IN')})</strong>
              </div>
            </div>
          )}

        </div>

        {/* Right: Total Cost & Add to Cart */}
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Total Cost</span>
          <div className="text-3xl sm:text-4xl font-black text-gradient theme-lovable text-gradient-animated">
            {hasResults ? `₹${grandTotalCost.toLocaleString('en-IN')}` : '₹0'}
          </div>

          {hasResults && (
            <div className="text-[11px] text-slate-400 font-semibold">
              For <strong className="text-slate-200">{length} ft × {width} ft = {areaSqFt.toLocaleString('en-IN')} sq.ft</strong>
            </div>
          )}

          <div className="flex items-center justify-center space-x-2 text-xs text-pink-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Free Site Delivery in Kalikiri Zone</span>
          </div>

          <button
            onClick={handleAddEstimateToCart}
            disabled={!hasResults}
            className={`w-full py-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl transition ${
              hasResults
                ? 'safety-pink-btn active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {hasResults ? (
              <span>Add {estimatedCementBags} Bags & {estimatedSteelKg}kg Steel to Cart</span>
            ) : (
              <span>Enter Length & Width</span>
            )}
            {hasResults && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
      </div>
    </div>
  );
};
