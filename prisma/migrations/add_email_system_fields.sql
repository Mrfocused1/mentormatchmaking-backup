-- Add email system fields to User table
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "onboardingReminderSent" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "reengagementSent" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "lastActiveAt" TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "marketingEmails" BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS "emailNotifications" BOOLEAN DEFAULT true;

-- Create VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "token" TEXT NOT NULL UNIQUE,
  "type" TEXT NOT NULL, -- EMAIL_VERIFICATION or PASSWORD_RESET
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create NotificationPreferences table
CREATE TABLE IF NOT EXISTS "NotificationPreferences" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "emailOnNewMessage" BOOLEAN DEFAULT true,
  "emailOnNewMatch" BOOLEAN DEFAULT true,
  "emailOnSessionReminder" BOOLEAN DEFAULT true,
  "emailOnProfileView" BOOLEAN DEFAULT false,
  "emailOnReviewRequest" BOOLEAN DEFAULT true,
  "weeklyDigest" BOOLEAN DEFAULT true,
  "marketingEmails" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("userId")
);

-- Create SupportTicket table
CREATE TABLE IF NOT EXISTS "SupportTicket" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" TEXT DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "resolvedAt" TIMESTAMP
);

-- Create TicketReply table
CREATE TABLE IF NOT EXISTS "TicketReply" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "ticketId" TEXT NOT NULL REFERENCES "SupportTicket"("id") ON DELETE CASCADE,
  "agentName" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create Report table
CREATE TABLE IF NOT EXISTS "Report" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "reporterId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "reportedUserId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "reason" TEXT NOT NULL,
  "details" TEXT NOT NULL,
  "status" TEXT DEFAULT 'PENDING', -- PENDING, UNDER_REVIEW, RESOLVED
  "resolution" TEXT,
  "action" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "resolvedAt" TIMESTAMP
);

-- Create ProfileView table
CREATE TABLE IF NOT EXISTS "ProfileView" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "profileOwnerId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "viewerId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "viewedAt" TIMESTAMP DEFAULT NOW()
);

-- Create ConnectionRequest table
CREATE TABLE IF NOT EXISTS "ConnectionRequest" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "senderId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "recipientId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "message" TEXT,
  "status" TEXT DEFAULT 'PENDING', -- PENDING, ACCEPTED, REJECTED
  "sentAt" TIMESTAMP DEFAULT NOW(),
  "respondedAt" TIMESTAMP
);

-- Add reminderSent field to Session table
ALTER TABLE "Session"
ADD COLUMN IF NOT EXISTS "reminderSent" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "cancelledBy" TEXT,
ADD COLUMN IF NOT EXISTS "cancelledAt" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "VerificationToken_userId_idx" ON "VerificationToken"("userId");
CREATE INDEX IF NOT EXISTS "VerificationToken_token_idx" ON "VerificationToken"("token");
CREATE INDEX IF NOT EXISTS "NotificationPreferences_userId_idx" ON "NotificationPreferences"("userId");
CREATE INDEX IF NOT EXISTS "ProfileView_profileOwnerId_idx" ON "ProfileView"("profileOwnerId");
CREATE INDEX IF NOT EXISTS "ProfileView_viewerId_idx" ON "ProfileView"("viewerId");
CREATE INDEX IF NOT EXISTS "Report_reporterId_idx" ON "Report"("reporterId");
CREATE INDEX IF NOT EXISTS "Report_status_idx" ON "Report"("status");
CREATE INDEX IF NOT EXISTS "Session_reminderSent_idx" ON "Session"("reminderSent");
CREATE INDEX IF NOT EXISTS "User_emailVerified_idx" ON "User"("emailVerified");
CREATE INDEX IF NOT EXISTS "User_lastActiveAt_idx" ON "User"("lastActiveAt");
