import React from 'react';
import { ArrowRight, Star, ShoppingBag, Zap } from 'lucide-react';
import { JUICY_IMAGES } from '@/constants';
import { Button, ResponsiveImage, ImageWithPlaceholder, Container } from '@/components/ui';
import { useReveal } from '@/hooks';

const Hero: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useReveal({ threshold: 0.1 });
  const { ref: trustRef, isVisible: trustVisible } = useReveal({ threshold: 0.5, delay: 200 });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-white via-brand-bg/50 to-white overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
      
      {/* Subtle Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-brand-accent/8 via-brand-yellow/5 to-transparent rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-brand-green/6 via-brand-accent-light/8 to-transparent rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      <Container>
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12 max-w-5xl mx-auto">
          
          {/* Badge - Minimal */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`opacity-0 animate-fade-in ${heroVisible ? '' : ''}`} style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest">
              <Zap size={12} className="fill-brand-accent" strokeWidth={2.5} />
              <span>Премиум доставка</span>
            </div>
          </div>
            
          {/* Hero Headline - Ultra Bold, Centered */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-brand-text">
              Свежие фрукты
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
                за 2 часа
              </span>
            </h1>
            
            {/* Description - Clean & Spacious */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-brand-text-soft">
                Премиальные фруктовые боксы, собранные вручную из лучших сортов
              </p>
              <p className="text-lg md:text-xl font-semibold text-brand-accent">
                Доставка по Москве в день заказа
              </p>
            </div>
          </div>

          {/* CTA Buttons - Centered Stack */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="xl"
              onClick={() => scrollTo('catalog')}
              icon={<ShoppingBag size={24} strokeWidth={2.5} />}
              iconPosition="left"
              className="text-xl md:text-2xl px-10 md:px-12 py-6 md:py-7 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow hover:brightness-110 shadow-[--shadow-elevated] hover:shadow-[--shadow-elevated] hover:scale-105 transition-all duration-300"
            >
              Выбрать бокс
              <ArrowRight size={24} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button
              variant="ghost"
              size="xl"
              onClick={() => scrollTo('b2b')}
              className="text-xl md:text-2xl px-10 md:px-12 py-6 md:py-7 border-2 border-brand-text/20 hover:border-brand-accent hover:bg-brand-accent/5 hover:text-brand-accent transition-all duration-300"
            >
              Для бизнеса
            </Button>
          </div>

          {/* Social Proof - Centered, Minimalist */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
             <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=webp"
                ].map((src, idx) => (
                  <div key={idx} className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-3 border-white shadow-[--shadow-soft] overflow-hidden ring-2 ring-brand-accent-light/40">
                    <ResponsiveImage
                      src={src}
                      alt={`Довольный клиент FreshBox`}
                      autoOptimize
                      loading="eager"
                      sizes="64px"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
             </div>
             <div className="text-center sm:text-left">
               <div className="flex gap-0.5 justify-center sm:justify-start mb-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={18} strokeWidth={2.5} className="fill-brand-accent text-brand-accent" />)}
               </div>
               <p className="text-base md:text-lg font-bold text-brand-text">
                 <span className="text-brand-accent text-2xl md:text-3xl font-black">500+</span>
                 <span className="ml-2">довольных клиентов</span>
               </p>
             </div>
          </div>

          {/* Hero Image - Centered, Below Text */}
          <div className="relative w-full max-w-4xl mt-6 md:mt-8 lg:mt-10">
             {/* Main Image Container */}
             <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                
                {/* Glow Effect - Softer */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-brand-yellow/15 to-brand-green/15 rounded-full blur-3xl scale-110 opacity-50"></div>
                
                {/* Central Image */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <ImageWithPlaceholder
                      src={JUICY_IMAGES.box1}
                      alt="Премиальный фруктовый бокс FreshBox"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
                
                {/* Floating Elements - Subtle */}
                <div className="absolute top-8 right-8 w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-[--shadow-elevated] flex items-center justify-center border-2 border-brand-accent-light/30 z-20 animate-float" style={{ animation: 'float 5s ease-in-out infinite' }}>
                   <span className="text-3xl md:text-4xl" role="img" aria-label="orange">🍊</span>
                </div>

                <div className="absolute bottom-24 left-8 w-14 h-14 md:w-18 md:h-18 bg-white/95 backdrop-blur-md rounded-2xl shadow-[--shadow-elevated] flex items-center justify-center border-2 border-brand-green/30 z-20 animate-float" style={{ animation: 'float 6s ease-in-out infinite 1s' }}>
                   <span className="text-2xl md:text-3xl" role="img" aria-label="kiwi">🥝</span>
                </div>

                {/* Discount Badge - Modern, Centered */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white backdrop-blur-xl px-8 py-5 rounded-2xl shadow-[--shadow-elevated] border-2 border-brand-accent/30 z-20">
                  <div className="text-center">
                    <p className="font-black text-4xl md:text-5xl bg-gradient-to-r from-brand-accent to-brand-yellow text-transparent bg-clip-text leading-none">20%</p>
                    <p className="text-xs font-bold text-brand-accent uppercase tracking-wider mt-1">Первый заказ</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Container>

      {/* Trust Banner - Floating, Minimalist */}
      <div ref={trustRef as React.RefObject<HTMLDivElement>} className={`absolute bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/90 border border-brand-accent/10 shadow-[--shadow-elevated] rounded-2xl py-4 px-8 z-20 reveal reveal-slide-up ${trustVisible ? 'reveal-visible' : ''}`}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-2 text-brand-text/70">
          <div className="flex items-center gap-2.5 group">
            <Star className="text-brand-accent fill-brand-accent group-hover:scale-110 transition-transform duration-300" size={18} strokeWidth={2.5} />
            <span className="font-semibold text-sm md:text-base">Премиум качество</span>
          </div>
          <div className="flex items-center gap-2.5 group">
            <Star className="text-brand-accent-dark fill-brand-accent-dark group-hover:scale-110 transition-transform duration-300" size={18} strokeWidth={2.5} />
            <span className="font-semibold text-sm md:text-base">Доставка за 2 часа</span>
          </div>
          <div className="flex items-center gap-2.5 group">
            <Star className="text-brand-green fill-brand-green group-hover:scale-110 transition-transform duration-300" size={18} strokeWidth={2.5} />
            <span className="font-semibold text-sm md:text-base">100% свежесть</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;