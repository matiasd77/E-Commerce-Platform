import React from 'react';
import { useCart } from '../auth/CartContext';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { useToast } from '../components/ToastContext';
import { FaShippingFast, FaTag } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading } = useCart();
  const { showToast } = useToast();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedShipping = total >= 50 ? 0 : 5;
  const [coupon, setCoupon] = React.useState('');

  console.log('Cart items:', cartItems);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-gray-100">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 flex flex-col items-center justify-center py-16">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mb-6 opacity-80 animate-bounce" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="13" rx="2" fill="#e0e7ef" />
          <rect x="5" y="8" width="14" height="9" rx="1.5" fill="#f3f4f6" />
          <circle cx="8.5" cy="18.5" r="1.5" fill="#c7d2fe" />
          <circle cx="15.5" cy="18.5" r="1.5" fill="#c7d2fe" />
          <rect x="7" y="11" width="10" height="2" rx="1" fill="#a5b4fc" />
        </svg>
        <h2 className="text-3xl font-bold mb-2 text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-2">Looks like you haven't added anything to your cart yet.</p>
        <p className="text-indigo-400 text-lg mb-6">🛒 Your cart is lonely! Start shopping to fill it up.</p>
        <Link to="/products">
          <PrimaryButton>Start Shopping</PrimaryButton>
        </Link>
      </div>
    );
  }

  // Handler for removing an item with toast
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    showToast('Removed from cart!', 'success');
  };

  // Handler for clearing cart with toast
  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared!', 'success');
  };

  // Handler for coupon code
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    showToast('Coupon feature coming soon!', 'success');
    setCoupon('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Your Cart</h2>
        <div className="flex justify-end mb-4">
          <Link to="/products">
            <PrimaryButton className="bg-white text-indigo-600 border border-indigo-200 shadow-sm hover:bg-indigo-50 focus:ring-indigo-200">
              ← Continue Shopping
            </PrimaryButton>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Cart Items Table */}
          <div className="flex-1 bg-white rounded-3xl shadow-xl p-8 mb-8 lg:mb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left mb-6">
                <thead>
                  <tr className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Subtotal</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-4 flex items-center gap-4 min-w-[180px]">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm border" />
                        )}
                        <span className="font-medium text-gray-800 line-clamp-2">{item.name}</span>
                      </td>
                      <td className="py-4 font-semibold text-indigo-700">${item.price}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-lg font-bold transition"
                            disabled={item.quantity === 1}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-semibold text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-lg font-bold transition"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-semibold rounded transition text-sm"
                          aria-label="Remove from cart"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PrimaryButton
              onClick={handleClearCart}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 w-full mt-4"
              style={{ background: 'linear-gradient(to right, #f3f4f6, #e5e7eb)' }}
            >
              Clear Cart
            </PrimaryButton>
          </div>
          {/* Cart Summary Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h3>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <FaShippingFast className="w-5 h-5" />
                <span className="text-sm font-medium">Estimated Shipping</span>
                <span className="ml-auto text-gray-700 font-semibold">{estimatedShipping === 0 ? 'Free' : `$${estimatedShipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-indigo-700">${(total + estimatedShipping).toFixed(2)}</span>
              </div>
              <hr className="my-2 border-gray-200" />
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 mb-2">
                <FaTag className="w-4 h-4 text-indigo-400" />
                <input
                  type="text"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
                  disabled
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-indigo-100 text-indigo-600 rounded font-semibold text-sm hover:bg-indigo-200 transition"
                  disabled
                >
                  Apply
                </button>
              </form>
              <div className="text-xs text-gray-400 mb-2">* Coupon feature coming soon</div>
              <div className="text-xs text-gray-400">Estimated tax calculated at checkout</div>
              <Link to="/checkout">
                <PrimaryButton className="w-full mt-2">Proceed to Checkout</PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 