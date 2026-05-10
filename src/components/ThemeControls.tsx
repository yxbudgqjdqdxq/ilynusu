import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const ThemeControls: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();

  const palettes = [
    { id: 'blue', label: 'Blue' },
    { id: 'pink', label: 'Pink' },
    { id: 'lavender', label: 'Lavender' },
    { id: 'axolotl', label: 'Axolotl' },
    { id: 'lotus', label: 'Lotus' },
  ] as const;

  return (
    <div className="fixed bottom-4 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
      
      <motion.div 
        layout
        className="glass-panel hover:bg-white/10 dark:hover:bg-black/10 pointer-events-auto rounded-full p-2 flex items-center gap-2 md:gap-4 shadow-2xl border border-[var(--base-glass-border)] shrink-0 max-w-[95vw] md:max-w-max overflow-x-auto hide-scrollbar"
      >
        <div className="flex items-center gap-2 px-1 sm:px-2 w-full min-w-max">
          
          {/* Text-based Palettes */}
          <div className="flex items-center gap-1 md:gap-2 border-[var(--base-glass-border)] pr-2 md:border-r md:pr-4 flex-shrink-0">
            {palettes.map((p) => (
              <button 
                key={p.id}
                onClick={() => setColor(p.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs md:text-sm font-sans transition-all duration-300 whitespace-nowrap", 
                  color === p.id 
                    ? "bg-[var(--base-text)] text-[var(--base-bg)] font-medium shadow-sm scale-105" 
                    : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50"
                )}
                title={p.label}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Day/Night Icons */}
          <div className="flex items-center gap-1 bg-[var(--base-glass-border)]/50 p-1 rounded-full flex-shrink-0 mx-auto sm:mx-0">
            <button 
              onClick={() => setMode('day')}
              className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", mode === 'day' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
              title="Day"
            >
              <Sun size={14} />
            </button>
            <button 
              onClick={() => setMode('auto')}
              className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", mode === 'auto' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
              title="Auto"
            >
              <Monitor size={14} />
            </button>
            <button 
              onClick={() => setMode('night')}
              className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", mode === 'night' ? "bg-[var(--base-text)] text-[var(--base-bg)] shadow-md" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]/50")}
              title="Night"
            >
              <Moon size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
