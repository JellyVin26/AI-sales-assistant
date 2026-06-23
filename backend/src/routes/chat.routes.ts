import { Router } from 'express';
import { chatController } from '../controllers';
import { authenticate, validate } from '../middlewares';
import { sendMessageValidation } from '../dtos';

const router = Router();

// Public endpoint for customers
router.post('/:businessId/message', sendMessageValidation, validate, chatController.sendMessage);

// Authenticated endpoints for business owners
router.get('/conversations', authenticate, chatController.getConversations);
router.get('/conversations/:id', authenticate, chatController.getConversation);

export { router as chatRoutes };
