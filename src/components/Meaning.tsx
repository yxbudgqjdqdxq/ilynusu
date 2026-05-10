import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const MeaningBlock: React.FC<{
  title: string;
  name: string;
  content: React.ReactNode;
  align?: 'left' | 'right';
  quote?: string;
}> = ({ title, name, content, align = 'left', quote }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, 15]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y, filter }}
      className={`relative glass-panel rounded-2xl p-8 md:p-12 mix-blend-luminosity will-change-transform will-change-filter ${align === 'right' ? 'ml-auto' : ''} max-w-2xl`}
    >
      <div className={`absolute top-0 ${align === 'right' ? 'left-8' : 'right-8'} -translate-y-1/2 font-handwriting text-5xl text-[var(--base-accent)] opacity-30`}>
        {name}
      </div>
      <h3 className="font-serif text-2xl mb-4 italic">{title}</h3>
      <p className="font-sans text-lg md:text-xl leading-relaxed text-[var(--base-text)]/80">
        {content}
      </p>
      {quote && (
        <div className="mt-8 text-sm font-sans text-[var(--base-muted)] italic">
          "{quote}"
        </div>
      )}
    </motion.div>
  );
};

export const Meaning: React.FC = () => {
  return (
    <section className="relative w-full py-48 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-48">
        
        <MeaningBlock 
          name="Mahadiyat"
          title="The quiet guidance."
          content="Usually, they say it means being guided. To me, it just means the exact cadence of your voice when you tell me to drive safe. It's not loud. It doesn't have to be. It's just the steady pull bringing me back to earth when I'm floating too far off."
        />

        <MeaningBlock 
          name="Nusu"
          title="The missing weight."
          align="right"
          content="They say it means half. But that sounds too neat, too mathematical. I think it means the way my hands feel conspicuously empty when you're not walking next to me. The part of the room that suddenly matters just because you sat there."
          quote="I looked up the roots, but honestly, it just means the reason my phone is always on 10% from falling asleep on calls."
        />

      </div>
    </section>
  );
};
