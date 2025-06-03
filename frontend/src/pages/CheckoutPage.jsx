import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../auth/CartContext';
import { createOrder } from '../api/orders';

// Card type icons as SVG components
const CardIcons = {
  visa: (
    <svg viewBox="0 0 48 48" className="w-12 h-8">
      <path fill="#1A1F71" d="M45,35.5H3c-1.7,0-3-1.3-3-3v-17c0-1.7,1.3-3,3-3h42c1.7,0,3,1.3,3,3v17C48,34.2,46.7,35.5,45,35.5z"/>
      <path fill="#F7B600" d="M34.3,23.5l-3.1-8.3h-2.1l-3.1,8.3H34.3z"/>
      <path fill="#F7B600" d="M24.9,15.2h-2.1l-3.1,8.3h2.1L24.9,15.2z"/>
      <path fill="#F7B600" d="M15.5,15.2h-2.1l-3.1,8.3h2.1L15.5,15.2z"/>
    </svg>
  ),
  mastercard: (
    <svg viewBox="0 0 48 48" className="w-12 h-8">
      <path fill="#FF5F00" d="M32,10H16c-3.3,0-6,2.7-6,6v16c0,3.3,2.7,6,6,6h16c3.3,0,6-2.7,6-6V16C38,12.7,35.3,10,32,10z"/>
      <path fill="#EB001B" d="M24,22c0-4.4,3.6-8,8-8c2.2,0,4.2,0.9,5.7,2.3C35.7,14.9,32.9,14,30,14c-5.5,0-10,4.5-10,10s4.5,10,10,10c2.9,0,5.7-1.2,7.7-3.3C36.2,33.1,34.2,34,32,34C27.6,34,24,30.4,24,26"/>
      <path fill="#F79E1B" d="M24,22c0-4.4-3.6-8-8-8c-2.2,0-4.2,0.9-5.7,2.3C12.3,14.9,15.1,14,18,14c5.5,0,10,4.5,10,10s-4.5,10-10,10c-2.9,0-5.7-1.2-7.7-3.3C11.8,33.1,13.8,34,16,34C20.4,34,24,30.4,24,26"/>
    </svg>
  ),
  amex: (
    <svg viewBox="0 0 48 48" className="w-12 h-8">
      <path fill="#006FCF" d="M45,35.5H3c-1.7,0-3-1.3-3-3v-17c0-1.7,1.3-3,3-3h42c1.7,0,3,1.3,3,3v17C48,34.2,46.7,35.5,45,35.5z"/>
      <path fill="#FFFFFF" d="M24,15.2l-4.5,8.3h9L24,15.2z M19.5,23.5l-4.5,8.3h9L19.5,23.5z M28.5,23.5l-4.5,8.3h9L28.5,23.5z"/>
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 48 48" className="w-12 h-8">
      <path fill="#FF6000" d="M45,35.5H3c-1.7,0-3-1.3-3-3v-17c0-1.7,1.3-3,3-3h42c1.7,0,3,1.3,3,3v17C48,34.2,46.7,35.5,45,35.5z"/>
      <path fill="#FFFFFF" d="M24,15.2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,15.2,24,15.2z"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 48 48" className="w-12 h-8">
      <path fill="#CCCCCC" d="M45,35.5H3c-1.7,0-3-1.3-3-3v-17c0-1.7,1.3-3,3-3h42c1.7,0,3,1.3,3,3v17C48,34.2,46.7,35.5,45,35.5z"/>
      <path fill="#999999" d="M24,15.2l-4.5,8.3h9L24,15.2z"/>
    </svg>
  )
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardType, setCardType] = useState('default');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit_card',
    // Credit card fields
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Detect card type based on card number
  const detectCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    
    if (/^4/.test(cleaned)) {
      return 'visa';
    } else if (/^5[1-5]/.test(cleaned)) {
      return 'mastercard';
    } else if (/^3[47]/.test(cleaned)) {
      return 'amex';
    } else if (/^6(?:011|5)/.test(cleaned)) {
      return 'discover';
    }
    return 'default';
  };

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
    setCardType(detectCardType(formattedValue));
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;
      const response = await createOrder(shippingAddress, formData.paymentMethod);
      clearCart();
      navigate(`/orders/${response.data.id}`);
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100">
        <div className="bg-white/80 shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-indigo-700">Checkout</h2>
          <p className="text-gray-500">Your cart is empty.</p>
          <button
            onClick={() => navigate('/')} 
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex flex-col items-center py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-700 drop-shadow">Checkout</h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 flex flex-col justify-between min-h-[350px]">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
          <div className="space-y-6 flex-1">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-indigo-700">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between items-center font-bold text-xl">
                <p>Total</p>
                <p className="text-indigo-700">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Shipping Information</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            {/* Credit Card Section */}
            {formData.paymentMethod === 'credit_card' && (
              <div className="space-y-4">
                {/* Card Preview */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-gradient-to-tr from-indigo-400 via-indigo-600 to-blue-400 rounded-xl shadow-lg p-4 flex items-center w-64 h-32 relative">
                    <div className="absolute top-3 right-3">{CardIcons[cardType]}</div>
                    <div className="text-white text-lg tracking-widest font-mono mb-2 mt-6">{formData.cardNumber || '•••• •••• •••• ••••'}</div>
                    <div className="flex justify-between w-full text-xs text-indigo-100">
                      <span>{formData.cardHolderName || 'CARD HOLDER'}</span>
                      <span>{formData.expiryDate || 'MM/YY'}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition font-mono tracking-widest"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      placeholder="CVV"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition text-lg font-bold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 