import { ProductRepository, BusinessRepository } from '../repositories';
import { CreateProductRequest, UpdateProductRequest } from '../dtos';
import { NotFoundError, ForbiddenError } from '../exceptions';

export class ProductService {
  private productRepository: ProductRepository;
  private businessRepository: BusinessRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.businessRepository = new BusinessRepository();
  }

  async getProducts(userId: string, page: number = 1, limit: number = 10) {
    const business = await this.getBusinessByUserId(userId);
    return this.productRepository.findByBusinessId(business.id, page, limit);
  }

  async getProductById(userId: string, productId: string) {
    const business = await this.getBusinessByUserId(userId);
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundError('Product');
    if (product.businessId !== business.id) throw new ForbiddenError();

    return product;
  }

  async createProduct(userId: string, data: CreateProductRequest) {
    const business = await this.getBusinessByUserId(userId);

    const { imageUrl, ...restData } = data;

    return this.productRepository.create({
      ...restData,
      price: restData.price,
      business: { connect: { id: business.id } },
      images: imageUrl ? {
        create: [{ url: imageUrl, isPrimary: true }]
      } : undefined,
    });
  }

  async updateProduct(userId: string, productId: string, data: UpdateProductRequest) {
    const business = await this.getBusinessByUserId(userId);
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundError('Product');
    if (product.businessId !== business.id) throw new ForbiddenError();

    const { imageUrl, ...restData } = data;
    
    // We update the product details.
    // If imageUrl is provided, we can either update the first image or add a new one.
    // Since prisma doesn't have an easy "upsert all", let's just delete existing images and create new one if imageUrl is provided.
    if (imageUrl) {
      await this.productRepository.update(productId, {
        images: { deleteMany: {} }
      });
      return this.productRepository.update(productId, {
        ...restData,
        images: { create: [{ url: imageUrl, isPrimary: true }] }
      });
    }

    return this.productRepository.update(productId, restData);
  }

  async deleteProduct(userId: string, productId: string) {
    const business = await this.getBusinessByUserId(userId);
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundError('Product');
    if (product.businessId !== business.id) throw new ForbiddenError();

    await this.productRepository.delete(productId);
  }

  private async getBusinessByUserId(userId: string) {
    const business = await this.businessRepository.findByUserId(userId);
    if (!business) throw new NotFoundError('Business');
    return business;
  }
}
