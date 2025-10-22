import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// PATCH - Accept or decline a connection request
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    const { connectionId } = await params
    const body = await request.json()
    const { action } = body // 'accept' or 'decline'

    if (!action || !['accept', 'decline'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "accept" or "decline"' },
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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }

    // Fetch the connection
    const connectionResponse = await fetch(
      `${supabaseUrl}/rest/v1/Match?id=eq.${connectionId}`,
      { headers }
    )

    if (!connectionResponse.ok) {
      throw new Error(`Failed to fetch connection: ${connectionResponse.statusText}`)
    }

    const connections = await connectionResponse.json()
    const connection = connections && connections.length > 0 ? connections[0] : null

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection request not found' },
        { status: 404 }
      )
    }

    // Verify user is the recipient (not the initiator)
    if (connection.initiatedById === user.id) {
      return NextResponse.json(
        { error: 'You cannot accept/decline your own connection request' },
        { status: 403 }
      )
    }

    // Verify user is part of the connection
    if (connection.user1Id !== user.id && connection.user2Id !== user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to modify this connection' },
        { status: 403 }
      )
    }

    // Check current status
    if (connection.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Connection request has already been ${connection.status.toLowerCase()}` },
        { status: 400 }
      )
    }

    // Update connection status
    const updateData: any = {
      status: action === 'accept' ? 'ACTIVE' : 'UNMATCHED',
    }
    if (action === 'accept') {
      updateData.acceptedAt = new Date().toISOString()
    }

    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/Match?id=eq.${connectionId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updateData)
      }
    )

    if (!updateResponse.ok) {
      throw new Error(`Failed to update connection: ${updateResponse.statusText}`)
    }

    const updatedConnections = await updateResponse.json()
    const updatedConnection = Array.isArray(updatedConnections) ? updatedConnections[0] : updatedConnections

    // Get current user info for notification
    const currentUserResponse = await fetch(
      `${supabaseUrl}/rest/v1/User?id=eq.${user.id}&select=name`,
      { headers }
    )

    let currentUserName = 'Someone'
    if (currentUserResponse.ok) {
      const users = await currentUserResponse.json()
      if (users && users.length > 0) {
        currentUserName = users[0].name
      }
    }

    // Create notification
    await fetch(
      `${supabaseUrl}/rest/v1/Notification`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: connection.initiatedById,
          type: action === 'accept' ? 'MATCH' : 'MESSAGE',
          title: action === 'accept' ? 'Connection Accepted!' : 'Connection Declined',
          message: action === 'accept'
            ? `${currentUserName} accepted your connection request`
            : `${currentUserName} declined your connection request`,
        })
      }
    )

    return NextResponse.json({
      success: true,
      connection: updatedConnection,
      message: `Connection request ${action}ed successfully`,
    })
  } catch (error) {
    console.error('Error updating connection:', error)
    return NextResponse.json(
      { error: 'Failed to update connection request. Please try again.' },
      { status: 500 }
    )
  }
}

// DELETE - Cancel a sent connection request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ connectionId: string }> }
) {
  try {
    const { connectionId } = await params

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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.6ggmm6yihrBzziAGMiNZi_t2nTh6aI_lPqLm51Xdxng'

    const headers = {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    }

    // Fetch the connection
    const connectionResponse = await fetch(
      `${supabaseUrl}/rest/v1/Match?id=eq.${connectionId}`,
      { headers }
    )

    if (!connectionResponse.ok) {
      throw new Error(`Failed to fetch connection: ${connectionResponse.statusText}`)
    }

    const connections = await connectionResponse.json()
    const connection = connections && connections.length > 0 ? connections[0] : null

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection request not found' },
        { status: 404 }
      )
    }

    // Verify user is the initiator
    if (connection.initiatedById !== user.id) {
      return NextResponse.json(
        { error: 'You can only cancel connection requests you initiated' },
        { status: 403 }
      )
    }

    // Can only cancel pending requests
    if (connection.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Can only cancel pending connection requests' },
        { status: 400 }
      )
    }

    // Delete the connection request
    const deleteResponse = await fetch(
      `${supabaseUrl}/rest/v1/Match?id=eq.${connectionId}`,
      {
        method: 'DELETE',
        headers
      }
    )

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete connection: ${deleteResponse.statusText}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Connection request cancelled successfully',
    })
  } catch (error) {
    console.error('Error cancelling connection:', error)
    return NextResponse.json(
      { error: 'Failed to cancel connection request. Please try again.' },
      { status: 500 }
    )
  }
}
