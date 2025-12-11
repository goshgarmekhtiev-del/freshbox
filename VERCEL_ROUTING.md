# Vercel Routing Configuration

## Обзор

Проект использует React Router для клиентской маршрутизации. Для корректной работы SPA (Single Page Application) на Vercel настроены rewrites в `vercel.json`.

## Конфигурация

**Файл:** `vercel.json` (в корне проекта)

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Как это работает

### 1. API Endpoints (`/api/*`)

Все запросы к `/api/*` направляются в serverless функции Vercel:
- `/api/send-lead` → `api/send-lead.ts`
- `/api/create-payment` → `api/create-payment/index.ts`
- `/api/payment-webhook` → `api/payment-webhook/index.ts`

**Важно:** API endpoints обрабатываются **до** SPA fallback, поэтому они всегда работают корректно.

### 2. Клиентские маршруты (SPA Fallback)

Все остальные пути перенаправляются на `/index.html`, что позволяет React Router обрабатывать маршруты на клиенте:

- `/` → `index.html` → React Router → HomePage
- `/success` → `index.html` → React Router → SuccessPage
- `/fail` → `index.html` → React Router → FailPage

## Поддерживаемые маршруты

| Маршрут | Компонент | Описание |
|---------|-----------|----------|
| `/` | `HomePage` | Главная страница с каталогом |
| `/success` | `SuccessPage` | Страница успешной оплаты |
| `/fail` | `FailPage` | Страница неудачной оплаты |

## Прямые переходы по URL

Благодаря SPA fallback, прямые переходы по URL работают корректно:

✅ `https://freshbox-beta.vercel.app/`  
✅ `https://freshbox-beta.vercel.app/success`  
✅ `https://freshbox-beta.vercel.app/fail`  

Все эти URL отдают `index.html`, после чего React Router определяет нужный компонент.

## Порядок обработки запросов

1. **Запрос приходит на Vercel**
2. **Проверка rewrites (сверху вниз):**
   - Если путь начинается с `/api/*` → направляется в serverless функцию
   - Иначе → перенаправляется на `/index.html`
3. **React Router обрабатывает маршрут на клиенте**

## Важные замечания

- ✅ API endpoints (`/api/*`) **не затрагиваются** SPA fallback
- ✅ Все клиентские маршруты работают при прямом переходе по URL
- ✅ Конфигурация не влияет на сборку проекта
- ✅ Работает как в dev-режиме, так и на production

## После деплоя

После `git push` и автоматического redeploy на Vercel:
1. Все маршруты будут доступны по прямым URL
2. API endpoints продолжат работать как раньше
3. React Router будет корректно обрабатывать все клиентские маршруты

## Тестирование

После деплоя проверьте:
- ✅ Прямой переход на `/success` работает
- ✅ Прямой переход на `/fail` работает
- ✅ API endpoints (`/api/*`) продолжают работать
- ✅ Навигация через React Router работает как обычно

