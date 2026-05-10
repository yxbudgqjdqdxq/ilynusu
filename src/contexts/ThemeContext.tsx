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

      // Smart Auto Detection from device
      const now = new Date();
      const hours = now.getHours();
      const month = now.getMonth();
      
      // Smart seasonal sunrise/sunset approximation (Northern Hemisphere)
      let sunset = 18; // 6 PM base
      let sunrise = 6; // 6 AM base
      
      // Summer (May - Aug): longer days
      if (month >= 4 && month <= 7) {
        sunset = 19; // 7 PM
        sunrise = 5; // 5 AM
      } 
      // Winter (Nov - Feb): shorter days
      else if (month >= 10 || month <= 1) {
        sunset = 17; // 5 PM
        sunrise = 6.5; // ~6:30 AM
      }

      let isTimeNight = hours >= sunset || hours < sunrise;

      // Check device system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // If time is borderline (twilight hour), let system preference decide
      if (hours === Math.floor(sunset) - 1 || hours === Math.floor(sunset)) {
         isTimeNight = prefersDark || hours >= sunset; 
      }
      
      setIsNight(isTimeNight);
    };

    checkTime();

    // Listen for system theme changes specifically when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'auto') checkTime();
    };
    mediaQuery.addEventListener('change', handleChange);

    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener('change', handleChange);
    };
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
