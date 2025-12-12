// Yandex Metrika ID
const METRIC_ID = 105798174;

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

/**
 * Sends a custom event to Yandex Metrika
 * @param eventName - Name of the event (e.g., "Hero_CTA_Click")
 * @param params - Optional parameters object (e.g., { id: "123", name: "Product" })
 */
export const sendEvent = (eventName: string, params?: Record<string, any>) => {
  // Всегда логируем вызов события для отладки (даже если ym недоступна)
  console.log("[METRIKA] sendEvent:", eventName, params || {});
  
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    try {
      window.ym(METRIC_ID, "reachGoal", eventName, params || {});
      console.log("[METRIKA] Event sent successfully:", eventName);
    } catch (error) {
      console.error("[METRIKA] Error sending event:", eventName, error);
    }
  } else {
    console.warn("[METRIKA] ym is not initialized", eventName);
  }
};

