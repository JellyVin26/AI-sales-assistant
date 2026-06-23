import { Router } from 'express';
import { productController } from '../controllers';
import { authenticate, validate } from '../middlewares';
import { createProductValidation, updateProductValidation } from '../dtos';

const router = Router();

router.use(authenticate);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', createProductValidation, validate, productController.createProduct);
router.put('/:id', updateProductValidation, validate, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export { router as productRoutes };
