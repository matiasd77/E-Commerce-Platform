import React from 'react';
import { useCart } from '../auth/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, loading } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        <img src="https://illustrations.popsy.co/gray/cart.svg" alt="Empty Cart" className="w-64 h-64 mb-6 opacity-80" />
        <h2 className="text-3xl font-bold mb-2 text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition text-lg">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Your Cart</h2>
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="text-gray-500 text-sm uppercase tracking-wider">
                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3">Quantity</th>
                <th className="py-3">Subtotal</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border-t hover:bg-indigo-50/40 transition">
                  <td className="py-4 flex items-center gap-4">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm border" />
                    )}
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </td>
                  <td className="py-4 font-semibold text-indigo-700">${item.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-lg font-bold"
                        disabled={item.quantity === 1}
                      >
                        −
                      </button>
                      <span className="font-semibold text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="py-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-semibold rounded transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            <button
              onClick={clearCart}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 shadow-sm font-semibold transition"
            >
              Clear Cart
            </button>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-indigo-700 mb-2">Total: ${total.toFixed(2)}</div>
              <Link
                to="/checkout"
                className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition text-lg"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 