# 🎬 Reveal Animation System

## Overview

A comprehensive, performance-optimized reveal animation system using IntersectionObserver API for smooth scroll-triggered animations across the entire Fresh.Box application.

---

## 📁 Core Files

### **1. Hook: `src/utils/useReveal.ts`**

Two main hooks for different use cases:

#### **`useReveal()`** - Single Element Reveals
```typescript
const { ref, isVisible } = useReveal({
  threshold: 0.15,        // % of element visible to trigger (default: 0.15)
  rootMargin: '0px 0px -50px 0px',  // Margin offset (default: -50px bottom)
  triggerOnce: true,      // Only trigger once (default: true)
  delay: 0                // Delay in ms before reveal (default: 0)
});
```

**Usage:**
```tsx
const { ref, isVisible } = useReveal({ threshold: 0.2 });

<div ref={ref} className={`reveal reveal-fade-up ${isVisible ? 'reveal-visible' : ''}`}>
  Content here
</div>
```

#### **`useStaggeredReveal()`** - List/Grid Animations
```typescript
const reveals = useStaggeredReveal(
  count,          // Number of items
  baseDelay,      // Initial delay in ms (default: 0)
  staggerDelay    // Delay between items in ms (default: 100)
);
```

**Usage:**
```tsx
const productReveals = useStaggeredReveal(products.length, 100, 80);

{products.map((product, i) => (
  <div 
    ref={productReveals[i].ref}
    className={`reveal reveal-fade-up ${productReveals[i].isVisible ? 'reveal-visible' : ''}`}
  >
    {product.name}
  </div>
))}
```

---

## 🎨 CSS Animation Classes

Located in `src/index.css` under `/* ========== REVEAL ANIMATIONS ========== */`

### Base Classes

- **`.reveal`** - Base class (opacity: 0, will-change optimization)
- **`.reveal-visible`** - Applied when element is in viewport (opacity: 1)

### Animation Variants

| Class | Effect | Transform | Duration |
|-------|--------|-----------|----------|
| `.reveal-fade-up` | Fade + slide from bottom | `translateY(40px) → 0` | 0.7s |
| `.reveal-fade-in` | Simple fade in | None | 0.7s |
| `.reveal-slide-up` | Dramatic slide up | `translateY(60px) → 0` | 0.8s |
| `.reveal-scale-in` | Zoom + slide effect | `scale(0.9) + translateY(20px) → scale(1) + 0` | 0.7s |
| `.reveal-slide-left` | Slide from left | `translateX(-40px) → 0` | 0.7s |
| `.reveal-slide-right` | Slide from right | `translateX(40px) → 0` | 0.7s |

### Timing Modifiers

- **`.reveal-fast`** - 0.4s duration (quick reveals)
- **`.reveal-slow`** - 1.0s duration (dramatic reveals)

### Performance Features

- **will-change: opacity, transform** - GPU acceleration hint
- **cubic-bezier(0.25, 0.46, 0.45, 0.94)** - Smooth easing
- **@media (prefers-reduced-motion)** - Respects accessibility preferences (0.01ms transitions)

---

## 📍 Implementation Across Components

### ✅ Implemented Components

| Component | Animation Type | Details |
|-----------|----------------|---------|
| **Hero** | Single reveal | Fade-up for content, slide-up for trust banner |
| **ProblemSolution** | Staggered (3 cards) | Scale-in with 150ms stagger |
| **Benefits** | Staggered (4 cards) | Fade-up with 100ms stagger |
| **HowItWorks** | Staggered (4 steps) | Scale-in with 120ms stagger |
| **Reviews** | Staggered (3 reviews) | Fade-up with 150ms stagger |
| **FAQ** | Staggered (all items) | Slide-up with 80ms stagger |
| **B2B** | Single reveal | Scale-in for main card |
| **Catalog** | Staggered (products) | Fade-up with 80ms stagger per product |
| **Configurator** | Single reveal | Fade-up for entire form section |
| **OrderForm** | Single reveal | Scale-in for form container |

---

## 🎯 Best Practices

### 1. **Choose the Right Animation**
- **Fade-up**: General content (text, images, cards)
- **Scale-in**: Interactive elements (buttons, forms, cards with depth)
- **Slide-up**: Footers, banners, sticky elements
- **Fade-in**: Backgrounds, overlays, subtle elements

### 2. **Stagger Timing Guidelines**
- **Fast lists** (3-5 items): 80-100ms delay
- **Medium grids** (6-12 items): 100-150ms delay
- **Large grids** (12+ items): 60-80ms delay (prevents long waits)

### 3. **Threshold Settings**
- **Above fold**: 0.1-0.2 (trigger early)
- **Mid-page**: 0.15-0.3 (balanced)
- **Below fold**: 0.2-0.4 (trigger when mostly visible)

### 4. **Performance Optimization**
```tsx
// ✅ Good - Efficient ref typing
ref={myRef as React.RefObject<HTMLDivElement>}

// ❌ Bad - Inline style animations
style={{ animation: `...` }}

// ✅ Good - Use CSS classes
className={`reveal reveal-fade-up ${isVisible ? 'reveal-visible' : ''}`}
```

---

## 🚀 Performance Metrics

- **IntersectionObserver**: Native browser API (60fps smooth)
- **CSS Transitions**: GPU-accelerated (hardware acceleration)
- **will-change**: Pre-optimizes for transform/opacity changes
- **triggerOnce: true**: Removes observer after first trigger (memory efficient)
- **Accessibility**: Respects `prefers-reduced-motion` (0.01ms = instant)

---

## 📱 Mobile Optimization

All animations are mobile-optimized with:
1. **Reduced motion support** - Instant animations if user prefers
2. **Touch-friendly thresholds** - Lower thresholds (0.1-0.2) for smaller viewports
3. **No jank** - Hardware-accelerated transforms only (no layout thrashing)
4. **Stagger limits** - Max 150ms stagger prevents long waits on mobile

---

## 🔧 Customization Examples

### Custom Delay for Hero Section
```tsx
const { ref, isVisible } = useReveal({ 
  threshold: 0.1, 
  delay: 300  // Wait 300ms after visibility
});
```

### Faster Catalog Grid
```tsx
const productReveals = useStaggeredReveal(
  products.length, 
  50,   // Start after 50ms
  60    // 60ms between each item (faster)
);
```

### Persistent Animation (Repeat on Scroll)
```tsx
const { ref, isVisible } = useReveal({ 
  triggerOnce: false  // Re-trigger when scrolling back
});
```

---

## 📊 Build Impact

**Before Animation System:**
- CSS: 110.95 kB
- JS: 309.89 kB

**After Animation System:**
- CSS: **111.91 kB** (+0.96 kB, +0.9%)
- JS: **310.56 kB** (+0.67 kB, +0.2%)

**Minimal impact** - Highly efficient implementation! 🎉

---

## 🎓 Quick Reference

```tsx
// Import
import { useReveal, useStaggeredReveal } from '../utils/useReveal';

// Single element
const { ref, isVisible } = useReveal();
<div ref={ref} className={`reveal reveal-fade-up ${isVisible ? 'reveal-visible' : ''}`} />

// Multiple elements (list)
const reveals = useStaggeredReveal(items.length, 100, 80);
{items.map((item, i) => (
  <div 
    ref={reveals[i].ref} 
    className={`reveal reveal-scale-in ${reveals[i].isVisible ? 'reveal-visible' : ''}`}
  />
))}

// Available animations:
// reveal-fade-up, reveal-fade-in, reveal-slide-up, reveal-scale-in,
// reveal-slide-left, reveal-slide-right, reveal-fast, reveal-slow
```

---

**Made with 🍊 energy | Fresh.Box Animation System v1.0**
