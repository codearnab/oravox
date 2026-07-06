import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing, browsing, or using the Oravox website (oravox.com), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of the website immediately.

These terms apply to all visitors, users, and customers of the Oravox platform. We reserve the right to update or modify these terms at any time without prior notice. Continued use of the website following any changes constitutes acceptance of the revised terms.`,
  },
  {
    id: 'products',
    title: '2. Products & Descriptions',
    content: `We strive to provide accurate product descriptions, images, and specifications on our website. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free.

Colors displayed on screen may vary from the actual product due to monitor settings and display technology. All product images are for illustrative purposes.

We reserve the right to discontinue any product at any time without prior notice. Prices for our products are subject to change without notice.`,
  },
  {
    id: 'pricing',
    title: '3. Pricing & Payment',
    content: `All prices are listed in US Dollars (USD) and are exclusive of applicable taxes unless otherwise stated. We reserve the right to modify prices at any time.

**Payment Methods**: We accept major credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and other payment methods as displayed at checkout.

**Payment Security**: All payment transactions are processed through PCI-DSS compliant payment processors. We do not store credit card information on our servers.

In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price and will notify you of the cancellation.`,
  },
  {
    id: 'shipping',
    title: '4. Shipping & Delivery',
    content: `**Free Shipping**: We offer free standard shipping on all orders over $150.00 USD within the contiguous United States. Orders under $150.00 are subject to a flat shipping fee of $15.00.

**Processing Time**: Orders are typically processed within 1-2 business days. During promotional periods, processing may take up to 3-5 business days.

**International Shipping**: International shipping is available to select countries. Additional duties, taxes, and customs fees may apply and are the responsibility of the customer.

**Delivery Estimates**: Standard delivery typically takes 5-7 business days within the US and 10-15 business days for international orders. These are estimates and not guaranteed delivery dates.

Oravox is not responsible for delays caused by shipping carriers, customs, or events beyond our control.`,
  },
  {
    id: 'returns',
    title: '5. Returns & Refunds',
    content: `**30-Day Risk-Free Trial**: We offer a 30-day return policy from the date of delivery. If you are not completely satisfied with your purchase, you may return it for a full refund.

**Return Conditions**:
• Products must be in their original packaging with all accessories included
• Products must be in resalable condition, free from physical damage
• Proof of purchase (order confirmation or receipt) is required
• Personalized or custom items are not eligible for return

**Refund Process**: Once we receive and inspect the returned item, we will process your refund within 5-7 business days. Refunds will be issued to the original payment method.

**Return Shipping**: Return shipping costs are the responsibility of the customer unless the return is due to a manufacturing defect or shipping error on our part.`,
  },
  {
    id: 'warranty',
    title: '6. Warranty',
    content: `All Oravox products come with a comprehensive 2-year manufacturer warranty from the date of purchase. This warranty covers:

• Manufacturing defects in materials and workmanship
• Hardware malfunctions under normal use
• Unexpected component failures not caused by physical damage

**Warranty Exclusions**:
• Damage resulting from misuse, abuse, or unauthorized modifications
• Normal wear and tear including ear pad degradation and cable fraying
• Water damage beyond the product's stated IP rating
• Damage caused by use with incompatible equipment

To file a warranty claim, contact our support team at support@oravox.com with your order number and a description of the issue.`,
  },
  {
    id: 'limitation',
    title: '7. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, Oravox shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of or inability to use our products or services.

Our total liability for any claim arising from or related to these Terms shall not exceed the amount paid by you for the product giving rise to the claim.

These limitations apply regardless of whether the liability is based on warranty, contract, tort, strict liability, or any other legal theory.`,
  },
  {
    id: 'contact',
    title: '8. Contact Information',
    content: `For questions about these Terms & Conditions, please contact us:

**Email**: legal@oravox.com
**Address**: Oravox Acoustics GmbH, Hafencity Innovation District, Hamburg, Germany
**Phone**: +1 (800) 872-0869

These Terms & Conditions were last updated on June 1, 2026.`,
  },
];

const TermsConditions = () => {
  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.trim() === '') return <br key={i} />;

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
        <title>Terms & Conditions | Oravox</title>
        <meta
          name="description"
          content="Read the Oravox terms and conditions governing the use of our website and purchase of our products."
        />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-brand-muted space-x-2 mb-10">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Terms & Conditions</span>
          </nav>

          <div className="flex gap-12">
            {/* Table of Contents */}
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
                Terms & Conditions
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

export default TermsConditions;
