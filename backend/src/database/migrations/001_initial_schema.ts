import { Pool } from 'pg';

export async function up(pool: Pool): Promise<void> {
  await pool.query(`
    -- Enable UUID generation
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    -- ═══════════════════════════════════════════════════════════════
    -- ROLES TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS roles (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(50) UNIQUE NOT NULL,
      description TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );

    -- ═══════════════════════════════════════════════════════════════
    -- PERMISSIONS TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS permissions (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) UNIQUE NOT NULL,
      resource    VARCHAR(50) NOT NULL,
      action      VARCHAR(20) NOT NULL,
      description TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    -- ═══════════════════════════════════════════════════════════════
    -- ROLE-PERMISSIONS JUNCTION TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_id       INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
      PRIMARY KEY (role_id, permission_id)
    );

    -- ═══════════════════════════════════════════════════════════════
    -- USERS TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS users (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email           VARCHAR(255) UNIQUE NOT NULL,
      password_hash   VARCHAR(255) NOT NULL,
      name            VARCHAR(100) NOT NULL,
      role_id         INT NOT NULL REFERENCES roles(id),
      avatar_url      TEXT,
      is_active       BOOLEAN DEFAULT TRUE,
      refresh_token   TEXT,
      last_login_at   TIMESTAMPTZ,
      created_at      TIMESTAMPTZ DEFAULT NOW(),
      updated_at      TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
    CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

    -- ═══════════════════════════════════════════════════════════════
    -- LEADS TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS leads (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name             VARCHAR(200) NOT NULL,
      email            VARCHAR(255),
      phone            VARCHAR(20),
      company          VARCHAR(200),
      source           VARCHAR(50) DEFAULT 'other',
      stage            VARCHAR(50) NOT NULL DEFAULT 'new',
      priority         VARCHAR(20) DEFAULT 'medium',
      value            DECIMAL(12,2) DEFAULT 0,
      follow_up_date   DATE,
      follow_up_count  INT DEFAULT 0,
      is_overdue       BOOLEAN DEFAULT FALSE,
      notes            TEXT,
      tags             TEXT[] DEFAULT '{}',
      assigned_user_id UUID REFERENCES users(id),
      created_by       UUID NOT NULL REFERENCES users(id),
      updated_by       UUID REFERENCES users(id),
      version          INT DEFAULT 1,
      is_deleted       BOOLEAN DEFAULT FALSE,
      deleted_at       TIMESTAMPTZ,
      created_at       TIMESTAMPTZ DEFAULT NOW(),
      updated_at       TIMESTAMPTZ DEFAULT NOW()
    );

    -- Performance indexes for leads
    CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_follow_up_date ON leads(follow_up_date) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_assigned_user_id ON leads(assigned_user_id) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_updated_at ON leads(updated_at);
    CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_is_overdue ON leads(is_overdue) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_is_deleted ON leads(is_deleted);
    CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority) WHERE is_deleted = FALSE;
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

    -- ═══════════════════════════════════════════════════════════════
    -- INTERACTIONS TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS interactions (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id      UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      user_id      UUID NOT NULL REFERENCES users(id),
      type         VARCHAR(50) NOT NULL,
      content      TEXT NOT NULL,
      outcome      VARCHAR(50),
      scheduled_at TIMESTAMPTZ,
      completed_at TIMESTAMPTZ,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_interactions_lead_id ON interactions(lead_id);
    CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON interactions(user_id);
    CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(type);
    CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON interactions(created_at);

    -- ═══════════════════════════════════════════════════════════════
    -- ACTIVITY LOGS TABLE
    -- ═══════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS activity_logs (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID REFERENCES users(id),
      entity_type VARCHAR(50) NOT NULL,
      entity_id   UUID NOT NULL,
      action      VARCHAR(20) NOT NULL,
      changes     JSONB,
      ip_address  VARCHAR(45),
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

    -- ═══════════════════════════════════════════════════════════════
    -- UPDATED_AT TRIGGER FUNCTION
    -- ═══════════════════════════════════════════════════════════════
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Apply trigger to tables with updated_at
    DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
    CREATE TRIGGER update_roles_updated_at
      BEFORE UPDATE ON roles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
    CREATE TRIGGER update_leads_updated_at
      BEFORE UPDATE ON leads
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  `);

  console.log('✅ Migration 001: Initial schema created');
}

export async function down(pool: Pool): Promise<void> {
  await pool.query(`
    DROP TABLE IF EXISTS activity_logs CASCADE;
    DROP TABLE IF EXISTS interactions CASCADE;
    DROP TABLE IF EXISTS leads CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS role_permissions CASCADE;
    DROP TABLE IF EXISTS permissions CASCADE;
    DROP TABLE IF EXISTS roles CASCADE;
    DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
  `);

  console.log('✅ Migration 001: Schema dropped');
}
