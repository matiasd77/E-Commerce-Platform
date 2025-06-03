import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './auth/CartContext';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100 mt-20 transition-colors">
              <Navbar />
              <AppRoutes />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
