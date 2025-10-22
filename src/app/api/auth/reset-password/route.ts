import { sendPasswordChangedEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password required' },
        { status: 400 }
      )
    }

    // Validate token
    const { data: verificationToken } = await supabase
      .from('VerificationToken')
      .select('*, user:User(*)')
      .eq('token', token)
      .eq('type', 'PASSWORD_RESET')
      .single()

    if (!verificationToken || new Date() > new Date(verificationToken.expiresAt)) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Update password using Supabase Auth
    const { error } = await supabase.auth.admin.updateUserById(
      verificationToken.userId,
      { password: newPassword }
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Delete used token
    await supabase
      .from('VerificationToken')
      .delete()
      .eq('token', token)

    // Send confirmation email
    await sendPasswordChangedEmail(
      verificationToken.user.email,
      verificationToken.user.name
    )

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully!'
    })
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    )
  }
}
