import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    removeFromCart, 
    addToCart, 
    cartTotal, 
    promoCode, 
    applyPromoCode, 
    removePromoCode,
    discountPercent 
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCode = () => {
    const success = applyPromoCode(inputCode);
    if (!success) {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2000);
    } else {
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-leen-stone/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-leen-cream h-full shadow-2xl flex flex-col animate-fade-in border-l border-white/50">
        
        {/* Header */}
        <div className="p-6 border-b border-leen-stone/5 flex justify-between items-center bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-leen-stone">
            <ShoppingBag size={20} />
            <span className="font-serif text-xl tracking-wide">Your Vessel</span>
            <span className="text-xs bg-leen-rose text-white px-2 py-0.5 rounded-full">{cart.reduce((a,c) => a + c.quantity, 0)}</span>
          </div>
          <button onClick={closeCart} className="text-leen-stone/50 hover:text-leen-rose transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={48} className="mb-4 text-leen-rose/30" />
              <p className="font-serif text-xl text-leen-stone">Your vessel is light.</p>
              <p className="text-xs uppercase tracking-widest mt-2">Fill it with tools for your journey.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 animate-fade-in group">
                <div className="w-20 h-24 bg-white shadow-sm overflow-hidden rounded-sm shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg text-leen-stone leading-none mb-1">{item.name}</h4>
                    <p className="text-[10px] uppercase text-gray-400 tracking-wider">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 border border-leen-stone/10 rounded-full px-2 py-1">
                      <button 
                        onClick={() => item.quantity > 1 ? addToCart({...item, quantity: -1}) /* Logic adjustment needed in context for full decrement, simplified here */ : removeFromCart(item.id)}
                        className="text-leen-stone/50 hover:text-leen-rose"
                      >
                         <Minus size={12} />
                      </button>
                      <span className="text-xs font-sans w-3 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => addToCart(item)}
                         className="text-leen-stone/50 hover:text-leen-rose"
                      >
                         <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-sans text-leen-rose font-medium">${item.price * item.quantity}</p>
                  </div>
                </div>
                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="self-start text-gray-300 hover:text-red-400 transition-colors"
                >
                    <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-leen-stone/5 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
            
            {/* Promo Code Section */}
            <div className="mb-6">
              {promoCode ? (
                <div className="flex justify-between items-center bg-leen-gold/10 p-3 rounded border border-leen-gold/20">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-leen-gold" />
                    <span className="text-xs uppercase tracking-widest text-leen-gold font-bold">{promoCode} Applied</span>
                  </div>
                  <button onClick={removePromoCode} className="text-xs text-leen-stone/50 hover:text-leen-stone underline">Remove</button>
                </div>
              ) : (
                <div className="relative">
                   <input 
                    type="text" 
                    placeholder="Have a Promo Code?"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className={`w-full bg-leen-cream/50 border ${codeError ? 'border-red-300' : 'border-leen-stone/10'} px-4 py-3 text-sm focus:outline-none focus:border-leen-rose transition-colors uppercase placeholder:normal-case`}
                   />
                   <button 
                    onClick={handleApplyCode}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-leen-stone hover:text-leen-rose uppercase tracking-widest disabled:opacity-30"
                    disabled={!inputCode}
                   >
                     Apply
                   </button>
                </div>
              )}
              {codeError && <p className="text-[10px] text-red-400 mt-1 ml-1">Invalid Code. Try 'HEAL20'.</p>}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-6 font-sans text-sm">
              <div className="flex justify-between text-leen-stone/60">
                <span>Subtotal</span>
                <span>${(cartTotal / (1 - discountPercent)).toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                 <div className="flex justify-between text-leen-gold">
                    <span>Discount</span>
                    <span>- ${(cartTotal / (1 - discountPercent) * discountPercent).toFixed(2)}</span>
                 </div>
              )}
              <div className="flex justify-between text-leen-stone text-xl font-serif pt-4 border-t border-dashed border-gray-200">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCheckingOut(true)}
              disabled={isCheckingOut}
              className="w-full bg-leen-stone text-white py-4 flex justify-center items-center gap-3 hover:bg-leen-rose transition-all duration-300 group shadow-lg"
            >
              {isCheckingOut ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Proceed to Checkout</span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <ShieldCheck size={16} className="text-white/70" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};