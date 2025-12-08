import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Users, Shield, Gift } from 'lucide-react';
import B2BForm from '@/components/B2BForm';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionAccent } from '@/components/ui';

const B2B: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.2 });
  const benefitReveals = useStaggeredReveal(4, 200, 120);

  const benefits = [
    {
      icon: <TrendingUp size={32} strokeWidth={2.5} />,
      title: 'Продуктивность +25%',
      description: 'Сотрудники работают лучше, когда заботятся о здоровье',
      gradient: 'from-brand-accent to-brand-accent-dark'
    },
    {
      icon: <Users size={32} strokeWidth={2.5} />,
      title: 'Лояльность команды',
      description: 'Забота о людях — лучшая инвестиция в бизнес',
      gradient: 'from-brand-accent-light to-brand-green'
    },
    {
      icon: <Shield size={32} strokeWidth={2.5} />,
      title: 'Надёжный партнёр',
      description: 'Регулярные поставки, полный пакет документов',
      gradient: 'from-brand-green to-brand-accent'
    },
    {
      icon: <Gift size={32} strokeWidth={2.5} />,
      title: 'Брендирование',
      description: 'Ваш логотип на каждом боксе — дополнительная мотивация',
      gradient: 'from-brand-yellow to-brand-accent'
    }
  ];

  return (
    <SectionAccent id="b2b" ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Centered */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-12 md:mb-16 lg:mb-20 reveal reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            Бизнес
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-5xl mx-auto">
            Энергия <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">витаминов</span> для вашей команды
          </h2>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Замените скучное печенье на сочные фрукты! Это повышает продуктивность, настроение и лояльность сотрудников.
          </p>
        </div>

        {/* Business Benefit Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`bg-white rounded-[--radius-card] p-10 md:p-12 lg:p-14 border border-brand-text/5 hover:border-brand-accent/20 shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] transition-all duration-500 hover:-translate-y-2 group reveal reveal-scale-in ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 md:mb-8 shadow-[--shadow-elevated] group-hover:scale-110 transition-transform duration-500`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-text mb-4">{benefit.title}</h3>
              <p className="text-lg md:text-xl text-brand-text-soft leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA Section */}
        <div className="bg-white rounded-[--radius-card] p-12 md:p-14 lg:p-16 shadow-[--shadow-elevated] border border-brand-text/5 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Value Props */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-brand-text mb-4">
                  Премиум-условия для корпораций
                </h3>
                <p className="text-lg md:text-xl text-brand-text-soft leading-relaxed">
                  Получите индивидуальное предложение с лучшими условиями
                </p>
              </div>
              
              <ul className="space-y-4">
                {[
                  { text: 'Скидки до 20% на регулярные поставки' },
                  { text: 'Брендирование боксов вашим логотипом' },
                  { text: 'Оплата по счёту, полный пакет документов' },
                  { text: 'Гибкие графики и объёмы поставок' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0 mt-3"></div>
                    <span className="text-lg font-medium text-brand-text leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA */}
            <div className="text-center lg:text-left">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full px-10 py-6 bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white rounded-full font-black text-xl shadow-[--shadow-elevated] hover:scale-105 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Получить КП</span>
                <ArrowRight size={24} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <p className="text-brand-text-soft font-medium text-sm mt-4">
                Ответим в течение 1 часа
              </p>
            </div>
          </div>
        </div>
      </div>

      <B2BForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </SectionAccent>
  );
};

export default B2B;