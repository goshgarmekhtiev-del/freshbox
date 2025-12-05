
import React from 'react';
import { Clock, Frown, Gift, ArrowRight, Zap, CheckCircle2, Heart } from 'lucide-react';

const ProblemSolution: React.FC = () => {
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
          {/* Card 1 */}
          <div className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-brand-accent/20">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-accent-light to-brand-green flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-6 transition-transform">
              <Clock size={40} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-text mb-4 leading-tight">Экономим ваше <br/>время</h3>
            <p className="text-brand-text-soft font-medium leading-relaxed mb-6">
              Никаких пробок и очередей. Закажите в пару кликов, и через 2 часа курьер уже звонит в дверь.
            </p>
            <div className="inline-flex items-center gap-2 text-brand-accent-dark font-black text-sm uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-lg">
              <Zap size={16} fill="currentColor" /> Быстрая доставка
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-brand-green/20 transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-brand-green/20">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-yellow to-brand-accent flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:-rotate-6 transition-transform">
              <CheckCircle2 size={40} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-text mb-4 leading-tight">Гарантия <br/>сладости</h3>
            <p className="text-brand-text-soft font-medium leading-relaxed mb-6">
              Мы пробуем каждую партию. Если фрукт не идеален, он не попадет в коробку. Только спелое и сочное.
            </p>
            <div className="inline-flex items-center gap-2 text-brand-green font-black text-sm uppercase tracking-wider bg-green-50 px-4 py-2 rounded-lg">
              <CheckCircle2 size={16} /> Ручной отбор
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-brand-accent/20">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-6 transition-transform">
              <Gift size={40} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-extrabold text-brand-text mb-4 leading-tight">WOW-эффект <br/>подарка</h3>
            <p className="text-brand-text-soft font-medium leading-relaxed mb-6">
              Крафтовая упаковка, ленты, открытки. Идеальный способ сказать "Люблю" или "Спасибо".
            </p>
            <div className="inline-flex items-center gap-2 text-red-500 font-black text-sm uppercase tracking-wider bg-red-50 px-4 py-2 rounded-lg">
              <Heart size={16} fill="currentColor" /> Premium Pack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
