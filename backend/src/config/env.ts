import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env"), override: true });
// dotenv.config({
//   path: path.resolve(__dirname, "../../.env.local"),
// });

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const parseEnvInt = (
  value: string | undefined,
  defaultValue: number,
): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric environment variable value: "${value}"`);
  }
  return parsed;
};

export const env = {
  port: parseEnvInt(process.env.PORT, 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  db: {
    url: process.env.DATABASE_URL || "",
    host: process.env.DB_HOST || "localhost",
    port: parseEnvInt(process.env.DB_PORT, 5432),
    name: process.env.DB_NAME || "outreachdesk",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    ssl: process.env.DB_SSL === "true",
  },

  jwt: {
    secret:
      process.env.NODE_ENV === "production"
        ? requireEnv("JWT_SECRET")
        : process.env.JWT_SECRET || "change-me-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    refreshSecret:
      process.env.NODE_ENV === "production"
        ? requireEnv("JWT_REFRESH_SECRET")
        : process.env.JWT_REFRESH_SECRET || "change-refresh-in-production",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },

  redis: {
    url: process.env.REDIS_URL || "",
    upstashUrl: process.env.UPSTASH_REDIS_REST_URL || "",
    upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  },

  cron: {
    overdueCheck: process.env.CRON_OVERDUE_CHECK || "0 */6 * * *",
  },
  supabase: {
    url: requireEnv("SUPABASE_URL"),
    anonKey: requireEnv("SUPABASE_ANON_KEY"),
  },

  // Frontend public vars (exposed via API)
  public: {
    supabaseUrl: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseAnonKey: requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      `http://localhost:${process.env.PORT || "4000"}`,
  },

  // Cloudinary
  cloudinary: {
    cloudName: requireEnv("CLOUDINARY_CLOUD_NAME"),
    apiKey: requireEnv("CLOUDINARY_API_KEY"),
    apiSecret: requireEnv("CLOUDINARY_API_SECRET"),
  },

  // SMTP
  smtp: {
    host: requireEnv("SMTP_HOST"),
    port: parseEnvInt(process.env.SMTP_PORT, 587),
    contact: {
      user: requireEnv("SMTP_CONTACT_USER"),
      pass: requireEnv("SMTP_CONTACT_PASS"),
    },
    hr: {
      user: requireEnv("SMTP_HR_USER"),
      pass: requireEnv("SMTP_HR_PASS"),
    },
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseEnvInt(process.env.RATE_LIMIT_WINDOW_MS, 60000),
    max: parseEnvInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
  },

  // Service role (server-side)
  supabaseServiceRoleKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
} as const;
