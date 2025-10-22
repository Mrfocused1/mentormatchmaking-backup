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
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || 'all'
    const status = searchParams.get('status') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('EmailLog')
      .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.ilike('recipient', `%${search}%`)
    }

    if (type !== 'all') {
      query = query.eq('type', type.toUpperCase())
    }

    if (status !== 'all') {
      query = query.eq('status', status.toUpperCase())
    }

    const { data: emailLogs, count } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    return NextResponse.json({
      emailLogs: emailLogs || [],
      total: count || 0,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching email logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email logs' },
      { status: 500 }
    )
  }
}
