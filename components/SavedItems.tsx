import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Heart } from 'lucide-react';

export const SavedItems: React.FC = () => {
  const { savedItems, toggleSaved, moveToCart } = useCart();

  return (
    <div className="min-h-screen py-24 px-6 bg-leen-cream/30 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4 text-leen-rose">
             <Heart className="fill-leen-rose/20" size={24} />
          </div>
          <h2 className="font-serif text-5xl text-leen-stone mb-4">Your Sanctuary List</h2>
          <p className="font-sans font-light text-leen-stone/60">Items saved for a future reality.</p>
        </div>

        {savedItems.length === 0 ? (
          <div className="text-center py-20 animate-fade-in opacity-50">
            <p className="font-serif text-2xl text-leen-stone/40 italic">Your sanctuary is currently empty.</p>
            <p className="text-xs uppercase tracking-widest text-leen-stone/30 mt-4">Visit the boutique to curate your space.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItems.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow animate-fade-in border border-leen-pink/20">
                <div className="relative aspect-square mb-6 overflow-hidden bg-leen-cream">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => toggleSaved(product)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-400 text-gray-300 transition-colors"
                    title="Remove from saved"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <h3 className="font-serif text-xl text-leen-stone mb-2">{product.name}</h3>
                <p className="font-sans text-xs text-gray-400 uppercase tracking-wide mb-4">{product.category}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-sans text-leen-rose">${product.price}</span>
                  <button 
                    onClick={() => moveToCart(product)}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest bg-leen-stone text-white px-4 py-2 hover:bg-leen-rose transition-colors"
                  >
                    <ShoppingBag size={14} />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};