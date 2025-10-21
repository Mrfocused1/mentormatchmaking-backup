import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// GET - Fetch all messages in a conversation with a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params

    // Create Supabase server client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    // Fetch all messages between current user and specified user
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: user.id,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: user.id,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            role: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Get the other user's info
    const otherUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        role: true,
        profile: {
          select: {
            profilePicture: true,
            workExperience: true,
            city: true,
          },
        },
      },
    })

    if (!otherUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Mark all messages from the other user as read
    await prisma.message.updateMany({
      where: {
        senderId: userId,
        receiverId: user.id,
        read: false,
      },
      data: {
        read: true,
      },
    })

    return NextResponse.json({
      success: true,
      messages,
      otherUser: {
        id: otherUser.id,
        name: otherUser.name,
        role: otherUser.role,
        avatar: otherUser.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=A3F3C4&color=1B4332&size=400`,
        title: otherUser.profile?.workExperience || 'User',
        location: otherUser.profile?.city || 'Location not set',
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
