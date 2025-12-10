import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Users, Shield, Gift, Sparkles, Clock, Percent, CheckCircle } from 'lucide-react';
import B2BForm from '@/components/B2BForm';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { SectionAccent } from '@/components/ui';

const B2B: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: headerRef, isVisible: headerVisible } = useReveal({ threshold: 0.2 });
  const benefitReveals = useStaggeredReveal(4, 200, 120);

  // Metrics for top section
  const metrics = [
    {
      icon: <TrendingUp size={20} strokeWidth={2.5} />,
      label: '+25% продуктивности*',
      gradient: 'from-brand-accent to-brand-accent-dark'
    },
    {
      icon: <Percent size={20} strokeWidth={2.5} />,
      label: 'до 20% скидки на регулярные поставки',
      gradient: 'from-brand-green to-brand-accent-light'
    },
    {
      icon: <Clock size={20} strokeWidth={2.5} />,
      label: 'доставка за ~120 минут по Москве',
      gradient: 'from-brand-yellow to-brand-accent'
    }
  ];

  // 4 benefit cards for 2x2 grid with badges
  const benefits = [
    {
      icon: <TrendingUp size={28} strokeWidth={2.5} />,
      title: 'Продуктивность +25%',
      badge: 'Результат',
      bullets: [
        'Свежие фрукты вместо тяжёлых перекусов',
        'Снижаем сахарные пики и сонливость',
        'Энергия на весь день'
      ],
      gradient: 'from-brand-accent to-brand-accent-dark'
    },
    {
      icon: <Users size={28} strokeWidth={2.5} />,
      title: 'Лояльность команды',
      badge: 'HR-эффект',
      bullets: [
        'Забота о сотрудниках, которую видно',
        'HR-бренд и вовлечённость',
        'Меньше больничных и выгорания'
      ],
      gradient: 'from-brand-accent-light to-brand-green'
    },
    {
      icon: <Shield size={28} strokeWidth={2.5} />,
      title: 'Надёжный партнёр',
      badge: 'Операционка',
      bullets: [
        'Регулярные поставки по графику',
        'Полный пакет документов',
        'Оплата по счёту'
      ],
      gradient: 'from-brand-green to-brand-accent'
    },
    {
      icon: <Gift size={28} strokeWidth={2.5} />,
      title: 'Брендирование и подарки',
      badge: 'Маркетинг',
      bullets: [
        'Ваш логотип на коробках',
        'Фруктовые наборы для клиентов',
        'Подарки партнёрам и VIP-гостям'
      ],
      gradient: 'from-brand-yellow to-brand-accent'
    }
  ];

  // Premium conditions for right column
  const premiumConditions = [
    'Скидки до 20% на регулярные поставки',
    'Брендирование боксов вашим логотипом',
    'Оплата по счёту, полный пакет документов',
    'Гибкие графики и объёмы поставок',
    'Персональный менеджер для вашей компании'
  ];

  // Placeholder logos
  const clientLogos = ['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5'];

  return (
    <SectionAccent id="b2b" ref={sectionRef} className={`reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        
        {/* Header Section - Compact for 1440x900 */}
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className={`text-center mb-7 reveal reveal-fade-up ${headerVisible ? 'reveal-visible' : ''}`}>
          <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-5 shadow-sm">
            Бизнес
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight mb-3 max-w-4xl mx-auto">
            Энергия{' '}
            <span className="text-gradient-brand-heading">
              витаминов
            </span>{' '}
            для вашей команды
          </h2>
          
          <p className="text-lg lg:text-xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed mb-6">
            Замените печенье и сладости на свежие фрукты. Поднимем продуктивность, настроение и лояльность сотрудников.
          </p>

          {/* Metrics Row - Compact with hover */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-sm rounded-2xl border border-brand-text/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${metric.gradient} text-white shadow-md`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-semibold text-brand-text leading-snug">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout - Benefits (40%) + Offer Card (60%) - optimized for 1440x900 */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start mb-8">
          
          {/* Left Column - 4 Benefit Cards in 2x2 Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={benefitReveals[index].ref as React.RefObject<HTMLDivElement>}
                className={`relative bg-gradient-to-br from-white/90 to-emerald-50/30 backdrop-blur-sm rounded-[28px] p-6 border border-brand-text/10 hover:border-brand-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group reveal reveal-scale-in flex flex-col h-full ${benefitReveals[index].isVisible ? 'reveal-visible' : ''}`}
              >
                {/* Badge in top-right corner */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full badge-brand-dark text-xs font-bold uppercase tracking-widest shadow-sm">
                  <span className="text-white">{benefit.badge}</span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} text-white mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-black text-brand-text mb-3 leading-tight pr-16">
                  {benefit.title}
                </h3>
                
                {/* Bullets */}
                <ul className="space-y-1.5 flex-1">
                  {benefit.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-brand-text-soft leading-snug">
                      <CheckCircle size={14} strokeWidth={2.5} className="text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column - Premium Offer Card (MAIN VISUAL FOCUS) */}
          <div className="bg-gradient-to-br from-[#FFF9E6] via-[#F0FFF4] to-[#DFFFD6] rounded-[32px] p-7 lg:p-9 shadow-[0_24px_60px_rgba(15,118,110,0.18)] border-2 border-brand-text/10 flex flex-col relative overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(6, 78, 59, 0.18), 0 0 0 1px rgba(6, 78, 59, 0.1), 0 0 40px rgba(22, 163, 74, 0.1) inset' }}>
            
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-5 self-start shadow-sm">
                <Sparkles size={16} strokeWidth={2.5} className="text-brand-accent" />
                <span>Премиум-условия</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl lg:text-3xl font-black text-brand-text leading-tight mb-2">
                Премиум-условия для корпораций
              </h3>
              
              <p className="text-sm text-brand-text-soft leading-relaxed mb-5">
                Подберём формат поставок и условия под ваш офис
              </p>

              {/* Conditions List - Compact */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {premiumConditions.map((condition, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-text leading-snug">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2"></div>
                    <span className="font-semibold">{condition}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - МАКСИМАЛЬНО ЗАМЕТНАЯ */}
              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full px-8 py-5 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-[#FF8C00] text-white rounded-full font-black text-lg shadow-[0_24px_60px_rgba(248,113,22,0.55)] hover:shadow-[0_28px_70px_rgba(248,113,22,0.65)] hover:scale-[1.02] hover:brightness-110 active:translate-y-[1px] transition-all duration-300 flex items-center justify-center gap-3 group mb-2.5"
              >
                <span>Получить КП</span>
                <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <p className="text-center text-xs text-brand-text-soft/80 font-medium mb-5">
                Ответим в течение 1 часа
              </p>

              {/* Trust Line */}
              <div className="pt-5 border-t border-emerald-200/60">
                <p className="text-xs text-brand-text-soft leading-relaxed text-center">
                  Уже работаем с офисами, коворкингами и ИТ-компаниями
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Trust Block with Logos - Lightweight pill style */}
        <div className="flex flex-col items-center gap-4 py-6 px-6">
          <p className="text-sm font-semibold text-brand-text-soft text-center">
            FreshBox уже выбирают для офисов, коворкингов и event-агентств
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-6 py-2.5 rounded-full bg-transparent border border-brand-green/30 text-xs font-semibold text-brand-text-soft/60 hover:border-brand-green/50 hover:text-brand-text-soft/80 transition-all duration-300"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

      </div>

      <B2BForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </SectionAccent>
  );
};

export default B2B;
