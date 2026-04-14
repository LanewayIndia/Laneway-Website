import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  createBlogController,
  getBlogsController,
  getBlogByIdController,
  updateBlogController,
  publishBlogController,
  unpublishBlogController,
  deleteBlogController,
} from './blog.controller';

const router = Router();

router.get('/', getBlogsController);
router.post('/', authenticate, createBlogController);
router.get('/:id', getBlogByIdController);
router.patch('/:id', authenticate, updateBlogController);
router.patch('/:id/publish', authenticate, publishBlogController);
router.patch('/:id/unpublish', authenticate, unpublishBlogController);
router.delete('/:id', authenticate, deleteBlogController);

export default router;