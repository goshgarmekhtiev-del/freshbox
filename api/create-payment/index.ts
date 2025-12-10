import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Интерфейс для тела запроса на создание платежа
 */
interface CreatePaymentRequest {
  amount: number;
  orderId: string | number;
  description: string;
}

/**
 * Интерфейс для ответа с URL подтверждения платежа
 */
interface CreatePaymentResponse {
  confirmation_url: string;
}

/**
 * Интерфейс для ответа об ошибке
 */
interface ErrorResponse {
  error: string;
}

/**
 * Serverless endpoint для создания платежа через YooKassa
 * 
 * Принимает данные о платеже и создаёт его через YooKassa API,
 * возвращая URL для перенаправления пользователя на оплату.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' } as ErrorResponse);
    return;
  }

  try {
    // Получаем переменные окружения
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    // Проверяем наличие обязательных переменных окружения
    if (!shopId || !secretKey) {
      console.error('Missing YooKassa credentials:', {
        shopId: shopId ? 'SET' : 'EMPTY',
        secretKey: secretKey ? 'SET' : 'EMPTY',
      });
      res.status(500).json({ error: 'Payment error' } as ErrorResponse);
      return;
    }

    // Получаем данные из тела запроса
    const body: CreatePaymentRequest = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    // Валидация входных данных
    if (!body.amount || typeof body.amount !== 'number' || body.amount <= 0) {
      console.error('Invalid amount:', body.amount);
      res.status(400).json({ error: 'Invalid amount' } as ErrorResponse);
      return;
    }

    if (!body.orderId) {
      console.error('Missing orderId');
      res.status(400).json({ error: 'Missing orderId' } as ErrorResponse);
      return;
    }

    if (!body.description || typeof body.description !== 'string') {
      console.error('Invalid description');
      res.status(400).json({ error: 'Invalid description' } as ErrorResponse);
      return;
    }

    // Формируем описание платежа
    const paymentDescription = `Заказ №${body.orderId}: ${body.description}`;

    // Создаём базовую авторизацию для YooKassa API
    const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    // Формируем тело запроса для YooKassa
    const paymentData = {
      amount: {
        value: body.amount.toFixed(2),
        currency: 'RUB',
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: `${req.headers.origin || 'https://your-domain.vercel.app'}/success`,
      },
      description: paymentDescription,
    };

    // Отправляем запрос в YooKassa API
    const yookassaResponse = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Idempotence-Key': `${body.orderId}-${Date.now()}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!yookassaResponse.ok) {
      const errorData = await yookassaResponse.text();
      console.error('YooKassa API error:', {
        status: yookassaResponse.status,
        statusText: yookassaResponse.statusText,
        body: errorData,
      });
      res.status(500).json({ error: 'Payment error' } as ErrorResponse);
      return;
    }

    const payment = await yookassaResponse.json();

    // Проверяем наличие confirmation_url
    if (!payment.confirmation || !payment.confirmation.confirmation_url) {
      console.error('Missing confirmation_url in YooKassa response:', payment);
      res.status(500).json({ error: 'Payment error' } as ErrorResponse);
      return;
    }

    // Возвращаем URL для перенаправления
    const response: CreatePaymentResponse = {
      confirmation_url: payment.confirmation.confirmation_url,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('Payment creation error:', err);
    res.status(500).json({ error: 'Payment error' } as ErrorResponse);
  }
}

