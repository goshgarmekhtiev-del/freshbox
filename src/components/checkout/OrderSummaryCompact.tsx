import React from 'react';
import type { CartItem } from '@/types';
import { ShoppingBag } from 'lucide-react';
import { calculateOrderTotals } from '@/utils/cart';

interface OrderSummaryCompactProps {
  cart: CartItem[];
}

const OrderSummaryCompact: React.FC<OrderSummaryCompactProps> = ({ cart }) => {
  const totals = calculateOrderTotals(cart);

  return (
    <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-lime-50/60 border-2 border-emerald-100/50 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent-dark flex items-center justify-center shadow-sm">
          <ShoppingBag size={20} strokeWidth={2.5} className="text-white" />
        </div>
        <h3 className="text-xl font-black text-[#064E3B]">Ваш заказ</h3>
      </div>

      {/* Items List */}
      <div className="space-y-2 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-[#064E3B] font-semibold">
              {item.name} ×{item.quantity}
            </span>
            <span className="text-[#115E59] font-bold">
              {(item.price * item.quantity).toLocaleString()} ₽
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-emerald-200/50 my-3"></div>

      {/* Delivery */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-[#064E3B]">Доставка</span>
        <span className={`text-sm font-bold ${
          totals.freeShippingActivated 
            ? 'text-brand-green' 
            : 'text-[#115E59]'
        }`}>
          {totals.freeShippingActivated ? 'бесплатно' : `${totals.shipping.toLocaleString()} ₽`}
        </span>
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t-2 border-emerald-200/50">
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-[#064E3B]">Итого к оплате</span>
          <span className="text-2xl font-black text-[#064E3B]">
            {totals.total.toLocaleString()} ₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCompact;

