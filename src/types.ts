
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

export enum BoxSize {
  SMALL = 'Малый (S)',
  MEDIUM = 'Средний (M)',
  LARGE = 'Большой (L)'
}

export enum BoxType {
  CLASSIC = 'Классика',
  EXOTIC = 'Экзотика',
  MIX = 'Микс'
}

export interface NotificationData {
  name: string;
  city: string;
  product: string;
}
