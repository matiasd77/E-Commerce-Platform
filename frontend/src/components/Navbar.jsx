import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../auth/CartContext';
import { useAuth } from '../auth/AuthContext';
import { FaShoppingCart, FaUser, FaBoxOpen, FaSignOutAlt, FaTrash, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const cartIconRef = useRef(null);
  const prevCartCount = useRef(cartCount);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef(null);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Animate cart icon when cartCount increases
  useEffect(() => {
    if (cartCount > prevCartCount.current && cartIconRef.current) {
      cartIconRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        cartIconRef.current && cartIconRef.current.classList.remove('animate-bounce');
      }, 600);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  // Helper for user initials
  const getInitials = (user) => {
    if (!user) return '';
    const first = user.firstName ? user.firstName[0] : '';
    const last = user.lastName ? user.lastName[0] : '';
    return (first + last).toUpperCase();
  };

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close cart dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target) && !cartIconRef.current.contains(event.target)) {
        setCartDropdownOpen(false);
      }
    };
    if (cartDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cartDropdownOpen]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // On mount, set theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed top-0 left-0 w-full z-50 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">ShopEase</Link>
        <div className="flex items-center space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-300">Products</Link>
          <Link to="/help" className="hover:text-indigo-600 dark:hover:text-indigo-300">Help & Support</Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FaSun className="w-5 h-5 text-yellow-400" /> : <FaMoon className="w-5 h-5 text-gray-600" />}
          </button>
          <div className="relative">
            <button
              ref={cartIconRef}
              onClick={() => setCartDropdownOpen((open) => !open)}
              className="relative flex items-center hover:text-indigo-600 focus:outline-none"
              aria-label="Cart"
            >
              <FaShoppingCart className="w-5 h-5 mr-1" />
              {cartCount > 0 && (
                <span className="ml-1 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs">{cartCount}</span>
              )}
            </button>
            {cartDropdownOpen && (
              <div ref={cartDropdownRef} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-4 z-50 border border-gray-100 animate-fade-in">
                <h4 className="px-6 pb-2 text-base font-semibold text-gray-700">Cart</h4>
                <div className="max-h-64 overflow-y-auto px-2">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-2 opacity-70" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="6" width="18" height="13" rx="2" fill="#e0e7ef" />
                        <rect x="5" y="8" width="14" height="9" rx="1.5" fill="#f3f4f6" />
                        <circle cx="8.5" cy="18.5" r="1.5" fill="#c7d2fe" />
                        <circle cx="15.5" cy="18.5" r="1.5" fill="#c7d2fe" />
                        <rect x="7" y="11" width="10" height="2" rx="1" fill="#a5b4fc" />
                      </svg>
                      <div>Your cart is empty.</div>
                    </div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-2 border-b last:border-0 group">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded shadow-sm border" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-semibold text-indigo-700 text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-gray-300 hover:text-red-500 transition p-1 rounded group-hover:bg-gray-100"
                          aria-label="Remove from cart"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {cartItems.length > 0 && (
                  <>
                    <div className="flex justify-between items-center px-6 py-3 border-t mt-2">
                      <span className="font-semibold text-gray-700">Subtotal</span>
                      <span className="font-bold text-indigo-700">${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 px-6 mt-2">
                      <Link to="/cart" className="flex-1">
                        <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">View Cart</button>
                      </Link>
                      <Link to="/checkout" className="flex-1">
                        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Checkout</button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {user ? (
            <div className="relative" ref={avatarRef}>
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold shadow transition relative focus:outline-none"
                title={user.firstName + ' ' + user.lastName}
                style={{ outline: 'none', border: 'none' }}
              >
                {getInitials(user)}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 animate-fade-in">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 transition text-left"
                  >
                    <FaUser className="w-4 h-4" /> Profile
                  </button>
                  <Link
                    to="/orders"
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 transition"
                  >
                    <FaBoxOpen className="w-4 h-4" /> Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition text-left"
                  >
                    <FaSignOutAlt className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-indigo-600">Login/Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 