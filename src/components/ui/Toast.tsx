import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'info' | 'error';
}

/**
 * Toast Notification Component
 * 
 * Features:
 * - Smooth slide-in animation from bottom-right
 * - Auto-dismiss after duration
 * - Success/info/error variants
 * - Accessibility support
 */
const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 2000,
  type = 'success' 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-brand-green',
    info: 'bg-brand-accent',
    error: 'bg-red-500'
  };

  const icons = {
    success: <CheckCircle2 size={20} strokeWidth={2.5} className="flex-shrink-0" />,
    info: <CheckCircle2 size={20} strokeWidth={2.5} className="flex-shrink-0" />,
    error: <X size={20} strokeWidth={2.5} className="flex-shrink-0" />
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[9999] animate-toast-slide-in ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`${bgColors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md border-2 border-white/30`}>
        {icons[type]}
        <span className="font-bold text-base leading-relaxed flex-1">
          {message}
        </span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="Закрыть уведомление"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
