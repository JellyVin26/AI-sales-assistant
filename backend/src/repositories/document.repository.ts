import { prisma } from '../config';
import { Document, Prisma } from '@prisma/client';

export class DocumentRepository {
  async findById(id: string): Promise<Document | null> {
    return prisma.document.findUnique({ where: { id } });
  }

  async findByBusinessId(businessId: string) {
    return prisma.document.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.DocumentCreateInput): Promise<Document> {
    return prisma.document.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.document.delete({ where: { id } });
  }

  async findAllByBusinessId(businessId: string): Promise<Document[]> {
    return prisma.document.findMany({ where: { businessId } });
  }
}
