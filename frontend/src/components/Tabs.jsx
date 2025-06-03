import React, { useState } from 'react';

const Tabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          className={`px-4 py-2 font-medium focus:outline-none transition-colors ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`px-4 py-2 font-medium focus:outline-none transition-colors ${activeTab === 'specs' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('specs')}
        >
          Specifications
        </button>
        <button
          className={`px-4 py-2 font-medium focus:outline-none transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className="mt-2">
        {activeTab === 'description' && (
          <div className="text-gray-700 dark:text-gray-200">
            {product.description || 'No description available.'}
          </div>
        )}
        {activeTab === 'specs' && (
          <div className="text-gray-700 dark:text-gray-200">
            <ul className="list-disc pl-5">
              <li>Brand: {product.brand || 'DemoBrand'}</li>
              <li>Model: {product.model || 'DemoModel'}</li>
              <li>Color: {product.color || 'Black'}</li>
              <li>Weight: {product.weight || '1.2kg'}</li>
              <li>Dimensions: {product.dimensions || '20 x 10 x 5 cm'}</li>
              <li>Warranty: {product.warranty || '1 year'}</li>
            </ul>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="text-gray-700 dark:text-gray-200">
            <div className="mb-2 font-semibold">Customer Reviews</div>
            <div className="mb-2">⭐⭐⭐⭐☆ (4/5)</div>
            <div className="mb-4">“Great product! Highly recommend.” – Jane D.</div>
            <div className="mb-4">“Good value for money.” – John S.</div>
            <div className="mb-4">“Met my expectations.” – Alex P.</div>
            <div className="text-sm text-gray-400">(Demo reviews. Integrate real reviews for production.)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs; 