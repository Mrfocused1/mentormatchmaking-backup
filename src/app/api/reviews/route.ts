import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// POST - Submit a review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviewedId, rating, comment } = body

    if (!reviewedId || !rating) {
      return NextResponse.json(
        { error: 'Reviewed user ID and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

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
            } catch {}
          },
        },
      }
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if already reviewed
    const existing = await prisma.review.findUnique({
      where: {
        reviewerId_reviewedId: {
          reviewerId: user.id,
          reviewedId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'You have already reviewed this user' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        reviewerId: user.id,
        reviewedId,
        rating,
        comment: comment || '',
      },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            profile: { select: { profilePicture: true } },
          },
        },
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        userId: reviewedId,
        type: 'MESSAGE',
        title: 'New Review',
        message: `${review.reviewer.name} left you a ${rating}-star review`,
        actionUrl: `/profile/${user.id}`,
      },
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
