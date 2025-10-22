import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET - Fetch all messages in a conversation with a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    // Create Supabase server client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDk0MDcsImV4cCI6MjA3NjUyNTQwN30.Ctcj8YgaDCS-pvOy9gJUxE4BqpS5GiohdqoJpD7KEIw',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore
            }
          },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in first' },
        { status: 401 }
      )
    }

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    }

    // Fetch all messages between current user and specified user
    // We need to fetch messages where:
    // (senderId = user.id AND receiverId = userId) OR (senderId = userId AND receiverId = user.id)
    // Supabase REST API doesn't support complex OR queries easily, so we'll fetch both directions

    const messages1Response = await fetch(
      `${supabaseUrl}/rest/v1/Message?senderId=eq.${user.id}&receiverId=eq.${userId}&order=createdAt.asc`,
      { headers }
    )

    const messages2Response = await fetch(
      `${supabaseUrl}/rest/v1/Message?senderId=eq.${userId}&receiverId=eq.${user.id}&order=createdAt.asc`,
      { headers }
    )

    if (!messages1Response.ok || !messages2Response.ok) {
      throw new Error('Failed to fetch messages')
    }

    const messages1 = await messages1Response.json()
    const messages2 = await messages2Response.json()

    // Combine and sort messages by createdAt
    const messages = [...messages1, ...messages2].sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    // Get the other user's info
    const otherUserResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${userId}&select=*`,
      { headers }
    )

    if (!otherUserResponse.ok) {
      throw new Error('Failed to fetch other user')
    }

    const otherUsers = await otherUserResponse.json()
    const otherUser = otherUsers[0]

    if (!otherUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch other user's profile
    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/Profile?userId=eq.${userId}&select=*`,
      { headers }
    )

    let otherProfile = null
    if (profileResponse.ok) {
      const profiles = await profileResponse.json()
      otherProfile = profiles && profiles.length > 0 ? profiles[0] : null
    }

    // Mark all messages from the other user as read
    await fetch(
      `${supabaseUrl}/rest/v1/Message?senderId=eq.${userId}&receiverId=eq.${user.id}&read=eq.false`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ read: true })
      }
    )

    return NextResponse.json({
      success: true,
      messages,
      otherUser: {
        id: otherUser.id,
        name: otherUser.name,
        role: otherUser.role,
        avatar: otherProfile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=A3F3C4&color=1B4332&size=400`,
        title: otherProfile?.workExperience || 'User',
        location: otherProfile?.city || 'Location not set',
      },
    })
  } catch (error) {
    console.error('Error fetching conversation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversation. Please try again.' },
      { status: 500 }
    )
  }
}
