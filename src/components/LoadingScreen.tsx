import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds loading
    const interval = 50;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // slight delay before unmounting
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--base-bg)]"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center overflow-visible"
        >
           {/* Fallback Potato Chibi using CSS if image is missing, 
               but ideally they place /media/potato-chibi.png in public */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-2xl rounded-full bg-[var(--base-accent)] mix-blend-screen animate-pulse" />
          
          <img 
            src="/media/potato-chibi.png" 
            alt="Us as potatoes" 
            className="w-full h-full object-contain drop-shadow-2xl z-10"
            onError={(e) => {
              // Fallback if image not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML += `
                <div class="font-handwriting text-4xl text-[var(--base-text)] text-center">
                  *Nuzu's Potato Drawing Goes Here*
                </div>
              `;
            }}
          />
        </motion.div>

        <div className="mt-12 w-48 h-[2px] bg-[var(--base-glass-border)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--base-accent)]"
            style={{ width: `${progress}%` }}
            layoutId="loadingBar"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm font-sans tracking-widest uppercase text-[var(--base-muted)]"
        >
          {progress < 100 ? "Syncing..." : "Ready."}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
