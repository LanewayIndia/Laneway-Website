import { Pool } from 'pg';

export async function up(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title            TEXT NOT NULL,
      slug             TEXT UNIQUE NOT NULL,
      content          JSONB,
      cover_image      TEXT,
      status           TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
      author_id        UUID REFERENCES users(id) ON DELETE SET NULL,
      created_at       TIMESTAMPTZ DEFAULT NOW(),
      updated_at       TIMESTAMPTZ DEFAULT NOW(),
      published_at     TIMESTAMPTZ,
      seo_title        TEXT,
      seo_description  TEXT,
      tags             TEXT[] DEFAULT '{}'
    );

    CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);

    CREATE INDEX IF NOT EXISTS idx_blogs_author_id ON blogs(author_id);
    CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);

    DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
    CREATE TRIGGER update_blogs_updated_at
      BEFORE UPDATE ON blogs
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `);

  console.log('✅ Migration 002: Blogs table created');
}

export async function down(pool: Pool): Promise<void> {
  await pool.query(`
    DROP TABLE IF EXISTS blogs CASCADE;
  `);

  console.log('✅ Migration 002: Blogs table dropped');
}