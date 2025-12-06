
import React, { useState, useEffect } from 'react';
import { BoxSize, BoxType } from '@/types';
import type { Product } from '@/types';
import { CONFIGURATOR_IMAGES } from '@/constants';
import { Sparkles, ArrowRight, Package, Box, Container } from 'lucide-react';
import { useReveal } from '@/hooks';
import { Button, Badge, ImageWithPlaceholder } from '@/components/ui';

interface ConfiguratorProps {
  onAddCustom: (product: Product, e: React.MouseEvent) => void;
}

const Configurator: React.FC<ConfiguratorProps> = ({ onAddCustom }) => {
  const [size, setSize] = useState<BoxSize>(BoxSize.MEDIUM);
  const [type, setType] = useState<BoxType>(BoxType.CLASSIC);
  const [comment, setComment] = useState('');
  
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
    <section id="configurator" className="py-24 bg-white reveal">
      <div className="container mx-auto px-4 md:px-8">
        <div ref={configRef as React.RefObject<HTMLDivElement>} className={`grid lg:grid-cols-12 gap-12 items-center reveal reveal-fade-up ${configVisible ? 'reveal-visible' : ''}`}>
          
          {/* Form Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="mb-4 inline-block transform -rotate-1">
              <Badge variant="primary" size="sm">Творчество</Badge>
            </span>
            <h2 className="text-brand-h2 mb-6">Собери свой <span className="text-brand-accent">идеал</span></h2>
            <p className="text-brand-body text-brand-text-soft mb-10 max-w-lg">
              Не любишь киви? Хочешь только манго? Без проблем. Мы соберем бокс точно по твоим правилам.
            </p>

            <div className="space-y-8 bg-brand-bg p-8 rounded-[--radius-card] border border-gray-100 shadow-xl relative overflow-hidden">
               {/* Decorative background blur inside card */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent-light/30 rounded-full blur-3xl pointer-events-none"></div>

              {/* Size Selection - Visual Cards */}
              <div>
                <label className="block text-xs font-black text-brand-text/60 uppercase tracking-widest mb-4 ml-1">1. Размер</label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.values(BoxSize).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-6 px-2 rounded-[--radius-ui] transition-all duration-300 border-2 flex flex-col items-center justify-center gap-3 group relative overflow-hidden ${
                        size === s 
                          ? 'bg-white border-brand-accent shadow-xl shadow-brand-accent/20 transform scale-105 z-10' 
                          : 'bg-white/50 border-transparent hover:bg-white hover:border-brand-text/10'
                      }`}
                    >
                      <div className={`transition-colors duration-300 ${size === s ? 'text-brand-accent' : 'text-brand-text/40 group-hover:text-brand-text/70'}`}>
                        <SizeIcon s={s} />
                      </div>
                      <span className={`text-sm font-bold ${size === s ? 'text-brand-text' : 'text-brand-text/60'}`}>{s.split(' ')[0]}</span>
                      {size === s && <div className="absolute inset-0 border-2 border-brand-accent rounded-[--radius-ui]"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Selection - Tags */}
              <div>
                <label className="block text-xs font-black text-brand-text/60 uppercase tracking-widest mb-4 ml-1">2. Наполнение</label>
                <div className="flex flex-wrap gap-3">
                  {Object.values(BoxType).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`py-3 px-6 rounded-[--radius-ui] text-sm transition-all duration-300 border-2 font-bold ${
                        type === t 
                          ? 'bg-brand-text text-white border-brand-text shadow-lg transform -translate-y-1' 
                          : 'bg-white border-transparent text-brand-text/70 hover:bg-white hover:border-brand-accent/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-black text-brand-text/60 uppercase tracking-widest mb-4 ml-1">3. Пожелания</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: побольше ананасов, без яблок..."
                  className="w-full p-5 rounded-[--radius-ui] border-2 border-transparent bg-white shadow-sm focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none h-28 text-brand-text placeholder-gray-300 resize-none transition-all font-bold"
                />
              </div>

              {/* Total & Action */}
              <div className="pt-6 border-t border-brand-text/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div>
                  <span className="text-xs text-brand-text-soft uppercase tracking-wider font-bold">Цена за бокс</span>
                  <div className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text mt-1">{getPrice().toLocaleString()} ₽</div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAdd}
                  fullWidth={true}
                  icon={<ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                  className="sm:w-auto shadow-xl shadow-brand-accent/30 hover:shadow-2xl"
                >
                  В корзину
                </Button>
              </div>
            </div>
          </div>

          {/* Image Side - Now Dynamic! */}
          <div className="lg:col-span-5 order-1 lg:order-2 h-full">
            <div className="relative h-full aspect-[4/5] rounded-[--radius-card] overflow-hidden shadow-[--shadow-elevated] border-4 border-white group">
              <ImageWithPlaceholder
                src={currentImage}
                alt={`Превью фруктового бокса FreshBox — ${type} (конфигуратор авторской сборки)`}
                containerClassName="absolute inset-0"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                loading="lazy"
                useWebP={true}
                style={{ opacity: imageOpacity }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                 <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center mb-6">
                    <Sparkles size={28} strokeWidth={2.5} className="text-white" fill="currentColor" />
                 </div>
                 <p className="text-2xl md:text-3xl font-bold leading-snug tracking-tight mb-2">{type}</p>
                 <p className="text-white/90 font-bold text-lg leading-relaxed">
                   Мы соберем уникальный набор специально для тебя.
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
