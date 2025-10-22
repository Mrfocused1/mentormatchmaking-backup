import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    // Get all stats in parallel
    const [
      totalUsersResult,
      newUsersThisWeekResult,
      totalMentorsResult,
      totalMenteesResult,
      activeSessionsResult,
      completedSessionsResult,
      upcomingSessionsResult,
      totalMessagesResult,
      pendingReportsResult,
      openTicketsResult,
      emailsSentTodayResult,
      emailsSentThisWeekResult
    ] = await Promise.all([
      // Total users
      supabase.from('User').select('id', { count: 'exact', head: true }),

      // New users this week
      supabase
        .from('User')
        .select('id', { count: 'exact', head: true })
        .gte('createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),

      // Total mentors
      supabase
        .from('User')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'MENTOR'),

      // Total mentees
      supabase
        .from('User')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'MENTEE'),

      // Active sessions (scheduled)
      supabase
        .from('Session')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'SCHEDULED'),

      // Completed sessions
      supabase
        .from('Session')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'COMPLETED'),

      // Upcoming sessions (next 7 days)
      supabase
        .from('Session')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'SCHEDULED')
        .gte('scheduledAt', new Date().toISOString())
        .lte('scheduledAt', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),

      // Total messages
      supabase.from('Message').select('id', { count: 'exact', head: true }),

      // Pending reports
      supabase
        .from('Report')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'PENDING'),

      // Open tickets
      supabase
        .from('Ticket')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'OPEN'),

      // Emails sent today
      supabase
        .from('EmailLog')
        .select('id', { count: 'exact', head: true })
        .gte('createdAt', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),

      // Emails sent this week
      supabase
        .from('EmailLog')
        .select('id', { count: 'exact', head: true })
        .gte('createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    ])

    const stats = {
      totalUsers: totalUsersResult.count || 0,
      newUsersThisWeek: newUsersThisWeekResult.count || 0,
      totalMentors: totalMentorsResult.count || 0,
      totalMentees: totalMenteesResult.count || 0,
      activeSessions: activeSessionsResult.count || 0,
      completedSessions: completedSessionsResult.count || 0,
      upcomingSessions: upcomingSessionsResult.count || 0,
      totalMessages: totalMessagesResult.count || 0,
      pendingReports: pendingReportsResult.count || 0,
      openTickets: openTicketsResult.count || 0,
      emailsSentToday: emailsSentTodayResult.count || 0,
      emailsSentThisWeek: emailsSentThisWeekResult.count || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
