import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface OrderItem {
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const orderService = {
  async getUserOrders(): Promise<Order[]> {
    const res = await axios.get(`${API_URL}/orders`);
    return res.data;
  },

  async getOrderDetails(orderId: number): Promise<Order> {
    const res = await axios.get(`${API_URL}/orders/${orderId}`);
    return res.data;
  },
}; 