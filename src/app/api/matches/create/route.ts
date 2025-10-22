import { sendNewMatchEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { userId, matchedUserId } = await request.json()

    // Get both users
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [userId, matchedUserId])

    const user = users?.find(u => u.id === userId)
    const matchedUser = users?.find(u => u.id === matchedUserId)

    if (!user || !matchedUser) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Create match record
    const { data: match } = await supabase
      .from('Match')
      .insert({
        mentorId: user.role === 'MENTOR' ? user.id : matchedUser.id,
        menteeId: user.role === 'MENTEE' ? user.id : matchedUser.id,
        status: 'PENDING',
        matchedAt: new Date().toISOString()
      })
      .select()
      .single()

    // Send match notification to first user
    await sendNewMatchEmail(
      user.email,
      user.name,
      matchedUser.name,
      matchedUser.role.toLowerCase() as 'mentor' | 'mentee',
      matchedUser.bio || 'No bio available',
      `https://look4mentors.com/profile/${matchedUser.id}`,
      `https://look4mentors.com/messages/${matchedUser.id}`,
      matchedUser.profilePhoto || undefined
    )

    // Send match notification to second user
    await sendNewMatchEmail(
      matchedUser.email,
      matchedUser.name,
      user.name,
      user.role.toLowerCase() as 'mentor' | 'mentee',
      user.bio || 'No bio available',
      `https://look4mentors.com/profile/${user.id}`,
      `https://look4mentors.com/messages/${user.id}`,
      user.profilePhoto || undefined
    )

    return NextResponse.json({ success: true, match })
  } catch (error) {
    console.error('Error creating match:', error)
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    )
  }
}
