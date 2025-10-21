import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// GET - Fetch all conversations for current user
export async function GET(request: NextRequest) {
  try {
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

    // Fetch all messages where user is sender or receiver
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.id },
          { receiverId: user.id },
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
        createdAt: 'desc',
      },
    })

    // Group messages by conversation (unique users)
    const conversationsMap = new Map()

    messages.forEach((message) => {
      // Determine the other user in the conversation
      const otherUser = message.senderId === user.id ? message.receiver : message.sender
      const otherUserId = otherUser.id

      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          userId: otherUser.id,
          userName: otherUser.name,
          userRole: otherUser.role,
          userAvatar: otherUser.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=A3F3C4&color=1B4332&size=400`,
          lastMessage: message.content,
          lastMessageTime: message.createdAt,
          unreadCount: 0,
          messages: [],
        })
      }

      const conversation = conversationsMap.get(otherUserId)
      conversation.messages.push(message)

      // Count unread messages (messages sent to current user that haven't been read)
      if (message.receiverId === user.id && !message.read) {
        conversation.unreadCount++
      }
    })

    // Convert map to array
    const conversations = Array.from(conversationsMap.values())

    return NextResponse.json({
      success: true,
      conversations,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages. Please try again.' },
      { status: 500 }
    )
  }
}

// POST - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { receiverId, content } = body

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'Receiver ID and message content are required' },
        { status: 400 }
      )
    }

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

    // Create message
    const message = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId,
        content,
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
    })

    return NextResponse.json({
      success: true,
      message,
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
