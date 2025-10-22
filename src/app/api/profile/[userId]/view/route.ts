import { sendProfileViewEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const supabase = await createClient()
    const { viewerId } = await request.json()

    // Get both users
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [userId, viewerId])

    const profileOwner = users?.find(u => u.id === userId)
    const viewer = users?.find(u => u.id === viewerId)

    if (!profileOwner || !viewer) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Record profile view
    await supabase.from('ProfileView').insert({
      profileOwnerId: userId,
      viewerId,
      viewedAt: new Date().toISOString()
    })

    // Check notification preferences
    const { data: preferences } = await supabase
      .from('NotificationPreferences')
      .select('*')
      .eq('userId', userId)
      .single()

    // Send notification if enabled
    if (preferences?.emailOnProfileView === true) {
      await sendProfileViewEmail(
        profileOwner.email,
        profileOwner.name,
        viewer.name,
        `https://look4mentors.com/profile/${viewerId}`
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error recording profile view:', error)
    return NextResponse.json(
      { error: 'Failed to record profile view' },
      { status: 500 }
    )
  }
}
