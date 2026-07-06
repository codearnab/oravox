import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useContext(ShopContext);

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link
          to="/blog"
          className="text-brand-accent text-xs tracking-widest uppercase hover:underline"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const otherBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 2);

  // Simple content renderer: split on \n\n for paragraphs, handle ### for h3
  const renderContent = (content) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, i) => {
      if (block.startsWith('### ')) {
        return (
          <h3
            key={i}
            className="font-sans text-lg font-semibold text-white mt-8 mb-3"
          >
            {block.replace('### ', '')}
          </h3>
        );
      }

      // Handle bold markers **text**
      const parts = block.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-brand-muted font-light leading-[1.85] text-sm">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={j} className="text-white font-medium">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <React.Fragment key={j}>{part}</React.Fragment>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${blog.title} | Oravox Blog`}</title>
        <meta name="description" content={blog.summary} />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-brand-muted hover:text-brand-accent transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-block bg-brand-accent/90 text-white text-[8px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full mb-4">
              {blog.category}
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-brand-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{blog.author}</p>
                  <p className="text-[10px] text-brand-muted">{blog.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-brand-muted">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.readTime}</span>
                </span>
              </div>
            </div>
          </motion.header>

          {/* Hero image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="aspect-video rounded-2xl bg-gradient-to-br from-brand-card to-brand-dark border border-brand-border flex items-center justify-center overflow-hidden mb-12 relative"
          >
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-sans font-bold text-3xl tracking-[0.4em] text-brand-border/40 select-none">
                ORAVOX
              </span>
            )}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-accent/8 blur-[60px]" />
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-5"
          >
            {renderContent(blog.content)}
          </motion.article>

          {/* Related Posts */}
          {otherBlogs.length > 0 && (
            <section className="mt-20 pt-12 border-t border-brand-border">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-brand-accent font-semibold mb-2">
                    Continue Reading
                  </p>
                  <h2 className="font-sans text-xl font-bold text-white">
                    More from the Journal
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="text-xs tracking-widest uppercase text-brand-muted hover:text-brand-accent transition-colors font-semibold"
                >
                  View All
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {otherBlogs.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group glass-card glass-card-hover rounded-2xl p-6 space-y-3"
                  >
                    <span className="text-[8px] tracking-widest uppercase text-brand-accent font-semibold">
                      {post.category}
                    </span>
                    <h3 className="font-sans text-sm font-semibold text-white group-hover:text-brand-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-brand-muted font-light line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-brand-muted">
                        {post.readTime}
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
