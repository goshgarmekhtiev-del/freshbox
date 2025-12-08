
import React, { useState } from 'react';
import { FAQS } from '@/constants';
import { ChevronDown } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { Container } from '@/components/ui';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.3 });
  const faqReveals = useStaggeredReveal(FAQS.length, 150, 80);

  return (
    <section id="faq" ref={sectionRef as React.RefObject<HTMLElement>} className={`py-16 md:py-20 lg:py-24 bg-white reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <Container className="max-w-5xl">
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 md:mb-16 lg:mb-20 reveal reveal-fade-in ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            FAQ
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-4xl mx-auto">
            Есть <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">вопросы</span>?
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">Мы знаем ответы на все ваши вопросы</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {FAQS.map((item, index) => (
            <div 
              key={index}
              ref={faqReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`rounded-[--radius-card] transition-all duration-300 overflow-hidden border border-brand-text/5 hover:border-brand-accent/20 reveal reveal-slide-up ${faqReveals[index].isVisible ? 'reveal-visible' : ''} ${openIndex === index ? 'bg-brand-accent-light/5 border-brand-accent/30 shadow-[--shadow-elevated]' : 'bg-white hover:bg-brand-accent-light/3'}`}
            >
              <button
                className="w-full p-6 md:p-8 lg:p-10 text-left flex items-center justify-between gap-6 focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-xl md:text-2xl lg:text-3xl font-black leading-tight transition-colors duration-300 ${openIndex === index ? 'text-brand-accent' : 'text-brand-text group-hover:text-brand-accent'}`}>
                  {item.question}
                </span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-brand-accent text-white rotate-180' : 'bg-brand-accent-light/10 text-brand-text group-hover:bg-brand-accent/20'}`}>
                   <ChevronDown size={24} strokeWidth={2.5} />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-lg md:text-xl text-brand-text-soft px-6 md:px-8 lg:px-10 pb-6 md:pb-8 lg:pb-10 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
