import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { useReveal } from '@/hooks';
import { faqCategories, faqItems, type FaqCategory } from '@/data/faq';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("Общее");
  const [openId, setOpenId] = useState<string | null>(null);

  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.3 });

  // Filter items by active category
  const filteredItems = faqItems.filter(
    (item) => item.category === activeCategory
  );

  // Reset openId to first item when category changes
  useEffect(() => {
    const first = filteredItems[0];
    setOpenId(first ? first.id : null);
  }, [activeCategory]);

  return (
    <section 
      id="faq" 
      ref={sectionRef as React.RefObject<HTMLElement>} 
      className={`bg-[#FFFDF7] reveal ${sectionVisible ? 'reveal-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        
        {/* Header */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-10 reveal reveal-fade-in ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-flex items-center rounded-full bg-brand-accent-light/60 px-4 py-1 text-sm font-medium text-brand-text mb-4">
            FAQ
          </div>
          
          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text mb-4">
            Есть{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
              вопросы
            </span>?
          </h2>
          
          <p className="text-center text-lg sm:text-xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Мы собрали ответы на самые частые вопросы о свежести, доставке, подарках и корпоративных заказах.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-3 min-w-full sm:justify-center pb-2">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  inline-flex items-center justify-center whitespace-nowrap
                  rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base font-medium
                  transition-all duration-300 shrink-0
                  ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-brand-accent to-brand-yellow text-white shadow-lg scale-105'
                      : 'bg-white/70 text-brand-text-soft border border-transparent hover:bg-white hover:border-brand-accent-light/30'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white shadow-sm hover:shadow-md border border-transparent hover:border-brand-accent-light transition-all duration-300"
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
              >
                <span className="text-base sm:text-lg font-semibold text-brand-text leading-snug group-hover:text-brand-accent transition-colors">
                  {item.question}
                </span>
                <span
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-full 
                    border border-brand-accent-light bg-brand-accent-light/40 
                    shrink-0 transition-transform duration-300
                    ${openId === item.id ? 'rotate-180 bg-brand-accent border-brand-accent' : ''}
                  `}
                >
                  <ChevronDown 
                    size={20} 
                    strokeWidth={2.5} 
                    className={openId === item.id ? 'text-white' : 'text-brand-text'} 
                  />
                </span>
              </button>

              {/* Answer Body */}
              <div
                className={`
                  px-5 sm:px-6 pb-4 sm:pb-5 
                  text-sm sm:text-base text-brand-text-soft leading-relaxed
                  transition-all duration-300 ease-out
                  ${
                    openId === item.id
                      ? 'opacity-100 max-h-[500px]'
                      : 'opacity-0 max-h-0 overflow-hidden'
                  }
                `}
              >
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block - "Не нашли ответ?" */}
        <div className="mt-8 sm:mt-10 rounded-3xl bg-gradient-to-r from-brand-accent to-brand-yellow p-[1px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-white/95 backdrop-blur-sm px-5 sm:px-6 py-5 sm:py-6">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-brand-text mb-1 leading-tight">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-sm sm:text-base text-brand-text-soft leading-relaxed">
                Напишите нам — подберём бокс, поможем с заказом и расскажем о доставке за пару минут.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/79990000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                Написать в WhatsApp
              </a>
              <a
                href="tel:+79990000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-accent text-brand-text px-5 py-2.5 text-sm font-semibold hover:bg-brand-accent-light/30 transition-colors"
              >
                <Phone size={18} strokeWidth={2.5} />
                Позвонить нам
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
