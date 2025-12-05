
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Plus, Flame, Eye, Sparkles, SlidersHorizontal } from 'lucide-react';

interface CatalogProps {
  onAdd: (product: Product, e: React.MouseEvent) => void; 
  onQuickView: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAdd, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popularity'); // New state for sorting

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

    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
      // 'popularity' is default order or based on some 'isHit' logic if available, currently keeping original order as 'popularity'
      return 0; 
    });
  }, [activeCategory, sortOption]);

  return (
    <section id="catalog" className="py-24 bg-brand-bg reveal relative min-h-[800px]">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <span className="px-5 py-2 rounded-full bg-brand-accent text-white font-extrabold uppercase text-xs tracking-wider inline-flex items-center gap-2 shadow-lg shadow-brand-accent/30 transform -rotate-2">
             <Flame size={14} fill="currentColor" /> Hot Picks
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-text tracking-tight">
            Витаминные <span className="text-brand-accent">Хиты</span>
          </h2>
        </div>

        {/* Controls: Categories & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-brand-text text-white shadow-lg scale-105'
                    : 'bg-white text-brand-text hover:bg-white/80 border border-transparent hover:border-brand-accent/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative group shrink-0 z-20">
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-brand-text font-bold text-sm hover:border-brand-accent/30 transition-all shadow-sm">
              <SlidersHorizontal size={16} className="text-brand-accent" />
              <span>Сортировка</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortOption(opt.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    sortOption === opt.id 
                      ? 'bg-brand-bg text-brand-accent' 
                      : 'text-brand-text hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-[2.5rem] p-5 shadow-lg shadow-gray-200 hover:shadow-2xl hover:shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-brand-accent/20 flex flex-col relative animate-fade-in-up"
            >
              
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-gray-50 group-hover:bg-orange-50/30 transition-colors cursor-pointer" onClick={() => onQuickView(product)}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                     className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-text shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300 hover:text-brand-accent"
                   >
                      <Eye size={20} />
                   </button>
                </div>

                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-text px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide shadow-md flex items-center gap-1 z-10">
                    {product.tag.includes('Новинка') ? <Sparkles size={14} className="text-brand-accent" fill="currentColor" /> : <Flame size={14} className="text-brand-accent" fill="currentColor" />}
                    {product.tag}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="px-2 pb-2 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-extrabold text-brand-text leading-tight group-hover:text-brand-accent transition-colors cursor-pointer" onClick={() => onQuickView(product)}>{product.name}</h3>
                </div>
                
                <p className="text-brand-text-soft font-medium text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="mb-6">
                    <span className="text-xs font-bold text-brand-text/60 bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-text/5 line-clamp-2" title={product.ingredients}>{product.ingredients}</span>
                </div>
                
                <div className="mt-auto flex items-center justify-between gap-4">
                  <span className="text-2xl lg:text-3xl font-black text-brand-text tracking-tight">{product.price} ₽</span>
                  
                  <button 
                    onClick={(e) => onAdd(product, e)} 
                    className="flex-1 h-12 lg:h-14 rounded-2xl bg-brand-text text-white flex items-center justify-center gap-2 font-bold shadow-lg group-hover:bg-brand-accent transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl hover:brightness-110 overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2 text-sm lg:text-base"><Plus size={20} strokeWidth={3} /> В корзину</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-60">
            <p className="text-2xl font-bold">В этой категории пока пусто 🍏</p>
            <button onClick={() => setActiveCategory('all')} className="mt-4 text-brand-accent underline">Показать все боксы</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
