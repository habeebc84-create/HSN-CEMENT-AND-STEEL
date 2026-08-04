import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { MapPin, Phone, User, FileText, CreditCard, ArrowLeft, CheckCircle2, Package } from 'lucide-react';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToCart, onOrderCompleted }) => {
  const { cart, cartTotal, cartCount, placeOrder, showToast, deliveryLocations, siteContent } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online Payment (UPI)'>('Cash on Delivery');
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);

  const activeLocation = deliveryLocations.find(l => l.name === selectedLocationName) 
    || deliveryLocations[0] 
    || { name: 'Kalikiri Yard (Self Pick-up)', charge: 0 };

  // Loading and unloading charges calculation: ₹5 per bag of cement, ₹20 per pack/bundle of steel
  const loadingCharge = cart.reduce((sum, item) => {
    if (item.product.type === 'cement') {
      return sum + (item.quantity * 5);
    }
    if (item.product.type === 'steel' || item.product.type === 'wire') {
      return sum + (item.quantity * 20);
    }
    return sum;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-200">Your Cart is Empty</h2>
        <button
          onClick={onBackToCart}
          className="saas-primary-btn px-5 py-2.5 rounded-xl text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !mobileNumber || !deliveryAddress || !landmark) {
      showToast('Please fill in Name, Mobile, Address, and Landmark.');
      return;
    }

    if (mobileNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsPlacingOrder(true);
    
    // Spin animation for 1.5s
    setTimeout(() => {
      setShowSuccessTick(true);
      // Show tick for 1s then complete
      setTimeout(() => {
        const order = placeOrder(
          { name: customerName, mobile: mobileNumber, address: deliveryAddress, landmark },
          paymentMethod,
          notes,
          activeLocation.name,
          activeLocation.charge,
          loadingCharge
        );
        onOrderCompleted(order);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="py-8 sm:py-12 min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-950 via-indigo-950/40 to-blue-950/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <button
          onClick={onBackToCart}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 font-industrial tracking-tight">
          Secure <span className="text-white">Checkout</span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-[2rem] space-y-6 shadow-2xl">
            <h2 className="text-lg font-black text-slate-100 flex items-center space-x-2 border-b border-white/10 pb-4">
              <MapPin className="w-5 h-5 text-white" />
              <span>Delivery Details</span>
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-5 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Contractor / Builder Name</label>
                <div className="relative group">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-white transition" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3 pl-11 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition shadow-inner placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Mobile Number (WhatsApp)</label>
                <div className="relative group">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-white transition" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    placeholder="10-digit mobile number"
                    className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3 pl-11 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition shadow-inner placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Construction Site Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  rows={3}
                  placeholder="Door No, Street Name, Village/Mandal, Kalikiri"
                  className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition shadow-inner placeholder-slate-600 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Delivery Destination / Transport Zone</label>
                <select
                  value={activeLocation.name}
                  onChange={(e) => setSelectedLocationName(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3.5 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition"
                >
                  {deliveryLocations.map((loc, idx) => (
                    <option key={idx} value={loc.name} className="bg-slate-950 text-slate-100">
                      {loc.name} (Charge: {loc.charge === 0 ? 'FREE' : `₹${loc.charge.toLocaleString('en-IN')}`})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Landmark / Unloading Point</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                  placeholder="Near Water Tank / Panchayat Office"
                  className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition shadow-inner placeholder-slate-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1.5 ml-1">Special Site Delivery Notes (Optional)</label>
                <div className="relative group">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-white transition" />
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Unload near column foundation"
                    className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-100 p-3 pl-11 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-slate-900/80 transition shadow-inner placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <label className="font-bold text-slate-200 block mb-3 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-white" />
                  <span>Select Payment Mode</span>
                </label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'bg-blue-500/20 text-white border-blue-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950/50 text-slate-400 border-slate-700/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Online Payment (UPI)')}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'Online Payment (UPI)'
                        ? 'bg-blue-500/20 text-white border-blue-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950/50 text-slate-400 border-slate-700/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <span>Online UPI / QR</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full safety-pink-btn py-4 sm:py-5 rounded-2xl font-black text-sm sm:text-base shadow-2xl mt-6 tracking-wide"
              >
                CONFIRM & PLACE ORDER
              </button>
            </form>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl text-sm sticky top-28">
              <h3 className="text-lg font-black text-slate-100 border-b border-white/10 pb-4 flex justify-between items-center mb-6">
                <span>Order Summary</span>
                <span className="bg-blue-500/20 text-white px-3 py-1 rounded-full text-xs">{cartCount} Items</span>
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, idx) => {
                  let unitPrice = item.product.price;
                  if (item.selectedSize && item.product.sizes) {
                    const sizeObj = item.product.sizes.find(s => s.size === item.selectedSize);
                    if (sizeObj) unitPrice = sizeObj.price;
                  }
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div key={idx} className="flex justify-between items-center bg-slate-950/40 p-3 rounded-2xl border border-white/5 hover:border-blue-500/30 transition">
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-slate-200 line-clamp-1">{item.product.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity} {item.selectedSize ? `(${item.selectedSize})` : ''}</div>
                      </div>
                      <div className="font-black text-white whitespace-nowrap">₹{itemTotal.toLocaleString('en-IN')}</div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Cart Items Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Delivery Transport Charge</span>
                  <span className={activeLocation.charge === 0 ? 'text-fuchsia-400 font-bold' : 'text-slate-100'}>
                    {activeLocation.charge === 0 ? 'FREE' : `₹${activeLocation.charge.toLocaleString('en-IN')}`}
                  </span>
                </div>
                {loadingCharge > 0 && (
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>Loading & Unloading Handling</span>
                    <span>₹{loadingCharge.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between items-end pt-4 border-t border-white/10 mt-2">
                  <span className="text-sm font-bold text-slate-300 mb-1">Total Payable Amount</span>
                  <span className="text-2xl font-black text-white">
                    ₹{(cartTotal + activeLocation.charge + loadingCharge).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Order Processing Overlay */}
      {isPlacingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 p-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-6">
            {!showSuccessTick ? (
              <>
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  {siteContent.logoUrl ? (
                    <img src={siteContent.logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
                  ) : (
                    <Package className="w-12 h-12 text-blue-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-200 animate-pulse">Processing Order...</h3>
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center animate-[scale-in_0.4s_ease-out_forwards] shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-emerald-400 animate-[fade-in_0.4s_ease-out_forwards]">Order Successful!</h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
