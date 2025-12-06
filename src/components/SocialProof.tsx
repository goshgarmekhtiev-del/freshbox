
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, MapPin, Clock } from 'lucide-react';
import { RECENT_PURCHASES } from '@/constants';
import type { NotificationData } from '@/types';

interface SocialProofProps {
  customNotification?: NotificationData | null;
}

const SocialProof: React.FC<SocialProofProps> = ({ customNotification }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<NotificationData>(RECENT_PURCHASES[0]);
  const [timeAgo, setTimeAgo] = useState('2 минуты назад');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate random time ago text
  const getRandomTimeAgo = () => {
    const options = [
      '1 минуту назад',
      '2 минуты назад',
      '3 минуты назад',
      '5 минут назад',
      '7 минут назад',
      '10 минут назад'
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Get avatar URL from UI Avatars API (generates avatar from name)
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff&bold=true&size=128`;
  };

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

  // Regular loop for fake notifications - Random 12-25 seconds
  useEffect(() => {
    // Only run loop if we aren't currently showing a custom notification
    if (customNotification) return;

    const showRandom = () => {
      const randomItem = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
      setData(randomItem);
      setTimeAgo(getRandomTimeAgo());
      setVisible(true);

      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 6000); // Show for 6 seconds
    };

    // Random interval between 12-25 seconds
    const getRandomInterval = () => 12000 + Math.random() * 13000; // 12000ms + random(0-13000ms)

    const initialTimeout = setTimeout(showRandom, 5000); // First notification after 5s
    
    let intervalId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      intervalId = setTimeout(() => {
        showRandom();
        scheduleNext(); // Schedule next notification
      }, getRandomInterval());
    };
    
    scheduleNext();

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(intervalId);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [customNotification]);

  if (!visible) return null;

  return (
    <div 
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-6 left-4 md:bottom-8 md:left-8 z-50 transition-all duration-500 ${
        visible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      style={{
        animation: visible ? 'slideUpFade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
      }}
    >
      <div className="glass rounded-3xl p-5 shadow-deep shadow-orange-400/30 border-2 border-orange-200/40 flex items-center gap-4 max-w-[380px] relative group hover:shadow-deep-xl hover:border-orange-300/50 transition-all duration-300 hover:scale-105">
        {/* Close Button */}
        <button 
          onClick={() => setVisible(false)} 
          className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-medium border-2 border-orange-200/40 text-brown-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
          aria-label="Close notification"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
        
        {/* Avatar with premium styling */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-medium ring-2 ring-orange-200/50 group-hover:ring-orange-300 transition-all duration-300">
            <img 
              src={getAvatarUrl(data.name)} 
              alt={`Аватар покупателя FreshBox — ${data.name} из ${data.city}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-lime-500 rounded-full border-2 border-white shadow-soft"></div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with name and location */}
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-base font-black text-brown-900 truncate">
              {data.name}
            </p>
            <div className="flex items-center gap-1 text-orange-600 shrink-0">
              <MapPin size={12} strokeWidth={2.5} />
              <span className="text-xs font-bold">{data.city}</span>
            </div>
          </div>
          
          {/* Product purchased */}
          <div className="flex items-start gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-peach-500 flex items-center justify-center shrink-0 mt-0.5">
              <ShoppingBag size={12} strokeWidth={2.5} className="text-white" />
            </div>
            <p className="text-sm text-brown-700 font-medium leading-tight">
              Купил(а) <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-peach-600 to-honey-600">{data.product}</span>
            </p>
          </div>
          
          {/* Time ago */}
          <div className="flex items-center gap-1.5 text-brown-500/70">
            <Clock size={11} strokeWidth={2.5} />
            <span className="text-xs font-medium">{timeAgo}</span>
          </div>
        </div>
        
        {/* Floating light effect */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-orange-400/20 via-peach-300/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SocialProof;
