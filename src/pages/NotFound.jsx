import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Oravox</title>
      </Helmet>

      <div className="pt-24 min-h-screen bg-brand-dark flex items-center justify-center overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          {/* Large 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[120px] sm:text-[160px] font-bold leading-none text-gradient-silver select-none mb-2"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="font-sans text-xl font-semibold text-white">
              Signal Lost
            </h2>
            <p className="text-sm text-brand-muted font-light leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to the main frequency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 border border-brand-border hover:border-brand-accent text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
            >
              <span>Browse Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
