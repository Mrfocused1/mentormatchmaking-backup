import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * GET /api/profile/views
 * Get profile view count for a user
 * Query params:
 * - userId: ID of the user whose profile views to get
 * - period: Optional time period (7d, 30d, 90d, all) - defaults to 'all'
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const period = searchParams.get('period') || 'all'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Calculate date filter based on period
    let dateFilter: string | undefined
    const now = new Date()

    if (period === '7d') {
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    } else if (period === '30d') {
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
    } else if (period === '90d') {
      dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    // Build query with optional date filter
    let viewCountQuery = `${supabaseUrl}/rest/v1/ProfileView?viewedId=eq.${userId}&select=*`
    if (dateFilter) {
      viewCountQuery += `&viewedAt=gte.${dateFilter}`
    }

    // Get all views
    const viewsResponse = await fetch(viewCountQuery, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!viewsResponse.ok) {
      throw new Error('Failed to fetch profile views')
    }

    const views = await viewsResponse.json()
    const viewCount = views.length

    // Get unique viewers (filter out nulls and count distinct viewerIds)
    const uniqueViewerIds = new Set(
      views
        .filter((view: any) => view.viewerId !== null)
        .map((view: any) => view.viewerId)
    )

    return NextResponse.json({
      success: true,
      viewCount,
      uniqueViewers: uniqueViewerIds.size,
      period,
    })
  } catch (error) {
    console.error('Error fetching profile views:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile views' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/profile/views
 * Track a profile view
 * Body:
 * - viewedId: ID of the user whose profile is being viewed
 */
export async function POST(request: NextRequest) {
  try {
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
              // The `setAll` method was called from a Server Component.
            }
          },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    const body = await request.json()
    const { viewedId } = body

    if (!viewedId) {
      return NextResponse.json(
        { success: false, error: 'Viewed user ID is required' },
        { status: 400 }
      )
    }

    const viewerId = user?.id

    // Don't track if user is viewing their own profile
    if (viewerId && viewerId === viewedId) {
      return NextResponse.json({
        success: true,
        message: 'Own profile view not tracked',
      })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    // Check if this user has viewed this profile in the last 24 hours
    // to prevent duplicate counting
    if (viewerId) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

      const recentViewResponse = await fetch(
        `${supabaseUrl}/rest/v1/ProfileView?viewerId=eq.${viewerId}&viewedId=eq.${viewedId}&viewedAt=gte.${twentyFourHoursAgo}&limit=1`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (recentViewResponse.ok) {
        const recentViews = await recentViewResponse.json()
        if (recentViews && recentViews.length > 0) {
          return NextResponse.json({
            success: true,
            message: 'View already tracked in last 24 hours',
          })
        }
      }
    }

    // Track the view
    const profileViewResponse = await fetch(
      `${supabaseUrl}/rest/v1/ProfileView`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          viewerId: viewerId || null,
          viewedId,
          ipAddress: request.headers.get('x-forwarded-for') || null,
        }),
      }
    )

    if (!profileViewResponse.ok) {
      throw new Error('Failed to track profile view')
    }

    const profileView = await profileViewResponse.json()

    // Optionally create a notification for the profile owner
    // Only notify if it's an authenticated user viewing
    if (viewerId && viewerId !== viewedId) {
      // Get viewer name
      const viewerResponse = await fetch(
        `${supabaseUrl}/rest/v1/User?id=eq.${viewerId}&select=name`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      let viewerName = 'Someone'
      if (viewerResponse.ok) {
        const viewers = await viewerResponse.json()
        if (viewers && viewers.length > 0) {
          viewerName = viewers[0].name || 'Someone'
        }
      }

      // Create notification
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
            userId: viewedId,
            type: 'PROFILE_VIEW',
            title: 'Profile View',
            message: `${viewerName} viewed your profile`,
            data: {
              viewerId,
              viewerName,
            },
          }),
        }
      )
    }

    return NextResponse.json({
      success: true,
      view: profileView[0] || profileView,
    })
  } catch (error) {
    console.error('Error tracking profile view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track profile view' },
      { status: 500 }
    )
  }
}
