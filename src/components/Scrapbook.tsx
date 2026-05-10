import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../lib/utils';

interface PolaroidProps {
  src: string;
  alt: string;
  rotation: number;
  xOffset: number;
  yOffset: number;
  caption?: string;
  className?: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ src, alt, rotation, xOffset, yOffset, caption, className }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
      initial={{ rotate: rotation, x: xOffset, y: yOffset, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "absolute w-48 sm:w-56 md:w-64 bg-white p-3 md:p-4 pb-10 md:pb-12 rounded-sm shadow-xl cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <div className="relative aspect-square w-full bg-gray-200 overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className="object-cover w-full h-full pointer-events-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop`;
          }}
        />
      </div>
      {caption && (
        <div className="absolute bottom-2 left-0 w-full text-center">
          <p className="font-handwriting text-xl text-gray-800 opacity-80 decoration-slate-400 pointer-events-none select-none">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export const Scrapbook: React.FC = () => {
  const containerRef = useRef(null);
  
  return (
    <section className="relative w-full min-h-[120svh] py-32 overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, var(--base-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="text-center z-10 mb-32 px-6">
        <h3 className="font-serif text-3xl md:text-5xl text-[var(--base-text)] italic font-light mb-4">
          Receipts & blurry selfies.
        </h3>
        <p className="font-sans text-[var(--base-muted)] max-w-md mx-auto text-sm md:text-base">
          I found your blurry screenshot again last night. The lighting was awful and your hair covered half your face. I still stared at it until my coffee got cold.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto h-[600px] md:h-[800px] flex items-center justify-center">
        {/* We assume images exist in /media/, with fallbacks to Unsplash in the component */}
        
        <Polaroid 
          src="/media/our-photo-1.jpg" 
          alt="Us" 
          rotation={-6} 
          xOffset={-150} 
          yOffset={-100} 
          caption="hoodie sleeves"
          className="left-1/4 top-1/4 hidden md:block"
        />
        
        <Polaroid 
          src="/media/her-photo-1.jpg" 
          alt="Her" 
          rotation={4} 
          xOffset={100} 
          yOffset={-150} 
          caption="4:00 PM"
          className="right-1/4 top-1/4"
        />

        <Polaroid 
          src="/media/our-photo-2.jpg" 
          alt="Us again" 
          rotation={-3} 
          xOffset={-100} 
          yOffset={100} 
          caption="awkward smiles"
          className="left-1/3 bottom-1/4"
        />

        <Polaroid 
          src="/media/nasa-1.jpg" 
          alt="Aesthetic space" 
          rotation={8} 
          xOffset={200} 
          yOffset={50} 
          className="right-1/3 bottom-1/3 w-32 sm:w-40 md:w-48 hidden sm:block"
        />

        {/* Nuzu's Drawing as a polaroid */}
        <Polaroid 
          src="/media/potato-chibi.png" 
          alt="Potato Chibi" 
          rotation={-10} 
          xOffset={0} 
          yOffset={0} 
          caption="by Nuzu (we are potatoes)"
          className="z-20"
        />

      </div>
    </section>
  );
};
