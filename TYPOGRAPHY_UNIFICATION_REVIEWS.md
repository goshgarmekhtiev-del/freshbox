# 🎨 Унификация типографики секции "Отзывы"

## 📋 Цель

Привести типографику секции "Говорят клиенты" к единому стилю с другими основными секциями сайта (Hero, Catalog, Benefits).

---

## ✅ Текущее состояние

**Файл:** `src/components/sections/Reviews.tsx`

### **Типографика УЖЕ ПОЛНОСТЬЮ УНИФИЦИРОВАНА!**

Заголовок и подзаголовок секции Reviews используют **ИДЕНТИЧНЫЕ** стили с секцией Catalog.

---

## 📊 Сравнение стилей

### **1. Badge (верхний бейдж)**

**Все секции (Catalog, Reviews, Benefits):**
```typescript
<div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
  Отзывы / Каталог / Преимущества
</div>
```

✅ **Идентично**

---

### **2. Главный заголовок (H2)**

**Catalog:**
```typescript
<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6">
  Премиальные <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">фруктовые боксы</span>
</h2>
```

**Reviews:**
```typescript
<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6">
  Говорят{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
    клиенты
  </span>
</h2>
```

✅ **Полностью идентично**

#### **Детали стилей заголовка:**
- `text-3xl` → 1.875rem (30px) на mobile
- `md:text-4xl` → 2.25rem (36px) на ≥768px
- `lg:text-5xl` → 3rem (48px) на ≥1024px
- `xl:text-6xl` → 3.75rem (60px) на ≥1280px
- `font-black` → font-weight: 900 (максимальная жирность)
- `leading-tight` → line-height: 1.25
- `mb-6` → margin-bottom: 1.5rem (24px)

---

### **3. Подзаголовок (Subtitle)**

**Catalog:**
```typescript
<p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8">
  Отборные свежие фрукты, собранные с любовью и доставленные прямо к вашей двери
</p>
```

**Reviews (ПОСЛЕ ИСПРАВЛЕНИЯ):**
```typescript
<p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8">
  Реальные отзывы от тех, кто уже получил свои премиальные фруктовые боксы
</p>
```

✅ **Полностью идентично**

**Что изменено:**
- ✅ `mb-6` → `mb-8` (для соответствия секции Catalog)

#### **Детали стилей подзаголовка:**
- `text-lg` → 1.125rem (18px) на mobile
- `md:text-xl` → 1.25rem (20px) на ≥768px
- `lg:text-2xl` → 1.5rem (24px) на ≥1024px
- `text-brand-text-soft` → цвет мягкого текста
- `max-w-3xl mx-auto` → максимальная ширина 768px, центрирование
- `leading-relaxed` → line-height: 1.625
- `font-semibold` → font-weight: 600
- `mb-8` → margin-bottom: 2rem (32px)

---

### **4. Строка рейтинга**

**Reviews:**
```typescript
<div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-brand-text-soft">
  <div className="flex gap-0.5 text-brand-yellow">
    ⭐⭐⭐⭐⭐
  </div>
  <span>4,9 из 5</span>
  <span className="hidden sm:inline text-brand-text-soft/60">•</span>
  <span className="hidden sm:inline">по 120+ отзывам клиентов</span>
</div>
```

✅ **Accent subtitle style** - соответствует стилю акцентных строк в других секциях

---

## 📐 Единая система типографики

### **Заголовки секций (H2):**
```typescript
className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6"
```

**Используется в:**
- ✅ Hero
- ✅ Catalog
- ✅ Reviews
- ✅ WhyFreshBox
- ✅ ProblemSolution

---

### **Подзаголовки секций:**
```typescript
className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8"
```

**Используется в:**
- ✅ Catalog
- ✅ Reviews (после исправления)
- ✅ WhyFreshBox
- ✅ ProblemSolution

---

### **Бейджи секций:**
```typescript
className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 shadow-sm"
```

**Используется в:**
- ✅ Catalog
- ✅ Reviews
- ✅ Benefits (с вариацией для темного фона)

---

## 🔍 Что было исправлено

### **До:**
```typescript
<p className="... mb-6">
  Реальные отзывы...
</p>
```

### **После:**
```typescript
<p className="... mb-8">
  Реальные отзывы...
</p>
```

**Изменение:** Увеличен нижний отступ с `mb-6` (24px) до `mb-8` (32px) для соответствия секции Catalog.

---

## ✅ Проверка

```bash
✓ npm run build
✓ built in 4.71s
✓ No linter errors
✓ 285.35 kB │ gzip: 81.43 kB
```

---

## 📊 Визуальное сравнение

### **Catalog → Reviews:**

```
┌────────────────────────────────────┐
│         [КАТАЛОГ]                  │  ← Badge: text-xs, font-bold
│                                    │
│  Премиальные фруктовые боксы       │  ← H2: xl:text-6xl, font-black
│                                    │
│  Отборные свежие фрукты...         │  ← P: lg:text-2xl, font-semibold
│                ↓ mb-8              │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│         [ОТЗЫВЫ]                   │  ← Badge: text-xs, font-bold
│                                    │
│  Говорят клиенты                   │  ← H2: xl:text-6xl, font-black
│                                    │
│  Реальные отзывы от тех...         │  ← P: lg:text-2xl, font-semibold
│                ↓ mb-8 (исправлено) │
│  ⭐ 4,9 из 5 • 120+ отзывов        │  ← Accent: text-base, font-semibold
└────────────────────────────────────┘
```

✅ **Идентичная типографика!**

---

## 🎯 Адаптивность

### **Mobile (<768px):**
- Badge: `text-xs`
- H2: `text-3xl` (30px)
- Subtitle: `text-lg` (18px)
- Rating: `text-sm` (14px)

### **Tablet (768-1023px):**
- Badge: `text-xs`
- H2: `text-4xl` (36px)
- Subtitle: `text-xl` (20px)
- Rating: `text-base` (16px)

### **Desktop (1024-1279px):**
- Badge: `text-xs`
- H2: `text-5xl` (48px)
- Subtitle: `text-2xl` (24px)
- Rating: `text-base` (16px)

### **Large Desktop (≥1280px):**
- Badge: `text-xs`
- H2: `text-6xl` (60px)
- Subtitle: `text-2xl` (24px)
- Rating: `text-base` (16px)

---

## 💡 Для будущих секций

При создании новых секций используйте эти единые классы:

```typescript
// Badge
<div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">

// H2 (заголовок секции)
<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6">

// Subtitle (подзаголовок секции)
<p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8">

// Accent line (дополнительная строка)
<div className="text-sm md:text-base font-semibold text-brand-text-soft">
```

---

## 🎨 Итог

**Типографика секции Reviews полностью унифицирована с другими основными секциями сайта.**

- ✅ **Заголовок:** `font-black`, адаптивный размер до `xl:text-6xl`
- ✅ **Подзаголовок:** `font-semibold`, адаптивный размер до `lg:text-2xl`
- ✅ **Отступы:** Соответствуют секции Catalog (`mb-8`)
- ✅ **Премиальный вид:** Единая дизайн-система FreshBox

**Все секции теперь выглядят как единое целое!** 🎨✨

