import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get query parameters for filtering
    const industry = searchParams.get('industry')
    const interest = searchParams.get('interest')
    const experienceLevel = searchParams.get('experienceLevel')
    const search = searchParams.get('search')

    // Build where clause dynamically
    const where: any = {
      role: 'MENTOR',
      profile: {
        isNot: null, // Only get mentors who have completed their profile
      },
    }

    // Add filters if provided
    const profileWhere: any = {}

    if (experienceLevel) {
      profileWhere.yearsOfExperience = experienceLevel
    }

    if (industry || interest) {
      if (industry) {
        profileWhere.industries = {
          some: {
            slug: industry,
          },
        }
      }
      if (interest) {
        profileWhere.interests = {
          some: {
            slug: interest,
          },
        }
      }
    }

    if (Object.keys(profileWhere).length > 0) {
      where.profile = { ...where.profile, ...profileWhere }
    }

    // Add search filter (search by name)
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      }
    }

    // Fetch mentors from database
    const mentors = await prisma.user.findMany({
      where,
      include: {
        profile: {
          include: {
            industries: true,
            interests: true,
          },
        },
        reviewsReceived: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform data for frontend
    const transformedMentors = mentors.map((mentor) => {
      // Calculate average rating
      const ratings = mentor.reviewsReceived.map((r) => r.rating)
      const avgRating = ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0

      return {
        id: mentor.id,
        name: mentor.name,
        age: mentor.age,
        title: mentor.profile?.workExperience || 'Mentor',
        location: mentor.profile?.city || 'Location not set',
        bio: mentor.profile?.bio || '',
        expertise: mentor.profile?.interests?.map((i) => i.name) || [],
        industries: mentor.profile?.industries?.map((i) => i.name) || [],
        experience: mentor.profile?.yearsOfExperience || null,
        rating: avgRating,
        reviewCount: ratings.length,
        availability: mentor.profile?.availableHours || 0,
        responseTime: mentor.profile?.responseTime || null,
        profileImage: mentor.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=A3F3C4&color=1B4332&size=400`,
        linkedIn: mentor.profile?.linkedIn,
        twitter: mentor.profile?.twitter,
        helpsWith: mentor.profile?.helpsWith,
      }
    })

    return NextResponse.json({
      success: true,
      mentors: transformedMentors,
      count: transformedMentors.length,
    })
  } catch (error) {
    console.error('Error fetching mentors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mentors. Please try again.' },
      { status: 500 }
    )
  }
}
