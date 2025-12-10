# 🟢 Добавление тёмно-зелёных акцентов: Catalog и B2B

## 📋 Цель

Добавить локальные тёмно-зелёные акценты через `badge-brand-dark` в секциях Catalog и B2B, не меняя светлый характер блоков.

---

## 📊 DIFF: CatalogCard.tsx

### **1. Заменены бейджи на badge-brand-dark**

```diff
        {/* Tag Badge */}
        {product.tag && (
-         <div className="absolute top-4 right-4 px-3 py-2 rounded-full bg-white/95 backdrop-blur-sm text-brand-accent text-xs font-black uppercase tracking-wide border border-brand-accent/20 shadow-md flex items-center gap-1">
+         <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full badge-brand-dark text-xs font-bold uppercase tracking-widest shadow-sm flex items-center gap-1">
            {product.tag.includes('Новинка') ? 
-             <Sparkles size={12} className="inline" fill="currentColor" strokeWidth={2.5} /> : 
-             <Flame size={12} className="inline" fill="currentColor" strokeWidth={2.5} />
+             <Sparkles size={12} className="inline text-white" fill="currentColor" strokeWidth={2.5} /> : 
+             <Flame size={12} className="inline text-white" fill="currentColor" strokeWidth={2.5} />
            }
+           <span className="text-white">{product.tag}</span>
          </div>
        )}
```

**Изменения:**
- ✅ Используется `badge-brand-dark` (тёмно-зелёный фон с лёгким свечением)
- ✅ Текст и иконки теперь белые (`text-white`)
- ✅ Унифицированы отступы: `py-1.5` вместо `py-2`
- ✅ Унифицирован font-weight: `font-bold` вместо `font-black`
- ✅ Унифицирован tracking: `tracking-widest` вместо `tracking-wide`
- ✅ Унифицирована тень: `shadow-sm` вместо `shadow-md`

---

### **2. Усилена зелёная рамка карточек**

```diff
    <div 
-     className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border-2 border-brand-text/5 hover:border-brand-accent/30 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
+     className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden border-2 border-brand-text/10 hover:border-brand-green/40 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={onQuickView}
    >
```

**Изменения:**
- ✅ Базовая рамка: `border-brand-text/10` вместо `border-brand-text/5` (более заметная)
- ✅ Hover-рамка: `border-brand-green/40` вместо `border-brand-accent/30` (тёмно-зелёный акцент)
- ✅ Фон карточки остаётся белым
- ✅ Контраст не повышен до "кислотного" — используется мягкий зелёный оттенок

---

## 📊 DIFF: B2B.tsx

### **1. Заменён бейдж секции на badge-brand**

```diff
- <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/15 text-brand-accent font-bold text-xs uppercase tracking-widest mb-5">
+ <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-5 shadow-sm">
    Бизнес
  </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (яркий оранжево-жёлто-зелёный градиент)
- ✅ Добавлен `shadow-sm` для единообразия

---

### **2. Заменены бейджи преимуществ на badge-brand-dark**

```diff
                {/* Badge in top-right corner */}
-               <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-brand-accent-light/60 border border-brand-accent/30 text-[10px] font-bold text-brand-text uppercase tracking-wide">
+               <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full badge-brand-dark text-xs font-bold uppercase tracking-widest shadow-sm">
                  {benefit.badge}
+                 <span className="text-white">{benefit.badge}</span>
                </div>
```

**Изменения:**
- ✅ Используется `badge-brand-dark` (тёмно-зелёный фон с лёгким свечением)
- ✅ Текст теперь белый (`text-white`)
- ✅ Унифицированы отступы: `px-3 py-1.5` вместо `px-2.5 py-1`
- ✅ Унифицирован размер шрифта: `text-xs` вместо `text-[10px]`
- ✅ Унифицирован tracking: `tracking-widest` вместо `tracking-wide`
- ✅ Добавлен `shadow-sm` для единообразия

**Бейджи преимуществ:**
- "Результат" (Продуктивность)
- "HR-эффект" (Лояльность)
- "Операционка" (Надёжный партнёр)
- "Маркетинг" (Брендирование)

---

### **3. Заменён бейдж "Премиум" на badge-brand**

```diff
              {/* Badge */}
-             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border-2 border-brand-accent/30 text-brand-text text-xs font-bold mb-5 self-start shadow-sm">
+             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-5 self-start shadow-sm">
                <Sparkles size={16} strokeWidth={2.5} className="text-brand-accent" />
-               Премиум
+               <span>Премиум-условия</span>
              </div>
```

**Изменения:**
- ✅ Используется `badge-brand` (яркий оранжево-жёлто-зелёный градиент)
- ✅ Унифицированы отступы: `px-4` вместо `px-3.5`
- ✅ Добавлен `uppercase tracking-widest` для единообразия
- ✅ Обновлён текст: "Премиум-условия" вместо "Премиум"

---

### **4. Добавлена тёмно-зелёная рамка и свечение в правый блок с CTA**

```diff
          {/* Right Column - Premium Offer Card (MAIN VISUAL FOCUS) */}
-         <div className="bg-gradient-to-br from-[#FFF9E6] via-[#F0FFF4] to-[#DFFFD6] rounded-[32px] p-7 lg:p-9 shadow-[0_24px_60px_rgba(15,118,110,0.18)] border-2 border-brand-green/20 flex flex-col relative overflow-hidden">
+         <div className="bg-gradient-to-br from-[#FFF9E6] via-[#F0FFF4] to-[#DFFFD6] rounded-[32px] p-7 lg:p-9 shadow-[0_24px_60px_rgba(15,118,110,0.18)] border-2 border-brand-text/10 flex flex-col relative overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(6, 78, 59, 0.18), 0 0 0 1px rgba(6, 78, 59, 0.1), 0 0 40px rgba(22, 163, 74, 0.1) inset' }}>
```

**Изменения:**
- ✅ Рамка: `border-brand-text/10` (тёмно-зелёный оттенок) вместо `border-brand-green/20`
- ✅ Добавлено свечение через inline style:
  - Внешняя тень: `0 24px 60px rgba(6, 78, 59, 0.18)` (сохранена)
  - Тонкая внутренняя рамка: `0 0 0 1px rgba(6, 78, 59, 0.1)` (тёмно-зелёный)
  - Лёгкое свечение по низу: `0 0 40px rgba(22, 163, 74, 0.1) inset` (мягкий зелёный)
- ✅ Фон блока остаётся светлым (градиент не изменён)
- ✅ CTA-кнопка остаётся ярко-оранжевой (не изменена)

---

## ✅ Проверка сохранённых элементов

### **Catalog:**
- ✅ Светлый фон секции (`bg-gradient-to-b from-white via-brand-bg/30 to-white`)
- ✅ Белый фон карточек
- ✅ Типографика заголовков и описаний
- ✅ CTA-кнопки и функциональность

### **B2B:**
- ✅ Светлый фон секции (SectionAccent)
- ✅ Светлый фон правого блока (градиент не изменён)
- ✅ Ярко-оранжевая CTA-кнопка "Получить КП" (не изменена)
- ✅ Типографика заголовков и описаний
- ✅ Метрики и карточки преимуществ

---

## 🎨 Визуальный результат

### **Catalog:**
- **До:** Бейджи с белым фоном и оранжевым текстом, рамка `border-brand-text/5`
- **После:** Бейджи с тёмно-зелёным фоном и белым текстом (`badge-brand-dark`), рамка `border-brand-text/10` с hover `border-brand-green/40`

### **B2B:**
- **До:** Бейдж секции с `bg-brand-accent/8`, бейджи преимуществ с `bg-brand-accent-light/60`, бейдж "Премиум" с белым фоном, рамка `border-brand-green/20`
- **После:** Бейдж секции с `badge-brand`, бейджи преимуществ с `badge-brand-dark`, бейдж "Премиум-условия" с `badge-brand`, рамка `border-brand-text/10` с тёмно-зелёным свечением

---

## 📊 Матрица изменений

| Элемент | До | После |
|---------|-----|--------|
| **Catalog бейджи** | `bg-white/95 text-brand-accent` | `badge-brand-dark text-white` |
| **Catalog рамка** | `border-brand-text/5 hover:border-brand-accent/30` | `border-brand-text/10 hover:border-brand-green/40` |
| **B2B бейдж секции** | `bg-brand-accent/8 border border-brand-accent/15` | `badge-brand` |
| **B2B бейджи преимуществ** | `bg-brand-accent-light/60 border border-brand-accent/30` | `badge-brand-dark text-white` |
| **B2B бейдж "Премиум"** | `bg-white/80 border-2 border-brand-accent/30` | `badge-brand` |
| **B2B рамка правого блока** | `border-2 border-brand-green/20` | `border-2 border-brand-text/10` + тёмно-зелёное свечение |

---

## ✅ Проверка сборки

```bash
✓ npm run build
✓ built in 4.14s
✓ No linter errors
✓ 200.77 kB │ gzip: 22.58 kB
```

---

## 🎯 Итог

**Catalog и B2B теперь:**
- ✅ Используют тёмно-зелёные акценты через `badge-brand-dark` для ключевых бейджей
- ✅ Имеют усиленные зелёные рамки (Catalog) и тёмно-зелёное свечение (B2B)
- ✅ Сохранены светлые фоны секций
- ✅ Ярко-оранжевые CTA-кнопки не изменены (остаются главным акцентом)
- ✅ Визуально связаны с остальными брендовыми элементами

**Секции остались светлыми, но получили аккуратные тёмно-зелёные акценты!** 🟢✨

