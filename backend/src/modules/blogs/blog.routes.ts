import { Router } from 'express';
import { createBlogController } from './blog.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, createBlogController);

export default router;