import React, { useEffect } from 'react';
import { ArrowRight, Star, ShoppingBag, Gift, CheckCircle2, Truck, Package, ChevronDown, Sparkles } from 'lucide-react';
import { JUICY_IMAGES } from '@/constants';
import { Button, LazyImage, Container } from '@/components/ui';
import { useReveal } from '@/hooks';
import { sendEvent } from '@/utils/metrics';

const Hero: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useReveal({ threshold: 0.1 });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustTriggers = [
    { icon: <Star size={18} strokeWidth={2.5} className="fill-brand-accent text-brand-accent" />, text: '500+ клиентов' },
    { icon: <Package size={18} strokeWidth={2.5} className="text-brand-green" />, text: 'Ручная сборка' },
    { icon: <Truck size={18} strokeWidth={2.5} className="text-brand-accent" />, text: 'За 2 часа' },
  ];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-orange-50 via-brand-bg/60 to-lime-50/40 overflow-hidden pt-20 pb-6 md:pt-24 md:pb-8 lg:pt-28 lg:pb-12">
      
      {/* Warmer, More Vibrant Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-brand-accent/12 via-brand-yellow/8 to-transparent rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-brand-green/10 via-brand-accent-light/12 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-brand-yellow/6 to-brand-accent-light/8 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:justify-between">
          
          {/* Left: Content */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`text-center lg:text-left space-y-6 md:space-y-7 lg:space-y-8 lg:max-w-[600px] opacity-0 animate-fade-in ${heroVisible ? '' : ''}`} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            
            {/* Badge - Gift Focused */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest shadow-sm">
              <Gift size={14} className="fill-brand-accent" strokeWidth={2.5} />
              <span>Подарочная доставка по Москве</span>
            </div>
            
            {/* Hero Headline */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-brand-text">
                Премиальные<br />
                фруктовые{' '}
                <span className="text-gradient-brand-heading">
                  боксы‑подарки
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-text-soft">
                С доставкой за 2 часа по Москве
              </h2>
              
              {/* Description */}
              <p className="text-base md:text-lg font-medium leading-relaxed text-brand-text-soft max-w-xl mx-auto lg:mx-0">
                Красивые подарочные коробки с ручной сборкой из лучших сортов фруктов
              </p>
            </div>

            {/* Trust Triggers - 3 items in one row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
              {trustTriggers.map((trigger, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 border border-brand-accent/10 shadow-sm group hover:border-brand-accent/30 hover:shadow-md transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {trigger.icon}
                  </div>
                  <span className="text-sm md:text-base font-bold text-brand-text whitespace-nowrap">{trigger.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="relative">
                <Button
                  size="lg"
                  onClick={() => {
                    sendEvent("Hero_CTA_Click");
                    scrollTo('catalog');
                  }}
                  icon={<ShoppingBag size={22} strokeWidth={2.5} />}
                  iconPosition="left"
                  className="text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow hover:brightness-110 shadow-[0_20px_50px_rgba(249,115,22,0.3)] hover:shadow-[0_24px_60px_rgba(249,115,22,0.4)] hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 font-black rounded-full"
                >
                  Собрать бокс
                  <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                {/* Discount Badge */}
                <div className="absolute -top-3 -right-3 bg-white backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-lg border-2 border-brand-accent/30 z-20 animate-pulse">
                  <p className="text-sm font-black text-brand-accent leading-none">-20%</p>
                </div>
              </div>
              
              <button
                onClick={() => scrollTo('b2b')}
                className="text-base md:text-lg px-8 py-4 font-bold text-brand-text-soft hover:text-brand-accent transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-brand-accent/30 hover:decoration-brand-accent"
              >
                Подарки для офиса
              </button>
            </div>

            {/* CTA Support Text */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-brand-text-soft">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand-green shrink-0" />
                <span className="font-medium">Оформление за 2 минуты</span>
              </div>
              <span className="hidden sm:inline text-brand-text/30">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} strokeWidth={2.5} className="text-brand-green shrink-0" />
                <span className="font-medium">Оплата при получении</span>
              </div>
            </div>
          </div>
          
          {/* Right: Hero Image - Large, Clean, Premium */}
          <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-[620px] order-first lg:order-last">
             
             {/* Premium Image Container */}
             <div className="relative w-full">
                
                {/* Glow Effect Behind Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-brand-yellow/15 to-brand-green/15 rounded-[32px] blur-3xl scale-105 opacity-70"></div>
                
                {/* Main Image - No Card Wrapper */}
                <div className="relative z-10">
                  <LazyImage
                    src={JUICY_IMAGES.box1}
                    alt="Премиальный подарочный фруктовый бокс FreshBox"
                    priority={true}
                    aspectRatio="w-full aspect-[4/3]"
                    imgClassName="object-cover rounded-[32px] shadow-[0_24px_80px_rgba(249,115,22,0.2)] transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_32px_100px_rgba(249,115,22,0.25)]"
                    skeletonClassName="bg-gradient-to-br from-orange-100/70 via-yellow-100/60 to-amber-100/70 rounded-[32px]"
                  />
                  
                  {/* Premium Badge - Top Left */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gradient-to-r from-brand-accent to-brand-accent-dark backdrop-blur-xl px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-[0_16px_40px_rgba(249,115,22,0.4)] border border-white/20 z-20">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={14} className="text-white fill-white" strokeWidth={2.5} />
                      <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">Хит продаж</span>
                    </div>
                    <p className="text-sm md:text-base font-black text-white leading-tight">"Забота о маме"</p>
                    <p className="text-xl md:text-2xl font-black text-white leading-none mt-1">3 990 ₽</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Scroll Hint - Bottom Center */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow z-10">
          <p className="text-xs font-semibold text-brand-text/60 hidden md:block">Листайте ниже — посмотрите наборы</p>
          <ChevronDown size={16} strokeWidth={2.5} className="text-brand-accent" />
        </div>
      </Container>
    </section>
  );
};

export default Hero;