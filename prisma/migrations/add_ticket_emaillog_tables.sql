-- Add Priority enum
DO $$ BEGIN
  CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add TicketStatus enum
DO $$ BEGIN
  CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add EmailType enum
DO $$ BEGIN
  CREATE TYPE "EmailType" AS ENUM (
    'WELCOME_MENTOR',
    'WELCOME_MENTEE',
    'PASSWORD_RESET',
    'EMAIL_VERIFICATION',
    'SESSION_REMINDER',
    'SESSION_CONFIRMATION',
    'SESSION_CANCELLATION',
    'NEW_MATCH',
    'NEW_MESSAGE',
    'CONNECTION_REQUEST',
    'REVIEW_REQUEST',
    'WEEKLY_SUMMARY',
    'ONBOARDING_REMINDER',
    'REENGAGEMENT',
    'HELP_SUPPORT'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add EmailStatus enum
DO $$ BEGIN
  CREATE TYPE "EmailStatus" AS ENUM (
    'PENDING',
    'SENT',
    'DELIVERED',
    'OPENED',
    'CLICKED',
    'BOUNCED',
    'FAILED'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create Ticket table
CREATE TABLE IF NOT EXISTS "Ticket" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "priority" "Priority" DEFAULT 'MEDIUM',
  "status" "TicketStatus" DEFAULT 'OPEN',
  "assignedTo" TEXT,
  "resolution" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL
);

-- Create Ticket indexes
CREATE INDEX IF NOT EXISTS "Ticket_status_idx" ON "Ticket"("status");
CREATE INDEX IF NOT EXISTS "Ticket_priority_idx" ON "Ticket"("priority");
CREATE INDEX IF NOT EXISTS "Ticket_createdAt_idx" ON "Ticket"("createdAt");

-- Create EmailLog table
CREATE TABLE IF NOT EXISTS "EmailLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "recipient" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "type" "EmailType" NOT NULL,
  "status" "EmailStatus" DEFAULT 'PENDING',
  "opened" BOOLEAN DEFAULT false,
  "clicked" BOOLEAN DEFAULT false,
  "bouncedAt" TIMESTAMP,
  "deliveredAt" TIMESTAMP,
  "openedAt" TIMESTAMP,
  "clickedAt" TIMESTAMP,
  "errorMessage" TEXT,
  "resendId" TEXT UNIQUE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create EmailLog indexes
CREATE INDEX IF NOT EXISTS "EmailLog_status_idx" ON "EmailLog"("status");
CREATE INDEX IF NOT EXISTS "EmailLog_type_idx" ON "EmailLog"("type");
CREATE INDEX IF NOT EXISTS "EmailLog_createdAt_idx" ON "EmailLog"("createdAt");
CREATE INDEX IF NOT EXISTS "EmailLog_recipient_idx" ON "EmailLog"("recipient");

-- Create function to update updatedAt timestamp for Ticket
CREATE OR REPLACE FUNCTION update_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for Ticket updatedAt
DROP TRIGGER IF EXISTS update_ticket_updated_at_trigger ON "Ticket";
CREATE TRIGGER update_ticket_updated_at_trigger
BEFORE UPDATE ON "Ticket"
FOR EACH ROW
EXECUTE FUNCTION update_ticket_updated_at();
