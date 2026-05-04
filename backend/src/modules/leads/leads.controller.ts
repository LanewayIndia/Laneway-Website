import { Response, NextFunction } from 'express';
import { AuthRequest, canAccessAllLeads } from '../../middleware/auth';
import { getClientIp } from '../../utils/activity-logger';
import { parsePagination } from '../../utils/pagination';
import * as leadsService from './leads.service';
import { createLeadSchema, updateLeadSchema, leadFiltersSchema } from './leads.validation';

export async function getLeads(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const filters = leadFiltersSchema.parse(req.query);
    const pagination = parsePagination(req.query);
    const accessAll = canAccessAllLeads(req);

    const result = await leadsService.getLeads(filters, pagination, req.user, accessAll);

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export async function getLeadById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const lead = await leadsService.getLeadById(req.params.id as string, req.user, canAccessAllLeads(req));

    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function createLead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const input = createLeadSchema.parse(req.body);
    const lead = await leadsService.createLead(input, req.user, getClientIp(req));

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function updateLead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const input = updateLeadSchema.parse(req.body);
    const lead = await leadsService.updateLead(
      req.params.id as string, input, req.user, canAccessAllLeads(req), getClientIp(req)
    );

    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function deleteLead(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const result = await leadsService.softDeleteLead(req.params.id as string, req.user, getClientIp(req));

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getLeadsByStage(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });

    const stages = await leadsService.getLeadsByStage(req.user, canAccessAllLeads(req));

    res.json({ success: true, data: stages });
  } catch (error) {
    next(error);
  }
}
