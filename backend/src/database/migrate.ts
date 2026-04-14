import { pool } from "./connection";
import { up as up001 } from "./migrations/001_initial_schema";
import { up as up002 } from "./migrations/002_blogs_table";

async function migrate() {
  console.log("Running database migrations...\n");

  try {
    await up001(pool);
    await up002(pool);
    console.log("\nAll migrations completed successfully");
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();