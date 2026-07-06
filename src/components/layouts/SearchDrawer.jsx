import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const SearchDrawer = () => {
  const { searchOpen, setSearchOpen, products } = useContext(ShopContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input when open
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 150);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  // Live filter results
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit live suggestions to 5 items

    setResults(filtered);
  }, [query, products]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim() === '') return;

    setSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const handleProductClick = (productId) => {
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 z-50 bg-[#121214] border-b border-brand-border shadow-2xl py-8 px-6"
          >
            <div className="max-w-3xl mx-auto">
              {/* Top Row: Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-brand-muted hover:text-white transition-colors"
                  aria-label="Close Search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-6">
                <Search className="absolute left-4 w-5 h-5 text-brand-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for premium earbuds, headphones, or soundbars..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-[#1C1C1E] border border-brand-border focus:border-brand-accent focus:outline-none rounded-lg pl-12 pr-16 py-4 text-sm font-light text-white placeholder-brand-muted transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-3 bg-brand-accent hover:bg-brand-accent/90 text-white text-[10px] tracking-widest uppercase font-semibold px-4 py-2 rounded transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Live Search Results */}
              {results.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-brand-muted mb-2">
                    Suggested Products
                  </h4>
                  <div className="bg-[#1C1C1E] rounded-lg border border-brand-border divide-y divide-brand-border overflow-hidden">
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-brand-border/20 text-left transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-brand-card rounded border border-brand-border flex items-center justify-center relative overflow-hidden flex-shrink-0">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-[8px] font-bold text-brand-muted">ORAVOX</span>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white group-hover:text-brand-accent transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-brand-muted tracking-wider uppercase">
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs font-semibold text-white space-x-2">
                          <span>${product.price.toFixed(2)}</span>
                          <ArrowRight className="w-4.5 h-4.5 text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions Categories */}
              {query === '' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    'Wireless Earbuds',
                    'Over-Ear Headphones',
                    'Bluetooth Speakers',
                    'Soundbars'
                  ].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/shop?category=${encodeURIComponent(category)}`);
                      }}
                      className="bg-[#1C1C1E] border border-brand-border hover:border-brand-accent rounded p-3 text-center transition-colors group"
                    >
                      <span className="text-[10px] tracking-widest uppercase text-brand-muted group-hover:text-white transition-colors">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
