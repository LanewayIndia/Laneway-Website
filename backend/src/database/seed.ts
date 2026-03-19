import bcrypt from "bcryptjs";
import { pool, query } from "./connection";

async function seed() {
  console.log("Seeding database...\n");

  try {
    // ─── Seed Roles ───────────────────────────────────────────────
    console.log("Seeding roles...");
    const roles = [
      {
        name: "admin",
        description: "Full system access — manages all CRM resources",
      },
      {
        name: "sales",
        description: "Access assigned leads, update leads, log interactions",
      },
      {
        name: "sales_head",
        description: "Full lead access, team management, assign leads",
      },
      {
        name: "operations",
        description: "Read access to leads, no financial edits",
      },
      {
        name: "accounts",
        description: "Read-only sales, financial tracking access",
      },
      {
        name: "ceo",
        description: "Full analytics view, read-only access to all data",
      },
    ];

    for (const role of roles) {
      await query(
        `INSERT INTO roles (name, description)
         VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET description = $2`,
        [role.name, role.description],
      );
    }
    console.log(`${roles.length} roles seeded`);

    // ─── Seed Permissions ─────────────────────────────────────────
    console.log("Seeding permissions...");
    const permissions = [
      // Leads
      {
        name: "leads:create",
        resource: "leads",
        action: "create",
        description: "Create new leads",
      },
      {
        name: "leads:read:all",
        resource: "leads",
        action: "read",
        description: "Read all leads",
      },
      {
        name: "leads:read:own",
        resource: "leads",
        action: "read",
        description: "Read own assigned leads",
      },
      {
        name: "leads:update",
        resource: "leads",
        action: "update",
        description: "Update leads",
      },
      {
        name: "leads:update:own",
        resource: "leads",
        action: "update",
        description: "Update own assigned leads",
      },
      {
        name: "leads:delete",
        resource: "leads",
        action: "delete",
        description: "Soft delete leads",
      },
      {
        name: "leads:assign",
        resource: "leads",
        action: "update",
        description: "Assign leads to users",
      },
      // Interactions
      {
        name: "interactions:create",
        resource: "interactions",
        action: "create",
        description: "Create interactions",
      },
      {
        name: "interactions:read:all",
        resource: "interactions",
        action: "read",
        description: "Read all interactions",
      },
      {
        name: "interactions:read:own",
        resource: "interactions",
        action: "read",
        description: "Read own interactions",
      },
      // Dashboard
      {
        name: "dashboard:view",
        resource: "dashboard",
        action: "read",
        description: "View dashboard",
      },
      {
        name: "dashboard:analytics",
        resource: "dashboard",
        action: "read",
        description: "View full analytics",
      },
      // Users
      {
        name: "users:manage",
        resource: "users",
        action: "create",
        description: "Manage users",
      },
      {
        name: "users:read",
        resource: "users",
        action: "read",
        description: "Read user list",
      },
      // Roles
      {
        name: "roles:manage",
        resource: "roles",
        action: "create",
        description: "Manage roles",
      },
      // Financial
      {
        name: "financial:view",
        resource: "financial",
        action: "read",
        description: "View financial data",
      },
      {
        name: "financial:edit",
        resource: "financial",
        action: "update",
        description: "Edit financial data",
      },
      // Activity Logs
      {
        name: "activity_logs:view",
        resource: "activity_logs",
        action: "read",
        description: "View activity logs",
      },
      // System
      {
        name: "system:admin",
        resource: "system",
        action: "create",
        description: "Full system administration",
      },
    ];

    for (const perm of permissions) {
      await query(
        `INSERT INTO permissions (name, resource, action, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (name) DO UPDATE SET resource = $2, action = $3, description = $4`,
        [perm.name, perm.resource, perm.action, perm.description],
      );
    }
    console.log(`${permissions.length} permissions seeded`);

    // ─── Assign Permissions to Roles ──────────────────────────────
    console.log("Assigning permissions to roles...");

    const rolePermMap: Record<string, string[]> = {
      admin: permissions.map((p) => p.name), // Admin gets everything
      ceo: [
        "leads:read:all",
        "interactions:read:all",
        "dashboard:view",
        "dashboard:analytics",
        "financial:view",
        "activity_logs:view",
        "users:read",
      ],
      sales_head: [
        "leads:create",
        "leads:read:all",
        "leads:update",
        "leads:delete",
        "leads:assign",
        "interactions:create",
        "interactions:read:all",
        "dashboard:view",
        "dashboard:analytics",
        "financial:view",
        "activity_logs:view",
        "users:read",
      ],
      sales: [
        "leads:create",
        "leads:read:own",
        "leads:update:own",
        "interactions:create",
        "interactions:read:own",
        "dashboard:view",
      ],
      operations: [
        "leads:read:all",
        "interactions:read:all",
        "dashboard:view",
        "users:read",
      ],
      accounts: [
        "leads:read:all",
        "interactions:read:all",
        "dashboard:view",
        "financial:view",
      ],
    };

    for (const [roleName, permNames] of Object.entries(rolePermMap)) {
      for (const permName of permNames) {
        await query(
          `INSERT INTO role_permissions (role_id, permission_id)
           SELECT r.id, p.id FROM roles r, permissions p
           WHERE r.name = $1 AND p.name = $2
           ON CONFLICT DO NOTHING`,
          [roleName, permName],
        );
      }
    }
    console.log("Role-permission mappings created");

    // ─── Seed Admin User ──────────────────────────────────────────
    console.log("Seeding admin user...");
    const adminPasswordHash = await bcrypt.hash("Laneway@2026", 12);

    await query(
      `INSERT INTO users (email, password_hash, name, role_id)
       SELECT $1, $2, $3, r.id
       FROM roles r WHERE r.name = 'admin'
       ON CONFLICT (email) DO UPDATE SET
         password_hash = $2,
         name = $3`,
      ["info@laneway.in", adminPasswordHash, "System Admin"],
    );
    console.log("Admin user created");

    // ─── Seed Demo Sales User ─────────────────────────────────────
    console.log("Seeding demo sales user...");
    const salesPasswordHash = await bcrypt.hash("Sales@12345", 12);

    await query(
      `INSERT INTO users (email, password_hash, name, role_id)
       SELECT $1, $2, $3, r.id
       FROM roles r WHERE r.name = 'sales'
       ON CONFLICT (email) DO UPDATE SET
         password_hash = $2,
         name = $3`,
      ["sales@laneway.in", salesPasswordHash, "Demo Sales Rep"],
    );
    console.log("Sales user created (sales@laneway.in / Sales@12345)");

    // ─── Seed Demo Leads ──────────────────────────────────────────
    console.log("Seeding demo leads...");
    const adminUser = await pool.query(
      `SELECT id FROM users WHERE email = 'info@laneway.in'`,
    );
    const salesUser = await pool.query(
      `SELECT id FROM users WHERE email = 'sales@laneway.in'`,
    );

    if (adminUser.rows[0] && salesUser.rows[0]) {
      const adminId = adminUser.rows[0].id;
      const salesId = salesUser.rows[0].id;

      const demoLeads = [
        {
          name: "TechCorp Solutions",
          email: "info@techcorp.com",
          phone: "+91 98765 43210",
          company: "TechCorp",
          source: "website",
          stage: "new",
          priority: "high",
          value: 250000,
        },
        {
          name: "Green Ventures Ltd",
          email: "contact@greenventures.in",
          phone: "+91 87654 32109",
          company: "Green Ventures",
          source: "referral",
          stage: "contacted",
          priority: "medium",
          value: 150000,
        },
        {
          name: "StartupBoost Inc",
          email: "hello@startupboost.io",
          phone: "+91 76543 21098",
          company: "StartupBoost",
          source: "linkedin",
          stage: "qualified",
          priority: "high",
          value: 500000,
        },
        {
          name: "MediaPrime Agency",
          email: "partner@mediaprime.com",
          phone: "+91 65432 10987",
          company: "MediaPrime",
          source: "event",
          stage: "proposal",
          priority: "urgent",
          value: 800000,
        },
        {
          name: "DataFlow Systems",
          email: "biz@dataflow.tech",
          phone: "+91 54321 09876",
          company: "DataFlow",
          source: "cold_call",
          stage: "negotiation",
          priority: "high",
          value: 350000,
        },
        {
          name: "CloudNine Hosting",
          email: "sales@cloudnine.in",
          phone: "+91 43210 98765",
          company: "CloudNine",
          source: "website",
          stage: "won",
          priority: "medium",
          value: 120000,
        },
        {
          name: "BrandWave Digital",
          email: "team@brandwave.co",
          phone: "+91 32109 87654",
          company: "BrandWave",
          source: "referral",
          stage: "new",
          priority: "low",
          value: 75000,
        },
        {
          name: "InnoSpark Labs",
          email: "connect@innospark.dev",
          phone: "+91 21098 76543",
          company: "InnoSpark",
          source: "linkedin",
          stage: "contacted",
          priority: "medium",
          value: 200000,
        },
        {
          name: "EcoCommerce Pvt",
          email: "biz@ecocommerce.in",
          phone: "+91 10987 65432",
          company: "EcoCommerce",
          source: "website",
          stage: "lost",
          priority: "low",
          value: 90000,
        },
        {
          name: "FinNext Solutions",
          email: "partner@finnext.com",
          phone: "+91 99887 76655",
          company: "FinNext",
          source: "event",
          stage: "qualified",
          priority: "high",
          value: 600000,
        },
      ];

      for (const lead of demoLeads) {
        const assignedTo = Math.random() > 0.4 ? salesId : adminId;
        const followUpDate = new Date();
        followUpDate.setDate(
          followUpDate.getDate() + Math.floor(Math.random() * 14) - 3,
        );

        await query(
          `INSERT INTO leads (name, email, phone, company, source, stage, priority, value, follow_up_date, assigned_user_id, created_by, updated_by)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11)
           ON CONFLICT DO NOTHING`,
          [
            lead.name,
            lead.email,
            lead.phone,
            lead.company,
            lead.source,
            lead.stage,
            lead.priority,
            lead.value,
            followUpDate.toISOString().split("T")[0],
            assignedTo,
            adminId,
          ],
        );
      }
      console.log(`${demoLeads.length} demo leads seeded`);

      // ─── Seed Demo Interactions ──────────────────────────────────
      console.log("💬 Seeding demo interactions...");
      const leadRows = await pool.query(`SELECT id FROM leads LIMIT 5`);

      for (const leadRow of leadRows.rows) {
        await query(
          `INSERT INTO interactions (lead_id, user_id, type, content, outcome)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            leadRow.id,
            salesId,
            "call",
            "Initial discovery call — discussed project scope and timeline",
            "positive",
          ],
        );
        await query(
          `INSERT INTO interactions (lead_id, user_id, type, content, outcome)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            leadRow.id,
            adminId,
            "email",
            "Sent follow-up proposal with pricing breakdown",
            "neutral",
          ],
        );
      }
      console.log("Demo interactions seeded");
    }

    console.log("\nDatabase seeding completed successfully!");
  } catch (error) {
    console.error("\nSeeding failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
