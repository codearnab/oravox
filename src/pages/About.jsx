import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Crosshair,
  Gem,
  Lightbulb,
  Leaf,
  ArrowRight,
  Users,
  Globe,
  ShoppingBag,
  Calendar,
} from 'lucide-react';

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

const About = () => {
  const values = [
    {
      icon: <Crosshair className="w-6 h-6" />,
      title: 'Precision Engineering',
      desc: 'Every driver, diaphragm, and circuit is tuned with laboratory-grade measurement and analysis.',
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: 'Premium Craftsmanship',
      desc: 'Hand-selected materials — beryllium, sheepskin leather, walnut wood — chosen for acoustic and tactile excellence.',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Relentless Innovation',
      desc: 'Our R&D labs push the boundaries of acoustic physics, wireless codecs, and noise cancellation technology.',
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Sustainable Design',
      desc: 'Recyclable packaging, conflict-free materials, and long-lasting build quality to reduce waste.',
    },
  ];

  const team = [
    {
      name: 'Dr. Adrian Vance',
      role: 'Head of Audio R&D',
      initials: 'AV',
    },
    {
      name: 'Marcus Sterling',
      role: 'Lead Transducer Architect',
      initials: 'MS',
    },
    {
      name: 'Elena Rostova',
      role: 'Signal Processing Lead',
      initials: 'ER',
    },
  ];

  const stats = [
    { icon: <ShoppingBag className="w-5 h-5" />, value: '10+', label: 'Products' },
    { icon: <Globe className="w-5 h-5" />, value: '42', label: 'Countries' },
    { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Customers' },
    { icon: <Calendar className="w-5 h-5" />, value: '2019', label: 'Founded' },
  ];

  return (
    <>
      <Helmet>
        <title>About Oravox | Our Story</title>
        <meta
          name="description"
          content="Learn about Oravox — our mission to craft pure, unaltered acoustic experiences through precision engineering and premium materials."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-hero overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.35em] uppercase text-brand-accent font-semibold mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Engineered for{' '}
            <span className="text-gradient-silver">Pure Sound</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-brand-muted font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Oravox was born from a singular conviction: headphones and speakers should
            not color the recording — they should act as open windows, letting music
            breathe exactly as the artists intended.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-brand-card to-brand-dark border border-brand-border flex items-center justify-center overflow-hidden relative"
            >
              <img
                src="/assets/products/oravox-hearth-2.webp"
                alt="Oravox acoustic testing setup"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-accent/10 blur-[60px]" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold">
                The Beginning
              </p>
              <h2 className="font-sans text-3xl font-bold text-white">
                From a Hamburg Lab to Global Acoustics
              </h2>
              <div className="space-y-4 text-brand-muted font-light leading-relaxed text-sm">
                <p>
                  In 2019, a small team of acoustic engineers and material scientists in
                  Hamburg, Germany set out to challenge the status quo of consumer audio.
                  Frustrated by artificially boosted bass and fatiguing sound signatures,
                  they began designing transducers from first principles.
                </p>
                <p>
                  The result was the Oravox Sound Core — a custom DSP architecture that
                  processes signals at 192kHz, correcting phase errors in real-time while
                  preserving the natural timbre and spatial depth of every recording.
                </p>
                <p>
                  Today, Oravox products are trusted by over 50,000 music lovers,
                  creators, and audiophiles across 42 countries. Every product we ship
                  carries the same founding principle: transparency, not coloration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-premium">
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
              Our Pillars
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-sans text-3xl sm:text-4xl font-bold text-white"
            >
              What Drives Us
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-6 space-y-4 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent">
                  {val.icon}
                </div>
                <h3 className="font-sans text-sm font-semibold text-white tracking-wide">
                  {val.title}
                </h3>
                <p className="text-xs text-brand-muted font-light leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-brand-border bg-[#0D0D0E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-card text-brand-muted mb-2">
                  {stat.icon}
                </div>
                <p className="font-sans text-3xl font-bold text-gradient-silver">
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

      {/* Team */}
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
              The Minds Behind the Sound
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-sans text-3xl sm:text-4xl font-bold text-white"
            >
              Our Team
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-8 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-card border border-brand-border flex items-center justify-center mx-auto">
                  <span className="font-sans text-xl font-bold text-brand-accent">
                    {person.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white">
                    {person.name}
                  </h3>
                  <p className="text-[10px] text-brand-muted tracking-wider uppercase mt-1">
                    {person.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-premium border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-sans text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Experience the Difference
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-brand-muted font-light mb-10 max-w-lg mx-auto"
            >
              Discover our collection of precision-engineered audio devices and hear
              music the way it was meant to be heard.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(210,31,60,0.35)]"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
