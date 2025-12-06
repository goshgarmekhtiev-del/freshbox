
export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
  tag?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const BoxSize = {
  SMALL: 'Малый (S)',
  MEDIUM: 'Средний (M)',
  LARGE: 'Большой (L)'
} as const;

export type BoxSize = typeof BoxSize[keyof typeof BoxSize];

export const BoxType = {
  CLASSIC: 'Классика',
  EXOTIC: 'Экзотика',
  MIX: 'Микс'
} as const;

export type BoxType = typeof BoxType[keyof typeof BoxType];

export interface NotificationData {
  name: string;
  city: string;
  product: string;
}
