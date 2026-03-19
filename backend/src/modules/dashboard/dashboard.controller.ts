import { Response, NextFunction } from 'express';
import { AuthRequest, canAccessAllLeads } from '../../middleware/auth';
import * as dashboardService from './dashboard.service';

export async function getFullDashboard(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const data = await dashboardService.getFullDashboard(req.user, canAccessAllLeads(req));

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getKPIs(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const kpis = await dashboardService.getDashboardKPIs(req.user, canAccessAllLeads(req));

    res.json({ success: true, data: kpis });
  } catch (error) {
    next(error);
  }
}
