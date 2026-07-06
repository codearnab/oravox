import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const OrderSuccess = () => {
  const { checkoutData } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkoutData) {
      navigate('/');
    }
  }, [checkoutData, navigate]);

  if (!checkoutData) return null;

  return (
    <>
      <Helmet>
        <title>Order Confirmed | Oravox</title>
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8"
          >
            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
            </motion.div>

            <div>
              <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-3">
                Order Confirmed!
              </h1>
              <p className="text-brand-muted font-light max-w-md mx-auto">
                Thank you for your purchase. Your order has been received and is being
                prepared for shipment.
              </p>
            </div>

            {/* Order Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6 sm:p-8 text-left space-y-6"
            >
              {/* Order number */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-brand-muted font-bold mb-1">
                    Order Number
                  </p>
                  <p className="font-sans text-sm font-semibold text-brand-accent tracking-wider">
                    {checkoutData.orderNumber}
                  </p>
                </div>
                <Package className="w-6 h-6 text-brand-muted" />
              </div>

              {/* Ship to */}
              <div className="pb-4 border-b border-brand-border">
                <p className="text-[10px] tracking-widest uppercase text-brand-muted font-bold mb-2">
                  Shipping To
                </p>
                <p className="text-sm text-white">
                  {checkoutData.firstName} {checkoutData.lastName}
                </p>
                <p className="text-sm text-brand-muted font-light">
                  {checkoutData.address}
                  {checkoutData.address2 ? `, ${checkoutData.address2}` : ''}
                </p>
                <p className="text-sm text-brand-muted font-light">
                  {checkoutData.city}, {checkoutData.state} {checkoutData.zip}
                </p>
                <p className="text-sm text-brand-muted font-light">{checkoutData.email}</p>
              </div>

              {/* Items */}
              <div className="pb-4 border-b border-brand-border">
                <p className="text-[10px] tracking-widest uppercase text-brand-muted font-bold mb-3">
                  Items Ordered
                </p>
                <div className="space-y-3">
                  {checkoutData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-white">
                        {item.name} <span className="text-brand-muted">×{item.quantity}</span>
                      </span>
                      <span className="text-white font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="text-white">${checkoutData.subtotal.toFixed(2)}</span>
                </div>
                {checkoutData.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({checkoutData.promoCode})</span>
                    <span>-${checkoutData.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className="text-white">
                    {checkoutData.shipping === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${checkoutData.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-border">
                  <span className="text-xs tracking-widest uppercase text-brand-muted font-bold">
                    Total
                  </span>
                  <span className="font-sans text-xl font-bold text-white">
                    ${checkoutData.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
