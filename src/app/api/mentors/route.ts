import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get query parameters for filtering
    const industry = searchParams.get('industry')
    const interest = searchParams.get('interest')
    const experienceLevel = searchParams.get('experienceLevel')
    const search = searchParams.get('search')

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    }

    // Build query URL with filters
    let queryUrl = `${supabaseUrl}/rest/v1/User?role=eq.MENTOR&order=createdAt.desc`

    // Add search filter if provided
    if (search) {
      queryUrl += `&name=ilike.*${search}*`
    }

    // Fetch mentors from database
    const mentorsResponse = await fetch(queryUrl, { headers })

    if (!mentorsResponse.ok) {
      throw new Error(`Failed to fetch mentors: ${mentorsResponse.statusText}`)
    }

    const mentors = await mentorsResponse.json()

    // Fetch profiles for all mentors
    if (mentors.length > 0) {
      const mentorIds = mentors.map((m: any) => m.id).join(',')
      let profileQueryUrl = `${supabaseUrl}/rest/v1/Profile?userId=in.(${mentorIds})`

      // Add experience level filter if provided
      if (experienceLevel) {
        profileQueryUrl += `&yearsOfExperience=eq.${experienceLevel}`
      }

      const profilesResponse = await fetch(profileQueryUrl, { headers })

      if (!profilesResponse.ok) {
        throw new Error(`Failed to fetch profiles: ${profilesResponse.statusText}`)
      }

      const profiles = await profilesResponse.json()

      // Filter mentors who have profiles (completed onboarding)
      const mentorsWithProfiles = mentors
        .map((mentor: any) => {
          const profile = profiles.find((p: any) => p.userId === mentor.id)
          return profile ? { ...mentor, Profile: profile } : null
        })
        .filter((m: any) => m !== null)

      // Transform data for frontend
      const transformedMentors = mentorsWithProfiles.map((mentor: any) => {
        // Calculate average rating - temporarily disabled
        const ratings: number[] = []
        const avgRating = ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0

        return {
          id: mentor.id,
          name: mentor.name,
          age: mentor.age,
          title: mentor.Profile?.workExperience || 'Mentor',
          location: mentor.Profile?.city || 'Location not set',
          bio: mentor.Profile?.bio || '',
          expertise: [], // Temporarily disabled
          industries: [], // Temporarily disabled
          experience: mentor.Profile?.yearsOfExperience || null,
          rating: avgRating,
          reviewCount: ratings.length,
          availability: mentor.Profile?.availableHours || 0,
          responseTime: mentor.Profile?.responseTime || null,
          profileImage: mentor.Profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=A3F3C4&color=1B4332&size=400`,
          linkedIn: mentor.Profile?.linkedIn,
          twitter: mentor.Profile?.twitter,
          helpsWith: mentor.Profile?.helpsWith,
        }
      })

      return NextResponse.json({
        success: true,
        mentors: transformedMentors,
        count: transformedMentors.length,
      })
    }

    return NextResponse.json({
      success: true,
      mentors: [],
      count: 0,
    })
  } catch (error) {
    console.error('Error fetching mentors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mentors. Please try again.' },
      { status: 500 }
    )
  }
}
