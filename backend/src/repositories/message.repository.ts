import { prisma } from '../config';
import { Message, MessageRole, Prisma } from '@prisma/client';

export class MessageRepository {
  async create(data: Prisma.MessageCreateInput): Promise<Message> {
    return prisma.message.create({ data });
  }

  async findByConversationId(conversationId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
