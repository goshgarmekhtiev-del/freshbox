import React, { useState, useRef, useEffect } from 'react';
import { Clock, CheckCircle2, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

interface ReasonCard {
  id: number;
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  glowColor: string;
  isMain?: boolean;
}

const ProblemSolution: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reasons: ReasonCard[] = [
    {
      id: 1,
      number: '01',
      icon: <Clock size={56} strokeWidth={2.5} />,
      title: 'Экономим ваше время',
      description: 'Соберём бокс и привезём за 2 часа. Не нужно искать фрукты и упаковку по городу.',
      gradient: 'from-orange-100/95 via-brand-yellow/40 to-brand-accent/30',
      iconColor: 'from-brand-accent via-brand-accent-dark to-brand-yellow',
      glowColor: 'rgba(249, 115, 22, 0.25)',
    },
    {
      id: 2,
      number: '02',
      icon: <CheckCircle2 size={56} strokeWidth={2.5} />,
      title: 'Только спелые и сладкие фрукты',
      description: 'Каждый фрукт пробуем и отбираем вручную. Гарантируем свежесть и вкус.',
      gradient: 'from-lime-100/95 via-brand-green/40 to-emerald-200/30',
      iconColor: 'from-brand-green via-emerald-500 to-brand-green',
      glowColor: 'rgba(22, 163, 74, 0.25)',
      isMain: true,
    },
    {
      id: 3,
      number: '03',
      icon: <Gift size={56} strokeWidth={2.5} />,
      title: 'Подарок с вау-эффектом',
      description: 'Стильная упаковка, за которую не стыдно — как на красивых сторис.',
      gradient: 'from-yellow-100/95 via-brand-yellow/40 to-amber-200/30',
      iconColor: 'from-brand-yellow via-amber-400 to-brand-accent',
      glowColor: 'rgba(253, 224, 71, 0.25)',
    },
  ];

  // Handle horizontal scroll on mobile to track active card
  // 🔧 ФИКС: Используем ref для предотвращения лишних setState
  const prevActiveCardIndexRef = React.useRef(0);
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      // 🔧 ФИКС: Вызываем setState только при реальном изменении индекса
      if (newIndex !== prevActiveCardIndexRef.current) {
        prevActiveCardIndexRef.current = newIndex;
        setActiveCardIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <SectionLight 
      ref={sectionRef} 
      id="problem-solution" 
      className={`reveal ${sectionVisible ? 'reveal-visible' : ''} scroll-mt-24 md:scroll-mt-28 relative overflow-hidden`} 
      withBlobs={false}
    >
      {/* Clean, Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 via-yellow-50/50 to-lime-50/60 pointer-events-none"></div>
      
      {/* Subtle Light Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-bl from-brand-accent/8 to-transparent rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] md:w-[650px] md:h-[650px] bg-gradient-to-tr from-brand-green/10 to-transparent rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={16} strokeWidth={2.5} />
            <span>3 супер-причины</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-4 px-4">
            Почему все{' '}
            <span className="text-gradient-brand-heading">
              выбирают FreshBox
            </span>
            ?
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft font-semibold max-w-2xl mx-auto px-4">
            Не просто фрукты —{' '}
            <span className="text-gradient-brand-heading font-bold">
              эмоция в коробке
            </span>{' '}
            💚
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative mb-10 md:mb-14">
          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div 
            ref={scrollContainerRef}
            className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 pb-2 -mx-4 px-4"
          >
            {reasons.map((reason) => (
              <ReasonCardMobile key={reason.id} reason={reason} />
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason) => (
              <ReasonCardDesktop key={reason.id} reason={reason} />
            ))}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {reasons.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCardIndex === index
                    ? 'w-6 bg-brand-accent'
                    : 'bg-brand-text/20'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Line + CTA */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pt-10 md:pt-12 border-t-2 border-brand-accent/15 reveal reveal-fade-up ${sectionVisible ? 'reveal-visible' : ''}`}>
          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping-slow"></div>
              <CheckCircle2 size={40} className="text-brand-green relative z-10" strokeWidth={2.5} fill="currentColor" />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-green leading-none mb-1">
                500+ 🎉
              </div>
              <p className="text-sm md:text-base font-semibold text-brand-text-soft">
                счастливых клиентов
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToCatalog}
            className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Выбрать бокс
              <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </SectionLight>
  );
};

// Mobile Card Component
const ReasonCardMobile = ({ reason }: { reason: ReasonCard }) => (
  <div 
    className="flex-shrink-0 w-[85vw] snap-center"
  >
    <div 
      className={`relative h-full rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 ${
        reason.isMain 
          ? 'border-brand-green/40 bg-gradient-to-br from-lime-50 via-white to-emerald-50/50' 
          : 'border-brand-text/10 bg-white/90 backdrop-blur-sm'
      }`}
      style={{
        boxShadow: reason.isMain 
          ? `0 20px 40px -10px ${reason.glowColor}, 0 0 0 1px rgba(22, 163, 74, 0.1)`
          : `0 15px 30px -8px ${reason.glowColor}`,
      }}
    >
      {/* Main Badge */}
      {reason.isMain && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-green to-emerald-600 text-white font-bold text-xs uppercase tracking-wide shadow-md z-20 flex items-center gap-1">
          <span>⭐</span>
          <span>Главная причина</span>
        </div>
      )}

      {/* Number Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-brand-text/10 to-brand-text/5 flex items-center justify-center text-brand-text/40 font-black text-sm z-10">
        {reason.number}
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div 
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${reason.iconColor} flex items-center justify-center text-white shadow-md transition-transform duration-300`}
        >
          {reason.icon}
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-black text-brand-text leading-tight mb-3">
          {reason.title}
        </h3>
        <p className="text-sm text-brand-text-soft font-medium leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  </div>
);

// Desktop Card Component
const ReasonCardDesktop = ({ reason }: { reason: ReasonCard }) => (
  <div 
    className={`group relative rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      reason.isMain 
        ? 'border-brand-green/40 bg-gradient-to-br from-lime-50 via-white to-emerald-50/50 scale-[1.02]' 
        : 'border-brand-text/10 bg-white/90 backdrop-blur-sm hover:border-brand-accent/30'
    }`}
    style={{
      boxShadow: reason.isMain 
        ? `0 25px 50px -12px ${reason.glowColor}, 0 0 0 1px rgba(22, 163, 74, 0.1)`
        : `0 20px 40px -10px ${reason.glowColor}`,
    }}
  >
    {/* Main Badge */}
    {reason.isMain && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-green to-emerald-600 text-white font-bold text-xs uppercase tracking-wide shadow-lg z-20 flex items-center gap-1.5">
        <span>⭐</span>
        <span>Главная причина</span>
      </div>
    )}

    {/* Number Badge */}
    <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-gradient-to-br from-brand-text/10 to-brand-text/5 flex items-center justify-center text-brand-text/40 font-black text-base z-10 group-hover:rotate-12 transition-transform duration-300">
      {reason.number}
    </div>

    {/* Glow Effect on Hover */}
    <div 
      className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
      style={{
        background: `radial-gradient(circle at center, ${reason.glowColor}, transparent 70%)`,
      }}
    ></div>

    <div className="relative z-10">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div 
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${reason.iconColor} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
        >
          {reason.icon}
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-2xl font-black text-brand-text leading-tight mb-4">
          {reason.title}
        </h3>
        <p className="text-base text-brand-text-soft font-medium leading-relaxed">
          {reason.description}
        </p>
      </div>
    </div>
  </div>
);

export default ProblemSolution;
