import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

export const env = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',

  db: {
    url: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'outreachdesk',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: process.env.DB_SSL === 'true',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'change-refresh-in-production',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  redis: {
    url: process.env.REDIS_URL || '',
    upstashUrl: process.env.UPSTASH_REDIS_REST_URL || '',
    upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  },

  cron: {
    overdueCheck: process.env.CRON_OVERDUE_CHECK || '0 */6 * * *',
  },
  supabase: {
    url: (() => {
      if (!process.env.SUPABASE_URL)
        throw new Error('Missing required environment variable: SUPABASE_URL');
      return process.env.SUPABASE_URL;
    })(),
    anonKey: (() => {
      if (!process.env.SUPABASE_ANON_KEY)
        throw new Error('Missing required environment variable: SUPABASE_ANON_KEY');
      return process.env.SUPABASE_ANON_KEY;
    })(),
  },

  // Frontend public vars (exposed via API)
  public: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || `http://localhost:${process.env.PORT || '4000'}`,
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },

  // SMTP
  smtp: {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT || '587'),
    contact: {
      user: process.env.SMTP_CONTACT_USER!,
      pass: process.env.SMTP_CONTACT_PASS!,
    },
    hr: {
      user: process.env.SMTP_HR_USER!,
      pass: process.env.SMTP_HR_PASS!,
    },
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  },

  // Service role (server-side)
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
} as const;
