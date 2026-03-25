import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import * as authController from './auth.controller';

const router: Router = Router();

router.post('/login', authController.loginController);
router.post('/register', authController.registerController);
router.post('/refresh', authController.refreshController);
router.post('/logout', authenticate, authController.logoutController);
router.get('/profile', authenticate, authController.profileController);

export default router;
