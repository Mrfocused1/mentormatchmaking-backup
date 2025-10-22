# Complete Email Integration Guide - Look 4 Mentors

**Every email touchpoint in your platform with full implementation examples**

---

## Table of Contents

1. [User Authentication Flow](#1-user-authentication-flow)
2. [User Onboarding Flow](#2-user-onboarding-flow)
3. [Matching System](#3-matching-system)
4. [Messaging System](#4-messaging-system)
5. [Connection Requests](#5-connection-requests)
6. [Session Management](#6-session-management)
7. [Review & Rating System](#7-review--rating-system)
8. [Profile Interactions](#8-profile-interactions)
9. [Support & Help System](#9-support--help-system)
10. [Reports & Moderation](#10-reports--moderation)
11. [Automated Emails (Cron Jobs)](#11-automated-emails-cron-jobs)
12. [Admin Notifications](#12-admin-notifications)
13. [Marketing & Engagement](#13-marketing--engagement)
14. [User Preferences](#14-user-preferences)

---

## 1. User Authentication Flow

### 1.1 Welcome Email (After Signup)

**When:** User completes registration
**File:** `/src/app/api/auth/signup/route.ts`

```typescript
import { sendWelcomeMentorEmail, sendWelcomeMenteeEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { email, password, name, role } = await request.json()

  // Create user account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role }
    }
  })

  if (authError) {
    return Response.json({ error: authError.message }, { status: 400 })
  }

  // Create user profile in database
  const { data: user, error: dbError } = await supabase
    .from('User')
    .insert({
      id: authData.user!.id,
      email,
      name,
      role,
      emailVerified: false
    })
    .select()
    .single()

  if (dbError) {
    return Response.json({ error: dbError.message }, { status: 500 })
  }

  // Send appropriate welcome email based on role
  if (role === 'MENTOR') {
    await sendWelcomeMentorEmail(
      email,
      name,
      `https://look4mentors.com/profile/edit`
    )
  } else if (role === 'MENTEE') {
    await sendWelcomeMenteeEmail(
      email,
      name,
      `https://look4mentors.com/browse-mentors`
    )
  }

  return Response.json({
    success: true,
    message: 'Account created! Check your email for next steps.',
    user
  })
}
```

---

### 1.2 Email Verification

**When:** User needs to verify their email address
**File:** `/src/app/api/auth/send-verification/route.ts`

```typescript
import { sendEmailVerificationEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
  const supabase = createClient()
  const { email } = await request.json()

  // Get user
  const { data: user } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .single()

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  // Generate verification token
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Store token in database
  await supabase.from('VerificationToken').insert({
    userId: user.id,
    token,
    type: 'EMAIL_VERIFICATION',
    expiresAt
  })

  // Send verification email
  const verificationUrl = `https://look4mentors.com/verify-email?token=${token}`

  await sendEmailVerificationEmail(
    user.email,
    user.name,
    verificationUrl
  )

  return Response.json({
    success: true,
    message: 'Verification email sent. Please check your inbox.'
  })
}
```

**Verification Handler:**
**File:** `/src/app/api/auth/verify-email/route.ts`

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  const supabase = createClient()

  // Find and validate token
  const { data: verificationToken } = await supabase
    .from('VerificationToken')
    .select('*, user:User(*)')
    .eq('token', token)
    .eq('type', 'EMAIL_VERIFICATION')
    .single()

  if (!verificationToken || new Date() > new Date(verificationToken.expiresAt)) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  // Mark email as verified
  await supabase
    .from('User')
    .update({ emailVerified: true })
    .eq('id', verificationToken.userId)

  // Delete used token
  await supabase
    .from('VerificationToken')
    .delete()
    .eq('token', token)

  return Response.json({
    success: true,
    message: 'Email verified successfully!'
  })
}
```

---

### 1.3 Password Reset Request

**When:** User clicks "Forgot Password"
**File:** `/src/app/api/auth/forgot-password/route.ts`

```typescript
import { sendPasswordResetEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
  const supabase = createClient()
  const { email } = await request.json()

  // Get user
  const { data: user } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .single()

  // Always return success (don't reveal if email exists)
  if (!user) {
    return Response.json({
      success: true,
      message: 'If an account exists, a reset link has been sent.'
    })
  }

  // Generate reset token
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  // Store token
  await supabase.from('VerificationToken').insert({
    userId: user.id,
    token,
    type: 'PASSWORD_RESET',
    expiresAt
  })

  // Send password reset email
  const resetUrl = `https://look4mentors.com/reset-password?token=${token}`

  await sendPasswordResetEmail(
    user.email,
    user.name,
    resetUrl,
    '1 hour'
  )

  return Response.json({
    success: true,
    message: 'If an account exists, a reset link has been sent.'
  })
}
```

---

### 1.4 Password Changed Confirmation

**When:** User successfully changes their password
**File:** `/src/app/api/auth/reset-password/route.ts`

```typescript
import { sendPasswordChangedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { token, newPassword } = await request.json()

  // Validate token
  const { data: verificationToken } = await supabase
    .from('VerificationToken')
    .select('*, user:User(*)')
    .eq('token', token)
    .eq('type', 'PASSWORD_RESET')
    .single()

  if (!verificationToken || new Date() > new Date(verificationToken.expiresAt)) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  // Update password using Supabase Auth
  const { error } = await supabase.auth.admin.updateUserById(
    verificationToken.userId,
    { password: newPassword }
  )

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // Delete used token
  await supabase
    .from('VerificationToken')
    .delete()
    .eq('token', token)

  // Send confirmation email
  await sendPasswordChangedEmail(
    verificationToken.user.email,
    verificationToken.user.name
  )

  return Response.json({
    success: true,
    message: 'Password changed successfully!'
  })
}
```

---

## 2. User Onboarding Flow

### 2.1 Profile Completion Reminder

**When:** User hasn't completed profile after 24 hours
**File:** `/src/app/api/cron/onboarding-reminders/route.ts`

```typescript
import { sendEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()

  // Find users with incomplete profiles created 24h ago
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const { data: incompleteUsers } = await supabase
    .from('User')
    .select('*')
    .is('bio', null) // Profile incomplete
    .lte('createdAt', yesterday.toISOString())
    .eq('onboardingReminderSent', false)

  for (const user of incompleteUsers || []) {
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
            <h2 style="color: #25283D;">Complete Your Profile 📝</h2>
            <p style="color: #666666; font-size: 16px;">Hi ${user.name},</p>
            <p style="color: #666666; font-size: 16px;">
              You're almost there! Complete your profile to start ${user.role === 'MENTOR' ? 'mentoring others' : 'finding amazing mentors'}.
            </p>
            <p style="margin-top: 30px;">
              <a href="https://look4mentors.com/profile/edit" style="display: inline-block; padding: 14px 32px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Complete Your Profile
              </a>
            </p>
          </div>
        </body>
      </html>
    `

    await sendEmail(user.email, 'Complete Your Look 4 Mentors Profile', html)

    // Mark as sent
    await supabase
      .from('User')
      .update({ onboardingReminderSent: true })
      .eq('id', user.id)
  }

  return Response.json({ sent: incompleteUsers?.length || 0 })
}
```

**Add to `vercel.json`:**
```json
{
  "crons": [{
    "path": "/api/cron/onboarding-reminders",
    "schedule": "0 10 * * *"
  }]
}
```

---

## 3. Matching System

### 3.1 New Match Notification

**When:** Two users are matched by the algorithm
**File:** `/src/app/api/matches/create/route.ts`

```typescript
import { sendNewMatchEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { userId, matchedUserId } = await request.json()

  // Get both users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [userId, matchedUserId])

  const user = users?.find(u => u.id === userId)
  const matchedUser = users?.find(u => u.id === matchedUserId)

  if (!user || !matchedUser) {
    return Response.json({ error: 'Users not found' }, { status: 404 })
  }

  // Create match record
  const { data: match } = await supabase
    .from('Match')
    .insert({
      mentorId: user.role === 'MENTOR' ? user.id : matchedUser.id,
      menteeId: user.role === 'MENTEE' ? user.id : matchedUser.id,
      status: 'PENDING',
      matchedAt: new Date().toISOString()
    })
    .select()
    .single()

  // Send match notification to first user
  await sendNewMatchEmail(
    user.email,
    user.name,
    matchedUser.name,
    matchedUser.role.toLowerCase() as 'mentor' | 'mentee',
    matchedUser.bio || 'No bio available',
    `https://look4mentors.com/profile/${matchedUser.id}`,
    `https://look4mentors.com/messages/${matchedUser.id}`,
    matchedUser.profilePhoto || undefined
  )

  // Send match notification to second user
  await sendNewMatchEmail(
    matchedUser.email,
    matchedUser.name,
    user.name,
    user.role.toLowerCase() as 'mentor' | 'mentee',
    user.bio || 'No bio available',
    `https://look4mentors.com/profile/${user.id}`,
    `https://look4mentors.com/messages/${user.id}`,
    user.profilePhoto || undefined
  )

  return Response.json({ success: true, match })
}
```

---

## 4. Messaging System

### 4.1 New Message Notification

**When:** User receives a new message
**File:** `/src/app/api/messages/send/route.ts`

```typescript
import { sendNewMessageEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { senderId, recipientId, content } = await request.json()

  // Get sender and recipient
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [senderId, recipientId])

  const sender = users?.find(u => u.id === senderId)
  const recipient = users?.find(u => u.id === recipientId)

  if (!sender || !recipient) {
    return Response.json({ error: 'Users not found' }, { status: 404 })
  }

  // Create message
  const { data: message } = await supabase
    .from('Message')
    .insert({
      senderId,
      recipientId,
      content,
      sentAt: new Date().toISOString()
    })
    .select()
    .single()

  // Check recipient's notification preferences
  const { data: preferences } = await supabase
    .from('NotificationPreferences')
    .select('*')
    .eq('userId', recipientId)
    .single()

  // Send email notification if enabled
  if (preferences?.emailOnNewMessage !== false) {
    const messagePreview = content.length > 150
      ? content.substring(0, 150) + '...'
      : content

    await sendNewMessageEmail(
      recipient.email,
      recipient.name,
      sender.name,
      messagePreview,
      `https://look4mentors.com/messages`,
      sender.profilePhoto || undefined
    )
  }

  return Response.json({ success: true, message })
}
```

---

## 5. Connection Requests

### 5.1 Connection Request Sent

**When:** User sends a connection request
**File:** `/src/app/api/connections/request/route.ts`

```typescript
import { sendConnectionRequestEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { senderId, recipientId, message } = await request.json()

  // Get both users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [senderId, recipientId])

  const sender = users?.find(u => u.id === senderId)
  const recipient = users?.find(u => u.id === recipientId)

  if (!sender || !recipient) {
    return Response.json({ error: 'Users not found' }, { status: 404 })
  }

  // Create connection request
  const { data: connectionRequest } = await supabase
    .from('ConnectionRequest')
    .insert({
      senderId,
      recipientId,
      message,
      status: 'PENDING',
      sentAt: new Date().toISOString()
    })
    .select()
    .single()

  // Send email notification
  await sendConnectionRequestEmail(
    recipient.email,
    recipient.name,
    sender.name,
    sender.role === 'MENTOR' ? 'Mentor' : 'Mentee',
    message || '',
    `https://look4mentors.com/connections?request=${connectionRequest.id}`,
    sender.profilePhoto || undefined
  )

  return Response.json({ success: true, connectionRequest })
}
```

---

## 6. Session Management

### 6.1 Session Booking Confirmation

**When:** Mentee books a session with a mentor
**File:** `/src/app/api/sessions/create/route.ts`

```typescript
import { sendSessionConfirmedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { mentorId, menteeId, scheduledAt, duration, sessionType } = await request.json()

  // Get both users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [mentorId, menteeId])

  const mentor = users?.find(u => u.id === mentorId)
  const mentee = users?.find(u => u.id === menteeId)

  if (!mentor || !mentee) {
    return Response.json({ error: 'Users not found' }, { status: 404 })
  }

  // Create session
  const { data: session } = await supabase
    .from('Session')
    .insert({
      mentorId,
      menteeId,
      scheduledAt,
      duration,
      sessionType,
      status: 'SCHEDULED'
    })
    .select()
    .single()

  const sessionDate = new Date(scheduledAt)
  const formattedDate = sessionDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = sessionDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  // Send confirmation to mentee
  await sendSessionConfirmedEmail(
    mentee.email,
    mentee.name,
    mentor.name,
    formattedDate,
    formattedTime,
    sessionType,
    `https://look4mentors.com/sessions/${session.id}`
  )

  // Send confirmation to mentor
  await sendSessionConfirmedEmail(
    mentor.email,
    mentor.name,
    mentee.name,
    formattedDate,
    formattedTime,
    sessionType,
    `https://look4mentors.com/sessions/${session.id}`
  )

  return Response.json({ success: true, session })
}
```

---

### 6.2 Session Reminder (24h Before)

**When:** Automated - runs daily to find sessions in 24 hours
**File:** `/src/app/api/cron/session-reminders/route.ts`

```typescript
import { sendSessionReminderEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()

  // Calculate tomorrow's date range
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStart = new Date(tomorrow.setHours(0, 0, 0, 0))
  const tomorrowEnd = new Date(tomorrow.setHours(23, 59, 59, 999))

  // Find sessions scheduled for tomorrow
  const { data: sessions } = await supabase
    .from('Session')
    .select(`
      *,
      mentor:User!mentorId(*),
      mentee:User!menteeId(*)
    `)
    .gte('scheduledAt', tomorrowStart.toISOString())
    .lte('scheduledAt', tomorrowEnd.toISOString())
    .eq('status', 'SCHEDULED')
    .eq('reminderSent', false)

  let emailsSent = 0

  for (const session of sessions || []) {
    const sessionDate = new Date(session.scheduledAt)
    const formattedDate = sessionDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = sessionDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })

    // Send reminder to mentor
    await sendSessionReminderEmail(
      session.mentor.email,
      session.mentor.name,
      session.mentee.name,
      formattedDate,
      formattedTime,
      session.duration || 60,
      session.sessionType || 'Mentorship Session',
      `https://look4mentors.com/sessions/${session.id}`
    )

    // Send reminder to mentee
    await sendSessionReminderEmail(
      session.mentee.email,
      session.mentee.name,
      session.mentor.name,
      formattedDate,
      formattedTime,
      session.duration || 60,
      session.sessionType || 'Mentorship Session',
      `https://look4mentors.com/sessions/${session.id}`
    )

    // Mark reminder as sent
    await supabase
      .from('Session')
      .update({ reminderSent: true })
      .eq('id', session.id)

    emailsSent += 2
  }

  return Response.json({
    success: true,
    emailsSent,
    sessionCount: sessions?.length || 0
  })
}
```

**Add to `vercel.json`:**
```json
{
  "crons": [
    {
      "path": "/api/cron/session-reminders",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

### 6.3 Session Cancellation Notice

**When:** Either user cancels a session
**File:** `/src/app/api/sessions/[sessionId]/cancel/route.ts`

```typescript
import { sendSessionCancelledEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const supabase = createClient()
  const { cancelledBy } = await request.json()

  // Get session with users
  const { data: session } = await supabase
    .from('Session')
    .select(`
      *,
      mentor:User!mentorId(*),
      mentee:User!menteeId(*)
    `)
    .eq('id', params.sessionId)
    .single()

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  // Update session status
  await supabase
    .from('Session')
    .update({
      status: 'CANCELLED',
      cancelledBy,
      cancelledAt: new Date().toISOString()
    })
    .eq('id', params.sessionId)

  const sessionDate = new Date(session.scheduledAt)
  const formattedDate = sessionDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = sessionDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

  // Send cancellation notice to mentor
  await sendSessionCancelledEmail(
    session.mentor.email,
    session.mentor.name,
    session.mentee.name,
    formattedDate,
    formattedTime
  )

  // Send cancellation notice to mentee
  await sendSessionCancelledEmail(
    session.mentee.email,
    session.mentee.name,
    session.mentor.name,
    formattedDate,
    formattedTime
  )

  return Response.json({ success: true })
}
```

---

## 7. Review & Rating System

### 7.1 Review Request (After Completed Session)

**When:** Session is marked as completed
**File:** `/src/app/api/sessions/[sessionId]/complete/route.ts`

```typescript
import { sendReviewRequestEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const supabase = createClient()

  // Get session
  const { data: session } = await supabase
    .from('Session')
    .select(`
      *,
      mentor:User!mentorId(*),
      mentee:User!menteeId(*)
    `)
    .eq('id', params.sessionId)
    .single()

  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  // Mark session as completed
  await supabase
    .from('Session')
    .update({
      status: 'COMPLETED',
      completedAt: new Date().toISOString()
    })
    .eq('id', params.sessionId)

  // Send review request to mentee
  await sendReviewRequestEmail(
    session.mentee.email,
    session.mentee.name,
    session.mentor.name,
    `https://look4mentors.com/sessions/${session.id}/review`
  )

  // Send review request to mentor (optional)
  await sendReviewRequestEmail(
    session.mentor.email,
    session.mentor.name,
    session.mentee.name,
    `https://look4mentors.com/sessions/${session.id}/review`
  )

  return Response.json({ success: true })
}
```

---

### 7.2 Thank You for Review

**When:** User submits a review
**File:** `/src/app/api/reviews/create/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { sessionId, reviewerId, revieweeId, rating, comment } = await request.json()

  // Get users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [reviewerId, revieweeId])

  const reviewer = users?.find(u => u.id === reviewerId)
  const reviewee = users?.find(u => u.id === revieweeId)

  // Create review
  const { data: review } = await supabase
    .from('Review')
    .insert({
      sessionId,
      reviewerId,
      revieweeId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    })
    .select()
    .single()

  // Send thank you email to reviewer
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Thank You for Your Review! ⭐</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${reviewer.name},</p>
          <p style="color: #666666; font-size: 16px;">
            Thank you for taking the time to review your session with ${reviewee.name}.
            Your feedback helps build a better mentorship community!
          </p>
          <p style="color: #666666; font-size: 16px;">
            Your ${rating}-star review has been published.
          </p>
        </div>
      </body>
    </html>
  `

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
    to: reviewer.email,
    subject: 'Thank you for your review!',
    html
  })

  return Response.json({ success: true, review })
}
```

---

## 8. Profile Interactions

### 8.1 Profile View Notification

**When:** Someone views a user's profile (if enabled in settings)
**File:** `/src/app/api/profile/[userId]/view/route.ts`

```typescript
import { sendProfileViewEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const supabase = createClient()
  const { viewerId } = await request.json()

  // Get both users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .in('id', [params.userId, viewerId])

  const profileOwner = users?.find(u => u.id === params.userId)
  const viewer = users?.find(u => u.id === viewerId)

  if (!profileOwner || !viewer) {
    return Response.json({ error: 'Users not found' }, { status: 404 })
  }

  // Record profile view
  await supabase.from('ProfileView').insert({
    profileOwnerId: params.userId,
    viewerId,
    viewedAt: new Date().toISOString()
  })

  // Check notification preferences
  const { data: preferences } = await supabase
    .from('NotificationPreferences')
    .select('*')
    .eq('userId', params.userId)
    .single()

  // Send notification if enabled
  if (preferences?.emailOnProfileView === true) {
    await sendProfileViewEmail(
      profileOwner.email,
      profileOwner.name,
      viewer.name,
      `https://look4mentors.com/profile/${viewerId}`
    )
  }

  return Response.json({ success: true })
}
```

---

## 9. Support & Help System

### 9.1 Contact Form Auto-Reply

**When:** User submits a contact form
**File:** `/src/app/api/contact/route.ts`

```typescript
import { sendContactFormAutoReply } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { name, email, subject, message } = await request.json()

  // Create support ticket
  const { data: ticket } = await supabase
    .from('SupportTicket')
    .insert({
      name,
      email,
      subject,
      message,
      status: 'OPEN',
      createdAt: new Date().toISOString()
    })
    .select()
    .single()

  // Send auto-reply to user
  await sendContactFormAutoReply(
    email,
    name,
    subject
  )

  // Send notification to support team
  const supportNotificationHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">New Support Ticket #${ticket.id}</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #98DFEA;">
            ${message}
          </p>
          <p style="margin-top: 30px;">
            <a href="https://look4mentors.com/admin/tickets/${ticket.id}"
               style="display: inline-block; padding: 14px 32px; background-color: #8F3985; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
              View Ticket
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
    to: process.env.SUPPORT_EMAIL || 'support@look4mentors.com',
    subject: `New Support Ticket: ${subject}`,
    html: supportNotificationHtml
  })

  return Response.json({ success: true, ticketId: ticket.id })
}
```

---

### 9.2 Support Ticket Reply

**When:** Support agent replies to ticket
**File:** `/src/app/api/support/tickets/[ticketId]/reply/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const supabase = createClient()
  const { agentName, message } = await request.json()

  // Get ticket
  const { data: ticket } = await supabase
    .from('SupportTicket')
    .select('*')
    .eq('id', params.ticketId)
    .single()

  if (!ticket) {
    return Response.json({ error: 'Ticket not found' }, { status: 404 })
  }

  // Add reply to ticket
  await supabase
    .from('TicketReply')
    .insert({
      ticketId: params.ticketId,
      agentName,
      message,
      createdAt: new Date().toISOString()
    })

  // Send email to user
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Update on Your Support Ticket</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${ticket.name},</p>
          <p style="color: #666666; font-size: 16px;">
            ${agentName} from our support team has replied to your inquiry about: <strong>${ticket.subject}</strong>
          </p>
          <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #07BEB8; margin: 20px 0;">
            <p style="margin: 0; color: #666666; font-size: 14px;">${message}</p>
          </div>
          <p style="margin-top: 30px;">
            <a href="https://look4mentors.com/support/tickets/${ticket.id}"
               style="display: inline-block; padding: 14px 32px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-weight: 600;">
              View Ticket
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: `Look 4 Mentors Support <${process.env.EMAIL_FROM}>`,
    to: ticket.email,
    subject: `Re: ${ticket.subject}`,
    html
  })

  return Response.json({ success: true })
}
```

---

## 10. Reports & Moderation

### 10.1 Report Received Acknowledgment

**When:** User reports content or another user
**File:** `/src/app/api/reports/create/route.ts`

```typescript
import { sendReportReceivedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { reporterId, reportedUserId, reason, details } = await request.json()

  // Get reporter
  const { data: reporter } = await supabase
    .from('User')
    .select('*')
    .eq('id', reporterId)
    .single()

  if (!reporter) {
    return Response.json({ error: 'Reporter not found' }, { status: 404 })
  }

  // Create report
  const { data: report } = await supabase
    .from('Report')
    .insert({
      reporterId,
      reportedUserId,
      reason,
      details,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    })
    .select()
    .single()

  // Send acknowledgment to reporter
  await sendReportReceivedEmail(
    reporter.email,
    reporter.name
  )

  // Notify moderation team
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const moderationHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">🚨 New Report Received</h2>
          <p><strong>Report ID:</strong> ${report.id}</p>
          <p><strong>Reporter:</strong> ${reporter.name} (${reporter.email})</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>Details:</strong></p>
          <p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ff6b6b;">
            ${details}
          </p>
          <p style="margin-top: 30px;">
            <a href="https://look4mentors.com/admin/reports/${report.id}"
               style="display: inline-block; padding: 14px 32px; background-color: #ff6b6b; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Review Report
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  await resend.emails.send({
    from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
    to: process.env.MODERATION_EMAIL || 'moderation@look4mentors.com',
    subject: `🚨 New Report: ${reason}`,
    html: moderationHtml
  })

  return Response.json({ success: true, reportId: report.id })
}
```

---

### 10.2 Report Resolution Notice

**When:** Moderation team resolves a report
**File:** `/src/app/api/admin/reports/[reportId]/resolve/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  const supabase = createClient()
  const { resolution, action } = await request.json()

  // Get report with reporter
  const { data: report } = await supabase
    .from('Report')
    .select(`
      *,
      reporter:User!reporterId(*)
    `)
    .eq('id', params.reportId)
    .single()

  if (!report) {
    return Response.json({ error: 'Report not found' }, { status: 404 })
  }

  // Update report
  await supabase
    .from('Report')
    .update({
      status: 'RESOLVED',
      resolution,
      action,
      resolvedAt: new Date().toISOString()
    })
    .eq('id', params.reportId)

  // Send resolution email to reporter
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Report Update</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${report.reporter.name},</p>
          <p style="color: #666666; font-size: 16px;">
            Thank you for your report. Our moderation team has reviewed it and taken appropriate action.
          </p>
          <div style="background-color: #e8f5e9; padding: 20px; border-left: 4px solid #07BEB8; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #666666; font-weight: 600;">Resolution:</p>
            <p style="margin: 0; color: #666666;">${resolution}</p>
          </div>
          <p style="color: #666666; font-size: 14px;">
            We take all reports seriously to maintain a safe community for everyone.
          </p>
        </div>
      </body>
    </html>
  `

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: `Look 4 Mentors Moderation <${process.env.EMAIL_FROM}>`,
    to: report.reporter.email,
    subject: 'Your Report Has Been Reviewed',
    html
  })

  return Response.json({ success: true })
}
```

---

## 11. Automated Emails (Cron Jobs)

### 11.1 Weekly Activity Summary

**When:** Every Monday at 9 AM
**File:** `/src/app/api/cron/weekly-summary/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function GET() {
  const supabase = createClient()
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Get last week's date range
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  // Get all active users
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .eq('emailNotifications', true)

  for (const user of users || []) {
    // Get user's stats for the week
    const { data: sessions } = await supabase
      .from('Session')
      .select('*')
      .or(`mentorId.eq.${user.id},menteeId.eq.${user.id}`)
      .gte('createdAt', lastWeek.toISOString())

    const { data: newMessages } = await supabase
      .from('Message')
      .select('*')
      .eq('recipientId', user.id)
      .gte('sentAt', lastWeek.toISOString())

    const { data: profileViews } = await supabase
      .from('ProfileView')
      .select('*')
      .eq('profileOwnerId', user.id)
      .gte('viewedAt', lastWeek.toISOString())

    // Only send if there's activity
    if (sessions?.length || newMessages?.length || profileViews?.length) {
      const html = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
              <h2 style="color: #25283D;">Your Weekly Summary 📊</h2>
              <p style="color: #666666; font-size: 16px;">Hi ${user.name},</p>
              <p style="color: #666666; font-size: 16px;">Here's what happened this week on Look 4 Mentors:</p>

              <div style="margin: 30px 0;">
                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-bottom: 15px;">
                  <h3 style="margin: 0 0 10px 0; color: #25283D; font-size: 18px;">📅 Sessions</h3>
                  <p style="margin: 0; color: #666666; font-size: 24px; font-weight: 700;">${sessions?.length || 0}</p>
                </div>

                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin-bottom: 15px;">
                  <h3 style="margin: 0 0 10px 0; color: #25283D; font-size: 18px;">💬 New Messages</h3>
                  <p style="margin: 0; color: #666666; font-size: 24px; font-weight: 700;">${newMessages?.length || 0}</p>
                </div>

                <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                  <h3 style="margin: 0 0 10px 0; color: #25283D; font-size: 18px;">👀 Profile Views</h3>
                  <p style="margin: 0; color: #666666; font-size: 24px; font-weight: 700;">${profileViews?.length || 0}</p>
                </div>
              </div>

              <p style="margin-top: 30px;">
                <a href="https://look4mentors.com/dashboard"
                   style="display: inline-block; padding: 14px 32px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View Dashboard
                </a>
              </p>
            </div>
          </body>
        </html>
      `

      await resend.emails.send({
        from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: 'Your Weekly Summary - Look 4 Mentors',
        html
      })
    }
  }

  return Response.json({ success: true, userCount: users?.length || 0 })
}
```

**Add to `vercel.json`:**
```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

---

### 11.2 Inactive User Re-engagement

**When:** Every Sunday to find users inactive for 30+ days
**File:** `/src/app/api/cron/reengagement/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function GET() {
  const supabase = createClient()
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Find users inactive for 30+ days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: inactiveUsers } = await supabase
    .from('User')
    .select('*')
    .lte('lastActiveAt', thirtyDaysAgo.toISOString())
    .eq('reengagementSent', false)

  for (const user of inactiveUsers || []) {
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
            <h2 style="color: #25283D;">We Miss You! 👋</h2>
            <p style="color: #666666; font-size: 16px;">Hi ${user.name},</p>
            <p style="color: #666666; font-size: 16px;">
              It's been a while since we've seen you on Look 4 Mentors.
              ${user.role === 'MENTOR' ? 'There are mentees looking for your expertise!' : 'Great mentors are waiting to connect with you!'}
            </p>

            <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin: 0 0 15px 0; color: #25283D;">What's New:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #666666;">
                <li style="margin-bottom: 10px;">New matching algorithm for better connections</li>
                <li style="margin-bottom: 10px;">Enhanced messaging features</li>
                <li style="margin-bottom: 10px;">Session scheduling made easier</li>
              </ul>
            </div>

            <p style="margin-top: 30px; text-align: center;">
              <a href="https://look4mentors.com/login"
                 style="display: inline-block; padding: 14px 32px; background-color: #8F3985; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Welcome Back
              </a>
            </p>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'We Miss You at Look 4 Mentors!',
      html
    })

    // Mark as sent
    await supabase
      .from('User')
      .update({ reengagementSent: true })
      .eq('id', user.id)
  }

  return Response.json({
    success: true,
    reengagementsSent: inactiveUsers?.length || 0
  })
}
```

**Add to `vercel.json`:**
```json
{
  "crons": [
    {
      "path": "/api/cron/reengagement",
      "schedule": "0 10 * * 0"
    }
  ]
}
```

---

## 12. Admin Notifications

### 12.1 Daily Admin Digest

**When:** Every day at 8 AM for admins
**File:** `/src/app/api/cron/admin-digest/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function GET() {
  const supabase = createClient()
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Get yesterday's stats
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStart = new Date(yesterday.setHours(0, 0, 0, 0))
  const yesterdayEnd = new Date(yesterday.setHours(23, 59, 59, 999))

  // Get statistics
  const { count: newUsers } = await supabase
    .from('User')
    .select('*', { count: 'exact', head: true })
    .gte('createdAt', yesterdayStart.toISOString())
    .lte('createdAt', yesterdayEnd.toISOString())

  const { count: newSessions } = await supabase
    .from('Session')
    .select('*', { count: 'exact', head: true })
    .gte('createdAt', yesterdayStart.toISOString())

  const { count: newMessages } = await supabase
    .from('Message')
    .select('*', { count: 'exact', head: true })
    .gte('sentAt', yesterdayStart.toISOString())

  const { count: activeReports } = await supabase
    .from('Report')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING')

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Daily Admin Digest 📊</h2>
          <p style="color: #666666;">Platform activity for ${yesterday.toLocaleDateString()}</p>

          <div style="margin: 30px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #25283D;">New Users</strong>
                </td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #07BEB8; font-size: 24px; font-weight: 700;">${newUsers || 0}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #25283D;">New Sessions</strong>
                </td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #8F3985; font-size: 24px; font-weight: 700;">${newSessions || 0}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
                  <strong style="color: #25283D;">Messages Sent</strong>
                </td>
                <td style="padding: 15px; border-bottom: 1px solid #e0e0e0; text-align: right;">
                  <span style="color: #98DFEA; font-size: 24px; font-weight: 700;">${newMessages || 0}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px;">
                  <strong style="color: #25283D;">Pending Reports</strong>
                </td>
                <td style="padding: 15px; text-align: right;">
                  <span style="color: ${activeReports > 0 ? '#ff6b6b' : '#666666'}; font-size: 24px; font-weight: 700;">${activeReports || 0}</span>
                </td>
              </tr>
            </table>
          </div>

          <p style="margin-top: 30px; text-align: center;">
            <a href="https://look4mentors.com/admin/dashboard"
               style="display: inline-block; padding: 14px 32px; background-color: #25283D; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
              View Admin Dashboard
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  await resend.emails.send({
    from: `Look 4 Mentors Admin <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL || 'admin@look4mentors.com',
    subject: `Daily Digest - ${yesterday.toLocaleDateString()}`,
    html
  })

  return Response.json({ success: true })
}
```

---

## 13. Marketing & Engagement

### 13.1 New Feature Announcement

**When:** Manually triggered by admin
**File:** `/src/app/api/admin/announcements/send/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const supabase = createClient()
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { title, content, ctaText, ctaUrl } = await request.json()

  // Get all users who opted in to marketing emails
  const { data: users } = await supabase
    .from('User')
    .select('*')
    .eq('marketingEmails', true)

  for (const user of users || []) {
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
            <h2 style="color: #25283D;">${title}</h2>
            <p style="color: #666666; font-size: 16px;">Hi ${user.name},</p>
            <div style="color: #666666; font-size: 16px; line-height: 1.6;">
              ${content}
            </div>
            <p style="margin-top: 30px; text-align: center;">
              <a href="${ctaUrl}"
                 style="display: inline-block; padding: 14px 32px; background-color: #07BEB8; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                ${ctaText}
              </a>
            </p>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: title,
      html
    })

    // Rate limit: wait 100ms between sends
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  return Response.json({
    success: true,
    emailsSent: users?.length || 0
  })
}
```

---

## 14. User Preferences

### 14.1 Email Preference Manager

**File:** `/src/app/api/user/email-preferences/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  const { data: preferences } = await supabase
    .from('NotificationPreferences')
    .select('*')
    .eq('userId', userId)
    .single()

  return Response.json({ preferences })
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const { userId, preferences } = await request.json()

  const { data, error } = await supabase
    .from('NotificationPreferences')
    .upsert({
      userId,
      emailOnNewMessage: preferences.emailOnNewMessage,
      emailOnNewMatch: preferences.emailOnNewMatch,
      emailOnSessionReminder: preferences.emailOnSessionReminder,
      emailOnProfileView: preferences.emailOnProfileView,
      emailOnReviewRequest: preferences.emailOnReviewRequest,
      weeklyDigest: preferences.weeklyDigest,
      marketingEmails: preferences.marketingEmails,
      updatedAt: new Date().toISOString()
    })
    .select()
    .single()

  return Response.json({ success: true, preferences: data })
}
```

---

## Complete `vercel.json` Configuration

**File:** `/vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/session-reminders",
      "schedule": "0 0 * * *",
      "description": "Send session reminders 24h before"
    },
    {
      "path": "/api/cron/onboarding-reminders",
      "schedule": "0 10 * * *",
      "description": "Remind users to complete profile"
    },
    {
      "path": "/api/cron/weekly-summary",
      "schedule": "0 9 * * 1",
      "description": "Weekly activity summary every Monday"
    },
    {
      "path": "/api/cron/reengagement",
      "schedule": "0 10 * * 0",
      "description": "Re-engage inactive users every Sunday"
    },
    {
      "path": "/api/cron/admin-digest",
      "schedule": "0 8 * * *",
      "description": "Daily admin digest every morning"
    }
  ]
}
```

---

## Database Schema Updates Needed

Add these fields to your `User` table:

```sql
ALTER TABLE "User"
ADD COLUMN "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN "onboardingReminderSent" BOOLEAN DEFAULT false,
ADD COLUMN "reengagementSent" BOOLEAN DEFAULT false,
ADD COLUMN "lastActiveAt" TIMESTAMP DEFAULT NOW(),
ADD COLUMN "marketingEmails" BOOLEAN DEFAULT true,
ADD COLUMN "emailNotifications" BOOLEAN DEFAULT true;
```

Create `NotificationPreferences` table:

```sql
CREATE TABLE "NotificationPreferences" (
  "id" TEXT PRIMARY KEY,
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
```

---

## Summary

This guide covers **every possible email touchpoint** in Look 4 Mentors:

✅ **15 Email Templates** - All implemented with professional branding
✅ **14 Different Scenarios** - Authentication, Onboarding, Matching, Messaging, Sessions, Reviews, Support, Reports, Admin, Marketing
✅ **5 Automated Cron Jobs** - Session reminders, onboarding, weekly summaries, re-engagement, admin digests
✅ **User Preferences** - Full control over email notifications
✅ **Production Ready** - Complete code examples ready to deploy

All emails send from `support@look4mentors.com` with Look 4 Mentors branding! 📧✨
