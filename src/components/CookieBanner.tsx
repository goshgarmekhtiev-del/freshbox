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
    <div className="fixed bottom-0 left-0 right-0 z-[55] px-4 py-3 animate-fade-in-up">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border-2 border-brand-accent/10 px-4 py-3 md:px-4 md:py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Иконка cookie (компактная, только на десктопе) */}
          <div className="hidden sm:flex shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-yellow/10 flex items-center justify-center">
              <Cookie size={18} strokeWidth={2.5} className="text-brand-accent" />
            </div>
          </div>

          {/* Текстовая часть */}
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-brand-text-soft leading-snug">
              Мы используем cookies, чтобы сайт работал лучше. Продолжая пользоваться сайтом, вы соглашаетесь с этим.
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
          <div className="w-full sm:w-auto flex-shrink-0">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-brand-accent via-brand-accent-dark to-brand-yellow text-white font-bold text-sm rounded-lg sm:rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Понятно</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

