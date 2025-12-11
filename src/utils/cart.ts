import type { CartItem } from '@/types';

/**
 * Константы для расчёта доставки
 */
export const FREE_SHIPPING_THRESHOLD = 2000;
export const SHIPPING_COST = 300;

/**
 * Интерфейс для результата расчёта сумм заказа
 */
export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingActivated: boolean;
  remainingForFreeShipping: number;
}

/**
 * Вычисляет итоговые суммы заказа на основе корзины
 * @param cart - Массив товаров в корзине
 * @returns Объект с subtotal, shipping, total и флагами
 */
export function calculateOrderTotals(cart: CartItem[]): OrderTotals {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const freeShippingActivated = shipping === 0;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    shipping,
    total,
    freeShippingActivated,
    remainingForFreeShipping,
  };
}

