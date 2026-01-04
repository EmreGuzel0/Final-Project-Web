import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// --- PAGES --- (Main) ---
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AuthGate from './pages/AuthGate';
import OrderSuccess from './pages/OrderSuccess';
import NotFound from './pages/NotFound';
import AddProduct from './pages/AddProduct';

// --- PAGES --- (Info) ---
import AboutUs from './pages/About';
import PrivacyPolicy from './pages/Privacy';
import TermsOfService from './pages/Terms';
import ContactUs from './pages/Contact';

const App = () => {
  // 1. USER STATE (Error Protected) - Load from LocalStorage
  const [user, setUser] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedUser = localStorage.getItem('emrUser');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.username || parsedUser.email) return parsedUser;
        }
      }
      return null;
    } catch (error) {
      localStorage.removeItem('emrUser');
      return null;
    }
  });

  // 2. CART STATE (Error Protected) - Load from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [];
      }
      return [];
    } catch (error) {
      localStorage.removeItem('shoppingCart');
      return [];
    }
  });

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', severity: 'success' });

  // Save User to LocalStorage when it changes
  useEffect(() => {
    if (user) localStorage.setItem('emrUser', JSON.stringify(user));
    else localStorage.removeItem('emrUser');
  }, [user]);

  // Save Cart to LocalStorage when it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  // Function to add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, amount: item.amount + quantity } : item
        );
      }
      // Add new item
      return [...prevCart, { ...product, amount: quantity }];
    });
    setToast({ show: true, message: "Added to Cart Successfully!", severity: 'success' });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shoppingCart');
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast({ ...toast, show: false });
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Pass state to Navbar */}
      <Navbar cart={cart} user={user} />

      {/* Global Notification Alert */}
      <Snackbar
        open={toast.show}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ top: '120px !important' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', fontWeight: 'bold' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} user={user} />} />

        {/* Transaction Pages */}
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} user={user} />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* User Pages */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/auth-gate" element={<AuthGate />} />

        {/* Info Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Admin Page */}
        <Route path="/admin/add-product"
          element={
            user && (user.username === "admin" || user.email === "admin@admin.com")
              ? <AddProduct />
              : <NotFound />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;