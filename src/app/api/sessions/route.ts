import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Build query URL
    let queryUrl = `${supabaseUrl}/rest/v1/Session?or=(mentorId.eq.${user.id},menteeId.eq.${user.id})&order=scheduledAt.asc`

    if (status) {
      queryUrl += `&status=eq.${status}`
    }

    const sessionsResponse = await fetch(queryUrl, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!sessionsResponse.ok) {
      throw new Error(`Failed to fetch sessions: ${sessionsResponse.statusText}`)
    }

    const sessions = await sessionsResponse.json()

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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Create session
    const sessionResponse = await fetch(
      `${supabaseUrl}/rest/v1/Session`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          mentorId,
          menteeId,
          title: title || 'Mentorship Session',
          notes,
          scheduledAt: new Date(scheduledAt).toISOString(),
          duration: duration || 60,
          status: 'SCHEDULED',
        }),
      }
    )

    if (!sessionResponse.ok) {
      throw new Error(`Failed to create session: ${sessionResponse.statusText}`)
    }

    const session = await sessionResponse.json()

    // Get current user info
    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=name`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const users = await userResponse.json()
    const currentUser = users[0]

    // Create notification for the other user
    const otherUserId = user.id === mentorId ? menteeId : mentorId
    await fetch(
      `${supabaseUrl}/rest/v1/Notification`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: otherUserId,
          type: 'SESSION_CONFIRMED',
          title: 'New Session Scheduled',
          message: `${currentUser?.name || 'Someone'} scheduled a session with you`,
        }),
      }
    )

    return NextResponse.json({
      success: true,
      session: Array.isArray(session) ? session[0] : session,
    })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
