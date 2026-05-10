import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../lib/utils';

interface NoteProps {
  text: string;
  className?: string;
  align?: 'left' | 'right';
}

const Note: React.FC<NoteProps> = ({ text, className, align = 'left' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"]
  });

  // Very gentle up/down and blur effect depending on the scroll
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [20, 0, 0, 20]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y, filter }}
      className={cn(
        "my-32 md:my-48 max-w-xl mx-auto px-6 will-change-transform will-change-filter",
        align === 'right' ? "text-right" : "text-left",
        className
      )}
    >
      <p className="font-handwriting text-2xl md:text-3xl text-[var(--base-text)]/90 leading-relaxed mix-blend-luminosity">
        {text}
      </p>
    </motion.div>
  );
};

export const Notes: React.FC = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-[var(--base-bg)] backdrop-blur-3xl">
      <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-10 pointer-events-none">
         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto py-20 pb-40">
        
        <Note 
          text="I remember the first time I noticed you. Not 'saw' you, but actually noticed you. It was quiet." 
          align="left"
        />
        
        <Note 
          text="Nuzu drew us like potatoes. She’s ten, but she somehow captured exactly how safe I feel in your oversized hoodie." 
          align="right"
          className="mr-12 md:mr-24"
        />

        <Note 
          text="You leave fingerprints on my screen. I used to wipe them off. Now I kind of just trace them when you're not here." 
          align="left"
          className="ml-8 md:ml-32"
        />

        <Note 
          text="The late notifications. The asleep-on-call breathing. I wouldn't trade it for a symphony." 
          align="right"
        />

      </div>
    </section>
  );
};
