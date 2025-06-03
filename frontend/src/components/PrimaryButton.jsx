import React from 'react';

const PrimaryButton = ({ children, type = 'button', className = '', ...props }) => (
  <button
    type={type}
    className={`px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-sm md:text-base ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton; 