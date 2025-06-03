import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser, updateUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getCurrentUser()
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem('jwt', res.data.token);
    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await apiRegister(data);
    localStorage.setItem('jwt', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  const updateUserProfile = async (data) => {
    const res = await updateUser(data);
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}; 