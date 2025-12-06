
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';
import { Zap } from 'lucide-react';
import CatalogFilters from './CatalogFilters';
import CatalogGrid from './CatalogGrid';

interface CatalogProps {
  onAdd: (product: Product, e: React.MouseEvent) => void; 
  onQuickView: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAdd, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popularity');

  const categories = [
    { id: 'all', label: 'Все боксы' },
    { id: 'new', label: 'Новинки ✨' },
    { id: 'hit', label: 'Хиты 🔥' },
    { id: 'exotic', label: 'Экзотика 🌴' },
    { id: 'detox', label: 'Detox 🍏' },
    { id: 'office', label: 'В офис 💼' },
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
    <section id="catalog" className="py-24 md:py-40 bg-gradient-to-br from-orange-50 via-peach-50 to-lime-50 reveal relative overflow-hidden">
      
      {/* Premium Gradient Orbs - Warm Tones */}
      <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-gradient-to-br from-orange-400/25 via-peach-300/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-peach-400/20 via-honey-300/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-lime-300/15 via-honey-200/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Section Header - Premium with Design System */}
        <div className="text-center mb-20 space-y-8">
          <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white font-black uppercase text-xs tracking-[0.15em] shadow-deep shadow-orange-400/50 border-3 border-white/30">
            <Zap size={18} className="fill-white" strokeWidth={2.5} />
            <span>Fresh Selection</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-brown-900 tracking-tighter leading-[0.9]">
            Premium
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-peach-500 to-honey-400">
              Fruit Boxes
            </span>
          </h2>
          
          <p className="text-2xl text-brown-600 font-medium max-w-3xl mx-auto leading-relaxed">
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
        <CatalogGrid 
          products={filteredProducts} 
          onAdd={onAdd} 
          onQuickView={onQuickView} 
        />
        
        {/* Empty State - Premium */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-200 via-peach-200 to-honey-200 rounded-full mb-8 shadow-medium">
              <span className="text-7xl">🍊</span>
            </div>
            <p className="text-5xl font-black text-brown-900 mb-4">Nothing here</p>
            <p className="text-xl text-brown-600 mb-8">Try a different category</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="px-10 py-5 bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white rounded-full font-black text-lg shadow-deep hover:shadow-deep-xl transition-all duration-300 hover:scale-110"
            >
              Show All Boxes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
