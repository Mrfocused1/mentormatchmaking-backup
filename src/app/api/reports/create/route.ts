import { sendReportReceivedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { reporterId, reportedUserId, reason, details } = await request.json()

    // Get reporter
    const { data: reporter } = await supabase
      .from('User')
      .select('*')
      .eq('id', reporterId)
      .single()

    if (!reporter) {
      return NextResponse.json({ error: 'Reporter not found' }, { status: 404 })
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

    return NextResponse.json({ success: true, reportId: report.id })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}
