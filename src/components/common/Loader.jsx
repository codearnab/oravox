import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark">
        {/* Pulsing high-tech logo ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full border border-brand-accent/20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full border-2 border-t-brand-accent border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <span className="absolute font-sans font-bold text-xs tracking-widest text-white mt-1">O</span>
        </div>
        <motion.p
          className="mt-6 font-sans text-xs tracking-widest text-brand-muted uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Oravox Acoustics
        </motion.p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-border border-t-brand-accent animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
