import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ShopContextProvider } from './context/ShopContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import CartDrawer from './components/layouts/CartDrawer';
import SearchDrawer from './components/layouts/SearchDrawer';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <ShopContextProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-white">
            <Navbar />
            
            {/* Drawers overlay */}
            <CartDrawer />
            <SearchDrawer />
            
            {/* Main Page Content */}
            <main className="flex-grow">
              <AppRoutes />
            </main>
            
            <Footer />
          </div>
        </Router>
      </ShopContextProvider>
    </HelmetProvider>
  );
}

export default App;
