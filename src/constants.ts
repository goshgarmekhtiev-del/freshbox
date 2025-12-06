
import { BoxType } from './types';
import type { Product, Review, FAQItem } from './types';

// Updated images: brighter, high contrast, juicy - WebP optimized
// EXPORTING this object so we can use it in Hero.tsx
export const JUICY_IMAGES = {
  // ВАЖНО: Положите ваше изображение с именем "hero.png" в папку "public" вашего проекта
  box1: '/hero.png', 
  box2: 'https://images.unsplash.com/photo-1519996541103-1c9696fa994f?auto=format&fit=crop&w=800&q=80&fm=webp', // Fresh Green
  box3: 'https://images.unsplash.com/photo-1596547659530-5b583f707f18?auto=format&fit=crop&w=800&q=80&fm=webp', // Citrus mix
  box4: 'https://images.unsplash.com/photo-1523049673856-382f672323e2?auto=format&fit=crop&w=800&q=80&fm=webp', // Very colorful exotic
  box5: 'https://images.unsplash.com/photo-1615486511262-c7b5c3f448b0?auto=format&fit=crop&w=800&q=80&fm=webp', // Berries bright
  box6: 'https://images.unsplash.com/photo-1541344999755-99af61186343?auto=format&fit=crop&w=800&q=80&fm=webp', // Apple/Green/Fresh
  // Avatars - optimized for small size (150px) with WebP
  avatar1: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80&fm=webp', // Bright smile
  avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80&fm=webp', // Bright smile
  avatar3: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80&fm=webp', // Bright smile
};

// Images for the Configurator based on type - WebP optimized
export const CONFIGURATOR_IMAGES: Record<string, string> = {
  [BoxType.CLASSIC]: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=800&q=80&fm=webp', // Apples/Pears
  [BoxType.EXOTIC]: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=800&q=80&fm=webp', // Pineapple/Mango
  [BoxType.MIX]: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80&fm=webp', // Mix
};

// Fake data for Social Proof notifications
export const RECENT_PURCHASES = [
  { name: 'Анна', city: 'Москва', product: 'Цитрусовый бодряк' },
  { name: 'Дмитрий', city: 'Химки', product: 'Офисный набор' },
  { name: 'Елена', city: 'Москва', product: 'Супер Экзотик' },
  { name: 'Максим', city: 'Одинцово', product: 'Ягодный акцент' },
  { name: 'Ольга', city: 'Москва', product: 'Фитнес & ЗОЖ' },
];

export const PRODUCTS: Product[] = [
  // --- SMALL (S) ---
  {
    id: 's1',
    name: 'S1 Цитрусовый бодряк',
    description: 'Яркий набор для любителей цитрусов. Универсальный подарок для поднятия настроения.',
    ingredients: 'Апельсины (2), Мандарины (4), Грейпфрут Ruby Red (1)',
    price: 1900,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/S1.png',
    tag: 'Хит продаж'
  },
  {
    id: 's2',
    name: 'S2 Манго, друзья',
    description: 'Набор, где главное — манго! Идеально для знакомства с экзотикой.',
    ingredients: 'Манго (1), Яблоко (2), Груша (1), Киви (1), Мандарин (1)',
    price: 2200,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/S2.png',
    tag: 'Тропики'
  },
  {
    id: 's3',
    name: 'S3 Домашний уют',
    description: 'Классический набор для родителей или спокойного вечера. Только знакомые вкусы.',
    ingredients: 'Яблоко красное (2), Яблоко зелёное (1), Груша (2), Банан (1), Апельсин (1)',
    price: 1800,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/S3.png',
    tag: 'Классика'
  },
  {
    id: 's4',
    name: 'S4 Ягодный акцент',
    description: 'Маленький, но эффектный набор с ягодами. Для девушек и ЗОЖ.',
    ingredients: 'Гранат (1), Киви (1), Яблоко (1), Мандарины (2), Черника/Малина (125г)',
    price: 2500,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/S4.png',
    tag: 'ЗОЖ'
  },
  {
    id: 's5',
    name: 'S5 Мини-экзотика',
    description: 'Для любителей необычных вкусов. Драгонфрут или премиум манго в основе.',
    ingredients: 'Драгонфрут/Манго (1), Киви (1), Апельсин (1), Лайм/Лимон (1), Кумкват (горсть)',
    price: 2600,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/S5.png',
    tag: 'Новинка'
  },

  // --- MEDIUM (M) ---
  {
    id: 'm1',
    name: 'M1 Семейный классический',
    description: 'Набор, который понравится всем. Без сложной экзотики, только хиты.',
    ingredients: 'Яблоки (5), Груши (3), Апельсины (3), Мандарины (4), Бананы (2)',
    price: 3500,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/M1.png',
    tag: 'Для семьи'
  },
  {
    id: 'm2',
    name: 'M2 Манго & тропики',
    description: 'Яркий тропический набор с манго и папайей. Отпуск в коробке.',
    ingredients: 'Манго Premium (1), Манго (1), Папайя (1), Киви (3), Апельсины (2), Груши (2), Виноград, Мандарины (3)',
    price: 4200,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/M2.png',
    tag: 'Хит продаж'
  },
  {
    id: 'm3',
    name: 'M3 Фитнес & ЗОЖ',
    description: 'Идеальный баланс для правильного питания. Авокадо и грейпфруты.',
    ingredients: 'Авокадо (2), Грейпфрут (2), Яблоки (4), Киви (3), Лимон/Лайм (2), Мандарины (2)',
    price: 3900,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/M3.png',
    tag: 'Detox'
  },
  {
    id: 'm4',
    name: 'M4 Офисный набор',
    description: 'Удобно взять с собой. Фрукты, которые легко поделить с коллегами.',
    ingredients: 'Яблоки (6), Груши (3), Мандарины (6), Бананы (3), Виноград (1 гроздь)',
    price: 3800,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/M4.png',
    tag: 'В офис'
  },
  {
    id: 'm5',
    name: 'M5 Премиум с ягодами',
    description: 'Средний размер, но премиальное наполнение. Для особых случаев.',
    ingredients: 'Гранат (1), Манго (1), Киви (2), Апельсины (2), Яблоки (2), Груши (2), Виноград, Ягоды (125г), Лайм',
    price: 4500,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/M5.png',
    tag: 'Подарок'
  },
  {
    id: 'm6',
    name: 'M6 Гранатовый Взрыв',
    description: 'Новейший сезонный набор! Много граната, красных яблок и цитрусовых для иммунитета.',
    ingredients: 'Гранат (3), Грейпфрут (2), Яблоки красные (4), Мандарины (5), Имбирь (корень)',
    price: 3300,
    image: JUICY_IMAGES.box5,
    tag: 'Новинка'
  },

  // --- LARGE (L) ---
  {
    id: 'l1',
    name: 'L1 Королевский ананас',
    description: 'Большой премиальный набор с ананасом в центре. Для праздников.',
    ingredients: 'Ананас (1), Манго (2), Гранат (2), Апельсины (3), Яблоки (5), Груши (3), Киви (3), Мандарины (6), Виноград',
    price: 5500,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/L1.png',
    tag: 'Праздник'
  },
  {
    id: 'l2',
    name: 'L2 Супер Экзотик',
    description: 'Максимум экзотики! Вау-эффект для VIP-клиентов и гурманов.',
    ingredients: 'Ананас (1), Папайя (1), Драгонфрут (1), Манго (2), Маракуйя (4), Кокос (1), Авокадо (2), Киви (3), Виноград',
    price: 7500,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/L2.png',
    tag: 'VIP Новинка'
  },
  {
    id: 'l3',
    name: 'L3 Большая семья',
    description: 'Огромный запас витаминов, чтобы хватило всем в доме надолго.',
    ingredients: 'Яблоки (7), Груши (4), Апельсины (4), Мандарины (8), Бананы (4), Виноград (2), Киви (4)',
    price: 5000,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/L3.png',
    tag: 'Для семьи'
  },
  {
    id: 'l4',
    name: 'L4 Витамин на неделю',
    description: 'Сбалансированный полезный набор для семьи на весь период.',
    ingredients: 'Грейпфрут (3), Авокадо (3), Яблоки (7), Груши (3), Киви (4), Апельсины (3), Лимон/Лайм (3), Виноград',
    price: 5200,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/L4.png',
    tag: 'ЗОЖ'
  },
  {
    id: 'l5',
    name: 'L5 Праздничный премиум',
    description: 'Большой ВАУ-набор с ягодами и экзотикой. Лучший подарок.',
    ingredients: 'Ананас (1), Манго Premium (1), Гранаты (2), Киви (4), Апельсины (3), Груши (3), Яблоки (3), Мандарины (6), Виноград, Ягоды (250г)',
    price: 7000,
    image: 'https://sinygofavafuuahhgwll.supabase.co/storage/v1/object/public/catalog/L5.png',
    tag: 'WOW-эффект'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Марина Сочная',
    role: 'Фитнес-блогер',
    text: 'Брала М3 Фитнес & ЗОЖ. Авокадо идеальной спелости, что редкость! Очень удобно.',
    avatar: JUICY_IMAGES.avatar1
  },
  {
    id: '2',
    name: 'Алексей Драйв',
    role: 'Стартапер',
    text: 'M4 Офисный набор спасает нашу команду. Бананы и мандарины улетают за час.',
    avatar: JUICY_IMAGES.avatar2
  },
  {
    id: '3',
    name: 'Светлана Яркая',
    role: 'Мама троих',
    text: 'Заказала L3 Большая семья. Хватило на всех детей и гостей. Фрукты сладкие, как мед.',
    avatar: JUICY_IMAGES.avatar3
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Они реально свежие?',
    answer: 'Свежее не бывает! Утром на базе, в обед у вас. Никаких складов, только прямой отбор.'
  },
  {
    question: 'А если не вкусно?',
    answer: 'Не поверим, но вернем деньги! Мы уверены в каждом яблоке и манго.'
  },
  {
    question: 'Хочу сюрприз!',
    answer: 'Мы мастера сюрпризов. Добавим яркую открытку и конфетти. Эффект "ВАУ" гарантирован.'
  },
  {
    question: 'Как быстро?',
    answer: 'Молниеносно. 2 часа по Москве. Наш курьер быстрее ветра.'
  },
  {
    question: 'Для бизнеса?',
    answer: 'Конечно! Счета, акты, скидки. Ваши сотрудники будут вас обожать.'
  },
  {
    question: 'Упаковка красивая?',
    answer: 'Очень! Яркая крафтовая коробка, ленты. Можно сразу в сторис постить.'
  }
];
