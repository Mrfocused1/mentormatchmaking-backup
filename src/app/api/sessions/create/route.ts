import { sendSessionConfirmedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { mentorId, menteeId, scheduledAt, duration, sessionType } = await request.json()

    // Get both users
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [mentorId, menteeId])

    const mentor = users?.find(u => u.id === mentorId)
    const mentee = users?.find(u => u.id === menteeId)

    if (!mentor || !mentee) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Create session
    const { data: session } = await supabase
      .from('Session')
      .insert({
        mentorId,
        menteeId,
        scheduledAt,
        duration: duration || 60,
        sessionType: sessionType || 'Mentorship Session',
        status: 'SCHEDULED',
        reminderSent: false
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
      sessionType || 'Mentorship Session',
      `https://look4mentors.com/sessions/${session.id}`
    )

    // Send confirmation to mentor
    await sendSessionConfirmedEmail(
      mentor.email,
      mentor.name,
      mentee.name,
      formattedDate,
      formattedTime,
      sessionType || 'Mentorship Session',
      `https://look4mentors.com/sessions/${session.id}`
    )

    return NextResponse.json({ success: true, session })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
