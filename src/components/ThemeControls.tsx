import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Monitor, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const ThemeControls: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const palettes = [
    { id: 'blue', label: 'Blue' },
    { id: 'pink', label: 'Pink' },
    { id: 'lavender', label: 'Lavender' },
    { id: 'axolotl', label: 'Axolotl' },
    { id: 'lotus', label: 'Lotus' },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-panel p-4 rounded-3xl w-[200px] flex flex-col gap-6 shadow-2xl pointer-events-auto origin-bottom-right"
          >
            
            {/* Text-based Palettes */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest text-[var(--base-muted)] px-2">Aesthetic</div>
              <div className="flex flex-col gap-1">
                {palettes.map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setColor(p.id)}
                    className={cn(
                      "text-left px-3 py-2 rounded-xl text-sm font-sans transition-all duration-300", 
                      color === p.id 
                        ? "bg-[var(--base-text)] text-[var(--base-bg)] font-medium" 
                        : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Day/Night Icons */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest text-[var(--base-muted)] px-2">Atmosphere</div>
              <div className="flex items-center gap-1 bg-[var(--base-glass-border)] p-1 rounded-2xl">
                <button 
                  onClick={() => setMode('day')}
                  className={cn("flex-1 h-8 rounded-xl flex items-center justify-center transition-all", mode === 'day' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
                  title="Always Day"
                >
                  <Sun size={14} />
                </button>
                <button 
                  onClick={() => setMode('auto')}
                  className={cn("flex-1 h-8 rounded-xl flex items-center justify-center transition-all", mode === 'auto' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
                  title="Auto (BD Time)"
                >
                  <Monitor size={14} />
                </button>
                <button 
                  onClick={() => setMode('night')}
                  className={cn("flex-1 h-8 rounded-xl flex items-center justify-center transition-all", mode === 'night' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
                  title="Always Night"
                >
                  <Moon size={14} />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--base-text)] hover:scale-105 transition-all shadow-xl pointer-events-auto border border-[var(--base-glass-border)]"
        title="Settings"
      >
        <Settings2 size={20} />
      </button>
      
    </div>
  );
};
