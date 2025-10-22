import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const supabase = await createClient()
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

    return NextResponse.json({
      success: true,
      reengagementsSent: inactiveUsers?.length || 0
    })
  } catch (error) {
    console.error('Error sending reengagement emails:', error)
    return NextResponse.json(
      { error: 'Failed to send reengagement emails' },
      { status: 500 }
    )
  }
}
