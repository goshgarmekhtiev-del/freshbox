import React from 'react';
import { Gift } from 'lucide-react';

interface MarqueeProps {
  items?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  items,
  speed = 'normal',
  className = '' 
}) => {
  const speedClass = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast'
  }[speed];

  // Default items - short, repeating phrases (Russian)
  const defaultItems = [
    'Премиальные фруктовые боксы',
    'Собираем вручную',
    'Доставка за 2 часа',
    'Только отборные фрукты премиум-качества'
  ];

  const marqueeItems = items || defaultItems;
  
  // Duplicate items for seamless loop (2x is enough for smooth scrolling)
  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className={`relative w-full h-16 md:h-20 overflow-visible flex items-center ${className}`}>
      {/* Diagonal background - green gradient from brand palette */}
      <div className="absolute inset-0 md:skew-y-[-3deg] md:scale-y-[1.2] bg-gradient-to-r from-brand-green via-brand-text to-brand-green shadow-[--shadow-soft]"></div>
      
      {/* Content wrapper with diagonal skew */}
      <div className="relative w-full h-full overflow-hidden md:skew-y-[-3deg]">
        {/* Content - smooth horizontal scroll, absolutely positioned for perfect centering */}
        <div className={`absolute inset-0 flex items-center ${speedClass} whitespace-nowrap will-change-transform`}>
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 shrink-0"
            >
              <Gift size={40} strokeWidth={2.5} className="text-brand-accent shrink-0" />
              <span className="text-4xl md:text-5xl lg:text-6xl leading-none uppercase tracking-tightest bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-green text-transparent bg-clip-text" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, letterSpacing: '-0.05em' }}>
                {item}
              </span>
              <span className="text-brand-accent/60 text-4xl md:text-5xl shrink-0">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

