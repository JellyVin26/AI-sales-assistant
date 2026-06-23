import api from './api';
import type { ApiResponse, Document } from '../types';

export const documentService = {
  getAll: async (): Promise<Document[]> => {
    const response = await api.get<ApiResponse<Document[]>>('/documents');
    return response.data.data;
  },

  upload: async (file: File, title: string): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    const response = await api.post<ApiResponse<Document>>('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },
};
