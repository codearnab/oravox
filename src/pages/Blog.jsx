import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Blog = () => {
  const { blogs } = useContext(ShopContext);

  return (
    <>
      <Helmet>
        <title>Acoustic Journal | Oravox Blog</title>
        <meta
          name="description"
          content="Explore in-depth articles on acoustic engineering, audio technology, and the science behind the Oravox sound."
        />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-brand-accent font-semibold mb-3">
              Insights & Research
            </p>
            <h1 className="font-sans text-4xl sm:text-5xl font-bold text-white mb-4">
              Acoustic Journal
            </h1>
            <p className="text-brand-muted font-light max-w-xl mx-auto">
              Deep dives into the engineering, material science, and acoustic
              technology behind Oravox audio devices.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group glass-card glass-card-hover rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-brand-card to-brand-dark flex items-center justify-center overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-sans font-bold text-xl tracking-[0.3em] text-brand-border/50 select-none">
                      ORAVOX
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-brand-accent/90 text-white text-[8px] tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-[10px] text-brand-muted tracking-wider">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-sans text-base font-semibold text-white group-hover:text-brand-accent transition-colors leading-snug">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-xs text-brand-muted font-light leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-brand-accent/10 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-brand-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-white">{blog.author}</p>
                        <p className="text-[9px] text-brand-muted">{blog.authorRole}</p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-brand-accent hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
