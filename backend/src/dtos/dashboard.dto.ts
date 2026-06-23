export interface DashboardStats {
  totalChats: number;
  activeCustomers: number;
  totalProducts: number;
  totalDocuments: number;
}

export interface TopQuestion {
  question: string;
  count: number;
}

export interface PopularProduct {
  id: string;
  name: string;
  mentionCount: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  topQuestions: TopQuestion[];
  popularProducts: PopularProduct[];
  recentConversations: {
    id: string;
    customerName: string | null;
    status: string;
    messageCount: number;
    lastMessageAt: Date;
  }[];
}
