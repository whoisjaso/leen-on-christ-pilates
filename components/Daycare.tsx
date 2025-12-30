import React, { useEffect, useRef, useState } from 'react';
import { Heart, ShieldCheck, Sun, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const Daycare: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-leen-pink/20 py-24 px-6 overflow-hidden">
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="md:w-1/2 relative group">
           <div className="absolute inset-0 bg-leen-rose/20 rounded-t-[10rem] blur-2xl transform scale-90 group-hover:scale-100 transition-transform duration-1000"></div>
           <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop"
            alt="Children playing in a nurturing daycare environment"
            className="relative z-10 rounded-t-[10rem] shadow-2xl transition-transform duration-700 group-hover:-translate-y-2"
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 mb-4 text-leen-rose animate-pulse-subtle">
            <Sun size={20} />
            <span className="text-xs uppercase tracking-widest">On-Site Sanctuary</span>
          </div>
          <h2 className="font-serif text-5xl text-leen-stone mb-6">Little Angels Care</h2>
          <p className="font-sans font-light text-leen-stone/70 mb-8 leading-loose">
            While you align your spirit, we nurture theirs. Our 'Little Angels' program is more than babysitting; it's a calm, creative environment for your children while you attend class.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-10">
            <div className="flex gap-4 group">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 text-leen-rose shadow-sm group-hover:shadow-md transition-all duration-300">
                 <ShieldCheck size={24} />
               </div>
               <div>
                 <h4 className="font-serif text-xl text-leen-stone">Secure & Certified</h4>
                 <p className="text-sm text-gray-500 font-light">All staff are CPR certified and vetted extensively.</p>
               </div>
            </div>
            <div className="flex gap-4 group">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 text-leen-rose shadow-sm group-hover:shadow-md transition-all duration-300">
                 <Heart size={24} />
               </div>
               <div>
                 <h4 className="font-serif text-xl text-leen-stone">Mindful Play</h4>
                 <p className="text-sm text-gray-500 font-light">No screens. Wooden toys, soft music, and gentle creative arts.</p>
               </div>
            </div>
          </div>

          <button 
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="flex items-center gap-2 border-b border-leen-stone pb-1 hover:border-leen-rose hover:text-leen-rose transition-colors uppercase text-xs tracking-widest animate-pulse-subtle hover:animate-none"
          >
            View Divine Guidelines & Regulations {showGuidelines ? <ChevronUp size={12}/> : <ChevronDown size={12} />}
          </button>

          {/* Guidelines Expansion */}
          <div className={`mt-8 overflow-hidden transition-all duration-700 ${showGuidelines ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-sm border-l-2 border-leen-rose">
               <div className="flex items-center gap-2 mb-4 text-leen-rose">
                  <BookOpen size={16} />
                  <span className="font-serif italic text-lg">"Train up a child in the way he should go..."</span>
               </div>
               <div className="space-y-4 font-sans font-light text-sm text-leen-stone/80">
                  <p><strong>The Vessel is Sacred:</strong> To maintain the purity of the sanctuary, children showing any signs of illness (fever, cough, fluid) cannot be admitted. This is not rejection, but protection of the flock.</p>
                  <p><strong>Words of Life:</strong> We practice conscious language. Bullying or harsh words are gently redirected towards affirmation. We teach that the tongue has the power of life and death (Proverbs 18:21).</p>
                  <p><strong>Ratios & Reality:</strong> We maintain a strict 1:5 guardian-to-angel ratio. This ensures every child receives the "laying on of eyes" needed for safety.</p>
                  <p><strong>Nourishment:</strong> Only water and dry, nut-free manna (snacks) are permitted to avoid allergens.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};