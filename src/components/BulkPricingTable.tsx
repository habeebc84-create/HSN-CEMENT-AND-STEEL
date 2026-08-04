import React from 'react';
import { ShieldCheck, Clock, Award, Tag } from 'lucide-react';

export const BulkPricingTable: React.FC = () => {
  const todayDateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const cementTiers = [
    { tier: '1 - 49 Bags', price: '₹380 / bag', note: 'Standard Retail' },
    { tier: '50 - 199 Bags', price: '₹370 / bag', note: 'Contractor Rate (Save ₹10/bag)' },
    { tier: '200+ Bags (Lorry Load)', price: '₹360 / bag', note: 'Direct Yard Wholesale (Save ₹20/bag)' },
  ];

  const steelTiers = [
    { tier: '100 kg - 499 kg', price: '₹68 / kg', note: 'Retail Cut Lengths' },
    { tier: '500 kg - 2 Tons', price: '₹65 / kg', note: 'Site Bundle Rate' },
    { tier: '2+ Tons (Heavy Load)', price: '₹62.50 / kg', note: 'Direct Mill Truck Rate' },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950/85 backdrop-blur-2xl border border-blue-400/40 p-6 sm:p-8 rounded-3xl shadow-[0_15px_45px_-10px_rgba(37,99,235,0.4)]">
      
      {/* Signature Blue & Hot Pink Ambient Liquid Background Lighting */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/35 blur-[90px] shape-liquid pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-600/35 blur-[90px] shape-liquid pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] shape-liquid pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
      
      {/* Freshness Signal Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-blue-500/20 border border-blue-400/40 px-3.5 py-1 rounded-full text-xs font-black text-white shadow-md">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span>DAILY MARKET PRICE INDEX</span>
          </div>
          <h3 className="text-xl font-black text-white font-industrial mt-2 tracking-tight">
            Wholesale Tiered Pricing Table
          </h3>
        </div>

        <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700/80 text-xs font-bold text-slate-200 flex items-center space-x-2 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Rates Updated: <strong className="text-white">Today ({todayDateStr})</strong></span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Cement Table */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-blue-500/30 shadow-lg space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
            <h4 className="font-extrabold text-white flex items-center space-x-2">
              <Tag className="w-4 h-4 text-white" />
              <span>Cement Bags (OPC 53 / PPC 50kg)</span>
            </h4>
            <span className="text-[10px] text-white font-black bg-blue-600/30 px-2 py-0.5 rounded-md border border-blue-400/30">JSW / ACC / Dalmia</span>
          </div>

          <div className="space-y-2 text-xs">
            {cementTiers.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-950/80 hover:bg-slate-900 rounded-xl border border-slate-800/80 transition duration-200 shadow-sm">
                <div>
                  <div className="font-bold text-slate-100">{t.tier}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{t.note}</div>
                </div>
                <div className="font-black text-white text-sm">{t.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Steel Rebar Table */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-pink-500/30 shadow-lg space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
            <h4 className="font-extrabold text-white flex items-center space-x-2">
              <Tag className="w-4 h-4 text-pink-400" />
              <span>TMT Steel Bars (6mm - 32mm Fe 550D)</span>
            </h4>
            <span className="text-[10px] text-pink-300 font-black bg-pink-600/30 px-2 py-0.5 rounded-md border border-pink-400/30">Tata Tiscon / Vizag</span>
          </div>

          <div className="space-y-2 text-xs">
            {steelTiers.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-950/80 hover:bg-slate-900 rounded-xl border border-slate-800/80 transition duration-200 shadow-sm">
                <div>
                  <div className="font-bold text-slate-100">{t.tier}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{t.note}</div>
                </div>
                <div className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200 text-sm">{t.price}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="text-[11px] text-slate-300 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
        <div className="flex items-center space-x-1.5 text-white font-bold">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Includes GST Invoice & BIS Mill Test Certificate</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-200 font-bold">
          <Award className="w-4 h-4 text-pink-400" />
          <span>Kalikiri Yard Direct Crane Loading</span>
        </div>
      </div>
      </div>

    </div>
  );
};
