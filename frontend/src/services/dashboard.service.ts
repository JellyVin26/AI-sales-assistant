import api from './api';
import { ApiResponse, DashboardData } from '../types';

export const dashboardService = {
  getData: async (): Promise<DashboardData> => {
    const response = await api.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data.data;
  },
};
