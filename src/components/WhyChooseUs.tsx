import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { 
  ShieldCheck, Award, DollarSign, Truck, 
  Package, Users, Headphones, Clock 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    { title: 'Genuine Products', desc: '100% original cement bags & factory certified TMT steel rebar.', icon: ShieldCheck },
    { title: 'Best Quality', desc: 'Grade 53 OPC, PPC water shield & Fe 550D high duct steel.', icon: Award },
    { title: 'Competitive Prices', desc: 'Direct mill pricing with zero middleman markups.', icon: DollarSign },
    { title: 'Fast Delivery', desc: 'Own tractor & heavy lorry fleet for prompt site unloading.', icon: Truck },
    { title: 'Bulk Orders', desc: 'Special wholesale rates for residential complexes & contractors.', icon: Package },
    { title: 'Trusted Dealer', desc: 'Authorized supplier for JSW, ACC, Tata Tiscon & Vizag Steel.', icon: Users },
    { title: 'Customer Support', desc: 'Dedicated line for quantity estimation & site coordination.', icon: Headphones },
    { title: 'Same Day Delivery', desc: 'Orders placed before 2 PM dispatched same day in Kalikiri.', icon: Clock }
  ];

  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gradient theme-lovable text-gradient-animated mb-2">Why Choose Us</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Why Contractors & Home Builders Trust <span className="text-gradient theme-lovable text-gradient-animated">HSN CEMENT AND STEEL</span>
            </h3>
            <p className="text-slate-400 text-sm mt-3">
              We power building projects across Kalikiri and Annamayya district with uncompromised quality and speed.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <ScrollReveal key={idx} animation="scale-up" delay={idx * 75}>
                <div className="antigravity-card p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-white border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-slate-950 transition duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mb-2">{card.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
