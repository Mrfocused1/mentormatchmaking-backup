import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    const supabase = await createClient()
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending admin digest:', error)
    return NextResponse.json(
      { error: 'Failed to send admin digest' },
      { status: 500 }
    )
  }
}
