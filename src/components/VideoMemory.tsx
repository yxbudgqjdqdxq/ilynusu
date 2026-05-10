import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';

export const VideoMemory: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        <div className="text-center z-10 mb-16 px-6">
          <h3 className="font-serif text-3xl md:text-5xl text-[var(--base-text)] italic font-light mb-4">
            Motion sickness.
          </h3>
          <p className="font-sans text-[var(--base-muted)] max-w-md mx-auto text-sm md:text-base">
            I kept this one. You laughing, the camera shaking, the perfect chaos of it all.
          </p>
        </div>

        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-video max-w-3xl rounded-2xl md:rounded-3xl overflow-hidden glass-panel group cursor-pointer border border-[var(--base-glass-border)] shadow-2xl bg-black/20"
          onClick={togglePlay}
        >
          {/* We assume the user's video is named her-video.mp4 and placed in /public/media/ */}
          <video
            ref={videoRef}
            src="/media/her-video.mp4"
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onError={(e) => {
               e.currentTarget.style.display = 'none';
               if (e.currentTarget.parentElement) {
                 e.currentTarget.parentElement.innerHTML += `
                   <div class="absolute inset-0 flex flex-col items-center justify-center font-sans text-xs sm:text-sm text-white/40 uppercase tracking-widest text-center px-4">
                      [ Video "her-video.mp4" missing from /public/media/ ]<br/>
                      <span class="mt-2 text-[10px] text-white/20 normal-case tracking-normal">Upload your drive video into the media folder</span>
                   </div>
                 `;
               }
            }}
          />

          {/* Controls Overlay */}
          <div className={cn(
            "absolute inset-0 bg-black/20 transition-opacity duration-500 flex items-center justify-center",
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          )}>
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-transform group-hover:scale-110">
              {isPlaying ? <Pause size={24} className="ml-1" /> : <Play size={24} className="ml-1" />}
            </div>
          </div>

          {/* Mute toggle button (bottom right) */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white border border-white/10 transition-colors z-20"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
