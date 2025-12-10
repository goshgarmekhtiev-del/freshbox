import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

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

/**
 * Формирует HTML-текст письма для email-уведомления
 * @param data - Данные заявки
 * @returns HTML-строка для письма
 */
function formatEmailHtml(data: LeadData): string {
  const cartItems = data.type === 'Order' && data.cart && data.cart.length > 0
    ? data.cart.map(item => 
        `<li>${item.title} — ${item.quantity} шт${item.price ? ` (${item.price} ₽)` : ''}</li>`
      ).join('')
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ff6b35; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #555; }
        .value { margin-left: 10px; }
        .cart-list { list-style: none; padding: 0; }
        .cart-list li { padding: 5px 0; border-bottom: 1px solid #ddd; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍊 FreshBox — новая заявка!</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Тип:</span>
            <span class="value">${data.type}</span>
          </div>
          <div class="field">
            <span class="label">Имя:</span>
            <span class="value">${data.name || '-'}</span>
          </div>
          <div class="field">
            <span class="label">Телефон:</span>
            <span class="value">${data.phone || '-'}</span>
          </div>
          ${data.email ? `
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${data.email}</span>
          </div>
          ` : ''}
          ${data.comment ? `
          <div class="field">
            <span class="label">Комментарий:</span>
            <span class="value">${data.comment}</span>
          </div>
          ` : ''}
          ${data.type === 'Order' ? `
          ${cartItems ? `
          <div class="field">
            <span class="label">Корзина:</span>
            <ul class="cart-list">${cartItems}</ul>
          </div>
          ` : ''}
          ${data.address ? `
          <div class="field">
            <span class="label">Адрес доставки:</span>
            <span class="value">${data.address}</span>
          </div>
          ` : ''}
          ${data.deliveryTime ? `
          <div class="field">
            <span class="label">Время доставки:</span>
            <span class="value">${data.deliveryTime}</span>
          </div>
          ` : ''}
          ` : ''}
          <div class="footer">
            <p>Заявка получена через форму на сайте FreshBox</p>
            <p>Время: ${new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `.trim();
}

/**
 * Serverless endpoint для отправки заявок в Telegram и на email
 * 
 * Поддерживает два типа заявок:
 * - B2B: корпоративные заявки
 * - Order: заказы с корзиной товаров
 * 
 * Отправка происходит в два канала:
 * 1. Telegram (обязательно) - основной канал уведомлений
 * 2. Email через SMTP (опционально) - дополнительный канал
 * 
 * Важно: Ошибки email не ломают Telegram-отправку
 */
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

  // Получаем переменные окружения для Telegram
  const botToken = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram credentials');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Создаём email transporter (если настроены SMTP переменные)
  // Email отправка опциональна и не блокирует Telegram-отправку
  let emailTransporter: nodemailer.Transporter | null = null;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS; // Пароль приложения Яндекс, не обычный пароль!
  const emailReceiver = process.env.EMAIL_RECEIVER;

  // Инициализируем email transporter только если все переменные настроены
  if (smtpHost && smtpPort && smtpUser && smtpPass && emailReceiver) {
    try {
      emailTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: true, // Используем SSL для порта 465 (Яндекс SMTP)
        auth: {
          user: smtpUser,
          pass: smtpPass, // Пароль приложения Яндекс
        },
      });
    } catch (err) {
      console.error('Failed to create email transporter:', err);
      // Продолжаем работу без email, не блокируем процесс
    }
  }

  try {
    // Отправляем сообщение в Telegram (основной канал)
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

    // Telegram отправлен успешно, теперь отправляем email (если настроен)
    // Ошибки email НЕ должны ломать основной процесс - Telegram уже отправлен
    if (emailTransporter && emailReceiver) {
      try {
        const emailHtml = formatEmailHtml(data);
        const emailSubject = data.type === 'Order' 
          ? 'Новый заказ с сайта FreshBox'
          : 'Новая B2B-заявка FreshBox';

        await emailTransporter.sendMail({
          from: `"FreshBox" <${smtpUser}>`,
          to: emailReceiver,
          subject: emailSubject,
          html: emailHtml,
        });

        console.log('Email sent successfully');
      } catch (emailErr) {
        // Логируем ошибку, но не прерываем процесс
        // Telegram уже отправлен, поэтому возвращаем успех
        console.error('Email send error:', emailErr);
      }
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

