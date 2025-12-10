import React, { useState, useEffect } from 'react';
import { BoxSize, BoxType } from '@/types';
import type { Product } from '@/types';
import { CONFIGURATOR_IMAGES } from '@/constants';
import { Sparkles, ArrowRight, Package, Box, Container, Truck, Info } from 'lucide-react';
import { useReveal } from '@/hooks';
import { ImageWithPlaceholder } from '@/components/ui';

interface ConfiguratorProps {
  onAddCustom: (product: Product, e: React.MouseEvent) => void;
}

// Types and data structure for wishes
type WishId =
  | 'more_sweet'
  | 'no_apples'
  | 'no_bananas'
  | 'add_card'
  | 'no_sour'
  | 'extra_mango'
  | 'extra_berries'
  | 'office'
  | 'kids'
  | 'bday';

type WishChip = {
  id: WishId;
  label: string;
  followUps?: WishId[];
};

const WISHES_MAP: Record<WishId, WishChip> = {
  more_sweet: {
    id: 'more_sweet',
    label: 'Побольше сладких фруктов',
    followUps: ['no_sour', 'extra_mango', 'extra_berries'],
  },
  no_apples: {
    id: 'no_apples',
    label: 'Без яблок',
    followUps: ['extra_berries'],
  },
  no_bananas: {
    id: 'no_bananas',
    label: 'Без бананов',
    followUps: ['extra_berries'],
  },
  add_card: {
    id: 'add_card',
    label: 'Добавьте открытку',
    followUps: ['bday', 'kids', 'office'],
  },
  no_sour: {
    id: 'no_sour',
    label: 'Без кислых фруктов',
  },
  extra_mango: {
    id: 'extra_mango',
    label: 'Побольше манго',
  },
  extra_berries: {
    id: 'extra_berries',
    label: 'Побольше ягод',
  },
  office: {
    id: 'office',
    label: 'Для офиса',
  },
  kids: {
    id: 'kids',
    label: 'Для ребёнка',
  },
  bday: {
    id: 'bday',
    label: 'С днём рождения',
  },
};

const BASE_WISHES: WishId[] = [
  'more_sweet',
  'no_apples',
  'no_bananas',
  'add_card',
];

const Configurator: React.FC<ConfiguratorProps> = ({ onAddCustom }) => {
  const [size, setSize] = useState<BoxSize>(BoxSize.MEDIUM);
  const [type, setType] = useState<BoxType>(BoxType.CLASSIC);
  const [selectedWishIds, setSelectedWishIds] = useState<WishId[]>([]);
  const [wishesText, setWishesText] = useState<string>('');
  
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  
  // Image state
  const [currentImage, setCurrentImage] = useState(CONFIGURATOR_IMAGES[BoxType.CLASSIC]);
  const [imageOpacity, setImageOpacity] = useState(1);

  // Handle image change with fade effect
  useEffect(() => {
    setImageOpacity(0);
    const timeout = setTimeout(() => {
      setCurrentImage(CONFIGURATOR_IMAGES[type]);
      setImageOpacity(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [type]);

  // Toggle wish chip
  const toggleWish = (id: WishId) => {
    setSelectedWishIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((w) => w !== id) : [...prev, id];

      // After updating selected wishes — recalculate text in textarea
      const labels = next.map((wishId) => WISHES_MAP[wishId].label);
      const text = labels.length ? labels.join(', ') : '';
      setWishesText(text);

      return next;
    });
  };

  // Get follow-up wishes based on selected wishes
  const getFollowUpWishes = (selected: WishId[]): WishChip[] => {
    const followUpIds = new Set<WishId>();

    selected.forEach((id) => {
      const wish = WISHES_MAP[id];
      wish.followUps?.forEach((fId) => {
        if (!selected.includes(fId)) {
          followUpIds.add(fId);
        }
      });
    });

    // Limit to avoid clutter
    const limited = Array.from(followUpIds).slice(0, 4);
    return limited.map((id) => WISHES_MAP[id]);
  };

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
      description: wishesText || 'Авторская сборка',
      ingredients: `Тип: ${type}`,
      price: getPrice(),
      image: currentImage,
      tag: 'Custom'
    };
    onAddCustom(customProduct, e);
  };

  // Helper for size icons
  const SizeIcon = ({ s }: { s: BoxSize }) => {
    if (s === BoxSize.SMALL) return <Package size={20} strokeWidth={2.5} />;
    if (s === BoxSize.MEDIUM) return <Box size={24} strokeWidth={2.5} />;
    return <Container size={28} strokeWidth={2.5} />;
  };

  // Helper for size descriptions
  const getSizeDescription = () => {
    if (size === BoxSize.SMALL) return 'Примерно 5–7 фруктов, идеален для одного';
    if (size === BoxSize.MEDIUM) return 'Примерно 10–14 фруктов, идеален для семьи';
    return 'Примерно 18–22 фрукта, идеален для компании';
  };

  const getConfigName = () => {
    const sizeLabel = size === BoxSize.SMALL ? 'Малый' : size === BoxSize.MEDIUM ? 'Средний' : 'Большой';
    return `${sizeLabel} бокс • ${type}`;
  };

  return (
    <section 
      id="configurator" 
      ref={sectionRef as React.RefObject<HTMLElement>} 
      className={`py-16 lg:py-20 bg-white reveal ${sectionVisible ? 'reveal-visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Header - Compact */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6">
            Конструктор
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight mb-4 max-w-4xl mx-auto">
            Собери свой{' '}
            <span className="text-gradient-brand-heading">
              идеал
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed mt-4">
            Мы соберем бокс точно по твоим правилам
          </p>
        </div>

        {/* Two Column Layout - Configurator Steps + Preview */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch lg:min-h-[460px]">
          
          {/* Left Column - Configurator Steps */}
          <div className="bg-white/70 backdrop-blur-sm rounded-[32px] p-6 lg:p-8 flex flex-col gap-6 shadow-lg shadow-emerald-900/5 border border-emerald-50">
            
            {/* Step 1: Size */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-brand-accent-light text-xs font-semibold text-brand-text">
                  1
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-text-soft">
                  Размер
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {Object.values(BoxSize).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-[112px] lg:h-[120px] rounded-3xl transition-all duration-300 border-2 flex flex-col items-center justify-center gap-3 ${
                      size === s 
                        ? 'bg-brand-accent text-white border-transparent shadow-[0_18px_45px_rgba(249,115,22,0.35)] scale-105' 
                        : 'bg-white border-emerald-100 hover:border-brand-accent/30 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className={`transition-colors duration-300 ${size === s ? 'text-white' : 'text-brand-text/40'}`}>
                      <SizeIcon s={s} />
                    </div>
                    <span className={`text-xs lg:text-sm font-bold ${size === s ? 'text-white' : 'text-brand-text'}`}>
                      {s.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Type */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-brand-accent-light text-xs font-semibold text-brand-text">
                  2
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-text-soft">
                  Наполнение
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {Object.values(BoxType).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      type === t 
                        ? 'bg-brand-text text-white border-transparent shadow-md' 
                        : 'bg-white border-emerald-100 text-brand-text hover:border-brand-accent/30 hover:bg-emerald-50/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Comment */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-full bg-brand-accent-light text-xs font-semibold text-brand-text">
                  3
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand-text-soft">
                  Пожелания
                </span>
              </div>
              
              <textarea
                value={wishesText}
                onChange={(e) => setWishesText(e.target.value)}
                placeholder="Например: побольше ананасов, без яблок и бананов, добавьте открытку с поздравлением…"
                className="w-full p-4 rounded-3xl border-2 border-emerald-100 bg-white/60 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none min-h-[96px] text-sm text-brand-text placeholder-brand-text-soft resize-none transition-all"
              />
              
              {/* First row — base wishes */}
              <div className="flex flex-wrap gap-2 mt-4">
                {BASE_WISHES.map((id) => {
                  const chip = WISHES_MAP[id];
                  const isActive = selectedWishIds.includes(id);

                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleWish(chip.id)}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm border ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-emerald-900 border-emerald-100 hover:border-emerald-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Second row — follow-up wishes (show only if they exist) */}
              {(() => {
                const followUpChips = getFollowUpWishes(selectedWishIds);
                if (followUpChips.length === 0) return null;

                return (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {followUpChips.map((chip) => {
                      const isActive = selectedWishIds.includes(chip.id);

                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => toggleWish(chip.id)}
                          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm border ${
                            isActive
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-100 hover:border-emerald-300'
                          }`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Column - Preview + Summary */}
          <div className="bg-gradient-to-b from-[#FDFBEF] via-[#F7FFFA] to-[#E4FAE9] rounded-[32px] p-6 lg:p-8 flex flex-col justify-between shadow-lg shadow-emerald-900/10 border border-emerald-100">
            
            {/* Top Section - Preview */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-200/50 text-brand-text text-xs font-semibold mb-4">
                <Sparkles size={14} strokeWidth={2.5} className="text-brand-accent" />
                Твой бокс
              </div>

              {/* Configuration Name */}
              <h3 className="text-2xl lg:text-3xl font-black text-brand-text leading-tight mb-2">
                {getConfigName()}
              </h3>

              {/* Box Summary */}
              <div className="text-xs md:text-sm text-brand-text-soft leading-relaxed mb-1 flex flex-wrap items-center gap-1">
                <span className="font-medium">Размер:</span> {size}
                <span className="text-brand-text-soft/40">•</span>
                <span className="font-medium">Наполнение:</span> {type}
                <span className="text-brand-text-soft/40">•</span>
                <span className="font-medium">Пожелания:</span>{' '}
                <span className="italic">{wishesText.trim() || 'Без особых пожеланий'}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-brand-text-soft/70 leading-relaxed mb-5">
                {getSizeDescription()}
              </p>

              {/* Image Preview - Enhanced with gradient and placeholder */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-50 shadow-lg border border-emerald-100/50">
                {currentImage ? (
                  <ImageWithPlaceholder
                    src={currentImage}
                    alt={`Превью фруктового бокса FreshBox — ${type}`}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-contain transition-all duration-500"
                    loading="lazy"
                    useWebP={true}
                    style={{ opacity: imageOpacity, maxHeight: '220px' }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-brand-text-soft/60 font-medium text-center px-4">
                      Здесь скоро появится визуал твоего бокса 🍊
                    </p>
                  </div>
                )}
              </div>

              {/* Status Message */}
              <div className="mt-4 flex items-start gap-2 px-3 py-2 rounded-xl bg-white/50 border border-emerald-100">
                <Info size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-brand-text-soft leading-relaxed">
                  Мы подберём фрукты под твой запрос и уточним детали при звонке.
                </p>
              </div>
            </div>

            {/* Bottom Section - Price & CTA */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Price */}
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-wide text-brand-text-soft font-semibold">
                    Цена за бокс
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-brand-text">
                    {getPrice().toLocaleString()} ₽
                  </div>
                  <p className="mt-1 text-xs text-brand-text-soft/70 leading-relaxed">
                    Оплатишь только после подтверждения заказа менеджером
                  </p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-2 text-sm text-brand-text-soft">
                <Truck size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                <span>Доставка ~2 часа по городу</span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-accent to-[#FFB347] py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(248,113,22,0.45)] hover:brightness-[1.03] active:translate-y-[1px] transition-all group"
              >
                В корзину
                <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Configurator;
