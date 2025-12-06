
import React from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Zap } from 'lucide-react';
import { JUICY_IMAGES } from '../constants';
import { useReveal } from '../utils/useReveal';

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-peach-50 to-lime-50 overflow-hidden pt-24 pb-20">
      
      {/* Warm Premium Gradient Orbs - Orange to Peach to Lime */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-orange-400/35 via-peach-400/25 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-peach-300/30 via-honey-300/20 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-lime-300/25 via-honey-200/15 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/20 via-peach-200/15 to-transparent rounded-full blur-2xl opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 xl:gap-32 items-center">
          
          {/* Left: Premium Text Content - Increased Spacing */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`space-y-10 text-center lg:text-left reveal reveal-fade-up ${heroVisible ? 'reveal-visible' : ''}`}>
            
            {/* Premium Badge - Warmer Gradient */}
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-orange-400/50 mx-auto lg:mx-0 border-2 border-white/30">
              <Zap size={18} className="fill-white" strokeWidth={2.5} />
              <span>Premium Fresh Selection</span>
            </div>
            
            {/* Bold, Confident Typography - Larger */}
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.9] text-brown-900 tracking-tighter">
              Fresh.
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400">
                Juicy.
              </span>
              <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-lime-400 to-honey-300">
                Yours.
              </span>
            </h1>
            
            {/* Clean, Spacious Description - Softer Subheadline */}
            <p className="text-2xl sm:text-3xl text-brown-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Handpicked premium fruit boxes.
              <span className="block mt-3 text-orange-600 font-bold bg-gradient-to-r from-orange-600 to-peach-600 text-transparent bg-clip-text">
                Delivered fresh to your door.
              </span>
            </p>

            {/* Premium CTA Buttons - More Space & Depth */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <button 
                onClick={() => scrollTo('catalog')}
                className="group relative px-14 py-7 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white rounded-full font-black text-2xl tracking-wide shadow-deep-xl hover:shadow-deep-2xl transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center gap-4 overflow-hidden border-3 border-white/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <ShoppingBag size={28} strokeWidth={3} className="relative z-10" />
                <span className="relative z-10">Order Now</span>
                <ArrowRight size={28} strokeWidth={3} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => scrollTo('configurator')}
                className="px-14 py-7 glass border-3 border-orange-300/30 text-brown-900 rounded-full font-bold text-2xl hover:border-orange-500 hover:text-orange-600 hover:scale-110 active:scale-95 hover:shadow-medium-lg transition-all duration-500 flex items-center justify-center gap-4"
              >
                <Sparkles size={26} strokeWidth={2.5} />
                <span>Build Your Box</span>
              </button>
            </div>

            {/* Social Proof - Premium Style with More Space */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
               <div className="flex -space-x-5">
                  <div className="w-16 h-16 rounded-full border-4 border-white shadow-medium overflow-hidden ring-2 ring-orange-200">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Happy Customer"/>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white shadow-medium overflow-hidden ring-2 ring-peach-200">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Happy Customer"/>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-white shadow-medium overflow-hidden ring-2 ring-honey-200">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover" alt="Happy Customer"/>
                  </div>
               </div>
               <div className="text-left">
                 <div className="flex gap-1 mb-2">
                   {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-orange-500 text-orange-500" />)}
                 </div>
                 <p className="text-base font-bold text-brown-900">
                   <span className="text-orange-600 text-2xl font-black">500+</span>
                   <span className="ml-2">happy customers</span>
                 </p>
               </div>
            </div>
          </div>
          
          {/* Right: Premium Fruit Showcase - Larger Imagery */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[550px] lg:min-h-[700px]">
             
             {/* Main Hero Image - Extra Large, Appetizing */}
             <div className="relative w-full max-w-[750px] aspect-square">
                
                {/* Glowing Background - Warmer Tones */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/45 via-peach-400/35 to-honey-400/35 rounded-full blur-3xl scale-110 animate-pulse-glow"></div>
                
                {/* Central Fruit Box Image - Larger Scale */}
                <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ animation: 'fade-in-up 0.8s ease-out backwards' }}>
                    <img 
                      src={JUICY_IMAGES.box1} 
                      alt="Premium Fresh Fruit Box" 
                      className="w-full h-full object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 ease-out"
                    />
                </div>
                
                {/* Floating Fruit Elements - Soft Animations with Design System Colors */}
                
                {/* Orange - Top Right */}
                <div className="absolute top-10 -right-6 sm:top-16 sm:right-0 glass border-2 border-white/70 p-5 sm:p-6 rounded-3xl shadow-deep shadow-orange-400/40 z-20 rotate-12 hover:rotate-6 transition-all duration-500" 
                     style={{ animation: 'fade-in-up 1s ease-out 0.3s backwards, float 4.5s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-orange-100 via-peach-100 to-honey-100 rounded-2xl p-4 sm:p-5 shadow-inner">
                      <span className="text-6xl sm:text-7xl" role="img" aria-label="orange">🍊</span>
                   </div>
                </div>

                {/* Kiwi - Left Side */}
                <div className="absolute top-1/3 -left-8 sm:-left-10 glass border-2 border-white/70 p-5 sm:p-6 rounded-3xl shadow-deep shadow-lime-400/35 z-20 -rotate-12 hover:-rotate-6 transition-all duration-500" 
                     style={{ animation: 'fade-in-up 1s ease-out 0.5s backwards, float 5s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-lime-100 via-lime-50 to-honey-100 rounded-2xl p-4 sm:p-5 shadow-inner">
                      <span className="text-6xl sm:text-7xl" role="img" aria-label="kiwi">🥝</span>
                   </div>
                </div>

                {/* Peach - Bottom Left */}
                <div className="absolute bottom-20 left-6 sm:left-10 glass border-2 border-white/70 p-4 sm:p-5 rounded-3xl shadow-deep shadow-peach-400/40 z-20 rotate-6 hover:rotate-12 transition-all duration-500" 
                     style={{ animation: 'fade-in-up 1s ease-out 0.7s backwards, float 4.8s ease-in-out infinite' }}>
                   <div className="bg-gradient-to-br from-peach-100 via-orange-50 to-honey-100 rounded-2xl p-3 sm:p-4 shadow-inner">
                      <span className="text-5xl sm:text-6xl" role="img" aria-label="peach">🍑</span>
                   </div>
                </div>

                {/* Premium Discount Badge - Enhanced Depth */}
                <div className="absolute -bottom-6 right-10 sm:right-16 bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 backdrop-blur-xl text-white px-10 sm:px-12 py-8 sm:py-9 rounded-[3rem] shadow-deep-2xl z-20 border-3 border-orange-500/50 hover:scale-110 hover:rotate-3 transition-all duration-500" 
                     style={{ animation: 'fade-in-up 1s ease-out 0.9s backwards' }}>
                  <div className="text-center">
                    <p className="font-black text-5xl sm:text-6xl bg-gradient-to-r from-orange-400 via-peach-400 to-honey-400 text-transparent bg-clip-text leading-none drop-shadow-lg">20%</p>
                    <p className="text-xs font-black text-orange-300 uppercase tracking-[0.25em] mt-3">First Order</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Premium Trust Banner - Enhanced with Design System */}
      <div ref={trustRef as React.RefObject<HTMLDivElement>} className={`absolute bottom-0 left-0 right-0 glass border-t-2 border-orange-200/40 py-5 z-20 shadow-soft-md reveal reveal-slide-up ${trustVisible ? 'reveal-visible' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4 text-brown-700">
            <div className="flex items-center gap-3">
              <Star className="text-orange-500 fill-orange-500" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-peach-500 fill-peach-500" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">2-Hour Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-lime-500 fill-lime-500" size={22} strokeWidth={2.5} />
              <span className="font-bold text-base">100% Fresh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
