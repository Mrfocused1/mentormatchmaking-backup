import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    // Create Supabase server client
    const cookieStore = await cookies()
    const supabaseUrl = 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDk0MDcsImV4cCI6MjA3NjUyNTQwN30.Ctcj8YgaDCS-pvOy9gJUxE4BqpS5GiohdqoJpD7KEIw'
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.mEZ5EzdzVtu590hbGqd2mWVI-bPxe97xsBmVgR8jrXE'

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

    // Use Supabase REST API directly to fetch/create user
    // This bypasses the need for Prisma and direct database connection
    const headers = {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }

    // First, try to fetch the user
    const getUserResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=*`,
      { headers }
    )

    if (!getUserResponse.ok) {
      throw new Error(`Failed to fetch user: ${getUserResponse.statusText}`)
    }

    const users = await getUserResponse.json()
    let dbUser = users && users.length > 0 ? users[0] : null

    // If user doesn't exist, create them
    if (!dbUser) {
      const createUserResponse = await fetch(
        `${supabaseUrl}/rest/v1/User`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            age: user.user_metadata?.age || 18,
            role: user.user_metadata?.role || 'MENTEE',
            emailVerified: user.email_confirmed_at ? new Date(user.email_confirmed_at).toISOString() : null,
          })
        }
      )

      if (createUserResponse.ok) {
        const newUser = await createUserResponse.json()
        dbUser = Array.isArray(newUser) ? newUser[0] : newUser
      } else {
        const errorText = await createUserResponse.text()
        console.error('Failed to create user:', errorText)
        throw new Error('Failed to create user in database')
      }
    }

    // Fetch user's profile separately
    const getProfileResponse = await fetch(
      `${supabaseUrl}/rest/v1/Profile?userId=eq.${user.id}&select=*`,
      { headers }
    )

    if (!getProfileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${getProfileResponse.statusText}`)
    }

    const profiles = await getProfileResponse.json()
    const profile = profiles && profiles.length > 0 ? profiles[0] : null

    // Attach profile to user object
    if (profile) {
      dbUser.Profile = profile
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
