import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../auth/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow mb-8">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">E-Commerce</Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          <Link to="/cart" className="relative hover:text-blue-600">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">{cartCount}</span>
            )}
          </Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 