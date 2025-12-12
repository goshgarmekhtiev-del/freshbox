import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { sendEvent } from '@/utils/metrics';

const COOKIE_CONSENT_KEY = 'FRESHBOX_COOKIE_CONSENT';

interface CookieBannerProps {
  policyUrl?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ policyUrl }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли согласие в localStorage
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent || consent !== 'accepted') {
        setIsVisible(true);
      }
      setIsMounted(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      setIsVisible(false);
      
      // Отправляем событие в Яндекс Метрику
      sendEvent('Cookie_Banner_Accepted');
    }
  };

  // Не рендерим до монтирования (SSR-safe)
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] px-4 py-4 md:px-6 md:py-5 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border-2 border-brand-accent/10 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          {/* Иконка cookie (опционально, для визуального акцента) */}
          <div className="hidden md:flex shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 flex items-center justify-center">
              <Cookie size={24} strokeWidth={2.5} className="text-brand-accent" />
            </div>
          </div>

          {/* Текстовая часть */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-brand-text mb-1 md:mb-2">
              Мы используем cookies
            </h3>
            <p className="text-sm md:text-base text-brand-text-soft leading-relaxed mb-2 md:mb-0">
              Мы используем файлы cookies и сервисы аналитики (в том числе Яндекс.Метрику), чтобы улучшать сайт и показывать более релевантную рекламу. Продолжая пользоваться сайтом, вы соглашаетесь с обработкой данных.
              {policyUrl && (
                <>
                  {' '}
                  <a
                    href={policyUrl}
                    className="text-brand-accent hover:text-brand-accent-dark underline underline-offset-2 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Подробнее
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Кнопка принятия */}
          <div className="w-full md:w-auto flex-shrink-0">
            <button
              onClick={handleAccept}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-bold text-sm md:text-base rounded-xl md:rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Понятно</span>
              <X size={18} strokeWidth={2.5} className="md:hidden" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

