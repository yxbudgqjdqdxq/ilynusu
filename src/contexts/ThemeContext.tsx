import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColor = 'blue' | 'pink' | 'lavender' | 'axolotl' | 'lotus';
type ThemeMode = 'auto' | 'day' | 'night';

interface ThemeContextType {
  color: ThemeColor;
  mode: ThemeMode;
  isNight: boolean;
  setColor: (color: ThemeColor) => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<ThemeColor>('blue');
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      if (mode !== 'auto') {
        setIsNight(mode === 'night');
        return;
      }

      // BD Time is UTC+6
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const bdTime = new Date(utc + (3600000 * 6));
      const hours = bdTime.getHours();
      
      // Night is 6 PM (18) to 6 AM (6)
      setIsNight(hours >= 18 || hours < 6);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('theme-blue', 'theme-pink', 'theme-lavender', 'theme-axolotl', 'theme-lotus', 'is-night');
    
    // Add current color
    if (color !== 'blue') {
      root.classList.add(`theme-${color}`);
    }
    
    // Add night mode class
    if (isNight) {
      root.classList.add('is-night');
    }
  }, [color, isNight]);

  return (
    <ThemeContext.Provider value={{ color, mode, isNight, setColor, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
