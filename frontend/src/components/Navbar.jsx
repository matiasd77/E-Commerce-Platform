import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../auth/CartContext';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

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

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">ShopEase</Link>
        <div className="flex items-center space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/products" className="hover:text-indigo-600">Products</Link>
          <Link to="/cart" className="relative hover:text-indigo-600">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <>
              <button
                onClick={handleProfileClick}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold shadow transition relative"
                title={user.firstName + ' ' + user.lastName}
                style={{ outline: 'none', border: 'none' }}
              >
                {/* Optionally, use a user icon here instead of initials */}
                {getInitials(user)}
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-indigo-600">Login/Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 