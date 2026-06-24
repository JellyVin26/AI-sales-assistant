import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services';
import { AuthRequest } from '../middlewares';

const chatService = new ChatService();

// Public endpoint - customer sends a message
export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { businessId } = req.params;
    const result = await chatService.sendMessage(businessId as string, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// Authenticated endpoint - business owner views conversations
export const getConversations = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await chatService.getConversations(req.userId!, page, limit);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await chatService.getConversation(req.params.id as string);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const takeoverConversation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await chatService.takeoverConversation(req.userId!, req.params.id as string);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const replyToConversation = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ success: false, message: 'Message content is required' });
      return;
    }
    const result = await chatService.replyToConversation(req.userId!, req.params.id as string, message);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
