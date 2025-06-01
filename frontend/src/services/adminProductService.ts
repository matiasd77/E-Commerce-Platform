import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categories: { id: number; name: string }[];
  active: boolean;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryIds: number[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: string[];
  categoryIds?: number[];
  active?: boolean;
}

export interface UpdateStockRequest {
  stock: number;
}

export const adminProductService = {
  async addProduct(data: CreateProductRequest): Promise<Product> {
    const res = await axios.post(`${API_URL}/admin/products`, data);
    return res.data;
  },

  async updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    const res = await axios.put(`${API_URL}/admin/products/${id}`, data);
    return res.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await axios.delete(`${API_URL}/admin/products/${id}`);
  },

  async updateStock(id: number, data: UpdateStockRequest): Promise<Product> {
    const res = await axios.put(`${API_URL}/admin/products/${id}/stock`, data);
    return res.data;
  },
}; 