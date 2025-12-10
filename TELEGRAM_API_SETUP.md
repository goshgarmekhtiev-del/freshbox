# 📱 Настройка Telegram API и Email (SMTP) для отправки заявок

## ✅ Созданная функция

**Файл:** `/api/send-lead.ts`

Serverless-функция для отправки заявок из форм сайта в Telegram и на email через SMTP (Яндекс).

---

## 🔧 Настройка переменных окружения

### Для локальной разработки

Создайте файл `.env.local` в корне проекта:

```env
# Telegram Bot Configuration (обязательно)
TG_BOT_TOKEN=8504360654:AAFxjpDGycPWWzGV2XDtuD0IUulbuYNbAGo
TG_CHAT_ID=785231354

# SMTP Configuration (опционально, для отправки на email)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your_yandex_email@yandex.ru
SMTP_PASS=your_yandex_app_password_here
EMAIL_RECEIVER=recipient@example.com
```

**Важно:** `SMTP_PASS` — это пароль приложения Яндекс, а не обычный пароль от почты.

### Для Vercel

1. Перейдите в настройки проекта на Vercel
2. Откройте раздел **Environment Variables**
3. Добавьте переменные:

**Обязательные (Telegram):**
   - `TG_BOT_TOKEN` = `8504360654:AAFxjpDGycPWWzGV2XDtuD0IUulbuYNbAGo`
   - `TG_CHAT_ID` = `785231354`

**Опциональные (Email через SMTP):**
   - `SMTP_HOST` = `smtp.yandex.ru`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = `your_yandex_email@yandex.ru`
   - `SMTP_PASS` = `your_yandex_app_password_here` (пароль приложения!)
   - `EMAIL_RECEIVER` = `recipient@example.com`

---

## 📡 Использование API

### Endpoint

**POST** `/api/send-lead`

### Формат запроса

```typescript
interface LeadData {
  type: 'B2B' | 'Order';
  name?: string;
  phone: string; // обязательное
  email?: string;
  comment?: string;
  cart?: Array<{
    title: string;
    quantity: number;
    price?: number;
  }>;
  address?: string;
  deliveryTime?: string;
}
```

### Пример для B2B-заявки

```typescript
const response = await fetch('/api/send-lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'B2B',
    name: 'Иван Иванов',
    phone: '+7 (999) 000-00-00',
    email: 'ivan@example.com',
    comment: 'Нужен корпоративный заказ на 50 боксов',
  }),
});
```

### Пример для заказа

```typescript
const response = await fetch('/api/send-lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'Order',
    name: 'Мария Петрова',
    phone: '+7 (999) 111-22-33',
    email: 'maria@example.com',
    address: 'Москва, ул. Примерная, д. 1, кв. 10',
    deliveryTime: 'Сегодня, 14:00',
    cart: [
      {
        title: 'Средний бокс • Классика',
        quantity: 2,
        price: 4200,
      },
      {
        title: 'Большой бокс • Тропики',
        quantity: 1,
        price: 6500,
      },
    ],
  }),
});
```

### Формат ответа

**Успех (200):**
```json
{
  "status": "ok"
}
```

**Ошибка (400/500):**
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 📝 Формат сообщения в Telegram

### B2B-заявка:
```
🍊 FreshBox — новая заявка!

Тип: B2B
Имя: Иван Иванов
Телефон: +7 (999) 000-00-00
Email: ivan@example.com
Комментарий: Нужен корпоративный заказ
```

### Заказ:
```
🍊 FreshBox — новая заявка!

Тип: Order
Имя: Мария Петрова
Телефон: +7 (999) 111-22-33
Email: maria@example.com

Корзина:
• Средний бокс • Классика — 2 шт (4200 ₽)
• Большой бокс • Тропики — 1 шт (6500 ₽)
Адрес доставки: Москва, ул. Примерная, д. 1, кв. 10
Время доставки: Сегодня, 14:00
```

---

## 🔗 Интеграция с формами

### B2BForm.tsx

```typescript
const handleSubmit = async (formData: B2BFormData) => {
  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'B2B',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        comment: formData.comment,
      }),
    });

    if (response.ok) {
      // Успешная отправка
    }
  } catch (error) {
    // Обработка ошибки
  }
};
```

### OrderForm.tsx

```typescript
const handleSubmit = async (formData: OrderFormData, cart: CartItem[]) => {
  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Order',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        deliveryTime: formData.deliveryTime,
        cart: cart.map(item => ({
          title: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    if (response.ok) {
      // Успешная отправка
    }
  } catch (error) {
    // Обработка ошибки
  }
};
```

---

## ✅ Проверка работы

1. Убедитесь, что переменные окружения настроены
2. Отправьте тестовый запрос через Postman или curl:

```bash
curl -X POST http://localhost:3000/api/send-lead \
  -H "Content-Type: application/json" \
  -d '{
    "type": "B2B",
    "name": "Test User",
    "phone": "+79990000000",
    "comment": "Test message"
  }'
```

3. Проверьте, что сообщение пришло в указанный Telegram-чат

---

## 🚀 Деплой на Vercel

Функция автоматически деплоится вместе с проектом. Убедитесь, что:

1. ✅ Файл `/api/send-lead.ts` находится в корне проекта
2. ✅ Переменные окружения настроены в Vercel Dashboard
3. ✅ Проект успешно собирается (`npm run build`)

---

## 📚 Дополнительная информация

- **Telegram Bot API:** https://core.telegram.org/bots/api
- **Vercel Serverless Functions:** https://vercel.com/docs/functions

