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

    return this.productRepository.create({
      ...data,
      price: data.price,
      business: { connect: { id: business.id } },
    });
  }

  async updateProduct(userId: string, productId: string, data: UpdateProductRequest) {
    const business = await this.getBusinessByUserId(userId);
    const product = await this.productRepository.findById(productId);

    if (!product) throw new NotFoundError('Product');
    if (product.businessId !== business.id) throw new ForbiddenError();

    return this.productRepository.update(productId, data);
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
