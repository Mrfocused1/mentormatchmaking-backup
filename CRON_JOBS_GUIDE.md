# Cron Jobs Guide - Look 4 Mentors

## Active Cron Jobs (2/2 Free Tier Limit)

### ✅ Currently Running:

1. **Session Reminders** - `/api/cron/session-reminders`
   - Schedule: Daily @ midnight (`0 0 * * *`)
   - Purpose: Send 24-hour session reminders to mentors and mentees
   - Priority: **HIGH** - Critical for user experience

2. **Weekly Summary** - `/api/cron/weekly-summary`
   - Schedule: Mondays @ 9am (`0 9 * * 1`)
   - Purpose: Send weekly activity summaries to active users
   - Priority: **MEDIUM** - Good for engagement

---

## Available Cron Jobs (Upgrade Required)

Vercel Free Tier allows only **2 cron jobs**. The following are ready to use but require a [Pro plan upgrade](https://vercel.com/pricing) ($20/month for unlimited crons):

### 3. **Onboarding Reminders** - `/api/cron/onboarding-reminders`
- Schedule: Daily @ 10am (`0 10 * * *`)
- Purpose: Remind users with incomplete profiles to complete onboarding
- Priority: **MEDIUM** - Improves profile completion rate
- Ready to activate: Yes

```json
{
  "path": "/api/cron/onboarding-reminders",
  "schedule": "0 10 * * *"
}
```

### 4. **Re-engagement** - `/api/cron/reengagement`
- Schedule: Sundays @ 10am (`0 10 * * 0`)
- Purpose: Win back inactive users (30+ days)
- Priority: **LOW** - User retention
- Ready to activate: Yes

```json
{
  "path": "/api/cron/reengagement",
  "schedule": "0 10 * * 0"
}
```

### 5. **Admin Digest** - `/api/cron/admin-digest`
- Schedule: Daily @ 8am (`0 8 * * *`)
- Purpose: Daily statistics for admin team
- Priority: **LOW** - Admin convenience
- Ready to activate: Yes

```json
{
  "path": "/api/cron/admin-digest",
  "schedule": "0 8 * * *"
}
```

---

## How to Activate Additional Cron Jobs

### Option 1: Upgrade Vercel Plan (Recommended)

1. Go to https://vercel.com/pricing
2. Upgrade to **Pro Plan** ($20/month)
   - Unlimited cron jobs
   - Better performance
   - Team collaboration features

3. Add remaining crons to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/session-reminders",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 9 * * 1"
    },
    {
      "path": "/api/cron/onboarding-reminders",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/reengagement",
      "schedule": "0 10 * * 0"
    },
    {
      "path": "/api/cron/admin-digest",
      "schedule": "0 8 * * *"
    }
  ]
}
```

4. Deploy: `vercel --prod`

### Option 2: Use External Cron Service (Free Alternative)

Use a free cron service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

1. Create account on cron service
2. Add these endpoints as scheduled jobs:
   - `https://look4mentors.com/api/cron/onboarding-reminders`
   - `https://look4mentors.com/api/cron/reengagement`
   - `https://look4mentors.com/api/cron/admin-digest`

3. Set schedules:
   - Onboarding: Daily @ 10am
   - Re-engagement: Sundays @ 10am
   - Admin: Daily @ 8am

**Important**: Add authentication to protect cron endpoints!

### Option 3: Manual Triggering

You can manually trigger any cron job by visiting:
- `https://look4mentors.com/api/cron/onboarding-reminders`
- `https://look4mentors.com/api/cron/reengagement`
- `https://look4mentors.com/api/cron/admin-digest`

---

## Cron Schedule Syntax

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, 0 and 7 are Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

### Examples:
- `0 0 * * *` - Daily at midnight
- `0 9 * * 1` - Every Monday at 9am
- `0 */6 * * *` - Every 6 hours
- `30 14 * * 5` - Every Friday at 2:30pm

---

## Monitoring Cron Jobs

### View Logs in Vercel:
1. Go to https://vercel.com/paulpauls-projects/mentormatchmaking
2. Click "Deployments"
3. Click on latest deployment
4. View "Functions" tab
5. Filter by cron job path

### Check Cron Execution:
- Visit https://vercel.com/paulpauls-projects/mentormatchmaking/logs
- Filter by function name (e.g., `/api/cron/session-reminders`)
- View execution history and errors

---

## Troubleshooting

### Cron Not Running?

1. **Check Vercel Dashboard**
   - Logs → Filter by cron path
   - Look for errors

2. **Test Manually**
   - Visit the endpoint directly
   - Check if email sends

3. **Verify Environment Variables**
   - `EMAIL_FROM` set?
   - `RESEND_API_KEY` set?
   - `ADMIN_EMAIL` set (for admin digest)?

4. **Check Database Connection**
   - Supabase credentials correct?
   - Database tables exist?

---

## Performance Considerations

### Current Load (2 active crons):
- **Session Reminders**: ~50-200 emails/day (depends on sessions)
- **Weekly Summary**: ~1000-5000 emails/week (depends on active users)

### Full Load (5 active crons):
- **Total**: ~10,000-20,000 emails/month
- **Resend Free Tier**: 3,000 emails/month ❌
- **Resend Pro Required**: 50,000 emails/month ✅

**Cost Breakdown:**
- Vercel Free: $0 (2 crons limit)
- Vercel Pro: $20/month (unlimited crons)
- Resend Free: $0 (3,000 emails/month)
- Resend Pro: $20/month (50,000 emails/month)

**Recommended**: Both Vercel + Resend Pro = $40/month total

---

## Next Steps

1. **Monitor current crons** - Check if emails are sending
2. **Wait for user growth** - Upgrade when needed
3. **Consider external cron** - Free alternative
4. **Plan for scale** - Upgrade both services together

All cron job routes are **production-ready** and can be activated anytime! 🚀
