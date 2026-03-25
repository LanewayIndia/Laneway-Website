import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import * as interactionsController from './interactions.controller';

const router: Router = Router();

router.use(authenticate);

// GET /api/interactions/recent — Recent activity
router.get('/recent',
  authorize('interactions:read:all', 'interactions:read:own'),
  interactionsController.getRecent
);

// GET /api/interactions/lead/:leadId — Get interactions by lead
router.get('/lead/:leadId',
  authorize('interactions:read:all', 'interactions:read:own'),
  interactionsController.getByLead
);

// POST /api/interactions — Create interaction
router.post('/',
  authorize('interactions:create'),
  interactionsController.create
);

export default router;
