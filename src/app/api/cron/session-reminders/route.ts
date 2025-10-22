import { sendSessionReminderEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

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

    return NextResponse.json({
      success: true,
      emailsSent,
      sessionCount: sessions?.length || 0
    })
  } catch (error) {
    console.error('Error sending session reminders:', error)
    return NextResponse.json(
      { error: 'Failed to send session reminders' },
      { status: 500 }
    )
  }
}
