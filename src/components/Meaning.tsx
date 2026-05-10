import React from 'react';
import { motion } from 'motion/react';

export const Meaning: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-24">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative glass-panel rounded-2xl p-8 md:p-12"
        >
          <div className="absolute top-0 right-8 -translate-y-1/2 font-handwriting text-5xl text-[var(--base-accent)] opacity-30">
            Mahadiyat
          </div>
          <h3 className="font-serif text-2xl mb-4 italic">The quiet guidance.</h3>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-[var(--base-text)]/80">
            Usually, they say it means being guided. To me, it just means the exact cadence of your voice when you tell me to drive safe. It's not loud. It doesn't have to be. It's just the steady pull bringing me back to earth when I'm floating too far off.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative glass-panel rounded-2xl p-8 md:p-12 ml-auto"
        >
          <div className="absolute top-0 left-8 -translate-y-1/2 font-handwriting text-5xl text-[var(--base-accent)] opacity-30">
            Nusu
          </div>
          <h3 className="font-serif text-2xl mb-4 italic">The missing weight.</h3>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-[var(--base-text)]/80">
            They say it means half. But that sounds too neat, too mathematical. I think it means the way my hands feel conspicuously empty when you're not walking next to me. The part of the room that suddenly matters just because you sat there.
          </p>
          <div className="mt-8 text-sm font-sans text-[var(--base-muted)] italic">
            "I looked up the roots, but honestly, it just means the reason my phone is always on 10% from falling asleep on calls."
          </div>
        </motion.div>

      </div>
    </section>
  );
};
