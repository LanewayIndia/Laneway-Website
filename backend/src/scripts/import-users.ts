import bcrypt from 'bcryptjs';
import { pool, query, queryOne } from '../database/connection';

// ─── 1. DEFINE YOUR EMPLOYEES HERE ─────────────────────────────────
// Role options: 'admin', 'sales', 'sales_head', 'operations', 'accounts', 'ceo'

const EMPLOYEES = [
  {
    name: 'John Doe',
    email: 'john.sales@laneway.in',
    password: 'Password123!',
    role: 'sales',
  },
  {
    name: 'Jane Smith',
    email: 'jane.marketing@laneway.in',
    password: 'Password123!',
    role: 'operations', // Marketing can use operations role for read access
  },
  // Add as many employees as you need here...
];

// ─── 2. SCRIPT RUNNER ─────────────────────────────────────────────

async function importEmployees() {
  console.log(`Starting import for ${EMPLOYEES.length} employees...\n`);

  try {
    for (const emp of EMPLOYEES) {
      // 1. Find the Role ID
      const roleRow = await queryOne<{ id: number }>('SELECT id FROM roles WHERE name = $1', [emp.role]);
      
      if (!roleRow) {
        console.error(`❌ Skipped ${emp.email}: Role '${emp.role}' does not exist.`);
        continue;
      }

      // 2. Securely Hash the password
      const passwordHash = await bcrypt.hash(emp.password, 12);

      // 3. Insert or Update User
      await query(
        `INSERT INTO users (email, password_hash, name, role_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET
           password_hash = $2,
           name = $3,
           role_id = $4`,
        [emp.email, passwordHash, emp.name, roleRow.id]
      );

      console.log(`✅ Added/Updated: ${emp.name} (${emp.email}) as ${emp.role}`);
    }

    console.log('\n🎉 All employees successfully imported!');
  } catch (error) {
    console.error('\n❌ Import failed:', error);
  } finally {
    await pool.end();
  }
}

importEmployees();
