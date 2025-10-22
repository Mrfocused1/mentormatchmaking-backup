import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { UserRole, ExperienceLevel, MeetingFrequency } from '@prisma/client'

// PUT method for updating existing profiles
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      bio,
      workExperience,
      city,
      timezone,
      linkedIn,
      twitter,
      instagram,
      availableHours,
      preferredFrequency,
      responseTime,
      helpsWith,
      lookingFor,
      goals,
      interests,
      industries,
    } = body

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

    // Update profile
    const updatedProfile = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        bio: bio || undefined,
        workExperience: workExperience || undefined,
        city: city || undefined,
        timezone: timezone || undefined,
        linkedIn: linkedIn || undefined,
        twitter: twitter || undefined,
        instagram: instagram || undefined,
        availableHours: availableHours || undefined,
        preferredFrequency: preferredFrequency || undefined,
        responseTime: responseTime || undefined,
        helpsWith: helpsWith || undefined,
        lookingFor: lookingFor || undefined,
        goals: goals || undefined,
      },
      // Temporarily removed includes to avoid TypeScript errors
    })

    // Update interests if provided
    if (interests && Array.isArray(interests)) {
      // Remove all existing interests
      await prisma.profile.update({
        where: { id: updatedProfile.id },
        data: {
          interests: {
            set: [],
          },
        },
      })

      // Add new interests
      for (const interestName of interests) {
        const slug = interestName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        await prisma.interest.upsert({
          where: { slug },
          update: {},
          create: {
            name: interestName,
            slug,
          },
        })

        await prisma.profile.update({
          where: { id: updatedProfile.id },
          data: {
            interests: {
              connect: { slug },
            },
          },
        })
      }
    }

    // Update industries if provided
    if (industries && Array.isArray(industries)) {
      // Remove all existing industries
      await prisma.profile.update({
        where: { id: updatedProfile.id },
        data: {
          industries: {
            set: [],
          },
        },
      })

      // Add new industries
      for (const industryName of industries) {
        const slug = industryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        await prisma.industry.upsert({
          where: { slug },
          update: {},
          create: {
            name: industryName,
            slug,
          },
        })

        await prisma.profile.update({
          where: { id: updatedProfile.id },
          data: {
            industries: {
              connect: { slug },
            },
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile. Please try again.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const {
      firstName,
      lastName,
      age,
      role, // 'mentor' or 'mentee'

      // From mentee form
      careerGoals,
      areasOfInterest,
      specificGoals,
      currentStatus,
      jobTitle,
      company,
      industry,
      experienceLevel,
      hoursPerMonth,
      preferredMeetingFormat,
      timezone,
      location,
      mentorPreferences,

      // From mentor form
      linkedinUrl,
      twitterUrl,
      instagramUrl,
      employmentType,
      businessName,
      yearsOfExperience,
      expertise,
      mentorshipAreas,
      availability,
      mentorExperienceLevel,
    } = body

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
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    // Get the current user from Supabase auth
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

    // Map experience level to enum
    const mapExperienceLevel = (level: string): ExperienceLevel | null => {
      const mapping: Record<string, ExperienceLevel> = {
        'entry': ExperienceLevel.ENTRY,
        'junior': ExperienceLevel.MID,
        'mid': ExperienceLevel.SENIOR,
        'senior': ExperienceLevel.EXECUTIVE,
      }
      return mapping[level] || null
    }

    // Map meeting frequency
    const mapMeetingFrequency = (formats: string[]): MeetingFrequency | null => {
      if (!formats || formats.length === 0) return null

      // Use the first selected format
      const format = formats[0].toLowerCase()
      if (format.includes('daily')) return MeetingFrequency.WEEKLY
      if (format.includes('weekly') && !format.includes('bi')) return MeetingFrequency.WEEKLY
      if (format.includes('bi')) return MeetingFrequency.BIWEEKLY
      return MeetingFrequency.FLEXIBLE
    }

    // Parse available hours (e.g., "2-4" -> 4, "8+" -> 10)
    const parseHours = (hoursStr: string): number | null => {
      if (!hoursStr) return null
      if (hoursStr.includes('+')) return 10
      const match = hoursStr.match(/(\d+)-(\d+)/)
      return match ? parseInt(match[2]) : null
    }

    // Create or update User record in Prisma (sync from Supabase auth)
    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email!,
        name: `${firstName} ${lastName}`.trim(),
        age: age || 25, // Default age if not provided
        role: role === 'mentor' ? UserRole.MENTOR : UserRole.MENTEE,
        updatedAt: new Date(),
      },
      create: {
        id: user.id,
        email: user.email!,
        name: `${firstName} ${lastName}`.trim(),
        age: age || 25, // Default age if not provided
        role: role === 'mentor' ? UserRole.MENTOR : UserRole.MENTEE,
      },
    })

    // Map mentor years of experience to enum
    const mapMentorExperience = (years: string): ExperienceLevel | null => {
      const mapping: Record<string, ExperienceLevel> = {
        '0-3': ExperienceLevel.ENTRY,
        '3-7': ExperienceLevel.MID,
        '7-15': ExperienceLevel.SENIOR,
        '15+': ExperienceLevel.EXECUTIVE,
      }
      return mapping[years] || null
    }

    // Build work experience text
    const workExperienceText = jobTitle && company
      ? `${jobTitle} at ${company || businessName || ''}`
      : jobTitle || company || businessName || null

    // Determine years of experience enum (mentor has direct mapping, mentee uses experienceLevel)
    const experienceEnum = role === 'mentor'
      ? mapMentorExperience(yearsOfExperience)
      : mapExperienceLevel(experienceLevel)

    // Create Profile record with onboarding data
    const profile = await prisma.profile.create({
      data: {
        userId: dbUser.id,
        bio: specificGoals || null,
        goals: careerGoals && careerGoals.length > 0
          ? careerGoals.join(', ')
          : null,
        workExperience: workExperienceText,
        yearsOfExperience: experienceEnum,
        currentSituation: currentStatus || employmentType || null,
        preferredFrequency: mapMeetingFrequency(preferredMeetingFormat),
        availableHours: parseHours(hoursPerMonth),
        lookingFor: mentorPreferences || null,
        helpsWith: mentorshipAreas && mentorshipAreas.length > 0
          ? mentorshipAreas.join(', ')
          : null,
        city: location || null,
        timezone: timezone || null,
        linkedIn: linkedinUrl || null,
        twitter: twitterUrl || null,
        instagram: instagramUrl || null,
      },
    })

    // Handle industries (create if doesn't exist, then connect)
    if (industry) {
      const slug = industry.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      await prisma.industry.upsert({
        where: { slug },
        update: {},
        create: {
          name: industry,
          slug,
        },
      })

      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          industries: {
            connect: { slug },
          },
        },
      })
    }

    // Handle interests (mentee: areasOfInterest, mentor: expertise + mentorshipAreas)
    const interestsToAdd = [
      ...(areasOfInterest || []),
      ...(expertise || []),
      ...(mentorshipAreas || []),
    ]

    if (interestsToAdd.length > 0) {
      // Remove duplicates
      const uniqueInterests = Array.from(new Set(interestsToAdd))

      for (const interest of uniqueInterests) {
        const slug = interest.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        await prisma.interest.upsert({
          where: { slug },
          update: {},
          create: {
            name: interest,
            slug,
          },
        })

        await prisma.profile.update({
          where: { id: profile.id },
          data: {
            interests: {
              connect: { slug },
            },
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      user: dbUser,
      profile: profile,
    })
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: 'Failed to create profile. Please try again.' },
      { status: 500 }
    )
  }
}
