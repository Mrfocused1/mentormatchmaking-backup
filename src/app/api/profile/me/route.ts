import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Create Supabase server client
    const cookieStore = await cookies()
    const supabaseUrl = 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDk0MDcsImV4cCI6MjA3NjUyNTQwN30.Ctcj8YgaDCS-pvOy9gJUxE4BqpS5GiohdqoJpD7KEIw'

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
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

    // Fetch user and profile from database, create if doesn't exist
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: {
          include: {
            industries: true,
            interests: true,
          },
        },
      },
    })

    // If user doesn't exist in database, create them
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          age: user.user_metadata?.age || 18,
          role: user.user_metadata?.role || 'MENTEE',
          emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at) : null,
        },
        include: {
          profile: {
            include: {
              industries: true,
              interests: true,
            },
          },
        },
      })
    }

    return NextResponse.json({
      success: true,
      user: dbUser,
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile. Please try again.' },
      { status: 500 }
    )
  }
}
