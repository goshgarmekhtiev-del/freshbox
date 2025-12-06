# Design System Quick Reference

## 🚀 Common Patterns

### Premium Card Pattern
```html
<div class="bg-white/80 backdrop-blur-xl rounded-[2rem] p-7 
            shadow-xl shadow-orange-200/30 
            hover:shadow-2xl hover:shadow-orange-400/50
            hover:-translate-y-4 hover:scale-[1.02]
            border-2 border-orange-100/50 hover:border-orange-300
            transition-all duration-500">
  <!-- Content -->
</div>
```

### Glassmorphism Floating Element
```html
<div class="bg-white/90 backdrop-blur-xl 
            rounded-2xl p-5 
            shadow-2xl shadow-orange-300/40
            border-2 border-white/60">
  <!-- Content -->
</div>
```

### Gradient Button (Primary)
```html
<button class="px-8 py-5 
               bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600
               text-white rounded-2xl font-black text-lg
               shadow-xl shadow-orange-400/50
               hover:shadow-2xl hover:shadow-orange-500/70
               hover:scale-105 active:scale-95
               transition-all duration-300
               border-2 border-orange-400/30
               overflow-hidden relative group">
  <span class="relative z-10">Button Text</span>
  <!-- Shine effect -->
  <div class="absolute inset-0 
              bg-gradient-to-r from-white/0 via-white/30 to-white/0 
              translate-x-[-100%] group-hover:translate-x-[100%] 
              transition-transform duration-700"></div>
</button>
```

### Section Header
```html
<div class="text-center mb-16 space-y-6">
  <div class="inline-flex items-center gap-2 
              px-6 py-3 rounded-full 
              bg-gradient-to-r from-orange-400 to-amber-400 
              text-white font-bold uppercase text-xs tracking-widest
              shadow-lg shadow-orange-300/50">
    🔥 Badge Text
  </div>
  
  <h2 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
    Section Title
    <span class="block mt-2 text-transparent bg-clip-text 
                 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
      Gradient Text
    </span>
  </h2>
</div>
```

### Price Badge
```html
<div class="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600
            text-white px-6 py-3.5 rounded-2xl 
            font-black text-2xl 
            shadow-2xl shadow-orange-500/60
            border-2 border-white/20">
  <span class="drop-shadow-lg">$99</span>
</div>
```

### Image Container with Overlay
```html
<div class="relative aspect-[4/5] rounded-[2rem] overflow-hidden
            bg-gradient-to-br from-orange-100/50 via-amber-50/30 to-yellow-50/20
            shadow-inner cursor-pointer">
  <img src="..." class="w-full h-full object-cover 
                        transition-all duration-700 
                        group-hover:scale-115 group-hover:brightness-105" />
  
  <!-- Gradient overlay -->
  <div class="absolute inset-0 
              bg-gradient-to-t from-orange-900/20 via-transparent to-white/10
              opacity-50 group-hover:opacity-100 
              transition-opacity duration-500"></div>
</div>
```

### Gradient Background Section
```html
<section class="py-20 md:py-32 
                bg-gradient-to-b from-white via-orange-50/30 to-amber-50/40
                relative overflow-hidden">
  <!-- Floating orbs -->
  <div class="absolute top-20 right-0 w-[600px] h-[600px]
              bg-gradient-to-br from-orange-300/20 via-amber-200/15 to-transparent
              rounded-full blur-3xl pointer-events-none"></div>
  
  <div class="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
    <!-- Content -->
  </div>
</section>
```

---

## 🎨 Color Combinations

### Primary Palette
```css
/* Background + Text */
bg-orange-50 + text-orange-900
bg-orange-100 + text-orange-800
bg-white + text-brown-900

/* Gradients */
from-orange-500 to-amber-600
from-orange-400 via-peach-400 to-honey-400
from-orange-100 via-peach-50 to-honey-100
```

### Shadow Tints
```css
/* Orange-tinted shadows */
shadow-xl shadow-orange-200/30
shadow-2xl shadow-orange-400/50
shadow-2xl shadow-orange-500/60

/* Neutral shadows */
shadow-lg shadow-gray-200/80
shadow-xl shadow-gray-300/60
```

---

## 📏 Spacing Guide

```css
/* Compact */
p-4 gap-2 space-y-3

/* Standard */
p-6 gap-4 space-y-5

/* Spacious */
p-7 gap-6 space-y-6

/* Premium */
p-8 gap-8 space-y-8
```

---

## 🔤 Typography Patterns

### Hero Title
```html
<h1 class="text-6xl sm:text-7xl lg:text-8xl 
           font-black leading-[0.95] 
           text-gray-900 tracking-tight">
```

### Section Title
```html
<h2 class="text-5xl md:text-7xl 
           font-black text-gray-900 
           tracking-tight">
```

### Card Title
```html
<h3 class="text-2xl lg:text-3xl 
           font-black text-gray-900 
           leading-tight tracking-tight">
```

### Body Text
```html
<p class="text-base lg:text-lg 
          text-gray-600 font-medium 
          leading-relaxed">
```

---

## ⚡ Animation Combinations

### Staggered Entrance
```jsx
style={{ animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards` }}
```

### Hover States
```css
hover:-translate-y-4       /* Lift */
hover:scale-[1.02]         /* Slight grow */
hover:brightness-105       /* Glow */
transition-all duration-500
```

### Button Interactions
```css
hover:scale-105            /* Grow */
active:scale-95            /* Press down */
transition-all duration-300
```

---

## 🪟 Glassmorphism Variants

### Light Glass
```css
bg-white/80 backdrop-blur-xl
```

### Medium Glass
```css
bg-white/90 backdrop-blur-xl
```

### Strong Glass
```css
bg-white/95 backdrop-blur-md
```

### Dark Glass
```css
bg-black/30 backdrop-blur-xl
```

---

## 🎯 Component-Specific Tips

### Cards
- Base: `rounded-[2rem] p-7`
- Shadow: Start with `shadow-xl`, upgrade to `shadow-2xl` on hover
- Border: `border-2 border-orange-100/50`
- Hover: `-translate-y-4 scale-[1.02]`

### Buttons
- Primary: Orange gradient + bold font + shine effect
- Secondary: White bg + border + orange text on hover
- Size: `px-8 py-5` for premium feel

### Images
- Aspect: `aspect-[4/5]` for products
- Radius: `rounded-[2rem]`
- Hover: `scale-115 brightness-105`

### Badges
- Small: `px-4 py-2 text-xs`
- Medium: `px-5 py-2.5 text-sm`
- Large: `px-6 py-3 text-base`
- Always: `rounded-full font-bold uppercase tracking-wider`

---

## 🚨 Common Mistakes to Avoid

❌ **Don't mix shadow colors**: Use either orange-tinted or neutral, not both  
❌ **Don't over-animate**: Keep animations subtle and purposeful  
❌ **Don't ignore spacing scale**: Always use multiples of 4px  
❌ **Don't use too many gradients**: 1-2 per section maximum  
❌ **Don't forget mobile**: Always test responsive breakpoints  

✅ **Do use consistent border radius**: Stick to scale (lg, xl, 2xl)  
✅ **Do maintain shadow hierarchy**: Deeper shadows = higher elevation  
✅ **Do use semantic colors**: orange-500 for primary, peach-500 for secondary  
✅ **Do stack effects**: shadow + border + hover state = premium feel  
✅ **Do test performance**: Limit backdrop-blur usage on mobile  

---

**Pro Tip**: Copy and modify these patterns rather than building from scratch!
