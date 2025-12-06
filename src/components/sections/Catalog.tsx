import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '@/constants';
import type { Product } from '@/types';
import { Zap } from 'lucide-react';
import CatalogFilters from '../CatalogFilters';
import CatalogGrid from '../CatalogGrid';
import SkeletonCard from '../SkeletonCard';
import { SectionAccent, Button } from '@/components/ui';

interface CatalogProps {
  onAdd: (product: Product, e: React.MouseEvent) => void; 
  onQuickView: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAdd, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);

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
    <SectionAccent id="catalog" paddingY="large" className="reveal">
      {/* Section Header - Premium with Design System */}
      <div className="text-center mb-20 space-y-8">
          <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-black uppercase text-xs tracking-[0.15em] shadow-deep shadow-brand-accent/50 border-3 border-white/30">
            <Zap size={18} className="fill-white" strokeWidth={2.5} />
            <span>Fresh Selection</span>
          </div>
          
          <h2 className="text-brand-h2">
            Premium
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
              Fruit Boxes
            </span>
          </h2>
          
          <p className="text-brand-body max-w-3xl mx-auto">
            Handpicked fresh fruits, delivered with love
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

        {/* Premium Product Grid - Clean 2-3 Column Layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-wrapper-${index}`}
                className="group bg-white rounded-[--radius-card] p-6 shadow-sm flex flex-col relative overflow-hidden"
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
        
        {/* Empty State - Premium */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-accent-light via-brand-accent-light to-brand-yellow rounded-full mb-8 shadow-medium">
              <span className="text-5xl">🍊</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold leading-snug tracking-tight text-brand-text mb-4">Nothing here</p>
            <p className="text-lg font-medium text-brand-text-soft leading-relaxed mb-8">Try a different category</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setActiveCategory('all')}
            >
              Show All Boxes
            </Button>
          </div>
        )}
    </SectionAccent>
  );
};

export default Catalog;