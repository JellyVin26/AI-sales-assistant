import api from './api';
import { ApiResponse, ChatResponse, Conversation, SendMessageRequest } from '../types';

export const chatService = {
  sendMessage: async (businessId: string, data: SendMessageRequest): Promise<ChatResponse> => {
    const response = await api.post<ApiResponse<ChatResponse>>(`/chat/${businessId}/message`, data);
    return response.data.data;
  },

  getConversations: async (page = 1, limit = 10) => {
    const response = await api.get<ApiResponse<{ conversations: Conversation[]; total: number; page: number; limit: number; totalPages: number }>>(
      `/chat/conversations?page=${page}&limit=${limit}`
    );
    return response.data.data;
  },

  getConversation: async (id: string): Promise<Conversation> => {
    const response = await api.get<ApiResponse<Conversation>>(`/chat/conversations/${id}`);
    return response.data.data;
  },
};
