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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('Session')
      .select(`
        id,
        title,
        scheduledAt,
        duration,
        status,
        createdAt,
        notes,
        mentor:User!Session_mentorIdToUser (
          id,
          name,
          email,
          Profile (
            profilePicture
          )
        ),
        mentee:User!Session_menteeIdToUser (
          id,
          name,
          email,
          Profile (
            profilePicture
          )
        )
      `, { count: 'exact' })

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status.toUpperCase())
    }

    const { data: sessions, count } = await query
      .order('scheduledAt', { ascending: false })
      .range(offset, offset + limit - 1)

    return NextResponse.json({
      sessions: sessions || [],
      total: count || 0,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}
