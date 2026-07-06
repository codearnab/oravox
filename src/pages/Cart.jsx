import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
  X,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const {
    cart,
    products,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    getCartCount,
    promoCode,
    discount,
    applyPromo,
    removePromo,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMessage(result);
    if (result.success) setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart | Oravox</title>
        </Helmet>
        <div className="pt-24 pb-20 min-h-screen bg-brand-dark flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-border flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 text-brand-muted" />
            </div>
            <h1 className="font-sans text-2xl font-bold text-white">Your Cart is Empty</h1>
            <p className="text-sm text-brand-muted font-light max-w-md">
              Explore our premium collection of high-fidelity audio devices and find the perfect addition to your soundstage.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-all duration-300"
            >
              <span>Browse Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Your Cart (${getCartCount()}) | Oravox`}</title>
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-brand-muted space-x-2 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Cart</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-white mb-10"
          >
            Shopping Cart
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-grow"
            >
              {/* Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-4 pb-4 border-b border-brand-border text-[10px] tracking-widest uppercase text-brand-muted font-bold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-brand-border">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  if (!product) return null;
                  const lineTotal = product.price * item.quantity;

                  return (
                    <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center py-6 px-4">
                      {/* Product */}
                      <div className="w-full sm:col-span-6 flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-card to-brand-dark rounded-lg border border-brand-border flex items-center justify-center relative overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-[9px] font-bold text-brand-border/60 tracking-wider select-none">
                              ORAVOX
                            </span>
                          )}
                        </div>
                        <div>
                          <Link
                            to={`/product/${product.id}`}
                            className="font-sans text-sm font-semibold text-white hover:text-brand-accent transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-[10px] text-brand-muted uppercase tracking-wider mt-0.5">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      {/* Mobil Price/Qty/Total row */}
                      <div className="w-full flex sm:contents items-center justify-between mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-brand-border/20 sm:border-t-0">
                        {/* Price */}
                        <div className="sm:col-span-2 text-left sm:text-center">
                          <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold sm:hidden block mb-1">Price</span>
                          <span className="text-sm text-brand-muted sm:text-white font-light">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center sm:justify-center">
                          <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold sm:hidden block mb-1">Quantity</span>
                          <div className="flex items-center border border-brand-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-2 text-brand-muted hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-semibold text-white min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-2 text-brand-muted hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total + Delete */}
                        <div className="sm:col-span-2 flex flex-col sm:flex-row items-end sm:items-center sm:justify-end gap-1.5 sm:gap-4">
                          <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold sm:hidden block">Total</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold text-white">
                              ${lineTotal.toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-brand-muted hover:text-brand-accent transition-colors"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions under items */}
              <div className="flex items-center justify-between pt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-brand-muted hover:text-white font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs tracking-widest uppercase text-brand-muted hover:text-brand-accent font-semibold transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-96 flex-shrink-0"
            >
              <div className="glass-card rounded-2xl p-6 sticky top-28 space-y-6">
                <h3 className="font-sans text-sm tracking-widest uppercase font-bold text-white">
                  Order Summary
                </h3>

                {/* Promo code */}
                <div>
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-400 font-medium">
                          {promoCode} ({discount}% off)
                        </span>
                      </div>
                      <button
                        onClick={removePromo}
                        className="text-green-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                        placeholder="Promo code"
                        className="flex-grow bg-brand-card border border-brand-border focus:border-brand-accent focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder-brand-muted transition-colors"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-brand-card border border-brand-border hover:border-brand-accent text-white text-[10px] tracking-widest uppercase font-semibold px-4 rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoMessage && !promoCode && (
                    <p className={`text-[10px] mt-2 ${promoMessage.success ? 'text-green-500' : 'text-brand-accent'}`}>
                      {promoMessage.message}
                    </p>
                  )}
                </div>

                {/* Cost breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${getSubtotal().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({discount}%)</span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span className="text-white font-medium">
                      {getShippingCost() === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `$${getShippingCost().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {getShippingCost() > 0 && (
                    <p className="text-[10px] text-brand-muted flex items-center space-x-1">
                      <Truck className="w-3 h-3" />
                      <span>Free shipping on orders over $150</span>
                    </p>
                  )}
                </div>

                <div className="border-t border-brand-border pt-4 flex justify-between items-center">
                  <span className="text-xs tracking-widest uppercase text-brand-muted font-bold">
                    Total
                  </span>
                  <span className="font-sans text-2xl font-bold text-white">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
