import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Fetch user and profile from database
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            industries: true,
            interests: true,
          },
        },
        reviewsReceived: {
          include: {
            reviewer: {
              select: {
                id: true,
                name: true,
                profile: {
                  select: {
                    profilePicture: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10, // Get latest 10 reviews
        },
        matches1: {
          where: { status: 'ACTIVE' },
        },
        matches2: {
          where: { status: 'ACTIVE' },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate stats
    const totalMatches = user.matches1.length + user.matches2.length
    const ratings = user.reviewsReceived.map((r) => r.rating)
    const avgRating = ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0

    // Transform data for frontend
    const profileData = {
      id: user.id,
      name: user.name,
      age: user.age,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      profile: {
        bio: user.profile?.bio,
        workExperience: user.profile?.workExperience,
        city: user.profile?.city,
        timezone: user.profile?.timezone,
        profilePicture: user.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A3F3C4&color=1B4332&size=400`,
        yearsOfExperience: user.profile?.yearsOfExperience,
        availableHours: user.profile?.availableHours,
        preferredFrequency: user.profile?.preferredFrequency,
        responseTime: user.profile?.responseTime,
        linkedIn: user.profile?.linkedIn,
        twitter: user.profile?.twitter,
        instagram: user.profile?.instagram,
        helpsWith: user.profile?.helpsWith,
        lookingFor: user.profile?.lookingFor,
        goals: user.profile?.goals,
        industries: user.profile?.industries?.map((i) => ({ id: i.id, name: i.name, slug: i.slug })) || [],
        interests: user.profile?.interests?.map((i) => ({ id: i.id, name: i.name, slug: i.slug })) || [],
      },
      stats: {
        rating: avgRating,
        reviewCount: ratings.length,
        totalMatches,
      },
      reviews: user.reviewsReceived.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewer: {
          id: review.reviewer.id,
          name: review.reviewer.name,
          avatar: review.reviewer.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer.name)}&background=A3F3C4&color=1B4332&size=400`,
        },
      })),
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
