import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    text: "It wasn't just a workout; it was an exorcism of my stress. Aileen's presence changes the room.",
    author: "Sarah J.",
    location: "River Oaks"
  },
  {
    id: 2,
    text: "I came for abs, I left with a renewed spirit. Leen On Christ is the sanctuary Houston needed.",
    author: "Maria R.",
    location: "The Heights"
  },
  {
    id: 3,
    text: "The combination of prayerful intention and brutal pilates is unmatched. My reality has shifted.",
    author: "Chloe D.",
    location: "Montrose"
  },
  {
    id: 4,
    text: "Men need sanctuary too. The metaphysical aspect broke down walls I didn't know I had. Truth in motion.",
    author: "Jason Obawemimo, 20",
    location: "Downtown"
  }
];

export const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-leen-stone py-24 px-6 text-leen-cream relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 
          className={`font-serif text-4xl mb-16 transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Witness the Shift
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <div 
              key={t.id} 
              className={`bg-white/5 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-700 ease-out transform flex flex-col justify-between ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div>
                <div className="flex justify-center gap-1 text-leen-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#D4AF37" />)}
                </div>
                <p className="font-serif text-lg italic mb-6 leading-relaxed opacity-90">"{t.text}"</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-leen-rose">{t.author}</p>
                <p className="text-xs text-gray-400 mt-1">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};