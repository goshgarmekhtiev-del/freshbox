import React from 'react';
import { Apple, CheckCircle2, Gift, ShieldCheck, Zap, Heart } from 'lucide-react';
import { useReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

interface SecondaryBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const WhyFreshBox: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });

  const secondaryBenefits: SecondaryBenefit[] = [
    {
      icon: <Apple size={48} strokeWidth={2.5} />,
      title: 'Премиум фрукты',
      description: '0 компромиссов по вкусу и виду',
      gradient: 'from-lime-50 to-emerald-50/50',
      iconColor: 'from-brand-green via-emerald-500 to-brand-green',
    },
    {
      icon: <Gift size={48} strokeWidth={2.5} />,
      title: 'Упаковка мечты',
      description: 'ВАУ-эффект, готовый к сторис и фото',
      gradient: 'from-yellow-50 to-amber-50/50',
      iconColor: 'from-brand-yellow via-amber-400 to-brand-accent',
    },
    {
      icon: <ShieldCheck size={48} strokeWidth={2.5} />,
      title: 'Гарантия возврата',
      description: 'Если что-то не понравится — вернём деньги или заменим бокс',
      gradient: 'from-emerald-50 to-lime-50/50',
      iconColor: 'from-brand-green via-emerald-500 to-lime-500',
    },
  ];

  return (
    <SectionLight 
      id="why-freshbox" 
      ref={sectionRef} 
      className={`reveal ${sectionVisible ? 'reveal-visible' : ''} relative overflow-hidden`} 
      withBlobs={false}
    >
      {/* Clean, Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-50/60 via-yellow-50/50 to-orange-50/60 pointer-events-none"></div>
      
      {/* Subtle Light Accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-green/8 to-transparent rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-accent/6 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      {/* Minimal Fruit Decoration */}
      <div className="absolute top-16 right-12 text-6xl opacity-10 pointer-events-none animate-float-slow">🍊</div>
      <div className="absolute bottom-20 left-12 text-6xl opacity-10 pointer-events-none animate-float-slow" style={{ animationDelay: '1.5s' }}>🍏</div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
            <Heart size={16} strokeWidth={2.5} fill="currentColor" />
            <span>почему нас любят 💛</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-4 px-4">
            Свежесть и любовь{' '}
            <span className="text-gradient-brand-heading">
              в каждой коробке
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft font-semibold max-w-3xl mx-auto px-4">
            4 преимущества, из-за которых к нам возвращаются
          </p>
        </div>

        {/* Main Benefit - Wide Featured Card */}
        <div className={`mb-10 md:mb-12 reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}>
          {/* Main Badge */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest shadow-sm">
              <Zap size={16} strokeWidth={2.5} fill="currentColor" />
              <span>Главное преимущество</span>
            </div>
          </div>

          {/* Main Card */}
          <div 
            className="group relative rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg border-2 border-brand-accent/40 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Glow Effect */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2), transparent 70%)',
              }}
            ></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-brand-accent via-brand-accent-dark to-brand-yellow flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Zap size={48} strokeWidth={2.5} fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-text leading-tight mb-2">
                  Свежесть в день доставки
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-brand-accent font-bold mb-3">
                  Собрали — привезли в тот же день
                </p>
                <p className="text-sm md:text-base text-brand-text-soft font-medium leading-relaxed max-w-2xl">
                  Фрукты приезжают сочными, не успевают "уставать" в холодильниках и на витринах. Каждый бокс собирается под заказ в день доставки.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Benefits - Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          {secondaryBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-6 md:p-7 shadow-md border-2 border-brand-text/10 bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-brand-accent/30 reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div 
                  className={`w-16 h-16 md:w-18 md:h-18 rounded-xl bg-gradient-to-br ${benefit.iconColor} flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}
                >
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h4 className="text-lg md:text-xl font-black text-brand-text leading-tight mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-brand-text-soft font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof - Repeat Customer Badge */}
        <div className={`flex justify-center reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-flex items-start gap-4 px-6 py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 border-brand-green/20 shadow-md max-w-2xl">
            <div className="relative flex-shrink-0 mt-1">
              <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping-slow"></div>
              <CheckCircle2 size={32} className="text-brand-green relative z-10" strokeWidth={2.5} fill="currentColor" />
            </div>
            <div className="text-left">
              <div className="text-base md:text-lg font-bold text-brand-text leading-tight mb-1">
                8 из 10 клиентов заказывают повторно
              </div>
              <p className="text-xs md:text-sm font-medium text-brand-text-soft leading-relaxed">
                FreshBox дарят на праздники, заказывают домой и в офис — снова и снова.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionLight>
  );
};

export default WhyFreshBox;
