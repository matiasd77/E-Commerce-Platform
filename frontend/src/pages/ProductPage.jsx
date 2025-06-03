import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../auth/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0">
        <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded mb-4 overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-xl text-gray-700 mb-4">${product.price}</p>
        <p className="mb-6 text-gray-600">{product.description || 'No description available.'}</p>
        <button
          onClick={() => addToCart(product)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage; 