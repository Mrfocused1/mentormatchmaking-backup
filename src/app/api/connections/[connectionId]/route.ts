import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

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

    // Fetch the connection (without relations for type checking)
    const connection = await prisma.match.findUnique({
      where: { id: connectionId },
    })

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
    const updatedConnection = await prisma.match.update({
      where: { id: connectionId },
      data: {
        status: action === 'accept' ? 'ACTIVE' : 'UNMATCHED',
        acceptedAt: action === 'accept' ? new Date() : null,
      },
    })

    // Get current user's name for notification
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true },
    })

    await prisma.notification.create({
      data: {
        userId: connection.initiatedById,
        type: action === 'accept' ? 'MATCH' : 'MESSAGE',
        title: action === 'accept' ? 'Connection Accepted!' : 'Connection Declined',
        message: action === 'accept'
          ? `${currentUser?.name || 'Someone'} accepted your connection request`
          : `${currentUser?.name || 'Someone'} declined your connection request`,
      },
    })

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

    // Fetch the connection
    const connection = await prisma.match.findUnique({
      where: { id: connectionId },
    })

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
    await prisma.match.delete({
      where: { id: connectionId },
    })

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
