import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ChevronRight,
  Lock,
  CreditCard,
  Truck,
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
  const {
    cart,
    products,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    discount,
    promoCode,
    clearCart,
    setCheckoutData,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const onSubmit = (data) => {
    // Generate an order number
    const orderNumber = `ORV-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    setCheckoutData({
      ...data,
      orderNumber,
      items: cart.map((item) => {
        const p = products.find((pr) => pr.id === item.id);
        return {
          id: item.id,
          name: p?.name || '',
          price: p?.price || 0,
          quantity: item.quantity,
        };
      }),
      subtotal: getSubtotal(),
      discount: getDiscountAmount(),
      shipping: getShippingCost(),
      total: getTotal(),
      promoCode,
    });

    clearCart();
    navigate('/order-success');
  };

  if (cart.length === 0) return null;

  const inputClasses = (field) =>
    `w-full bg-brand-card border ${
      errors[field] ? 'border-brand-accent' : 'border-brand-border'
    } focus:border-brand-accent focus:outline-none rounded-lg px-4 py-3 text-sm text-white placeholder-brand-muted transition-colors`;

  return (
    <>
      <Helmet>
        <title>Checkout | Oravox</title>
        <meta name="description" content="Secure checkout for your Oravox order." />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-brand-muted space-x-2 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Checkout</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-white mb-10"
          >
            Checkout
          </motion.h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-grow space-y-10"
              >
                {/* Contact */}
                <section>
                  <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-muted mb-6 flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Contact Information</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={inputClasses('email')}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-brand-accent mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone number (optional)"
                        {...register('phone')}
                        className={inputClasses('phone')}
                      />
                    </div>
                  </div>
                </section>

                {/* Shipping */}
                <section>
                  <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-muted mb-6 flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Shipping Address</span>
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="First name"
                          {...register('firstName', { required: 'First name is required' })}
                          className={inputClasses('firstName')}
                        />
                        {errors.firstName && (
                          <p className="text-[10px] text-brand-accent mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last name"
                          {...register('lastName', { required: 'Last name is required' })}
                          className={inputClasses('lastName')}
                        />
                        {errors.lastName && (
                          <p className="text-[10px] text-brand-accent mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Street address"
                        {...register('address', { required: 'Address is required' })}
                        className={inputClasses('address')}
                      />
                      {errors.address && (
                        <p className="text-[10px] text-brand-accent mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      {...register('address2')}
                      className={inputClasses('address2')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          {...register('city', { required: 'City is required' })}
                          className={inputClasses('city')}
                        />
                        {errors.city && (
                          <p className="text-[10px] text-brand-accent mt-1">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State / Province"
                          {...register('state', { required: 'State is required' })}
                          className={inputClasses('state')}
                        />
                        {errors.state && (
                          <p className="text-[10px] text-brand-accent mt-1">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="ZIP / Postal code"
                          {...register('zip', { required: 'ZIP code is required' })}
                          className={inputClasses('zip')}
                        />
                        {errors.zip && (
                          <p className="text-[10px] text-brand-accent mt-1">{errors.zip.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
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

                  {/* Items */}
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {cart.map((item) => {
                      const product = products.find((p) => p.id === item.id);
                      if (!product) return null;
                      return (
                        <div key={item.id} className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 bg-brand-card rounded-lg border border-brand-border flex items-center justify-center relative overflow-hidden flex-shrink-0">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-[7px] font-bold text-brand-border/60 tracking-wider">
                                O
                              </span>
                            )}
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-muted/80 text-[9px] font-bold text-white flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <p className="text-xs font-medium text-white">{product.name}</p>
                            <p className="text-[10px] text-brand-muted">{product.category}</p>
                          </div>
                          <span className="text-xs font-semibold text-white">
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-brand-border pt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-brand-muted">
                      <span>Subtotal</span>
                      <span className="text-white">${getSubtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount ({promoCode})</span>
                        <span>-${getDiscountAmount().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-brand-muted">
                      <span>Shipping</span>
                      <span className="text-white">
                        {getShippingCost() === 0 ? (
                          <span className="text-green-500">Free</span>
                        ) : (
                          `$${getShippingCost().toFixed(2)}`
                        )}
                      </span>
                    </div>
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
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Place Order</span>
                  </button>

                  <p className="text-[10px] text-brand-muted text-center font-light">
                    This is a demo store. No real payment is processed.
                  </p>
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
