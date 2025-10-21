import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

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
    let dateFilter: Date | undefined
    const now = new Date()

    if (period === '7d') {
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (period === '30d') {
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    } else if (period === '90d') {
      dateFilter = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    }

    // Get view count
    const viewCount = await prisma.profileView.count({
      where: {
        viewedId: userId,
        ...(dateFilter && {
          viewedAt: {
            gte: dateFilter,
          },
        }),
      },
    })

    // Get unique viewer count
    const uniqueViewers = await prisma.profileView.findMany({
      where: {
        viewedId: userId,
        viewerId: { not: null },
        ...(dateFilter && {
          viewedAt: {
            gte: dateFilter,
          },
        }),
      },
      select: {
        viewerId: true,
      },
      distinct: ['viewerId'],
    })

    return NextResponse.json({
      success: true,
      viewCount,
      uniqueViewers: uniqueViewers.length,
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
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const body = await request.json()
    const { viewedId } = body

    if (!viewedId) {
      return NextResponse.json(
        { success: false, error: 'Viewed user ID is required' },
        { status: 400 }
      )
    }

    const viewerId = session?.user?.id

    // Don't track if user is viewing their own profile
    if (viewerId && viewerId === viewedId) {
      return NextResponse.json({
        success: true,
        message: 'Own profile view not tracked',
      })
    }

    // Check if this user has viewed this profile in the last 24 hours
    // to prevent duplicate counting
    if (viewerId) {
      const recentView = await prisma.profileView.findFirst({
        where: {
          viewerId,
          viewedId,
          viewedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      })

      if (recentView) {
        return NextResponse.json({
          success: true,
          message: 'View already tracked in last 24 hours',
        })
      }
    }

    // Track the view
    const profileView = await prisma.profileView.create({
      data: {
        viewerId: viewerId || null,
        viewedId,
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || null,
      },
    })

    // Optionally create a notification for the profile owner
    // Only notify if it's an authenticated user viewing
    if (viewerId && viewerId !== viewedId) {
      const viewer = await prisma.user.findUnique({
        where: { id: viewerId },
        select: { name: true },
      })

      await prisma.notification.create({
        data: {
          userId: viewedId,
          type: 'PROFILE_VIEW',
          title: 'Profile View',
          message: `${viewer?.name || 'Someone'} viewed your profile`,
          data: {
            viewerId,
            viewerName: viewer?.name,
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      view: profileView,
    })
  } catch (error) {
    console.error('Error tracking profile view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track profile view' },
      { status: 500 }
    )
  }
}
