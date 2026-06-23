import { body } from 'express-validator';

export const sendMessageValidation = [
  body('message').notEmpty().withMessage('Message is required'),
  body('conversationId').optional().isUUID().withMessage('Invalid conversation ID'),
];

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  customerName?: string;
  customerEmail?: string;
}

export interface ChatResponse {
  conversationId: string;
  message: {
    id: string;
    content: string;
    role: string;
    createdAt: Date;
  };
}
