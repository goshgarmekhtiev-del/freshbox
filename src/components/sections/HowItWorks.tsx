import React from 'react';
import { useReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';
import ProcessTimeline from './ProcessTimeline';

const HowItWorks: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });

  return (
    <SectionLight 
      id="how-it-works" 
      ref={sectionRef} 
      className={`reveal ${sectionVisible ? 'reveal-visible' : ''} relative overflow-hidden`} 
      withBlobs={false}
    >
      {/* Clean, Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-yellow-50/50 to-lime-50/60 pointer-events-none"></div>
      
      {/* Subtle Light Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-accent/6 to-transparent rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-brand-green/8 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      {/* Minimal Fruit Decoration */}
      <div className="absolute top-16 right-12 text-5xl opacity-8 pointer-events-none">🍊</div>
      <div className="absolute bottom-16 left-12 text-5xl opacity-8 pointer-events-none">🍎</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-8 shadow-sm">
            Процесс
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-[0.95] mb-4 max-w-4xl mx-auto">
            Как мы <span className="text-gradient-brand-heading">работаем</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold">
            От клика до «Вау!» — <span className="text-brand-accent font-bold">~2 часа</span> ⚡
          </p>
        </div>

        {/* Interactive Process Timeline */}
        <ProcessTimeline />
      </div>
    </SectionLight>
  );
};

export default HowItWorks;