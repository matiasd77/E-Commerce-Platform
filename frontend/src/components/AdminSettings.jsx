import React, { useState } from 'react';
import { FaSave, FaStore, FaUserCog, FaBell, FaShieldAlt, FaUser } from 'react-icons/fa';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'E-Commerce Platform',
      siteDescription: 'Your one-stop shop for all your needs',
      maintenanceMode: false,
      currency: 'USD',
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      lowStockAlerts: true,
      newUserNotifications: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
    },
    store: {
      taxRate: 8.5,
      shippingEnabled: true,
      freeShippingThreshold: 100,
      returnPolicy: '30 days return policy',
    },
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      phone: '+1 234 567 8900',
      title: 'Store Administrator',
      bio: 'Store administrator with full access to all features.',
    }
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    // TODO: Implement API call to save settings
    alert(`${section} settings saved successfully!`);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleChange('general', 'siteName', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
          rows="3"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select
          value={settings.general.currency}
          onChange={(e) => handleChange('general', 'currency', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleChange('general', 'maintenanceMode', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
          Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="emailNotifications"
          checked={settings.notifications.emailNotifications}
          onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
          Email Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="orderNotifications"
          checked={settings.notifications.orderNotifications}
          onChange={(e) => handleChange('notifications', 'orderNotifications', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="orderNotifications" className="ml-2 block text-sm text-gray-700">
          Order Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="lowStockAlerts"
          checked={settings.notifications.lowStockAlerts}
          onChange={(e) => handleChange('notifications', 'lowStockAlerts', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="lowStockAlerts" className="ml-2 block text-sm text-gray-700">
          Low Stock Alerts
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="newUserNotifications"
          checked={settings.notifications.newUserNotifications}
          onChange={(e) => handleChange('notifications', 'newUserNotifications', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="newUserNotifications" className="ml-2 block text-sm text-gray-700">
          New User Notifications
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
          Enable Two-Factor Authentication
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (days)</label>
        <input
          type="number"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleChange('security', 'passwordExpiry', parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
        <input
          type="number"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => handleChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderStoreSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
        <input
          type="number"
          step="0.1"
          value={settings.store.taxRate}
          onChange={(e) => handleChange('store', 'taxRate', parseFloat(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="shippingEnabled"
          checked={settings.store.shippingEnabled}
          onChange={(e) => handleChange('store', 'shippingEnabled', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="shippingEnabled" className="ml-2 block text-sm text-gray-700">
          Enable Shipping
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold ($)</label>
        <input
          type="number"
          value={settings.store.freeShippingThreshold}
          onChange={(e) => handleChange('store', 'freeShippingThreshold', parseFloat(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Return Policy</label>
        <textarea
          value={settings.store.returnPolicy}
          onChange={(e) => handleChange('store', 'returnPolicy', e.target.value)}
          rows="3"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={settings.profile.firstName}
            onChange={(e) => handleChange('profile', 'firstName', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={settings.profile.lastName}
            onChange={(e) => handleChange('profile', 'lastName', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={settings.profile.email}
          onChange={(e) => handleChange('profile', 'email', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={settings.profile.phone}
          onChange={(e) => handleChange('profile', 'phone', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={settings.profile.title}
          onChange={(e) => handleChange('profile', 'title', e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => handleChange('profile', 'bio', e.target.value)}
          rows="3"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'store':
        return renderStoreSettings();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUser className="mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === 'general'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaStore className="mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaBell className="mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaShieldAlt className="mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === 'store'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUserCog className="mr-2" />
              Store
            </button>
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
          <div className="mt-6">
            <button
              onClick={() => handleSave(activeTab)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 