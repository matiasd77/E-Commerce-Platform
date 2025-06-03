import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './auth/CartContext';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <AppRoutes />
    </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
