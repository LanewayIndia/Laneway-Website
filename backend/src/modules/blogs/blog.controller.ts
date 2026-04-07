import { Request, Response } from 'express';
import { createBlogSchema } from './blog.validation';
import { createBlog } from './blog.service';

export async function createBlogController(req: Request, res: Response) {
  try {
    const parsed = createBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const authorId = (req as any).user?.id;
    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const blog = await createBlog(parsed.data, authorId);
    return res.status(201).json(blog);

  } catch (error) {
    console.error('Create blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}