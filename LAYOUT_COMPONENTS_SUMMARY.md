# Layout Components Implementation Summary

## Созданные layout-компоненты

Создано 3 базовых layout-компонента в `/components/ui/`:

### 1. **SectionLight** - Светлые секции

**Сигнатура:**
```typescript
interface SectionLightProps {
  children: React.ReactNode;
  id?: string;                    // ID для навигации (#how-it-works, #reviews)
  className?: string;              // Дополнительные классы (reveal и т.д.)
  withBlobs?: boolean;             // Показывать ли тонкие декоративные блобы (по умолчанию: false)
  containerClassName?: string;     // Дополнительные классы для внутреннего контейнера
}
```

**Характеристики:**
- Фон: `bg-brand-bg` (мягкий кремовый #fff7ed)
- Контейнер: `container mx-auto px-4 md:px-8`
- Вертикальные отступы: `py-24`
- Опционально: 2 тонких блоба с `blur-[120px]` и opacity 60%/50%

**Применяется в:**
- ✅ HowItWorks (Как мы работаем)
- ✅ Reviews (Отзывы клиентов)
- ✅ ProblemSolution (Почему выбирают нас) - с блобами

---

### 2. **SectionDark** - Тёмные секции

**Сигнатура:**
```typescript
interface SectionDarkProps {
  children: React.ReactNode;
  id?: string;                    // ID для навигации
  className?: string;              // Дополнительные классы
  withPattern?: boolean;           // Показывать ли фоновый паттерн и блобы (по умолчанию: true)
  containerClassName?: string;     // Дополнительные классы для контейнера
}
```

**Характеристики:**
- Фон: `bg-gradient-to-br from-brand-text via-brand-text-soft to-brand-green`
- Текст: `text-white` (инвертированный)
- Контейнер: `container mx-auto px-4 md:px-8`
- Вертикальные отступы: `py-24 md:py-32`
- Паттерн: Радиальный градиент + 2 акцентных свечения (brand-accent, brand-yellow)

**Применяется в:**
- ✅ Benefits (4 преимущества)

---

### 3. **SectionAccent** - Акцентные секции

**Сигнатура:**
```typescript
interface SectionAccentProps {
  children: React.ReactNode;
  id?: string;                    // ID для навигации
  className?: string;              // Дополнительные классы
  withBlobs?: boolean;             // Показывать ли блобы (по умолчанию: true)
  containerClassName?: string;     // Дополнительные классы для контейнера
  paddingY?: 'normal' | 'large';   // Размер вертикальных отступов
}
```

**Характеристики:**
- Фон: `bg-gradient-to-br from-orange-50 via-brand-accent-light to-lime-50`
- Контейнер: `container mx-auto px-6 md:px-12 lg:px-20 xl:px-24` (более широкий)
- Вертикальные отступы:
  - `normal`: `py-24 md:py-32`
  - `large`: `py-24 md:py-40`
- Блобы: 2 мягких свечения (brand-accent/20, brand-yellow/15) с `blur-[150px]`

**Применяется в:**
- ✅ Catalog (Каталог продуктов) - `paddingY="large"`
- ✅ B2B (Бизнес-решения)

---

## Переведенные секции

| Секция | До | После | Компонент |
|--------|-----|-------|-----------|
| **HowItWorks** | `<section className="py-24 bg-brand-bg">` | `<SectionLight id="how-it-works" className="reveal">` | SectionLight |
| **Reviews** | `<section className="py-24 bg-brand-bg">` | `<SectionLight id="reviews" className="reveal">` | SectionLight |
| **ProblemSolution** | `<section className="py-24 bg-brand-bg ... blobs">` | `<SectionLight className="reveal" withBlobs={true}>` | SectionLight (с блобами) |
| **Benefits** | `<section className="py-24 bg-gradient-to-br from-brand-green to-brand-text">` | `<SectionDark className="reveal">` | SectionDark |
| **Catalog** | `<section id="catalog" className="py-24 md:py-40 bg-gradient ...">` | `<SectionAccent id="catalog" paddingY="large" className="reveal">` | SectionAccent (большие отступы) |
| **B2B** | `<section id="b2b" className="py-24 md:py-32 bg-gradient ...">` | `<SectionAccent id="b2b">` | SectionAccent |

---

## Что сохранено

✅ **ID секций** - Все `id` сохранены для навигации:
- `id="how-it-works"`
- `id="reviews"`
- `id="catalog"`
- `id="b2b"`

✅ **Reveal-анимации** - Все `reveal` классы сохранены:
- `className="reveal"`
- `className="reveal reveal-fade-up"`
- `className="reveal reveal-scale-in"`

✅ **Функциональность** - Все useReveal хуки, рефы и условные рендеры работают

✅ **Контент** - Весь внутренний контент (заголовки, карточки, кнопки) не тронут

---

## Секции, ожидающие перевода

Следующие секции можно перевести на layout-компоненты:

### Светлые (SectionLight):
- **FAQ** - `<section id="faq" className="py-24 bg-white">`
- **Configurator** - `<section id="configurator" className="py-24 bg-white">`

### Акцентные (SectionAccent):
- **OrderForm** - `<section id="order-form" className="py-24 md:py-32 bg-gradient ...">`
- **Hero** - `<section className="... bg-gradient ..." (специальный случай с pt/pb)`

### Тёмные (SectionDark):
- **Footer** - `<footer id="contacts" className="py-24 md:py-32 bg-gradient-to-br from-brand-text ...">`

---

## Преимущества новых компонентов

### 1. **Единообразие кода**
```typescript
// Было:
<section className="py-24 bg-brand-bg reveal relative overflow-hidden">
  <div className="absolute ... blob ..."></div>
  <div className="absolute ... blob ..."></div>
  <div className="container mx-auto px-4 md:px-8 relative z-10">
    {children}
  </div>
</section>

// Стало:
<SectionLight className="reveal" withBlobs={true}>
  {children}
</SectionLight>
```

### 2. **Меньше повторений**
- Убрано дублирование кода блобов
- Убрано дублирование контейнера
- Убрано дублирование `relative/overflow-hidden`

### 3. **Легче поддерживать**
- Изменения в дизайне делаются в одном месте
- Новые секции добавляются тривиально
- Меньше ошибок с забытыми классами

### 4. **Типобезопасность**
- TypeScript интерфейсы для всех пропов
- Автодополнение в IDE
- Проверка типов при компиляции

### 5. **Гибкость**
- Можно переопределить `className`
- Можно переопределить `containerClassName`
- Можно включить/выключить блобы
- Можно выбрать размер отступов

---

## Как использовать

### Пример 1: Простая светлая секция
```tsx
import { SectionLight } from './ui';

<SectionLight id="my-section" className="reveal">
  <h2>Заголовок</h2>
  <p>Контент секции</p>
</SectionLight>
```

### Пример 2: Светлая секция с блобами
```tsx
<SectionLight className="reveal" withBlobs={true}>
  <div className="grid md:grid-cols-3 gap-8">
    {cards.map(...)}
  </div>
</SectionLight>
```

### Пример 3: Акцентная секция с большими отступами
```tsx
import { SectionAccent } from './ui';

<SectionAccent id="catalog" paddingY="large" className="reveal">
  <h2>Каталог</h2>
  <div className="grid ...">
    {products.map(...)}
  </div>
</SectionAccent>
```

### Пример 4: Тёмная секция
```tsx
import { SectionDark } from './ui';

<SectionDark id="benefits" className="reveal">
  <div className="grid lg:grid-cols-4 gap-8">
    {benefits.map(...)}
  </div>
</SectionDark>
```

---

## Файловая структура

```
src/
├── components/
│   ├── ui/
│   │   ├── SectionLight.tsx       ✅ Новый
│   │   ├── SectionDark.tsx        ✅ Новый
│   │   ├── SectionAccent.tsx      ✅ Новый
│   │   └── index.ts               ✅ Новый (экспорты)
│   ├── HowItWorks.tsx             ✅ Обновлен
│   ├── Reviews.tsx                ✅ Обновлен
│   ├── ProblemSolution.tsx        ✅ Обновлен
│   ├── Benefits.tsx               ✅ Обновлен
│   ├── Catalog.tsx                ✅ Обновлен
│   ├── B2B.tsx                    ✅ Обновлен
│   ├── FAQ.tsx                    ⏳ Можно обновить
│   ├── Configurator.tsx           ⏳ Можно обновить
│   ├── OrderForm.tsx              ⏳ Можно обновить
│   ├── Hero.tsx                   ⏳ Можно обновить (специальный)
│   └── Footer.tsx                 ⏳ Можно обновить
```

---

## Итоги

✅ **Создано**: 3 layout-компонента (SectionLight, SectionDark, SectionAccent)

✅ **Обновлено**: 6 секций используют новые компоненты:
- HowItWorks
- Reviews
- ProblemSolution (с блобами)
- Benefits
- Catalog (с `paddingY="large"`)
- B2B (с фрагментом для множественных детей)

✅ **Сохранено**:
- Все `id` для навигации
- Все `reveal` классы для анимаций
- Вся функциональность и контент

✅ **Преимущества**:
- Меньше дублирования кода
- Единообразие дизайна
- Легче поддерживать
- Типобезопасность
- Гибкость настройки

🎯 **Следующий шаг**: Можно перевести оставшиеся секции (FAQ, Configurator, OrderForm, Hero, Footer) на использование layout-компонентов для полной унификации кодовой базы.
