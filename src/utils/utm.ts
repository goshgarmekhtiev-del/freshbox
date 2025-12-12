/**
 * Утилита для работы с UTM-метками и реферальным источником
 * Сохраняет данные при первом заходе пользователя и позволяет получить их при оформлении заказа
 */

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  first_visit_time?: string; // ISO-строка
};

const UTM_STORAGE_KEY = "freshbox_utm";

/**
 * Парсит UTM-параметры из URL
 * @returns Объект с UTM-данными из текущего URL
 */
export const getCurrentUtmFromUrl = (): UtmData => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utm: UtmData = {};

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const utmTerm = params.get("utm_term");

  if (utmSource) utm.utm_source = utmSource;
  if (utmMedium) utm.utm_medium = utmMedium;
  if (utmCampaign) utm.utm_campaign = utmCampaign;
  if (utmContent) utm.utm_content = utmContent;
  if (utmTerm) utm.utm_term = utmTerm;

  return utm;
};

/**
 * Загружает сохранённые UTM-данные из localStorage
 * @returns Объект с UTM-данными или null, если данных нет
 */
export const loadStoredUtm = (): UtmData | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);
    // Проверяем, что это объект
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as UtmData;
    }

    return null;
  } catch (error) {
    console.error("[UTM] Failed to parse stored UTM data:", error);
    return null;
  }
};

/**
 * Сохраняет UTM-данные в localStorage только один раз (при первом заходе)
 * Если данные уже есть, не перезаписывает их
 * @param utm - UTM-данные для сохранения
 */
export const saveUtmOnce = (utm: UtmData): void => {
  if (typeof window === "undefined") {
    return;
  }

  // Проверяем, есть ли уже сохранённые данные
  const existing = loadStoredUtm();
  if (existing) {
    // Данные уже есть, не перезаписываем
    return;
  }

  // Добавляем referrer и first_visit_time только при первом сохранении
  const dataToSave: UtmData = {
    ...utm,
    referrer: document.referrer || undefined,
    first_visit_time: new Date().toISOString(),
  };

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(dataToSave));
    console.log("[UTM] Saved UTM data:", dataToSave);
  } catch (error) {
    console.error("[UTM] Failed to save UTM data:", error);
  }
};

/**
 * Получает эффективные UTM-данные:
 * 1) Сначала пытается взять из localStorage (сохранённые при первом заходе)
 * 2) Если пусто — пытается вытащить из URL и сразу сохранить
 * 3) Возвращает итоговые данные (может быть пустой объект)
 * @returns Объект с UTM-данными
 */
export const getEffectiveUtm = (): UtmData => {
  if (typeof window === "undefined") {
    return {};
  }

  // 1) Пробуем взять из localStorage
  const stored = loadStoredUtm();
  if (stored) {
    return stored;
  }

  // 2) Если пусто — пробуем вытащить из URL и сразу сохранить
  const utmFromUrl = getCurrentUtmFromUrl();
  if (Object.keys(utmFromUrl).length > 0) {
    saveUtmOnce(utmFromUrl);
    return {
      ...utmFromUrl,
      referrer: document.referrer || undefined,
      first_visit_time: new Date().toISOString(),
    };
  }

  // 3) Если и в URL ничего нет, всё равно сохраняем referrer и first_visit_time
  saveUtmOnce({});
  return {
    referrer: document.referrer || undefined,
    first_visit_time: new Date().toISOString(),
  };
};

