import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const BlueQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const [hearts, setHearts] = useState<{id: number, x: number, y: number}[]>([]);
  const [heartId, setHeartId] = useState(0);

  const spawnHeart = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHearts(prev => [...prev, { id: heartId, x, y }]);
    setHeartId(prev => prev + 1);

    // remove after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heartId));
    }, 2000);
  };

  return (
    <section ref={containerRef} className="relative min-h-[80svh] w-full flex items-center justify-center px-6 py-24">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto text-center relative"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.4] md:leading-[1.5] text-[var(--base-text)] font-light">
          "Blue used to just be a color.{" "}
          <span 
            className="italic text-[var(--base-accent)] whitespace-nowrap cursor-pointer relative inline-block group"
            onClick={spawnHeart}
          >
            Then you happened.
            {/* Tooltip hint */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-sans text-[var(--base-muted)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              (click me)
            </span>
            
            <AnimatePresence>
              {hearts.map(heart => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, y: heart.y, x: heart.x, scale: 0.5 }}
                  animate={{ opacity: 0, y: heart.y - 100, x: heart.x + (Math.random() * 40 - 20), scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute pointer-events-none z-50 text-[var(--base-accent)] text-xl"
                  style={{ top: 0, left: 0 }} // using internal x,y
                >
                  <Heart className="fill-current w-6 h-6" />
                </motion.div>
              ))}
            </AnimatePresence>
          </span>{" "}
          Now every shade of blue feels like something that belongs to you, so I think it belongs to me too."
        </h2>
      </motion.div>
    </section>
  );
};

