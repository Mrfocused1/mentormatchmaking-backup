# Database Migration Guide

This guide provides step-by-step instructions for running database migrations to add admin dashboard functionality, email logging, and support ticket system to your Look 4 Mentors platform.

## Overview

These migrations add the following features:

### Migration 1: `add_email_system_fields.sql`
- Email verification system
- User notification preferences
- Support ticket system
- User reporting system
- Profile views tracking
- Connection requests
- Session tracking enhancements

### Migration 2: `add_ticket_emaillog_tables.sql`
- Enhanced ticket system with priority levels
- Email logging and tracking system
- Database enums for standardized values
- Automatic timestamp updates

## Prerequisites

Before running these migrations:

1. **Backup your database** - Always create a backup before running migrations
2. **Access to Supabase** - You need access to your Supabase project dashboard
3. **Admin privileges** - Ensure you have admin access to run SQL scripts
4. **Review the changes** - Read through both SQL files to understand what will be modified

## Migration Instructions

### Step 1: Access Supabase SQL Editor

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to the **SQL Editor** in the left sidebar
4. Click **New Query** to create a new SQL query

### Step 2: Run Migration 1 - Email System Fields

1. Open the file `add_email_system_fields.sql`
2. Copy the entire contents
3. Paste it into the Supabase SQL Editor
4. Click **Run** to execute the migration

**What this migration does:**
- Adds email-related fields to the User table (emailVerified, email preferences, etc.)
- Creates VerificationToken table for email verification and password resets
- Creates NotificationPreferences table for user notification settings
- Creates SupportTicket table for customer support
- Creates TicketReply table for support ticket responses
- Creates Report table for user reports and moderation
- Creates ProfileView table to track profile views
- Creates ConnectionRequest table for mentor/mentee connections
- Adds session tracking fields (reminderSent, cancelledBy, etc.)
- Creates indexes for optimal query performance

**Expected outcome:**
```
Success. No rows returned
```

### Step 3: Run Migration 2 - Ticket & EmailLog Tables

1. Open the file `add_ticket_emaillog_tables.sql`
2. Copy the entire contents
3. Paste it into a new query in the Supabase SQL Editor
4. Click **Run** to execute the migration

**What this migration does:**
- Creates PostgreSQL ENUMs: Priority, TicketStatus, EmailType, EmailStatus
- Creates Ticket table with priority levels and status tracking
- Creates EmailLog table for comprehensive email tracking
- Creates database trigger for automatic updatedAt timestamps
- Creates indexes for optimal query performance

**Expected outcome:**
```
Success. No rows returned
```

### Step 4: Verify the Migration

Run the following SQL queries to verify all tables were created successfully:

```sql
-- Check if new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'VerificationToken',
  'NotificationPreferences',
  'SupportTicket',
  'TicketReply',
  'Report',
  'ProfileView',
  'ConnectionRequest',
  'Ticket',
  'EmailLog'
);

-- Check if User table columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'User'
AND column_name IN (
  'emailVerified',
  'onboardingReminderSent',
  'reengagementSent',
  'lastActiveAt',
  'marketingEmails',
  'emailNotifications'
);

-- Check if Session table columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'Session'
AND column_name IN (
  'reminderSent',
  'cancelledBy',
  'cancelledAt',
  'completedAt'
);

-- Check if ENUMs were created
SELECT t.typname as enum_name,
       string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) as enum_values
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN ('Priority', 'TicketStatus', 'EmailType', 'EmailStatus')
GROUP BY t.typname;
```

**Expected results:**
- 9 tables should be listed
- 6 User table columns should be listed
- 4 Session table columns should be listed
- 4 ENUM types with their values should be listed

### Step 5: Set Up Admin User

After the migration is complete, you need to set at least one user as an admin to access the admin dashboard:

```sql
-- Update a user to be an admin (replace 'user-id-here' with actual user ID)
UPDATE "User"
SET "isAdmin" = true
WHERE id = 'user-id-here';

-- OR update by email
UPDATE "User"
SET "isAdmin" = true
WHERE email = 'admin@example.com';

-- Verify admin user was set
SELECT id, name, email, "isAdmin"
FROM "User"
WHERE "isAdmin" = true;
```

## Post-Migration Checklist

After running the migrations, verify:

- [ ] All 9 new tables exist in your database
- [ ] User table has 6 new columns
- [ ] Session table has 4 new columns
- [ ] All 4 ENUMs are created (Priority, TicketStatus, EmailType, EmailStatus)
- [ ] Database indexes are created
- [ ] At least one admin user is set (`isAdmin = true`)
- [ ] Application builds successfully without errors
- [ ] Admin dashboard is accessible at `/admin`
- [ ] Email logging is working (check EmailLog table after sending an email)

## Rollback Instructions

If you need to rollback these migrations, run the following SQL:

### Warning: This will delete all data in these tables

```sql
-- Drop triggers
DROP TRIGGER IF EXISTS update_ticket_updated_at_trigger ON "Ticket";

-- Drop functions
DROP FUNCTION IF EXISTS update_ticket_updated_at();

-- Drop tables (in order to respect foreign key constraints)
DROP TABLE IF EXISTS "TicketReply" CASCADE;
DROP TABLE IF EXISTS "EmailLog" CASCADE;
DROP TABLE IF EXISTS "Ticket" CASCADE;
DROP TABLE IF EXISTS "ConnectionRequest" CASCADE;
DROP TABLE IF EXISTS "ProfileView" CASCADE;
DROP TABLE IF EXISTS "Report" CASCADE;
DROP TABLE IF EXISTS "SupportTicket" CASCADE;
DROP TABLE IF EXISTS "NotificationPreferences" CASCADE;
DROP TABLE IF EXISTS "VerificationToken" CASCADE;

-- Remove columns from User table
ALTER TABLE "User"
DROP COLUMN IF EXISTS "emailVerified",
DROP COLUMN IF EXISTS "onboardingReminderSent",
DROP COLUMN IF EXISTS "reengagementSent",
DROP COLUMN IF EXISTS "lastActiveAt",
DROP COLUMN IF EXISTS "marketingEmails",
DROP COLUMN IF EXISTS "emailNotifications",
DROP COLUMN IF EXISTS "isAdmin";

-- Remove columns from Session table
ALTER TABLE "Session"
DROP COLUMN IF EXISTS "reminderSent",
DROP COLUMN IF EXISTS "cancelledBy",
DROP COLUMN IF EXISTS "cancelledAt",
DROP COLUMN IF EXISTS "completedAt";

-- Drop ENUMs
DROP TYPE IF EXISTS "EmailStatus";
DROP TYPE IF EXISTS "EmailType";
DROP TYPE IF EXISTS "TicketStatus";
DROP TYPE IF EXISTS "Priority";
```

## Troubleshooting

### Issue: "relation already exists" error

**Solution:** The table already exists. You can either:
1. Skip this migration if it was already run
2. Drop the existing table and re-run (WARNING: This deletes data)

### Issue: "column already exists" error

**Solution:** The column already exists. The migration uses `ADD COLUMN IF NOT EXISTS` so this should not happen. If it does, the migration was likely already applied.

### Issue: "type already exists" error

**Solution:** This is expected and handled by the `DO $$ BEGIN ... EXCEPTION WHEN duplicate_object` block. The migration will continue successfully.

### Issue: Cannot access admin dashboard

**Solutions:**
1. Verify at least one user has `isAdmin = true`
2. Clear browser cache and cookies
3. Check the browser console for errors
4. Verify the user is logged in
5. Check that `/admin` route exists in your application

### Issue: Emails not being logged

**Solutions:**
1. Verify EmailLog table exists and has correct structure
2. Check that `RESEND_API_KEY` environment variable is set
3. Review application logs for email sending errors
4. Verify Supabase connection is working
5. Test with a simple email send and check the EmailLog table

## Environment Variables Required

Make sure these environment variables are set:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=support@look4mentors.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.look4mentors.com
```

## Testing the Migration

### Test Email Logging

1. Log in to your application
2. Trigger an email send (e.g., password reset)
3. Check the EmailLog table:

```sql
SELECT * FROM "EmailLog"
ORDER BY "createdAt" DESC
LIMIT 10;
```

You should see the email entry with status 'SENT' or 'FAILED'.

### Test Admin Dashboard

1. Set your user as admin (see Step 5)
2. Navigate to `/admin` in your browser
3. Verify you can access all admin pages:
   - `/admin` - Dashboard
   - `/admin/users` - User management
   - `/admin/sessions` - Session management
   - `/admin/tickets` - Support tickets
   - `/admin/reports` - User reports
   - `/admin/analytics` - Platform analytics
   - `/admin/email-logs` - Email logs
   - `/admin/settings` - Admin settings

### Test Ticket Creation

1. Go to contact page or support form
2. Submit a ticket
3. Verify it appears in the Ticket table:

```sql
SELECT * FROM "Ticket"
ORDER BY "createdAt" DESC
LIMIT 5;
```

## Migration History

| Date | Migration | Description | Status |
|------|-----------|-------------|--------|
| 2025-01-XX | add_email_system_fields.sql | Added email verification, notifications, support tickets, reports | Pending |
| 2025-01-XX | add_ticket_emaillog_tables.sql | Added Ticket and EmailLog tables with ENUMs | Pending |

## Support

If you encounter issues not covered in this guide:

1. Check the Supabase logs in your project dashboard
2. Review the application logs for error messages
3. Verify all environment variables are correctly set
4. Check the GitHub issues for similar problems
5. Contact support with:
   - Error message
   - Steps to reproduce
   - Database version
   - Application version

## Next Steps

After successfully running these migrations:

1. **Update your application** - Deploy the latest code that uses these new tables
2. **Set up admin users** - Assign admin privileges to appropriate users
3. **Configure email settings** - Ensure Resend API is properly configured
4. **Test all features** - Verify admin dashboard, email logging, and ticket system work correctly
5. **Monitor email logs** - Check the EmailLog table regularly to ensure emails are being sent and delivered
6. **Set up alerts** - Consider setting up alerts for failed emails or high-priority tickets

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Resend Email Documentation](https://resend.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
