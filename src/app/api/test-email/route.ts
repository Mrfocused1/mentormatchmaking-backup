import { sendWelcomeMentorEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get email from query parameter or use default
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') || 'paulshonowo2@gmail.com'

    // Send test welcome email
    const result = await sendWelcomeMentorEmail(
      email,
      'Test User',
      'https://look4mentors.com/profile/edit'
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Test email sent successfully to ${email}!`,
        data: result.data
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send email',
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in test-email route:', error)
    return NextResponse.json({
      success: false,
      message: 'Exception occurred',
      error: String(error)
    }, { status: 500 })
  }
}
