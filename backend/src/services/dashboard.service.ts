import { ConversationRepository, ProductRepository, DocumentRepository, BusinessRepository } from '../repositories';
import { DashboardResponse } from '../dtos';
import { NotFoundError } from '../exceptions';
import { prisma } from '../config';

export class DashboardService {
  private conversationRepository: ConversationRepository;
  private productRepository: ProductRepository;
  private documentRepository: DocumentRepository;
  private businessRepository: BusinessRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.productRepository = new ProductRepository();
    this.documentRepository = new DocumentRepository();
    this.businessRepository = new BusinessRepository();
  }

  async getDashboard(userId: string): Promise<DashboardResponse> {
    const business = await this.businessRepository.findByUserId(userId);
    if (!business) throw new NotFoundError('Business');

    const [totalChats, activeCustomers, products, documents, recentConversations] = await Promise.all([
      this.conversationRepository.countByBusinessId(business.id),
      this.conversationRepository.countActiveByBusinessId(business.id),
      this.productRepository.findByBusinessId(business.id, 1, 100),
      this.documentRepository.findByBusinessId(business.id),
      prisma.conversation.findMany({
        where: { businessId: business.id },
        include: { messages: true },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      stats: {
        totalChats,
        activeCustomers,
        totalProducts: products.total,
        totalDocuments: documents.length,
      },
      topQuestions: [], // Will be implemented with analytics
      popularProducts: [], // Will be implemented with analytics
      recentConversations: recentConversations.map((c) => ({
        id: c.id,
        customerName: c.customerName,
        status: c.status,
        messageCount: c.messages.length,
        lastMessageAt: c.updatedAt,
      })),
    };
  }
}
