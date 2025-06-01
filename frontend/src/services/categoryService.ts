import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  },
}; 