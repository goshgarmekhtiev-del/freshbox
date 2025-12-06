import React from 'react';
import type { Product } from '../types';
import { useStaggeredReveal } from '../utils/useReveal';
import CatalogCard from '../components/CatalogCard';

interface CatalogGridProps {
  products: Product[];
  onAdd: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ products, onAdd, onQuickView }) => {
  // Staggered reveal for product cards
  const productReveals = useStaggeredReveal(products.length, 100, 80);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
      {products.map((product, index) => (
        <div 
          key={product.id}
          ref={productReveals[index].ref as React.RefObject<HTMLDivElement>}
          className={`group glass rounded-[3rem] p-8 shadow-medium hover:shadow-deep-xl transition-all duration-500 hover:-translate-y-6 hover:scale-105 border-3 border-orange-200/40 hover:border-orange-400/60 flex flex-col relative overflow-hidden reveal reveal-fade-up ${productReveals[index].isVisible ? 'reveal-visible' : ''}`}
        >
          <CatalogCard 
            product={product} 
            onAdd={(e: React.MouseEvent) => onAdd(product, e)} 
            onQuickView={() => onQuickView(product)} 
          />
        </div>
      ))}
    </div>
  );
};

export default CatalogGrid;