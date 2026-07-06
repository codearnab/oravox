import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  Headphones,
  Wifi,
  Shield,
  ChevronDown,
  ChevronUp,
  Quote,
  Mail,
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import faqsData from '../data/faqs.json';

import heroProduct from "@/assets/images/herosectionImage.png";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── sub‑components ─── */

const ProductCard = ({ product, index }) => {
  const { addToCart, favorites, toggleFavorite } = useContext(ShopContext);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group glass-card glass-card-hover rounded-2xl overflow-hidden min-w-[280px] sm:min-w-0"
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
          <span className="absolute top-4 left-4 bg-brand-accent/90 text-white text-[9px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white text-[10px] tracking-widest uppercase font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-brand-muted font-medium">
          {product.category}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="block font-sans text-sm font-semibold text-white group-hover:text-brand-accent transition-colors"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between pt-1">
          <span className="font-sans text-lg font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-brand-muted">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FaqItem = ({ faq, isOpen, toggle }) => (
  <div className="border-b border-brand-border">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-5 text-left group"
    >
      <span
        className={`font-sans text-sm font-medium transition-colors ${isOpen ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'
          }`}
      >
        {faq.question}
      </span>
      {isOpen ? (
        <ChevronUp className="w-4 h-4 text-brand-accent flex-shrink-0 ml-4" />
      ) : (
        <ChevronDown className="w-4 h-4 text-brand-muted flex-shrink-0 ml-4" />
      )}
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <p className="pb-5 text-sm text-brand-muted font-light leading-relaxed">
        {faq.answer}
      </p>
    </motion.div>
  </div>
);

/* ─── main component ─── */

const Home = () => {
  const { products } = useContext(ShopContext);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^\S+@\S+\.\S+$/.test(email)) {
      try {
        const existingList = localStorage.getItem('oravox_newsletter');
        const newsletterList = existingList ? JSON.parse(existingList) : [];
        if (!newsletterList.includes(email)) {
          newsletterList.push(email);
          localStorage.setItem('oravox_newsletter', JSON.stringify(newsletterList));
        }
      } catch (err) {
        // Silent catch for localStorage issues in private browsing
      }
      setSubscribed(true);
      setEmail('');
    }
  };

  const featured = products.slice(0, 4);
  const flagship = products.find((p) => p.id === 'oravox-halo') || products[0];

  const pillars = [
    {
      icon: <Headphones className="w-7 h-7" />,
      title: 'Acoustic Precision',
      desc: 'Custom-tuned drivers engineered for linear frequency response and breathtaking soundstage depth.',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Premium Materials',
      desc: 'Beryllium domes, graphene diaphragms, sheepskin leather — only the finest components.',
    },
    {
      icon: <Wifi className="w-7 h-7" />,
      title: 'Wireless Fidelity',
      desc: 'High-resolution codecs and custom DSP chips deliver wired-quality audio over Bluetooth.',
    },
  ];

  const stats = [
    { value: '10+', label: 'Products' },
    { value: '42', label: 'Countries' },
    { value: '50K+', label: 'Customers' },
    { value: '<0.05%', label: 'THD Rating' },
  ];

  return (
    <>
      <Helmet>
        <title>Oravox | Premium Audio Technology</title>
        <meta
          name="description"
          content="Discover Oravox premium earbuds, headphones, speakers and soundbars. Engineered for pure, unaltered acoustic experiences."
        />
      </Helmet>
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20 lg:pt-0">

        {/* Animated Background SVG Frequency Soundwave */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 select-none">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M-50,450 C200,250 400,600 600,400 C800,200 1000,550 1200,350 C1350,200 1500,450 1550,450"
              stroke="url(#soundwave-gradient)"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M-50,450 C200,250 400,600 600,400 C800,200 1000,550 1200,350 C1350,200 1500,450 1550,450",
                  "M-50,450 C200,500 400,250 600,450 C800,650 1000,300 1200,450 C1350,550 1500,250 1550,450",
                  "M-50,450 C200,250 400,600 600,400 C800,200 1000,550 1200,350 C1350,200 1500,450 1550,450"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M-50,470 C150,550 350,300 550,470 C750,640 950,350 1150,470 C1300,570 1450,320 1550,470"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              fill="none"
              animate={{
                d: [
                  "M-50,470 C150,550 350,300 550,470 C750,640 950,350 1150,470 C1300,570 1450,320 1550,470",
                  "M-50,470 C150,320 350,580 550,420 C750,260 950,580 1150,420 C1300,300 1450,520 1550,470",
                  "M-50,470 C150,550 350,300 550,470 C750,640 950,350 1150,470 C1300,570 1450,320 1550,470"
                ]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="soundwave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1C1C1E" />
                <stop offset="50%" stopColor="#D21F3C" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1C1C1E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient glow circles */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none z-0" />

        {/* Massive backdrop typography */}
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none overflow-hidden">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="font-sans font-extrabold text-[22vw] tracking-[0.25em] text-white uppercase border-text-outline"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.4)",
              color: "transparent"
            }}
          >
            HALO
          </motion.span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left side text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="bg-brand-card border border-brand-border rounded-full px-4.5 py-1.5 text-[9px] tracking-[0.25em] uppercase text-brand-light font-semibold shadow-premium">
                  ORAVOX AUDIO LABS • VER. 1.04
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-sans text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white"
              >
                Sound <span className="text-gradient-silver">Uncolored.</span>
                <br />
                Silence <span className="text-brand-accent">Refined.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-brand-muted font-light text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Engineered with custom-coated Beryllium drivers and dynamic active noise cancellation. Oravox Halo delivers a completely linear, uncolored studio soundstage.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
              >
                <Link
                  to={`/product/oravox-halo`}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-brand-accent hover:bg-brand-accent/90 text-white font-sans text-[11px] tracking-[0.2em] uppercase font-bold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(210,31,60,0.45)] hover-glow-accent"
                >
                  <span>Experience Halo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-transparent border border-white/10 hover:border-brand-accent text-white hover:text-brand-accent font-sans text-[11px] tracking-[0.2em] uppercase font-bold px-10 py-5 rounded-full transition-all duration-300"
                >
                  <span>Explore Catalog</span>
                </Link>
              </motion.div>
            </div>

            {/* Right side flagship visual (Interactive Stage - Floating Raw Product) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center items-center py-12"
            >
              {/* Technical blueprint lines backdrops */}
              <div className="absolute pointer-events-none select-none w-[440px] sm:w-[560px] h-[440px] sm:h-[560px] flex items-center justify-center">
                <svg className="w-full h-full opacity-40" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="250" cy="250" r="220" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="3 6" />
                  <motion.circle
                    cx="250"
                    cy="250"
                    r="180"
                    stroke="rgba(210, 31, 60, 0.12)"
                    strokeWidth="1"
                    strokeDasharray="40 180"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <line x1="250" y1="30" x2="250" y2="470" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="30" y1="250" x2="470" y2="250" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                </svg>
              </div>

              {/* Backdrop spotlight glow behind headphones */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-accent/8 blur-[90px] pointer-events-none z-0" />

              {/* Floating Raw Product Image */}
              <div className="relative z-10 w-full max-w-[440px] sm:max-w-[540px] md:max-w-[580px] aspect-square flex items-center justify-center group select-none">
                <motion.img
                  src={heroProduct}
                  alt={flagship.name}
                  className="w-full h-full object-contain z-10 filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border border-brand-border flex justify-center pt-1.5 cursor-pointer">
            <div className="w-1 h-2 rounded-full bg-brand-muted" />
          </div>
        </motion.div>
      </section>

      {/* ───────── FEATURED PRODUCTS ───────── */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-3"
              >
                Featured Collection
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-sans text-3xl sm:text-4xl font-bold text-white"
              >
                Signature Acoustics
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-brand-muted hover:text-brand-accent transition-colors font-semibold"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FLAGSHIP HIGHLIGHT ───────── */}
      <section className="py-24 bg-gradient-premium overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-card to-brand-dark border border-brand-border flex items-center justify-center overflow-hidden relative">
                {flagship.images?.[0] ? (
                  <img
                    src={flagship.images[0]}
                    alt={flagship.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-sans font-bold text-4xl tracking-[0.4em] text-brand-border/40 select-none">
                    ORAVOX
                  </span>
                )}
                {/* Ambient accent glow */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-brand-accent/10 blur-[80px]" />
              </div>
            </motion.div>

            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold">
                {flagship.badge}
              </p>
              <h2 className="font-sans text-4xl sm:text-5xl font-bold text-white leading-tight">
                {flagship.name}
              </h2>
              <p className="text-brand-muted font-light leading-relaxed">
                {flagship.description}
              </p>

              <ul className="space-y-3 pt-2">
                {flagship.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                    <span className="text-sm text-brand-light/80 font-light">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 pt-4">
                <span className="font-sans text-3xl font-bold text-white">
                  ${flagship.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${flagship.id}`}
                  className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── BRAND PILLARS ───────── */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-3"
            >
              Why Oravox
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-sans text-3xl sm:text-4xl font-bold text-white"
            >
              The Oravox Difference
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-8 text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-accent/10 text-brand-accent mb-2">
                  {pillar.icon}
                </div>
                <h3 className="font-sans text-base font-semibold text-white tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-sm text-brand-muted font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS BAR ───────── */}
      <section className="py-16 border-y border-brand-border bg-[#0D0D0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="font-sans text-3xl sm:text-4xl font-bold text-gradient-silver mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-brand-muted font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIAL ───────── */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Quote className="w-10 h-10 text-brand-accent/40 mx-auto rotate-180" />
            </motion.div>
            <motion.blockquote
              variants={fadeUp}
              className="font-sans text-xl sm:text-2xl font-light text-brand-light leading-relaxed mb-8"
            >
              "{flagship.reviews[0]?.comment}"
            </motion.blockquote>
            <motion.div variants={fadeUp}>
              <p className="font-sans text-sm font-semibold text-white">
                {flagship.reviews[0]?.name}
              </p>
              <div className="flex items-center justify-center space-x-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-[10px] text-brand-muted tracking-widest uppercase mt-2">
                Verified Oravox Customer
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-24 bg-gradient-premium">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-3"
            >
              Support
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-sans text-3xl sm:text-4xl font-bold text-white"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqsData.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── NEWSLETTER CTA ───────── */}
      <section className="py-24 bg-[#0A0A0A] border-t border-brand-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="glass-card rounded-3xl p-8 sm:p-16 relative overflow-hidden border border-brand-border/40 shadow-premium"
          >
            {/* Background decorative ambient glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-brand-accent/5 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-brand-accent/5 blur-[60px] pointer-events-none" />

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent mb-6"
            >
              <Mail className="w-5 h-5" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-sans text-2xl sm:text-4xl font-bold text-white mb-4"
            >
              Newsletter
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-brand-muted font-light max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed"
            >
              Get exclusive offers, new product updates, and launch announcements delivered to your inbox.
            </motion.p>

            <motion.div variants={fadeUp} className="max-w-md mx-auto relative z-10">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-4 text-brand-accent text-sm font-medium"
                >
                  Thank you! You have successfully subscribed to our newsletter.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-5 py-3.5 bg-brand-dark/60 border border-brand-border focus:border-brand-accent rounded-xl text-white placeholder-brand-muted/70 text-sm focus:outline-none transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-sans text-xs tracking-widest uppercase font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
