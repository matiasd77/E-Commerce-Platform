import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Order {
  id: number;
  orderNumber: string;
  items: {
    product: {
      id: number;
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
    price: number;
  }[];
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

export interface UpdateOrderStatusRequest {
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
}

export const adminOrderService = {
  async getAllOrders(): Promise<Order[]> {
    const res = await axios.get(`${API_URL}/admin/orders`);
    return res.data;
  },

  async getOrderById(id: number): Promise<Order> {
    const res = await axios.get(`${API_URL}/admin/orders/${id}`);
    return res.data;
  },

  async updateOrderStatus(id: number, data: UpdateOrderStatusRequest): Promise<Order> {
    const res = await axios.put(`${API_URL}/admin/orders/${id}/status`, data);
    return res.data;
  },
}; 