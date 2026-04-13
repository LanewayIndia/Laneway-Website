import { Router } from 'express';
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
router.post('/', createBlogController);
router.get('/:id', getBlogByIdController);
router.patch('/:id', updateBlogController);
router.patch('/:id/publish', publishBlogController);
router.patch('/:id/unpublish', unpublishBlogController);
router.delete('/:id', deleteBlogController);

export default router;