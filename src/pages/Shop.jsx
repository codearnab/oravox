import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  PackageOpen,
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ─── product card ─── */
const ShopProductCard = ({ product, index }) => {
  const { addToCart, favorites, toggleFavorite } = useContext(ShopContext);
  const isFav = favorites.includes(product.id);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="group glass-card glass-card-hover rounded-2xl overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-56 bg-gradient-to-br from-brand-card to-brand-dark flex items-center justify-center overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="font-sans font-bold text-2xl tracking-[0.3em] text-brand-border/60 select-none">
            ORAVOX
          </span>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-brand-accent/90 text-white text-[8px] tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Favorite toggle */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-brand-accent/30"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'text-brand-accent fill-brand-accent' : 'text-white/70'
            }`}
          />
        </button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <button
            onClick={() => addToCart(product.id)}
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white text-[10px] tracking-widest uppercase font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-brand-muted font-medium">
          {product.category}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="block font-sans text-sm font-semibold text-white hover:text-brand-accent transition-colors"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between pt-1">
          <span className="font-sans text-lg font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-brand-muted">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── main component ─── */
const Shop = () => {
  const { products, favorites } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params
  const urlCategory = searchParams.get('category') || '';
  const urlSearch = searchParams.get('search') || '';
  const urlFilter = searchParams.get('filter') || '';

  // Local filter state
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [urlCategory] : []
  );
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(urlFilter === 'favorites');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL params on mount
  useEffect(() => {
    if (urlCategory && !selectedCategories.includes(urlCategory)) {
      setSelectedCategories([urlCategory]);
    }
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlFilter === 'favorites') setShowFavoritesOnly(true);
  }, []);

  // All unique categories
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Favorites only
    if (showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategories, sortBy, showFavoritesOnly, favorites]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy('default');
    setSearchQuery('');
    setShowFavoritesOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery || showFavoritesOnly || sortBy !== 'default';

  /* ─── Sidebar content (reused desktop + mobile) ─── */
  const FiltersContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <label className="font-sans text-[10px] tracking-widest uppercase font-bold text-brand-muted block mb-3">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-brand-card border border-brand-border focus:border-brand-accent focus:outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-brand-muted transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="font-sans text-[10px] tracking-widest uppercase font-bold text-brand-muted block mb-3">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`flex items-center w-full text-left text-xs py-1.5 transition-colors ${
                selectedCategories.includes(cat)
                  ? 'text-brand-accent font-medium'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded border mr-3 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat)
                    ? 'border-brand-accent bg-brand-accent'
                    : 'border-brand-border'
                }`}
              >
                {selectedCategories.includes(cat) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites only */}
      <div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center w-full text-left text-xs py-1.5 transition-colors ${
            showFavoritesOnly ? 'text-brand-accent font-medium' : 'text-brand-muted hover:text-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 mr-2 ${
              showFavoritesOnly ? 'fill-brand-accent text-brand-accent' : ''
            }`}
          />
          Favorites Only
        </button>
      </div>

      {/* Sort */}
      <div>
        <label className="font-sans text-[10px] tracking-widest uppercase font-bold text-brand-muted block mb-3">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-brand-card border border-brand-border focus:border-brand-accent focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white appearance-none cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A–Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
        </div>
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-[10px] tracking-widest uppercase text-brand-accent hover:underline font-semibold"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop Premium Audio | Oravox</title>
        <meta
          name="description"
          content="Browse the complete Oravox collection of premium earbuds, headphones, speakers, soundbars and microphones."
        />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-2">
              Collection
            </p>
            <div className="flex items-end justify-between">
              <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white">
                {showFavoritesOnly
                  ? 'Your Favorites'
                  : selectedCategories.length === 1
                  ? selectedCategories[0]
                  : 'All Products'}
              </h1>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden flex items-center space-x-2 text-xs text-brand-muted hover:text-white transition-colors border border-brand-border rounded-lg px-4 py-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            <p className="text-sm text-brand-muted mt-2">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          <div className="flex gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <div className="sticky top-28">
                <FiltersContent />
              </div>
            </aside>

            {/* Mobile Filters Drawer */}
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 lg:hidden"
              >
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#121214] border-r border-brand-border p-6 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-sans text-sm tracking-widest uppercase font-bold text-white">
                      Filters
                    </h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X className="w-5 h-5 text-brand-muted hover:text-white" />
                    </button>
                  </div>
                  <FiltersContent />
                </motion.div>
              </motion.div>
            )}

            {/* Product Grid */}
            <div className="flex-grow">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <PackageOpen className="w-16 h-16 text-brand-border mb-6" />
                  <h3 className="font-sans text-lg font-semibold text-white mb-2">
                    No Products Found
                  </h3>
                  <p className="text-sm text-brand-muted mb-6 max-w-sm">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-xs tracking-widest uppercase text-brand-accent hover:underline font-semibold"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product, i) => (
                    <ShopProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
