import { Router } from 'express';
import { updateBusiness } from '../controllers/business.controller';
import { authenticate } from '../middlewares';

const router = Router();

router.put('/', authenticate, updateBusiness);

export default router;
