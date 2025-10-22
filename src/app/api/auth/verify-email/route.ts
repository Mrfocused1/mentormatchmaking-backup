import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Find and validate token
    const { data: verificationToken } = await supabase
      .from('VerificationToken')
      .select('*, user:User(*)')
      .eq('token', token)
      .eq('type', 'EMAIL_VERIFICATION')
      .single()

    if (!verificationToken || new Date() > new Date(verificationToken.expiresAt)) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Mark email as verified
    await supabase
      .from('User')
      .update({ emailVerified: true })
      .eq('id', verificationToken.userId)

    // Delete used token
    await supabase
      .from('VerificationToken')
      .delete()
      .eq('token', token)

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully!'
    })
  } catch (error) {
    console.error('Error verifying email:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}
