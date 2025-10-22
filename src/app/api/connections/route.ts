import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET - Fetch all connection requests (sent and received)
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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'sent', 'received', or 'all'

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    }

    let connections: any[] = []

    if (type === 'sent') {
      // Fetch only sent connection requests
      const response = await fetch(
        `${supabaseUrl}/rest/v1/Match?initiatedById=eq.${user.id}&status=eq.PENDING&order=matchedAt.desc`,
        { headers }
      )
      if (response.ok) {
        connections = await response.json()
      }
    } else if (type === 'received') {
      // Fetch only received connection requests (not initiated by user, but involving user)
      const response1 = await fetch(
        `${supabaseUrl}/rest/v1/Match?user1Id=eq.${user.id}&status=eq.PENDING&order=matchedAt.desc`,
        { headers }
      )
      const response2 = await fetch(
        `${supabaseUrl}/rest/v1/Match?user2Id=eq.${user.id}&status=eq.PENDING&order=matchedAt.desc`,
        { headers }
      )

      if (response1.ok && response2.ok) {
        const connections1 = await response1.json()
        const connections2 = await response2.json()
        connections = [...connections1, ...connections2].filter(
          (conn: any) => conn.initiatedById !== user.id
        )
      }
    } else {
      // Fetch all connections (sent and received)
      const response1 = await fetch(
        `${supabaseUrl}/rest/v1/Match?user1Id=eq.${user.id}&order=matchedAt.desc`,
        { headers }
      )
      const response2 = await fetch(
        `${supabaseUrl}/rest/v1/Match?user2Id=eq.${user.id}&order=matchedAt.desc`,
        { headers }
      )

      if (response1.ok && response2.ok) {
        const connections1 = await response1.json()
        const connections2 = await response2.json()
        // Combine and deduplicate
        const allConnections = [...connections1, ...connections2]
        const uniqueIds = new Set()
        connections = allConnections.filter((conn: any) => {
          if (uniqueIds.has(conn.id)) return false
          uniqueIds.add(conn.id)
          return true
        })
      }
    }

    // Transform connections
    const transformedConnections = connections.map((conn: any) => {
      return {
        id: conn.id,
        user1Id: conn.user1Id,
        user2Id: conn.user2Id,
        status: conn.status,
        requestedAt: conn.matchedAt,
        acceptedAt: conn.acceptedAt,
        isInitiator: conn.initiatedById === user.id,
      }
    })

    return NextResponse.json({
      success: true,
      connections: transformedConnections,
      count: transformedConnections.length,
    })
  } catch (error) {
    console.error('Error fetching connections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch connections. Please try again.' },
      { status: 500 }
    )
  }
}

// POST - Send a connection request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

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

    // Check if users can't connect with themselves
    if (user.id === userId) {
      return NextResponse.json(
        { error: 'You cannot connect with yourself' },
        { status: 400 }
      )
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

    // Check if connection already exists (in either direction)
    const response1 = await fetch(
      `${supabaseUrl}/rest/v1/Match?user1Id=eq.${user.id}&user2Id=eq.${userId}`,
      { headers }
    )
    const response2 = await fetch(
      `${supabaseUrl}/rest/v1/Match?user1Id=eq.${userId}&user2Id=eq.${user.id}`,
      { headers }
    )

    if (response1.ok && response2.ok) {
      const matches1 = await response1.json()
      const matches2 = await response2.json()
      const existingConnection = matches1.length > 0 ? matches1[0] : matches2.length > 0 ? matches2[0] : null

      if (existingConnection) {
        if (existingConnection.status === 'PENDING') {
          return NextResponse.json(
            { error: 'Connection request already sent' },
            { status: 400 }
          )
        } else if (existingConnection.status === 'ACTIVE') {
          return NextResponse.json(
            { error: 'You are already connected with this user' },
            { status: 400 }
          )
        }
      }
    }

    // Create connection request
    // user1Id is always the smaller ID (for consistency with unique constraint)
    const [user1Id, user2Id] = [user.id, userId].sort()

    const createResponse = await fetch(
      `${supabaseUrl}/rest/v1/Match`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user1Id,
          user2Id,
          initiatedById: user.id,
          status: 'PENDING',
        })
      }
    )

    if (!createResponse.ok) {
      throw new Error(`Failed to create connection: ${createResponse.statusText}`)
    }

    const connections = await createResponse.json()
    const connection = Array.isArray(connections) ? connections[0] : connections

    // Get current user's name for notification
    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=name`,
      { headers }
    )

    let userName = 'Someone'
    if (userResponse.ok) {
      const users = await userResponse.json()
      if (users && users.length > 0) {
        userName = users[0].name
      }
    }

    // Create notification for the recipient
    const recipientId = user.id === user1Id ? user2Id : user1Id
    await fetch(
      `${supabaseUrl}/rest/v1/Notification`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: recipientId,
          type: 'INTEREST_REQUEST',
          title: 'New Connection Request',
          message: `${userName} sent you a connection request`,
        })
      }
    )

    return NextResponse.json({
      success: true,
      connection,
      message: 'Connection request sent successfully',
    })
  } catch (error) {
    console.error('Error sending connection request:', error)
    return NextResponse.json(
      { error: 'Failed to send connection request. Please try again.' },
      { status: 500 }
    )
  }
}
