import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../auth/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div className="border rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition">
      <Link to={`/product/${product.id}`} className="w-full flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 mb-2 flex items-center justify-center overflow-hidden rounded">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-1 text-center">{product.name}</h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
      </Link>
      <button onClick={handleAddToCart} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add to Cart</button>
    </div>
  );
};

export default ProductCard; 