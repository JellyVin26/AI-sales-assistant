import fs from 'fs';
import { DocumentRepository, BusinessRepository } from '../repositories';
import { NotFoundError, ForbiddenError } from '../exceptions';
import { DocumentType } from '@prisma/client';

export class DocumentService {
  private documentRepository: DocumentRepository;
  private businessRepository: BusinessRepository;

  constructor() {
    this.documentRepository = new DocumentRepository();
    this.businessRepository = new BusinessRepository();
  }

  async uploadDocument(userId: string, file: Express.Multer.File, title: string) {
    const business = await this.getBusinessByUserId(userId);

    const fileType = this.getDocumentType(file.originalname);
    const content = await this.extractContent(file.path, fileType);

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
}
