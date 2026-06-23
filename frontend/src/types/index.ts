// Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  business?: Business;
}

export interface Business {
  id: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  sku: string | null;
  variants: Record<string, unknown> | null;
  isActive: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
  sku?: string;
  variants?: Record<string, unknown>;
  imageUrl?: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: 'PDF' | 'DOCX' | 'TXT';
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

// Chat Types
export interface Conversation {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  status: 'ACTIVE' | 'CLOSED' | 'ARCHIVED';
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  createdAt: string;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  customerName?: string;
  customerEmail?: string;
}

export interface ChatResponse {
  conversationId: string;
  message: Message;
}

// Dashboard Types
export interface DashboardStats {
  totalChats: number;
  activeCustomers: number;
  totalProducts: number;
  totalDocuments: number;
}

export interface DashboardData {
  stats: DashboardStats;
  topQuestions: { question: string; count: number }[];
  popularProducts: { id: string; name: string; mentionCount: number }[];
  recentConversations: {
    id: string;
    customerName: string | null;
    status: string;
    messageCount: number;
    lastMessageAt: string;
  }[];
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
