import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import * as leadsController from './leads.controller';

const router: Router = Router();

// All leads routes require authentication
router.use(authenticate);

// GET /api/leads — List leads (paginated, filtered)
router.get('/',
  authorize('leads:read:all', 'leads:read:own'),
  leadsController.getLeads
);

// GET /api/leads/pipeline — Get leads grouped by stage (for Kanban)
router.get('/pipeline',
  authorize('leads:read:all', 'leads:read:own'),
  leadsController.getLeadsByStage
);

// GET /api/leads/:id — Get single lead
router.get('/:id',
  authorize('leads:read:all', 'leads:read:own'),
  leadsController.getLeadById
);

// POST /api/leads — Create lead
router.post('/',
  authorize('leads:create'),
  leadsController.createLead
);

// PUT /api/leads/:id — Update lead (requires version for optimistic locking)
router.put('/:id',
  authorize('leads:update', 'leads:update:own'),
  leadsController.updateLead
);

// DELETE /api/leads/:id — Soft delete lead
router.delete('/:id',
  authorize('leads:delete'),
  leadsController.deleteLead
);

export default router;
