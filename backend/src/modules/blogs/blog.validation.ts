import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  content: z.any().optional(),
  cover_image: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});