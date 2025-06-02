import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './auth/CartContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
