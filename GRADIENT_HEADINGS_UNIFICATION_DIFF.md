# 🎨 Унификация градиентных заголовков и бренд-бейджей

## 📋 Цель

Создать единый стиль градиентных заголовков и бренд-бейджей в секциях Hero, ProblemSolution, WhyFreshBox и HowItWorks, используя утилити-классы `text-gradient-brand-heading` и `badge-brand`.

---

## 📊 DIFF: Hero.tsx

### **1. Заменён бейдж на badge-brand**

```diff
- <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-accent/10 to-brand-yellow/10 border border-brand-accent/20 text-brand-accent font-black text-xs uppercase tracking-widest">
+ <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest shadow-sm">
    <Gift size={14} className="fill-brand-accent" strokeWidth={2.5} />
    <span>Подарочная доставка по Москве</span>
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (единый стиль)
- ✅ Унифицированы отступы: `py-1.5` вместо `py-2`
- ✅ Унифицирован font-weight: `font-bold` вместо `font-black`
- ✅ Добавлен `shadow-sm` для единообразия

---

### **2. Заменён градиентный заголовок на text-gradient-brand-heading**

```diff
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-brand-text">
    Премиальные<br />
    фруктовые{' '}
-   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">
+   <span className="text-gradient-brand-heading">
      боксы‑подарки
    </span>
  </h1>
```

**Изменения:**
- ✅ Используется `text-gradient-brand-heading` вместо инлайн-градиента
- ✅ Упрощён код, единый стиль

---

## 📊 DIFF: ProblemSolution.tsx

### **1. Заменён бейдж на badge-brand**

```diff
- <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-accent/15 to-brand-yellow/15 border border-brand-accent/20 text-brand-accent font-bold text-sm uppercase tracking-wide mb-6 shadow-sm">
+ <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
    <Sparkles size={16} strokeWidth={2.5} />
    <span>3 супер-причины</span>
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (единый стиль)
- ✅ Унифицированы отступы: `px-4 py-1.5` вместо `px-5 py-2.5`
- ✅ Унифицирован размер шрифта: `text-xs` вместо `text-sm`
- ✅ Унифицирован tracking: `tracking-widest` вместо `tracking-wide`

---

### **2. Заменены градиентные заголовки на text-gradient-brand-heading**

```diff
  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-4 px-4">
    Почему все{' '}
-   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-accent to-brand-yellow">
+   <span className="text-gradient-brand-heading">
      выбирают FreshBox
    </span>
    ?
  </h2>

  <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft font-semibold max-w-2xl mx-auto px-4">
    Не просто фрукты —{' '}
-   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-green font-bold">
+   <span className="text-gradient-brand-heading font-bold">
      эмоция в коробке
    </span>{' '}
    💚
  </p>
```

**Изменения:**
- ✅ Используется `text-gradient-brand-heading` вместо инлайн-градиентов
- ✅ Упрощён код, единый стиль
- ✅ Сохранён `font-bold` для подзаголовка

---

## 📊 DIFF: WhyFreshBox.tsx

### **1. Заменён бейдж секции на badge-brand**

```diff
- <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-yellow/15 via-brand-accent/10 to-brand-green/15 border border-brand-accent/20 text-brand-accent font-bold text-sm uppercase tracking-wide mb-6 shadow-sm">
+ <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
    <Heart size={16} strokeWidth={2.5} fill="currentColor" />
    <span>почему нас любят 💛</span>
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (единый стиль)
- ✅ Унифицированы отступы: `px-4 py-1.5` вместо `px-5 py-2.5`
- ✅ Унифицирован размер шрифта: `text-xs` вместо `text-sm`
- ✅ Унифицирован tracking: `tracking-widest` вместо `tracking-wide`

---

### **2. Заменён градиентный заголовок на text-gradient-brand-heading**

```diff
  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-4 px-4">
    Свежесть и любовь{' '}
-   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-accent to-brand-yellow">
+   <span className="text-gradient-brand-heading">
      в каждой коробке
    </span>
  </h2>
```

**Изменения:**
- ✅ Используется `text-gradient-brand-heading` вместо инлайн-градиента
- ✅ Упрощён код, единый стиль

---

### **3. Заменён бейдж "Главное преимущество" на badge-brand**

```diff
- <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white font-bold text-sm uppercase tracking-wide shadow-lg">
+ <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest shadow-sm">
    <Zap size={16} strokeWidth={2.5} fill="currentColor" />
    <span>Главное преимущество</span>
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (единый стиль)
- ✅ Унифицированы отступы: `px-4 py-1.5` вместо `px-6 py-2.5`
- ✅ Унифицирован размер шрифта: `text-xs` вместо `text-sm`
- ✅ Унифицирован tracking: `tracking-widest` вместо `tracking-wide`
- ✅ Унифицирована тень: `shadow-sm` вместо `shadow-lg`
- ⚠️ **Примечание:** Бейдж теперь имеет светлый фон (как `badge-brand`), а не тёмный градиент. Это соответствует единому стилю.

---

## 📊 DIFF: HowItWorks.tsx

### **1. Заменён бейдж на badge-brand**

```diff
- <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8">
+ <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-8 shadow-sm">
    Процесс
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (единый стиль)
- ✅ Добавлен `shadow-sm` для единообразия

---

### **2. Заменён градиентный заголовок на text-gradient-brand-heading**

```diff
  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-[0.95] mb-4 max-w-4xl mx-auto">
-   Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow">работаем</span>
+   Как мы <span className="text-gradient-brand-heading">работаем</span>
  </h2>
```

**Изменения:**
- ✅ Используется `text-gradient-brand-heading` вместо инлайн-градиента
- ✅ Упрощён код, единый стиль

---

## ✅ Проверка сохранённых элементов

### **Hero:**
- ✅ Светлый фон секции (градиенты orange/yellow/lime)
- ✅ Типографика заголовков
- ✅ Trust triggers и CTA-кнопки
- ✅ Hero image и premium badge

### **ProblemSolution:**
- ✅ Светлый фон секции (градиенты orange/yellow/lime)
- ✅ Типографика заголовков и подзаголовков
- ✅ Карточки причин (mobile и desktop)
- ✅ Social proof и CTA

### **WhyFreshBox:**
- ✅ Светлый фон секции (градиенты lime/yellow/orange)
- ✅ Типографика заголовков
- ✅ Главная карточка преимущества
- ✅ Вторичные преимущества
- ✅ Social proof badge

### **HowItWorks:**
- ✅ Светлый фон секции (градиенты orange/yellow/lime)
- ✅ Типографика заголовков
- ✅ ProcessTimeline компонент

---

## 🎨 Визуальный результат

### **До:**
```
Hero: кастомный бейдж, инлайн-градиент
ProblemSolution: кастомный бейдж, инлайн-градиенты
WhyFreshBox: кастомные бейджи, инлайн-градиент
HowItWorks: кастомный бейдж, инлайн-градиент
→ Разные стили, разная типографика
```

### **После:**
```
Hero: badge-brand, text-gradient-brand-heading
ProblemSolution: badge-brand, text-gradient-brand-heading
WhyFreshBox: badge-brand, text-gradient-brand-heading
HowItWorks: badge-brand, text-gradient-brand-heading
→ Единый стиль, единая типографика
```

---

## 📊 Матрица изменений

| Элемент | До | После |
|---------|-----|--------|
| **Hero бейдж** | `bg-gradient-to-r from-brand-accent/10 to-brand-yellow/10` | `badge-brand` |
| **Hero градиент** | `text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow` | `text-gradient-brand-heading` |
| **ProblemSolution бейдж** | `bg-gradient-to-r from-brand-accent/15 to-brand-yellow/15` | `badge-brand` |
| **ProblemSolution заголовок** | `text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-accent to-brand-yellow` | `text-gradient-brand-heading` |
| **ProblemSolution подзаголовок** | `text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-green` | `text-gradient-brand-heading` |
| **WhyFreshBox бейдж секции** | `bg-gradient-to-r from-brand-yellow/15 via-brand-accent/10 to-brand-green/15` | `badge-brand` |
| **WhyFreshBox бейдж "Главное"** | `bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white` | `badge-brand` |
| **WhyFreshBox заголовок** | `text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-accent to-brand-yellow` | `text-gradient-brand-heading` |
| **HowItWorks бейдж** | `bg-brand-accent/8 border border-brand-accent/15` | `badge-brand` |
| **HowItWorks заголовок** | `text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow` | `text-gradient-brand-heading` |

---

## ✅ Проверка сборки

```bash
✓ npm run build
✓ built in 4.72s
✓ No linter errors
✓ 199.73 kB │ gzip: 22.54 kB
```

---

## 🎯 Итог

**Hero, ProblemSolution, WhyFreshBox и HowItWorks теперь:**
- ✅ Используют единый стиль градиентных заголовков (`text-gradient-brand-heading`)
- ✅ Используют единый стиль бренд-бейджей (`badge-brand`)
- ✅ Имеют одинаковые отступы, размеры шрифта и tracking
- ✅ Сохранены светлые фоны секций (градиенты orange/yellow/lime)
- ✅ Дизайн выглядит цельно и профессионально

**Все секции остались светлыми и воздушными!** 🎨✨

