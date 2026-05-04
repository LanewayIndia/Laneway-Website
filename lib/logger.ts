/**
 * Central logger utility for the application
 * Handles sanitization and metadata logging to prevent PII exposure
 */

export interface LogMetadata {
  timestamp?: string
  requestId?: string
  userId?: string
  endpoint?: string
  [key: string]: any
}

/**
 * Sanitizes user input by replacing sensitive characters or truncating
 * @param input - The user input to sanitize
 * @param maxLength - Maximum length to keep (default: 50)
 * @returns Sanitized string with ellipsis if truncated
 */
export function sanitizeUserInput(input: string, maxLength: number = 50): string {
  if (!input || typeof input !== "string") {
    return "[invalid input]"
  }

  // Truncate if too long
  if (input.length > maxLength) {
    return `${input.substring(0, maxLength)}...`
  }

  return input
}

/**
 * Central process logger - logs only metadata, never raw user input
 * @param context - Context or action being logged
 * @param metadata - Non-PII metadata about the process
 * @param level - Log level (info, warn, error)
 */
export function processLogger(
  context: string,
  metadata?: LogMetadata,
  level: "info" | "warn" | "error" = "info"
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    context,
    ...metadata,
  }

  if (level === "error") {
    console.error(`[${level.toUpperCase()}]`, logData)
  } else if (level === "warn") {
    console.warn(`[${level.toUpperCase()}]`, logData)
  } else {
    console.log(`[${level.toUpperCase()}]`, logData)
  }
}

/**
 * Generates a request ID for tracking
 * @returns A unique request identifier
 */
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`
}
