import React from 'react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large soft orb top left */}
      <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-leen-pink/20 blur-[100px] animate-float-slow mix-blend-multiply opacity-60"></div>
      
      {/* Medium orb right center */}
      <div className="absolute top-[30%] -right-[5%] w-[40vw] h-[40vw] rounded-full bg-leen-gold/5 blur-[80px] animate-float-reverse mix-blend-multiply opacity-50"></div>

      {/* Large orb bottom */}
      <div className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-leen-rose/10 blur-[120px] animate-float mix-blend-multiply opacity-40"></div>
      
      {/* Tiny floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-leen-gold/30 rounded-full animate-float-slow blur-[1px]"></div>
      <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-leen-rose/30 rounded-full animate-float blur-[2px]"></div>
      <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-leen-stone/10 rounded-full animate-pulse-subtle"></div>

      {/* Stardust / Twinkle Layer */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[45%] left-[80%] w-1 h-1 bg-leen-gold/60 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 bg-leen-rose/60 rounded-full animate-twinkle" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[10%] right-[15%] w-0.5 h-0.5 bg-leen-stone/40 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
};