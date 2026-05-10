import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const MonkeyEasterEgg: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="fixed bottom-4 right-4 w-4 h-4 opacity-0 hover:opacity-10 transition-opacity cursor-pointer z-40"
        onClick={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="relative max-w-lg w-full bg-[#111] p-4 rounded-xl border border-white/10"
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
              <p className="mt-4 text-center font-handwriting text-white/80 text-xl">
                Okay fine, here's the monkey.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center text-sm transition-colors"
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
