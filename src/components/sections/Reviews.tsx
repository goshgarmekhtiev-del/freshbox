
import React, { useState } from 'react';
import { REVIEWS } from '@/constants';
import { Quote, Star } from 'lucide-react';
import { useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

const Reviews: React.FC = () => {
  const reviewReveals = useStaggeredReveal(REVIEWS.length, 100, 150);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <SectionLight id="reviews" className="reveal">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-brand-overline">Happy People</span>
        <h2 className="text-brand-h2 mt-4">Говорят клиенты</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {REVIEWS.map((review, index) => (
          <div 
            key={review.id} 
            ref={reviewReveals[index].ref as React.RefObject<HTMLDivElement>}
            className={`bg-white/70 backdrop-blur-xl p-8 rounded-[--radius-card] flex flex-col group border border-white shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] hover:-translate-y-2 transition-all duration-300 reveal reveal-fade-up ${reviewReveals[index].isVisible ? 'reveal-visible' : ''}`}
          >
            <div className="flex justify-between items-start mb-6">
               <div className="flex gap-1 text-brand-yellow">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} strokeWidth={2.5} fill="currentColor" stroke="none" />)}
               </div>
               <Quote size={40} strokeWidth={2.5} className="text-brand-text/10 group-hover:text-brand-accent/20 transition-colors fill-current" />
            </div>
            
            <p className="text-base sm:text-lg font-medium leading-relaxed text-brand-text mb-8 flex-1 line-clamp-6 sm:line-clamp-none">"{review.text}"</p>
            
            <div className="flex items-center gap-4 pt-6 border-t border-brand-text/5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-[--shadow-soft]">
                {/* Placeholder */}
                {!loadedImages[index] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-light/40 via-brand-bg to-brand-yellow/30 animate-pulse" />
                )}
                {/* Image - Absolute positioned for zero layout shift */}
                <img 
                  src={review.avatar} 
                  alt={`Аватар клиента FreshBox — ${review.name}, ${review.role}`} 
                  loading="lazy"
                  decoding="async"
                  width="56"
                  height="56"
                  onLoad={() => handleImageLoad(index)}
                  className={`absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>
              <div>
                <h4 className="text-brand-h3">{review.name}</h4>
                <p className="text-brand-small mt-1">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionLight>
  );
};

export default Reviews;
