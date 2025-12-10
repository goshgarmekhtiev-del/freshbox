# YooKassa Webhook Endpoint

Serverless endpoint для обработки webhook уведомлений от YooKassa.

## Что делает endpoint

Этот endpoint принимает уведомления от YooKassa о статусах платежей и обрабатывает их:
- Логирует все входящие уведомления в структурированном формате
- Валидирует данные webhook
- Обрабатывает события платежей через switch-структуру
- Всегда возвращает `200 OK` для предотвращения повторных отправок от YooKassa

## Endpoint

**POST** `/api/payment-webhook`

**URL для настройки в YooKassa:**
```
https://your-domain.vercel.app/api/payment-webhook
```

## Поддерживаемые события

- `payment.succeeded` - платеж успешно завершен
- `payment.waiting_for_capture` - платеж ожидает подтверждения (для двухстадийных платежей)
- `payment.canceled` - платеж отменен

## Формат уведомления от YooKassa

```json
{
  "type": "notification",
  "event": "payment.succeeded",
  "object": {
    "id": "2c5d8b3e-0001-5000-8000-123456789012",
    "status": "succeeded",
    "amount": {
      "value": "4200.00",
      "currency": "RUB"
    },
    "description": "Заказ №ORDER-12345: Средний бокс • Классика",
    "metadata": {}
  }
}
```

## Response

Endpoint всегда возвращает `200 OK` для валидных данных, чтобы YooKassa не повторял отправку.

### Успешный ответ (200)

```json
{
  "received": true,
  "event": "payment.succeeded",
  "paymentId": "2c5d8b3e-0001-5000-8000-123456789012"
}
```

## Настройка в YooKassa

### Как включить webhook

1. Перейдите в личный кабинет YooKassa: https://yookassa.ru/my
2. Откройте раздел **"Настройки"** → **"Уведомления"**
3. В поле **"URL для уведомлений"** укажите:
   ```
   https://your-domain.vercel.app/api/payment-webhook
   ```
4. Выберите события для отправки:
   - ✅ `payment.succeeded` (обязательно)
   - ✅ `payment.canceled` (рекомендуется)
   - ⚪ `payment.waiting_for_capture` (если используете двухстадийные платежи)
5. Нажмите **"Сохранить"**

### Проверка работы

После настройки YooKassa начнет отправлять уведомления автоматически при изменении статуса платежей. Проверьте логи в Vercel Dashboard → Functions → Logs.

## Логирование

Все входящие уведомления логируются в консоль Vercel в компактном формате:

```
[YOOKASSA WEBHOOK] event=payment.succeeded paymentId=2c5d8b3e-0001-5000-8000-123456789012 status=succeeded amount=4200.00 description="Заказ №12345: Бокс Мини" time=2025-01-01T12:10:22.123Z
```

**Формат лога:**
- `event` - тип события
- `paymentId` - ID платежа в YooKassa
- `status` - статус платежа
- `amount` - сумма платежа
- `description` - описание платежа
- `time` - время получения webhook (ISO 8601)

## CORS

Endpoint настроен с заголовками:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

Поддерживается обработка preflight запросов (OPTIONS).

## Примеры тестовых payload'ов

### payment.succeeded

```json
{
  "type": "notification",
  "event": "payment.succeeded",
  "object": {
    "id": "2c5d8b3e-0001-5000-8000-123456789012",
    "status": "succeeded",
    "amount": {
      "value": "4200.00",
      "currency": "RUB"
    },
    "description": "Заказ №1734567890: Средний бокс • Классика x2, Большой бокс • Тропики x1",
    "metadata": {},
    "created_at": "2025-01-01T12:00:00.000Z",
    "captured_at": "2025-01-01T12:00:05.000Z"
  }
}
```

### payment.canceled

```json
{
  "type": "notification",
  "event": "payment.canceled",
  "object": {
    "id": "2c5d8b3e-0001-5000-8000-123456789013",
    "status": "canceled",
    "amount": {
      "value": "4200.00",
      "currency": "RUB"
    },
    "description": "Заказ №1734567891: Средний бокс • Классика",
    "cancellation_details": {
      "party": "yoo_money",
      "reason": "insufficient_funds"
    }
  }
}
```

### payment.waiting_for_capture

```json
{
  "type": "notification",
  "event": "payment.waiting_for_capture",
  "object": {
    "id": "2c5d8b3e-0001-5000-8000-123456789014",
    "status": "waiting_for_capture",
    "amount": {
      "value": "4200.00",
      "currency": "RUB"
    },
    "description": "Заказ №1734567892: Средний бокс • Классика"
  }
}
```

## Тестирование локально

Для тестирования webhook локально используйте curl:

```bash
curl -X POST http://localhost:3000/api/payment-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "notification",
    "event": "payment.succeeded",
    "object": {
      "id": "test-payment-id",
      "status": "succeeded",
      "amount": {
        "value": "4200.00",
        "currency": "RUB"
      },
      "description": "Тестовый платеж"
    }
  }'
```

## Response

### Успешный ответ (200)

```json
{
  "ok": true
}
```

### Игнорированный запрос (200)

Если данные невалидны (нет `event` или `object`):

```json
{
  "status": "ignored"
}
```

## TODO

В будущем необходимо добавить:
- ✅ Расширенное логирование (реализовано)
- ✅ Валидация данных (реализовано)
- ✅ Структурированная обработка событий (реализовано)
- ⏳ Проверку подписи уведомлений от YooKassa
- ⏳ Интеграцию с CRM для обновления статусов заказов
- ⏳ Обработку ошибок и повторные попытки

