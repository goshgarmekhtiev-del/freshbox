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
    <section 
      className="mt-6 mb-12 md:mb-16 max-w-5xl mx-auto px-4"
    >
      {/* Premium Control Panel - "Воздушная" панель с фильтрами и сортировкой */}
      <div 
        className="
          flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4
          rounded-[999px]
          px-6 py-3
          bg-white/80
          shadow-[0_18px_45px_rgba(6,78,59,0.08)]
          backdrop-blur-sm
        "
      >
        {/* Left Zone: Filters */}
        <div className="flex-1 overflow-x-auto scrollbar-hide -mx-2 px-2 lg:mx-0 lg:px-0">
          <div className="flex flex-nowrap lg:flex-wrap gap-3 min-w-max lg:min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={
                  activeCategory === cat.id
                    ? // Active filter - Premium gradient
                      `inline-flex items-center
                       px-6 py-2
                       rounded-full
                       text-sm font-semibold
                       bg-gradient-to-r from-brand-accent to-brand-yellow
                       text-white
                       shadow-[0_18px_45px_rgba(234,88,12,0.35)]
                       border-none
                       transition-all duration-300
                       whitespace-nowrap`
                    : // Inactive filter - Clean white pill
                      `inline-flex items-center
                       px-5 py-2
                       rounded-full
                       text-sm font-medium
                       transition-all duration-300
                       border border-transparent
                       bg-white
                       text-brand-text-soft
                       shadow-[0_10px_25px_rgba(15,118,110,0.08)]
                       hover:-translate-y-[1px] hover:shadow-[0_16px_35px_rgba(15,118,110,0.16)]
                       hover:text-brand-text
                       focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent
                       whitespace-nowrap`
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Zone: Sort Button */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0 justify-center lg:justify-end">
          <div className="relative group">
            <button 
              className="
                inline-flex items-center gap-2
                px-5 py-2
                rounded-full
                text-sm font-medium
                bg-white
                text-brand-text
                shadow-[0_10px_25px_rgba(15,118,110,0.08)]
                hover:-translate-y-[1px] hover:shadow-[0_16px_35px_rgba(15,118,110,0.16)]
                border border-brand-accent-light/40
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent
                transition-all duration-300
                whitespace-nowrap
              "
            >
              <SlidersHorizontal size={16} className="text-brand-accent" strokeWidth={2.5} />
              <span>Сортировка</span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-[0_24px_60px_rgba(15,118,110,0.2)] border border-brand-accent/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-30">
              {sortOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortOption(opt.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${sortOption === opt.id 
                      ? 'bg-gradient-to-r from-brand-accent/10 to-brand-yellow/10 text-brand-accent' 
                      : 'text-brand-text hover:bg-brand-accent/5'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogFilters;
