import { prisma } from '../config';
import { Conversation, ConversationStatus, Prisma } from '@prisma/client';

export class ConversationRepository {
  async findById(id: string) {
    return prisma.conversation.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  async findByBusinessId(businessId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [conversations, total] = await Promise.all([
      prisma.conversation.findMany({
        where: { businessId },
        include: { messages: { orderBy: { createdAt: 'desc' }, take: 1 } },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.conversation.count({ where: { businessId } }),
    ]);
    return { conversations, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async create(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return prisma.conversation.create({ data });
  }

  async updateStatus(id: string, status: ConversationStatus): Promise<Conversation> {
    return prisma.conversation.update({ where: { id }, data: { status } });
  }

  async countByBusinessId(businessId: string): Promise<number> {
    return prisma.conversation.count({ where: { businessId } });
  }

  async countActiveByBusinessId(businessId: string): Promise<number> {
    return prisma.conversation.count({ where: { businessId, status: 'ACTIVE' } });
  }
}
