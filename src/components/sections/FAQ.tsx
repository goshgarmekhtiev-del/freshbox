
import React, { useState } from 'react';
import { FAQS } from '@/constants';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { Container } from '@/components/ui';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.3 });
  const faqReveals = useStaggeredReveal(FAQS.length, 150, 80);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white reveal">
      <Container className="max-w-4xl">
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 md:mb-16 reveal reveal-fade-in ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full text-brand-accent mb-6">
             <MessageCircleQuestion size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-brand-h2">Есть вопросы?</h2>
          <p className="text-brand-body mt-6">Мы знаем ответы</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <div 
              key={index}
              ref={faqReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`rounded-[--radius-card] transition-all duration-300 overflow-hidden border-2 reveal reveal-slide-up ${faqReveals[index].isVisible ? 'reveal-visible' : ''} ${openIndex === index ? 'bg-orange-50 border-brand-accent/30 shadow-[--shadow-soft] scale-[1.02]' : 'bg-brand-bg border-transparent hover:bg-brand-accent-light/10'}`}
            >
              <button
                className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-2xl md:text-3xl font-bold leading-snug tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-brand-accent-dark' : 'text-brand-text'}`}>
                  {item.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-brand-accent text-white rotate-180 shadow-[--shadow-soft]' : 'bg-white text-brand-text shadow-[--shadow-soft]'}`}>
                   <ChevronDown size={20} strokeWidth={2.5} />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-brand-body px-6 md:px-8 pb-8">
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
