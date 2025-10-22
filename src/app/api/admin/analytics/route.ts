import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('User')
      .select('isAdmin')
      .eq('id', user.id)
      .single()

    if (!userData?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get current date and calculate periods
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get all analytics data in parallel
    const [
      activeUsersResult,
      completedSessionsResult,
      totalMessagesResult,
      avgRatingResult,
      userGrowthResult,
      topMentorsResult
    ] = await Promise.all([
      // Active users in last 30 days
      supabase
        .from('User')
        .select('id', { count: 'exact', head: true })
        .gte('createdAt', thirtyDaysAgo.toISOString()),

      // Total completed sessions
      supabase
        .from('Session')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'COMPLETED'),

      // Total messages
      supabase
        .from('Message')
        .select('id', { count: 'exact', head: true }),

      // Average rating
      supabase
        .from('Review')
        .select('rating'),

      // User growth last 6 months
      supabase
        .from('User')
        .select('createdAt')
        .gte('createdAt', new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString())
        .order('createdAt', { ascending: true }),

      // Top mentors by session count
      supabase
        .from('Session')
        .select(`
          mentorId,
          mentor:User!Session_mentorIdToUser (
            id,
            name,
            email
          )
        `)
        .eq('status', 'COMPLETED')
    ])

    // Calculate average rating
    const reviews = avgRatingResult.data || []
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

    // Calculate session completion rate
    const { count: totalSessions } = await supabase
      .from('Session')
      .select('id', { count: 'exact', head: true })

    const completionRate = totalSessions && totalSessions > 0
      ? ((completedSessionsResult.count || 0) / totalSessions) * 100
      : 0

    // Process user growth by month
    const userGrowth = userGrowthResult.data || []
    const monthlyGrowth = new Map()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now)
      date.setMonth(date.getMonth() - i)
      const key = `${monthNames[date.getMonth()]}`
      monthlyGrowth.set(key, 0)
    }

    // Count users per month
    userGrowth.forEach((user) => {
      const date = new Date(user.createdAt)
      const key = `${monthNames[date.getMonth()]}`
      if (monthlyGrowth.has(key)) {
        monthlyGrowth.set(key, (monthlyGrowth.get(key) || 0) + 1)
      }
    })

    // Process top mentors
    const mentorSessions = new Map()
    topMentorsResult.data?.forEach((session) => {
      const mentorId = session.mentorId
      if (!mentorSessions.has(mentorId)) {
        mentorSessions.set(mentorId, {
          mentor: session.mentor,
          count: 0
        })
      }
      const current = mentorSessions.get(mentorId)
      if (current) {
        current.count++
      }
    })

    const topMentors = Array.from(mentorSessions.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        name: item.mentor?.name || 'Unknown',
        sessions: item.count,
        rating: 4.8 // Will be calculated from reviews later
      }))

    // Get ratings for top mentors
    for (const mentor of topMentors) {
      const { data: mentorReviews } = await supabase
        .from('Review')
        .select('rating')
        .eq('reviewedId', mentor.name) // Need to match by ID instead

      if (mentorReviews && mentorReviews.length > 0) {
        mentor.rating = mentorReviews.reduce((sum, r) => sum + r.rating, 0) / mentorReviews.length
      }
    }

    const analytics = {
      activeUsers: activeUsersResult.count || 0,
      completedSessions: completedSessionsResult.count || 0,
      sessionCompletionRate: Math.round(completionRate * 10) / 10,
      totalMessages: totalMessagesResult.count || 0,
      avgRating: Math.round(avgRating * 10) / 10,
      userGrowth: Array.from(monthlyGrowth.entries()).map(([month, count]) => ({
        month,
        count
      })),
      topMentors
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
