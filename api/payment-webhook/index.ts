import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Типы событий YooKassa webhook
 */
type YooKassaEventType = 
  | 'payment.succeeded'
  | 'payment.waiting_for_capture'
  | 'payment.canceled';

/**
 * Интерфейс для объекта платежа в webhook
 */
interface YooKassaPaymentObject {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  description?: string;
  metadata?: Record<string, any>;
  [key: string]: any;
}

/**
 * Интерфейс для webhook события от YooKassa
 */
interface YooKassaWebhookEvent {
  type: string;
  event: YooKassaEventType;
  object: YooKassaPaymentObject;
  [key: string]: any;
}

/**
 * Serverless endpoint для обработки webhook уведомлений от YooKassa
 * 
 * Принимает уведомления о статусах платежей и обрабатывает их.
 * Поддерживает события:
 * - payment.succeeded - платеж успешно завершен
 * - payment.waiting_for_capture - платеж ожидает подтверждения
 * - payment.canceled - платеж отменен
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Устанавливаем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight запросов (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Получаем данные из тела запроса
    const body: YooKassaWebhookEvent = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    // Базовая валидация: проверяем наличие обязательных полей
    if (!body.event || !body.object) {
      console.log('[YOOKASSA WEBHOOK] Invalid data: missing event or object');
      res.status(200).json({ status: 'ignored' });
      return;
    }

    const event = body.event;
    const payment = body.object;
    const paymentId = payment.id;
    const status = payment.status;
    const amount = payment.amount?.value || '0';
    const description = payment.description || '';
    const timestamp = new Date().toISOString();

    // Расширенное логирование в компактном формате
    console.log(
      `[YOOKASSA WEBHOOK] event=${event} paymentId=${paymentId} status=${status} amount=${amount} description="${description}" time=${timestamp}`
    );

    // Обрабатываем известные события
    switch (event) {
      case 'payment.succeeded':
        // TODO: Добавить запись заказа в CRM
        // Пример: await updateOrderStatus(paymentId, 'paid', { amount, description });
        break;

      case 'payment.waiting_for_capture':
        // TODO: Для двухстадийных платежей (пока не используется)
        // Пример: await updateOrderStatus(paymentId, 'pending_capture', { amount });
        break;

      case 'payment.canceled':
        // TODO: Логика отмены заказов
        // Пример: await updateOrderStatus(paymentId, 'canceled', { reason: 'payment_canceled' });
        break;

      default:
        // Неизвестное событие - логируем, но не обрабатываем
        console.log(`[YOOKASSA WEBHOOK] Unhandled event type: ${event}`);
        break;
    }

    // Всегда возвращаем 200 OK для валидных данных
    // YooKassa ожидает успешный ответ, иначе будет повторять отправку
    res.status(200).json({ ok: true });
  } catch (err) {
    // Логируем ошибку, но все равно возвращаем 200
    // чтобы YooKassa не повторял отправку
    console.error('[YOOKASSA WEBHOOK] Processing error:', err);
    res.status(200).json({ ok: true, error: 'Processing error' });
  }
}

