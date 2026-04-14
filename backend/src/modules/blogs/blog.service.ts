// after
import { createClient } from '@supabase/supabase-js';
import { env } from '../../config/env';

const supabase = createClient(env.supabase.url, env.supabase.anonKey);

// after
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 90) || 'post';

  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`.slice(0, 100);
}

export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// after
export async function createBlog(data: any, authorId: string | null) {
  const slug = data.slug || generateSlug(data.title);

  if (!slug) throw new Error('Failed to generate a valid slug for the blog post');

  const { data: blog, error } = await supabase
    .from('blogs')
    .insert({
      title: data.title,
      slug,
      content: data.content,
      cover_image: data.cover_image || null,
      status: 'draft',
      author_id: authorId,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      tags: data.tags || [],
    })
    .select()
    .single();

  if (error) throw error;
  return blog;
}

export async function publishBlog(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unpublishBlog(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .update({ status: 'draft', published_at: null })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlog(id: string) {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlog(id: string, data: any) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .update({
      title: data.title,
      content: data.content,
      cover_image: data.cover_image || null,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      tags: data.tags || [],
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return blog;
}