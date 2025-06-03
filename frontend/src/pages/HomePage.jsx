import React from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 flex flex-col">
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">Find the Best Deals on Your Favorite Products</h1>
          <p className="text-lg md:text-2xl text-white mb-8 drop-shadow">Shop the latest electronics, gadgets, and more at unbeatable prices.</p>
          <a href="/products" className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition text-lg">Start Shopping</a>
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
    </div>
  );
};

export default HomePage; 