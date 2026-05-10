import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const BlueQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-[80svh] w-full flex items-center justify-center px-6 py-24">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.4] md:leading-[1.5] text-[var(--base-text)] font-light">
          "Blue used to just be a color.{" "}
          <span className="italic text-[var(--base-accent)] whitespace-nowrap">Then you happened.</span>{" "}
          Now every shade of blue feels like something that belongs to you, so I think it belongs to me too."
        </h2>
      </motion.div>
    </section>
  );
};
