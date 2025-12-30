import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  savedItems: Product[];
  addToCart: (product: Product, silent?: boolean) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleSaved: (product: Product) => void;
  moveToCart: (product: Product) => void;
  cartCount: number;
  savedCount: number;
  
  // Drawer State
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Promo Logic
  promoCode: string | null;
  discountPercent: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('leenOnChristCart');
    const savedForLater = localStorage.getItem('leenOnChristSaved');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage");
      }
    }

    if (savedForLater) {
      try {
        setSavedItems(JSON.parse(savedForLater));
      } catch (e) {
        console.error("Failed to parse saved items from local storage");
      }
    }
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('leenOnChristCart', JSON.stringify(cart));
  }, [cart]);

  // Save to local storage whenever saved items change
  useEffect(() => {
    localStorage.setItem('leenOnChristSaved', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product: Product, silent: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    if (!silent) {
      setIsCartOpen(true); // Auto open cart on add if not silent
    }
  };

  const removeFromCart = (productId: string) => {
     setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setDiscountPercent(0);
  };

  const toggleSaved = (product: Product) => {
    setSavedItems(prev => {
      const isSaved = prev.some(item => item.id === product.id);
      if (isSaved) {
        return prev.filter(item => item.id !== product.id);
      } else {
        const inCart = cart.some(item => item.id === product.id);
        if (inCart) {
          removeFromCart(product.id);
        }
        return [...prev, product];
      }
    });
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
    setSavedItems(prev => prev.filter(item => item.id !== product.id));
  };

  const applyPromoCode = (code: string): boolean => {
    const normalizedCode = code.toUpperCase().trim();
    // Simple backend simulation for codes
    const VALID_CODES: Record<string, number> = {
      'HEAL20': 0.20,
      'ALIGNED': 0.10,
      'NEWCREATION': 0.15,
      'LEENONCHRIST': 0.25
    };

    if (VALID_CODES[normalizedCode]) {
      setPromoCode(normalizedCode);
      setDiscountPercent(VALID_CODES[normalizedCode]);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscountPercent(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const savedCount = savedItems.length;
  
  const rawTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartTotal = rawTotal - (rawTotal * discountPercent);

  return (
    <CartContext.Provider value={{ 
      cart, 
      savedItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      toggleSaved, 
      moveToCart,
      cartCount,
      savedCount,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      promoCode,
      discountPercent,
      applyPromoCode,
      removePromoCode,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};