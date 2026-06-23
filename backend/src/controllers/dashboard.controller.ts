import { Response, NextFunction } from 'express';
import { DashboardService } from '../services';
import { AuthRequest } from '../middlewares';

const dashboardService = new DashboardService();

export const getDashboard = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await dashboardService.getDashboard(req.userId!);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
