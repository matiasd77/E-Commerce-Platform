import axios from './axiosInstance';
 
export const getCart = () => axios.get('/api/cart');
export const addItemToCart = (data) => axios.post('/api/cart/items', data);
export const updateCartItemQuantity = (itemId, quantity) => axios.put(`/api/cart/items/${itemId}`, null, { params: { quantity } });
export const removeItemFromCart = (itemId) => axios.delete(`/api/cart/items/${itemId}`);
export const clearCart = () => axios.delete('/api/cart'); 