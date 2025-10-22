// Email sending utilities using Resend
import { Resend } from 'resend'

// Import all email templates
import WelcomeMentorEmail from './templates/welcome-mentor'
import WelcomeMenteeEmail from './templates/welcome-mentee'
import PasswordResetEmail from './templates/password-reset'
import EmailVerificationEmail from './templates/email-verification'
import NewMatchEmail from './templates/new-match'
import NewMessageEmail from './templates/new-message'
import SessionReminderEmail from './templates/session-reminder'
import SessionConfirmedEmail from './templates/session-confirmed'
import ConnectionRequestEmail from './templates/connection-request'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Default from email
const FROM_EMAIL = process.env.EMAIL_FROM || 'support@look4mentors.com'

// Email sending helper
async function sendEmail(to: string, subject: string, html: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set. Email would have been sent to:', to)
      console.warn('Subject:', subject)
      return { success: false, error: 'RESEND_API_KEY not configured' }
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Exception sending email:', error)
    return { success: false, error }
  }
}

// ============================================
// AUTHENTICATION EMAILS
// ============================================

export async function sendWelcomeMentorEmail(to: string, name: string, profileUrl: string) {
  const html = WelcomeMentorEmail({ name, profileUrl })
  return sendEmail(to, 'Welcome to Look 4 Mentors - Share Your Expertise! 🎉', html)
}

export async function sendWelcomeMenteeEmail(to: string, name: string, browseMentorsUrl: string) {
  const html = WelcomeMenteeEmail({ name, browseMentorsUrl })
  return sendEmail(to, 'Welcome to Look 4 Mentors - Find Your Mentor! 🚀', html)
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string, expiresIn: string = '1 hour') {
  const html = PasswordResetEmail({ name, resetUrl, expiresIn })
  return sendEmail(to, 'Reset Your Password - Look 4 Mentors', html)
}

export async function sendEmailVerificationEmail(to: string, name: string, verificationUrl: string) {
  const html = EmailVerificationEmail({ name, verificationUrl })
  return sendEmail(to, 'Verify Your Email Address - Look 4 Mentors', html)
}

export async function sendPasswordChangedEmail(to: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Password Changed Successfully ✓</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${name},</p>
          <p style="color: #666666; font-size: 16px;">Your password has been successfully changed.</p>
          <p style="color: #666666; font-size: 16px;">If you didn't make this change, please contact our support team immediately.</p>
          <p style="color: #999999; font-size: 14px; margin-top: 30px;">
            <a href="https://look4mentors.com/contact" style="color: #8F3985;">Contact Support</a>
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, 'Your Password Has Been Changed - Look 4 Mentors', html)
}

// ============================================
// NOTIFICATION EMAILS
// ============================================

export async function sendNewMatchEmail(
  to: string,
  recipientName: string,
  matchName: string,
  matchRole: 'mentor' | 'mentee',
  matchBio: string,
  profileUrl: string,
  messageUrl: string,
  matchPhoto?: string
) {
  const html = NewMatchEmail({
    recipientName,
    matchName,
    matchRole,
    matchBio,
    matchPhoto,
    profileUrl,
    messageUrl
  })
  return sendEmail(to, `You've Got a New Match: ${matchName}! 🎉`, html)
}

export async function sendNewMessageEmail(
  to: string,
  recipientName: string,
  senderName: string,
  messagePreview: string,
  messagesUrl: string,
  senderPhoto?: string
) {
  const html = NewMessageEmail({
    recipientName,
    senderName,
    messagePreview,
    messagesUrl,
    senderPhoto
  })
  return sendEmail(to, `New message from ${senderName} 💬`, html)
}

export async function sendConnectionRequestEmail(
  to: string,
  recipientName: string,
  senderName: string,
  senderRole: string,
  message: string,
  requestUrl: string,
  senderPhoto?: string
) {
  const html = ConnectionRequestEmail({
    recipientName,
    senderName,
    senderRole,
    message,
    requestUrl,
    senderPhoto
  })
  return sendEmail(to, `${senderName} wants to connect with you! 🤝`, html)
}

// ============================================
// SESSION EMAILS
// ============================================

export async function sendSessionReminderEmail(
  to: string,
  recipientName: string,
  otherPersonName: string,
  sessionDate: string,
  sessionTime: string,
  duration: number,
  sessionType: string,
  sessionUrl: string
) {
  const html = SessionReminderEmail({
    recipientName,
    otherPersonName,
    sessionDate,
    sessionTime,
    duration,
    sessionType,
    sessionUrl
  })
  return sendEmail(to, `Reminder: Session with ${otherPersonName} Tomorrow ⏰`, html)
}

export async function sendSessionConfirmedEmail(
  to: string,
  recipientName: string,
  otherPersonName: string,
  sessionDate: string,
  sessionTime: string,
  sessionType: string,
  sessionUrl: string
) {
  const html = SessionConfirmedEmail({
    recipientName,
    otherPersonName,
    sessionDate,
    sessionTime,
    sessionType,
    sessionUrl
  })
  return sendEmail(to, `Session Confirmed with ${otherPersonName}! ✨`, html)
}

export async function sendSessionCancelledEmail(
  to: string,
  recipientName: string,
  otherPersonName: string,
  sessionDate: string,
  sessionTime: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Session Cancelled</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${recipientName},</p>
          <p style="color: #666666; font-size: 16px;">Your session with <strong>${otherPersonName}</strong> scheduled for ${sessionDate} at ${sessionTime} has been cancelled.</p>
          <p style="color: #666666; font-size: 16px;">You can reschedule or book a new session anytime from your dashboard.</p>
          <p style="margin-top: 30px;">
            <a href="https://look4mentors.com/dashboard" style="display: inline-block; padding: 14px 32px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Go to Dashboard
            </a>
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, `Session Cancelled - ${sessionDate}`, html)
}

// ============================================
// ENGAGEMENT EMAILS
// ============================================

export async function sendReviewRequestEmail(
  to: string,
  recipientName: string,
  otherPersonName: string,
  reviewUrl: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">How was your session? ⭐</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${recipientName},</p>
          <p style="color: #666666; font-size: 16px;">We hope you had a great session with <strong>${otherPersonName}</strong>!</p>
          <p style="color: #666666; font-size: 16px;">Your feedback helps improve the mentorship experience for everyone. Would you mind taking a moment to leave a review?</p>
          <p style="margin-top: 30px;">
            <a href="${reviewUrl}" style="display: inline-block; padding: 14px 32px; background-color: #8F3985; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Leave a Review
            </a>
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, `How was your session with ${otherPersonName}?`, html)
}

export async function sendProfileViewEmail(to: string, recipientName: string, viewerName: string, profileUrl: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">${viewerName} viewed your profile 👀</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${recipientName},</p>
          <p style="color: #666666; font-size: 16px;"><strong>${viewerName}</strong> just checked out your profile on Look 4 Mentors!</p>
          <p style="margin-top: 30px;">
            <a href="${profileUrl}" style="display: inline-block; padding: 14px 32px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-weight: 600;">
              View Their Profile
            </a>
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, `${viewerName} viewed your profile`, html)
}

// ============================================
// SUPPORT EMAILS
// ============================================

export async function sendContactFormAutoReply(to: string, name: string, subject: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">We've received your message ✓</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${name},</p>
          <p style="color: #666666; font-size: 16px;">Thank you for contacting Look 4 Mentors support. We've received your message regarding: <strong>${subject}</strong></p>
          <p style="color: #666666; font-size: 16px;">Our team will review your inquiry and respond within 24-48 hours.</p>
          <p style="color: #999999; font-size: 14px; margin-top: 30px;">
            Reference Number: #${Date.now()}<br>
            You can track your support request in your <a href="https://look4mentors.com/dashboard" style="color: #8F3985;">dashboard</a>.
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, 'We received your message - Look 4 Mentors Support', html)
}

export async function sendReportReceivedEmail(to: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <h2 style="color: #25283D;">Report Received - We're on it</h2>
          <p style="color: #666666; font-size: 16px;">Hi ${name},</p>
          <p style="color: #666666; font-size: 16px;">Thank you for helping keep Look 4 Mentors safe. We've received your report and our moderation team will review it shortly.</p>
          <p style="color: #666666; font-size: 16px;">We take all reports seriously and will take appropriate action based on our Community Guidelines.</p>
          <p style="color: #999999; font-size: 14px; margin-top: 30px;">
            For urgent safety concerns, please email <a href="mailto:support@look4mentors.com" style="color: #8F3985;">support@look4mentors.com</a>
          </p>
        </div>
      </body>
    </html>
  `
  return sendEmail(to, 'Report Received - Look 4 Mentors', html)
}

// Export all functions
export default {
  // Auth
  sendWelcomeMentorEmail,
  sendWelcomeMenteeEmail,
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
  sendPasswordChangedEmail,

  // Notifications
  sendNewMatchEmail,
  sendNewMessageEmail,
  sendConnectionRequestEmail,

  // Sessions
  sendSessionReminderEmail,
  sendSessionConfirmedEmail,
  sendSessionCancelledEmail,

  // Engagement
  sendReviewRequestEmail,
  sendProfileViewEmail,

  // Support
  sendContactFormAutoReply,
  sendReportReceivedEmail,
}
