import axios from './axiosInstance';

export const getProducts = (params) => axios.get('/api/products', { params });
export const searchProducts = (params) => axios.get('/api/products/search', { params });
export const getProductById = (id) => axios.get(`/api/products/${id}`);
export const getProductsByCategory = (categoryId, params) => axios.get(`/api/products/category/${categoryId}`, { params });
// Admin
export const createProduct = (data) => axios.post('/api/products', data);
export const updateProduct = (id, data) => axios.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`/api/products/${id}`);
export const getProductsByIds = (ids) => axios.post('/api/products/batch', ids);
export const uploadProductImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/api/products/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}; 