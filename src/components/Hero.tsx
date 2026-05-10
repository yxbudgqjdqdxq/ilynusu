import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, Moon, Sun, CloudRain } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--base-bg)]/20 to-[var(--base-bg)] z-10" />
        
        {/* Subtle NASA/Aerial background layer */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-luminosity bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop")',
            filter: 'contrast(1.2)'
          }}
        />
        
        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[var(--base-accent)] blur-[100px] mix-blend-screen opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[var(--base-muted)] blur-[120px] mix-blend-screen opacity-20"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center max-w-2xl px-6 text-center"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-handwriting text-2xl md:text-3xl lg:text-4xl text-[var(--base-muted)] mb-6 -rotate-2"
        >
          It's 3:14 AM and
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight text-[var(--base-text)]"
        >
          I'm thinking about how you <span className="italic text-[var(--base-accent)]">arrange</span> your bookshelf.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 text-sm font-sans tracking-wide text-[var(--base-muted)]/70 uppercase"
        >
          Scroll softly
        </motion.p>
      </motion.div>
    </section>
  );
};
