
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { RECENT_PURCHASES } from '../constants';
import { NotificationData } from '../types';

interface SocialProofProps {
  customNotification?: NotificationData | null;
}

const SocialProof: React.FC<SocialProofProps> = ({ customNotification }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<NotificationData>(RECENT_PURCHASES[0]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle custom notifications (user's own order)
  useEffect(() => {
    if (customNotification) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      setData(customNotification);
      setVisible(true);
      
      // Keep it visible longer for the user to see their own name (8 seconds)
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 8000);
      
      return () => clearTimeout(timeout);
    }
  }, [customNotification]);

  // Regular loop for fake notifications
  useEffect(() => {
    // Only run loop if we aren't currently showing a custom notification
    if (customNotification) return;

    const showRandom = () => {
      const randomItem = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
      setData(randomItem);
      setVisible(true);

      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const initialTimeout = setTimeout(showRandom, 5000);
    const interval = setInterval(showRandom, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [customNotification]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 md:left-8 z-40 animate-fade-in-up">
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 max-w-sm relative">
        <button 
          onClick={() => setVisible(false)} 
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-gray-400 hover:text-red-500"
        >
          <X size={12} />
        </button>
        
        <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent shrink-0">
          <ShoppingBag size={24} />
        </div>
        
        <div>
          <p className="text-sm font-bold text-brand-text">
            {data.name} из г. {data.city}
          </p>
          <p className="text-xs text-brand-text-soft font-medium">
            Только что купил(а) <span className="text-brand-accent font-bold">{data.product}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">1 минуту назад</p>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
