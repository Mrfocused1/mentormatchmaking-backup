import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { sessionId, reviewerId, revieweeId, rating, comment } = await request.json()

    // Get users
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [reviewerId, revieweeId])

    const reviewer = users?.find(u => u.id === reviewerId)
    const reviewee = users?.find(u => u.id === revieweeId)

    if (!reviewer || !reviewee) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Create review
    const { data: review } = await supabase
      .from('Review')
      .insert({
        sessionId,
        reviewerId,
        revieweeId,
        rating,
        comment,
        createdAt: new Date().toISOString()
      })
      .select()
      .single()

    // Send thank you email to reviewer
    const html = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: 'Montserrat', sans-serif; background-color: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px;">
            <h2 style="color: #25283D;">Thank You for Your Review! ⭐</h2>
            <p style="color: #666666; font-size: 16px;">Hi ${reviewer.name},</p>
            <p style="color: #666666; font-size: 16px;">
              Thank you for taking the time to review your session with ${reviewee.name}.
              Your feedback helps build a better mentorship community!
            </p>
            <p style="color: #666666; font-size: 16px;">
              Your ${rating}-star review has been published.
            </p>
          </div>
        </body>
      </html>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: `Look 4 Mentors <${process.env.EMAIL_FROM}>`,
      to: reviewer.email,
      subject: 'Thank you for your review!',
      html
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
