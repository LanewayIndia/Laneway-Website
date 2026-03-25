import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import * as activityLogController from './activity-log.controller';

const router: Router = Router();

router.use(authenticate);

router.get('/',
  authorize('activity_logs:view'),
  activityLogController.getLogs
);

router.get('/:entityType/:entityId',
  authorize('activity_logs:view'),
  activityLogController.getEntityHistory
);

export default router;
