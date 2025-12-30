import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Volume2, VolumeX, Wind } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      // Fade out and stop
      if (audioContextRef.current && gainNodeRef.current) {
        const currTime = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, currTime + 2);
        
        setTimeout(() => {
            oscillatorsRef.current.forEach(osc => {
              try { osc.stop(); osc.disconnect(); } catch (e) {}
            });
            oscillatorsRef.current = [];
            setIsPlaying(false);
        }, 2000);
      }
    } else {
      // Start
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3); // Slow fade in
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Oscillator 1: Root 432Hz (Healing)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);
      osc1.connect(masterGain);
      osc1.start();

      // Oscillator 2: Sub-octave 216Hz (Grounding)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(216, ctx.currentTime);
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.6; // Lower volume for bass
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start();

      // Oscillator 3: Binaural Beat Detune 436Hz (4Hz Theta wave induction for meditation)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(436, ctx.currentTime); 
      const gain3 = ctx.createGain();
      gain3.gain.value = 0.3; 
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start();

      oscillatorsRef.current = [osc1, osc2, osc3];
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with animated gradient - decorative */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-leen-cream via-leen-pink/20 to-leen-gold/5 bg-[length:400%_400%] animate-gradient-slow" aria-hidden="true">

         {/* The Breathing Aura */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-leen-rose/10 rounded-full blur-[80px] animate-breathe pointer-events-none mix-blend-multiply"></div>

         {/* Floating Elements */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-leen-rose/20 rounded-full blur-[100px] animate-float opacity-60"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-100/30 rounded-full blur-[120px] animate-float opacity-50" style={{ animationDelay: '2s' }}></div>

         {/* Spirit Motes (Rising Particles) */}
         <div className="absolute bottom-0 left-[20%] w-2 h-2 bg-white rounded-full blur-[1px] animate-float-slow opacity-40"></div>
         <div className="absolute bottom-0 right-[30%] w-3 h-3 bg-leen-gold/20 rounded-full blur-[2px] animate-float-reverse opacity-30" style={{ animationDuration: '15s' }}></div>
         <div className="absolute top-[20%] right-[10%] w-1 h-1 bg-white rounded-full animate-twinkle opacity-60"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 animate-fade-in opacity-70">
          <Wind size={14} className="text-leen-stone/50 animate-pulse" aria-hidden="true" />
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-leen-stone/80">
            Inhale &middot; Exhale
          </p>
        </div>
        
        <h1 className="font-serif text-5xl md:text-8xl text-leen-stone leading-tight mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Movement is <br />
          <span className="italic text-leen-rose relative inline-block">
            Prayer
            {/* Subtle glow behind the word Prayer */}
            <span className="absolute inset-0 bg-leen-rose/20 blur-xl rounded-full -z-10 animate-pulse" aria-hidden="true"></span>
          </span> in Motion.
        </h1>

        <p className="font-sans font-light text-sm md:text-lg text-leen-stone/70 max-w-lg leading-relaxed mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          We don't just shape bodies; we construct temples. Experience a metaphysical approach to Pilates where perception dictates reality, and your reality is about to ascend.
        </p>

        {/* The Petal Button - Organic Shape & Pulsing Gradient */}
        <div className="relative group animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {/* External Halo */}
          <div className="absolute inset-0 bg-leen-rose/40 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
          
          <button 
            onClick={onExplore}
            className="relative z-10 w-64 h-24 
                       rounded-[40%_60%_70%_30%/50%_40%_60%_50%] 
                       border border-white/60 backdrop-blur-md 
                       bg-gradient-to-r from-leen-cream via-white/80 to-leen-pink/20 
                       bg-[length:200%_200%] animate-gradient-slow 
                       shadow-[0_15px_40px_-10px_rgba(232,180,184,0.4)]
                       hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,0.3)]
                       hover:scale-105 transition-all duration-700 ease-out 
                       flex items-center justify-center overflow-hidden"
          >
             {/* Gentle interior pulse overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-leen-rose/10 via-transparent to-leen-gold/10 animate-pulse-subtle pointer-events-none"></div>

             <div className="relative flex flex-col items-center gap-1 group-hover:gap-2 transition-all duration-500">
               <span className="text-xs uppercase tracking-[0.35em] text-leen-stone font-medium group-hover:tracking-[0.45em] transition-all duration-700">
                  Align Your Spirit
               </span>
               <div className="w-1 h-1 rounded-full bg-leen-rose animate-pulse"></div>
             </div>
          </button>
        </div>

        {/* Ambient Sound Toggle */}
        <div className="mt-16 animate-fade-in flex flex-col items-center gap-3" style={{ animationDelay: '1s' }}>
          <button 
            onClick={toggleSound}
            className="p-5 rounded-full border border-leen-stone/10 text-leen-stone/40 hover:text-leen-stone hover:bg-white hover:shadow-xl transition-all duration-500 group"
            aria-label={isPlaying ? "Mute ambient frequency" : "Play healing frequency"}
          >
            {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <VolumeX size={24} />}
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-leen-stone/30 opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? "432Hz Alignment Playing" : "Activate Frequency"}
          </span>
        </div>

        {/* Scroll Indicator - decorative */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float flex flex-col items-center gap-2 text-leen-stone/20" aria-hidden="true">
           <span className="text-[10px] uppercase tracking-[0.6em] font-light">Descent</span>
           <ArrowDown size={16} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
};