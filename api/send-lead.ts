import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadData {
  type: 'B2B' | 'Order';
  name?: string;
  phone?: string;
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Получаем данные из тела запроса
  const data: LeadData = typeof req.body === 'string' 
    ? JSON.parse(req.body) 
    : req.body;

  // Проверяем наличие обязательных полей
  if (!data.type) {
    return res.status(400).json({ message: 'Missing required field: type' });
  }
  
  // Для B2B phone необязателен, для Order обязателен
  if (data.type === 'Order' && !data.phone) {
    return res.status(400).json({ message: 'Missing required field: phone (required for Order)' });
  }

  // Формируем сообщение для Telegram
  const message = `
🍊 <b>FreshBox — новая заявка!</b>

<b>Тип:</b> ${data.type}
<b>Имя:</b> ${data.name || '-'}
<b>Телефон:</b> ${data.phone || '-'}
${data.email ? `<b>Email:</b> ${data.email}` : ''}
${data.comment ? `<b>Комментарий:</b> ${data.comment}` : ''}

${data.type === 'Order' ? `
<b>Корзина:</b>
${(data.cart || []).map(
  (item) => `• ${item.title} — ${item.quantity} шт${item.price ? ` (${item.price} ₽)` : ''}`
).join('\n')}
${data.address ? `<b>Адрес доставки:</b> ${data.address}` : ''}
${data.deliveryTime ? `<b>Время доставки:</b> ${data.deliveryTime}` : ''}
` : ''}
  `.trim();

  // Получаем переменные окружения
  const botToken = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram credentials');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ 
        message: 'Telegram send error',
        error: errorData.description || 'Unknown error'
      });
    }

    // Возвращаем успешный ответ
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Telegram error:', err);
    return res.status(500).json({ 
      message: 'Telegram send error',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

