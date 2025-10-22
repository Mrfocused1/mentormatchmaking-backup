import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const supabase = await createClient()
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Get last week's date range
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    // Get all active users who want weekly summaries
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .eq('emailNotifications', true)

    let emailsSent = 0

    for (const user of users || []) {
      // Check if user has weekly digest enabled
      const { data: preferences } = await supabase
        .from('NotificationPreferences')
        .select('*')
        .eq('userId', user.id)
        .single()

      if (preferences?.weeklyDigest === false) continue

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

        emailsSent++
      }
    }

    return NextResponse.json({ success: true, emailsSent })
  } catch (error) {
    console.error('Error sending weekly summaries:', error)
    return NextResponse.json(
      { error: 'Failed to send weekly summaries' },
      { status: 500 }
    )
  }
}
