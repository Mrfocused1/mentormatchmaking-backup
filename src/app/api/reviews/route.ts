import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }

    // Check if already reviewed
    const existingResponse = await fetch(
      `${supabaseUrl}/rest/v1/Review?reviewerId=eq.${user.id}&reviewedId=eq.${reviewedId}`,
      { headers }
    )

    if (!existingResponse.ok) {
      throw new Error(`Failed to check existing review: ${existingResponse.statusText}`)
    }

    const existingReviews = await existingResponse.json()

    if (existingReviews && existingReviews.length > 0) {
      return NextResponse.json(
        { error: 'You have already reviewed this user' },
        { status: 400 }
      )
    }

    // Create review
    const createReviewResponse = await fetch(
      `${supabaseUrl}/rest/v1/Review`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          reviewerId: user.id,
          reviewedId,
          rating,
          comment: comment || '',
        })
      }
    )

    if (!createReviewResponse.ok) {
      throw new Error(`Failed to create review: ${createReviewResponse.statusText}`)
    }

    const reviews = await createReviewResponse.json()
    const review = Array.isArray(reviews) ? reviews[0] : reviews

    // Get reviewer info for notification
    const reviewerResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=name`,
      { headers }
    )

    if (!reviewerResponse.ok) {
      throw new Error(`Failed to fetch reviewer: ${reviewerResponse.statusText}`)
    }

    const reviewers = await reviewerResponse.json()
    const reviewer = reviewers[0]

    // Create notification
    await fetch(
      `${supabaseUrl}/rest/v1/Notification`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: reviewedId,
          type: 'REVIEW_RECEIVED',
          title: 'New Review',
          message: `${reviewer?.name || 'Someone'} left you a ${rating}-star review`,
        })
      }
    )

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
