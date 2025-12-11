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
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(METRIC_ID, "reachGoal", eventName, params || {});
  } else {
    console.warn("Yandex Metrika is not initialized yet:", eventName);
  }
};

