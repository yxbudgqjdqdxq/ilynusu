import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startScrollY = useRef(0);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for smooth stop
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // slightly more resistance/inertia on touch
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Desktop Drag to scroll
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only allow drag to scroll on main button
    if (e.button !== 0) return;
    
    // Ignore if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, [role="button"], video')) return;

    setIsDragging(true);
    startY.current = e.clientY;
    startScrollY.current = window.scrollY;

    // Trigger subtle haptic if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const deltaY = e.clientY - startY.current;
      // Scroll reverse direction of mouse movement
      window.scrollTo({
        top: startScrollY.current - deltaY * 1.5, // 1.5 multiplier for better feel
        behavior: 'auto'
      });
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        
        // Final subtle haptic
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove, { passive: false });
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      onPointerDown={handlePointerDown}
      className="w-full h-full"
    >
      {children}
    </div>
  );
};
