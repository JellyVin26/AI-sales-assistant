import { Response, NextFunction } from 'express';
import { DocumentService } from '../services';
import { AuthRequest } from '../middlewares';

const documentService = new DocumentService();

export const uploadDocument = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }
    const result = await documentService.uploadDocument(req.userId!, req.file, req.body.title);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getDocuments = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await documentService.getDocuments(req.userId!);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await documentService.deleteDocument(req.userId!, req.params.id);
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};
