import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { testConnection } from './database/connection';
import { errorHandler } from './middleware/error-handler';
import { startAutomationEngine } from './modules/automation/automation.service';

// Route imports
import authRoutes from './modules/auth/auth.routes';
import leadsRoutes from './modules/leads/leads.routes';
import interactionsRoutes from './modules/interactions/interactions.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import usersRoutes from './modules/users/users.routes';
import activityLogRoutes from './modules/activity-log/activity-log.routes';
import blogRoutes from './modules/blogs/blog.routes';

const app: Application = express();

// ─── Security & Parsing ────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───────────────────────────────────────────────────────
if (env.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Health Check ──────────────────────────────────────────────────
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ─── API Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/interactions', interactionsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/blogs', blogRoutes);

// ─── 404 Handler ───────────────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: { message: `Route ${req.method} ${req.url} not found`, statusCode: 404 },
  });
});

// ─── Global Error Handler ──────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────────
async function start() {
  const dbConnected = await testConnection();

  if (!dbConnected) {
    console.warn('⚠️ PostgreSQL direct connection failed - continuing with Supabase client only');
  } else {
    startAutomationEngine();
  }

  app.listen(env.port, () => {
    console.log(`
╔══════════════════════════════════════════════════════╗
║   OutreachDesk CRM Backend                           ║
║   Running on http://localhost:${env.port}            ║
║   Environment: ${env.nodeEnv.padEnd(38)}             ║
╚══════════════════════════════════════════════════════╝
    `);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;