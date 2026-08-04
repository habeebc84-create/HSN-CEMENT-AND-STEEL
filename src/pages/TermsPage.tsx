import React from 'react';
import { ShieldCheck, Truck, Scale, FileText, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface TermsPageProps {
  onNavigate: (tab: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate: _onNavigate }) => {
  const { siteContent } = useStore();

  const sections = [
    {
      icon: Scale,
      title: '1. Price & Daily Market Rate Variation Policy',
      content: 'Prices for TMT Steel Rebar (Tata Tiscon, Vizag Steel, Rajaram), Cement (JSW, ACC, Dalmia, Bharathi), Binding Wire, and Roofing Sheets fluctuate daily based on primary steel mill rates, factory revisions, and fuel tariffs. Quoted rates or website catalog prices are subject to confirmation at the exact time of order booking and dispatch.'
    },
    {
      icon: ShieldCheck,
      title: '2. Quantity, Weight & Tonnage Variation Tolerance',
      content: 'Bundle weights for TMT steel bars (6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm) and binding wire coils may vary by +/- 1% to 3% according to standard ISI manufacturing rolling tolerances and bundle wrapping. Final invoice billing is based on actual government-calibrated digital weighbridge weighment slips at dispatch.'
    },
    {
      icon: Truck,
      title: '3. Site Delivery & Vehicle Accessibility Conditions',
      content: 'Express site delivery is provided across Kalikiri and nearby mandals. The purchaser must ensure an unobstructed, motorable access road for heavy logistics trucks and tractors. Vehicle unloading will be performed at the nearest safe, accessible location.'
    },
    {
      icon: FileText,
      title: '4. Returns, Damaged Cement & Custom Processed Goods',
      content: 'Cement bags damaged in transit by our transport fleet will be replaced immediately upon arrival. However, custom cut-to-length steel rebar, bent rebar bundles, cut roofing sheets, or opened cement bags exposed to weather after unloading cannot be canceled or returned.'
    },
    {
      icon: CheckCircle2,
      title: '5. Brand Packaging & Visual Illustration Disclaimer',
      content: 'Product images and brand illustrations on the website are for visual catalog guidance. Actual bag print batch numbers, factory color coatings, or rebar bundle tags may vary according to the latest manufacturer manufacturing batches.'
    },
    {
      icon: Scale,
      title: '6. Payment Terms & Weighment Receipt Acceptance',
      content: 'We accept Cash on Delivery (COD), UPI (PhonePe, Google Pay, Paytm), and Direct Bank Wire. Customers or site representatives are required to inspect the delivered load, verify the weighment slip, and provide payment upon vehicle arrival.'
    }
  ];

  return (
    <div className="py-12 bg-transparent text-slate-100 min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Store Policy & Terms of Supply</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-industrial">
            TERMS & CONDITIONS
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            Operational guidelines, quality assurance, weighing scale verification, and delivery terms for HSN Cement & Steel, Kalikiri.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {sections.map((sec, idx) => {
            const IconComp = sec.icon;
            return (
              <div key={idx} className="glassy-card p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{sec.title}</h3>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-13">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Footer Banner */}
        <div className="mt-12 glassy-card p-8 rounded-3xl border border-amber-500/30 text-center space-y-4 shadow-2xl">
          <h3 className="text-xl font-black text-white font-industrial">Have Questions About Order Terms?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Our team in Kalikiri is available 7 days a week from 7:00 AM to 7:00 PM to assist home builders and contractors.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href={`tel:${siteContent.phone}`}
              className="bg-slate-900/10 hover:bg-slate-900/20 border border-white/30 text-white font-bold px-6 py-3 rounded-2xl text-xs transition flex items-center space-x-2 shadow-lg"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call ({siteContent.phone})</span>
            </a>
            <a
              href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="safety-pink-btn text-white px-6 py-3 rounded-2xl text-xs font-black transition flex items-center space-x-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Store</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
