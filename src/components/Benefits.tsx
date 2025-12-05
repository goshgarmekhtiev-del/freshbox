
import React from 'react';
import { Truck, ShieldCheck, Heart, Sun } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Sun size={32} strokeWidth={3} />,
      title: 'Вкус лета',
      text: 'Фрукты, созревшие на солнце. Максимум сахара и пользы.'
    },
    {
      icon: <Truck size={32} strokeWidth={3} />,
      title: 'Пуля-доставка',
      text: '120 минут по Москве. Мы ценим вашу скорость жизни.'
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={3} />,
      title: 'Честная гарантия',
      text: 'Одно пятнышко? Заменим весь бокс бесплатно.'
    },
    {
      icon: <Heart size={32} strokeWidth={3} />,
      title: 'С любовью',
      text: 'Каждый бокс собираем как для мамы. Аккуратно и с душой.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-green to-[#047857] text-white reveal relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <div className="w-20 h-20 rounded-2xl bg-brand-accent-light text-brand-text flex items-center justify-center mb-6 shadow-xl shadow-brand-green/50 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-sans font-extrabold text-2xl mb-3">{benefit.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed font-bold opacity-80">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
