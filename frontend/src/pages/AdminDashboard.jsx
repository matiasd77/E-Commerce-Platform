import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminProducts from '../components/AdminProducts';
import AdminCategories from '../components/AdminCategories';
import AdminOrders from '../components/AdminOrders';

const AdminDashboard = () => {
  const [tab, setTab] = useState('products');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    } else if (user.role !== 'ADMIN') {
      navigate('/user', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${tab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('categories')}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 rounded ${tab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
      </div>
      {tab === 'products' && <AdminProducts />}
      {tab === 'categories' && <AdminCategories />}
      {tab === 'orders' && <AdminOrders />}
    </div>
  );
};

export default AdminDashboard; 