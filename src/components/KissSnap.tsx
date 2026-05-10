import React, { useState } from 'react';
import { motion } from 'motion/react';

export const KissSnap: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full py-32 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full flex flex-col items-center">
        
        <div 
          className="relative w-full aspect-square md:aspect-video max-w-lg rounded-2xl overflow-hidden cursor-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(!isHovered)}
        >
          {/* Base heavily blurred image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
            style={{ 
              backgroundImage: 'url("/media/kiss-snap.jpg")',
              filter: `blur(${isHovered ? '8px' : '40px'}) brightness(${isHovered ? '0.8' : '0.5'})`,
              transform: `scale(${isHovered ? '1.02' : '1.1'})` 
            }}
          />
          
          {/* Fallback pattern if image is missing */}
          <div className="absolute inset-0 border border-[var(--base-glass-border)] mix-blend-overlay opacity-30 rounded-2xl" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center pointer-events-none">
            <motion.p 
              animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-2xl md:text-3xl italic font-light text-white drop-shadow-lg"
            >
              Some things are just ours.
            </motion.p>
          </div>
        </div>

        <p className="mt-8 font-sans text-sm text-[var(--base-muted)]/50 tracking-widest uppercase">
          [ Redacted ]
        </p>

      </div>
    </section>
  );
};
