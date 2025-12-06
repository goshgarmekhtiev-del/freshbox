
import React, { useState } from 'react';
import { Building2, ArrowRight, TrendingUp, Users, Shield, Gift } from 'lucide-react';
import B2BForm from './B2BForm';
import { useReveal, useStaggeredReveal } from '../utils/useReveal';

const B2B: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.2 });
  const benefitReveals = useStaggeredReveal(4, 200, 120);

  const benefits = [
    {
      icon: <TrendingUp size={32} strokeWidth={2.5} />,
      title: 'Продуктивность +25%',
      description: 'Сотрудники работают лучше, когда заботятся о здоровье',
      gradient: 'from-orange-500 to-peach-500'
    },
    {
      icon: <Users size={32} strokeWidth={2.5} />,
      title: 'Лояльность команды',
      description: 'Забота о людях — лучшая инвестиция в бизнес',
      gradient: 'from-peach-500 to-honey-400'
    },
    {
      icon: <Shield size={32} strokeWidth={2.5} />,
      title: 'Надёжный партнёр',
      description: 'Регулярные поставки, полный пакет документов',
      gradient: 'from-lime-500 to-lime-600'
    },
    {
      icon: <Gift size={32} strokeWidth={2.5} />,
      title: 'Брендирование',
      description: 'Ваш логотип на каждом боксе — дополнительная мотивация',
      gradient: 'from-honey-400 to-orange-500'
    }
  ];

  return (
    <section id="b2b" className="py-24 md:py-32 bg-gradient-to-br from-orange-50 via-white to-peach-50 relative overflow-hidden">
      {/* Subtle fruit accents - background orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/15 via-peach-200/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-honey-300/10 via-lime-200/8 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-20 reveal reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white font-black uppercase text-xs tracking-[0.15em] shadow-deep shadow-orange-400/50 mb-8 border-3 border-white/30">
            <Building2 size={18} strokeWidth={2.5} />
            <span>Бизнес-Решения</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-brown-900 tracking-tighter leading-[0.95] mb-6">
            Энергия <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400">витаминов</span>
            <span className="block mt-2">для вашей команды</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-brown-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Замените скучное печенье на сочные фрукты! Это повышает продуктивность, настроение и лояльность сотрудников.
          </p>
        </div>

        {/* Business Benefit Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`glass rounded-3xl p-8 border-2 border-orange-200/30 hover:border-orange-300/50 shadow-medium hover:shadow-deep-xl transition-all duration-300 hover:-translate-y-2 group reveal reveal-scale-in ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-6 shadow-deep group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-black text-brown-900 mb-3 leading-tight">{benefit.title}</h3>
              <p className="text-brown-600 font-medium leading-relaxed text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA Section - Clean white container */}
        <div className="glass rounded-[3rem] p-10 md:p-16 shadow-deep-xl border-3 border-orange-200/40 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            
            {/* Left: Value Props */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-brown-900 leading-tight">
                  Премиум-условия для корпораций
                </h3>
                <p className="text-brown-600 font-medium text-lg leading-relaxed">
                  Получите индивидуальное предложение с лучшими условиями
                </p>
              </div>
              
              <ul className="space-y-4">
                {[
                  { text: 'Скидки до 20% на регулярные поставки', emoji: '💰' },
                  { text: 'Брендирование боксов вашим логотипом', emoji: '🎯' },
                  { text: 'Оплата по счёту, полный пакет документов', emoji: '📝' },
                  { text: 'Гибкие графики и объёмы поставок', emoji: '📅' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-peach-500 flex items-center justify-center text-white shadow-medium shrink-0">
                      <span className="text-lg">{item.emoji}</span>
                    </div>
                    <span className="text-brown-900 font-bold text-base leading-relaxed pt-1.5">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="relative">
                {/* Decorative fruit accent */}
                <div className="absolute -top-8 -right-8 text-8xl opacity-20 pointer-events-none">🍊</div>
                
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="w-full px-10 py-6 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white rounded-full font-black text-xl shadow-deep-xl hover:shadow-deep-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center gap-3 border-3 border-white/30 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative z-10">Получить КП</span>
                  <ArrowRight size={24} strokeWidth={3} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                
                <p className="text-brown-500/70 font-medium text-sm mt-4">
                  Ответим в течение 1 часа
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <B2BForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default B2B;
