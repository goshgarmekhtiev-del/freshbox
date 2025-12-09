import React from 'react';
import { ArrowRight, Star, ShoppingBag, Gift, CheckCircle2, Truck, Package, ChevronDown, Sparkles } from 'lucide-react';
import { JUICY_IMAGES } from '@/constants';
import { Button, ImageWithPlaceholder, Container } from '@/components/ui';
import { useReveal } from '@/hooks';

const Hero: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useReveal({ threshold: 0.1 });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustTriggers = [
    { icon: <Star size={18} strokeWidth={2.5} className="fill-brand-accent text-brand-accent" />, text: '500+ довольных клиентов' },
    { icon: <Package size={18} strokeWidth={2.5} className="text-brand-green" />, text: 'Собираем вручную' },
    { icon: <Truck size={18} strokeWidth={2.5} className="text-brand-accent" />, text: 'Доставка за 2 часа' },
    { icon: <Gift size={18} strokeWidth={2.5} className="text-brand-yellow" />, text: 'Подарочная упаковка' },
  ];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-orange-50 via-brand-bg/60 to-lime-50/40 overflow-hidden pt-20 pb-6 md:pt-24 md:pb-8 lg:pt-28 lg:pb-12">
      
      {/* Warmer, More Vibrant Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-brand-accent/12 via-brand-yellow/8 to-transparent rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-brand-green/10 via-brand-accent-light/12 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-brand-yellow/6 to-brand-accent-light/8 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left: Content */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`text-center lg:text-left space-y-4 md:space-y-5 lg:space-y-6 opacity-0 animate-fade-in ${heroVisible ? '' : ''}`} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            
            {/* Badge - Gift Focused */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-accent/10 to-brand-yellow/10 border border-brand-accent/20 text-brand-accent font-black text-xs uppercase tracking-widest">
              <Gift size={12} className="fill-brand-accent" strokeWidth={2.5} />
              <span>Подарочная доставка по Москве</span>
            </div>
            
            {/* Hero Headline - Compact, 2 Lines */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter text-brand-text">
                Премиальные фруктовые{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
                  боксы-подарки
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-text-soft">
                С доставкой за 2 часа по Москве
              </h2>
              
              {/* Description - Compact */}
              <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed text-brand-text-soft max-w-xl mx-auto lg:mx-0 pt-1">
                Красивые подарочные коробки, ручная сборка из лучших сортов фруктов, доставка в день заказа
              </p>
            </div>

            {/* Trust Triggers - 2 Rows, 2 Items Each */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 pt-1 max-w-lg mx-auto lg:mx-0">
              {trustTriggers.map((trigger, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-brand-accent/10 shadow-[--shadow-soft] group hover:border-brand-accent/30 hover:shadow-[--shadow-elevated] transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {trigger.icon}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-brand-text">{trigger.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Compact with Discount Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 relative">
              <div className="relative">
                <Button
                  size="lg"
                  onClick={() => scrollTo('catalog')}
                  icon={<ShoppingBag size={20} strokeWidth={2.5} />}
                  iconPosition="left"
                  className="text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow hover:brightness-110 hover:from-brand-accent-dark hover:via-brand-accent hover:to-brand-yellow shadow-[--shadow-elevated] hover:shadow-[--shadow-elevated] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 font-black"
                >
                  Собрать бокс
                  <ArrowRight size={20} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                {/* Discount Badge - Near CTA */}
                <div className="absolute -top-2 -right-2 bg-white backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-[--shadow-elevated] border-2 border-brand-accent/30 z-20">
                  <p className="text-xs font-black text-brand-accent leading-none">-20%</p>
                  <p className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">Первый заказ</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollTo('b2b')}
                className="text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 border-2 border-brand-text/20 hover:border-brand-accent hover:bg-brand-accent/5 hover:text-brand-accent transition-all duration-300 font-bold"
              >
                Подарки для офиса
              </Button>
            </div>

            {/* CTA Support Text - Compact */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 pt-1 text-xs md:text-sm text-brand-text-soft">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} strokeWidth={2.5} className="text-brand-green shrink-0" />
                <span className="font-medium">Оформление за 2–3 минуты</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} strokeWidth={2.5} className="text-brand-green shrink-0" />
                <span className="font-medium">Оплата онлайн или при получении</span>
              </div>
            </div>
          </div>
          
          {/* Right: Hero Visual - Enhanced, Premium Box */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[260px] md:min-h-[320px] lg:min-h-[360px] order-last lg:order-last mt-4 lg:mt-0">
             
             {/* Main Image Container - Optimized Size with Shadow */}
             <div className="relative w-full max-w-[400px] md:max-w-[480px] lg:max-w-[520px]">
                
                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/25 via-brand-yellow/20 to-brand-green/20 rounded-[--radius-card] blur-3xl scale-110 opacity-60"></div>
                
                {/* Premium Box Card */}
                <div className="relative z-10 w-full rounded-[--radius-card] overflow-hidden bg-white shadow-[0_20px_60px_rgba(249,115,22,0.15)] border-2 border-brand-accent/10">
                  
                  {/* Header Section */}
                  <div className="px-5 md:px-6 pt-5 md:pt-6 pb-3 border-b border-brand-accent/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift size={24} strokeWidth={2.5} className="text-brand-accent fill-brand-accent/20" />
                      <h3 className="text-lg md:text-xl font-black text-brand-text">Премиальный фруктовый бокс</h3>
                    </div>
                    <p className="text-sm md:text-base font-bold text-brand-accent">
                      Хит продаж "Забота о маме" • <span className="text-brand-text">3 990 ₽</span>
                    </p>
                  </div>
                  
                  {/* Visual Zone - Large Fruit Icons with Radial Gradient */}
                  <div className="relative px-5 md:px-6 py-8 md:py-10 min-h-[200px] md:min-h-[240px] flex items-center justify-center overflow-hidden">
                    {/* Radial gradient background - light from center */}
                    <div className="absolute inset-0" style={{
                      background: 'radial-gradient(circle at center, rgba(253, 224, 71, 0.2), rgba(217, 249, 157, 0.1), rgba(249, 115, 22, 0.05))'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/15 via-transparent to-brand-green/10"></div>
                    
                    {/* Large Fruit Icons with Shadows - Organic Layout */}
                    <div className="relative w-full h-full">
                      {/* Orange - slightly higher and left */}
                      <div 
                        className="absolute w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.2)] flex items-center justify-center border-2 border-brand-accent-light/30 animate-float-slow"
                        style={{ 
                          animation: 'float 12s ease-in-out infinite',
                          left: '15%',
                          top: '35%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-5xl md:text-6xl" role="img" aria-label="orange">🍊</span>
                      </div>
                      
                      {/* Kiwi - center, slightly lower */}
                      <div 
                        className="absolute w-18 h-18 md:w-22 md:h-22 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.2)] flex items-center justify-center border-2 border-brand-green/30 animate-float-slow"
                        style={{ 
                          animation: 'float 14s ease-in-out infinite 2s',
                          left: '50%',
                          top: '55%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-4xl md:text-5xl" role="img" aria-label="kiwi">🥝</span>
                      </div>
                      
                      {/* Strawberry - right, slightly higher */}
                      <div 
                        className="absolute w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_10px_30px_rgba(253,224,71,0.2)] flex items-center justify-center border-2 border-brand-yellow/30 animate-float-slow"
                        style={{ 
                          animation: 'float 13s ease-in-out infinite 1s',
                          left: '75%',
                          top: '40%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-3xl md:text-4xl" role="img" aria-label="strawberry">🍓</span>
                      </div>
                    </div>
                    
                    {/* Try to load actual image if available */}
                    <div className="absolute inset-0 opacity-0 pointer-events-none">
                      <ImageWithPlaceholder
                        src={JUICY_IMAGES.box1}
                        alt="Премиальный подарочный фруктовый бокс FreshBox"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Footer - CTA Link */}
                  <div className="px-5 md:px-6 py-4 border-t border-brand-accent/10">
                    <button
                      onClick={() => scrollTo('catalog')}
                      className="w-full flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-accent hover:text-brand-accent-dark transition-colors duration-300 group"
                    >
                      <span>Смотреть набор</span>
                      <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                  
                  {/* Sticker - "Хит: Забота о маме" */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-xl shadow-[--shadow-elevated] border-2 border-brand-accent/30 z-20">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Sparkles size={12} className="text-brand-accent fill-brand-accent" strokeWidth={2.5} />
                      <span className="text-[10px] font-black text-brand-accent uppercase tracking-wider">Хит</span>
                    </div>
                    <p className="text-xs md:text-sm font-black text-brand-text leading-tight">"Забота о маме"</p>
                    <p className="text-base md:text-lg font-black text-brand-accent leading-none mt-0.5">3 990 ₽</p>
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