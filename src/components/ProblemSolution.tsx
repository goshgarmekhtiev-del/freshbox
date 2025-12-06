
import React from 'react';
import { Clock, Gift, Zap, CheckCircle2, Heart } from 'lucide-react';
import { useStaggeredReveal } from '../utils/useReveal';

const ProblemSolution: React.FC = () => {
  const cardReveals = useStaggeredReveal(3, 100, 150);

  const cards = [
    {
      icon: <Clock size={40} strokeWidth={2} />,
      title: 'Экономим ваше',
      titleBreak: 'время',
      text: 'Никаких пробок и очередей. Закажите в пару кликов, и через 2 часа курьер уже звонит в дверь.',
      badge: 'Быстрая доставка',
      badgeIcon: <Zap size={16} fill="currentColor" />,
      badgeColor: 'orange',
      gradient: 'from-brand-accent-light to-brand-green',
      hoverShadow: 'hover:shadow-brand-accent/20',
      hoverBorder: 'hover:border-brand-accent/20',
      rotation: 'group-hover:rotate-6'
    },
    {
      icon: <CheckCircle2 size={40} strokeWidth={2} />,
      title: 'Гарантия',
      titleBreak: 'сладости',
      text: 'Мы пробуем каждую партию. Если фрукт не идеален, он не попадет в коробку. Только спелое и сочное.',
      badge: 'Ручной отбор',
      badgeIcon: <CheckCircle2 size={16} />,
      badgeColor: 'green',
      gradient: 'from-brand-yellow to-brand-accent',
      hoverShadow: 'hover:shadow-brand-green/20',
      hoverBorder: 'hover:border-brand-green/20',
      rotation: 'group-hover:-rotate-6'
    },
    {
      icon: <Gift size={40} strokeWidth={2} />,
      title: 'WOW-эффект',
      titleBreak: 'подарка',
      text: 'Крафтовая упаковка, ленты, открытки. Идеальный способ сказать "Люблю" или "Спасибо".',
      badge: 'Premium Pack',
      badgeIcon: <Heart size={16} fill="currentColor" />,
      badgeColor: 'red',
      gradient: 'from-pink-400 to-red-500',
      hoverShadow: 'hover:shadow-brand-accent/20',
      hoverBorder: 'hover:border-brand-accent/20',
      rotation: 'group-hover:rotate-6'
    }
  ];

  return (
    <section className="py-24 bg-brand-bg reveal relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-0 w-32 h-32 bg-brand-accent-light rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-0 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl opacity-60"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-extrabold text-brand-text mb-4">Почему выбирают нас?</h2>
           <p className="text-brand-text-soft font-medium text-lg max-w-2xl mx-auto">Мы решаем главную проблему — где найти вкусные фрукты в мегаполисе</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, index) => (
            <div 
              key={index}
              ref={cardReveals[index].ref as React.RefObject<HTMLDivElement>}
              className={`group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 ${card.hoverShadow} transition-all duration-300 hover:-translate-y-2 border-2 border-transparent ${card.hoverBorder} reveal reveal-scale-in ${cardReveals[index].isVisible ? 'reveal-visible' : ''}`}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-8 shadow-lg transform ${card.rotation} transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-brand-text mb-4 leading-tight">
                {card.title} <br/>{card.titleBreak}
              </h3>
              <p className="text-brand-text-soft font-medium leading-relaxed mb-6">
                {card.text}
              </p>
              <div className={`inline-flex items-center gap-2 text-${card.badgeColor}-500 font-black text-sm uppercase tracking-wider bg-${card.badgeColor}-50 px-4 py-2 rounded-lg`}>
                {card.badgeIcon} {card.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
