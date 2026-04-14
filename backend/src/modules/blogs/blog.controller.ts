import { Request, Response } from 'express';
import { createBlogSchema } from './blog.validation';
import { createBlog, getBlogs, getBlogById, updateBlog, publishBlog, unpublishBlog, deleteBlog } from './blog.service';

export async function getBlogsController(req: Request, res: Response) {
  try {
    const blogs = await getBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBlogByIdController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const blog = await getBlogById(id);
    return res.status(200).json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
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

export async function updateBlogController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const blog = await updateBlog(id, req.body);
    return res.status(200).json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function publishBlogController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const blog = await publishBlog(id);
    return res.status(200).json(blog);
  } catch (error) {
    console.error('Publish blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function unpublishBlogController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const blog = await unpublishBlog(id);
    return res.status(200).json(blog);
  } catch (error) {
    console.error('Unpublish blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteBlogController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await deleteBlog(id);
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}