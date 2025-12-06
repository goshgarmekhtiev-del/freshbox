# FreshBox - Directory Structure Visualization

## 🏗️ New Project Architecture

```
freshbox/
│
├── public/                          # Static assets
│   └── vite.svg
│
├── src/
│   │
│   ├── components/                  # All React components
│   │   │
│   │   ├── ui/                     # 🎨 Atomic UI Components (Atoms & Molecules)
│   │   │   ├── Badge.tsx           # Status badges
│   │   │   ├── Button.tsx          # Primary button component
│   │   │   ├── Card.tsx            # Card container
│   │   │   ├── Container.tsx       # Layout container (max-w-7xl)
│   │   │   ├── ImageWithPlaceholder.tsx  # WebP-optimized image with fade-in
│   │   │   ├── Input.tsx           # Form input
│   │   │   ├── ResponsiveImage.tsx # Responsive srcset image
│   │   │   ├── SectionAccent.tsx   # Orange accent section wrapper
│   │   │   ├── SectionDark.tsx     # Dark green section wrapper
│   │   │   ├── SectionLight.tsx    # Light background section wrapper
│   │   │   ├── TextArea.tsx        # Multi-line text input
│   │   │   └── index.ts            # ✅ Barrel export
│   │   │
│   │   ├── sections/               # 📄 Page Sections (Organisms)
│   │   │   ├── Hero.tsx            # Landing hero section
│   │   │   ├── Benefits.tsx        # Benefits showcase (4 cards)
│   │   │   ├── Catalog.tsx         # Product catalog with filters
│   │   │   ├── FAQ.tsx             # Accordion FAQ section
│   │   │   ├── HowItWorks.tsx      # 4-step process explanation
│   │   │   ├── Reviews.tsx         # Customer testimonials (3 cards)
│   │   │   ├── B2B.tsx             # Business partnership section
│   │   │   ├── ProblemSolution.tsx # Problem/solution cards
│   │   │   └── index.ts            # ✅ Barrel export
│   │   │
│   │   ├── Navbar.tsx              # 🧭 Navigation bar
│   │   ├── Footer.tsx              # 🦶 Footer with newsletter
│   │   ├── CartSidebar.tsx         # 🛒 Shopping cart sidebar
│   │   ├── B2BForm.tsx             # 📝 B2B contact form modal
│   │   ├── OrderForm.tsx           # 📋 Checkout form
│   │   ├── Configurator.tsx        # ⚙️ Custom box configurator
│   │   ├── QuickViewModal.tsx      # 👁️ Product quick view modal
│   │   ├── CatalogCard.tsx         # 🎴 Individual product card
│   │   ├── CatalogGrid.tsx         # 🗂️ Product grid wrapper
│   │   ├── CatalogFilters.tsx      # 🔍 Filter controls
│   │   ├── SkeletonCard.tsx        # 💀 Loading skeleton
│   │   ├── SocialProof.tsx         # 🔔 Social proof notifications
│   │   └── DecorativeBackground.tsx # 🎨 Animated background blobs
│   │
│   ├── hooks/                      # 🪝 Custom React Hooks
│   │   ├── useReveal.ts            # Scroll reveal animation hook
│   │   ├── useFocusTrap.ts         # Focus trap for modals
│   │   └── index.ts                # ✅ Barrel export
│   │
│   ├── utils/                      # 🛠️ Utility Functions
│   │   └── confetti.ts             # Confetti animation on add-to-cart
│   │
│   ├── assets/                     # 🖼️ Static Assets
│   │   └── (images, fonts, etc.)
│   │
│   ├── types.ts                    # 📐 TypeScript Type Definitions
│   ├── constants.ts                # 🔢 Global Constants (PRODUCTS, REVIEWS, etc.)
│   ├── index.css                   # 🎨 Global Styles (Tailwind, animations)
│   ├── App.tsx                     # 🏠 Main App Component
│   └── main.tsx                    # 🚀 Entry Point
│
├── tsconfig.app.json               # ⚙️ TypeScript Config (with path aliases)
├── tsconfig.json                   # ⚙️ Root TypeScript Config
├── vite.config.ts                  # ⚡ Vite Config (with resolve aliases)
├── postcss.config.js               # 🎨 PostCSS Config (Tailwind v4)
├── package.json                    # 📦 Dependencies & Scripts
└── README.md                       # 📚 Project Documentation
```

---

## 📊 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                          App.tsx                            │
│                      (Main Container)                       │
└────────────┬────────────────────────────────────────────────┘
             │
             ├─→ Navbar                  (Top navigation)
             │
             ├─→ DecorativeBackground    (Animated blobs)
             │
             ├─→ Sections (Organisms)
             │   ├─→ Hero                (Above fold)
             │   ├─→ ProblemSolution     (Above fold)
             │   ├─→ Catalog             (Above fold)
             │   ├─→ Configurator        (Lazy loaded)
             │   ├─→ Benefits            (Lazy loaded)
             │   ├─→ HowItWorks          (Lazy loaded)
             │   ├─→ Reviews             (Lazy loaded)
             │   ├─→ B2B                 (Lazy loaded)
             │   ├─→ FAQ                 (Lazy loaded)
             │   └─→ OrderForm           (Lazy loaded)
             │
             ├─→ Footer                  (Lazy loaded)
             │
             └─→ Modals & Sidebars
                 ├─→ CartSidebar         (Shopping cart)
                 ├─→ QuickViewModal      (Product preview)
                 ├─→ B2BForm            (Contact form)
                 └─→ SocialProof        (Notifications)
```

---

## 🎨 Component Categories

### **Atomic Design Breakdown:**

#### **Atoms** (`/components/ui/`)
Small, reusable UI elements that can't be broken down further:
- Badge, Button, Input, TextArea
- Container (layout)

#### **Molecules** (`/components/ui/`)
Simple groups of atoms functioning together:
- Card
- ImageWithPlaceholder, ResponsiveImage
- SectionLight, SectionDark, SectionAccent

#### **Organisms** (`/components/sections/`)
Complex UI components composed of molecules:
- Hero, Catalog, Benefits
- FAQ, HowItWorks, Reviews
- B2B, ProblemSolution

#### **Templates** (`App.tsx`)
Page-level layouts combining organisms

---

## 🔗 Import Path Examples

### **Importing UI Components:**
```typescript
import { Button, Container, Badge } from '@/components/ui';
import { SectionLight, ImageWithPlaceholder } from '@/components/ui';
```

### **Importing Sections:**
```typescript
import { Hero, Catalog, FAQ } from '@/components/sections';
import { Benefits, Reviews, B2B } from '@/components/sections';
```

### **Importing Hooks:**
```typescript
import { useReveal, useStaggeredReveal } from '@/hooks';
import { useFocusTrap } from '@/hooks';
```

### **Importing Types & Constants:**
```typescript
import type { Product, CartItem } from '@/types';
import { PRODUCTS, REVIEWS, FAQS } from '@/constants';
```

### **Importing Utils:**
```typescript
import { fireConfetti } from '@/utils/confetti';
```

### **Importing Feature Components:**
```typescript
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
```

---

## 📦 Barrel Export Structure

### **UI Components Barrel** (`/components/ui/index.ts`)
```typescript
export { default as Badge } from './Badge';
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Container } from './Container';
export { default as ImageWithPlaceholder } from './ImageWithPlaceholder';
export { default as ResponsiveImage } from './ResponsiveImage';
export { default as Input } from './Input';
export { default as TextArea } from './TextArea';
export { default as SectionAccent } from './SectionAccent';
export { default as SectionDark } from './SectionDark';
export { default as SectionLight } from './SectionLight';
```

### **Sections Barrel** (`/components/sections/index.ts`)
```typescript
export { default as Hero } from './Hero';
export { default as Benefits } from './Benefits';
export { default as Catalog } from './Catalog';
export { default as FAQ } from './FAQ';
export { default as HowItWorks } from './HowItWorks';
export { default as Reviews } from './Reviews';
export { default as B2B } from './B2B';
export { default as ProblemSolution } from './ProblemSolution';
```

### **Hooks Barrel** (`/hooks/index.ts`)
```typescript
export { useReveal, useStaggeredReveal } from './useReveal';
export { useFocusTrap } from './useFocusTrap';
```

---

## 🎯 Key Principles

### **1. Single Responsibility**
Each component has one clear purpose:
- `Button` → Interactive button
- `Container` → Layout wrapper
- `Hero` → Landing section

### **2. Reusability**
UI components are highly reusable:
- `SectionLight` used by: FAQ, Reviews, HowItWorks
- `Button` used across all sections
- `Container` used everywhere for consistent width

### **3. Composability**
Sections compose smaller components:
```typescript
Hero → uses Button, ResponsiveImage, Container
Catalog → uses CatalogGrid → uses CatalogCard → uses ResponsiveImage
```

### **4. Separation of Concerns**
- `/ui/` → Presentation only
- `/sections/` → Page-specific content
- `/hooks/` → Reusable logic
- `/utils/` → Pure functions

---

## 🚀 Development Workflow

### **Adding a New Section:**
1. Create `/components/sections/NewSection.tsx`
2. Export in `/components/sections/index.ts`
3. Import in `App.tsx`: `import { NewSection } from '@/components/sections'`

### **Adding a New UI Component:**
1. Create `/components/ui/NewComponent.tsx`
2. Export in `/components/ui/index.ts`
3. Use anywhere: `import { NewComponent } from '@/components/ui'`

### **Adding a New Hook:**
1. Create `/hooks/useNewHook.ts`
2. Export in `/hooks/index.ts`
3. Use anywhere: `import { useNewHook } from '@/hooks'`

---

## 📈 Scalability Benefits

✅ **Easy to Navigate:** Clear structure with logical grouping  
✅ **Easy to Extend:** Add new sections/components with clear patterns  
✅ **Easy to Test:** Isolated components with single responsibility  
✅ **Easy to Maintain:** No relative path confusion  
✅ **Easy to Onboard:** Self-documenting structure  

---

**Clean Architecture Achieved!** 🎉
