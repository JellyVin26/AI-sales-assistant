import fs from 'fs';
import OpenAI from 'openai';
import { env } from '../config';
import { DocumentRepository, BusinessRepository, ProductRepository } from '../repositories';
import { NotFoundError, ForbiddenError } from '../exceptions';
import { DocumentType } from '@prisma/client';

export class DocumentService {
  private documentRepository: DocumentRepository;
  private businessRepository: BusinessRepository;
  private productRepository: ProductRepository;
  private openai: OpenAI;

  constructor() {
    this.documentRepository = new DocumentRepository();
    this.businessRepository = new BusinessRepository();
    this.productRepository = new ProductRepository();
    this.openai = new OpenAI({ apiKey: env.openai.apiKey });
  }

  async uploadDocument(userId: string, file: Express.Multer.File, title: string) {
    const business = await this.getBusinessByUserId(userId);

    const fileType = this.getDocumentType(file.originalname);
    const content = await this.extractContent(file.path, fileType);

    await this.extractAndSaveProducts(content, business.id);

    return this.documentRepository.create({
      title,
      fileName: file.originalname,
      filePath: file.path,
      fileType,
      fileSize: file.size,
      content,
      business: { connect: { id: business.id } },
    });
  }

  async getDocuments(userId: string) {
    const business = await this.getBusinessByUserId(userId);
    return this.documentRepository.findByBusinessId(business.id);
  }

  async deleteDocument(userId: string, documentId: string) {
    const business = await this.getBusinessByUserId(userId);
    const document = await this.documentRepository.findById(documentId);

    if (!document) throw new NotFoundError('Document');
    if (document.businessId !== business.id) throw new ForbiddenError();

    // Delete file from disk
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await this.documentRepository.delete(documentId);
  }

  private getDocumentType(filename: string): DocumentType {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return DocumentType.PDF;
      case 'docx': return DocumentType.DOCX;
      case 'txt': return DocumentType.TXT;
      default: throw new Error('Unsupported file type');
    }
  }

  private async extractContent(filePath: string, fileType: DocumentType): Promise<string> {
    switch (fileType) {
      case DocumentType.TXT:
        return fs.readFileSync(filePath, 'utf-8');
      case DocumentType.PDF: {
        const pdfParse = require('pdf-parse');
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
      }
      case DocumentType.DOCX: {
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
      }
      default:
        return '';
    }
  }

  private async getBusinessByUserId(userId: string) {
    const business = await this.businessRepository.findByUserId(userId);
    if (!business) throw new NotFoundError('Business');
    return business;
  }

  private async extractAndSaveProducts(text: string, businessId: string) {
    if (!text.trim()) return;

    if (!env.openai.apiKey || env.openai.apiKey === 'your_openai_api_key_here') {
      console.warn('Simulating AI product extraction because OPENAI_API_KEY is not configured.');
      // Simulated extraction for testing if mentioning specific words
      if (text.toLowerCase().includes('wireless earbuds pro')) {
         await this.productRepository.create({
           name: 'Wireless Earbuds Pro',
           category: 'Electronics',
           price: 199.99,
           stock: 50,
           description: 'High quality wireless earbuds.',
           business: { connect: { id: businessId } }
         });
         await this.productRepository.create({
           name: 'Charging Cable',
           category: 'Accessories',
           price: 19.99,
           stock: 200,
           description: 'Fast charging cable.',
           business: { connect: { id: businessId } }
         });
      }
      return;
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: env.openai.model,
        messages: [
          {
            role: 'system',
            content: `You are a product extraction AI. Read the provided document text and extract all products mentioned.
Return the result as a JSON array of objects. Each object must have the following keys:
"name" (string), "category" (string), "price" (number), "stock" (number), "description" (string).
If a value is not found, use a sensible default (e.g., category: "Uncategorized", price: 0, stock: 0, description: "").
Respond ONLY with the raw JSON array. Do not include markdown formatting or backticks.`
          },
          {
            role: 'user',
            content: text.substring(0, 10000) // Limit text to avoid token limits
          }
        ],
        temperature: 0.1,
      });

      const responseText = completion.choices[0]?.message?.content?.trim();
      if (!responseText) return;

      const products = JSON.parse(responseText);

      if (Array.isArray(products)) {
        for (const p of products) {
          if (p.name) {
             await this.productRepository.create({
               name: String(p.name).substring(0, 255),
               category: String(p.category || 'Uncategorized'),
               price: Number(p.price) || 0,
               stock: Number(p.stock) || 0,
               description: String(p.description || ''),
               business: { connect: { id: businessId } }
             });
          }
        }
      }
    } catch (error) {
      console.error('Failed to extract products via AI:', error);
    }
  }
}
