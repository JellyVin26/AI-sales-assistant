import { prisma } from '../config';
import { Business } from '@prisma/client';

export class BusinessRepository {
  async findByUserId(userId: string): Promise<Business | null> {
    return prisma.business.findUnique({ where: { userId } });
  }

  async findById(id: string): Promise<Business | null> {
    return prisma.business.findUnique({ where: { id } });
  }

  async create(data: { name: string; userId: string; description?: string; website?: string }): Promise<Business> {
    return prisma.business.create({ data });
  }

  async update(id: string, data: Partial<Business>): Promise<Business> {
    return prisma.business.update({ where: { id }, data });
  }
}
