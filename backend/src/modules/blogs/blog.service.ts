import { pool } from '../../database/connection';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 100);
}

export async function createBlog(data: any, authorId: string) {
  const slug = data.slug || generateSlug(data.title);

  const result = await pool.query(
    `INSERT INTO blogs 
      (title, slug, content, cover_image, status, author_id, seo_title, seo_description, tags)
     VALUES 
      ($1, $2, $3, $4, 'draft', $5, $6, $7, $8)
     RETURNING *`,
    [
      data.title,
      slug,
      JSON.stringify(data.content),
      data.cover_image || null,
      authorId,
      data.seo_title || null,
      data.seo_description || null,
      data.tags || [],
    ]
  );

  return result.rows[0];
}