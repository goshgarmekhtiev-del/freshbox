# FreshBox UI Library Documentation

## 📚 Обзор

Создана базовая UI-библиотека в `/components/ui` для стандартизации компонентов и сокращения дублирования кода.

---

## 🎨 Созданные компоненты

### 1. **Button** — Универсальная кнопка

#### Props:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  // + все стандартные HTML button props
}
```

#### Варианты (variant):
- **primary** (default): Градиент brand (orange→yellow), основные CTA
  - Включает shimmer-эффект при hover
  - `shadow-[--shadow-soft]` → `shadow-[--shadow-elevated]`
  - `hover:scale-105` + `hover:brightness-110`
  
- **secondary**: Белый фон с border brand-accent
  - При hover: инвертируется в brand-accent фон
  - Для вторичных действий
  
- **ghost**: Прозрачный, только текст
  - `hover:bg-brand-accent/10`
  - Для tertiary actions
  
- **danger**: Красный фон
  - Для деструктивных действий (удалить, отменить)
  
- **success**: Зеленый фон
  - Для подтверждений, успешных действий

#### Размеры (size):
- **sm**: `px-4 py-2 text-sm` — компактные кнопки
- **md**: `px-6 py-3 text-base` — стандарт
- **lg**: `px-8 py-4 text-lg` — большие кнопки
- **xl**: `px-10 py-6 text-xl` — hero CTA

#### Пример использования:
```tsx
import { Button } from './ui';

// Primary CTA
<Button size="xl" onClick={handleClick}>
  Order Now
</Button>

// С иконкой
<Button 
  variant="secondary" 
  icon={<ShoppingBag size={20} strokeWidth={2.5} />}
  iconPosition="left"
>
  Add to Cart
</Button>

// Loading state
<Button isLoading={true}>
  Загрузка... {/* автоматически показывается spinner */}
</Button>
```

#### Особенности:
- ✅ Автоматический shimmer-эффект для `primary`
- ✅ Loading state с Loader2 icon
- ✅ Поддержка иконок слева/справа
- ✅ Accessibility: `disabled` состояние
- ✅ `active:scale-95` для тактильного feedback

---

### 2. **Card** — Карточка контента

#### Props:
```typescript
interface CardProps {
  variant?: 'light' | 'dark' | 'glass' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean; // default: true
  hover?: boolean; // default: false
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### Варианты (variant):
- **light** (default): Белый фон, серая border
  - Для основного контента
  
- **dark**: Темный градиент (green), белый текст
  - Для акцентных блоков
  
- **glass**: Glassmorphism эффект
  - `backdrop-blur-xl`, прозрачный фон
  
- **outlined**: Прозрачный с border brand-accent
  - Для вторичных карточек

#### Padding:
- **none**: Без внутренних отступов
- **sm**: `p-4`
- **md**: `p-6 md:p-8` (default)
- **lg**: `p-8 md:p-10`

#### Пример использования:
```tsx
import { Card } from './ui';

// Карточка товара
<Card variant="light" padding="md" hover={true}>
  <img src="product.jpg" />
  <h3>Product Name</h3>
  <p>Description</p>
</Card>

// Темная карточка для Benefits
<Card variant="dark" padding="lg">
  <Icon />
  <h3>Benefit Title</h3>
  <p>Benefit text</p>
</Card>
```

#### Особенности:
- ✅ hover: `-translate-y-2` + `shadow-elevated`
- ✅ Адаптивный padding (md:breakpoint)
- ✅ `rounded-[--radius-card]` из design system
- ✅ `transition-all duration-300`

---

### 3. **Input** — Поле ввода

#### Props:
```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean; // default: true
  // + все стандартные HTML input props
}
```

#### Размеры:
- **sm**: `px-4 py-2 text-sm`
- **md**: `px-6 py-4 text-base` (default)
- **lg**: `px-6 py-5 text-lg`

#### Пример использования:
```tsx
import { Input } from './ui';
import { User } from 'lucide-react';

<Input
  label="Ваше имя"
  placeholder="Иван Петров"
  icon={<User size={16} strokeWidth={2.5} />}
  required
  error={errors.name}
/>
```

#### Особенности:
- ✅ Автоматическая генерация unique ID
- ✅ ARIA attributes (`aria-invalid`, `aria-describedby`)
- ✅ Error state (красная border + текст ошибки)
- ✅ Helper text поддержка
- ✅ Icon слева (с автоматическим padding)
- ✅ Focus: `ring-4 ring-brand-accent/20`
- ✅ Label с uppercase + tracking + required indicator

---

### 4. **TextArea** — Многострочное поле

#### Props:
```typescript
interface TextAreaProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean; // default: true
  rows?: number; // default: 4
  // + все стандартные HTML textarea props
}
```

#### Пример использования:
```typescript
<TextArea
  label="Комментарий"
  placeholder="Укажите особые пожелания..."
  rows={4}
  helperText="Не обязательно"
/>
```

#### Особенности:
- ✅ Те же стили что Input (consistency)
- ✅ `resize-none` для стабильности layout
- ✅ ARIA accessibility

---

### 5. **Badge** — Компактный бейдж

#### Props:
```typescript
interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}
```

#### Варианты:
- **primary**: `bg-brand-accent/10 text-brand-accent`
- **success**: `bg-brand-green/10 text-brand-green`
- **warning**: `bg-brand-yellow/20 text-brand-text`
- **info**: `bg-brand-accent-light/20 text-brand-text`
- **danger**: `bg-red-500/10 text-red-600`
- **neutral**: `bg-gray-100 text-gray-600`

#### Размеры:
- **sm**: `px-2 py-1 text-xs`
- **md**: `px-4 py-2 text-sm`
- **lg**: `px-6 py-3 text-base`

#### Пример использования:
```tsx
import { Badge } from './ui';
import { Flame } from 'lucide-react';

<Badge variant="primary" icon={<Flame size={14} />}>
  Хит продаж
</Badge>

<Badge variant="success" size="sm">
  Новинка
</Badge>
```

---

## 🔄 Миграция существующих компонентов

### ✅ **Уже мигрированы на UI-библиотеку:**

#### 1. **Hero.tsx** — 2 кнопки
**Было**: Hardcoded кнопки с длинными className
```tsx
<button className="group relative px-14 py-7 bg-gradient-to-r from-brand-accent...">
  {/* 10+ строк кода */}
</button>
```

**Стало**: Использует Button компонент
```tsx
<Button size="xl" icon={<ShoppingBag />} iconPosition="left">
  Order Now
  <ArrowRight className="group-hover:translate-x-2" />
</Button>

<Button variant="ghost" size="xl" icon={<Sparkles />}>
  For Business
</Button>
```

**Экономия**: ~20 строк кода, легче поддерживать

---

#### 2. **Catalog.tsx** — Reset filter button
**Было**:
```tsx
<button className="px-10 py-5 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white rounded-full font-black text-lg shadow-deep hover:shadow-deep-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-300">
  Show All Boxes
</button>
```

**Стало**:
```tsx
<Button variant="primary" size="lg" onClick={() => setActiveCategory('all')}>
  Show All Boxes
</Button>
```

---

#### 3. **Configurator.tsx** — 2 элемента
**Badge для лейбла**:
```tsx
// Было:
<span className="px-3 py-1 bg-brand-accent text-white rounded-lg text-xs font-black uppercase tracking-widest mb-4 inline-block transform -rotate-1">
  Творчество
</span>

// Стало:
<Badge variant="primary" size="sm">Творчество</Badge>
```

**Button для CTA**:
```tsx
// Было: ~8 строк кода с длинными классами
// Стало:
<Button 
  variant="primary" 
  size="lg" 
  icon={<ArrowRight />} 
  iconPosition="right"
  fullWidth={true}
  className="sm:w-auto"
>
  В корзину
</Button>
```

---

### 📋 **Готовы к миграции** (следующий этап):

#### **CatalogCard.tsx**:
- CTA кнопка "В корзину"
- Badge для тегов (Новинка, Хит)

#### **QuickViewModal.tsx**:
- Кнопка "Добавить"
- +/- кнопки количества
- Close button

#### **OrderForm.tsx + B2BForm.tsx**:
- Все Input поля → `<Input>`
- TextArea комментариев → `<TextArea>`
- Submit кнопки → `<Button>`

#### **CartSidebar.tsx**:
- "Перейти в каталог" → `<Button variant="secondary">`
- "Оформить заказ" → `<Button variant="primary">`
- Delete confirmation buttons

#### **Reviews.tsx**:
- Карточки отзывов → `<Card variant="light" hover={true}>`

---

## 📊 Статистика

| Метрика | До UI-библиотеки | После |
|---------|------------------|-------|
| **Дублирование кнопок** | ~15 уникальных implementations | 1 компонент Button |
| **Input стили** | Размазаны по 3+ компонентам | 1 компонент Input |
| **Карточки** | 5+ разных паттернов | 1 компонент Card |
| **Строк кода** (Hero только) | ~30 для кнопок | ~15 (50% меньше) |
| **Поддержка** | Изменения в каждом файле | Изменения в 1 месте |

---

## 🎯 Преимущества UI-библиотеки

### 1. **Consistency** (Консистентность)
- ✅ Все кнопки имеют одинаковые hover-эффекты
- ✅ Все inputs одинаково реагируют на errors
- ✅ Единый brand стиль везде

### 2. **Maintenance** (Поддержка)
- ✅ Изменить стиль кнопок — 1 файл вместо 15+
- ✅ Добавить новый variant — доступен везде instantly
- ✅ Bug fix в одном месте → fixes everywhere

### 3. **Developer Experience**
- ✅ Autocomplete для props в IDE
- ✅ TypeScript типизация
- ✅ Меньше копипаста
- ✅ Быстрее писать код

### 4. **Performance**
- ✅ Меньше дублирования CSS классов
- ✅ Легче оптимизировать (optimization в одном месте)

---

## 🚀 Следующие шаги

### Рекомендуется мигрировать:

1. **Формы** (высокий приоритет):
   - OrderForm.tsx → Input/TextArea
   - B2BForm.tsx → Input/TextArea
   - ~30+ полей → стандартизированы

2. **Карточки**:
   - CatalogCard → Card component
   - Reviews → Card component
   - Benefits cards → Card component

3. **Badges**:
   - Product tags → Badge
   - Status indicators → Badge

4. **Кнопки** (уже частично сделано):
   - Все оставшиеся CTA → Button
   - +/- кнопки → Button size="sm"
   - Close buttons → Button variant="ghost"

---

## 📝 Пример полной миграции формы

**До** (OrderForm.tsx):
```tsx
<div>
  <label className="flex items-center gap-2 text-sm font-black text-brand-text uppercase tracking-wider mb-3">
    <User size={14} strokeWidth={2.5} className="text-brand-accent" />
    Ваше имя
  </label>
  <input
    type="text"
    name="name"
    required
    className="w-full px-6 py-5 rounded-[--radius-ui] border-2 border-brand-accent-light/40 glass focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 outline-none transition-all text-brand-text placeholder-brand-text-soft/70 font-medium text-base"
    placeholder="Иван Петров"
  />
</div>
```

**После**:
```tsx
<Input
  label="Ваше имя"
  name="name"
  placeholder="Иван Петров"
  icon={<User size={14} strokeWidth={2.5} />}
  required
/>
```

**Экономия**: 10+ строк → 6 строк (40% меньше кода!)

---

## 🏆 Итог

**UI-библиотека FreshBox** — это фундамент для масштабируемого, поддерживаемого кода:

- 📦 **5 базовых компонентов** (Button, Card, Input, TextArea, Badge)
- ✅ **3 компонента уже мигрированы** (Hero, Catalog, Configurator)
- 🎯 **~10+ компонентов готовы к миграции**
- 📉 **50% меньше кода** для типичных UI patterns
- 🚀 **Легко расширять** (добавлять variants, sizes)

**Следующий этап**: Мигрировать формы и карточки для максимального эффекта 🍊
