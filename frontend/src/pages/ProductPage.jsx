import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProducts } from '../api/products';
import { useCart } from '../auth/CartContext';
import PrimaryButton from '../components/PrimaryButton';
import { useToast } from '../components/ToastContext';
import { FaCheckCircle, FaShippingFast, FaLock, FaImage, FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Tabs from '../components/Tabs';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [mainImage, setMainImage] = useState(null);
  const [showShipping, setShowShipping] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
        // Set main image
        if (res.data.images && res.data.images.length > 0) {
          setMainImage(res.data.images[0]);
        } else {
          setMainImage(res.data.imageUrl);
        }
      })
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Fetch related products (for now, just get a few random products)
    getProducts().then(res => {
      const products = Array.isArray(res.data) ? res.data : res.data.content || [];
      const others = products.filter(p => String(p.id) !== String(id));
      setRelated(others.slice(0, 4));
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8 text-red-500">{error}</div>;
  if (!product) return null;

  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= 5;

  return (
    <>
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">Products</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-200 font-semibold">{product.name}</span>
        </nav>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image Gallery & Tabs */}
          <div className="md:w-2/3 flex flex-col gap-4">
            {/* Image Gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center min-h-[350px]">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-h-80 object-contain mb-3 rounded-lg"
                  onError={e => { e.target.onerror = null; setMainImage(null); }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-80 w-full text-gray-400 dark:text-gray-500">
                  <FaImage className="text-6xl mb-2" />
                  <span className="text-lg">No Image Available</span>
                </div>
              )}
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-16 h-16 object-cover rounded border-2 cursor-pointer transition-all duration-200 ${mainImage === img ? 'border-primary ring-2 ring-primary' : 'border-gray-200 dark:border-gray-700'}`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Trust Badges */}
            <div className="flex gap-3 mt-2">
              <span className="flex items-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                <FaCheckCircle className="text-green-500" /> Genuine
              </span>
              <span className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                <FaShippingFast className="text-blue-500" /> Fast Shipping
              </span>
              <span className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                <FaLock className="text-yellow-500" /> Secure
              </span>
            </div>
            {/* Product Details Tabs */}
            <div className="mt-6">
              <Tabs product={product} />
            </div>
            {/* Q&A Section */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                <FaQuestionCircle className="text-blue-500" /> Q&A
              </div>
              <div className="mb-2 text-gray-700 dark:text-gray-200">Have a question? <span className="underline cursor-pointer text-blue-600 dark:text-blue-400">Ask here</span> (demo only)</div>
              <div className="space-y-2">
                <div className="bg-gray-100 dark:bg-gray-900 rounded p-3">
                  <div className="font-medium">Q: Does this laptop come with a charger?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">A: Yes, all accessories are included. – Seller</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 rounded p-3">
                  <div className="font-medium">Q: What is the warranty period?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">A: 1 year manufacturer warranty. – Seller</div>
                </div>
              </div>
            </div>
          </div>
          {/* Sticky Add to Cart Sidebar */}
          <div className="md:w-1/3">
            <div className="md:sticky md:top-24 bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              {/* More Product Info */}
              <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1">
                {product.sku && <div><span className="font-semibold text-gray-700 dark:text-gray-200">SKU:</span> {product.sku}</div>}
                {product.brand && <div><span className="font-semibold text-gray-700 dark:text-gray-200">Brand:</span> {product.brand}</div>}
                <div><span className="font-semibold text-gray-700 dark:text-gray-200">Shipping:</span> {product.shippingInfo || 'Ships in 1-2 business days'}</div>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-xl font-semibold text-primary">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">${product.oldPrice}</span>
                )}
                {product.oldPrice && (
                  <span className="ml-2 text-green-600 dark:text-green-400 font-medium">Save ${product.oldPrice - product.price}</span>
                )}
              </div>
              {/* Stock Level Indicator */}
              <div className="mb-2">
                {product.stock > 0 ? (
                  <>
                    <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
                    {product.stock <= 10 && (
                      <span className="ml-2 text-red-500 dark:text-red-400 font-semibold animate-pulse">Only {product.stock} left!</span>
                    )}
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mt-1">
                      <div
                        className={`h-2 rounded ${product.stock > 10 ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`}
                        style={{ width: `${Math.min(100, product.stock * 10)}%` }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                )}
              </div>
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mb-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">-</button>
                <span className="px-3">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">+</button>
              </div>
              {/* Add to Cart Button */}
              <PrimaryButton
                onClick={() => {
                  addToCart(product, quantity);
                  showToast('Added to cart!');
                }}
                disabled={product.stock === 0}
                className="w-full"
              >
                Add to Cart
              </PrimaryButton>
              {/* Share Buttons */}
              <div className="flex gap-3 mt-2">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" title="Share on Facebook">
                  <i className="fab fa-facebook-square text-2xl"></i>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this product!`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="Share on Twitter">
                  <i className="fab fa-twitter-square text-2xl"></i>
                </a>
                <a href={`https://wa.me/?text=Check out this product! ${window.location.href}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500" title="Share on WhatsApp">
                  <i className="fab fa-whatsapp-square text-2xl"></i>
                </a>
                <button onClick={() => {navigator.clipboard.writeText(window.location.href)}} className="hover:text-gray-600 dark:hover:text-gray-300" title="Copy link">
                  <i className="fas fa-link text-2xl"></i>
                </button>
              </div>
              {/* Shipping & Returns Collapsible */}
              <div className="mt-2">
                <button
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                  onClick={() => setShowShipping(s => !s)}
                >
                  <FaShippingFast /> Shipping & Returns
                  {showShipping ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {showShipping && (
                  <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm bg-blue-50 dark:bg-blue-900 rounded p-3">
                    <div><span className="font-semibold">Shipping:</span> Free shipping on orders over $50. Ships in 1-2 business days.</div>
                    <div className="mt-1"><span className="font-semibold">Returns:</span> 30-day hassle-free returns. See our <Link to='/returns' className='underline'>Returns Policy</Link>.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </div>
      {/* Sticky Add to Cart Bar for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-30 md:hidden flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">${product.price}</span>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">-</button>
          <span className="px-2">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">+</button>
        </div>
        <PrimaryButton
          onClick={() => {
            addToCart(product, quantity);
            showToast('Added to cart!');
          }}
          disabled={product.stock === 0}
          className="px-6 py-2"
        >
          Add to Cart
        </PrimaryButton>
      </div>
    </>
  );
};

export default ProductPage; 