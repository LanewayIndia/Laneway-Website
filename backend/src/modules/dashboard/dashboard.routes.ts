import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import * as dashboardController from './dashboard.controller';

const router: Router = Router();

router.use(authenticate);

router.get('/',
  authorize('dashboard:view'),
  dashboardController.getFullDashboard
);

router.get('/kpis',
  authorize('dashboard:view'),
  dashboardController.getKPIs
);

export default router;
