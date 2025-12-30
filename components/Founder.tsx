import React from 'react';
import { Quote, Phone } from 'lucide-react';

export const Founder: React.FC = () => {
  return (
    <section id="founder" className="py-32 px-6 bg-white/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background flourish */}
      <div className="absolute top-0 right-0 text-[20rem] text-leen-pink/10 font-serif leading-none select-none opacity-50 -translate-y-1/2 translate-x-1/4 animate-float-slow pointer-events-none">
        Leen
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24 relative z-10">
        
        {/* Image Column */}
        <div className="w-full md:w-1/2 relative group">
          {/* Arch Frame */}
          <div className="relative z-10 rounded-t-[15rem] rounded-b-[2rem] overflow-hidden aspect-[3/4] border-[1px] border-leen-rose/20 shadow-2xl transition-transform duration-1000 group-hover:-translate-y-4 bg-leen-cream">
            <img
              src="/aileenpinkpilates.jpeg"
              alt="Aileen Hernandez"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
            />
            
            {/* Mirror Text Overlay */}
            <div className="absolute top-12 left-0 w-full text-center pointer-events-none mix-blend-multiply opacity-80">
               <p className="font-hand text-leen-stone/80 text-3xl md:text-4xl tracking-wide rotate-1">
                 APPRECIATE HOW <br/> FAR YOU'VE COME.
               </p>
            </div>
          </div>

          {/* Decorative Elements - softer blur */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-leen-pink/40 rounded-full blur-[80px] -z-10 animate-float"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-leen-gold/5 rounded-full blur-[80px] -z-10 animate-float-reverse"></div>
        </div>

        {/* Text Column */}
        <div className="w-full md:w-1/2">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-leen-rose"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-leen-stone/60">The Architect</span>
            </div>

            <h2 className="font-serif text-6xl md:text-8xl text-leen-stone mb-6 leading-none">
                Aileen <br/>
                <span className="text-leen-rose italic block ml-16 md:ml-24 transform -translate-y-4">Hernandez</span>
            </h2>

            <div className="flex flex-wrap items-center gap-6 mb-12 ml-2">
                <p className="font-hand text-2xl text-leen-gold -rotate-2">est. 2025</p>
                <div className="h-px bg-leen-stone/10 w-12 md:w-24"></div>
                <p className="font-sans text-xs uppercase tracking-widest text-leen-stone/40">Houston, TX</p>
                <div className="h-px bg-leen-stone/10 w-12 md:w-24 hidden md:block"></div>
                 <a href="tel:2818005218" className="flex items-center gap-2 text-leen-stone/60 hover:text-leen-rose transition-colors group">
                    <Phone size={14} className="group-hover:animate-pulse" />
                    <span className="font-serif text-lg tracking-wider">281.800.5218</span>
                 </a>
            </div>

            <div className="space-y-8 font-sans font-light text-leen-stone/80 text-lg leading-loose">
                <p>
                Born July 10, 2005. At just 20 years old, Aileen Hernandez has redefined the landscape of physical discipline in Houston. 
                <strong className="text-leen-rose font-medium bg-leen-pink/20 px-1">Leen On Christ</strong> is not merely a play on her name; it is a declaration of dependence on a higher power through the medium of movement.
                </p>
                
                <p>
                Growing up, Aileen realized that traditional fitness focused solely on the aesthetic of the vessel, neglecting the spirit within. 
                She sought to bridge this gap. Her methodology weaves <span className="italic font-serif text-xl border-b border-leen-rose/30 pb-0.5">metaphysical doctrines</span> into the rigor of Pilates, ensuring that every contraction is an act of intention and every release is an act of surrender.
                </p>

                <p>
                "Perception dictates reality." This is the cornerstone of her practice. By subtly altering the environment—through color psychology, auditory affirmations, and subconscious visual cues—she guides her clients into a state where physical limitations dissolve.
                </p>
            </div>

            <div className="relative mt-16 mb-12 p-8 border-l-4 border-leen-rose bg-gradient-to-r from-leen-cream/50 to-transparent rounded-r-sm">
                <Quote size={48} className="absolute -top-6 -left-6 text-white fill-leen-rose/20 stroke-none" />
                <p className="font-serif text-2xl md:text-3xl italic text-leen-stone leading-relaxed mb-6 relative z-10">
                "When you align the spine, you align the life. My goal is to have you walk out of here not just with a stronger core, but with a reality that has fundamentally shifted towards abundance."
                </p>
                <p className="font-hand text-right text-2xl text-leen-rose">- Aileen</p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-leen-stone/10">
                <div className="flex flex-col">
                    <span className="font-serif text-4xl text-leen-stone mb-1">0</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Lives Shifted (Beginning)</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-leen-rose mb-2">Private Concierge (AI Agent)</span>
                    <a href="tel:2818005218" className="font-serif text-3xl text-leen-stone hover:text-leen-rose transition-colors decoration-leen-rose/30 underline decoration-1 underline-offset-4">
                      281.800.5218
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};