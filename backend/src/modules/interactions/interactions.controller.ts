import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { getClientIp } from '../../utils/activity-logger';
import * as interactionsService from './interactions.service';
import { createInteractionSchema } from './interactions.validation';

export async function getByLead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const interactions = await interactionsService.getInteractionsByLead(req.params.leadId as string);
    res.json({ success: true, data: interactions });
  } catch (error) {
    next(error);
  }
}

export async function create(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const input = createInteractionSchema.parse(req.body);
    const interaction = await interactionsService.createInteraction(input, req.user, getClientIp(req));

    res.status(201).json({ success: true, data: interaction });
  } catch (error) {
    next(error);
  }
}

export async function getRecent(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const interactions = await interactionsService.getRecentInteractions(limit);
    res.json({ success: true, data: interactions });
  } catch (error) {
    next(error);
  }
}
