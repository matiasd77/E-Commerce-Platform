import React from 'react';

const PrivacyPolicy = () => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-2">Your privacy is important to us. We are committed to protecting your personal information.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>We collect only necessary information to process your orders</li>
      <li>Your data is never sold to third parties</li>
      <li>All transactions are encrypted and secure</li>
      <li>You can request to delete your account at any time</li>
    </ul>
    <p>Contact us at <a href="mailto:support@ecommerce.com" className="text-blue-600 underline">support@ecommerce.com</a> for privacy-related questions.</p>
  </div>
);

export default PrivacyPolicy; 