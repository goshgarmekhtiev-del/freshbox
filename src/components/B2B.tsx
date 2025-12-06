import React, { useState } from 'react';
import { Building2, ArrowRight, TrendingUp, Users, Shield, Gift } from 'lucide-react';
import B2BForm from './B2BForm';
import { useReveal, useStaggeredReveal } from '../utils/useReveal';
import { SectionAccent } from './ui';

const B2B: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    <SectionAccent id="b2b">
      <>
        {/* Header Section */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-20 reveal reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
        <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black uppercase text-xs tracking-[0.15em] shadow-[--shadow-soft] mb-8 border-3 border-white/30">
          <Building2 size={18} strokeWidth={2.5} />
          <span>Бизнес-Решения</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-brand-text mb-6">
          Энергия <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">витаминов</span>
          <span className="block mt-2">для вашей команды</span>
        </h2>
        
        <p className="text-lg font-medium text-brand-text-soft leading-relaxed max-w-3xl mx-auto">
          Замените скучное печенье на сочные фрукты! Это повышает продуктивность, настроение и лояльность сотрудников.
        </p>
      </div>

      {/* Business Benefit Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`glass rounded-[--radius-card] p-8 border-2 border-brand-accent/30 hover:border-brand-accent/50 shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] transition-all duration-300 hover:-translate-y-2 group reveal reveal-scale-in ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className={`w-16 h-16 rounded-[--radius-ui] bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 shadow-[--shadow-soft] group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text mb-3">{benefit.title}</h3>
              <p className="text-sm font-medium text-brand-text-soft leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA Section - Clean white container */}
        <div className="glass rounded-[3rem] p-10 md:p-16 shadow-[--shadow-elevated] border-3 border-brand-accent/40 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            
            {/* Left: Value Props */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text">
                  Премиум-условия для корпораций
                </h3>
                <p className="text-lg font-medium text-brand-text-soft leading-relaxed">
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
                    <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0 mt-2.5"></div>
                    <span className="text-lg font-medium text-brand-text leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="relative">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full px-10 py-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white rounded-full font-black text-xl shadow-deep-xl hover:shadow-deep-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border-3 border-white/30 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative z-10">Получить КП</span>
                  <ArrowRight size={24} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                
                <p className="text-brand-text-soft/70 font-medium text-sm mt-4">
                  Ответим в течение 1 часа
                </p>
              </div>
            </div>
          </div>
        </div>
      </>

      <B2BForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </SectionAccent>
  );
};

export default B2B;