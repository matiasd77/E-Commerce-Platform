import React from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { FaShippingFast, FaHeadset, FaUndoAlt, FaLock } from 'react-icons/fa';
import BackToTopButton from '../components/BackToTopButton';
import { useAuth } from '../auth/AuthContext';

const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality sound, noise cancellation, 20h battery.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness, heart rate, and notifications.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable, waterproof, and powerful bass.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'DSLR Camera',
    description: 'Capture stunning photos and 4K videos.',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 flex flex-col mt-20">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] w-full overflow-hidden">
        {/* Background Image */}
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80" alt="Shop Hero" className="absolute inset-0 w-full h-full object-cover object-center z-0" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Floating SVG Blobs */}
        <svg className="absolute top-10 left-10 w-32 h-32 opacity-30 z-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#6366F1" d="M44.8,-67.2C56.6,-59.2,62.7,-42.2,68.2,-26.2C73.7,-10.2,78.6,4.8,75.2,18.2C71.8,31.6,60.1,43.4,47.2,51.7C34.3,60,20.1,64.8,5.2,67.2C-9.7,69.6,-19.4,69.6,-32.2,66.2C-45,62.8,-60.8,56,-67.2,44.2C-73.6,32.4,-70.6,15.7,-68.2,0.2C-65.8,-15.3,-64,-30.6,-56.7,-39.7C-49.4,-48.8,-36.7,-51.7,-23.7,-58.2C-10.7,-64.7,3.6,-74.8,18.2,-77.2C32.8,-79.6,49,-74.2,44.8,-67.2Z" transform="translate(100 100)" /></svg>
        <svg className="absolute bottom-10 right-10 w-40 h-40 opacity-20 z-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#818CF8" d="M38.2,-62.7C51.2,-54.2,63.2,-44.2,68.2,-31.7C73.2,-19.2,71.2,-4.2,67.2,10.2C63.2,24.6,57.2,38.4,46.2,47.7C35.2,57,19.2,61.8,3.2,58.6C-12.8,55.4,-25.6,44.2,-36.2,33.2C-46.8,22.2,-55.2,11.1,-59.2,-2.2C-63.2,-15.5,-62.8,-31,-54.8,-41.2C-46.8,-51.4,-31.2,-56.2,-16.2,-62.2C-1.2,-68.2,13.2,-75.2,27.2,-74.2C41.2,-73.2,55.2,-65.2,38.2,-62.7Z" transform="translate(100 100)" /></svg>
        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center text-center px-6 py-20 max-w-2xl mx-auto">
          {user && (
            <div className="text-lg md:text-xl text-white font-semibold mb-2 drop-shadow animate-fade-in">
              Welcome back, {user.firstName || user.email || 'User'}!
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">Find the Best Deals on Your Favorite Products</h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow">Shop the latest electronics, gadgets, and more at unbeatable prices.</p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-lg"
          >
            Start Shopping
          </a>
          {/* Trusted by Badge */}
          <div className="mt-6 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 font-semibold px-4 py-2 rounded-full shadow text-base">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
              Trusted by 10,000+ Customers
            </span>
          </div>
          {/* Shop by Category Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/products?category=electronics" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-full font-medium shadow transition-all duration-200">Electronics</a>
            <a href="/products?category=accessories" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-2 rounded-full font-medium shadow transition-all duration-200">Accessories</a>
            <a href="/products?category=wearables" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 text-white px-6 py-2 rounded-full font-medium shadow transition-all duration-200">Wearables</a>
            <a href="/products?category=cameras" className="bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-full font-medium shadow transition-all duration-200">Cameras</a>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaShippingFast className="text-indigo-600 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
            <p className="text-gray-500 text-center text-sm">On all orders over $50</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaHeadset className="text-indigo-600 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">24/7 Support</h3>
            <p className="text-gray-500 text-center text-sm">We're here to help anytime</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaUndoAlt className="text-indigo-600 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
            <p className="text-gray-500 text-center text-sm">30-day hassle-free returns</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <FaLock className="text-indigo-600 w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Secure Checkout</h3>
            <p className="text-gray-500 text-center text-sm">100% secure payment</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage; 