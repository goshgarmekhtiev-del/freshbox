# YooKassa Payment Endpoint

Serverless endpoint для создания платежей через YooKassa.

## Endpoint

**POST** `/api/create-payment`

## Request Body

```typescript
{
  amount: number;        // Сумма платежа (например, 1000.50)
  orderId: string | number;  // ID заказа
  description: string;  // Описание платежа
}
```

### Пример запроса

```json
{
  "amount": 4200,
  "orderId": "ORDER-12345",
  "description": "Средний бокс • Классика"
}
```

## Response

### Успешный ответ (200)

```json
{
  "confirmation_url": "https://yoomoney.ru/checkout/payments/v2/contract?orderId=..."
}
```

### Ошибка (400/500)

```json
{
  "error": "Payment error"
}
```

## Переменные окружения

Необходимо настроить следующие переменные в Vercel:

- `YOOKASSA_SHOP_ID` - ID магазина в YooKassa
- `YOOKASSA_SECRET_KEY` - Секретный ключ для API

## Использование на фронтенде

```typescript
const createPayment = async (amount: number, orderId: string, description: string) => {
  try {
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        orderId,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment');
    }

    const data = await response.json();
    
    // Перенаправляем пользователя на страницу оплаты
    window.location.href = data.confirmation_url;
  } catch (error) {
    console.error('Payment error:', error);
  }
};
```

