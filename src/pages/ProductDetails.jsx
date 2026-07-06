import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Check,
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, favorites, toggleFavorite } = useContext(ShopContext);

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link
          to="/shop"
          className="text-brand-accent text-xs tracking-widest uppercase hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const tabs = [
    { key: 'features', label: 'Features' },
    { key: 'specs', label: 'Specifications' },
    { key: 'reviews', label: `Reviews (${product.reviewCount})` },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
        {half && (
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 opacity-60" />
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Oravox`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-xs text-brand-muted space-x-2 mb-10"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-white transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{product.name}</span>
          </motion.nav>

          {/* ─── Product Section ─── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-brand-card to-brand-dark border border-brand-border flex items-center justify-center overflow-hidden mb-4">
                {product.images?.[activeImage] ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-sans font-bold text-4xl tracking-[0.4em] text-brand-border/40 select-none">
                    ORAVOX
                  </span>
                )}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-brand-accent/90 text-white text-[9px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-brand-accent/8 blur-[80px]" />
              </div>

              {/* Thumbnails */}
              <div className="flex space-x-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg bg-gradient-to-br from-brand-card to-brand-dark border flex items-center justify-center relative overflow-hidden transition-all ${
                      activeImage === i
                        ? 'border-brand-accent'
                        : 'border-brand-border hover:border-brand-muted'
                    }`}
                  >
                    {img ? (
                      <img src={img} alt={`thumbnail-${i}`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[8px] font-bold text-brand-border/60">ORAVOX</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-2">
                  {product.category}
                </p>
                <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4">
                  {renderStars(product.rating)}
                  <span className="text-xs text-brand-muted">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-brand-muted font-light leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-4">
                <span className="font-sans text-3xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-green-500 flex items-center space-x-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>{product.status}</span>
                </span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-brand-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-brand-muted hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-semibold text-white min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-brand-muted hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product.id, quantity)}
                  className="flex-grow flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold py-3.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${
                    isFav
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                      : 'border-brand-border text-brand-muted hover:border-brand-accent hover:text-brand-accent'
                  }`}
                  aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-brand-accent' : ''}`} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-border">
                {[
                  { icon: <Truck className="w-4 h-4" />, text: 'Free shipping over $150' },
                  { icon: <RotateCcw className="w-4 h-4" />, text: '30-day returns' },
                  { icon: <Shield className="w-4 h-4" />, text: '2-year warranty' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-1.5 py-2">
                    <span className="text-brand-muted">{badge.icon}</span>
                    <span className="text-[10px] text-brand-muted font-light leading-tight">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Tabs Section ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tab Headers */}
            <div className="flex border-b border-brand-border mb-8 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`font-sans text-xs tracking-widest uppercase font-semibold px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-brand-accent text-brand-accent'
                      : 'border-transparent text-brand-muted hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'features' && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 max-w-2xl"
                >
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      <span className="text-sm text-brand-light/80 font-light leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {activeTab === 'specs' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-2xl"
                >
                  <div className="glass-card rounded-xl overflow-hidden">
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <div
                        key={key}
                        className={`flex justify-between px-6 py-4 ${
                          i % 2 === 0 ? 'bg-brand-card/30' : ''
                        }`}
                      >
                        <span className="text-xs text-brand-muted font-medium uppercase tracking-wider">
                          {key}
                        </span>
                        <span className="text-sm text-white font-light text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 max-w-2xl"
                >
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="glass-card rounded-xl p-6 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent text-xs font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {review.name}
                            </p>
                            <p className="text-[10px] text-brand-muted">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-brand-muted font-light leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ─── Related Products ─── */}
          {relatedProducts.length > 0 && (
            <section className="mt-24">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-2">
                    You May Also Like
                  </p>
                  <h2 className="font-sans text-2xl font-bold text-white">
                    Related Products
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="text-xs tracking-widest uppercase text-brand-muted hover:text-brand-accent transition-colors font-semibold"
                >
                  View All
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
                  >
                    <Link to={`/product/${p.id}`}>
                      <div className="h-48 bg-gradient-to-br from-brand-card to-brand-dark flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-sans font-bold text-xl tracking-[0.3em] text-brand-border/60 select-none">
                            ORAVOX
                          </span>
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <p className="text-[10px] uppercase tracking-widest text-brand-muted">
                          {p.category}
                        </p>
                        <h3 className="font-sans text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                          {p.name}
                        </h3>
                        <span className="font-sans text-base font-bold text-white block">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
