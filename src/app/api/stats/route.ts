import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'count=exact',
    }

    // Get counts for various stats using Supabase REST API
    const [
      totalMentorsResponse,
      totalMenteesResponse,
      totalUsersResponse,
      totalMatchesResponse,
      totalMessagesResponse,
      totalSessionsResponse,
    ] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/User?role=eq.MENTOR&select=count`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/User?role=eq.MENTEE&select=count`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/User?select=count`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/Match?status=eq.ACTIVE&select=count`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/Message?select=count`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/Session?status=eq.COMPLETED&select=count`, { headers }),
    ])

    // Extract counts from the content-range header
    const totalMentors = parseInt(totalMentorsResponse.headers.get('content-range')?.split('/')[1] || '0')
    const totalMentees = parseInt(totalMenteesResponse.headers.get('content-range')?.split('/')[1] || '0')
    const totalUsers = parseInt(totalUsersResponse.headers.get('content-range')?.split('/')[1] || '0')
    const totalMatches = parseInt(totalMatchesResponse.headers.get('content-range')?.split('/')[1] || '0')
    const totalMessages = parseInt(totalMessagesResponse.headers.get('content-range')?.split('/')[1] || '0')
    const totalSessions = parseInt(totalSessionsResponse.headers.get('content-range')?.split('/')[1] || '0')

    return NextResponse.json({
      success: true,
      stats: {
        totalMentors,
        totalMentees,
        totalUsers,
        totalMatches,
        totalMessages,
        totalSessions,
        successfulMatches: totalMatches, // For homepage stat
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
