import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 8000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      value: 'support@oravox.com',
      subtitle: 'We respond within 24 hours',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      value: '+1 (800) 872-0869',
      subtitle: 'Mon–Fri 9AM–6PM EST',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Headquarters',
      value: 'Hamburg, Germany',
      subtitle: 'Hafencity Innovation District',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Hours',
      value: '9:00 AM — 6:00 PM',
      subtitle: 'Central European Time',
    },
  ];

  const inputClasses = (field) =>
    `w-full bg-brand-card border ${
      errors[field] ? 'border-brand-accent' : 'border-brand-border'
    } focus:border-brand-accent focus:outline-none rounded-lg px-4 py-3 text-sm text-white placeholder-brand-muted transition-colors`;

  return (
    <>
      <Helmet>
        <title>Contact Us | Oravox</title>
        <meta
          name="description"
          content="Get in touch with Oravox for support, partnerships, or inquiries about our premium audio products."
        />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-brand-accent font-semibold mb-3">
              Get in Touch
            </p>
            <h1 className="font-sans text-4xl sm:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-brand-muted font-light max-w-xl mx-auto">
              Have questions about our products, need support, or want to discuss a
              partnership? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold text-white">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-brand-muted font-light max-w-sm">
                      Thank you for reaching out. Our team will review your message
                      and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-brand-muted font-bold block mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          {...register('name', { required: 'Name is required' })}
                          className={inputClasses('name')}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-brand-accent mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-brand-muted font-bold block mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email',
                            },
                          })}
                          className={inputClasses('email')}
                        />
                        {errors.email && (
                          <p className="text-[10px] text-brand-accent mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-brand-muted font-bold block mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="What is this about?"
                        {...register('subject', { required: 'Subject is required' })}
                        className={inputClasses('subject')}
                      />
                      {errors.subject && (
                        <p className="text-[10px] text-brand-accent mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-brand-muted font-bold block mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        {...register('message', { required: 'Message is required' })}
                        className={`${inputClasses('message')} resize-none`}
                      />
                      {errors.message && (
                        <p className="text-[10px] text-brand-accent mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent/90 text-white text-xs tracking-widest uppercase font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(210,31,60,0.3)]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="glass-card rounded-xl p-5 flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-brand-muted font-bold mb-0.5">
                      {info.title}
                    </p>
                    <p className="text-sm font-semibold text-white">{info.value}</p>
                    <p className="text-[10px] text-brand-muted font-light mt-0.5">
                      {info.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
