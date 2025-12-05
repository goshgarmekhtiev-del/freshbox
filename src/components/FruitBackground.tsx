
import React, { useEffect, useState, useRef } from 'react';

const FRUITS = ['🍊', '🥝', '🍍', '🍏', '🍓', '🍋', '🍇', '🍉', '🍐', '🍒', '🍑', '🥭', '🫐', '🥥', '🍎'];

interface Particle {
  id: number;
  emoji: string;
  startX: number; // %
  startY: number; // %
  rotate: number;
  scale: number;
  speed: number;
}

const FruitBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      emoji: FRUITS[Math.floor(Math.random() * FRUITS.length)],
      startX: Math.random() * 100,
      startY: Math.random() * 100, // Spread across full height initially
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      speed: 0.5 + Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Calculate progress (0 at top, 1 at bottom)
      const progress = Math.min(Math.max(scrollY / (docHeight * 0.8), 0), 1);
      
      containerRef.current.style.setProperty('--scroll-progress', progress.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ '--scroll-progress': '0' } as React.CSSProperties}
    >
      {/* The Box at the bottom */}
      <div 
        className="absolute left-1/2 bottom-10 transform -translate-x-1/2 transition-transform duration-300"
        style={{ 
          transform: `translate(-50%, calc(100px * (1 - var(--scroll-progress)))) scale(calc(0.5 + 0.5 * var(--scroll-progress)))`,
          opacity: 'calc(0.2 + 0.8 * var(--scroll-progress))'
        }}
      >
        <span className="text-6xl filter drop-shadow-xl">📦</span>
      </div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transition-transform will-change-transform"
          style={{
            left: '0',
            top: '0',
            // Logic: 
            // Start Position (Levitating): p.startX/Y
            // End Position (In Box): 50% left, 90% top (approx box location)
            // We interpolate based on --scroll-progress css variable
            transform: `
              translate3d(
                calc(${p.startX}vw + (50vw - ${p.startX}vw) * var(--scroll-progress)), 
                calc(${p.startY}vh + (92vh - ${p.startY}vh) * var(--scroll-progress)), 
                0
              )
              rotate(calc(${p.rotate}deg + 360deg * var(--scroll-progress)))
              scale(calc(${p.scale} - (${p.scale} * 0.5 * var(--scroll-progress))))
            `,
            transition: 'transform 0.1s linear', // Smooth out scroll updates slightly
          }}
        >
          {/* Levitation Animation Wrapper - only active when progress is low */}
          <div 
            className="animate-float" 
            style={{ 
              animationDuration: `${3 / p.speed}s`,
              animationDelay: `${p.id * 0.2}s`,
              opacity: 0.7 
            }}
          >
            <span className="text-2xl sm:text-4xl filter drop-shadow-md">{p.emoji}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FruitBackground;
