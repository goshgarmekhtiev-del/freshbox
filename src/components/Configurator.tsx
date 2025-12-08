
import React, { useState, useEffect } from 'react';
import { BoxSize, BoxType } from '@/types';
import type { Product } from '@/types';
import { CONFIGURATOR_IMAGES } from '@/constants';
import { Sparkles, ArrowRight, Package, Box, Container } from 'lucide-react';
import { useReveal } from '@/hooks';
import { Button, ImageWithPlaceholder } from '@/components/ui';

interface ConfiguratorProps {
  onAddCustom: (product: Product, e: React.MouseEvent) => void;
}

const Configurator: React.FC<ConfiguratorProps> = ({ onAddCustom }) => {
  const [size, setSize] = useState<BoxSize>(BoxSize.MEDIUM);
  const [type, setType] = useState<BoxType>(BoxType.CLASSIC);
  const [comment, setComment] = useState('');
  
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const { ref: configRef, isVisible: configVisible } = useReveal({ threshold: 0.2 });
  
  // Image state
  const [currentImage, setCurrentImage] = useState(CONFIGURATOR_IMAGES[BoxType.CLASSIC]);
  const [imageOpacity, setImageOpacity] = useState(1);

  // Handle image change with fade effect
  useEffect(() => {
    setImageOpacity(0);
    const timeout = setTimeout(() => {
      setCurrentImage(CONFIGURATOR_IMAGES[type]);
      setImageOpacity(1);
    }, 300); // wait for fade out
    return () => clearTimeout(timeout);
  }, [type]);

  const getPrice = () => {
    let base = 2000;
    if (size === BoxSize.SMALL) base = 1500;
    if (size === BoxSize.LARGE) base = 3500;
    
    if (type === BoxType.EXOTIC) base *= 1.5;
    if (type === BoxType.MIX) base *= 1.2;
    
    return Math.round(base);
  };

  const handleAdd = (e: React.MouseEvent) => {
    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Мой бокс (${size})`,
      description: comment || 'Авторская сборка',
      ingredients: `Тип: ${type}`,
      price: getPrice(),
      image: currentImage,
      tag: 'Custom'
    };
    onAddCustom(customProduct, e);
  };

  // Helper for size icons
  const SizeIcon = ({ s }: { s: BoxSize }) => {
    if (s === BoxSize.SMALL) return <Package size={24} strokeWidth={2.5} />;
    if (s === BoxSize.MEDIUM) return <Box size={32} strokeWidth={2.5} />;
    return <Container size={40} strokeWidth={2.5} />;
  };

  return (
    <section id="configurator" ref={sectionRef as React.RefObject<HTMLElement>} className={`py-16 md:py-20 lg:py-24 bg-white reveal ${sectionVisible ? 'reveal-visible' : ''}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header - Centered */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
            Конструктор
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-brand-text leading-[0.9] mb-8 max-w-4xl mx-auto">
            Собери свой <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">идеал</span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed">
            Не любишь киви? Хочешь только манго? Без проблем. Мы соберем бокс точно по твоим правилам.
          </p>
        </div>

        <div ref={configRef as React.RefObject<HTMLDivElement>} className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-start reveal reveal-fade-up ${configVisible ? 'reveal-visible' : ''}`}>
          
          {/* Form Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">

            <div className="space-y-10 bg-white p-10 md:p-12 lg:p-14 rounded-[--radius-card] border border-brand-text/5 shadow-[--shadow-soft]">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold text-brand-text mb-6">1. Размер</label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.values(BoxSize).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-8 px-4 rounded-2xl transition-all duration-300 border-2 flex flex-col items-center justify-center gap-4 ${
                        size === s 
                          ? 'bg-gradient-to-br from-brand-accent to-brand-accent-dark text-white border-brand-accent shadow-[--shadow-elevated] scale-105' 
                          : 'bg-white border-brand-text/10 hover:border-brand-accent/30 hover:bg-brand-accent/5'
                      }`}
                    >
                      <div className={`transition-colors duration-300 ${size === s ? 'text-white' : 'text-brand-text/40'}`}>
                        <SizeIcon s={s} />
                      </div>
                      <span className={`text-sm font-bold ${size === s ? 'text-white' : 'text-brand-text'}`}>{s.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-bold text-brand-text mb-6">2. Наполнение</label>
                <div className="flex flex-wrap gap-3">
                  {Object.values(BoxType).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`py-4 px-6 rounded-xl text-base transition-all duration-300 border-2 font-bold ${
                        type === t 
                          ? 'bg-brand-text text-white border-brand-text shadow-[--shadow-elevated]' 
                          : 'bg-white border-brand-text/10 text-brand-text hover:border-brand-accent/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-bold text-brand-text mb-6">3. Пожелания</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: побольше ананасов, без яблок..."
                  className="w-full p-5 rounded-xl border-2 border-brand-text/10 bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none h-32 text-brand-text placeholder-brand-text-soft resize-none transition-all font-medium"
                />
              </div>

              {/* Total & Action */}
              <div className="pt-8 border-t border-brand-text/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-sm text-brand-text-soft uppercase tracking-wider font-bold">Цена за бокс</span>
                  <div className="text-4xl md:text-5xl font-black text-brand-text mt-2">{getPrice().toLocaleString()} ₽</div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAdd}
                  icon={<ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                  className="px-8 py-4 text-lg sm:w-auto"
                >
                  В корзину
                </Button>
              </div>
            </div>
          </div>

          {/* Image Side - Modern Preview */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-accent-light/20 to-brand-yellow/20 border border-brand-text/5 shadow-[--shadow-elevated] group">
              <ImageWithPlaceholder
                src={currentImage}
                alt={`Превью фруктового бокса FreshBox — ${type}`}
                containerClassName="absolute inset-0"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                loading="lazy"
                useWebP={true}
                style={{ opacity: imageOpacity }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                 <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center mb-4">
                    <Sparkles size={24} strokeWidth={2.5} className="text-white" fill="currentColor" />
                 </div>
                 <p className="text-2xl md:text-3xl font-black leading-tight mb-2">{type}</p>
                 <p className="text-white/90 font-medium text-base leading-relaxed">
                   Уникальный набор специально для тебя
                 </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Configurator;
