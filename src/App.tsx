import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { ThemeControls } from './components/ThemeControls';
import { Hero } from './components/Hero';
import { BlueQuote } from './components/BlueQuote';
import { Meaning } from './components/Meaning';
import { Scrapbook } from './components/Scrapbook';
import { VideoMemory } from './components/VideoMemory';
import { KissSnap } from './components/KissSnap';
import { Notes } from './components/Notes';
import { MonkeyEasterEgg } from './components/easter-eggs/Monkey';
import { SecretMessage } from './components/easter-eggs/SecretMessage';
import { SmoothScroll } from './components/SmoothScroll';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <SmoothScroll>
          <main className="relative w-full min-h-screen bg-[var(--base-bg)] text-[var(--base-text)] transition-colors duration-1000">
            <CustomCursor />
            <ThemeControls />
            
            {/* Main Flow */}
            <Hero />
            <BlueQuote />
            <Meaning />
            <Scrapbook />
            <VideoMemory />
            <KissSnap />
            <Notes />
            <MonkeyEasterEgg />
            <SecretMessage />
            
            <footer className="w-full py-12 text-center text-xs font-sans text-[var(--base-muted)]/40 tracking-widest uppercase">
              <p className="mb-2">For Mahadiyat</p>
              <p>Made with love in a browser. It's too late. Go to sleep.</p>
            </footer>
          </main>
        </SmoothScroll>
      )}
    </ThemeProvider>
  );
}
