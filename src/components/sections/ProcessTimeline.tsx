import React from 'react';
import { MousePointerClick, ShoppingBag, Truck, Gift, Zap, ArrowRight } from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: <MousePointerClick size={40} strokeWidth={2.5} />,
    title: 'Клик — выбираешь бокс',
    description: 'Готовый набор или свой конструктор — жми «Хочу бокс» и собираем под тебя',
    gradient: 'from-orange-50 to-yellow-50/80',
    iconColor: 'from-brand-accent via-brand-accent-dark to-brand-yellow',
  },
  {
    id: 2,
    icon: <ShoppingBag size={40} strokeWidth={2.5} />,
    title: 'Оставляешь контакт и адрес',
    description: 'Только телефон и куда везти. Никаких личных кабинетов и сложных форм',
    gradient: 'from-lime-50 to-emerald-50/80',
    iconColor: 'from-brand-green via-emerald-500 to-brand-green',
  },
  {
    id: 3,
    icon: <Truck size={40} strokeWidth={2.5} />,
    title: 'Собираем и везём',
    description: 'Ручной отбор, самые спелые фрукты. ~2 часа — и курьер у двери',
    gradient: 'from-yellow-50 to-amber-50/80',
    iconColor: 'from-brand-yellow via-amber-400 to-brand-accent',
  },
  {
    id: 4,
    icon: <Gift size={40} strokeWidth={2.5} />,
    title: 'Открываешь — ВАУ!',
    description: 'Идеальная укладка, аромат и яркий момент для сторис',
    gradient: 'from-amber-50 to-orange-50/80',
    iconColor: 'from-brand-yellow via-brand-accent to-brand-green',
  },
];

const ProcessTimeline: React.FC = () => {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConfigurator = () => {
    const element = document.getElementById('configurator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Steps Grid - 2x2 on desktop, vertical on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative rounded-3xl p-6 md:p-7 shadow-md border-2 border-brand-text/10 bg-gradient-to-br backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-brand-accent/30"
            style={{
              background: `linear-gradient(135deg, ${step.gradient.split(' ').map(c => c.replace('from-', '').replace('to-', '')).join(', ')})`,
            }}
          >
            {/* Step Badge */}
            <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white flex items-center justify-center font-black text-lg shadow-lg z-10">
              {step.id}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div 
                className={`w-16 h-16 md:w-18 md:h-18 rounded-xl bg-gradient-to-br ${step.iconColor} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}
              >
                {step.icon}
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-black text-brand-text leading-tight mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-brand-text-soft font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA Section */}
      <div className="text-center pt-8 md:pt-12 border-t-2 border-brand-accent/15 max-w-4xl mx-auto">
        {/* Итого Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md shadow-lg mb-4 border-2 border-brand-accent/30">
          <Zap size={20} className="text-brand-accent" strokeWidth={2.5} fill="currentColor" />
          <span className="text-xl md:text-2xl font-black text-brand-text">
            Итого: <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-green">~2 часа</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-brand-text-soft font-semibold mb-8 px-4">
          От первого клика до момента, когда ты открываешь бокс
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <button
            onClick={scrollToCatalog}
            className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Хочу бокс
              <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={scrollToConfigurator}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border-2 border-brand-accent/30 text-brand-text font-bold text-lg shadow-md hover:shadow-lg hover:border-brand-accent hover:scale-105 transition-all duration-300"
          >
            Собрать самому
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
