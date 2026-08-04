import React, { useEffect } from 'react';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, ShoppingBag, Phone, MessageSquare } from 'lucide-react';

interface OrderSuccessPageProps {
  order: Order;
  onContinueShopping: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onContinueShopping }) => {
  const { siteContent } = useStore();
  const [showTick, setShowTick] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTick(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500); // 1.5 seconds for spinning effect
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = () => {
    generateInvoicePDF(order, siteContent);
  };

  // WhatsApp formatted order text
  const whatsappMsg = `*NEW ORDER PLACED ON WEBSITE*%0A*Order ID:* ${order.id}%0A*Customer:* ${order.customerName}%0A*Phone:* ${order.mobileNumber}%0A*Delivery Address:* ${order.deliveryAddress}%0A*Landmark:* ${order.landmark}%0A*Total Amount:* â‚¹${order.totalAmount.toLocaleString('en-IN')}%0A*Payment:* ${order.paymentMethod}%0A%0APlease process my site dispatch.`;

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {!showTick ? (
            <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
              <img 
                src={siteContent.logoUrl} 
                alt="Logo" 
                className="w-12 h-12 object-contain"
                style={{ animation: 'spin 0.75s linear 2' }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40 flex items-center justify-center mx-auto mb-2 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-[bounce_0.5s_ease-out]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          )}
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
            Order Placed Successfully!
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Thank you for ordering with <strong className="text-white">{siteContent.businessName}</strong>. Your order is registered under reference ID:
          </p>
          <div className="inline-block bg-slate-950 border border-blue-500/40 text-gradient theme-lovable text-gradient-animated font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl">
            #{order.id}
          </div>
        </div>

        {/* Action Buttons (Moved Above Order Details) */}
        {showTick && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-[slideIn_0.4s_ease-out]">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice PDF</span>
            </button>

            <a
              href={`https://wa.me/${siteContent.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-fuchsia-900/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Store</span>
            </a>

            <a
              href={`tel:${siteContent.phone}`}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition border border-slate-700"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call Store</span>
            </a>

            <button
              onClick={onContinueShopping}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition border border-blue-500/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        )}

        {/* Order Details Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-100">Order Summary & Delivery Ticket</h3>
            <span className="bg-blue-500/10 text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">
              {order.orderStatus.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Customer Name:</span>
              <span className="text-slate-100 font-bold text-sm">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Mobile Number:</span>
              <span className="text-slate-100 font-bold text-sm">{order.mobileNumber}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block font-semibold">Delivery Address:</span>
              <span className="text-slate-200 font-medium">{order.deliveryAddress} (Landmark: {order.landmark})</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Estimated Delivery:</span>
              <span className="text-white font-bold">{order.estimatedDelivery}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Payment Method:</span>
              <span className="text-slate-200 font-bold">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Ordered Items ({order.totalQuantity} Units)</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-100">{item.product.name}</span>
                    {item.selectedSize && (
                      <span className="text-white font-semibold ml-2">({item.selectedSize})</span>
                    )}
                    <div className="text-[10px] text-slate-400">Qty: {item.quantity} x â‚¹{item.unitPrice}</div>
                  </div>
                  <div className="font-bold text-white text-sm">
                    â‚¹{item.totalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fees Breakdown */}
          {((order.deliveryCharge && order.deliveryCharge > 0) || (order.loadingCharge && order.loadingCharge > 0)) && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              {order.deliveryLocation && (
                <div className="flex justify-between">
                  <span>Delivery Zone:</span>
                  <span className="font-semibold text-slate-200">{order.deliveryLocation}</span>
                </div>
              )}
              {order.deliveryCharge !== undefined && (
                <div className="flex justify-between">
                  <span>Delivery Transport Charge:</span>
                  <span className="font-bold text-slate-200">
                    {order.deliveryCharge === 0 ? 'FREE' : `â‚¹${order.deliveryCharge.toLocaleString('en-IN')}`}
                  </span>
                </div>
              )}
              {order.loadingCharge !== undefined && order.loadingCharge > 0 && (
                <div className="flex justify-between">
                  <span>Loading & Unloading Handling:</span>
                  <span className="font-bold text-slate-200">â‚¹{order.loadingCharge.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-base font-black">
            <span className="text-slate-200">Total Amount:</span>
            <span className="text-white text-xl">â‚¹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
