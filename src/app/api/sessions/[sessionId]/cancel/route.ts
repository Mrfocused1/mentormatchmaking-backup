import { sendSessionCancelledEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const supabase = await createClient()
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
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error cancelling session:', error)
    return NextResponse.json(
      { error: 'Failed to cancel session' },
      { status: 500 }
    )
  }
}
