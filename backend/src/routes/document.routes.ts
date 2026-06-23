import { Router } from 'express';
import { documentController } from '../controllers';
import { authenticate, uploadDocument, validate } from '../middlewares';
import { uploadDocumentValidation } from '../dtos';

const router = Router();

router.use(authenticate);

router.get('/', documentController.getDocuments);
router.post('/', uploadDocument.single('file'), uploadDocumentValidation, validate, documentController.uploadDocument);
router.delete('/:id', documentController.deleteDocument);

export { router as documentRoutes };
