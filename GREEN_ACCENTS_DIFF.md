# 🟢 Добавление тёмно-зелёных акцентов: Reviews, FAQ, OrderForm

## 📋 Цель

Добавить локальные тёмно-зелёные акценты через `badge-brand` и `badge-brand-dark` в секциях Reviews, FAQ и OrderForm, не меняя светлый характер блоков.

---

## 📊 DIFF: Reviews.tsx

### **1. Добавлен импорт CheckCircle2**

```diff
- import { Star } from 'lucide-react';
+ import { Star, CheckCircle2 } from 'lucide-react';
```

**Причина:** Нужна иконка для verified-бейджа на карточках отзывов.

---

### **2. Заменён бейдж секции на badge-brand**

```diff
- <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
+ <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
    Отзывы
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (яркий оранжево-жёлто-зелёный градиент)
- ✅ Сохранены размеры и типографика

---

### **3. Добавлена verified-иконка на карточках отзывов**

```diff
      {/* Top Section - Rating + Tag */}
      <div className="flex items-start justify-between mb-4 relative z-10">
-       {/* 5 Stars Rating */}
-       <div className="flex gap-0.5 text-brand-yellow">
+       {/* 5 Stars Rating + Verified Badge */}
+       <div className="flex items-center gap-2">
+         <div className="flex gap-0.5 text-brand-yellow">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} strokeWidth={2.5} fill="currentColor" stroke="none" />
            ))}
          </div>
+         {/* Verified Icon */}
+         <div className="inline-flex items-center justify-center w-5 h-5 rounded-full badge-brand-dark">
+           <CheckCircle2 size={12} strokeWidth={2.5} className="text-white" fill="currentColor" />
+         </div>
        </div>
```

**Изменения:**
- ✅ Добавлен verified-бейдж рядом с рейтингом
- ✅ Используется `badge-brand-dark` для тёмно-зелёного фона
- ✅ Белая иконка CheckCircle2 с заливкой для визуального акцента

---

## 📊 DIFF: FAQ.tsx

### **1. Заменён бейдж FAQ на badge-brand**

```diff
- <div className="inline-flex items-center rounded-full bg-brand-accent-light/60 px-4 py-1 text-sm font-medium text-brand-text mb-4">
+ <div className="inline-flex items-center rounded-full badge-brand px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
    FAQ
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (яркий оранжево-жёлто-зелёный градиент)
- ✅ Унифицированы размеры и стиль с другими секциями

---

### **2. Заменены табы категорий на badge-brand/badge-brand-dark**

```diff
                className={`
                  inline-flex items-center justify-center whitespace-nowrap
                  rounded-full px-4 sm:px-5 py-2 text-sm sm:text-base font-medium
                  transition-all duration-300 shrink-0
                  ${
                    activeCategory === category
-                     ? 'bg-gradient-to-r from-brand-accent to-brand-yellow text-white shadow-lg scale-105'
-                     : 'bg-white/70 text-brand-text-soft border border-transparent hover:bg-white hover:border-brand-accent-light/30'
+                     ? 'badge-brand shadow-lg scale-105'
+                     : 'badge-brand-dark hover:bg-white/10'
                  }
                `}
```

**Изменения:**
- ✅ Активный таб использует `badge-brand` (яркий градиент)
- ✅ Неактивные табы используют `badge-brand-dark` (тёмно-зелёный фон)
- ✅ Сохранены hover-эффекты и анимации

---

## 📊 DIFF: OrderForm.tsx

### **1. Добавлен бейдж "Шаг 2 из 2"**

```diff
            {/* Header */}
            <div>
+             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand-dark font-bold text-xs uppercase tracking-widest mb-4 shadow-sm">
+               <span>Шаг 2 из 2</span>
+             </div>
              <h3 className="text-3xl font-black text-brand-text mb-2">Оформление</h3>
              <p className="text-base text-brand-text-soft">Осталось пару шагов до витаминного рая</p>
            </div>
```

**Изменения:**
- ✅ Добавлен бейдж "Шаг 2 из 2" в стиле `badge-brand-dark`
- ✅ Визуально связывает форму с остальными брендовыми элементами
- ✅ Расположен над заголовком для иерархии

---

## ✅ Проверка сохранённых элементов

### **Reviews:**
- ✅ Светлый фон секции (`bg-gradient-to-b from-[#FFF7E6] to-[#E6FBD9]`)
- ✅ Типографика заголовков и подзаголовков
- ✅ Стили карточек отзывов
- ✅ Фильтры и авто-ротация

### **FAQ:**
- ✅ Кремовый фон секции (`bg-[#FFFDF7]`)
- ✅ Типографика заголовков
- ✅ Аккордеон и его стили
- ✅ CTA-блок "Не нашли ответ?"

### **OrderForm:**
- ✅ Светлый градиентный фон (`bg-gradient-to-br from-[#F2FFD9] to-[#E3FFB5]`)
- ✅ Все поля формы и валидация
- ✅ Календарь и выбор времени
- ✅ Способы оплаты

---

## 🎨 Визуальный результат

### **Reviews:**
- **До:** Бейдж секции с `bg-brand-accent/10`, без verified-иконки
- **После:** Бейдж секции с `badge-brand`, verified-иконка на каждой карточке отзыва

### **FAQ:**
- **До:** Бейдж FAQ с `bg-brand-accent-light/60`, табы с кастомными градиентами
- **После:** Бейдж FAQ с `badge-brand`, активные табы с `badge-brand`, неактивные с `badge-brand-dark`

### **OrderForm:**
- **До:** Нет бейджа шага
- **После:** Бейдж "Шаг 2 из 2" с `badge-brand-dark` над заголовком

---

## 📊 Матрица изменений

| Элемент | До | После |
|---------|-----|--------|
| **Reviews бейдж** | `bg-brand-accent/10 border border-brand-accent/20` | `badge-brand` |
| **Reviews verified** | Нет | `badge-brand-dark` + CheckCircle2 |
| **FAQ бейдж** | `bg-brand-accent-light/60` | `badge-brand` |
| **FAQ активный таб** | `bg-gradient-to-r from-brand-accent to-brand-yellow` | `badge-brand` |
| **FAQ неактивный таб** | `bg-white/70 border border-transparent` | `badge-brand-dark` |
| **OrderForm бейдж** | Нет | `badge-brand-dark` ("Шаг 2 из 2") |

---

## ✅ Проверка сборки

```bash
✓ npm run build
✓ built in 4.01s
✓ No linter errors
✓ 200.37 kB │ gzip: 22.56 kB
```

---

## 🎯 Итог

**Reviews, FAQ и OrderForm теперь:**
- ✅ Используют единые бренд-бейджи (`badge-brand` / `badge-brand-dark`)
- ✅ Имеют локальные тёмно-зелёные акценты
- ✅ Сохранён светлый характер всех секций
- ✅ Визуально связаны с остальными брендовыми элементами

**Секции остались светлыми и воздушными!** 🟢✨

