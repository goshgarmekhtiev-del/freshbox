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

### Brand Semantic Colors
```css
brand-accent: #F97316        /* Primary brand color */
brand-accent-dark: #EA580C   /* Darker variant */
brand-text: #064E3B          /* Primary text color */
brand-text-soft: #115E59     /* Secondary text color */
brand-green: #16A34A         /* Brand green */
brand-accent-light: #D9F99D  /* Light brand accent */
brand-yellow: #FDE047        /* Brand yellow */
brand-success: #84cc16       /* Success color */
brand-warning: #eab308       /* Warning color */
brand-error: #e34a28         /* Error color */
```

---

## 🌈 Background System (Premium Patterns)

### Three-Tier Background Pattern System

We use **3 standardized background patterns** across all sections for visual consistency and premium feel:

#### Pattern 1: Light Section (Clean Neutral)
**Usage**: Content-focused sections where readability is paramount

```css
bg-brand-bg    /* Soft white/cream base (#fff7ed) */

/* Optional: Subtle blobs for depth (use sparingly) */
.absolute .bg-gradient-to-br from-brand-accent/8 to-transparent
.blur-[120px] .opacity-60
```

**Applied to**:
- ProblemSolution (Why choose us)
- HowItWorks (Process steps)
- Reviews (Customer testimonials)
- FAQ (Questions section)
- Configurator (Custom box builder)

**Why**: Clean, readable background that doesn't compete with content. Perfect for text-heavy sections.

---

#### Pattern 2: Accent Section (Warm Premium Glow)
**Usage**: Hero sections, catalog, important conversion areas

```css
bg-gradient-to-br from-orange-50 via-brand-accent-light to-lime-50

/* Soft gradient blobs - consistent blur and opacity */
/* Top-right blob */
.absolute .top-0 .right-0 .w-[800px] .h-[800px]
.bg-gradient-to-br from-brand-accent/20 to-transparent
.blur-[150px] .opacity-60

/* Bottom-left blob */  
.absolute .bottom-0 .left-0 .w-[700px] .h-[700px]
.bg-gradient-to-tr from-brand-yellow/15 to-transparent
.blur-[150px] .opacity-50
```

**Applied to**:
- Hero (Landing section)
- Catalog (Product showcase)
- B2B (Business solutions)
- OrderForm (Checkout section)

**Why**: Creates warm, inviting atmosphere with soft orange-to-lime gradient. Blobs add premium depth without distraction.

---

#### Pattern 3: Dark Section (Premium Contrast)
**Usage**: Footer and special emphasis sections

```css
bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green
/* Dark green gradient: #064E3B → #115E59 → #16A34A */

/* Soft accent glows - lower opacity for dark backgrounds */
/* Orange accent glow */
.absolute .top-0 .right-0 .w-[800px] .h-[800px]
.bg-gradient-to-br from-brand-accent/15 to-transparent
.blur-[150px] .opacity-40

/* Yellow accent glow */
.absolute .bottom-0 .left-0 .w-[600px] .h-[600px]
.bg-gradient-to-tr from-brand-yellow/10 to-transparent  
.blur-[150px] .opacity-30

/* Optional: Radial pattern overlay */
.absolute .inset-0 .opacity-15
.bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
from-white/20 to-transparent
```

**Applied to**:
- Footer (Contacts, newsletter, trust badges)
- Benefits (4-column value props) - with white text

**Why**: High contrast for CTAs and important information. Dark green maintains brand identity while providing premium, sophisticated look.

---

### Background Pattern Rules

**✅ ALWAYS DO:**
- Use ONLY brand colors (brand-accent, brand-yellow, brand-green, brand-text)
- Keep blur values consistent: `blur-[120px]` or `blur-[150px]`
- Use low opacity for blobs: 6%-20% for light sections, 10%-40% for dark sections
- Add `pointer-events-none` to all decorative blobs
- Limit to 2-3 blobs maximum per section

**❌ NEVER DO:**
- Use arbitrary colors (#047857, brown-900, orange-950, etc.)
- Mix different background patterns in adjacent sections
- Use `animate-pulse-glow` on background blobs (causes distraction)
- Use colored/tinted shadows (shadow-brand-accent/20, etc.)
- Create "acidic" high-saturation gradients
- Use more than 3 blobs per section

### Removed Non-Brand Colors

The following non-brand colors were eliminated during standardization:

❌ **Benefits section**:
- `#047857` (arbitrary dark green) → replaced with `brand-text` (#064E3B)
- Multiple green blob colors → standardized to brand-accent glow

❌ **Footer section**:
- `brown-900` (#1c1917) → replaced with `brand-text`
- `orange-950` (non-existent in palette) → replaced with `brand-text-soft`  
- Multiple overlapping blobs → simplified to 2 soft glows

❌ **General blob chaos**:
- Removed `brand-accent-dark`, `brand-green` in gradient chains
- Removed `via-` color stops in blobs (simplified to 2-color gradients)
- Removed inconsistent blur values (blur-2xl, blur-3xl) → standardized to blur-[120px]/blur-[150px]

---

## 🌑 Shadow System (Unified)

### Two-Tier System

**Tier 1: Subtle (Default State)**
```css
shadow-medium    /* Standard elevation for cards */
```
- Use for: Default card state, containers, sections
- Creates subtle depth without being overpowering

**Tier 2: Elevated (Hover/Active State)**
```css
shadow-deep-xl   /* Enhanced elevation for interaction */
```
- Use for: Hover states, CTAs, modals, floating elements
- Provides clear visual feedback on interaction

### Usage Guidelines
1. **Cards**: `shadow-medium` → `hover:shadow-deep-xl`
2. **Buttons**: `shadow-deep-xl` (always elevated)
3. **Modals**: `shadow-deep-xl`
4. **Inputs**: No shadow by default, `shadow-medium` on focus

**Consistency Rule**: Use only these 2 shadow values. Avoid mixing shadow types.

---

## 📐 Border Radius System (Semantic Tokens)

### Semantic Radius Tokens

**Primary Design Tokens** (Use these first):
```css
--radius-card    2.5rem (40px)    /* Large containers: cards, modals, sections */
--radius-ui      1.5rem (24px)    /* Interactive controls: buttons, inputs, badges */
rounded-full     9999px           /* Circles: avatars, pills, icon containers */
```

### Usage Guidelines

#### radius-card (2.5rem / 40px)
Use `rounded-[--radius-card]` for:
- **Product cards** (CatalogCard, CatalogGrid)
- **Large content cards** (ProblemSolution, Benefits, Reviews)
- **Modals** (QuickViewModal, B2BForm)
- **Section containers** (B2B, FAQ, Configurator)
- **Image containers** (product images, preview images)

#### radius-ui (1.5rem / 24px)  
Use `rounded-[--radius-ui]` for:
- **Form inputs** (text inputs, textareas, selects)
- **Interactive buttons** (CTAs, form buttons, controls)
- **UI elements** (dropdowns, date pickers, payment options)
- **Small containers** (ingredient badges, info boxes)
- **Icon boxes** (decorative icon backgrounds)

#### rounded-full (9999px)
Use `rounded-full` for:
- **Avatar images**
- **Circular badges/pills**
- **Icon-only buttons** (close buttons)
- **Progress indicators**
- **Dot indicators**

### Technical Implementation

Tailwind v4 CSS Variables (defined in `src/index.css`):
```css
@theme {
  --radius-card: 2.5rem;  /* 40px */
  --radius-ui: 1.5rem;    /* 24px */
}
```

Usage in components:
```jsx
// Cards and large containers
<div className="rounded-[--radius-card] ...">

// Buttons and inputs  
<button className="rounded-[--radius-ui] ...">
<input className="rounded-[--radius-ui] ...">

// Circles
<div className="rounded-full ...">
```

**Consistency Rule**: Use semantic tokens (`--radius-card`, `--radius-ui`) instead of arbitrary values. Reserve `rounded-full` only for intentionally circular elements.

---

## 🌑 Shadow System (Unified)

### Semantic Shadow Tokens

**Primary Design Tokens** (Use these only):
```css
--shadow-soft       /* Light, subtle shadow for cards on light backgrounds */
--shadow-elevated   /* Deep shadow for important blocks (modals, Hero, CTAs) */
```

### Shadow Values

#### shadow-soft
```css
--shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
```
**Usage**: `shadow-[--shadow-soft]`
- Light product cards
- Content cards on white/light backgrounds
- Subtle UI elements (badges, pills, small buttons)
- Default state of interactive elements

**Mobile-friendly**: Very subtle, won't look heavy on small screens

#### shadow-elevated
```css
--shadow-elevated: 0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.06);
```
**Usage**: `shadow-[--shadow-elevated]`
- Modals (QuickViewModal, CartSidebar, B2BForm)
- Hero illustration container
- Configurator preview
- Important CTA containers
- Newsletter section in Footer
- Hover state of cards (`hover:shadow-[--shadow-elevated]`)

**Mobile-friendly**: Tested to not overwhelm on mobile devices

### Usage Guidelines

**Cards**:
```jsx
<div className="shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] transition-all">
  // Card content
</div>
```

**Modals**:
```jsx
<div className="shadow-[--shadow-elevated] ...">
  // Modal content
</div>
```

**Buttons**:
```jsx
<button className="shadow-[--shadow-soft] hover:shadow-[--shadow-elevated] ...">
  CTA Text
</button>
```

### Background Compatibility

**Light backgrounds** (white, cream, light orange):
- Use `shadow-[--shadow-soft]` for subtle depth
- Neutral black-based shadows work perfectly

**Dark backgrounds** (dark green, navy, dark gradients):
- Shadows still visible due to subtle opacity
- No conflicting colored shadows (removed orange-tinted shadows)

**Gradient backgrounds**:
- Neutral shadows blend seamlessly
- No color clash with brand gradients

### Prohibited Patterns

**❌ DO NOT USE**:
- `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` (arbitrary Tailwind values)
- `shadow-brand-accent/20`, `shadow-gray-200/50` (colored shadows)
- `shadow-deep`, `shadow-deep-xl`, `shadow-deep-2xl` (legacy orange-tinted shadows)
- `shadow-medium`, `shadow-medium-lg` (legacy values)
- Any custom shadow values not in the semantic system

**Consistency Rule**: Use ONLY `shadow-[--shadow-soft]` or `shadow-[--shadow-elevated]`. No exceptions.

---

## 📏 Spacing Scale (Unified)

### Section Vertical Spacing
```css
py-24    /* 96px  - Standard section spacing */
py-32    /* 128px - Large section spacing */
```

**Usage:**
- Most sections: `py-24 md:py-32`
- Hero section: `pt-24 pb-20`
- Footer: `py-24 md:py-32`

### Component Internal Spacing
```css
p-6      /* 24px - Small cards */
p-8      /* 32px - Standard cards */
p-10     /* 40px - Large containers */
p-12     /* 48px - Premium containers */
p-16     /* 64px - Extra large containers */
```

### Gaps and Margins
```css
gap-6    /* 24px - Standard gap */
gap-8    /* 32px - Large gap */
gap-10   /* 40px - Extra large gap */
mb-16    /* 64px - Section header margin */
mb-20    /* 80px - Large section margin */
```

**Consistency Rule**: Use multiples of 8 (8, 16, 24, 32, 40, 48, 64, 96, 128) for rhythm.

---

## ✍️ Typography System (Standardized)

### Font Families
```css
font-sans    /* System sans-serif stack (default) */
```

### Typography Scale

**H1 - Hero Heading**
```css
text-5xl md:text-6xl    font-black    leading-tight    tracking-tighter
```
- Use for: Main hero titles only
- Line height: `leading-tight` (1.25)

**H2 - Section Heading**
```css
text-4xl md:text-5xl    font-extrabold    leading-tight    tracking-tight
```
- Use for: Main section titles (ProblemSolution, Benefits, Reviews, etc.)
- Line height: `leading-tight` (1.25)

**H3 - Card/Subsection Heading**
```css
text-2xl md:text-3xl    font-bold    leading-snug    tracking-tight
```
- Use for: Card titles, subsection headings
- Line height: `leading-snug` (1.375)

**Body Large**
```css
text-lg    font-medium    leading-relaxed
```
- Use for: Important descriptions, emphasized paragraphs
- Line height: `leading-relaxed` (1.625)

**Body Small**
```css
text-sm    font-medium    leading-relaxed
```
- Use for: Secondary text, labels, metadata
- Line height: `leading-relaxed` (1.625)

### Font Weight System
```css
font-black       900    /* H1 only */
font-extrabold   800    /* H2 only */
font-bold        700    /* H3, emphasis */
font-semibold    600    /* Strong emphasis in body (rarely) */
font-medium      500    /* Body text (default) */
```

### Leading (Line Height) Rules
```css
leading-tight     1.25     /* H1, H2 */
leading-snug      1.375    /* H3 */
leading-relaxed   1.625    /* All body text */
```

### Tracking (Letter Spacing) Rules
```css
tracking-tighter  -0.05em  /* H1 */
tracking-tight    -0.025em /* H2, H3 */
tracking-wider    0.05em   /* Uppercase labels only */
```

### Usage Matrix

| Element | Size | Weight | Leading | Tracking |
|---------|------|--------|---------|----------|
| H1 (Hero) | text-5xl md:text-6xl | font-black | leading-tight | tracking-tighter |
| H2 (Section) | text-4xl md:text-5xl | font-extrabold | leading-tight | tracking-tight |
| H3 (Card) | text-2xl md:text-3xl | font-bold | leading-snug | tracking-tight |
| Body-lg | text-lg | font-medium | leading-relaxed | - |
| Body-sm | text-sm | font-medium | leading-relaxed | - |
| Labels | text-sm | font-bold | leading-relaxed | tracking-wider + uppercase |

**Consistency Rule**: Never deviate from this scale. No random text-xl or text-base usage.

---

## ⚡ Transitions & Hover Effects (Premium Pattern)

### Standard Transition
```css
transition-all duration-300    /* All interactive elements */
```

### Hover Patterns by Element Type

#### Primary Buttons (CTAs)
**Pattern**: Scale + Shadow + Brightness
```jsx
className="
  bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow
  hover:scale-105
  hover:shadow-deep-xl
  hover:brightness-110
  active:scale-95
  transition-all duration-300
"
```
**Effects**:
- `hover:scale-105` - Slight 5% growth
- `hover:shadow-deep-xl` - Shadow intensifies
- `hover:brightness-110` - 10% brighter
- `active:scale-95` - Press feedback

#### Cards (Product, Content, Feature)
**Pattern**: Lift + Shadow
```jsx
className="
  hover:-translate-y-2
  hover:shadow-deep-xl
  transition-all duration-300
"
```
**Effects**:
- `hover:-translate-y-2` - Lifts 8px upward
- `hover:shadow-deep-xl` - Shadow deepens
- **No rotation** - Kept clean and professional

#### Icons (Decorative, Interactive)
**Pattern**: Color Change Only
```jsx
className="
  text-brand-text
  hover:text-brand-accent
  transition-colors duration-300
"
```
**Effects**:
- Color shifts to brand accent
- **No scale/rotation** - Subtle and refined

#### Icon Containers (Circular Backgrounds)
**Pattern**: Minimal Scale
```jsx
className="
  group-hover:scale-110
  transition-transform duration-300
"
```
**Effects**:
- `group-hover:scale-110` - Gentle 10% growth only
- Applied to icon backgrounds, not icons themselves

### Prohibited Patterns

**❌ DO NOT USE**:
- `rotate-6`, `rotate-12`, `-rotate-12` - Too playful, unprofessional
- `scale-125`, `scale-150` - Excessive, jarring
- `animate-bounce`, `animate-bounce-slow` - Distracting (except single hero CTA)
- Random combinations without system

**✅ EXCEPTIONS** (Intentional Brand Moments):
- Hero section primary CTA may have enhanced animation
- Single focal point per page may use `animate-bounce-slow`
- Configurator preview may rotate on hover (product showcase)

### Usage Guidelines

1. **Buttons**: Always use scale + shadow + brightness pattern
2. **Cards**: Always use lift + shadow pattern
3. **Icons**: Color change only, no movement
4. **Icon Containers**: Gentle scale only (10%)
5. **Duration**: Always `duration-300` for consistency

**Consistency Rule**: Use only these patterns. No creative variations.

**Consistency Rule**: Use only `duration-300` for all transitions. Avoid varying durations.

---

## 🎬 Hover Effects (Unified)

### Button Hover Pattern
```css
/* Standard Button Hover */
hover:scale-105 hover:shadow-deep-xl active:scale-95
```

### Card Hover Pattern
```css
/* Standard Card Hover */
hover:-translate-y-2 hover:shadow-deep-xl
```

### Guidelines
1. **Buttons**: Always scale up (105%) + shadow enhancement
2. **Cards**: Always lift up (-translate-y-2) + shadow enhancement  
3. **Links**: Color change only, no transform
4. **Icons**: Rotate or translate, no scale

**Consistency Rule**: Stick to these exact patterns. No custom hover effects.

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

### Brand Color Utilities
```css
.bg-brand-accent        /* Background with brand accent color */
.bg-brand-accent-dark   /* Background with dark brand accent */
.text-brand-text        /* Text with brand text color */
.text-brand-text-soft   /* Text with soft brand text color */
.bg-brand-green         /* Background with brand green */
.bg-brand-accent-light  /* Background with light brand accent */
.bg-brand-yellow        /* Background with brand yellow */
```

---

## 📚 Usage Examples (Updated)

### Premium Card (Unified)
```html
<div class="bg-white rounded-2xl p-8 
            shadow-medium hover:shadow-deep-xl
            hover:-translate-y-2 transition-all duration-300">
  <!-- Card content -->
</div>
```

### Hero Heading (Unified)
```html
<h1 class="text-7xl md:text-8xl lg:text-9xl font-black 
           text-brand-text leading-tight tracking-tighter">
  Premium Title
</h1>
```

### CTA Button (Unified)
```html
<button class="px-8 py-5 bg-gradient-to-r from-brand-accent to-brand-accent-dark
               text-white rounded-full font-black text-xl
               shadow-deep-xl hover:scale-105 active:scale-95
               transition-all duration-300">
  Order Now
</button>
```

### Section Container (Unified)
```html
<section class="py-24 md:py-32 bg-gradient-to-br 
                from-orange-50 via-white to-lime-50">
  <!-- Section content -->
</section>
```

---

## 🎯 Best Practices (Updated)

1. **Consistency**: Use ONLY the unified design tokens:
   - Border Radius: `rounded-2xl`, `rounded-3xl`, `rounded-full`
   - Shadows: `shadow-medium`, `shadow-deep-xl`
   - Spacing: Multiples of 8 (8, 16, 24, 32, 48, 64, 96, 128)
   - Transitions: `transition-all duration-300` only

2. **Typography Hierarchy**: 
   - H1: `text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter`
   - H2: `text-5xl md:text-7xl font-black tracking-tighter`
   - H3: `text-3xl md:text-4xl font-black tracking-tight`
   - H4: `text-2xl font-bold tracking-tight`

3. **Hover Patterns** (Premium System):
   - **Primary Buttons**: `hover:scale-105 hover:shadow-deep-xl hover:brightness-110 active:scale-95`
   - **Cards**: `hover:-translate-y-2 hover:shadow-deep-xl`
   - **Icons**: `hover:text-brand-accent` (color change only)
   - **Icon Containers**: `group-hover:scale-110` (minimal scale)
   - **Prohibited**: rotate-6, rotate-12, scale-125, animate-bounce (except hero CTA)

4. **Section Spacing**: Use `py-24 md:py-32` for all main sections

5. **Conversion-Critical Elements**: Always use:
   - Brand colors for CTAs
   - `font-black` for maximum impact
   - `shadow-[--shadow-elevated]` for prominence

---

## 📄 Quick Reference Summary

### 🟠 The Golden Rules

**Border Radius** (2 semantic tokens):
- `--radius-card` (40px) - Cards, modals, sections
- `--radius-ui` (24px) - Buttons, inputs, controls
- `rounded-full` - Circles only

**Shadows** (2 semantic tokens):
- `--shadow-soft` - Light cards, default state
- `--shadow-elevated` - Modals, Hero, hover state
- **Mobile-friendly** neutral black-based shadows

**Section Spacing**:
- `py-24 md:py-32` - Standard rhythm

**Typography**:
- H1: `text-5xl md:text-6xl font-black leading-tight tracking-tighter`
- H2: `text-4xl md:text-5xl font-extrabold leading-tight tracking-tight`
- H3: `text-2xl md:text-3xl font-bold leading-snug tracking-tight`
- Body-lg: `text-lg font-medium leading-relaxed`
- Body-sm: `text-sm font-medium leading-relaxed`

**Animations** (Premium Hover System):
- All transitions: `duration-300`
- **Primary Buttons**: `hover:scale-105 hover:shadow-[--shadow-elevated] hover:brightness-110 active:scale-95`
- **Cards**: `hover:-translate-y-2 hover:shadow-[--shadow-elevated]`
- **Icons**: Color change only (`hover:text-brand-accent`)
- **Icon Containers**: `group-hover:scale-110` (minimal)
- **Prohibited**: rotate, scale-125, animate-bounce

**Colors**:
- Primary: `brand-accent` (#F97316)
- Text: `brand-text` (#064E3B)
- Success: `brand-green` (#16A34A)

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

**Version**: 3.0.0 (Premium Background System)  
**Last Updated**: December 6, 2025  
**Tailwind Version**: v4.1.17

---

## ✨ Changelog

### v3.0.0 - Premium Background System (Dec 6, 2025)
- ✅ **3-Tier Background Pattern System** - Standardized all section backgrounds into Light, Accent, and Dark patterns
- ✅ **Brand Color Enforcement** - Removed all non-brand colors (#047857, brown-900, orange-950) from backgrounds
- ✅ **Blob Standardization** - Unified all decorative blobs to consistent blur-[120px]/blur-[150px] values, 2 blobs max per section
- ✅ **Opacity Normalization** - Set clear opacity ranges (6%-20% light sections, 10%-40% dark sections)
- ✅ **Animation Cleanup** - Removed distracting `animate-pulse-glow` from background elements
- ✅ **11 Sections Updated** - Hero, ProblemSolution, Catalog, Configurator, Benefits, HowItWorks, Reviews, B2B, FAQ, OrderForm, Footer
- ✅ **Complete Documentation** - Added comprehensive background pattern guidelines in DESIGN_SYSTEM.md

### v2.0.0 - Unified Premium System (Dec 6, 2025)
- ✅ Simplified border radius to 3 values only
- ✅ **Border Radius Semantic Tokens** - Introduced `--radius-card` and `--radius-ui` for consistent, semantic usage
- ✅ **Shadow System Unification** - Replaced 15+ shadow variations with 2 semantic tokens (`--shadow-soft`, `--shadow-elevated`), mobile-friendly neutral shadows
- ✅ Unified shadows to 2-tier system
- ✅ Standardized section spacing rhythm
- ✅ Established clear typography hierarchy
- ✅ **Premium Hover Effect System** - Removed rotate/excessive scale animations, standardized button/card/icon hover patterns
- ✅ Defined consistent hover/animation patterns
- ✅ **Typography Scale Standardization** - Applied consistent font sizes, weights, and leading across all components
- ✅ Removed visual inconsistencies
- ✅ Enhanced conversion-focused styling