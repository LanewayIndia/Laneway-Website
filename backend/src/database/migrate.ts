import { pool } from "./connection";
import { up as up001 } from "./migrations/001_initial_schema";
import { up as up002 } from "./migrations/002_blogs_table";

async function runMigration(migrationName: string, migrationFn: (pool: any) => Promise<void>) {
  const { rows } = await pool.query(`SELECT id FROM migrations WHERE id = $1`, [migrationName]);
  if (rows.length === 0) {
    await migrationFn(pool);
    await pool.query(`INSERT INTO migrations (id, applied_at) VALUES ($1, NOW())`, [migrationName]);
  } else {
    console.log(`⏭️  Migration ${migrationName} skipped (already applied)`);
  }
}

async function migrate() {
  console.log("Running database migrations...\n");

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await runMigration('001_initial_schema', up001);
    await runMigration('002_blogs_table', up002);
    console.log("\nAll migrations completed successfully");
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();