# LazyImage Component

Премиальный компонент для ленивой загрузки изображений с анимированным skeleton-placeholder.

## Особенности

✅ **Анимированный skeleton** с pulse + shimmer эффектом во время загрузки  
✅ **Плавный fade-in** при появлении изображения  
✅ **Zero layout shift** — фиксированное соотношение сторон  
✅ **Lazy loading** для оптимизации производительности  
✅ **Auto WebP** оптимизация для Unsplash/Supabase  
✅ **TypeScript** типизация  

## Использование

### Базовый пример

```tsx
import { LazyImage } from '@/components/ui';

<LazyImage
  src="/images/product.jpg"
  alt="Фруктовый бокс"
  aspectRatio="aspect-[4/5]"
  imgClassName="object-cover"
/>
```

### В каталоге товаров

```tsx
<LazyImage
  src={product.image}
  alt={`Фруктовый бокс ${product.name}`}
  autoOptimize
  priority={false}
  aspectRatio="aspect-[4/5]"
  imgClassName="object-cover transition-all duration-700 group-hover:scale-110"
  skeletonClassName="bg-gradient-to-br from-orange-100/80 via-yellow-100/70 to-amber-100/80"
/>
```

### В модальном окне (hero image)

```tsx
<LazyImage
  src={product.image}
  alt={product.name}
  priority={true}  // Загружать сразу (eager)
  aspectRatio="w-full aspect-[4/5]"
  imgClassName="object-contain drop-shadow-2xl"
  autoOptimize
/>
```

### В корзине (миниатюры)

```tsx
<LazyImage
  src={item.image}
  alt={item.name}
  aspectRatio="w-20 h-20"
  containerClassName="rounded-xl"
  imgClassName="object-cover"
  skeletonClassName="bg-gradient-to-br from-orange-100/60 via-yellow-100/50 to-amber-100/60"
/>
```

## Props

| Prop | Type | Default | Описание |
|------|------|---------|----------|
| `src` | `string` | **required** | URL изображения |
| `alt` | `string` | **required** | Альтернативный текст |
| `aspectRatio` | `string` | `''` | Tailwind классы для aspect ratio (например, `"aspect-[4/5]"`, `"w-20 h-20"`) |
| `containerClassName` | `string` | `''` | Классы для wrapper div |
| `imgClassName` | `string` | `''` | Классы для `<img>` |
| `skeletonClassName` | `string` | `''` | Классы для skeleton placeholder |
| `priority` | `boolean` | `false` | `true` = eager loading (для hero images), `false` = lazy loading |
| `autoOptimize` | `boolean` | `false` | Автоматическая WebP оптимизация для Unsplash/Supabase |

## Skeleton стили

По умолчанию skeleton имеет премиальный градиент:
```
from-yellow-100/90 via-orange-50/80 to-amber-100/90
```

Можно кастомизировать через `skeletonClassName`:
```tsx
skeletonClassName="bg-gradient-to-br from-lime-100 to-green-100"
```

## Оптимизация производительности

### Lazy Loading
- `priority={false}` (default) → `loading="lazy"` — для контента ниже первого экрана
- `priority={true}` → `loading="eager"` — для hero images и первого экрана

### WebP оптимизация
При `autoOptimize={true}`:
- **Unsplash**: добавляет `?fm=webp&auto=format&q=80`
- **Supabase**: добавляет `?format=webp&quality=80`

### Async decoding
Всегда используется `decoding="async"` для неблокирующей загрузки.

## Примеры использования в проекте

- ✅ `CatalogCard.tsx` — карточки товаров в каталоге
- ✅ `QuickViewModal.tsx` — модальное окно товара
- ✅ `CartSidebar.tsx` — миниатюры в корзине
- ✅ `OrderForm.tsx` — миниатюры в форме заказа

## Анимации

### Skeleton
- `animate-pulse` — пульсация фона
- `animate-shimmer` — shimmer эффект (определён в `tailwind.config.js`)

### Fade-in
- `transition-opacity duration-500`
- `opacity-0` → `opacity-100` при загрузке

