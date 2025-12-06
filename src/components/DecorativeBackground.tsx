import React from 'react';

/**
 * Premium Decorative Background Component
 * 
 * Features:
 * - NO scroll-based animations (performance-friendly)
 * - 8 minimal abstract shapes (reduced from 25 emoji particles)
 * - Subtle CSS keyframe animations (gentle floating, no aggressive movement)
 * - Brand-colored gradient circles (premium, not cartoonish)
 * - pointer-events-none (doesn't interfere with user interactions)
 * - Mobile-optimized (reduced opacity and fewer elements on small screens)
 */

interface FloatingShape {
  id: number;
  size: number; // px
  top: string; // %
  left: string; // %
  color: string; // gradient colors
  duration: number; // animation duration in seconds
  delay: number; // animation delay in seconds
}

const DecorativeBackground: React.FC = () => {
  // Premium abstract shapes with brand colors - reduced from 25 to 8
  const shapes: FloatingShape[] = [
    { id: 1, size: 300, top: '10%', left: '5%', color: 'from-brand-accent/8 to-brand-yellow/5', duration: 20, delay: 0 },
    { id: 2, size: 250, top: '25%', left: '80%', color: 'from-brand-green/6 to-brand-accent/4', duration: 25, delay: 2 },
    { id: 3, size: 200, top: '50%', left: '15%', color: 'from-brand-yellow/7 to-brand-accent-light/5', duration: 22, delay: 4 },
    { id: 4, size: 280, top: '60%', left: '70%', color: 'from-brand-accent-light/8 to-brand-green/4', duration: 24, delay: 1 },
    { id: 5, size: 220, top: '75%', left: '40%', color: 'from-brand-accent/6 to-brand-yellow/6', duration: 23, delay: 3 },
    { id: 6, size: 180, top: '85%', left: '10%', color: 'from-brand-green/5 to-brand-accent-light/7', duration: 21, delay: 5 },
    { id: 7, size: 260, top: '35%', left: '50%', color: 'from-brand-yellow/5 to-brand-accent/8', duration: 26, delay: 2.5 },
    { id: 8, size: 190, top: '15%', left: '65%', color: 'from-brand-accent-light/6 to-brand-green/5', duration: 19, delay: 4.5 },
  ];

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Desktop: All 8 shapes, Mobile: Reduced opacity */}
      <div className="opacity-60 md:opacity-100">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-[120px] will-change-transform`}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              top: shape.top,
              left: shape.left,
              animation: `gentle-float ${shape.duration}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Keyframes for gentle floating animation */}
      <style>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -8px) scale(1.02);
          }
          50% {
            transform: translate(-8px, 5px) scale(0.98);
          }
          75% {
            transform: translate(5px, -10px) scale(1.01);
          }
        }
      `}</style>
    </div>
  );
};

export default DecorativeBackground;
