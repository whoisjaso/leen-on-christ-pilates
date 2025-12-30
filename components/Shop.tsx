import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Check, Share2, Heart, Zap } from 'lucide-react';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Grip Socks - Petal Pink',
    price: 18,
    description: 'Ground yourself with stability. Non-slip, breathable cotton blend.',
    category: 'apparel',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'The Halo Ring',
    price: 45,
    description: 'A resistance ring tailored to tone and sculpture the inner thighs.',
    category: 'equipment',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Anointing Oil Roller',
    price: 32,
    description: 'Frankincense and Myrrh blend for post-workout recovery.',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400&auto=format&fit=crop'
  }
];

export const Shop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart, toggleSaved, savedItems } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product); // Opens drawer (default behavior)
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart(product, true); // Silent add - does not open drawer
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleShare = async (product: Product) => {
    const shareData = {
      title: 'Leen On Christ Boutique',
      text: `Discover ${product.name} at Leen On Christ. ${product.description}`,
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setSharedId(product.id);
        setTimeout(() => setSharedId(null), 2000);
      }
    } catch {
      // Share failed silently
    }
  };

  return (
    <div ref={sectionRef} className="bg-white min-h-screen py-24 px-6 transition-colors duration-1000">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl text-leen-stone mb-4">The Boutique</h2>
          <p className="font-sans font-light text-leen-stone/60">Tools for your temple.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PRODUCTS.map((product, index) => {
            const isSaved = savedItems.some(item => item.id === product.id);
            return (
              <div 
                key={product.id} 
                className="group transition-all duration-700 ease-out"
                style={{ transitionDelay: `${index * 150}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="relative overflow-hidden bg-leen-cream mb-6 aspect-[4/5] shadow-sm group-hover:shadow-lg group-hover:animate-glow transition-all duration-500 rounded-sm">
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.description}`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-95"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Right Controls Container */}
                  <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
                    
                    {/* Quick Add Button (Silent) */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product);
                        }}
                        className="p-2.5 bg-leen-gold text-white rounded-full hover:bg-leen-stone transition-all duration-500 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-x-[10px] sm:group-hover:translate-x-0 shadow-lg relative z-10 active:scale-90"
                        aria-label={`Quick add ${product.name} to cart`}
                    >
                        <Zap size={16} fill="currentColor" strokeWidth={1} />
                        {addedId === product.id && (
                          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-leen-stone text-white text-[10px] py-1 px-3 rounded-full opacity-0 animate-fade-in whitespace-nowrap pointer-events-none tracking-widest uppercase">
                              Spirit Aligned
                          </span>
                        )}
                    </button>

                    {/* Share Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShare(product);
                        }}
                        className="p-2.5 bg-white/80 backdrop-blur-md rounded-full text-leen-stone hover:bg-leen-rose hover:text-white transition-all duration-500 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-x-[10px] sm:group-hover:translate-x-0 shadow-sm relative"
                        aria-label={`Share ${product.name}`}
                    >
                        {sharedId === product.id ? <Check size={16} /> : <Share2 size={16} strokeWidth={1.5} />}
                        {sharedId === product.id && (
                          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-leen-stone text-white text-[10px] py-1 px-3 rounded-full opacity-0 animate-fade-in whitespace-nowrap pointer-events-none tracking-widest uppercase">
                              Copied
                          </span>
                        )}
                    </button>

                    {/* Save for Later Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(product);
                            if (!isSaved) {
                                setSavedId(product.id);
                                setTimeout(() => setSavedId(null), 2000);
                            }
                        }}
                        className={`p-2.5 bg-white/80 backdrop-blur-md rounded-full transition-all duration-500 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-x-[10px] sm:group-hover:translate-x-0 shadow-sm delay-75 hover:bg-leen-pink ${isSaved ? 'text-leen-rose' : 'text-leen-stone hover:text-leen-rose'} relative`}
                        aria-label={isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name} for later`}
                    >
                        <Heart size={16} strokeWidth={1.5} className={isSaved ? 'fill-leen-rose' : ''} />
                        {savedId === product.id && (
                          <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-leen-stone text-white text-[10px] py-1 px-3 rounded-full opacity-0 animate-fade-in whitespace-nowrap pointer-events-none tracking-widest uppercase">
                              Saved to Sanctuary
                          </span>
                        )}
                    </button>
                  </div>

                  {/* Added Confirmation (Top Left) */}
                  <div 
                    className={`absolute top-3 left-3 z-30 transition-all duration-500 pointer-events-none ${
                      addedId === product.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-2'
                    }`}
                  >
                     <div className="bg-leen-stone/90 backdrop-blur-md text-leen-cream px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-leen-rose/20">
                        <Check size={12} className="text-leen-rose" />
                        <span className="font-sans text-[10px] uppercase tracking-widest">Added to Cart!</span>
                     </div>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`absolute bottom-0 left-0 w-full py-4 text-xs uppercase tracking-widest transition-all duration-500 backdrop-blur-sm flex items-center justify-center gap-2
                      ${addedId === product.id 
                        ? 'bg-leen-rose text-white translate-y-0' 
                        : 'bg-white/90 translate-y-full group-hover:translate-y-0 hover:bg-leen-rose hover:text-white'
                      }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check size={14} /> Added
                      </>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
                <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-serif text-xl text-leen-stone mb-1">{product.name}</h3>
                  <p className="font-sans text-xs text-gray-400 mb-2 uppercase tracking-wide">{product.category}</p>
                  <p className="font-sans text-leen-rose">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};