import React from 'react';

const ShippingInfo = () => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
    <p className="mb-2">We offer standard and express shipping options for all orders.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Standard shipping: 3-5 business days</li>
      <li>Express shipping: 1-2 business days</li>
      <li>Free shipping on orders over $50</li>
      <li>Order tracking available for all shipments</li>
    </ul>
    <p>If you have any questions about your shipment, please contact our support team at <a href="mailto:support@ecommerce.com" className="text-blue-600 underline">support@ecommerce.com</a>.</p>
  </div>
);

export default ShippingInfo; 