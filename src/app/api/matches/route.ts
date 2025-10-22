import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET - Get recommended matches for current user
export async function GET(request: NextRequest) {
  try {
    // Create Supabase server client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDk0MDcsImV4cCI6MjA3NjUyNTQwN30.Ctcj8YgaDCS-pvOy9gJUxE4BqpS5GiohdqoJpD7KEIw',
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore
            }
          },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in first' },
        { status: 401 }
      )
    }

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Get current user
    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.statusText}`)
    }

    const users = await userResponse.json()
    const currentUser = users[0]

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get current user's profile
    const profileResponse = await fetch(
      `${supabaseUrl}/rest/v1/Profile?userId=eq.${user.id}&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.statusText}`)
    }

    const profiles = await profileResponse.json()
    const currentProfile = profiles[0]

    if (!currentProfile) {
      return NextResponse.json(
        { error: 'Profile not found. Please complete your profile first.' },
        { status: 404 }
      )
    }

    // Determine which role to search for (opposite of current user)
    const searchRole = currentUser.role === 'MENTOR' ? 'MENTEE' : 'MENTOR'

    // Fetch all potential matches (users with opposite role)
    const matchesResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?role=eq.${searchRole}&id=neq.${user.id}&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!matchesResponse.ok) {
      throw new Error(`Failed to fetch matches: ${matchesResponse.statusText}`)
    }

    const potentialMatches = await matchesResponse.json()

    // Fetch profiles for all potential matches
    const matchProfilesResponse = await fetch(
      `${supabaseUrl}/rest/v1/Profile?userId=in.(${potentialMatches.map((m: any) => m.id).join(',')})&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!matchProfilesResponse.ok) {
      throw new Error(`Failed to fetch match profiles: ${matchProfilesResponse.statusText}`)
    }

    const matchProfiles = await matchProfilesResponse.json()

    // Combine users with their profiles
    const matchesWithProfiles = potentialMatches
      .map((match: any) => {
        const profile = matchProfiles.find((p: any) => p.userId === match.id)
        return profile ? { ...match, Profile: profile } : null
      })
      .filter((m: any) => m !== null)

    // Calculate match scores
    // Temporarily set to empty arrays since includes are disabled
    const userInterestSlugs: string[] = []  // currentProfile.interests.map(i => i.slug)
    const userIndustrySlugs: string[] = []  // currentProfile.industries.map(i => i.slug)

    interface ScoredMatch {
      user: any
      score: number
      matchReasons: string[]
    }

    const scoredMatches: ScoredMatch[] = matchesWithProfiles.map((match: any) => {
      let score = 0
      const matchReasons: string[] = []

      // Score based on shared interests (highest weight)
      const matchInterestSlugs: string[] = [] // match.Profile?.interests?.map(i => i.slug) || [] - disabled temporarily
      const sharedInterests = userInterestSlugs.filter(slug =>
        matchInterestSlugs.includes(slug)
      )
      if (sharedInterests.length > 0) {
        const interestScore = sharedInterests.length * 20 // 20 points per shared interest
        score += interestScore
        matchReasons.push(`${sharedInterests.length} shared interest${sharedInterests.length > 1 ? 's' : ''}`)
      }

      // Score based on shared industries (medium weight)
      const matchIndustrySlugs: string[] = [] // match.Profile?.industries?.map(i => i.slug) || [] - disabled temporarily
      const sharedIndustries = userIndustrySlugs.filter(slug =>
        matchIndustrySlugs.includes(slug)
      )
      if (sharedIndustries.length > 0) {
        const industryScore = sharedIndustries.length * 15 // 15 points per shared industry
        score += industryScore
        matchReasons.push(`${sharedIndustries.length} shared industr${sharedIndustries.length > 1 ? 'ies' : 'y'}`)
      }

      // Score based on experience level compatibility
      if (currentProfile?.yearsOfExperience && match.Profile?.yearsOfExperience) {
        // For mentors: prefer mentees with less experience
        // For mentees: prefer mentors with more experience
        if (currentUser.role === 'MENTOR') {
          const experienceLevels = ['ENTRY', 'MID', 'SENIOR', 'EXECUTIVE']
          const userLevel = experienceLevels.indexOf(currentProfile.yearsOfExperience)
          const matchLevel = experienceLevels.indexOf(match.Profile.yearsOfExperience)
          if (matchLevel < userLevel) {
            score += 10
            matchReasons.push('Experience level match')
          }
        } else {
          const experienceLevels = ['ENTRY', 'MID', 'SENIOR', 'EXECUTIVE']
          const userLevel = experienceLevels.indexOf(currentProfile.yearsOfExperience)
          const matchLevel = experienceLevels.indexOf(match.Profile.yearsOfExperience)
          if (matchLevel > userLevel) {
            score += 10
            matchReasons.push('Experience level match')
          }
        }
      }

      // Score based on availability (if both have specified)
      if (currentProfile?.availableHours && match.Profile?.availableHours) {
        // Similar availability is good
        const hoursDiff = Math.abs(currentProfile.availableHours - match.Profile.availableHours)
        if (hoursDiff <= 5) {
          score += 8
          matchReasons.push('Similar availability')
        }
      }

      // Score based on meeting frequency compatibility
      if (currentProfile?.preferredFrequency && match.Profile?.preferredFrequency) {
        if (currentProfile.preferredFrequency === match.Profile.preferredFrequency) {
          score += 5
          matchReasons.push('Same meeting frequency preference')
        }
      }

      // Bonus for highly-rated users
      const ratings: number[] = [] // match.reviewsReceived.map(r => r.rating) - disabled temporarily
      if (ratings.length > 0) {
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
        if (avgRating >= 4.5) {
          score += 5
          matchReasons.push('Highly rated')
        }
      }

      // Bonus for users in same city
      if (currentProfile?.city && match.Profile?.city) {
        if (currentProfile.city.toLowerCase() === match.Profile.city.toLowerCase()) {
          score += 10
          matchReasons.push('Same city')
        }
      }

      return {
        user: match,
        score,
        matchReasons,
      }
    })

    // Sort by score (highest first) and take top 20
    const topMatches = scoredMatches
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(({ user, score, matchReasons }) => {
        // Calculate average rating
        const ratings: number[] = [] // user.reviewsReceived.map(r => r.rating) - disabled temporarily
        const avgRating = ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0

        return {
          id: user.id,
          name: user.name,
          age: user.age,
          role: user.role,
          title: user.Profile?.workExperience || 'User',
          location: user.Profile?.city || 'Location not set',
          bio: user.Profile?.bio || '',
          interests: [], // user.Profile?.interests?.map(i => i.name) || [] - disabled temporarily
          industries: [], // user.Profile?.industries?.map(i => i.name) || [] - disabled temporarily
          experience: user.Profile?.yearsOfExperience,
          rating: avgRating,
          reviewCount: ratings.length,
          availability: user.Profile?.availableHours || 0,
          profileImage: user.Profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A3F3C4&color=1B4332&size=400`,
          matchScore: score,
          matchReasons,
        }
      })

    return NextResponse.json({
      success: true,
      matches: topMatches,
      count: topMatches.length,
    })
  } catch (error) {
    console.error('Error fetching matches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch matches. Please try again.' },
      { status: 500 }
    )
  }
}
