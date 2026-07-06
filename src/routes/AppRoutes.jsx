import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/common/Loader';

// Lazy loading all pages for optimal performance & code splitting
const Home = React.lazy(() => import('../pages/Home'));
const Shop = React.lazy(() => import('../pages/Shop'));
const ProductDetails = React.lazy(() => import('../pages/ProductDetails'));
const About = React.lazy(() => import('../pages/About'));
const Blog = React.lazy(() => import('../pages/Blog'));
const BlogDetails = React.lazy(() => import('../pages/BlogDetails'));
const Contact = React.lazy(() => import('../pages/Contact'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const TermsConditions = React.lazy(() => import('../pages/TermsConditions'));
const Cart = React.lazy(() => import('../pages/Cart'));
const Checkout = React.lazy(() => import('../pages/Checkout'));
const OrderSuccess = React.lazy(() => import('../pages/OrderSuccess'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
