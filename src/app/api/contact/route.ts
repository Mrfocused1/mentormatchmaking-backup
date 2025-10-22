import { sendContactFormAutoReply } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
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

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
      to: process.env.SUPPORT_EMAIL || 'support@look4mentors.com',
      subject: `New Support Ticket: ${subject}`,
      html: supportNotificationHtml
    })

    return NextResponse.json({ success: true, ticketId: ticket.id })
  } catch (error) {
    console.error('Error creating support ticket:', error)
    return NextResponse.json(
      { error: 'Failed to create support ticket' },
      { status: 500 }
    )
  }
}
