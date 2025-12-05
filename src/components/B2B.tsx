
import React, { useState } from 'react';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import B2BForm from './B2BForm';

const B2B: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="b2b" className="py-24 bg-white reveal">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r from-brand-text to-green-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="grid lg:grid-cols-2">
            
            {/* Content Side */}
            <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 text-brand-accent-light mb-6 font-bold uppercase tracking-widest text-xs">
                <Building2 size={16} />
                <span>Офисам и Корпорациям</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Энергия <span className="text-brand-accent">витаминов</span> <br/>
                для вашей команды
              </h2>
              
              <p className="text-white/80 text-lg mb-10 font-medium leading-relaxed max-w-md">
                Замените скучное печенье на сочные фрукты! Это повышает продуктивность, настроение и лояльность сотрудников.
              </p>
              
              <ul className="space-y-4 mb-12">
                {['Скидки до 20% на регулярные поставки', 'Брендирование боксов вашим логотипом', 'Оплата по счету, полный пакет документов'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium">
                    <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white shadow-lg">
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-brand-accent text-white hover:bg-white hover:text-brand-text font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 hover:brightness-110"
              >
                Получить КП <ArrowRight size={22} strokeWidth={3} />
              </button>
            </div>
            
            {/* Image Side */}
            <div className="relative min-h-[400px] lg:min-h-full">
              <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern Office" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 to-transparent lg:bg-gradient-to-r lg:from-brand-text lg:via-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <B2BForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default B2B;
