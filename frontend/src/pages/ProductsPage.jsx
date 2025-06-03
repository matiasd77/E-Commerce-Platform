import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
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

const ProductsPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-100 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);

export default ProductsPage; 