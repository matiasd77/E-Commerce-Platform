import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import ProductsPage from '../pages/ProductsPage';
import UserPage from '../pages/UserPage';
import HelpSupport from '../pages/HelpSupport';
import ShippingInfo from '../pages/ShippingInfo';
import Returns from '../pages/Returns';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

const AnimatedRoute = ({ element }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ minHeight: '100vh' }}
  >
    {element}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute element={<HomePage />} />} />
        <Route path="/login" element={<AnimatedRoute element={<LoginPage />} />} />
        <Route path="/register" element={<AnimatedRoute element={<RegisterPage />} />} />
        <Route path="/product/:id" element={<AnimatedRoute element={<ProductPage />} />} />
        <Route path="/products" element={<AnimatedRoute element={<ProductsPage />} />} />
        <Route path="/user" element={<AnimatedRoute element={<UserPage />} />} />
        <Route path="/help" element={<AnimatedRoute element={<HelpSupport />} />} />
        <Route path="/shipping" element={<AnimatedRoute element={<ShippingInfo />} />} />
        <Route path="/returns" element={<AnimatedRoute element={<Returns />} />} />
        <Route path="/privacy" element={<AnimatedRoute element={<PrivacyPolicy />} />} />
        <Route path="/terms" element={<AnimatedRoute element={<Terms />} />} />
        <Route path="/cart" element={<AnimatedRoute element={<ProtectedRoute><CartPage /></ProtectedRoute>} />} />
        <Route path="/checkout" element={<AnimatedRoute element={<CheckoutPage />} />} />
        <Route path="/orders" element={<AnimatedRoute element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />} />
        <Route path="/orders/:orderId" element={<AnimatedRoute element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />} />
        <Route path="/admin/*" element={<AnimatedRoute element={<AdminDashboard />} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes; 