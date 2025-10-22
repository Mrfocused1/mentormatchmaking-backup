import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Fetch user and profile from database - temporarily simplified
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        Profile: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Transform data for frontend - temporarily simplified
    const profileData = {
      id: user.id,
      name: user.name,
      age: user.age,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      profile: {
        bio: user.Profile?.bio,
        workExperience: user.Profile?.workExperience,
        city: user.Profile?.city,
        timezone: user.Profile?.timezone,
        profilePicture: user.Profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A3F3C4&color=1B4332&size=400`,
        yearsOfExperience: user.Profile?.yearsOfExperience,
        availableHours: user.Profile?.availableHours,
        preferredFrequency: user.Profile?.preferredFrequency,
        responseTime: user.Profile?.responseTime,
        linkedIn: user.Profile?.linkedIn,
        twitter: user.Profile?.twitter,
        instagram: user.Profile?.instagram,
        helpsWith: user.Profile?.helpsWith,
        lookingFor: user.Profile?.lookingFor,
        goals: user.Profile?.goals,
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
