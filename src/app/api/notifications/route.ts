import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET - Fetch user's notifications
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Fetch notifications
    const notificationsResponse = await fetch(
      `${supabaseUrl}/rest/v1/Notification?userId=eq.${user.id}&order=createdAt.desc&limit=50`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!notificationsResponse.ok) {
      throw new Error(`Failed to fetch notifications: ${notificationsResponse.statusText}`)
    }

    const notifications = await notificationsResponse.json()

    // Count unread notifications
    const unreadResponse = await fetch(
      `${supabaseUrl}/rest/v1/Notification?userId=eq.${user.id}&read=eq.false&select=count`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'count=exact',
        },
      }
    )

    const unreadCount = unreadResponse.headers.get('content-range')?.split('/')[1] || '0'

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount: parseInt(unreadCount),
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

// PATCH - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationIds } = body

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    let updateUrl = `${supabaseUrl}/rest/v1/Notification?userId=eq.${user.id}`

    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      updateUrl += `&id=in.(${notificationIds.join(',')})`
    } else {
      // Mark all unread as read
      updateUrl += `&read=eq.false`
    }

    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ read: true }),
    })

    if (!updateResponse.ok) {
      throw new Error(`Failed to update notifications: ${updateResponse.statusText}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error marking notifications as read:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
