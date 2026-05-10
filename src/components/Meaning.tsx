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
          title="the hum."
          content="she hums. randomly. mid-sentence sometimes, like her brain just switches frequencies and she starts singing something and i genuinely forget what i was saying. that's what her name means to me. not guidance in some grand sense. just that. the hum. the way she breaks into something without warning and pulls me back into the room without even trying."
        />

        <MeaningBlock 
          name="Nusu"
          title="the wrong shape of quiet."
          align="right"
          content="nusu means half. mathematically fine, emotionally useless as a definition. i think it means the specific shape of a silence. the kind where you were just talking to someone and now you're not and the room doesn't adjust. it just stays wrong. half is too clean. it's more like the other side of a call that went quiet and you don't want to be the one to hang up."
          quote="looked up what it means. didn't need to. it's just the reason my phone dies at 2am and i don't even care."
        />

      </div>
    </section>
  );
};
