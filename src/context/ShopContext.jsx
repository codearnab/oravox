import React, { createContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import blogsData from '../data/blogs.json';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [products] = useState(productsData);
  const [blogs] = useState(blogsData);
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('oravox_cart');
      const parsed = localCart ? JSON.parse(localCart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const localFavs = localStorage.getItem('oravox_favorites');
      const parsed = localFavs ? JSON.parse(localFavs) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });
  
  // UI states
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // in percent (e.g. 10 for 10%)
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    localStorage.setItem('oravox_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('oravox_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (productId, quantity = 1) => {
    const parsedQty = parseInt(quantity, 10) || 1;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + parsedQty } : item
        );
      }
      return [...prevCart, { id: productId, quantity: parsedQty }];
    });
    // Automatically trigger cart drawer
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const parsedQty = parseInt(quantity, 10) || 0;
    if (parsedQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: parsedQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscount(0);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavs) => {
      if (prevFavs.includes(productId)) {
        return prevFavs.filter((id) => id !== productId);
      }
      return [...prevFavs, productId];
    });
  };

  const applyPromo = (code) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'ORAVOX10' || cleanCode === 'WELCOME10') {
      setPromoCode(cleanCode);
      setDiscount(10); // 10% discount
      return { success: true, message: 'Promo code applied successfully (10% off).' };
    }
    if (cleanCode === 'AUDIOVIP') {
      setPromoCode(cleanCode);
      setDiscount(20); // 20% discount
      return { success: true, message: 'VIP code applied successfully (20% off)!' };
    }
    return { success: false, message: 'Invalid coupon code.' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscount(0);
  };

  // Calculations
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const prodObj = products.find((p) => p.id === item.id);
      return total + (prodObj ? prodObj.price * item.quantity : 0);
    }, 0);
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discount) / 100;
  };

  const getShippingCost = () => {
    const sub = getSubtotal();
    if (sub === 0) return 0;
    return sub >= 150 ? 0 : 15.00; // Free shipping over $150
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getShippingCost();
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        blogs,
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        cartOpen,
        setCartOpen,
        searchOpen,
        setSearchOpen,
        promoCode,
        discount,
        applyPromo,
        removePromo,
        getCartCount,
        getSubtotal,
        getDiscountAmount,
        getShippingCost,
        getTotal,
        checkoutData,
        setCheckoutData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
