import React from 'react';
import type { Product } from '@/types';
import CatalogCard from './CatalogCard';

interface CatalogGridProps {
  products: Product[];
  onAdd: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

/**
 * CatalogGrid - Mobile-first product grid
 * 
 * NO reveal animations on mobile to ensure visibility
 * Simple, reliable rendering for all devices
 */
const CatalogGrid: React.FC<CatalogGridProps> = ({ products, onAdd, onQuickView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
      {products.map((product) => (
        <div key={product.id}>
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
