# Admin Dashboard Real Data Setup

## 1. Run Database Migration

To enable the admin dashboard with real data, you need to add the `Ticket` and `EmailLog` tables to your Supabase database.

### Steps:

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy the contents of `prisma/migrations/add_ticket_emaillog_tables.sql`
5. Paste it into the SQL Editor
6. Click **Run** to execute the migration

This will add:
- `Ticket` table for support tickets
- `EmailLog` table for email tracking
- Required enums: `Priority`, `TicketStatus`, `EmailType`, `EmailStatus`

## 2. What's Been Implemented

### API Routes Created:
- `/api/admin/stats` - Dashboard overview statistics
- `/api/admin/users` - User management with search and filters
- `/api/admin/sessions` - Session management
- `/api/admin/tickets` - Support tickets
- `/api/admin/reports` - User reports and moderation
- `/api/admin/analytics` - Platform analytics
- `/api/admin/email-logs` - Email delivery logs

### Pages Updated to Use Real Data:
- ✅ `/admin` - Dashboard overview
- ✅ `/admin/users` - User management
- ⏳ `/admin/sessions` - Still using mock data (API ready)
- ⏳ `/admin/tickets` - Still using mock data (API ready)
- ⏳ `/admin/reports` - Still using mock data (API ready)
- ⏳ `/admin/analytics` - Still using mock data (API ready)
- ⏳ `/admin/email-logs` - Still using mock data (API ready)
- `/admin/settings` - Static configuration page

## 3. Next Steps

The remaining admin pages (`sessions`, `tickets`, `reports`, `analytics`, `email-logs`) have their API routes created but still display mock data. To update them:

1. Replace mock data with `useState` and `useEffect` hooks
2. Fetch from their respective API routes
3. Add loading states and error handling

## 4. Security Note

All admin API routes check for:
1. User authentication
2. Admin privileges (`isAdmin` field)

Users without admin access will receive a 403 Forbidden error.

## 5. Testing

Once the migration is run:

1. Visit `/admin` to see the dashboard with real stats
2. Visit `/admin/users` to see actual user data
3. Test search and filter functionality
4. Check that stats update based on real database data

## 6. Email Logging Integration

To enable email logging, update your email sending functions in `src/lib/email/index.ts` to log to the `EmailLog` table:

```typescript
async function sendEmail(to: string, subject: string, html: string, type: EmailType) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html
  })

  // Log to database
  const supabase = await createClient()
  await supabase.from('EmailLog').insert({
    recipient: to,
    subject,
    type,
    status: error ? 'FAILED' : 'SENT',
    resendId: data?.id,
    errorMessage: error?.message
  })

  return { success: !error, data, error }
}
```

## 7. Database Schema

The migration adds these tables:

### Ticket Table
- Support ticket management
- Priority levels: LOW, MEDIUM, HIGH, URGENT
- Status: OPEN, IN_PROGRESS, RESOLVED, CLOSED

### EmailLog Table
- Email delivery tracking
- Status: PENDING, SENT, DELIVERED, OPENED, CLICKED, BOUNCED, FAILED
- Tracks open and click events
- Stores Resend email IDs for webhook integration
