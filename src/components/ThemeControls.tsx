import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Monitor, Palette, Volume2, VolumeX, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const ThemeControls: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();
  // Open by default so they see it immediately upon load
  const [isOpen, setIsOpen] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Define the palettes for the UI
  const palettes = [
    { id: 'blue', label: 'Blue', colors: ['#A7C7E7', '#1C2B48'] },
    { id: 'pink', label: 'Pink', colors: ['#CDADAB', '#836871'] },
    { id: 'lavender', label: 'Lavender', colors: ['#BAB0C8', '#312A44'] },
    { id: 'axolotl', label: 'Axolotl', colors: ['#8DAF9B', '#6A7A5A'] },
    { id: 'lotus', label: 'Lotus', colors: ['#839958', '#0A3323'] },
  ] as const;

  return (
    <div className="fixed bottom-6 w-full flex justify-center z-50 px-6 pointer-events-none">
      
      {/* Floating Island */}
      <motion.div 
        layout
        className="glass-panel pointer-events-auto rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2 md:gap-4 shadow-2xl border border-[var(--base-glass-border)] shrink-0 max-w-full"
      >
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar px-2">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--base-text)] hover:bg-[var(--base-glass-border)] transition-colors"
            title="Styles"
          >
            <Settings2 size={18} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-4 overflow-hidden px-2"
              >
                
                {/* Palette Circles */}
                <div className="flex items-center gap-2 border-r border-[var(--base-glass-border)] pr-4">
                  {palettes.map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => setColor(p.id)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0", 
                        color === p.id ? "border-[var(--base-text)] scale-110" : "border-transparent"
                      )}
                      style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
                      title={p.label}
                    />
                  ))}
                </div>

                {/* Day/Night Toggles */}
                <div className="flex items-center gap-1 bg-[var(--base-glass-border)]/50 p-1 rounded-full">
                  <button 
                    onClick={() => setMode('day')}
                    className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", mode === 'day' ? "bg-[var(--base-text)] text-[var(--base-bg)]" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]")}
                    title="Always Day"
                  >
                    <Sun size={14} />
                  </button>
                  <button 
                    onClick={() => setMode('auto')}
                    className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", mode === 'auto' ? "bg-[var(--base-text)] text-[var(--base-bg)]" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]")}
                    title="Auto (BD Time)"
                  >
                    <Monitor size={14} />
                  </button>
                  <button 
                    onClick={() => setMode('night')}
                    className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", mode === 'night' ? "bg-[var(--base-text)] text-[var(--base-bg)]" : "text-[var(--base-text)] hover:bg-[var(--base-glass-border)]")}
                    title="Always Night"
                  >
                    <Moon size={14} />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="w-10 h-10 ml-auto rounded-full flex items-center justify-center text-[var(--base-text)] hover:bg-[var(--base-glass-border)] transition-colors"
            title={isAudioMuted ? "Unmute Ambient Audio" : "Mute"}
          >
            {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

        </div>
      </motion.div>
    </div>
  );
};
