import { prisma } from '../config';
import { Product, Prisma } from '@prisma/client';

export class ProductRepository {
  async findById(id: string) {
    return prisma.product.findUnique({ where: { id }, include: { images: true } });
  }

  async findByBusinessId(businessId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { businessId },
        include: { images: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where: { businessId } }),
    ]);
    return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({ where: { id }, data, include: { images: true } });
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }

  async findActiveByBusinessId(businessId: string) {
    return prisma.product.findMany({
      where: { businessId, isActive: true },
      include: { images: true },
    });
  }
}
