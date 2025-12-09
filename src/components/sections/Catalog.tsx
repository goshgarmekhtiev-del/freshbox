import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '@/constants';
import type { Product } from '@/types';
import CatalogFilters from '../CatalogFilters';
import CatalogGrid from '../CatalogGrid';
import SkeletonCard from '../SkeletonCard';
import { SectionAccent, Button } from '@/components/ui';
import { useReveal } from '@/hooks';

interface CatalogProps {
  onAdd: (product: Product, e: React.MouseEvent) => void; 
  onQuickView: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAdd, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });

  // Simulate initial loading (in real app, this would be data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms skeleton display
    
    return () => clearTimeout(timer);
  }, []);

  // Show skeleton when category/sort changes (simulate re-fetching)
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400); // 400ms for filter changes
      
      return () => clearTimeout(timer);
    }
  }, [activeCategory, sortOption]);

  const categories = [
    { id: 'all', label: 'Все боксы' },
    { id: 'new', label: 'Новинки' },
    { id: 'hit', label: 'Хиты' },
    { id: 'exotic', label: 'Экзотика' },
    { id: 'detox', label: 'Detox' },
    { id: 'office', label: 'В офис' },
  ];

  const sortOptions = [
    { id: 'popularity', label: 'По популярности' },
    { id: 'price_asc', label: 'По возрастанию цены' },
    { id: 'price_desc', label: 'По убыванию цены' },
    { id: 'name_asc', label: 'По названию (А-Я)' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => {
      const name = p.name.toLowerCase();
      const tag = p.tag?.toLowerCase() || '';

      if (activeCategory === 'new') return tag.includes('новинка') || tag.includes('new');
      if (activeCategory === 'hit') return tag.includes('хит') || tag.includes('wow') || tag.includes('vip') || tag.includes('праздник');
      if (activeCategory === 'exotic') return name.includes('экзот') || name.includes('манго') || name.includes('ананас') || name.includes('тропик') || tag.includes('тропик');
      if (activeCategory === 'detox') return tag.includes('detox') || tag.includes('зож') || name.includes('фитнес');
      if (activeCategory === 'office') return tag.includes('офис') || name.includes('офис');
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
      return 0; 
    });
  }, [activeCategory, sortOption]);

  return (
    <SectionAccent
      id="catalog"
      ref={sectionRef}
      paddingY="large"
      className={`reveal ${sectionVisible ? 'reveal-visible' : ''} overflow-visible`}
    >
      {/* Section Header - Centered, Bold, More Breathing Space */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-10 text-center px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
          Каталог
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6">
          Премиальные <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">фруктовые боксы</span>
        </h2>
        
        <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8">
          Отборные свежие фрукты, собранные с любовью и доставленные прямо к вашей двери
        </p>
      </div>

        {/* Modern Minimalistic Controls */}
        <CatalogFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortOptions={sortOptions}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Premium Product Grid - Max 3 Columns */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-wrapper-${index}`}
                className="group bg-white rounded-3xl p-6 shadow-md flex flex-col relative overflow-hidden"
              >
                <SkeletonCard count={1} />
              </div>
            ))}
          </div>
        ) : (
          <CatalogGrid 
            products={filteredProducts} 
            onAdd={onAdd} 
            onQuickView={onQuickView} 
          />
        )}
        
        {/* Empty State - Modern */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 mb-8">
              <span className="text-6xl">🍊</span>
            </div>
            <p className="text-3xl md:text-4xl font-black text-brand-text mb-4">Здесь пока пусто</p>
            <p className="text-lg md:text-xl text-brand-text-soft mb-8">Попробуйте выбрать другую категорию</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActiveCategory('all')}
              className="px-8 py-4 text-lg"
            >
              Показать все боксы
            </Button>
          </div>
        )}
    </SectionAccent>
  );
};

export default Catalog;