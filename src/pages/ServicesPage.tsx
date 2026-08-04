import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Building2, Truck, Scissors, ShieldCheck, 
  Clock, Phone, MessageSquare, CheckCircle2 
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { siteContent } = useStore();

  const servicesList = [
    {
      title: 'Bulk Supply for Major Construction Projects',
      icon: Building2,
      description: 'We supply high volume cement bags, primary steel rebar bundles, and hardware directly to residential apartments, commercial buildings, and government civil contracts with tiered bulk discounts.',
      features: ['Direct factory dispatch', 'Customized billing schedules', 'Dedicated account coordinator']
    },
    {
      title: 'On-Site Vehicle Express Delivery',
      icon: Truck,
      description: 'Our fleet of heavy lorries and tractors ensures prompt material delivery straight to your construction site across Kalikiri mandal and neighboring regions.',
      features: ['Same-day local dispatch', 'Safe unloading support', 'Live GPS tracking alert']
    },
    {
      title: 'Steel Rebar Cutting & Bending Support',
      icon: Scissors,
      description: 'Custom length cutting and stirrup bending service to save on-site labor time, minimize steel scrap wastage, and speed up structural column/beam work.',
      features: ['Precision bending specs', 'Reduced site scrap', 'Organized bundled tags']
    },
    {
      title: 'Structural Quality Testing & Certification',
      icon: ShieldCheck,
      description: 'Every cement batch and steel rebar ton comes backed with manufacturer quality test certificates (MTC), guaranteeing compliance with IS standards.',
      features: ['Original mill certificates', 'Grade 53 OPC & Fe 550D compliant', '100% genuine guarantee']
    }
  ];

  return (
    <div className="py-12 bg-transparent min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1 bg-blue-500/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>End-to-End Construction Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100">
            Our Premium <span className="text-gradient theme-lovable text-gradient-animated">Services</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            HSN CEMENT AND STEEL offers comprehensive supply, logistics, and site support tailored for contractors, civil engineers, and individual home builders.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((serv, idx) => {
            const IconComp = serv.icon;
            return (
              <div key={idx} className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-blue-500/40 transition duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-white border border-blue-500/30 flex items-center justify-center mb-6">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{serv.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {serv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2 text-xs text-slate-300 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <a
                    href={`tel:${siteContent.phone}`}
                    className="text-white hover:text-amber-300 font-bold text-xs flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call for Quote</span>
                  </a>
                  <a
                    href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}?text=Hi,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(serv.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-pink-600/20 hover:bg-pink-600/30 text-fuchsia-300 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 border border-pink-500/30"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
