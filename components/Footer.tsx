import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-leen-cream border-t border-leen-stone/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-3xl text-leen-stone mb-4 flex items-center tracking-[0.1em]">
            <span>LEEN</span>
            
            {/* Crown of Thorns 'O' - Refined */}
            <span className="relative inline-flex items-center justify-center h-[0.9em] w-[0.9em] mx-[0.15em] text-leen-stone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
                 <circle cx="12" cy="12" r="9" className="opacity-40" />
                 {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                   <path 
                    key={angle}
                    d="M12 3 L12 5 M13 4 L11 4" 
                    transform={`rotate(${angle} 12 12)`} 
                    strokeLinecap="round" 
                    className="opacity-80"
                   />
                 ))}
              </svg>
            </span>

            <span className="mr-[0.1em]">N</span>
            <span className="ml-[0.1em]">CHRIS</span>
            
            {/* Cross 'T' - Proportional */}
            <span className="relative inline-flex items-center justify-center h-[1.1em] w-[0.7em] ml-[0.1em] -translate-y-[0.05em] text-leen-rose">
               <svg viewBox="0 0 24 32" fill="currentColor" className="w-full h-full">
                 <rect x="11.2" y="2" width="1.6" height="28" rx="0.5" />
                 <rect x="4" y="9" width="16" height="1.2" rx="0.3" />
                 <g className="opacity-90">
                    <circle cx="12" cy="7.5" r="1.4" />
                    <path d="M6 10 C 8 11, 11 11.5, 12 11.5 C 13 11.5, 16 11, 18 10 L 18 10.8 C 16 11.8, 13 12.3, 12 12.3 C 11 12.3, 8 11.8, 6 10.8 Z" />
                    <path d="M11 11 L13 11 L12.5 22 L11.5 22 Z" />
                 </g>
               </svg>
            </span>
          </h2>
          <p className="font-sans font-light text-leen-stone/60 max-w-sm">
            A metaphysical pilates studio in Houston, Texas. 
            Where faith meets form, and perception becomes reality.
            Owned by Aileen Hernandez.
          </p>
        </div>
        
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-leen-stone mb-6">Visit Us</h4>
          <p className="font-serif text-leen-stone/80 text-lg">123 Ascension Lane<br/>Houston, TX 77019</p>
          <p className="font-sans text-sm text-leen-stone/60 mt-4">Open Daily: 6am - 8pm</p>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-leen-stone mb-6">Connect</h4>
          <div className="flex gap-4 text-leen-stone mb-6">
            <Instagram className="hover:text-leen-rose cursor-pointer transition-colors" size={20} />
            <Facebook className="hover:text-leen-rose cursor-pointer transition-colors" size={20} />
            <Mail className="hover:text-leen-rose cursor-pointer transition-colors" size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-leen-stone/40">hello@leenonchrist.com</p>
            <a href="tel:2818005218" className="flex items-center gap-2 text-xs text-leen-stone/60 hover:text-leen-rose transition-colors group w-fit">
              <Phone size={12} className="group-hover:animate-pulse" />
              281.800.5218
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-leen-stone/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-leen-stone/30">
        <p>&copy; {new Date().getFullYear()} Leen On Christ. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Worship</span>
        </div>
      </div>
    </footer>
  );
};