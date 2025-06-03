import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminProducts from '../components/AdminProducts';
import AdminCategories from '../components/AdminCategories';
import AdminOrders from '../components/AdminOrders';
import AdminSettings from '../components/AdminSettings';
import { FaBox, FaList, FaShoppingCart, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [tab, setTab] = useState('overview');
  const { user, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (tab) {
      case 'products':
        return <AdminProducts />;
      case 'categories':
        return <AdminCategories />;
      case 'orders':
        return <AdminOrders />;
      case 'settings':
        return <AdminSettings />;
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <FaShoppingCart className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold">1,234</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <FaBox className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-semibold">567</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <FaList className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <FaChartBar className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-2xl font-semibold">$45,678</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {/* Placeholder for recent orders */}
                  <p className="text-gray-500">Loading recent orders...</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Low Stock Products</h3>
                <div className="space-y-4">
                  {/* Placeholder for low stock products */}
                  <p className="text-gray-500">Loading low stock products...</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {user.firstName}</p>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setTab('overview')}
            className={`flex items-center px-6 py-3 w-full text-left ${
              tab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaChartBar className="w-5 h-5 mr-3" />
            Overview
          </button>
          <button
            onClick={() => setTab('products')}
            className={`flex items-center px-6 py-3 w-full text-left ${
              tab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaBox className="w-5 h-5 mr-3" />
            Products
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex items-center px-6 py-3 w-full text-left ${
              tab === 'categories' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaList className="w-5 h-5 mr-3" />
            Categories
          </button>
          <button
            onClick={() => setTab('orders')}
            className={`flex items-center px-6 py-3 w-full text-left ${
              tab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`flex items-center px-6 py-3 w-full text-left ${
              tab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaCog className="w-5 h-5 mr-3" />
            Settings
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center px-6 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg"
          >
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 