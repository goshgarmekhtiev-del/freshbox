
import React, { useState } from 'react';
import { REVIEWS } from '@/constants';
import { Quote, Star } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

const Reviews: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const reviewReveals = useStaggeredReveal(REVIEWS.length, 100, 150);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <SectionLight id="reviews" ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            Отзывы
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-4xl mx-auto">
            Говорят <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">клиенты</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Реальные отзывы от тех, кто уже попробовал наши премиальные фруктовые боксы
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {REVIEWS.map((review, index) => (
            <div 
              key={review.id} 
              ref={reviewReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border border-brand-text/5 p-10 md:p-12 rounded-[--radius-card] flex flex-col group shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] hover:-translate-y-2 hover:border-brand-accent/20 transition-all duration-500 reveal reveal-fade-up ${reviewReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="flex justify-between items-start mb-6">
               <div className="flex gap-1 text-brand-yellow">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} strokeWidth={2.5} fill="currentColor" stroke="none" />)}
               </div>
               <Quote size={36} strokeWidth={2.5} className="text-brand-text/10 group-hover:text-brand-accent/30 transition-colors fill-current" />
            </div>
            
            <p className="text-lg md:text-xl leading-relaxed text-brand-text mb-8 flex-1 line-clamp-6 sm:line-clamp-none">"{review.text}"</p>
            
            <div className="flex items-center gap-4 pt-6 border-t border-brand-text/5">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-brand-accent-light/30">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-light/40 to-brand-yellow/30 animate-pulse" />
                )}
                <img 
                  src={review.avatar} 
                  alt={`Аватар клиента FreshBox — ${review.name}, ${review.role}`} 
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                  onLoad={() => handleImageLoad(index)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>
              <div>
                <h4 className="text-xl font-black text-brand-text">{review.name}</h4>
                <p className="text-sm text-brand-text-soft mt-1">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </SectionLight>
  );
};

export default Reviews;
