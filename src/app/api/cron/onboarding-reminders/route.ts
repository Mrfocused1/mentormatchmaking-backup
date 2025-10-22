import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const supabase = await createClient()
    const resend = new Resend(process.env.RESEND_API_KEY)

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

      await resend.emails.send({
        from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: 'Complete Your Look 4 Mentors Profile',
        html
      })

      // Mark as sent
      await supabase
        .from('User')
        .update({ onboardingReminderSent: true })
        .eq('id', user.id)
    }

    return NextResponse.json({ sent: incompleteUsers?.length || 0 })
  } catch (error) {
    console.error('Error sending onboarding reminders:', error)
    return NextResponse.json(
      { error: 'Failed to send onboarding reminders' },
      { status: 500 }
    )
  }
}
