# API Endpoints

## `/api/send-lead`

Serverless-функция для отправки заявок в Telegram.

### Переменные окружения

Создайте файл `.env.local` (для локальной разработки) или настройте переменные окружения в Vercel:

```env
TG_BOT_TOKEN=8504360654:AAFxjpDGycPWWzGV2XDtuD0IUulbuYNbAGo
TG_CHAT_ID=785231354
```

### Использование

**POST** `/api/send-lead`

**Body:**
```json
{
  "type": "B2B" | "Order",
  "name": "Иван Иванов",
  "phone": "+7 (999) 000-00-00",
  "email": "ivan@example.com",
  "comment": "Нужен корпоративный заказ",
  "cart": [
    {
      "title": "Средний бокс • Классика",
      "quantity": 2,
      "price": 4200
    }
  ],
  "address": "Москва, ул. Примерная, д. 1",
  "deliveryTime": "Сегодня, 14:00"
}
```

**Response:**
```json
{
  "status": "ok"
}
```

### Пример использования в React

```typescript
const sendLead = async (data: LeadData) => {
  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send lead');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending lead:', error);
    throw error;
  }
};
```

