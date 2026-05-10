import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const SecretMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="fixed top-4 right-4 w-4 h-4 opacity-0 hover:opacity-10 transition-opacity cursor-pointer z-40 flex items-center justify-center p-4 rounded-full"
        onClick={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[var(--base-bg)]/95 backdrop-blur-3xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="max-w-md w-full text-center flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="text-[var(--base-accent)] w-12 h-12 stroke-[1px] animate-pulse" />
              
              <p className="font-serif text-2xl md:text-4xl text-[var(--base-text)] italic leading-relaxed">
                "you weren't supposed to find this.<br/><br/>but since you did. hi. yeah. you mean everything."
              </p>
              
              <p className="font-sans text-xs uppercase tracking-widest text-[var(--base-muted)] mt-8">
                - easter egg 2. go tell me you found it.
              </p>

              <button 
                onClick={() => setIsOpen(false)}
                className="mt-8 px-6 py-2 rounded-full border border-[var(--base-glass-border)] text-[var(--base-text)] text-sm font-sans hover:bg-[var(--base-text)] hover:text-[var(--base-bg)] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
