import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    }

    // Fetch user from database
    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${id}&select=*`,
      { headers }
    )

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.statusText}`)
    }

    const users = await userResponse.json()
    const user = users && users.length > 0 ? users[0] : null

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Fetch user's profile
    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/Profile?userId=eq.${id}&select=*`,
      { headers }
    )

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.statusText}`)
    }

    const profiles = await profileResponse.json()
    const profile = profiles && profiles.length > 0 ? profiles[0] : null

    // Transform data for frontend
    const profileData = {
      id: user.id,
      name: user.name,
      age: user.age,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      profile: {
        bio: profile?.bio,
        workExperience: profile?.workExperience,
        city: profile?.city,
        timezone: profile?.timezone,
        profilePicture: profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A3F3C4&color=1B4332&size=400`,
        yearsOfExperience: profile?.yearsOfExperience,
        availableHours: profile?.availableHours,
        preferredFrequency: profile?.preferredFrequency,
        responseTime: profile?.responseTime,
        linkedIn: profile?.linkedIn,
        twitter: profile?.twitter,
        instagram: profile?.instagram,
        helpsWith: profile?.helpsWith,
        lookingFor: profile?.lookingFor,
        goals: profile?.goals,
        industries: [], // Temporarily disabled
        interests: [], // Temporarily disabled
      },
      stats: {
        rating: 0,
        reviewCount: 0,
        totalMatches: 0,
      },
      reviews: [], // Temporarily disabled
    }

    return NextResponse.json({
      success: true,
      profile: profileData,
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile. Please try again.' },
      { status: 500 }
    )
  }
}
