
import React from 'react';
import { REVIEWS } from '../constants';
import { Quote, Star } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-brand-bg to-white reveal">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-accent font-black tracking-[0.2em] uppercase text-xs">Happy People</span>
          <h2 className="text-4xl font-extrabold text-brand-text mt-3">Говорят клиенты</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] flex flex-col group border border-white shadow-xl hover:shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex gap-1 text-brand-yellow">
                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
                 </div>
                 <Quote size={40} className="text-brand-text/10 group-hover:text-brand-accent/20 transition-colors fill-current" />
              </div>
              
              <p className="text-brand-text text-lg mb-8 flex-1 font-bold leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-brand-text/5">
                <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h4 className="font-extrabold text-brand-text text-base tracking-wide">{review.name}</h4>
                  <p className="text-xs text-brand-text-soft font-bold uppercase tracking-wider mt-0.5 bg-brand-bg px-2 py-1 rounded-md inline-block">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
