import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const { siteContent } = useStore();

  return (
    <section className="py-16 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Contact Banner Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1 text-xs font-bold text-white uppercase tracking-widest mb-1">
                <MapPin className="w-4 h-4" />
                <span>Visit Store</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-100">
                {siteContent.businessName}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {siteContent.address}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Address</h4>
                  <p className="text-sm font-semibold text-slate-200">{siteContent.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Call Hotline</h4>
                  <p className="text-sm font-semibold text-slate-200">{siteContent.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <MessageSquare className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">WhatsApp Order Desk</h4>
                  <p className="text-sm font-semibold text-slate-200">{siteContent.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <Clock className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Business Hours</h4>
                  <p className="text-sm font-semibold text-slate-200">{siteContent.businessHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${siteContent.phone}`}
                className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-blue-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-fuchsia-900/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteContent.businessName + ' ' + siteContent.address)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition border border-slate-700"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 h-[380px] rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative group">
            <iframe
              title="HSN Cement & Steel Kalikiri Map"
              src={siteContent.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />
            
            {/* Store Address Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/5 backdrop-blur-[40px] border border-white/10 p-4 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] max-w-xs space-y-2 pointer-events-auto">
              <div className="flex items-center space-x-2 text-white font-extrabold text-xs">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>STORE LOCATION</span>
              </div>
              <h3 className="text-sm font-black text-white leading-tight">
                {siteContent.businessName}
              </h3>
              <p className="text-[11px] text-slate-300 font-medium">
                {siteContent.address}
              </p>
              <div className="pt-1 flex items-center justify-between border-t border-slate-800 text-[11px]">
                <span className="text-slate-400 font-semibold">📞 {siteContent.phone}</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteContent.businessName + ' ' + siteContent.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:underline font-bold flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-white" />
                  <span>Map Pin</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
