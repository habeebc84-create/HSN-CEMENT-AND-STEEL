import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LocationMap } from '../components/LocationMap';
import { Send, Phone, MessageSquare, MapPin, Clock, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteContent, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    materialNeeded: 'Cement & Steel',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      showToast('Please enter your name and mobile number');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry sent successfully!');
  };

  return (
    <div className="py-12 bg-transparent min-h-screen space-y-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100">
            Contact <span className="text-gradient theme-lovable text-gradient-animated">HSN CEMENT AND STEEL</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Get instant price quotes, structural material estimates, or schedule site delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Contact Information Card */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
              Store Details
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Address</div>
                  <div className="text-slate-200 font-semibold">{siteContent.address}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Phone Number</div>
                  <a href={`tel:${siteContent.phone}`} className="text-white font-bold hover:underline">
                    {siteContent.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-pink-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">WhatsApp Number</div>
                  <a href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-pink-400 font-bold hover:underline">
                    {siteContent.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Business Hours</div>
                  <div className="text-slate-200 font-semibold">{siteContent.businessHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex space-x-3">
              <a
                href={`tel:${siteContent.phone}`}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold py-3 rounded-xl text-xs text-center transition"
              >
                Call Store
              </a>
              <a
                href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl text-xs text-center transition"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-slate-100 mb-6">
              Send Price Inquiry / Site Quote Request
            </h3>

            {submitted ? (
              <div className="bg-pink-500/10 border border-pink-500/30 text-fuchsia-300 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-pink-400 mx-auto" />
                <h4 className="text-lg font-bold">Thank You! Your Inquiry Has Been Received.</h4>
                <p className="text-xs text-slate-300">
                  Our store manager will contact you on <strong>{formData.mobile}</strong> shortly with pricing and delivery terms.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-pink-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. K. Venkat Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9848022334"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Materials Requirement</label>
                  <select
                    value={formData.materialNeeded}
                    onChange={(e) => setFormData({ ...formData, materialNeeded: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Cement & Steel">Cement & Steel (Bulk Order)</option>
                    <option value="Cement Only">Cement Bags Only (JSW, ACC, Dalmia, Bharathi)</option>
                    <option value="Steel Only">Tata Tiscon & Vizag Steel TMT Bars</option>
                    <option value="Binding Wires & Nails">Binding Wires & Construction Nails</option>
                    <option value="Pipes & Waterproofing">PVC Pipes, Tanks & Waterproofing</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Site Location & Quantity Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Enter site location in Kalikiri / nearby mandals and estimated quantities..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 text-sm transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <LocationMap />
    </div>
  );
};
