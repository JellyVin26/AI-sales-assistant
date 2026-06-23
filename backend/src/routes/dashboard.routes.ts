import { Router } from 'express';
import { dashboardController } from '../controllers';
import { authenticate } from '../middlewares';

const router = Router();

router.use(authenticate);

router.get('/', dashboardController.getDashboard);

export { router as dashboardRoutes };
