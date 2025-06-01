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
  rating?: number;
}

export interface ProductPage {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const productService = {
  async getAll(page = 0, size = 10, sortBy = 'name'): Promise<ProductPage> {
    const res = await axios.get(`${API_URL}/products`, {
      params: { page, size, sortBy },
    });
    return res.data;
  },

  async getById(id: number): Promise<Product> {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  },

  async search(query: string, page = 0, size = 10): Promise<ProductPage> {
    const res = await axios.get(`${API_URL}/products/search`, {
      params: { query, page, size },
    });
    return res.data;
  },

  async getByCategory(categoryId: number, page = 0, size = 10): Promise<ProductPage> {
    const res = await axios.get(`${API_URL}/products/category/${categoryId}`, {
      params: { page, size },
    });
    return res.data;
  },
}; 