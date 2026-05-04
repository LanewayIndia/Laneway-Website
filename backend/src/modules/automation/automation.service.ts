import cron from 'node-cron';
import { query } from '../../database/connection';
import { env } from '../../config/env';

/**
 * Automation Engine
 * - Detects overdue leads based on follow_up_date
 * - Flags them with is_overdue = TRUE
 * - Runs on configurable cron schedule
 */

async function detectOverdueLeads(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];

  // Flag leads as overdue if follow_up_date has passed
  const result = await query(
    `UPDATE leads
     SET is_overdue = TRUE
     WHERE follow_up_date < $1
       AND is_overdue = FALSE
       AND stage NOT IN ('won', 'lost')
       AND is_deleted = FALSE
     RETURNING id`,
    [today]
  );

  return result.length;
}

async function clearOverdueForCompletedLeads(): Promise<number> {
  // Clear overdue flag for won/lost leads
  const result = await query(
    `UPDATE leads
     SET is_overdue = FALSE
     WHERE is_overdue = TRUE
       AND (stage IN ('won', 'lost') OR follow_up_date >= CURRENT_DATE)
       AND is_deleted = FALSE
     RETURNING id`
  );

  return result.length;
}

async function runOverdueCheckJob() {
  const startTime = Date.now();

  try {
    const [flagged, cleared] = await Promise.all([
      detectOverdueLeads(),
      clearOverdueForCompletedLeads(),
    ]);

    const duration = Date.now() - startTime;

    if (flagged > 0 || cleared > 0) {
      console.log(
        `⏰ Overdue check completed in ${duration}ms:`,
        `${flagged} leads flagged, ${cleared} leads cleared`
      );
    }
  } catch (error) {
    console.error('❌ Overdue check job failed:', error);
  }
}

export function startAutomationEngine() {
  const schedule = env.cron.overdueCheck;

  console.log(`🤖 Automation engine starting (schedule: ${schedule})`);

  // Schedule recurring job
  cron.schedule(schedule, runOverdueCheckJob, {
    timezone: 'Asia/Kolkata',
  });

  // Run immediately on startup
  runOverdueCheckJob();

  console.log('✅ Automation engine started');
}

// Export for manual triggering
export { runOverdueCheckJob };
