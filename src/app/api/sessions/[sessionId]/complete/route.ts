import { sendReviewRequestEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params
    const supabase = await createClient()

    // Get session
    const { data: session } = await supabase
      .from('Session')
      .select(`
        *,
        mentor:User!mentorId(*),
        mentee:User!menteeId(*)
      `)
      .eq('id', sessionId)
      .single()

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Mark session as completed
    await supabase
      .from('Session')
      .update({
        status: 'COMPLETED',
        completedAt: new Date().toISOString()
      })
      .eq('id', sessionId)

    // Send review request to mentee
    await sendReviewRequestEmail(
      session.mentee.email,
      session.mentee.name,
      session.mentor.name,
      `https://look4mentors.com/sessions/${session.id}/review`
    )

    // Send review request to mentor (optional)
    await sendReviewRequestEmail(
      session.mentor.email,
      session.mentor.name,
      session.mentee.name,
      `https://look4mentors.com/sessions/${session.id}/review`
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error completing session:', error)
    return NextResponse.json(
      { error: 'Failed to complete session' },
      { status: 500 }
    )
  }
}
