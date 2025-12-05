
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white reveal">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full text-brand-accent mb-6 animate-bounce-slow">
             <MessageCircleQuestion size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text">Есть вопросы?</h2>
          <p className="text-brand-text-soft font-medium text-lg mt-4">Мы знаем ответы</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-3xl transition-all duration-300 overflow-hidden border-2 ${openIndex === index ? 'bg-orange-50 border-brand-accent/30 shadow-lg scale-[1.02]' : 'bg-brand-bg border-transparent hover:bg-gray-100'}`}
            >
              <button
                className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-4 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-xl md:text-2xl font-extrabold leading-tight transition-colors duration-300 ${openIndex === index ? 'text-brand-accent-dark' : 'text-brand-text'}`}>
                  {item.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-brand-accent text-white rotate-180 shadow-md' : 'bg-white text-brand-text shadow-sm'}`}>
                   <ChevronDown size={20} strokeWidth={3} />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-brand-text font-medium text-base md:text-lg leading-relaxed px-6 md:px-8 pb-8 text-opacity-80">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
