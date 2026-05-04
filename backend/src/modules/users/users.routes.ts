import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import * as usersController from './users.controller';

const router: Router = Router();

router.use(authenticate);

router.get('/',
  authorize('users:read', 'users:manage'),
  usersController.getAll
);

router.get('/roles',
  authorize('roles:manage', 'users:manage'),
  usersController.getRoles
);

export default router;
