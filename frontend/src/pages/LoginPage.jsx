import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden">
      {/* Decorative floating blob */}
      <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-30 animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#6366F1" d="M44.8,-67.2C57.7,-59.2,67.7,-48.1,73.2,-35.2C78.7,-22.3,79.7,-7.7,77.2,6.7C74.7,21.1,68.7,35.2,59.1,45.7C49.5,56.2,36.3,63.1,22.1,67.2C7.9,71.3,-7.3,72.6,-22.2,69.2C-37.1,65.8,-51.7,57.7,-61.2,45.7C-70.7,33.7,-75.1,17.8,-74.2,2.5C-73.3,-12.8,-67.2,-28.5,-57.2,-39.7C-47.2,-50.9,-33.3,-57.6,-19.1,-64.2C-4.9,-70.8,9.6,-77.2,23.7,-76.2C37.8,-75.2,51.9,-66.9,44.8,-67.2Z" transform="translate(100 100)" />
      </svg>
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center z-10">
        <div className="flex flex-col items-center mb-4">
          <svg className="w-14 h-14 mb-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <h2 className="text-3xl font-extrabold text-indigo-700">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border-none rounded-xl px-4 py-3 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border-none rounded-xl px-4 py-3 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-xl px-4 py-3 font-semibold text-lg shadow hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          type="button"
          className="mt-6 w-full text-indigo-600 hover:underline text-center text-base font-medium"
          onClick={() => navigate('/register')}
        >
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 