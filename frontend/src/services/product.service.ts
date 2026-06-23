import api from './api';
import { ApiResponse, Product, CreateProductRequest, UpdateProductRequest } from '../types';

export const productService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get<ApiResponse<{ products: Product[]; total: number; page: number; limit: number; totalPages: number }>>(
      `/products?page=${page}&limit=${limit}`
    );
    return response.data.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post<ApiResponse<Product>>('/products', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
