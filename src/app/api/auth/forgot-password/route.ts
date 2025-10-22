import { sendPasswordResetEmail } from '@/lib/email'
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

    // Always return success (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a reset link has been sent.'
      })
    }

    // Generate reset token
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Store token
    await supabase.from('VerificationToken').insert({
      userId: user.id,
      token,
      type: 'PASSWORD_RESET',
      expiresAt: expiresAt.toISOString()
    })

    // Send password reset email
    const resetUrl = `https://look4mentors.com/reset-password?token=${token}`

    await sendPasswordResetEmail(
      user.email,
      user.name,
      resetUrl,
      '1 hour'
    )

    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset link has been sent.'
    })
  } catch (error) {
    console.error('Error in forgot password:', error)
    return NextResponse.json(
      { success: true, message: 'If an account exists, a reset link has been sent.' }
    )
  }
}
