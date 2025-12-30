import React, { useState, useEffect } from 'react';

const VERSES = [
  { 
    text: "He must become greater; I must become less.", 
    ref: "John 3:30",
    theme: "Dilution of Ego"
  },
  { 
    text: "Truly I tell you, unless you change and become like little children, you will never enter the kingdom of heaven.", 
    ref: "Matthew 18:3",
    theme: "Child-like Faith"
  },
  { 
    text: "How good and pleasant it is when God’s people live together in unity!", 
    ref: "Psalm 133:1",
    theme: "Unity"
  },
  { 
    text: "I have been crucified with Christ and I no longer live, but Christ lives in me.", 
    ref: "Galatians 2:20",
    theme: "Surrender"
  }
];

export const ScriptureFlow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % VERSES.length);
        setIsExiting(false);
      }, 1000); // Wait for fade out
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentVerse = VERSES[index];
  const words = currentVerse.text.split(' ');

  return (
    <section className="py-24 bg-leen-cream relative overflow-hidden flex items-center justify-center min-h-[400px]">
      {/* Decorative center line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-leen-rose/20 to-transparent transform -translate-y-1/2 z-0"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-leen-gold/5 rounded-full blur-[60px] animate-pulse-subtle z-0"></div>

      {/* Animated content wrapper with fade-out logic */}
      <div className={`relative z-10 max-w-4xl px-8 text-center ${isExiting ? 'opacity-0 transition-opacity duration-1000 ease-in' : 'opacity-100'}`}>
        {/* Inner key change forces remount and animation restart */}
        <div key={index}>
          <div className="mb-8 flex justify-center opacity-0 animate-reveal-up" style={{ animationDelay: '0s' }}>
            <span className="px-4 py-1.5 border border-leen-rose/30 rounded-full text-[10px] uppercase tracking-[0.3em] text-leen-stone/60 bg-white/40 backdrop-blur-md shadow-sm">
              {currentVerse.theme}
            </span>
          </div>
          
          <div className="font-serif text-3xl md:text-5xl text-leen-stone italic leading-tight mb-10 drop-shadow-sm flex flex-wrap justify-center gap-x-3 gap-y-2">
            {words.map((word, i) => (
              <span 
                key={i} 
                className="inline-block opacity-0 animate-reveal-up origin-bottom"
                style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
              >
                {word}
              </span>
            ))}
          </div>
          
          <p 
            className="font-sans text-xs md:text-sm font-medium tracking-[0.2em] text-leen-rose opacity-0 animate-reveal-up"
            style={{ animationDelay: `${words.length * 0.1 + 0.5}s` }}
            >
            — {currentVerse.ref}
          </p>
        </div>
      </div>

      {/* Floating particles specific to this section */}
      <div className="absolute top-10 left-20 w-1 h-1 bg-leen-gold rounded-full animate-twinkle"></div>
      <div className="absolute bottom-10 right-20 w-1.5 h-1.5 bg-leen-rose rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-[10%] w-2 h-2 bg-leen-stone/10 rounded-full animate-float opacity-50"></div>
    </section>
  );
};