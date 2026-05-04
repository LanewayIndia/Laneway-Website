import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens').optional(),
  content: z.record(z.unknown()).optional(),
  cover_image: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateBlogSchema = createBlogSchema.partial();