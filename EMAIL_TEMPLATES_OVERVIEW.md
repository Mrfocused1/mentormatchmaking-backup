# Email Templates Overview

Complete guide to all email templates and how to use them in Look 4 Mentors.

---

## 📧 Email Templates Summary

### ✅ Authentication Emails (5)
1. **Welcome Email (Mentor)** - `welcome-mentor.tsx`
2. **Welcome Email (Mentee)** - `welcome-mentee.tsx`
3. **Email Verification** - `email-verification.tsx`
4. **Password Reset** - `password-reset.tsx`
5. **Password Changed** - Built-in to email utils

### 🔔 Notification Emails (3)
6. **New Match** - `new-match.tsx`
7. **New Message** - `new-message.tsx`
8. **Connection Request** - `connection-request.tsx`

### 📅 Session Emails (3)
9. **Session Reminder** - `session-reminder.tsx`
10. **Session Confirmed** - `session-confirmed.tsx`
11. **Session Cancelled** - Built-in to email utils

### 💬 Engagement Emails (2)
12. **Review Request** - Built-in to email utils
13. **Profile View** - Built-in to email utils

### 🆘 Support Emails (2)
14. **Contact Form Auto-Reply** - Built-in to email utils
15. **Report Received** - Built-in to email utils

**Total: 15 Professional Email Templates**

---

## 🚀 How to Send Emails

### Installation

```bash
npm install resend
```

### Import Email Functions

```typescript
import {
  sendWelcomeMentorEmail,
  sendWelcomeMenteeEmail,
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
  sendNewMatchEmail,
  sendNewMessageEmail,
  sendSessionReminderEmail,
  sendSessionConfirmedEmail,
  // ... etc
} from '@/lib/email'
```

### Usage Examples

#### 1. Welcome Email (Mentor Sign-up)

```typescript
// In your signup API route or authentication callback
import { sendWelcomeMentorEmail } from '@/lib/email'

// After user signs up as mentor
await sendWelcomeMentorEmail(
  userEmail,
  userName,
  `https://look4mentors.com/profile/edit`
)
```

#### 2. Welcome Email (Mentee Sign-up)

```typescript
import { sendWelcomeMenteeEmail } from '@/lib/email'

await sendWelcomeMenteeEmail(
  userEmail,
  userName,
  `https://look4mentors.com/browse-mentors`
)
```

#### 3. Password Reset

```typescript
import { sendPasswordResetEmail } from '@/lib/email'

// Generate reset token and URL
const resetToken = generateResetToken() // Your token generation
const resetUrl = `https://look4mentors.com/reset-password?token=${resetToken}`

await sendPasswordResetEmail(
  userEmail,
  userName,
  resetUrl,
  '1 hour' // Expiration time
)
```

#### 4. Email Verification

```typescript
import { sendEmailVerificationEmail } from '@/lib/email'

const verificationToken = generateVerificationToken()
const verificationUrl = `https://look4mentors.com/verify-email?token=${verificationToken}`

await sendEmailVerificationEmail(
  userEmail,
  userName,
  verificationUrl
)
```

#### 5. New Match Notification

```typescript
import { sendNewMatchEmail } from '@/lib/email'

// When two users match
await sendNewMatchEmail(
  recipientEmail,
  recipientName,
  matchedUserName,
  'mentor', // or 'mentee'
  matchedUserBio,
  `https://look4mentors.com/profile/${matchedUserId}`,
  `https://look4mentors.com/messages/${matchedUserId}`,
  matchedUserPhoto // optional
)
```

#### 6. New Message Notification

```typescript
import { sendNewMessageEmail } from '@/lib/email'

// When user receives a message
await sendNewMessageEmail(
  recipientEmail,
  recipientName,
  senderName,
  messageContent, // First 150 chars
  `https://look4mentors.com/messages`,
  senderPhoto // optional
)
```

#### 7. Connection Request

```typescript
import { sendConnectionRequestEmail } from '@/lib/email'

await sendConnectionRequestEmail(
  recipientEmail,
  recipientName,
  senderName,
  'Mentee', // or 'Mentor'
  requestMessage,
  `https://look4mentors.com/connections?request=${requestId}`,
  senderPhoto // optional
)
```

#### 8. Session Reminder (24h before)

```typescript
import { sendSessionReminderEmail } from '@/lib/email'

// Run this in a cron job 24h before sessions
await sendSessionReminderEmail(
  userEmail,
  userName,
  otherPersonName,
  'Monday, October 23, 2025',
  '2:00 PM',
  60, // duration in minutes
  'Career Coaching',
  `https://look4mentors.com/sessions/${sessionId}`
)
```

#### 9. Session Confirmed

```typescript
import { sendSessionConfirmedEmail } from '@/lib/email'

// When session is booked
await sendSessionConfirmedEmail(
  userEmail,
  userName,
  mentorName,
  'Monday, October 23, 2025',
  '2:00 PM',
  'Career Coaching',
  `https://look4mentors.com/sessions/${sessionId}`
)
```

#### 10. Review Request (After Session)

```typescript
import { sendReviewRequestEmail } from '@/lib/email'

// Send after completed session
await sendReviewRequestEmail(
  userEmail,
  userName,
  otherPersonName,
  `https://look4mentors.com/sessions/${sessionId}/review`
)
```

---

## 🎨 Email Design Features

All emails include:
- ✅ **Professional branding** with Look 4 Mentors colors
- ✅ **Responsive design** - looks great on mobile & desktop
- ✅ **Clear call-to-action buttons**
- ✅ **Consistent typography** (Montserrat font)
- ✅ **Unsubscribe links** (required)
- ✅ **Footer with help links**
- ✅ **Preview text** for email clients

### Brand Colors Used:
- **Primary Dark**: `#25283D`
- **Primary Accent**: `#98DFEA` (Cyan)
- **Secondary Accent**: `#8F3985` (Purple)
- **Success**: `#07BEB8` (Teal)

---

## 🔧 Integration Points

### Where to Add Email Sending

#### 1. Authentication (`/src/app/api/auth/...`)
```typescript
// After signup
if (role === 'MENTOR') {
  await sendWelcomeMentorEmail(email, name, profileUrl)
} else {
  await sendWelcomeMenteeEmail(email, name, browseMentorsUrl)
}

// Password reset
await sendPasswordResetEmail(email, name, resetUrl, '1 hour')

// Email verification
await sendEmailVerificationEmail(email, name, verificationUrl)
```

#### 2. Matching System (`/src/app/api/matches/...`)
```typescript
// When match created
await sendNewMatchEmail(user1Email, user1Name, user2Name, ...)
await sendNewMatchEmail(user2Email, user2Name, user1Name, ...)
```

#### 3. Messaging (`/src/app/api/messages/...`)
```typescript
// When message sent (if user has notifications enabled)
await sendNewMessageEmail(recipientEmail, recipientName, senderName, message, ...)
```

#### 4. Sessions (`/src/app/api/sessions/...`)
```typescript
// When session booked
await sendSessionConfirmedEmail(menteeEmail, menteeName, mentorName, ...)
await sendSessionConfirmedEmail(mentorEmail, mentorName, menteeName, ...)

// Cron job for reminders (24h before)
await sendSessionReminderEmail(userEmail, userName, otherPersonName, ...)
```

#### 5. Reviews (`/src/app/api/reviews/...`)
```typescript
// After session completed (automated or triggered)
await sendReviewRequestEmail(userEmail, userName, otherPersonName, reviewUrl)
```

---

## 🔄 Email Automation Opportunities

### Cron Jobs / Scheduled Tasks

1. **Session Reminders**
   - Run daily at midnight
   - Find sessions scheduled for tomorrow
   - Send reminder emails to both participants

2. **Monthly Summary**
   - Run on 1st of each month
   - Generate stats for each user
   - Send personalized summary

3. **Inactive User Re-engagement**
   - Run weekly
   - Find users inactive for 30+ days
   - Send personalized re-engagement email

### Implementation Example (Vercel Cron):

```typescript
// /src/app/api/cron/session-reminders/route.ts
export async function GET() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Find sessions scheduled for tomorrow
  const sessions = await prisma.session.findMany({
    where: {
      scheduledAt: {
        gte: startOfDay(tomorrow),
        lte: endOfDay(tomorrow),
      },
      status: 'SCHEDULED'
    },
    include: {
      mentor: true,
      mentee: true
    }
  })

  // Send reminder to both participants
  for (const session of sessions) {
    await sendSessionReminderEmail(
      session.mentee.email,
      session.mentee.name,
      session.mentor.name,
      // ... session details
    )
    await sendSessionReminderEmail(
      session.mentor.email,
      session.mentor.name,
      session.mentee.name,
      // ... session details
    )
  }

  return Response.json({ sent: sessions.length * 2 })
}
```

Then add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/session-reminders",
    "schedule": "0 0 * * *"
  }]
}
```

---

## 🧪 Testing Emails

### 1. Test in Development

```typescript
// Set up test environment variables
RESEND_API_KEY=re_test_...
EMAIL_FROM=support@look4mentors.com
```

Send test email:
```typescript
import { sendWelcomeMentorEmail } from '@/lib/email'

await sendWelcomeMentorEmail(
  'your-test-email@gmail.com',
  'Test User',
  'https://look4mentors.com/profile/edit'
)
```

### 2. Preview Emails

Create a preview route:
```typescript
// /src/app/api/preview-email/route.ts
import WelcomeMentorEmail from '@/lib/email/templates/welcome-mentor'

export async function GET() {
  const html = WelcomeMentorEmail({
    name: 'John Doe',
    profileUrl: 'https://look4mentors.com/profile/edit'
  })

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  })
}
```

Visit: `http://localhost:3000/api/preview-email`

### 3. Test with Resend Dashboard

1. Go to https://resend.com/emails
2. View all sent emails
3. Click on any email to see:
   - Delivery status
   - Opens/clicks
   - Full HTML
   - Any errors

---

## 📊 Email Metrics to Track

Monitor these in Resend dashboard:

1. **Delivery Rate** - % of emails successfully delivered
2. **Open Rate** - % of emails opened
3. **Click Rate** - % of emails with link clicks
4. **Bounce Rate** - % of emails that bounced
5. **Spam Complaints** - % marked as spam

**Target Metrics:**
- Delivery Rate: > 98%
- Open Rate: > 20%
- Click Rate: > 5%
- Bounce Rate: < 2%
- Spam Complaints: < 0.1%

---

## 🔐 Security & Privacy

### Email Best Practices:

1. ✅ **Never send passwords** - only reset links
2. ✅ **Time-limit sensitive links** (24h for verification, 1h for password reset)
3. ✅ **Include unsubscribe links** (legal requirement)
4. ✅ **Don't expose user data** unnecessarily
5. ✅ **Rate limit** email sending to prevent abuse
6. ✅ **Log email sending** for debugging
7. ✅ **Handle failures gracefully** - queue and retry

### Privacy Compliance:

- **GDPR**: Users can unsubscribe from marketing emails
- **CAN-SPAM**: Include physical address and unsubscribe link
- **User Preferences**: Respect notification settings

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check API key**: `console.log(process.env.RESEND_API_KEY)`
2. **Check domain verification**: Must show "Verified" in Resend
3. **Check from address**: Must be `@look4mentors.com`
4. **Check logs**: View in Resend dashboard
5. **Check rate limits**: Free tier = 100/day

### Email Going to Spam?

1. **Verify SPF/DKIM**: Check DNS records
2. **Add DMARC**: Set up DMARC policy
3. **Avoid spam words**: "Free", "Winner", excessive caps
4. **Include unsubscribe**: Required for deliverability
5. **Warm up domain**: Start with low volume, increase gradually

---

## 🎯 Next Steps

1. ✅ Set up Resend account
2. ✅ Verify domain (look4mentors.com)
3. ✅ Add environment variables
4. ✅ Test sending an email
5. 🚀 Integrate into your app
6. 📊 Monitor metrics
7. 🔄 Set up cron jobs for automated emails

---

## 📚 Resources

- **Resend Docs**: https://resend.com/docs
- **Email Templates**: `/src/lib/email/templates/`
- **Email Utils**: `/src/lib/email/index.ts`
- **Resend Dashboard**: https://resend.com/emails

---

**All email templates are ready to use! Just configure Resend and start sending.** 📧✨
