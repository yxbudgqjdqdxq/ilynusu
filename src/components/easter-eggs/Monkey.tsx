import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ghost } from 'lucide-react';

export const MonkeyEasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="fixed bottom-2 inline-flex items-center gap-1 left-2 md:left-auto md:right-32 text-[8px] text-[var(--base-text)] opacity-10 hover:opacity-50 transition-all cursor-pointer z-40 px-2 py-1 rounded-full hover:bg-[var(--base-glass-border)]"
        onClick={() => setIsOpen(true)}
      >
        <Ghost size={10} />
        <span>m o n k e</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="relative max-w-lg w-full bg-[#111] p-4 rounded-xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/media/monkey.jpg" 
                alt="Funny monkey" 
                className="w-full h-auto rounded-lg object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML += `
                    <div class="h-64 flex items-center justify-center text-white/50 font-sans">
                      [ Image: "funny monkey edit" missing in /media/ ]
                    </div>
                  `;
                }}
              />
              <p className="mt-4 text-center font-handwriting text-white/80 text-3xl">
                hehe monke.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center text-sm transition-colors border border-white/20"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

