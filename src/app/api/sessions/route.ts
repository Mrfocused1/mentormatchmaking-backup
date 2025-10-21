import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// GET - Fetch user's sessions
export async function GET(request: NextRequest) {
  try {
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
            } catch {}
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
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build where clause
    let where: any = {
      OR: [
        { mentorId: user.id },
        { menteeId: user.id },
      ],
    }

    if (status) {
      where.status = status
    }

    const sessions = await prisma.session.findMany({
      where,
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                profilePicture: true,
                workExperience: true,
              },
            },
          },
        },
        mentee: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      sessions,
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

// POST - Create a new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mentorId, menteeId, title, notes, scheduledAt, duration } = body

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
            } catch {}
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
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify user is either mentor or mentee in the session
    if (user.id !== mentorId && user.id !== menteeId) {
      return NextResponse.json(
        { error: 'You can only create sessions you are part of' },
        { status: 403 }
      )
    }

    const session = await prisma.session.create({
      data: {
        mentorId,
        menteeId,
        title: title || 'Mentorship Session',
        notes,
        scheduledAt: new Date(scheduledAt),
        duration: duration || 60,
        status: 'SCHEDULED',
      },
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
          },
        },
        mentee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Create notification for the other user
    const otherUserId = user.id === mentorId ? menteeId : mentorId
    await prisma.notification.create({
      data: {
        userId: otherUserId,
        type: 'SESSION_SCHEDULED',
        title: 'New Session Scheduled',
        message: `${user.id === mentorId ? session.mentor.name : session.mentee.name} scheduled a session with you`,
        actionUrl: `/sessions/${session.id}`,
      },
    })

    return NextResponse.json({
      success: true,
      session,
    })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
