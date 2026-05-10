import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const BlueQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -40]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [15, 0, 0, 15]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

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
    <section ref={containerRef} className="relative min-h-[100svh] w-full flex items-center justify-center px-6 py-24 overflow-hidden">
      <motion.div 
        style={{ opacity, scale, y, filter }}
        className="max-w-4xl mx-auto text-center relative will-change-transform will-change-filter"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.4] md:leading-[1.5] text-[var(--base-text)] font-light lowercase">
          "blue was just blue.{" "}
          <span 
            className="italic text-[var(--base-accent)] whitespace-nowrap cursor-pointer relative inline-block group"
            onClick={spawnHeart}
          >
            then you happened.
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
          you had this tiny blue clip in your hair and the caption said something like 'bootiful' and i think that was the last day blue belonged to everyone. now it's just yours. and because it's yours, i guess it's mine too. bluetiful."
        </h2>
      </motion.div>
    </section>
  );
};

