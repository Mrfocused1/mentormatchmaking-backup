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
    const priority = searchParams.get('priority') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('Ticket')
      .select(`
        id,
        name,
        email,
        subject,
        message,
        priority,
        status,
        assignedTo,
        resolution,
        createdAt,
        updatedAt,
        User (
          id,
          name,
          email
        )
      `, { count: 'exact' })

    // Apply filters
    if (status !== 'all') {
      query = query.eq('status', status.toUpperCase())
    }

    if (priority !== 'all') {
      query = query.eq('priority', priority.toUpperCase())
    }

    const { data: tickets, count } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    return NextResponse.json({
      tickets: tickets || [],
      total: count || 0,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}
