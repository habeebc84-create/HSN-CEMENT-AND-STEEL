import React from 'react';
import { Star, Quote, UserCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'K. Venkat Reddy',
      role: 'Building Contractor, Kalikiri',
      text: 'Good quality materials and reliable service. Sourced 200 bags of JSW Cement and 3 Tons of Tata Tiscon steel for my residential apartment project. Prompt site delivery!',
      rating: 5,
      date: 'Recent Order'
    },
    {
      name: 'M. Sreenivasulu',
      role: 'Home Owner',
      text: 'Best prices and quick delivery in Kalikiri! Saved a lot compared to other shop quotes. Store staff helped calculate exact cement & rebar requirements.',
      rating: 5,
      date: 'Verified Buyer'
    },
    {
      name: 'P. Ramanjaneyulu',
      role: 'Structural Civil Engineer',
      text: 'Highly recommended for construction materials. Genuine ACC & Bharathi cement with factory batch test certificates. Zero hassle ordering.',
      rating: 5,
      date: 'Regular Client'
    }
  ];

  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 bg-blue-500/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100">
            What Our Customers Say About <span className="text-gradient theme-lovable text-gradient-animated">HSN Cement & Steel</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Read testimonials from contractors, civil engineers, and home owners across Annamayya District.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between relative">
              <Quote className="w-8 h-8 text-white/20 absolute top-4 right-4" />
              
              <div>
                <div className="flex items-center space-x-1 text-white mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-400 text-white" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-white font-bold text-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{rev.name}</h4>
                  <div className="text-xs text-white font-medium">{rev.role}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
