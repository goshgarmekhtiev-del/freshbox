import React, { useState, useEffect, useMemo } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useReveal } from '@/hooks';
import { SectionLight } from '@/components/ui';

// Extended Review Type
export type ReviewSegment = 'family' | 'office' | 'gift' | 'vip' | 'detox' | 'other';

export interface Review {
  id: string;
  name: string;
  role: string;
  city?: string;
  tag?: string;
  segment: ReviewSegment;
  boxCode?: string;
  rating: number;
  text: string;
  avatar: string;
}

interface ReviewCardProps {
  name: string;
  role: string;
  city?: string;
  text: string;
  avatar: string;
  tag?: string;
  segment: ReviewSegment;
  index: number;
  onImageLoad: (index: number) => void;
  isImageLoaded: boolean;
}

// Filter configuration
type ReviewFilterId = 'all' | ReviewSegment;

const REVIEW_FILTERS: { id: ReviewFilterId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'family', label: 'Для семьи' },
  { id: 'office', label: 'В офис' },
  { id: 'gift', label: 'Для подарка' },
  { id: 'detox', label: 'Detox & ЗОЖ' },
  { id: 'vip', label: 'VIP / премиум' },
];

// Segment configuration for visual badges
const segmentConfig: Record<ReviewSegment, {
  label: string;
  className: string;
}> = {
  family: {
    label: 'Для семьи',
    className: 'bg-lime-100 text-emerald-800'
  },
  office: {
    label: 'В офис',
    className: 'bg-sky-100 text-sky-800'
  },
  gift: {
    label: 'Для подарка',
    className: 'bg-rose-100 text-rose-800'
  },
  vip: {
    label: 'VIP / премиум',
    className: 'bg-amber-100 text-amber-800'
  },
  detox: {
    label: 'Detox & ЗОЖ',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  },
  other: {
    label: 'Клиентский отзыв',
    className: 'bg-slate-100 text-slate-700'
  }
};

// Full reviews dataset (36 reviews)
const REVIEWS_DATA: Review[] = [
  // A. For Family (6 reviews)
  {
    id: 'family_1',
    name: 'Марина Сочная',
    role: 'Мама двоих детей',
    city: 'Москва',
    tag: '🍎 Для семьи',
    segment: 'family',
    boxCode: 'L3 Большая семья',
    rating: 5,
    text: 'Заказала бокс «Большая семья» на выходные — дети перестали просить сладости. Каждый день открываем коробку как сундук с сокровищами: манго, ягоды, хрустящие яблоки. Фрукты спелые, без "подгнивших сюрпризов".',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  },
  {
    id: 'family_2',
    name: 'Олег Собранный',
    role: 'Папа и айтишник',
    city: 'Санкт-Петербург',
    tag: '💚 Удобно для недели',
    segment: 'family',
    boxCode: 'M3 Фитнес & ЗОЖ',
    rating: 5,
    text: 'Берём боксы каждую неделю — удобно, что всё уже подобрано по сочетаниям. Я беру себе набор с авокадо и грейпфрутом, детям достаётся сладкая часть. Вкус на уровне "эко-лавок".',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
  },
  {
    id: 'family_3',
    name: 'Светлана Яркая',
    role: 'Мама троих',
    city: 'Казань',
    tag: '🍊 Полезный перекус',
    segment: 'family',
    boxCode: 'S1 Цитрусовый бодряк',
    rating: 5,
    text: 'Раньше дети тянулись к печенькам, сейчас — к мандаринам из бокса. Удобно, что все фрукты вымыты и красиво сложены, достаточно поставить коробку на стол.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
  },
  {
    id: 'family_4',
    name: 'Анастасия Заботливая',
    role: 'Молодая мама',
    city: 'Новосибирск',
    tag: '💛 Здоровый холодильник',
    segment: 'family',
    boxCode: 'M1 Семейный классический',
    rating: 5,
    text: 'Мне нравится, что в боксе нет "случайных" фруктов. Всё продумано: часть на перекусы, часть для нарезки на стол, часть для смузи. Теперь открываю холодильник — и там яркая коробка с фруктами.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    id: 'family_5',
    name: 'Игорь Спокойный',
    role: 'Работающий папа',
    city: 'Екатеринбург',
    tag: '🌿 Меняем привычки',
    segment: 'family',
    boxCode: 'Detox набор',
    rating: 5,
    text: 'Решили всей семьёй пересесть со сладкой газировки на фруктовые смузи. Взяли detox-набор — и понеслось. Жена экспериментирует с рецептами, детям нравится выдавливать соки.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  },
  {
    id: 'family_6',
    name: 'Лилия Домашняя',
    role: 'Домохозяйка',
    city: 'Краснодар',
    tag: '✨ Вкусно и красиво',
    segment: 'family',
    boxCode: 'S5 Мини-экзотика',
    rating: 5,
    text: 'Мини-экзотика — наше семейное развлечение по пятницам. Вкусы, которые раньше пробовали только в отпуске, теперь дома на тарелке. Драгонфрут, маракуйя, кумкват — дети учат названия, как игру.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
  },

  // B. For Office / Corporate (6 reviews)
  {
    id: 'office_1',
    name: 'Алексей Драйв',
    role: 'Руководитель отдела продаж',
    city: 'Москва',
    tag: '🔥 Офисный набор',
    segment: 'office',
    boxCode: 'M4 Офисный набор',
    rating: 5,
    text: 'Офисный набор реально спасает наш отдел в конце месяца. Вместо печенья и чипсов — тарелки с фруктами в переговорной. Команда бодрее, сахарных "просадок" меньше.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 'office_2',
    name: 'Екатерина HR-Забота',
    role: 'HR-директор',
    city: 'Санкт-Петербург',
    tag: '💼 Забота о команде',
    segment: 'office',
    boxCode: 'M4 Офисный набор',
    rating: 5,
    text: 'Добавили фруктовые боксы в пакет "забота о сотрудниках" — и это оказался один из самых заметных бонусов. Люди фотографируют столы с фруктами и выкладывают в сторис с отметкой компании.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
  },
  {
    id: 'office_3',
    name: 'Роман Организованный',
    role: 'Офис-менеджер',
    city: 'Москва',
    tag: '📦 Удобная логистика',
    segment: 'office',
    boxCode: 'M4 + L1',
    rating: 5,
    text: 'Удобно, что можно настроить регулярную доставку два раза в неделю. Машина приезжает вовремя, фрукты всегда свежие, ничего не мнутое. Для планёрки берём классику, для пятничных встреч — что-то с вау-эффектом.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
  },
  {
    id: 'office_4',
    name: 'Ирина Руководитель',
    role: 'Генеральный директор',
    city: 'Казань',
    tag: '⭐ Забота уровня "СЕО"',
    segment: 'office',
    boxCode: 'VIP набор в офис',
    rating: 5,
    text: 'Когда стали приходить партнёры, заменили стандартные конфеты на фруктовые тарелки из FreshBox. Встречи стали выглядеть дороже и здоровее, а фраза "у нас всё по-новому, даже угощения" хорошо запоминается.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
  },
  {
    id: 'office_5',
    name: 'Дмитрий Практичный',
    role: 'Руководитель IT-команды',
    city: 'Новосибирск',
    tag: '🌿 ЗОЖ в офисе',
    segment: 'office',
    boxCode: 'Detox офис',
    rating: 5,
    text: 'Наш офис — сплошные разработчики, которые живут на кофе. Решили тестово заказать detox-наборы, и теперь это ритуал понедельника: кофе + грейпфрут + киви. Смешно, но реально меньше жалоб на усталость.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop'
  },
  {
    id: 'office_6',
    name: 'Наталья Праздничная',
    role: 'Event-менеджер',
    city: 'Москва',
    tag: '🎉 Фрукты на мероприятия',
    segment: 'office',
    boxCode: 'L1 Королевский ананас',
    rating: 5,
    text: 'Заказывали боксы на корпоратив и были уверены, что останется половина. В итоге стол с фруктами опустел быстрее, чем стол с десертами. Выглядит очень фотогенично на мероприятиях.',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop'
  },

  // C. For Gift / Holidays (6 reviews)
  {
    id: 'gift_1',
    name: 'Ольга Внимательная',
    role: 'Дарю вместо цветов',
    city: 'Москва',
    tag: '🎁 Подарок вместо букета',
    segment: 'gift',
    boxCode: 'M5 Премиум с ягодами',
    rating: 5,
    text: 'Перестала дарить цветы — дарю фруктовые боксы. Это и красиво, и практично, и всегда в тему. «Премиум с ягодами» выглядит как дорогой букет, только его можно съесть.',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_2',
    name: 'Сергей Заботливый',
    role: 'Муж и отец',
    city: 'Тюмень',
    tag: '💝 Сюрприз жене',
    segment: 'gift',
    boxCode: 'L2 Супер Экзотик',
    rating: 5,
    text: 'Сделал жене сюрприз на годовщину — заказал «Супер Экзотик». Коробка приехала как на картинке, ананас, маракуйя, манго — всё как в путешествии. Жена сказала, что такой подарок приятнее, чем очередные духи.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_3',
    name: 'Анна Тёплая',
    role: 'Подруга невесты',
    city: 'Сочи',
    tag: '👰 Подарок на девичник',
    segment: 'gift',
    boxCode: 'Party mix',
    rating: 5,
    text: 'Заказывали фруктовый бокс на девичник вместо торта. Девочки сначала просто фотографировали, а потом не могли остановиться. Очень удобно, что всё уже нарезано и красиво разложено.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_4',
    name: 'Виктор Заботящийся',
    role: 'Дарю родителям',
    city: 'Нижний Новгород',
    tag: '👴 Подарок родителям',
    segment: 'gift',
    boxCode: 'Классический набор',
    rating: 5,
    text: 'Отправляю боксы родителям раз в две недели. Для них это и знак внимания, и реальная польза. Мама перестала таскать тяжёлые пакеты с рынка, а папа шутит, что у них дома "фруктовый all inclusive".',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_5',
    name: 'Лида Вкусная',
    role: 'Кондитер',
    city: 'Москва',
    tag: '🍰 Фрукты для украшения',
    segment: 'gift',
    boxCode: 'Ягодный акцент',
    rating: 5,
    text: 'Использую наборы FreshBox для украшения тортов и десертов. Ягоды и фрукты приезжают без мятин и пятен, цвета очень яркие. Для клиента важно, как десерт выглядит на фото — с этими фруктами кадры всегда удачные.',
    avatar: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_6',
    name: 'Юлия Вдохновлённая',
    role: 'Организатор праздников',
    city: 'Самара',
    tag: '🎊 Декор + угощение',
    segment: 'gift',
    boxCode: 'Праздничный премиум',
    rating: 5,
    text: 'Фруктовые боксы решают сразу две задачи: это и декор стола, и угощение. Никаких пластиковых подносов, всё в стильной коробке. Гости часто спрашивают, откуда такие фрукты — и это лучший комплимент.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'
  },

  // D. VIP / Exotic / Detox (6 reviews)
  {
    id: 'vip_1',
    name: 'Рустам Премиум',
    role: 'Предприниматель',
    city: 'Москва',
    tag: '⭐ VIP-уровень',
    segment: 'vip',
    boxCode: 'L2 Супер Экзотик',
    rating: 5,
    text: 'Искал подарок, который будет выглядеть премиально, но без банальностей вроде алкоголя. «Супер Экзотик» — идеальный вариант: ярко, дорого, полезно. Понравилось, что фрукты не просто накидали, а продумали композицию.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_2',
    name: 'Елена Detox',
    role: 'Фитнес-тренер',
    city: 'Санкт-Петербург',
    tag: '🌿 Detox-курс',
    segment: 'detox',
    boxCode: 'Detox неделя',
    rating: 5,
    text: 'Я составляю клиентам detox-программы и часто советую заказывать FreshBox. В наборе именно те фрукты, которые нужны: грейпфрут, ягоды, киви, лайм. Люди не тратят время на поиск — и им проще выдержать неделю.',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_3',
    name: 'Максим Вдохновитель',
    role: 'Блогер о ЗОЖ',
    city: 'Москва',
    tag: '📸 Контент и польза',
    segment: 'vip',
    boxCode: 'Mix из экзотики',
    rating: 5,
    text: 'Фрукты из FreshBox — это отдельный вид контента. Красиво, что не нужно ничего выдумывать: открыл коробку, расставил — и вот тебе идеальные кадры для сторис. Плюс подписчики видят, что я реально ем то, что советую.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_4',
    name: 'Алия Заботливая',
    role: 'Владелица салона красоты',
    city: 'Казань',
    tag: '💎 Для VIP-клиентов',
    segment: 'vip',
    boxCode: 'Premium lounge',
    rating: 5,
    text: 'Поставили фруктовые боксы в зоне ожидания для VIP-клиентов вместо конфет. Девушки фотографируют стол, отмечают салон, пишут "как в Европе". А для меня важно, что это реально полезный перекус.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_5',
    name: 'Тимур Спортивный',
    role: 'Триатлонист',
    city: 'Сочи',
    tag: '🏃 Поддержка формы',
    segment: 'detox',
    boxCode: 'Спорт & ЗОЖ',
    rating: 5,
    text: 'Подготовка к старту — это не только тренировки, но и питание. Боксы FreshBox помогают держать холодильник в форме: минимум соблазнов, максимум правильных продуктов. Никаких сухих батончиков, только живые фрукты.',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_6',
    name: 'Вера Осознанная',
    role: 'Практикующий нутрициолог',
    city: 'Москва',
    tag: '🥗 Клиентские программы',
    segment: 'detox',
    boxCode: 'Detox + ягоды',
    rating: 5,
    text: 'Рекомендую FreshBox клиентам, которые не успевают ходить по рынкам. Важно, что в наборы не кладут случайные дешёвые позиции ради веса. Фрукты соответствуют тому, что я прописываю в рационе.',
    avatar: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=200&h=200&fit=crop'
  },

  // E. Additional Family Reviews (4 reviews)
  {
    id: 'family_7',
    name: 'Татьяна Семейная',
    role: 'Мама школьника',
    city: 'Москва',
    tag: '🍏 Полезно детям',
    segment: 'family',
    boxCode: 'S3 Домашний уют',
    rating: 5,
    text: 'Раньше сын брал в школу батончики и печенье, теперь собираем ему ланчбокс из "Домашнего уюта". Пару яблок, мандарин, немного винограда — и я спокойна, что перекус у ребёнка нормальный, без сахара и красителей.',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop'
  },
  {
    id: 'family_8',
    name: 'Константин Заботливый',
    role: 'Молодой папа',
    city: 'Санкт-Петербург',
    tag: '🍓 Вместо сладостей',
    segment: 'family',
    boxCode: 'S4 Ягодный акцент',
    rating: 5,
    text: 'Раз в неделю объявляем дома "вечер фруктов" и заказываем "Ягодный акцент". Дети ждут этот день больше, чем пиццу. Понравилось, что ягоды спелые, но не перезревшие — можно спокойно давать ребёнку.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 'family_9',
    name: 'Вера Домашний уют',
    role: 'Бабушка',
    city: 'Ростов-на-Дону',
    tag: '👵 Забота о внучке',
    segment: 'family',
    boxCode: 'M1 Семейный классический',
    rating: 5,
    text: 'Внучка приезжает на выходные, и я всегда заранее заказываю семейный бокс. Не нужно думать, что купить — в коробке всё уже подобрано. Фрукты настолько красивые, что она сама просит сделать "фруктовую тарелку".',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop'
  },
  {
    id: 'family_10',
    name: 'Никита Домашний бар',
    role: 'Работает из дома',
    city: 'Москва',
    tag: '🍎 Фрукты вместо снеков',
    segment: 'family',
    boxCode: 'Detox набор',
    rating: 5,
    text: 'Я фрилансер, много времени провожу за ноутбуком и раньше пачки печенья уходили незаметно. Поставил рядом с рабочим местом бокс Detox — теперь рука автоматически тянется не к пачке, а за яблоком или киви.',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop'
  },

  // F. Additional Office Reviews (3 reviews)
  {
    id: 'office_7',
    name: 'Лена Команда',
    role: 'Тимлид маленького отдела',
    city: 'Казань',
    tag: '👥 Маленький офис',
    segment: 'office',
    boxCode: 'S5 Мини-экзотика',
    rating: 5,
    text: 'У нас небольшой отдел из пяти человек, берём мини-экзотику по пятницам. Это наш маленький ритуал: подводим итоги недели и делим между собой манго, маракуйю и кумкват. Мелочь, а атмосферу в команде сильно меняет.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
  },
  {
    id: 'office_8',
    name: 'Михаил Кофепауза',
    role: 'Project-менеджер',
    city: 'Самара',
    tag: '☕ Вместо печенек',
    segment: 'office',
    boxCode: 'M2 Манго & тропики',
    rating: 5,
    text: 'Раньше на кухне всегда лежали печеньки, теперь рядом с кофеаппаратом стоит бокс с тропическими фруктами. Команда сама отмечает, что после фруктов не клонит в сон, как после сладкой выпечки.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop'
  },
  {
    id: 'office_9',
    name: 'София Вовлечённая',
    role: 'People-partner',
    city: 'Москва',
    tag: '💼 Корпоративная культура',
    segment: 'office',
    boxCode: 'M4 Офисный набор',
    rating: 5,
    text: 'Мы используем FreshBox как часть программы "забота о сотрудниках". Фрукты появляются в офисе в самые напряжённые периоды — закрытие квартала, большие релизы. Люди ощущают поддержку даже через такую мелочь.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
  },

  // G. Additional Gift Reviews (3 reviews)
  {
    id: 'gift_7',
    name: 'Дарья Трепетная',
    role: 'Будущая крестная',
    city: 'Москва',
    tag: '🤰 Подарок беременной подруге',
    segment: 'gift',
    boxCode: 'Нежный mix',
    rating: 5,
    text: 'Дарила бокс подруге, которая ждёт малыша. Хотелось чего-то полезного и при этом красивого. Фрукты спелые, сладкие, без резких запахов — как раз то, что нужно беременной. Она сказала, что это лучший подарок за всю беременность.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_8',
    name: 'Артур Стильный',
    role: 'Маркетолог',
    city: 'Санкт-Петербург',
    tag: '🎯 Подарок клиентам',
    segment: 'gift',
    boxCode: 'Корпоративный сет',
    rating: 5,
    text: 'Отправляли боксы ключевым клиентам вместо стандартных наборов с алкоголем. Получили кучу благодарностей и фотографий в соцсетях. Это другой уровень заботы, сразу видно, что мы думаем о здоровье людей.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
  },
  {
    id: 'gift_9',
    name: 'Инна Домашний праздник',
    role: 'Организатор семейных ужинов',
    city: 'Воронеж',
    tag: '🎂 На домашний праздник',
    segment: 'gift',
    boxCode: 'Праздничный премиум',
    rating: 5,
    text: 'На дни рождения больше не мучаюсь с десертами: ставлю на стол фруктовый бокс, и всё. Дети едят клубнику и виноград, взрослые — ананас и манго. Выглядит празднично, а чувство тяжести после застолья намного меньше.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'
  },

  // H. Additional VIP / Detox Reviews (3 reviews)
  {
    id: 'vip_7',
    name: 'Лилия Evening',
    role: 'Нутрициолог',
    city: 'Москва',
    tag: '🥗 Фрукты к набору питания',
    segment: 'detox',
    boxCode: 'Detox + цитрус',
    rating: 5,
    text: 'Включаю FreshBox в свои программы детокса как "готовое решение": клиенту не нужно бегать по магазинам и искать правильные продукты. Один заказ — и вся неделя по фруктам закрыта.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_8',
    name: 'Станислав Business',
    role: 'Владелец бизнеса',
    city: 'Сочи',
    tag: '⭐ VIP-угощение',
    segment: 'vip',
    boxCode: 'VIP-набор',
    rating: 5,
    text: 'Угощаю гостей в переговорной не конфетами, а фруктами из VIP-набора. Это совсем другой уровень впечатления о компании: и статусно, и по-европейски, и без дешёвой мишуры.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop'
  },
  {
    id: 'vip_9',
    name: 'Ирина Nightshift',
    role: 'Врач стационара',
    city: 'Москва',
    tag: '🏥 Поддержка на сменах',
    segment: 'detox',
    boxCode: 'Смени-перекус',
    rating: 5,
    text: 'Покупаем боксы в отделение на ночные смены. Врачи и медсёстры теперь перекусывают не бутербродами в два часа ночи, а мандаринами и яблоками. Все говорят, что так переносить дежурства стало легче.',
    avatar: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=200&h=200&fit=crop'
  },
];

// Helper function to get circular slice of array
const getCircularSlice = <T,>(arr: T[], start: number, count: number): T[] => {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[(start + i) % arr.length]);
  }
  return result;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  role,
  city,
  text,
  avatar,
  tag,
  segment,
  index,
  onImageLoad,
  isImageLoaded,
}) => {
  const segmentMeta = segmentConfig[segment];

  return (
    <div
      className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-[32px] p-6 md:p-7 flex flex-col justify-between h-full shadow-[0_18px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:bg-white transition-all duration-500 min-w-[280px] max-w-[380px] lg:max-w-none lg:min-w-0 snap-center"
    >
      {/* Decorative Quote Mark - Top Right */}
      <div className="absolute top-6 right-6 text-[48px] md:text-[56px] leading-none text-brand-accent-light/30 pointer-events-none select-none font-serif">
        "
      </div>

      {/* Top Section - Rating + Tag */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        {/* 5 Stars Rating + Verified Badge */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-brand-yellow">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} strokeWidth={2.5} fill="currentColor" stroke="none" />
            ))}
          </div>
          {/* Verified Icon */}
          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full badge-brand-dark">
            <CheckCircle2 size={12} strokeWidth={2.5} className="text-white" fill="currentColor" />
          </div>
        </div>

        {/* Tag Badge */}
        {tag && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-accent/20 to-brand-yellow/20 border border-brand-accent/30 px-3 py-1 text-xs font-bold text-brand-text backdrop-blur-sm">
            {tag}
          </div>
        )}
      </div>

      {/* Review Text */}
      <p className="text-[15px] md:text-[16px] leading-relaxed text-brand-text mt-4 mb-6 flex-1 max-w-[320px]">
        {text}
      </p>

      {/* Bottom Section - Author Info */}
      <div className="mt-auto pt-4 border-t border-brand-accent-light/20">
        {/* Segment Badge */}
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-3 ${segmentMeta.className}`}>
          {segmentMeta.label}
        </span>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-white shadow-sm flex-shrink-0">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent-light/40 to-brand-yellow/30 animate-pulse" />
            )}
            <img
              src={avatar}
              alt={`${name}, ${role}`}
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
              onLoad={() => onImageLoad(index)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Name + Role + City */}
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-[17px] font-semibold text-brand-text leading-tight">
              {name}
            </h4>
            <p className="text-sm text-brand-text-soft mt-0.5 leading-snug">
              {role}
              {city && <span className="text-brand-text-soft/60"> • {city}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useReveal({ threshold: 0.1 });
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  // Filter state
  const [activeFilter, setActiveFilter] = useState<ReviewFilterId>('all');

  // Filtered reviews based on active filter
  const visibleReviews = useMemo(
    () =>
      activeFilter === 'all'
        ? REVIEWS_DATA
        : REVIEWS_DATA.filter((review) => review.segment === activeFilter),
    [activeFilter]
  );

  // Auto-rotation state
  const VISIBLE_COUNT = 3;
  const ROTATION_INTERVAL = 8000; // 8 seconds
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentVisibleReviews = getCircularSlice(visibleReviews, startIndex, VISIBLE_COUNT);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Reset startIndex when filter changes
  useEffect(() => {
    setStartIndex(0);
    setIsTransitioning(false);
  }, [activeFilter]);

  // Auto-rotation effect (only on desktop, only if enough reviews)
  useEffect(() => {
    if (visibleReviews.length <= VISIBLE_COUNT) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      // Fade out
      setTimeout(() => {
        setStartIndex((prev) => (prev + VISIBLE_COUNT) % visibleReviews.length);
        
        // Fade in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [visibleReviews.length]);

  return (
    <SectionLight
      id="reviews"
      ref={sectionRef}
      className={`reveal ${sectionVisible ? 'reveal-visible' : ''} overflow-visible bg-gradient-to-b from-[#FFF7E6] to-[#E6FBD9]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          {/* Top Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full badge-brand font-bold text-xs uppercase tracking-widest mb-6 shadow-sm">
            Отзывы
          </div>

          {/* Main Title - Unified Typography with Catalog */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-text leading-tight mb-6">
            Говорят{' '}
            <span className="text-gradient-brand-heading">
              клиенты
            </span>
          </h2>

          {/* Subtitle - Unified Typography */}
          <p className="text-lg md:text-xl lg:text-2xl text-brand-text-soft max-w-3xl mx-auto leading-relaxed font-semibold mb-8">
            Реальные отзывы от тех, кто уже получил свои премиальные фруктовые боксы
          </p>

          {/* Overall Rating - Accent Subtitle Style */}
          <div className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-brand-text-soft">
            <div className="flex gap-0.5 text-brand-yellow">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} strokeWidth={2.5} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="font-bold text-brand-text">4,9 из 5</span>
            <span className="text-brand-text-soft/60">•</span>
            <span>по 120+ отзывам клиентов</span>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="mb-10 flex justify-center">
          <div className="flex w-full max-w-4xl gap-3 overflow-x-auto px-4 pb-2 pt-1 md:justify-center md:px-0 scrollbar-hide">
            {REVIEW_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/70 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white border-brand-accent shadow-lg shadow-brand-accent/30 scale-105'
                      : 'bg-white/80 text-brand-text-soft border-emerald-50 hover:bg-emerald-50 hover:border-brand-accent/20 hover:text-brand-text hover:scale-102'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews Content */}
        {visibleReviews.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-lg text-brand-text-soft">
              Отзывов для этой категории пока нет
            </p>
          </div>
        ) : (
          <>
            {/* Desktop: Auto-rotating Grid (3 columns) */}
            <div className="hidden lg:block relative overflow-hidden">
              <div
                className={`grid grid-cols-3 gap-6 md:gap-8 transition-opacity duration-500 ease-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {currentVisibleReviews.map((review, index) => (
                  <ReviewCard
                    key={`${review.id}-${startIndex}-${index}`}
                    name={review.name}
                    role={review.role}
                    city={review.city}
                    text={review.text}
                    avatar={review.avatar}
                    tag={review.tag}
                    segment={review.segment}
                    index={startIndex + index}
                    onImageLoad={handleImageLoad}
                    isImageLoaded={loadedImages[startIndex + index] || false}
                  />
                ))}
              </div>

              {/* Rotation Indicator (only if more than VISIBLE_COUNT) */}
              {visibleReviews.length > VISIBLE_COUNT && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(visibleReviews.length / VISIBLE_COUNT) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setStartIndex((idx * VISIBLE_COUNT) % visibleReviews.length);
                          setIsTransitioning(false);
                        }, 300);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        Math.floor(startIndex / VISIBLE_COUNT) === idx
                          ? 'w-8 bg-brand-accent'
                          : 'w-2 bg-brand-accent/30 hover:bg-brand-accent/50'
                      }`}
                      aria-label={`Перейти к отзывам ${idx * VISIBLE_COUNT + 1}-${Math.min((idx + 1) * VISIBLE_COUNT, visibleReviews.length)}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Tablet: 2 columns grid (static, first 6) */}
            <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6 md:gap-8">
              {visibleReviews.slice(0, 6).map((review, index) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  role={review.role}
                  city={review.city}
                  text={review.text}
                  avatar={review.avatar}
                  tag={review.tag}
                  segment={review.segment}
                  index={index}
                  onImageLoad={handleImageLoad}
                  isImageLoaded={loadedImages[index] || false}
                />
              ))}
            </div>

            {/* Mobile: Horizontal Scroll with Snap (first 8) */}
            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
              {visibleReviews.slice(0, 8).map((review, index) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  role={review.role}
                  city={review.city}
                  text={review.text}
                  avatar={review.avatar}
                  tag={review.tag}
                  segment={review.segment}
                  index={index}
                  onImageLoad={handleImageLoad}
                  isImageLoaded={loadedImages[index] || false}
                />
              ))}
            </div>

            {/* Scroll Hint for Mobile */}
            <div className="md:hidden text-center mt-6">
              <p className="text-xs text-brand-text-soft flex items-center justify-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                Свайпай влево, чтобы увидеть все отзывы
                <span className="inline-block w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
              </p>
            </div>
          </>
        )}
      </div>
    </SectionLight>
  );
};

export default Reviews;
