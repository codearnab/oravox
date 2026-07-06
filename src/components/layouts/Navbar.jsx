import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, Disc } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

import brandLogo from "@/assets/images/brandlogo.png";

const Navbar = () => {
  const { getCartCount, favorites, setCartOpen, setSearchOpen } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-accent/10 border border-brand-accent/30 group-hover:bg-brand-accent/20 transition-all duration-300">
              <Disc className="w-5 h-5 text-brand-accent animate-spin-slow group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-sans font-bold text-lg tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-brand-accent">
              ORAVOX
            </span> */}
            <img src={brandLogo} alt="brand logo" className="w-full h-24 object-contain max-w-[150px]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-sans text-xs tracking-widest uppercase transition-colors duration-300 hover:text-brand-accent ${isActive ? 'text-brand-accent font-medium' : 'text-brand-muted'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Icons Bar */}
          <div className="flex items-center space-x-3.5 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-brand-muted hover:text-white transition-colors p-1"
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Icon */}
            <Link
              to="/shop?filter=favorites"
              className="relative text-brand-muted hover:text-white transition-colors p-1"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-accent" />
              )}
            </Link>

            {/* Cart Icon with badge */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-brand-muted hover:text-white transition-colors p-1"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={getCartCount()}
                  className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-brand-accent text-[9px] font-sans font-bold text-white tracking-tighter"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-muted hover:text-white transition-colors p-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-20 z-30 bg-brand-dark/95 border-b border-brand-border backdrop-blur-lg flex flex-col p-6 space-y-6 md:hidden shadow-premium"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-sans text-sm tracking-widest uppercase transition-colors py-2 ${isActive ? 'text-brand-accent' : 'text-brand-muted'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
