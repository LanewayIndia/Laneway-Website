import { pool } from "./connection";
import { up } from "./migrations/001_initial_schema";

async function migrate() {
  console.log("Running database migrations...\n");

  try {
    await up(pool);
    console.log("\nAll migrations completed successfully");
  } catch (error) {
    console.error("\nMigration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
