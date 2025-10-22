import { sendEmailVerificationEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { email } = await request.json()

    // Get user
    const { data: user } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate verification token
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store token in database
    await supabase.from('VerificationToken').insert({
      userId: user.id,
      token,
      type: 'EMAIL_VERIFICATION',
      expiresAt: expiresAt.toISOString()
    })

    // Send verification email
    const verificationUrl = `https://look4mentors.com/verify-email?token=${token}`

    await sendEmailVerificationEmail(
      user.email,
      user.name,
      verificationUrl
    )

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.'
    })
  } catch (error) {
    console.error('Error sending verification email:', error)
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    )
  }
}
