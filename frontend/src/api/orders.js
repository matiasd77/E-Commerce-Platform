import axios from './axiosInstance';

export const createOrder = (shippingAddress, paymentMethod) =>
  axios.post('/api/orders', null, { params: { shippingAddress, paymentMethod } });
export const getUserOrders = () => axios.get('/api/orders');
export const getOrder = (orderId) => axios.get(`/api/orders/${orderId}`);
export const cancelOrder = (orderId) => axios.put(`/api/orders/${orderId}/cancel`);
export const getAllOrders = () => axios.get('/api/orders/admin');
export const updateOrderStatus = (orderId, status) => axios.put(`/api/orders/admin/${orderId}/status`, null, { params: { status } });
export const updatePaymentStatus = (orderId, status, stripePaymentId) =>
  axios.put(`/api/orders/${orderId}/payment`, null, { params: { status, stripePaymentId } }); 