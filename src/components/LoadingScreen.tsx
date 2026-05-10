import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Slower, dramatic loading curve
    const duration = 3500; 
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // cubic ease out for a luxurious feel
      const t = step / steps;
      const easeOut = 1 - Math.pow(1 - t, 4);
      setProgress(easeOut * 100);
      
      if (step >= steps) {
        clearInterval(timer);
        setIsReady(true);
        setTimeout(onComplete, 1500); // Linger on the 'ready' state
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Letters for beautiful staggered reveal
  const text = "MAHADIYAT";
  const letters = Array.from(text);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
      >
        {/* Deep, sensual background glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[var(--base-accent)] filter blur-[100px] md:blur-[140px] pointer-events-none mix-blend-screen"
        />

        <div className="relative z-10 flex text-center overflow-visible">
          {letters.map((letter, index) => {
            // Calculate how much this specific letter should be filled
            // based on the overall progress (0 to 100)
            const letterThreshold = (index / letters.length) * 100;
            const nextThreshold = ((index + 1) / letters.length) * 100;
            const isFilled = progress >= nextThreshold;
            const currentFill = Math.max(0, Math.min(100, ((progress - letterThreshold) / (nextThreshold - letterThreshold)) * 100));
            
            return (
              <div key={index} className="relative inline-block mx-1 md:mx-2">
                {/* Background (unfilled) letter */}
                <span className="text-white/10 font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em]">
                  {letter}
                </span>

                {/* Foreground (filled) letter with clip-path */}
                <span 
                  className="absolute left-0 top-0 text-[#EBEBEB] font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                  style={{
                    clipPath: `inset(${100 - currentFill}% 0 0 0)` // Fills from bottom to top
                  }}
                >
                  {letter}
                </span>

                {/* Animated particles floating around the letter when it's actively filling or filled */}
                {currentFill > 0 && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.5, 0.5],
                        y: [-10, -40, -60],
                        x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60]
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-0 left-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full blur-[1px] z-20"
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0.8, 2, 0.8],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random(),
                        ease: "easeInOut"
                      }}
                      className="absolute top-1/4 -right-4 w-4 h-4 border border-[var(--base-accent)] rounded-full opacity-0 pointer-events-none"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isReady ? 1 : 0.4, y: 0 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-16 text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-white/50"
        >
          {isReady ? "okay. hi." : "finding the right words."}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
