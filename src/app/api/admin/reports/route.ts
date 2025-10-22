import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const reason = searchParams.get('reason') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('Report')
      .select(`
        id,
        reason,
        description,
        status,
        resolvedNote,
        resolvedAt,
        createdAt,
        reporter:User!Report_reporterIdToUser (
          id,
          name,
          email
        ),
        reported:User!Report_reportedIdToUser (
          id,
          name,
          email
        )
      `, { count: 'exact' })

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status.toUpperCase())
    }

    if (reason !== 'all') {
      query = query.eq('reason', reason.toUpperCase())
    }

    const { data: reports, count } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    // Map severity based on reason
    const reportsWithSeverity = reports?.map(report => {
      let severity = 'medium'
      if (report.reason === 'HARASSMENT' || report.reason === 'SAFETY_CONCERN') {
        severity = 'critical'
      } else if (report.reason === 'INAPPROPRIATE_BEHAVIOR') {
        severity = 'high'
      } else if (report.reason === 'FAKE_PROFILE' || report.reason === 'SPAM') {
        severity = 'medium'
      } else {
        severity = 'low'
      }

      return {
        ...report,
        severity
      }
    })

    return NextResponse.json({
      reports: reportsWithSeverity || [],
      total: count || 0,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}
