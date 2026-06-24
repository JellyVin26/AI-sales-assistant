import { Request, Response, NextFunction } from 'express';
import { BusinessRepository } from '../repositories';
import { AuthRequest } from '../middlewares';
import { NotFoundError } from '../exceptions';

const businessRepository = new BusinessRepository();

export const updateBusiness = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const business = await businessRepository.findByUserId(req.userId!);
    if (!business) {
      throw new NotFoundError('Business');
    }

    const { name, website, description } = req.body;
    
    const updatedBusiness = await businessRepository.update(business.id, {
      name,
      website,
      description
    });

    res.json({ success: true, data: updatedBusiness });
  } catch (error) {
    next(error);
  }
};
