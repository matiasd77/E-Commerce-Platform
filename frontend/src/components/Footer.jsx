import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="w-full bg-gradient-to-br from-indigo-200/60 to-white/80 py-12 px-2 mt-16">
      <div className="max-w-5xl mx-auto rounded-3xl shadow-xl backdrop-blur-md bg-white/70 border border-indigo-100 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0 px-8 py-10">
        {/* Logo & Tagline */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <span className="text-2xl font-extrabold text-indigo-700 mb-2">ShopEase</span>
          <span className="text-gray-500">Your one-stop shop for everything!</span>
        </div>
        {/* Quick Links & User Profile */}
        <div className="flex-1 flex flex-col items-center">
          <span className="font-semibold text-gray-700 mb-2">Quick Links</span>
          <div className="flex flex-col gap-1 text-center">
            <a href="/" className="hover:text-indigo-600 transition">Home</a>
            <a href="/products" className="hover:text-indigo-600 transition">Products</a>
            <a href="/cart" className="hover:text-indigo-600 transition">Cart</a>
            {!user && <a href="/login" className="hover:text-indigo-600 transition">Login/Register</a>}
          </div>
        </div>
        {/* Contact & Social */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <span className="font-semibold text-gray-700 mb-2">Contact</span>
          <span className="text-gray-500">support@shopease.com</span>
          <span className="text-gray-500 mb-2">+1 234 567 890</span>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-sky-500 hover:text-sky-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.385.104-.792.16-1.211.16-.296 0-.583-.028-.862-.08.584 1.822 2.28 3.148 4.29 3.184A9.868 9.868 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-700 hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-pink-500 hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.635.4 3.661 1.374c-.974.974-1.246 2.241-1.308 3.608C2.175 8.414 2.163 8.794 2.163 12c0 3.206.012 3.586.07 4.85.062 1.366.334 2.633 1.308 3.608.974.974 2.241 1.246 3.608 1.308 1.266.058 1.646.069 4.85.069s3.584-.012 4.85-.07c1.366-.062 2.633-.334 3.608-1.308.974-.974 1.246-2.241 1.308-3.608.058-1.266.069-1.646.069-4.85s-.012-3.584-.07-4.85c-.062-1.366-.334-2.633-1.308-3.608-.974-.974-2.241-1.246-3.608-1.308C15.647.012 15.267 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm py-4">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</div>
    </footer>
  );
};

export default Footer; 