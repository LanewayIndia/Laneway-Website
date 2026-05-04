import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import * as activityLogService from './activity-log.service';

export async function getLogs(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await activityLogService.getActivityLogs(req.query, req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export async function getEntityHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { entityType, entityId } = req.params;
    const logs = await activityLogService.getEntityHistory(entityType as string, entityId as string);
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
}
