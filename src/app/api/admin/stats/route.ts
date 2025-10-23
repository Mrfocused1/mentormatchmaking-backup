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

    // Helper function to safely get count with fallback
    const safeCount = async (query: Promise<any>) => {
      try {
        const result = await query
        return result.count || 0
      } catch (error) {
        console.error('Query failed:', error)
        return 0
      }
    }

    // Get all stats in parallel with individual error handling
    const [
      totalUsers,
      newUsersThisWeek,
      totalMentors,
      totalMentees,
      activeSessions,
      completedSessions,
      upcomingSessions,
      totalMessages,
      pendingReports,
      openTickets,
      emailsSentToday,
      emailsSentThisWeek
    ] = await Promise.all([
      // Total users
      safeCount(supabase.from('User').select('id', { count: 'exact', head: true })),

      // New users this week
      safeCount(
        supabase
          .from('User')
          .select('id', { count: 'exact', head: true })
          .gte('createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ),

      // Total mentors
      safeCount(
        supabase
          .from('User')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'MENTOR')
      ),

      // Total mentees
      safeCount(
        supabase
          .from('User')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'MENTEE')
      ),

      // Active sessions (scheduled)
      safeCount(
        supabase
          .from('Session')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'SCHEDULED')
      ),

      // Completed sessions
      safeCount(
        supabase
          .from('Session')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'COMPLETED')
      ),

      // Upcoming sessions (next 7 days)
      safeCount(
        supabase
          .from('Session')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'SCHEDULED')
          .gte('scheduledAt', new Date().toISOString())
          .lte('scheduledAt', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      ),

      // Total messages
      safeCount(supabase.from('Message').select('id', { count: 'exact', head: true })),

      // Pending reports
      safeCount(
        supabase
          .from('Report')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'PENDING')
      ),

      // Open tickets
      safeCount(
        supabase
          .from('Ticket')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'OPEN')
      ),

      // Emails sent today
      safeCount(
        supabase
          .from('EmailLog')
          .select('id', { count: 'exact', head: true })
          .gte('createdAt', new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
      ),

      // Emails sent this week
      safeCount(
        supabase
          .from('EmailLog')
          .select('id', { count: 'exact', head: true })
          .gte('createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      )
    ])

    const stats = {
      totalUsers,
      newUsersThisWeek,
      totalMentors,
      totalMentees,
      activeSessions,
      completedSessions,
      upcomingSessions,
      totalMessages,
      pendingReports,
      openTickets,
      emailsSentToday,
      emailsSentThisWeek
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    // Return default stats on error instead of failing
    return NextResponse.json({
      totalUsers: 0,
      newUsersThisWeek: 0,
      totalMentors: 0,
      totalMentees: 0,
      activeSessions: 0,
      completedSessions: 0,
      upcomingSessions: 0,
      totalMessages: 0,
      pendingReports: 0,
      openTickets: 0,
      emailsSentToday: 0,
      emailsSentThisWeek: 0
    })
  }
}
