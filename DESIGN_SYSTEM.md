# Fresh Orange Premium Design System

## Overview

This design system provides a comprehensive foundation for building premium, cohesive UI components with consistent spacing, typography, colors, and shadows.

---

## 🎨 Color Palette

### Primary Orange Tones
```css
orange-50   #fff7ed    /* Lightest background */
orange-100  #ffedd5    /* Light background */
orange-200  #fed7aa    /* Soft accent */
orange-300  #fdba74    /* Medium accent */
orange-400  #fb923c    /* Bright accent */
orange-500  #f97316    /* PRIMARY */
orange-600  #ea580c    /* Dark accent */
orange-700  #c2410c    /* Darker */
orange-800  #9a3412    /* Very dark */
orange-900  #7c2d12    /* Darkest */
```

### Peach Tones
```css
peach-50    #fef3f0    /* Lightest */
peach-100   #fde7e1    /* Light */
peach-200   #fccfc3    /* Soft */
peach-300   #fab09e    /* Medium */
peach-400   #f88b6f    /* Bright */
peach-500   #f56543    /* SECONDARY */
peach-600   #e34a28    /* Dark */
peach-700   #c13a1e    /* Darker */
peach-800   #9d311b    /* Very dark */
peach-900   #7f2c1a    /* Darkest */
```

### Honey Yellow Tones
```css
honey-50    #fefce8    /* Lightest */
honey-100   #fef9c3    /* Light */
honey-200   #fef08a    /* Soft */
honey-300   #fde047    /* Medium */
honey-400   #facc15    /* ACCENT */
honey-500   #eab308    /* Bright */
honey-600   #ca8a04    /* Dark */
honey-700   #a16207    /* Darker */
honey-800   #854d0e    /* Very dark */
honey-900   #713f12    /* Darkest */
```

### Lime Tones
```css
lime-50     #f7fee7    /* Lightest */
lime-100    #ecfccb    /* Light */
lime-200    #d9f99d    /* Soft */
lime-300    #bef264    /* Medium */
lime-400    #a3e635    /* Bright */
lime-500    #84cc16    /* SUCCESS */
lime-600    #65a30d    /* Dark */
lime-700    #4d7c0f    /* Darker */
lime-800    #3f6212    /* Very dark */
lime-900    #365314    /* Darkest */
```

### Soft Brown Tones (Neutrals)
```css
brown-50    #fafaf9    /* Lightest bg */
brown-100   #f5f5f4    /* Light bg */
brown-200   #e7e5e4    /* Border light */
brown-300   #d6d3d1    /* Border default */
brown-400   #a8a29e    /* Text muted */
brown-500   #78716c    /* Text tertiary */
brown-600   #57534e    /* Text secondary */
brown-700   #44403c    /* Text secondary dark */
brown-800   #292524    /* Text primary */
brown-900   #1c1917    /* Text darkest */
```

### Semantic Colors
```css
brand-primary     #f97316    /* orange-500 */
brand-secondary   #f56543    /* peach-500 */
brand-accent      #facc15    /* honey-400 */
brand-success     #84cc16    /* lime-500 */
brand-warning     #eab308    /* honey-500 */
brand-error       #e34a28    /* peach-600 */
```

---

## 🎭 Shadows

### Soft Shadows (Subtle)
```css
shadow-soft-sm    /* Minimal depth */
shadow-soft       /* Subtle card shadow */
shadow-soft-md    /* Soft elevated */
```

**Use for:** Light cards, hover states, subtle depth

### Medium Shadows (Balanced)
```css
shadow-medium     /* Standard elevation */
shadow-medium-lg  /* Elevated cards */
```

**Use for:** Product cards, modals, dropdowns

### Deep Shadows (Dramatic)
```css
shadow-deep       /* Strong elevation */
shadow-deep-xl    /* Hero elements */
shadow-deep-2xl   /* Floating CTAs */
```

**Use for:** CTAs, premium badges, floating elements

### Neutral Shadows (No tint)
```css
shadow-neutral    /* No color tint */
shadow-neutral-lg /* Larger neutral */
shadow-neutral-xl /* Largest neutral */
```

**Use for:** When orange tint is too much

---

## 📐 Border Radius

```css
radius-sm       6px      /* Small buttons, tags */
radius-default  8px      /* Input fields */
radius-md       12px     /* Small cards */
radius-lg       16px     /* Medium cards */
radius-xl       24px     /* Large cards */
radius-2xl      32px     /* Premium cards */
radius-3xl      40px     /* Hero sections */
radius-full     9999px   /* Pills, circles */
```

---

## 📏 Spacing Scale

```css
spacing-0    0
spacing-1    4px      /* xs */
spacing-2    8px      /* sm */
spacing-3    12px     /* md */
spacing-4    16px     /* base */
spacing-5    20px     /* lg */
spacing-6    24px     /* xl */
spacing-8    32px     /* 2xl */
spacing-10   40px     /* 3xl */
spacing-12   48px     /* 4xl */
spacing-16   64px     /* 5xl */
spacing-20   80px     /* 6xl */
spacing-24   96px     /* 7xl */
spacing-32   128px    /* 8xl */
spacing-40   160px    /* 9xl */
spacing-48   192px    /* 10xl */
```

---

## ✍️ Typography

### Font Families
```css
font-sans    /* System sans-serif stack */
font-serif   /* Georgia, Cambria, Times */
font-mono    /* Courier monospace */
```

### Heading Scale
```css
h1    72px    /* Hero titles */
h2    60px    /* Section titles */
h3    48px    /* Subsection titles */
h4    36px    /* Card titles */
h5    30px    /* Small headings */
h6    24px    /* Smallest headings */
```

### Body Scale
```css
xs     12px    /* Fine print */
sm     14px    /* Secondary text */
base   16px    /* Body text */
lg     18px    /* Emphasized body */
xl     20px    /* Lead text */
2xl    24px    /* Subheadings */
```

### Font Weights
```css
light        300
normal       400
medium       500
semibold     600
bold         700
extrabold    800
black        900
```

### Line Heights
```css
tight      1.25      /* Headings */
snug       1.375     /* Tight paragraphs */
normal     1.5       /* Body text */
relaxed    1.625     /* Comfortable reading */
loose      2         /* Spacious */
```

### Letter Spacing
```css
tighter    -0.05em   /* Tight headings */
tight      -0.025em  /* Compact */
normal     0         /* Default */
wide       0.025em   /* Spaced */
wider      0.05em    /* More spaced */
widest     0.1em     /* Maximum spacing */
```

---

## ⚡ Transitions

```css
transition-fast     150ms    /* Quick feedback */
transition-base     300ms    /* Standard */
transition-slow     500ms    /* Smooth */
transition-bounce   700ms    /* Playful */
```

All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` easing (except bounce).

---

## 🎬 Animations

### Available Animations
```css
animate-fade-in-up     /* Fade in from below */
animate-bounce-slow    /* Gentle vertical bounce */
animate-float          /* Floating effect */
animate-shimmer        /* Shine effect */
animate-pulse-glow     /* Pulsing opacity */
```

### Reveal Animation
```html
<div class="reveal">
  <!-- Content fades in on scroll -->
</div>
```

---

## 🪟 Utility Classes

### Glassmorphism
```css
.glass         /* Light frosted glass */
.glass-dark    /* Dark frosted glass */
```

---

## 📚 Usage Examples

### Premium Card
```html
<div class="bg-white/80 backdrop-blur-xl rounded-2xl p-7 
            shadow-medium border-2 border-orange-100/50 
            hover:shadow-deep hover:-translate-y-4">
  <!-- Card content -->
</div>
```

### Hero Heading
```html
<h1 class="text-h1 font-black text-brown-900 
           leading-tight tracking-tighter">
  Premium Title
</h1>
```

### CTA Button
```html
<button class="px-8 py-5 bg-gradient-to-r from-orange-500 to-peach-500
               text-white rounded-full font-bold text-lg
               shadow-deep hover:shadow-deep-xl
               transition-base hover:scale-105">
  Order Now
</button>
```

### Gradient Background
```html
<section class="bg-gradient-to-br from-orange-100 
                via-peach-50 to-honey-100">
  <!-- Section content -->
</section>
```

---

## 🎯 Best Practices

1. **Consistency**: Use design tokens consistently across all components
2. **Hierarchy**: Maintain clear visual hierarchy with size and weight
3. **Spacing**: Use spacing scale multiples (4, 8, 12, 16, 24, 32)
4. **Shadows**: Match shadow intensity to elevation level
5. **Colors**: Use semantic colors for consistent meaning
6. **Animations**: Keep animations subtle and purposeful
7. **Accessibility**: Maintain sufficient color contrast ratios

---

## 🔧 Configuration Files

- **CSS Variables**: `src/index.css` (Tailwind v4 `@theme` syntax)
- **PostCSS Config**: `postcss.config.js` (Tailwind v4 compatible)
- **No JS Config**: Tailwind v4 uses CSS-based configuration

---

## 📱 Responsive Design

All utilities support Tailwind's responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Tailwind Version**: v4.1.17
