import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Heart, Instagram, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavigationProps {
  setCurrentPage: (page: string) => void;
  currentPage: string;
}

export const Navigation: React.FC<NavigationProps> = ({ setCurrentPage, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, savedCount, openCart, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh'; // Lock height for mobile
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
    return () => {
       document.body.style.overflow = 'unset';
       document.body.style.height = 'auto';
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Sanctuary', id: 'home' },
    { name: 'The Founder', id: 'founder' },
    { name: 'Offerings', id: 'booking' },
    { name: 'Covenant', id: 'memberships' },
    { name: 'Boutique', id: 'shop' },
    { name: 'Little Angels', id: 'daycare' },
  ];

  return (
    <>
      {/* Main Navigation Bar - Hides when Cart is Open */}
      <nav 
        className={`fixed w-full z-[150] transition-all duration-700 ${
          isCartOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${
          isMenuOpen 
            ? 'bg-transparent' 
            : (scrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-xl shadow-sm py-5 md:py-6' : 'bg-transparent py-8 md:py-14')
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center w-full">
          
          {/* Logo Container */}
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer flex flex-col items-center group relative shrink-0 z-[160]"
          >
            <div className={`font-serif text-xl md:text-2xl tracking-[0.25em] text-leen-stone group-hover:text-leen-gold transition-colors duration-500 flex items-center`}>
              <span>LEEN</span>
              <span className="relative inline-flex items-center justify-center h-[0.9em] w-[0.9em] mx-[0.15em] text-leen-stone group-hover:text-leen-gold transition-colors duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full animate-pulse-subtle">
                   <circle cx="12" cy="12" r="9" className="opacity-40" />
                   {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                     <path 
                      key={angle}
                      d="M12 2.5 L12 4.5 M12.5 3.5 L11.5 3.5" 
                      transform={`rotate(${angle} 12 12)`} 
                      strokeLinecap="round" 
                      className="opacity-80"
                     />
                   ))}
                </svg>
              </span>
              <span className="mr-[0.1em]">N</span>
              <span className="ml-[0.2em]">CHRIS</span>
              <span className="relative inline-flex items-center justify-center h-[1.15em] w-[0.7em] ml-[0.1em] text-leen-rose/80 group-hover:text-leen-rose transition-colors duration-500 -translate-y-[0.08em]">
                 <svg viewBox="0 0 24 32" fill="currentColor" className="w-full h-full drop-shadow-sm">
                   <rect x="11" y="2" width="2" height="28" rx="0.5" />
                   <rect x="3" y="10" width="18" height="1.5" rx="0.3" />
                   <g className="opacity-90">
                      <circle cx="12" cy="8.5" r="1.6" />
                      <path d="M11 11.5 h2 v10 h-2 z" /> 
                      <path d="M5 11 L19 11 L19 11.8 L5 11.8 Z" />
                   </g>
                 </svg>
              </span>
            </div>
            <span className="text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-leen-rose mt-1 group-hover:tracking-[0.5em] transition-all duration-700">
              Pilates by Aileen
            </span>
          </div>

          {/* Desktop Nav - Better Spacing */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14 2xl:gap-20 mx-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-[11px] xl:text-[12px] uppercase tracking-[0.25em] hover:text-leen-rose transition-all duration-500 relative group py-2 ${currentPage === link.id ? 'text-leen-rose font-medium' : 'text-leen-stone'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-leen-rose transition-all duration-500 ${currentPage === link.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100'}`}></span>
              </button>
            ))}
          </div>

          {/* Action Icons - More Breathing Room */}
          <div className="flex items-center gap-5 md:gap-10 shrink-0 z-[160]">
            <button 
              onClick={() => setCurrentPage('admin')} 
              className="p-2 text-leen-stone hover:text-leen-rose transition-all duration-300 hover:scale-110 hidden sm:block"
              aria-label="Admin Dashboard"
            >
              <User size={20} strokeWidth={1.2} />
            </button>
            
            <button 
              onClick={() => {
                setCurrentPage('saved');
                setIsMenuOpen(false);
              }} 
              className="p-2 text-leen-stone hover:text-leen-rose transition-all duration-300 relative hover:scale-110"
              aria-label="Saved items"
            >
              <Heart size={20} strokeWidth={1.2} className={currentPage === 'saved' ? 'fill-leen-rose/20 text-leen-rose' : ''} />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 bg-leen-stone text-white text-[9px] font-sans w-4 h-4 flex items-center justify-center rounded-full shadow-sm animate-fade-in ring-2 ring-white">
                  {savedCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => {
                openCart();
                setIsMenuOpen(false);
              }}
              className="p-2 text-leen-stone hover:text-leen-rose transition-all duration-300 relative hover:scale-110"
              aria-label="Boutique cart"
            >
              <ShoppingBag size={20} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-leen-rose text-white text-[9px] font-sans w-4 h-4 flex items-center justify-center rounded-full shadow-sm animate-fade-in ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-leen-stone hover:text-leen-rose transition-all duration-300 outline-none relative"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} strokeWidth={1.2} /> : <Menu size={26} strokeWidth={1.2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Clean, Solid & Centered */}
      <div 
        className={`lg:hidden fixed inset-0 z-[140] bg-[#FDFBF7] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Navigation Content Container */}
        {/* Increased top padding (pt-36) to push content down from header */}
        <div className="flex-1 flex flex-col pt-36 pb-8 px-6 overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Links Section - Centered Vertically in available space */}
          {/* justify-center ensures it sits in the middle of the 'flex-1' space */}
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-7 min-h-0">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`font-serif text-3xl md:text-4xl transition-all duration-700 tracking-wider w-full text-center py-1 group ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${currentPage === link.id ? 'text-leen-rose italic font-light' : 'text-leen-stone'}`}
                style={{ transitionDelay: `${index * 50 + 150}ms` }}
              >
                <span className="relative inline-block">
                  {link.name}
                  {currentPage === link.id && (
                     <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-leen-gold animate-pulse"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-leen-rose transition-all duration-500 group-hover:w-full opacity-50"></span>
                </span>
              </button>
            ))}
          </div>

          {/* Divider - Made smaller */}
          <div className={`shrink-0 w-8 h-px bg-leen-stone/10 mx-auto my-6 transition-all duration-1000 delay-500 ${isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>

          {/* Bottom Info Section - Removed redundant Quick Actions (Cart/Saved) as they are in the header */}
          <div className={`shrink-0 flex flex-col items-center gap-4 transition-all duration-700 delay-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
             
             <a href="tel:2818005218" className="font-serif text-lg tracking-wide text-leen-stone/70 hover:text-leen-rose transition-colors italic">
               281.800.5218
             </a>
             
             <div className="flex items-center gap-6 text-leen-stone/30">
               <Instagram size={18} />
               <Phone size={18} />
             </div>
             
             <p className="text-[9px] uppercase tracking-[0.4em] text-leen-stone/20 font-bold mt-2">
               HOUSTON
             </p>
          </div>
        </div>
      </div>
    </>
  );
};