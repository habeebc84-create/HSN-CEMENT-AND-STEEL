import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useStore();

  const getVariantStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-pink-500" />,
          glowBg: 'bg-pink-500/15',
          glowBorder: 'border-pink-500/20'
        };
      case 'error':
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          glowBg: 'bg-red-500/15',
          glowBorder: 'border-red-500/20'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          glowBg: 'bg-amber-500/15',
          glowBorder: 'border-amber-500/20'
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-white" />,
          glowBg: 'bg-blue-500/15',
          glowBorder: 'border-blue-500/20'
        };
    }
  };

  const getTitle = (type: string) => {
    switch(type) {
      case 'success': return 'Success!';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Information';
      default: return 'Notification';
    }
  }

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const styles = getVariantStyles(toast.type);
        return (
          <div
            key={toast.id}
            className="pointer-events-auto animate-in slide-in-from-right-10 fade-in duration-300"
          >
            <div 
              className="bg-slate-900/5 backdrop-blur-xl border border-white/10 border-t-white/20 border-l-white/20 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] shadow-inner flex items-start space-x-4 max-w-sm w-[320px]"
            >
              <div className={`${styles.glowBg} p-2 rounded-full border ${styles.glowBorder} shrink-0 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]`}>
                {styles.icon}
              </div>
              <div className="pt-0.5">
                <h4 className="text-[16px] font-bold text-white drop-shadow-md">
                  {getTitle(toast.type)}
                </h4>
                <p className="text-[14px] font-medium text-white/70 mt-1 leading-tight">
                  {toast.message}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
