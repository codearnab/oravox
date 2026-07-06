import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Disc, ArrowRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = React.useState(false);

  const onSubscribe = (data) => {
    // Fictional newsletter submission
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer className="bg-[#0D0D0E] border-t border-brand-border text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/30 group-hover:bg-brand-accent/20 transition-all duration-300">
              <Disc className="w-4.5 h-4.5 text-brand-accent animate-spin-slow" />
            </div>
            <span className="font-sans font-bold text-lg tracking-[0.25em] text-white">
              ORAVOX
            </span>
          </Link>
          <p className="text-sm text-brand-muted max-w-sm font-light leading-relaxed">
            Crafting pure, unaltered acoustic experiences for seekers of high-fidelity sound. Designed with technical excellence and minimalist luxury.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            {[
              { icon: <Instagram className="w-4 h-4" />, link: 'https://instagram.com' },
              { icon: <Twitter className="w-4 h-4" />, link: 'https://twitter.com' },
              { icon: <Facebook className="w-4 h-4" />, link: 'https://facebook.com' },
              { icon: <Youtube className="w-4 h-4" />, link: 'https://youtube.com' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-accent transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h4 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-muted mb-6">Shop</h4>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <Link to="/shop?category=Wireless%20Earbuds" className="text-brand-muted hover:text-white transition-colors duration-300">
                Wireless Earbuds
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Over-Ear%20Headphones" className="text-brand-muted hover:text-white transition-colors duration-300">
                Over-Ear Headphones
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Bluetooth%20Speakers" className="text-brand-muted hover:text-white transition-colors duration-300">
                Bluetooth Speakers
              </Link>
            </li>
            <li>
              <Link to="/shop?category=Soundbars" className="text-brand-muted hover:text-white transition-colors duration-300">
                Home Soundbars
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-brand-muted hover:text-white transition-colors duration-300 font-normal">
                View All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Information Column */}
        <div>
          <h4 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-muted mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-light">
            <li>
              <Link to="/about" className="text-brand-muted hover:text-white transition-colors duration-300">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-brand-muted hover:text-white transition-colors duration-300">
                Acoustic Journal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-brand-muted hover:text-white transition-colors duration-300">
                Connect
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-brand-muted hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-brand-muted hover:text-white transition-colors duration-300">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-muted mb-6">Newsletter</h4>
          <p className="text-sm font-light text-brand-muted mb-4 leading-relaxed">
            Subscribe to receive acoustic studies, product releases, and member pricing.
          </p>
          <form onSubmit={handleSubmit(onSubscribe)} className="space-y-3">
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email address"
                className={`w-full bg-[#18181A] border ${errors.email ? 'border-brand-accent' : 'border-brand-border'} focus:border-brand-accent focus:outline-none rounded px-4 py-2.5 pr-10 text-xs font-light text-white placeholder-brand-muted transition-colors`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
              />
              <button
                type="submit"
                className="absolute right-3 text-brand-muted hover:text-brand-accent transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {errors.email && (
              <p className="text-[10px] text-brand-accent font-light">{errors.email.message}</p>
            )}
            {submitted && (
              <p className="text-[10px] text-green-500 font-light">Subscription confirmed.</p>
            )}
          </form>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-muted">
        <div>
          &copy; {new Date().getFullYear()} Oravox Acoustics. All rights reserved.
        </div>
        
        {/* Payment Methods */}
        <div className="flex items-center space-x-3 text-[10px] uppercase tracking-wider text-brand-muted">
          <span>Visa</span>
          <span>•</span>
          <span>Mastercard</span>
          <span>•</span>
          <span>Amex</span>
          <span>•</span>
          <span>Apple Pay</span>
          <span>•</span>
          <span>Google Pay</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
