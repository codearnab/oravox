import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const sections = [
  {
    id: 'information-collection',
    title: '1. Information We Collect',
    content: `When you visit our website or make a purchase, we collect certain information to provide you with the best possible experience. This includes:

**Personal Information**: Name, email address, shipping address, phone number, and payment information provided during checkout.

**Device Information**: Browser type, IP address, operating system, and device identifiers collected automatically when you visit our site.

**Usage Data**: Pages visited, time spent on pages, click patterns, and referring URLs to help us improve our website experience.

**Cookies**: Small data files placed on your device to remember preferences, maintain sessions, and analyze usage patterns.`,
  },
  {
    id: 'use-of-information',
    title: '2. How We Use Your Information',
    content: `We use the information we collect for the following purposes:

• Processing and fulfilling your orders, including shipping and delivery notifications
• Communicating with you about your account, orders, and customer service inquiries
• Personalizing your shopping experience and providing product recommendations
• Sending promotional emails and newsletters (with your consent, which you can withdraw at any time)
• Analyzing website usage to improve our products, services, and user experience
• Preventing fraud and ensuring the security of our platform
• Complying with legal obligations and protecting our rights`,
  },
  {
    id: 'cookies',
    title: '3. Cookies & Tracking',
    content: `Oravox uses cookies and similar tracking technologies to enhance your browsing experience. We use:

**Essential Cookies**: Required for the website to function properly, including shopping cart functionality and checkout processes.

**Analytics Cookies**: Help us understand how visitors interact with our website by collecting and reporting information anonymously.

**Marketing Cookies**: Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.

You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.`,
  },
  {
    id: 'third-parties',
    title: '4. Third-Party Services',
    content: `We may share your information with trusted third-party service providers who assist us in operating our business:

• **Payment Processors**: To securely process your transactions (e.g., Stripe, PayPal)
• **Shipping Partners**: To deliver your orders (e.g., FedEx, DHL, UPS)
• **Analytics Providers**: To help us understand website usage patterns
• **Email Service Providers**: To send transactional and marketing communications

We do not sell, trade, or otherwise transfer your personal information to outside parties for their own marketing purposes.`,
  },
  {
    id: 'data-security',
    title: '5. Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:

• SSL/TLS encryption for all data transmission
• Secure, PCI-DSS compliant payment processing
• Regular security audits and vulnerability assessments
• Access controls limiting employee access to personal data on a need-to-know basis
• Data encryption at rest for sensitive information

While we strive to protect your personal information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• **Access**: Request a copy of the personal data we hold about you
• **Correction**: Request correction of inaccurate or incomplete data
• **Deletion**: Request deletion of your personal data (subject to legal obligations)
• **Portability**: Request your data in a portable, machine-readable format
• **Opt-out**: Unsubscribe from marketing communications at any time
• **Restriction**: Request restriction of processing of your personal data

To exercise any of these rights, please contact us at privacy@oravox.com.`,
  },
  {
    id: 'contact',
    title: '7. Contact Us',
    content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:

**Email**: privacy@oravox.com
**Address**: Oravox Acoustics GmbH, Hafencity Innovation District, Hamburg, Germany
**Phone**: +1 (800) 872-0869

This Privacy Policy was last updated on June 1, 2026.`,
  },
];

const PrivacyPolicy = () => {
  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.trim() === '') return <br key={i} />;

      // Handle bold markers
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="text-white font-medium">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={j}>{part}</React.Fragment>;
      });

      if (line.trim().startsWith('•')) {
        return (
          <li key={i} className="flex items-start space-x-2 ml-2 py-0.5">
            <span className="mt-2 w-1 h-1 rounded-full bg-brand-accent flex-shrink-0" />
            <span>{rendered}</span>
          </li>
        );
      }

      return (
        <p key={i} className="text-brand-muted font-light leading-relaxed text-sm">
          {rendered}
        </p>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Oravox</title>
        <meta
          name="description"
          content="Learn how Oravox collects, uses, and protects your personal information."
        />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-brand-muted space-x-2 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Privacy Policy</span>
          </nav>

          <div className="flex gap-12">
            {/* Table of Contents (Desktop) */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-28 space-y-1">
                <p className="text-[10px] tracking-widest uppercase text-brand-muted font-bold mb-4">
                  On this page
                </p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-xs text-brand-muted hover:text-brand-accent transition-colors py-1.5 font-light"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-grow max-w-3xl"
            >
              <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-3">
                Privacy Policy
              </h1>
              <p className="text-sm text-brand-muted font-light mb-12">
                Last updated: June 1, 2026
              </p>

              <div className="space-y-12">
                {sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <h2 className="font-sans text-lg font-semibold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-2">
                      {renderContent(section.content)}
                    </div>
                  </section>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
