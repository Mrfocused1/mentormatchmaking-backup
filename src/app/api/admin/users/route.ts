import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
    const role = searchParams.get('role') || 'all'
    const status = searchParams.get('status') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('User')
      .select(`
        id,
        email,
        name,
        age,
        role,
        createdAt,
        Profile (
          profilePicture,
          status
        )
      `, { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (role !== 'all') {
      query = query.eq('role', role.toUpperCase())
    }

    // Get sessions count and rating for each user
    const { data: users, count } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1)

    if (!users) {
      return NextResponse.json({ users: [], total: 0 })
    }

    // Get additional stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const [sessionsResult, reviewsResult] = await Promise.all([
          // Get sessions count
          supabase
            .from('Session')
            .select('id', { count: 'exact', head: true })
            .or(`mentorId.eq.${user.id},menteeId.eq.${user.id}`),

          // Get average rating
          supabase
            .from('Review')
            .select('rating')
            .eq('reviewedId', user.id)
        ])

        const sessionsCount = sessionsResult.count || 0
        const reviews = reviewsResult.data || []
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0

        const profile = Array.isArray(user.Profile) ? user.Profile[0] : user.Profile

        return {
          ...user,
          sessionsCount,
          rating: avgRating,
          status: profile?.status || 'ACTIVE',
          Profile: profile
        }
      })
    )

    return NextResponse.json({
      users: usersWithStats,
      total: count || 0,
      page,
      limit
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
