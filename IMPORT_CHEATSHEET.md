# Import Cheatsheet - FreshBox

Quick reference for absolute imports in the FreshBox project.

---

## 🎯 Import Patterns

### **UI Components** (`@/components/ui`)
```typescript
// Single import
import { Button } from '@/components/ui';

// Multiple imports
import { Button, Container, Badge } from '@/components/ui';

// All UI components
import { 
  Badge,
  Button,
  Card,
  Container,
  ImageWithPlaceholder,
  ResponsiveImage,
  Input,
  TextArea,
  SectionAccent,
  SectionDark,
  SectionLight
} from '@/components/ui';
```

---

### **Page Sections** (`@/components/sections`)
```typescript
// Single import
import { Hero } from '@/components/sections';

// Multiple imports
import { Hero, Catalog, FAQ } from '@/components/sections';

// All sections
import {
  Hero,
  Benefits,
  Catalog,
  FAQ,
  HowItWorks,
  Reviews,
  B2B,
  ProblemSolution
} from '@/components/sections';
```

---

### **Custom Hooks** (`@/hooks`)
```typescript
// Reveal hooks
import { useReveal, useStaggeredReveal } from '@/hooks';

// Focus trap
import { useFocusTrap } from '@/hooks';

// All hooks
import { 
  useReveal, 
  useStaggeredReveal, 
  useFocusTrap 
} from '@/hooks';
```

---

### **TypeScript Types** (`@/types`)
```typescript
// Single type
import type { Product } from '@/types';

// Multiple types
import type { Product, CartItem, Review } from '@/types';

// All types
import type { 
  Product, 
  CartItem, 
  Review, 
  FAQItem, 
  NotificationData,
  BoxSize,
  BoxType
} from '@/types';

// Type import (verbatimModuleSyntax)
import { type Product, type CartItem } from '@/types';
```

---

### **Constants** (`@/constants`)
```typescript
// Single constant
import { PRODUCTS } from '@/constants';

// Multiple constants
import { PRODUCTS, REVIEWS, FAQS } from '@/constants';

// All constants
import {
  JUICY_IMAGES,
  CONFIGURATOR_IMAGES,
  PRODUCTS,
  REVIEWS,
  FAQS,
  RECENT_PURCHASES
} from '@/constants';
```

---

### **Utilities** (`@/utils`)
```typescript
// Confetti utility
import { fireConfetti } from '@/utils/confetti';
```

---

### **Feature Components** (`@/components`)
```typescript
// Individual imports (no barrel export)
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import B2BForm from '@/components/B2BForm';
import OrderForm from '@/components/OrderForm';
import Configurator from '@/components/Configurator';
import QuickViewModal from '@/components/QuickViewModal';
import CatalogCard from '@/components/CatalogCard';
import CatalogGrid from '@/components/CatalogGrid';
import CatalogFilters from '@/components/CatalogFilters';
import SkeletonCard from '@/components/SkeletonCard';
import SocialProof from '@/components/SocialProof';
import DecorativeBackground from '@/components/DecorativeBackground';
```

---

### **Lazy Loading** (for code splitting)
```typescript
// Lazy load sections
const Benefits = lazy(() => import('@/components/sections/Benefits'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));

// Lazy load feature components
const Configurator = lazy(() => import('@/components/Configurator'));
const OrderForm = lazy(() => import('@/components/OrderForm'));
```

---

## 📋 Common Import Combinations

### **Typical Section Component:**
```typescript
import React from 'react';
import { SectionLight, Button, Container } from '@/components/ui';
import { useReveal, useStaggeredReveal } from '@/hooks';
import { PRODUCTS } from '@/constants';
import type { Product } from '@/types';
```

### **Typical Feature Component:**
```typescript
import React, { useState } from 'react';
import { useFocusTrap } from '@/hooks';
import type { CartItem } from '@/types';
import { Button, Input } from '@/components/ui';
```

### **App.tsx Pattern:**
```typescript
import React, { useState, lazy, Suspense } from 'react';
import { Hero, Catalog, ProblemSolution } from '@/components/sections';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import type { Product, CartItem } from '@/types';
import { fireConfetti } from '@/utils/confetti';

// Lazy loaded
const Benefits = lazy(() => import('@/components/sections/Benefits'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));
const OrderForm = lazy(() => import('@/components/OrderForm'));
```

---

## ⚠️ Common Mistakes to Avoid

### **❌ DON'T use relative imports:**
```typescript
// ❌ Wrong
import { Button } from '../components/ui';
import { useReveal } from '../../hooks/useReveal';
import type { Product } from '../types';

// ✅ Correct
import { Button } from '@/components/ui';
import { useReveal } from '@/hooks';
import type { Product } from '@/types';
```

### **❌ DON'T import from index files directly:**
```typescript
// ❌ Wrong (unnecessary)
import { Button } from '@/components/ui/index';

// ✅ Correct
import { Button } from '@/components/ui';
```

### **❌ DON'T mix relative and absolute:**
```typescript
// ❌ Wrong (inconsistent)
import { Button } from '@/components/ui';
import Navbar from './components/Navbar';

// ✅ Correct (consistent)
import { Button } from '@/components/ui';
import Navbar from '@/components/Navbar';
```

### **❌ DON'T forget type imports:**
```typescript
// ❌ Wrong (with verbatimModuleSyntax)
import { Product } from '@/types';

// ✅ Correct
import type { Product } from '@/types';
// OR
import { type Product } from '@/types';
```

---

## 🔍 IntelliSense Tips

### **Autocomplete Works Best With:**
```typescript
// Type @ and let IntelliSense suggest
import { } from '@/com[TAB]     → '@/components/'
import { } from '@/components/u[TAB]  → '@/components/ui'
import { } from '@/h[TAB]       → '@/hooks'
```

### **Import Suggestions:**
```typescript
// Type component name, then Ctrl+Space for auto-import
Button  → Auto-import: import { Button } from '@/components/ui';
Hero    → Auto-import: import { Hero } from '@/components/sections';
```

---

## 📦 Barrel Export Benefits

### **Without Barrel Exports:**
```typescript
// ❌ Verbose
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
```

### **With Barrel Exports:**
```typescript
// ✅ Concise
import { Button, Container, Badge } from '@/components/ui';
```

---

## 🎨 Style Imports

### **Global Styles:**
```typescript
// In main.tsx
import '@/index.css';
```

### **Component-Specific Styles:**
```typescript
// Not used in this project (Tailwind only)
// But if needed:
import styles from '@/components/MyComponent.module.css';
```

---

## 🚀 Quick Copy-Paste Templates

### **New Section Component:**
```typescript
import React from 'react';
import { SectionLight } from '@/components/ui';
import { useReveal } from '@/hooks';

const NewSection: React.FC = () => {
  const { ref, isVisible } = useReveal();

  return (
    <SectionLight id="new-section">
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Content */}
      </div>
    </SectionLight>
  );
};

export default NewSection;
```

### **New UI Component:**
```typescript
import React from 'react';

interface NewComponentProps {
  children: React.ReactNode;
  className?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`/* styles */ ${className}`}>
      {children}
    </div>
  );
};

export default NewComponent;
```

### **New Hook:**
```typescript
import { useState, useEffect } from 'react';

export const useNewHook = () => {
  const [state, setState] = useState();

  useEffect(() => {
    // Logic
  }, []);

  return { state };
};
```

---

## 📚 Reference

- **UI Components:** `/src/components/ui/index.ts`
- **Sections:** `/src/components/sections/index.ts`
- **Hooks:** `/src/hooks/index.ts`
- **Types:** `/src/types.ts`
- **Constants:** `/src/constants.ts`
- **Config:** `/tsconfig.app.json` (path aliases)

---

**Happy Coding!** 🚀
