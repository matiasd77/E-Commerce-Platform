import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export const adminCategoryService = {
  async addCategory(data: CreateCategoryRequest): Promise<Category> {
    const res = await axios.post(`${API_URL}/admin/categories`, data);
    return res.data;
  },

  async getAllCategories(): Promise<Category[]> {
    const res = await axios.get(`${API_URL}/admin/categories`);
    return res.data;
  },
}; 