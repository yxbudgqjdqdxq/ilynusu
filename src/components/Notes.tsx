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
          text="ammu made food and abbu did that thing where he laughs too loud and her sister was just being herself and i sat in the middle of all of it and thought. oh. this is what it's supposed to feel like." 
          align="left"
        />
        
        <Note 
          text="i never fully had this. a family that just works. and she doesn't even know that watching hers from the outside is the nicest thing anyone's ever accidentally done for me." 
          align="right"
          className="mr-12 md:mr-24"
        />

        <Note 
          text="she hums when she's not paying attention. i start paying more attention." 
          align="left"
          className="ml-8 md:ml-32"
        />

        <Note 
          text="she's dedicated. she really is. with some footnotes i won't get into. but the core of it. yeah. i see it." 
          align="right"
        />

        <Note 
          text="i keep thinking about whether i want her in my life and the answer keeps coming back the same way. not dramatically. just yes. obviously yes. next question." 
          align="left"
          className="ml-4 md:ml-12"
        />

      </div>
    </section>
  );
};
