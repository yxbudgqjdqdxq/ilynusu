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

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 40, filter: "blur(15px)", scale: 0.8 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  };

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

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex text-center overflow-visible"
        >
          {letters.map((letter, index) => (
            <motion.span
              variants={child}
              transition={{ duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
              key={index}
              className={cn(
                "relative inline-block text-[#EBEBEB] font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em]",
                letter === " " && "w-3 md:w-6"
              )}
            >
              {letter}
              {/* Sparkle subtle animation around each letter */}
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                  rotate: [0, 90, 180]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: index * 0.2 + Math.random(),
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-1 h-1 bg-white rounded-full blur-[1px] opacity-0"
              />
              <motion.span
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                  y: [0, -15, -30]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: index * 0.3 + Math.random(),
                  ease: "easeInOut"
                }}
                className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-[var(--base-accent)] rounded-full blur-[0.5px] opacity-0"
              />
            </motion.span>
          ))}
        </motion.div>

        <div className="relative z-10 mt-16 w-64 md:w-80 h-[1px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isReady ? 1 : 0.4, y: 0 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="mt-8 text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase text-white/50"
        >
          {isReady ? "okay. hi." : "finding the right words."}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
