import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/user" element={<UserPage />} />
    <Route path="/help" element={<HelpSupport />} />
    <Route path="/shipping" element={<ShippingInfo />} />
    <Route path="/returns" element={<Returns />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
    <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
    <Route path="/admin/*" element={<AdminDashboard />} />
  </Routes>
);

export default AppRoutes; 