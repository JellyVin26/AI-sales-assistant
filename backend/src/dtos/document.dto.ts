import { body } from 'express-validator';

export const uploadDocumentValidation = [
  body('title').notEmpty().withMessage('Document title is required'),
];

export interface DocumentResponse {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
}
