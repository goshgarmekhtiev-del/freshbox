import React from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Zap } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-brand-accent-light to-lime-50 overflow-hidden pt-32 md:pt-40 pb-20">
      
      {/* Accent Background Blobs - Orange & Yellow Glow */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-brand-accent/20 to-transparent rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-brand-yellow/15 to-transparent rounded-full blur-[150px] opacity-50 pointer-events-none"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 xl:gap-40 items-center">
          
          {/* Left: Premium Text Content - Increased Spacing */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`space-y-12 text-center lg:text-left opacity-0 animate-fade-in ${heroVisible ? '' : ''}`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            
            {/* Premium Badge - Warmer Gradient */}
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black text-xs uppercase tracking-[0.15em] shadow-[--shadow-soft] mx-auto lg:mx-0 border-2 border-white/30">
              <Zap size={18} className="fill-white" strokeWidth={2.5} />
              <span>Premium Fresh Selection</span>
            </div>
            
            {/* Bold, Confident Typography - Mobile Optimized */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-brand-text">
              Свежие.
              <span className="block mt-3 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
                Сочные.
              </span>
              <span className="block mt-3 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-green to-brand-yellow">
                Твои.
              </span>
            </h1>
            
            {/* Clean, Spacious Description - Mobile Line Clamp */}
            <p className="text-base sm:text-lg font-medium leading-relaxed text-brand-text-soft max-w-2xl mx-auto lg:mx-0 line-clamp-4 sm:line-clamp-none">
              Handpicked premium fruit boxes.
              <span className="block mt-3 md:mt-4 text-brand-accent font-semibold bg-gradient-to-r from-brand-accent to-brand-accent-dark text-transparent bg-clip-text">
                Delivered fresh to your door.
              </span>
            </p>

            {/* Premium CTA Buttons - More Space & Depth */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
              <Button
                size="xl"
                onClick={() => scrollTo('catalog')}
                icon={<ShoppingBag size={28} strokeWidth={2.5} />}
                iconPosition="left"
                className="tracking-wide text-2xl bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow hover:brightness-110 border-0"
              >
                Order Now
                <ArrowRight size={28} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button
                variant="ghost"
                size="xl"
                onClick={() => scrollTo('b2b')}
                icon={<Sparkles size={26} strokeWidth={2.5} />}
                iconPosition="left"
                className="glass border-3 border-brand-accent/30 text-2xl hover:border-brand-accent"
              >
                For Business
              </Button>
            </div>

            {/* Social Proof - Premium Style with More Space */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
               <div className="flex -space-x-5">
                  <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-[--shadow-soft] overflow-hidden ring-2 ring-brand-accent-light">
                    <ResponsiveImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=webp"
                      alt="Довольный клиент FreshBox — женщина с фруктовым боксом"
                      autoOptimize
                      loading="eager"
                      sizes="64px"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-[--shadow-soft] overflow-hidden ring-2 ring-brand-accent-light">
                    <ResponsiveImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=webp"
                      alt="Довольный клиент FreshBox — мужчина с заказом фруктов"
                      autoOptimize
                      loading="eager"
                      sizes="64px"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-[--shadow-soft] overflow-hidden ring-2 ring-brand-accent-light">
                    <ResponsiveImage
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=webp"
                      alt="Довольная клиентка FreshBox — женщина с доставкой"
                      autoOptimize
                      loading="eager"
                      sizes="64px"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
               </div>
               <div className="text-left">
                 <div className="flex gap-1 mb-2">
                   {[1,2,3,4,5].map(i => <Star key={i} size={20} strokeWidth={2.5} className="fill-brand-accent text-brand-accent" />)}
                 </div>
                 <p className="text-base font-bold text-brand-text">
                   <span className="text-brand-accent text-2xl font-black">500+</span>
                   <span className="ml-2">happy customers</span>
                 </p>
               </div>
            </div>
          </div>
          
          {/* Right: Premium Fruit Showcase - Larger Imagery */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[550px] lg:min-h-[700px]">
             
             {/* Main Hero Image - Extra Large, Appetizing */}
             <div className="relative w-full max-w-[750px] aspect-square">
                
                {/* Glowing Background - Subtle Premium Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/40 via-brand-accent-dark/30 to-brand-yellow/30 rounded-full blur-3xl scale-110 opacity-90"></div>
                
                {/* Central Fruit Box Image - Larger Scale */}
                <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ animation: 'fade-in-up 0.8s ease-out backwards' }}>
                    <ImageWithPlaceholder
                      src={JUICY_IMAGES.box1}
                      alt="Премиальный фруктовый бокс FreshBox со свежими фруктами — клубника, манго, киви, виноград"
                      containerClassName="w-full h-full"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
                
                {/* Floating Fruit Elements - Premium Subtle Accents */}
                
                {/* Orange - Top Right - Reduced size, removed rotation */}
                <div className="absolute top-10 -right-6 sm:top-16 sm:right-0 glass border-2 border-white/70 p-4 sm:p-5 rounded-3xl shadow-[--shadow-soft] z-20 transition-all duration-500" style={{ animation: 'fade-in-up 1s ease-out 0.3s backwards, float 4.5s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-brand-accent-light via-brand-accent-light to-brand-yellow rounded-2xl p-3 sm:p-4 shadow-inner">
                      <span className="text-4xl sm:text-5xl" role="img" aria-label="orange">🍊</span>
                   </div>
                </div>

                {/* Kiwi - Left Side - Reduced size, removed rotation */}
                <div className="absolute top-1/3 -left-8 sm:-left-10 glass border-2 border-white/70 p-4 sm:p-5 rounded-3xl shadow-[--shadow-soft] z-20 transition-all duration-500" style={{ animation: 'fade-in-up 1s ease-out 0.5s backwards, float 5s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-brand-green via-brand-accent-light to-brand-yellow rounded-2xl p-3 sm:p-4 shadow-inner">
                      <span className="text-4xl sm:text-5xl" role="img" aria-label="kiwi">🥝</span>
                   </div>
                </div>

                {/* Peach - Bottom Left - Reduced size, removed rotation */}
                <div className="absolute bottom-20 left-6 sm:left-10 glass border-2 border-white/70 p-3 sm:p-4 rounded-3xl shadow-[--shadow-soft] z-20 transition-all duration-500" style={{ animation: 'fade-in-up 1s ease-out 0.7s backwards, float 4.8s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-brand-accent-light via-brand-accent-light to-brand-yellow rounded-2xl p-3 sm:p-3 shadow-inner">
                      <span className="text-3xl sm:text-4xl" role="img" aria-label="peach">🍑</span>
                   </div>
                </div>

                {/* Premium Discount Badge - Enhanced Depth */}
                <div className="absolute -bottom-6 right-10 sm:right-16 bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-text backdrop-blur-xl text-white px-10 sm:px-12 py-8 sm:py-9 rounded-[3rem] shadow-[--shadow-elevated] z-20 border-3 border-brand-accent/50 transition-all duration-500" style={{ animation: 'fade-in-up 1s ease-out 0.9s backwards' }}>
                  <div className="text-center">
                    <p className="font-black text-5xl sm:text-6xl bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-transparent bg-clip-text leading-none drop-shadow-lg">20%</p>
                    <p className="text-xs font-black text-brand-accent-light uppercase tracking-[0.25em] mt-3">First Order</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </Container>

      {/* Premium Trust Banner - Enhanced with Design System */}
      <div ref={trustRef as React.RefObject<HTMLDivElement>} className={`absolute bottom-0 left-0 right-0 glass border-t-2 border-brand-accent/40 py-5 z-20 shadow-soft-md reveal reveal-slide-up ${trustVisible ? 'reveal-visible' : ''}`}>
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4 text-brand-text-soft">
            <div className="flex items-center gap-3">
              <Star className="text-brand-accent fill-brand-accent" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-brand-accent-dark fill-brand-accent-dark" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">2-Hour Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-brand-green fill-brand-green" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">100% Fresh</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;