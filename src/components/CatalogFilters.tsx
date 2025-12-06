import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface CatalogFiltersProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOptions: { id: string; label: string }[];
  sortOption: string;
  setSortOption: (option: string) => void;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  sortOptions,
  sortOption,
  setSortOption
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 mb-20">
      {/* Category Pills - Modernized */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-4 flex-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-7 py-4 rounded-full font-bold text-base transition-all duration-500 transform active:scale-95 whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-orange-500 via-peach-500 to-honey-500 text-white shadow-deep scale-110 border-3 border-white/30'
                : 'glass text-brown-700 hover:text-orange-600 hover:scale-105 shadow-soft-md hover:shadow-medium border-2 border-orange-200/30 hover:border-orange-400/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort Dropdown - Minimalistic */}
      <div className="relative group shrink-0 z-20">
        <button className="flex items-center gap-4 px-7 py-4 rounded-full glass text-brown-900 font-bold text-base border-2 border-orange-300/30 hover:border-orange-500/50 transition-all duration-300 shadow-soft-md hover:shadow-medium hover:scale-105">
          <SlidersHorizontal size={20} className="text-orange-500" strokeWidth={2.5} />
          <span>Sort</span>
        </button>
        
        <div className="absolute right-0 top-full mt-4 w-72 glass rounded-3xl shadow-deep-xl border-3 border-orange-200/40 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortOption(opt.id)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 ${
                sortOption === opt.id 
                  ? 'bg-gradient-to-r from-orange-100 via-peach-100 to-honey-100 text-orange-600 shadow-soft scale-105' 
                  : 'text-brown-700 hover:bg-orange-50/50 hover:scale-102'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;