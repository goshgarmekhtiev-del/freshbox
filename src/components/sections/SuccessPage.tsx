import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-brand-bg/60 to-lime-50/40 px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mt-6">
          <CheckCircle2 
            size={64} 
            strokeWidth={2.5} 
            className="text-brand-accent" 
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-brand-text text-center mt-6">
          Оплата прошла успешно!
        </h1>

        {/* Subheading */}
        <p className="text-brand-text-soft text-center mt-2 text-lg">
          Мы начинаем собирать ваш фруктовый бокс 🍊❤️
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-brand-accent text-white rounded-xl py-3 px-6 mt-8 font-semibold hover:bg-brand-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

