import api from './api';
import type { ApiResponse } from '../types';

export interface UpdateBusinessRequest {
  name: string;
  website?: string;
  description?: string;
}

export const businessService = {
  updateBusiness: async (data: UpdateBusinessRequest) => {
    const response = await api.put<ApiResponse<any>>('/business', data);
    return response.data.data;
  },
};
