import axios from './axiosInstance';
 
export const login = (data) => axios.post('/api/auth/login', data);
export const register = (data) => axios.post('/api/auth/register', data);
export const getCurrentUser = () => axios.get('/api/auth/me');
export const updateUser = (data) => axios.put('/api/auth/me', data); 