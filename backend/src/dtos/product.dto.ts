import { body } from 'express-validator';

export const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('category').optional().isString(),
  body('sku').optional().isString(),
];

export const updateProductValidation = [
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
  sku?: string;
  variants?: Record<string, unknown>;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  sku?: string;
  variants?: Record<string, unknown>;
  isActive?: boolean;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  sku: string | null;
  variants: Record<string, unknown> | null;
  isActive: boolean;
  images: { id: string; url: string; altText: string | null; isPrimary: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}
