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
          src="/media/her-photo-down.jpg" 
          alt="Her lying down" 
          rotation={-6} 
          xOffset={-150} 
          yOffset={-100} 
          caption="you were just lying there. i don't know why this one stayed with me."
          className="left-1/4 top-[10%] hidden md:block"
        />
        
        <Polaroid 
          src="/media/her-photo-bw.jpg" 
          alt="Her B&W glasses" 
          rotation={4} 
          xOffset={150} 
          yOffset={-150} 
          caption="the glasses. the look. she knows exactly what she's doing."
          className="right-1/4 top-[15%]"
        />

        <Polaroid 
          src="/media/potato-chibi.png" 
          alt="Potato Chibi" 
          rotation={-10} 
          xOffset={-30} 
          yOffset={30} 
          caption="nuzu made this. i am the ugly potato on the right."
          className="z-20 md:left-1/3 md:top-1/2"
        />

        <Polaroid 
          src="/media/toca-boca.jpg" 
          alt="Toca Boca avatars" 
          rotation={8} 
          xOffset={-200} 
          yOffset={150} 
          caption="we built ourselves in a game. somehow still us."
          className="left-1/3 bottom-[15%] hidden sm:block"
        />

        <Polaroid 
          src="/media/sister-flower.jpg" 
          alt="With sister flower filter" 
          rotation={-3} 
          xOffset={120} 
          yOffset={100} 
          caption="she wanted to join. she was right to."
          className="right-1/3 bottom-[20%]"
        />

        <Polaroid 
          src="/media/her-stickers.jpg" 
          alt="Her dramatic photo with stickers" 
          rotation={5} 
          xOffset={200} 
          yOffset={250} 
          caption="i made those little guys. they are all me. i have no notes."
          className="right-[15%] bottom-[10%] hidden lg:block"
        />

      </div>
    </section>
  );
};
