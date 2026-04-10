import { Router } from 'express';
import { createBlogController, getBlogsController } from './blog.controller';

const router = Router();

router.get('/', getBlogsController);
router.post('/', createBlogController);

export default router;