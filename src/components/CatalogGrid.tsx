import React from 'react';
import type { Product } from '@/types';
import { useStaggeredReveal } from '@/hooks';
import CatalogCard from './CatalogCard';

interface CatalogGridProps {
  products: Product[];
  onAdd: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ products, onAdd, onQuickView }) => {
  // Staggered reveal for product cards
  const productReveals = useStaggeredReveal(products.length, 100, 80);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
      {products.map((product, index) => (
        <div 
          key={product.id}
          ref={productReveals[index].ref as React.RefObject<HTMLDivElement>}
          className={`reveal reveal-fade-up ${productReveals[index].isVisible ? 'reveal-visible' : ''}`}
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
