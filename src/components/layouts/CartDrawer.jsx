import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const CartDrawer = () => {
  const {
    cart,
    products,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getCartCount
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Dark Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-[#121214] border-l border-brand-border flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-brand-accent" />
                <h3 className="font-sans text-sm tracking-widest uppercase font-bold text-white">
                  Cart ({getCartCount()})
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-brand-muted hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-border/30 flex items-center justify-center text-brand-muted">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs tracking-widest uppercase font-bold text-white mb-1">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-brand-muted font-light max-w-[240px] mx-auto leading-relaxed">
                      Explore our premium acoustics to find the perfect addition to your soundstage.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/shop');
                    }}
                    className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent hover:underline pt-2"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cart.map((cartItem) => {
                  const product = products.find((p) => p.id === cartItem.id);
                  if (!product) return null;

                  return (
                    <div
                      key={cartItem.id}
                      className="flex space-x-4 pb-4 border-b border-brand-border last:border-b-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-brand-card rounded border border-brand-border flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-brand-border/60 flex items-center justify-center text-[10px] text-brand-muted tracking-wider select-none font-bold">
                            ORAVOX
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans text-xs tracking-wider text-white font-medium hover:text-brand-accent transition-colors">
                              <Link to={`/product/${product.id}`} onClick={() => setCartOpen(false)}>
                                {product.name}
                              </Link>
                            </h4>
                            <span className="font-sans text-xs font-semibold text-white ml-2">
                              ${(product.price * cartItem.quantity).toFixed(2)}
                            </span>
                          </div>
                          <span className="text-[10px] text-brand-muted font-light uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>

                        {/* Quantity and Actions Row */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-brand-border rounded">
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                              className="px-2 py-1 text-brand-muted hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs text-white font-medium min-w-[20px] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                              className="px-2 py-1 text-brand-muted hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(cartItem.id)}
                            className="text-brand-muted hover:text-brand-accent transition-colors"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-border bg-[#0D0D0E]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs text-brand-muted tracking-widest uppercase">Subtotal</span>
                  <span className="font-sans text-lg font-bold text-white">
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-sans text-xs tracking-widest uppercase font-semibold py-3.5 rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(210,31,60,0.4)]"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={handleViewCartClick}
                    className="w-full bg-transparent border border-brand-border hover:border-brand-accent text-white font-sans text-xs tracking-widest uppercase font-semibold py-3.5 rounded transition-colors duration-300"
                  >
                    View Shopping Cart
                  </button>
                </div>

                <p className="text-[10px] text-brand-muted text-center mt-4 font-light">
                  Free shipping eligible on orders over $150.00
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
