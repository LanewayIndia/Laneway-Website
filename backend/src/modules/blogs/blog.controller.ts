import { Request, Response } from 'express';
import { createBlogSchema } from './blog.validation';
import { createBlog, getBlogs } from './blog.service';

export async function getBlogsController(req: Request, res: Response) {
  try {
    const blogs = await getBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createBlogController(req: Request, res: Response) {
  try {
    const parsed = createBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const blog = await createBlog(parsed.data, null);
    return res.status(201).json(blog);

  } catch (error) {
    console.error('Create blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}