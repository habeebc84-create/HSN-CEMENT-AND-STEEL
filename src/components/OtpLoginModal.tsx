import React, { useState } from 'react';
import { X, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OtpLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (mobile: string) => void;
}

export const OtpLoginModal: React.FC<OtpLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useStore();
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [otpCode, setOtpCode] = useState('');
  const [simulatedSentOtp, setSimulatedSentOtp] = useState('7890');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }
    const generated = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedSentOtp(generated);
    setStep('otp');
    showToast(`OTP Code sent to +91 ${mobileNumber}: ${generated}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === simulatedSentOtp || otpCode === '1234' || otpCode === '7890') {
      showToast('Mobile OTP Verified Successfully!');
      onSuccess(mobileNumber);
      onClose();
    } else {
      showToast('Invalid OTP. Please check the 4-digit code.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-md w-full bg-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-950 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 text-white border border-blue-500/30 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 font-industrial">
            {step === 'mobile' ? 'Contractor Mobile Sign In' : 'Enter 4-Digit Security OTP'}
          </h3>
          <p className="text-xs text-slate-400">
            {step === 'mobile'
              ? 'Enter your mobile number to receive instant WhatsApp / SMS OTP verification.'
              : `We sent a verification code to +91 ${mobileNumber}.`}
          </p>
        </div>

        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Indian Mobile Number (+91):</label>
              <div className="flex bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                <span className="bg-slate-800 px-3.5 py-3 text-slate-300 text-sm font-bold flex items-center">+91</span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={10}
                  required
                  placeholder="e.g. 7989494779"
                  className="w-full bg-transparent px-3 py-3 text-slate-100 text-sm font-bold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full safety-pink-btn py-3.5 rounded-xl text-xs font-black flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Get Verification OTP</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 text-white text-xs p-3 rounded-xl font-bold text-center">
              Demo OTP Code: <strong className="text-white text-base ml-1">{simulatedSentOtp}</strong>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Enter 4-Digit OTP Code:</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={4}
                required
                placeholder="4-digit code"
                className="w-full bg-slate-950 border border-slate-800 text-gradient theme-lovable text-gradient-animated text-center text-xl font-black tracking-widest py-3 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full safety-pink-btn py-3.5 rounded-xl text-xs font-black flex items-center justify-center space-x-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Verify & Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('mobile')}
              className="w-full text-xs text-slate-400 hover:text-white underline text-center block"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-pink-400 font-bold border-t border-slate-800 pt-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Password Friction • Instant Contractor Account</span>
        </div>

      </div>
    </div>
  );
};
