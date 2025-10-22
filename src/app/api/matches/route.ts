import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// GET - Get recommended matches for current user
export async function GET(request: NextRequest) {
  try {
    // Create Supabase server client
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    // Get current user's profile
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        Profile: {
          include: {
            interests: true,
            industries: true,
          },
        },
      },
    })

    if (!currentUser || !currentUser.Profile) {
      return NextResponse.json(
        { error: 'Profile not found. Please complete your profile first.' },
        { status: 404 }
      )
    }

    // Determine which role to search for (opposite of current user)
    const searchRole = currentUser.role === 'MENTOR' ? 'MENTEE' : 'MENTOR'

    // Fetch all potential matches (users with opposite role and completed profiles)
    const potentialMatches = await prisma.user.findMany({
      where: {
        role: searchRole,
        NOT: {
          id: user.id, // Exclude current user
        },
        profile: {
          isNot: null, // Only users with completed profiles
        },
      },
      include: {
        profile: {
          include: {
            interests: true,
            industries: true,
          },
        },
        reviewsReceived: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calculate match scores
    const userInterestSlugs = currentUser.Profile.interests.map(i => i.slug)
    const userIndustrySlugs = currentUser.Profile.industries.map(i => i.slug)

    interface ScoredMatch {
      user: typeof potentialMatches[0]
      score: number
      matchReasons: string[]
    }

    const scoredMatches: ScoredMatch[] = potentialMatches.map((match) => {
      let score = 0
      const matchReasons: string[] = []

      // Score based on shared interests (highest weight)
      const matchInterestSlugs = match.Profile?.interests?.map(i => i.slug) || []
      const sharedInterests = userInterestSlugs.filter(slug =>
        matchInterestSlugs.includes(slug)
      )
      if (sharedInterests.length > 0) {
        const interestScore = sharedInterests.length * 20 // 20 points per shared interest
        score += interestScore
        matchReasons.push(`${sharedInterests.length} shared interest${sharedInterests.length > 1 ? 's' : ''}`)
      }

      // Score based on shared industries (medium weight)
      const matchIndustrySlugs = match.Profile?.industries?.map(i => i.slug) || []
      const sharedIndustries = userIndustrySlugs.filter(slug =>
        matchIndustrySlugs.includes(slug)
      )
      if (sharedIndustries.length > 0) {
        const industryScore = sharedIndustries.length * 15 // 15 points per shared industry
        score += industryScore
        matchReasons.push(`${sharedIndustries.length} shared industr${sharedIndustries.length > 1 ? 'ies' : 'y'}`)
      }

      // Score based on experience level compatibility
      if (currentUser.Profile?.yearsOfExperience && match.Profile?.yearsOfExperience) {
        // For mentors: prefer mentees with less experience
        // For mentees: prefer mentors with more experience
        if (currentUser.role === 'MENTOR') {
          const experienceLevels = ['ENTRY', 'MID', 'SENIOR', 'EXECUTIVE']
          const userLevel = experienceLevels.indexOf(currentUser.Profile.yearsOfExperience)
          const matchLevel = experienceLevels.indexOf(match.Profile.yearsOfExperience)
          if (matchLevel < userLevel) {
            score += 10
            matchReasons.push('Experience level match')
          }
        } else {
          const experienceLevels = ['ENTRY', 'MID', 'SENIOR', 'EXECUTIVE']
          const userLevel = experienceLevels.indexOf(currentUser.Profile.yearsOfExperience)
          const matchLevel = experienceLevels.indexOf(match.Profile.yearsOfExperience)
          if (matchLevel > userLevel) {
            score += 10
            matchReasons.push('Experience level match')
          }
        }
      }

      // Score based on availability (if both have specified)
      if (currentUser.Profile?.availableHours && match.Profile?.availableHours) {
        // Similar availability is good
        const hoursDiff = Math.abs(currentUser.Profile.availableHours - match.Profile.availableHours)
        if (hoursDiff <= 5) {
          score += 8
          matchReasons.push('Similar availability')
        }
      }

      // Score based on meeting frequency compatibility
      if (currentUser.Profile?.preferredFrequency && match.Profile?.preferredFrequency) {
        if (currentUser.Profile.preferredFrequency === match.Profile.preferredFrequency) {
          score += 5
          matchReasons.push('Same meeting frequency preference')
        }
      }

      // Bonus for highly-rated users
      const ratings = match.reviewsReceived.map(r => r.rating)
      if (ratings.length > 0) {
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
        if (avgRating >= 4.5) {
          score += 5
          matchReasons.push('Highly rated')
        }
      }

      // Bonus for users in same city
      if (currentUser.Profile?.city && match.Profile?.city) {
        if (currentUser.Profile.city.toLowerCase() === match.Profile.city.toLowerCase()) {
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
        const ratings = user.reviewsReceived.map(r => r.rating)
        const avgRating = ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0

        return {
          id: user.id,
          name: user.name,
          age: user.age,
          role: user.role,
          title: user.profile?.workExperience || 'User',
          location: user.profile?.city || 'Location not set',
          bio: user.profile?.bio || '',
          interests: user.profile?.interests?.map(i => i.name) || [],
          industries: user.profile?.industries?.map(i => i.name) || [],
          experience: user.profile?.yearsOfExperience,
          rating: avgRating,
          reviewCount: ratings.length,
          availability: user.profile?.availableHours || 0,
          profileImage: user.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A3F3C4&color=1B4332&size=400`,
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
