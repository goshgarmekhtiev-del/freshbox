import type React from 'react';

export const fireConfetti = (e?: React.MouseEvent | React.TouchEvent | null) => {
  // If no event is provided, just return
  if (!e) return;

  // Get coordinates of the cart button
  const cartBtn = document.getElementById('cart-trigger');
  if (!cartBtn) return;

  const cartRect = cartBtn.getBoundingClientRect();
  const destinationX = cartRect.left + cartRect.width / 2;
  const destinationY = cartRect.top + cartRect.height / 2;

  // Get coordinates of the click
  let startX = 0;
  let startY = 0;

  if ('touches' in e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  } else {
    startX = (e as React.MouseEvent).clientX;
    startY = (e as React.MouseEvent).clientY;
  }

  // Fruits emojis to fly
  const fruits = ['🍊', '🥝', '🍍', '🍏', '🍓', '🍋', '🍇'];

  // Create particles
  const particleCount = 6;

  for (let i = 0; i < particleCount; i++) {
    const fruit = document.createElement('div');
    fruit.innerHTML = fruits[Math.floor(Math.random() * fruits.length)];
    fruit.style.position = 'fixed';
    fruit.style.left = `${startX}px`;
    fruit.style.top = `${startY}px`;
    fruit.style.fontSize = '32px'; // Increased size for visibility
    fruit.style.pointerEvents = 'none';
    fruit.style.zIndex = '9999';
    // Much slower transition (1.5s to 2s) with ease-in-out for natural movement
    const duration = 1.5 + Math.random() * 0.5;
    fruit.style.transition = `all ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`;
    fruit.style.transform = `translate(-50%, -50%) scale(0) rotate(0deg)`;
    
    document.body.appendChild(fruit);

    // Phase 1: Pop out (Explosion)
    requestAnimationFrame(() => {
      // Random spread around the click
      const spreadX = (Math.random() - 0.5) * 80;
      const spreadY = (Math.random() - 0.5) * 80 - 50; // Tend to pop upwards slightly

      fruit.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${Math.random() * 360}deg)`;
      fruit.style.left = `${startX + spreadX}px`;
      fruit.style.top = `${startY + spreadY}px`;

      // Phase 2: Fly to cart (Delayed slightly so user sees the fruit)
      setTimeout(() => {
        fruit.style.left = `${destinationX}px`;
        fruit.style.top = `${destinationY}px`;
        fruit.style.opacity = '0';
        fruit.style.transform = `translate(-50%, -50%) scale(0.5) rotate(${720 + Math.random() * 360}deg)`; // Spin wildy while flying
      }, 300); // Wait 300ms before flying to cart
    });

    // Cleanup after animation finishes
    setTimeout(() => {
      if (document.body.contains(fruit)) {
        document.body.removeChild(fruit);
      }
    }, 2500);
  }
};