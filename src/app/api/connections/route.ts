import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// GET - Fetch all connection requests (sent and received)
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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'sent', 'received', or 'all'

    // Build where clause based on type
    let where: any = {
      OR: [
        { user1Id: user.id },
        { user2Id: user.id },
      ],
    }

    if (type === 'sent') {
      where = { initiatedById: user.id, status: 'PENDING' }
    } else if (type === 'received') {
      where = {
        initiatedById: { not: user.id },
        OR: [
          { user1Id: user.id },
          { user2Id: user.id },
        ],
        status: 'PENDING',
      }
    }

    // Fetch connection requests
    const connections = await prisma.match.findMany({
      where,
      include: {
        user1: {
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
        },
        user2: {
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
        },
      },
      orderBy: {
        matchedAt: 'desc',
      },
    })

    // Transform data to show the "other" user
    const transformedConnections = connections.map((conn) => {
      const otherUser = conn.user1Id === user.id ? conn.user2 : conn.user1
      const isInitiator = conn.initiatedById === user.id

      return {
        id: conn.id,
        userId: otherUser.id,
        name: otherUser.name,
        role: otherUser.role,
        avatar: otherUser.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=A3F3C4&color=1B4332&size=400`,
        title: otherUser.profile?.workExperience || 'User',
        location: otherUser.profile?.city || 'Location not set',
        status: conn.status,
        requestedAt: conn.matchedAt,
        acceptedAt: conn.acceptedAt,
        isInitiator,
      }
    })

    return NextResponse.json({
      success: true,
      connections: transformedConnections,
      count: transformedConnections.length,
    })
  } catch (error) {
    console.error('Error fetching connections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch connections. Please try again.' },
      { status: 500 }
    )
  }
}

// POST - Send a connection request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
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

    // Check if users can't connect with themselves
    if (user.id === userId) {
      return NextResponse.json(
        { error: 'You cannot connect with yourself' },
        { status: 400 }
      )
    }

    // Check if connection already exists (in either direction)
    const existingConnection = await prisma.match.findFirst({
      where: {
        OR: [
          { user1Id: user.id, user2Id: userId },
          { user1Id: userId, user2Id: user.id },
        ],
      },
    })

    if (existingConnection) {
      if (existingConnection.status === 'PENDING') {
        return NextResponse.json(
          { error: 'Connection request already sent' },
          { status: 400 }
        )
      } else if (existingConnection.status === 'ACTIVE') {
        return NextResponse.json(
          { error: 'You are already connected with this user' },
          { status: 400 }
        )
      }
    }

    // Create connection request
    // user1Id is always the smaller ID (for consistency with unique constraint)
    const [user1Id, user2Id] = [user.id, userId].sort()

    const connection = await prisma.match.create({
      data: {
        user1Id,
        user2Id,
        initiatedById: user.id,
        status: 'PENDING',
      },
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            role: true,
            profile: {
              select: {
                profilePicture: true,
                workExperience: true,
              },
            },
          },
        },
        user2: {
          select: {
            id: true,
            name: true,
            role: true,
            profile: {
              select: {
                profilePicture: true,
                workExperience: true,
              },
            },
          },
        },
      },
    })

    // Create notification for the recipient
    const recipientId = user.id === user1Id ? user2Id : user1Id
    await prisma.notification.create({
      data: {
        userId: recipientId,
        type: 'INTEREST_REQUEST',
        title: 'New Connection Request',
        message: `${connection.user1Id === user.id ? connection.user1.name : connection.user2.name} sent you a connection request`,
      },
    })

    return NextResponse.json({
      success: true,
      connection,
      message: 'Connection request sent successfully',
    })
  } catch (error) {
    console.error('Error sending connection request:', error)
    return NextResponse.json(
      { error: 'Failed to send connection request. Please try again.' },
      { status: 500 }
    )
  }
}
