import React, { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { useStaggeredReveal } from '@/hooks';
import CatalogCard from './CatalogCard';

interface CatalogGridProps {
  products: Product[];
  onAdd: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ products, onAdd, onQuickView }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Staggered reveal for product cards - more aggressive on mobile
  const productReveals = useStaggeredReveal(
    products.length, 
    isMobile ? 0 : 100,     // No delay on mobile
    isMobile ? 30 : 80      // Faster stagger on mobile
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
      {products.map((product, index) => (
        <div 
          key={product.id}
          ref={productReveals[index].ref as React.RefObject<HTMLDivElement>}
          className={`${isMobile ? '' : 'reveal reveal-fade-up'} ${productReveals[index].isVisible || isMobile ? 'reveal-visible' : ''}`}
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
