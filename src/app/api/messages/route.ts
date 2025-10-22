import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// GET - Fetch all conversations for current user
export async function GET(request: NextRequest) {
  try {
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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Fetch all messages where user is sender or receiver
    const messagesResponse = await fetch(
      `${supabaseUrl}/rest/v1/Message?or=(senderId.eq.${user.id},receiverId.eq.${user.id})&order=createdAt.desc`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!messagesResponse.ok) {
      throw new Error(`Failed to fetch messages: ${messagesResponse.statusText}`)
    }

    const messages = await messagesResponse.json()

    // Return simplified response temporarily
    const conversations: any[] = []

    return NextResponse.json({
      success: true,
      conversations,
      messages,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages. Please try again.' },
      { status: 500 }
    )
  }
}

// POST - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { receiverId, content } = body

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'Receiver ID and message content are required' },
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

    // Use Supabase REST API instead of Prisma
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igkalvcxjpkctfkytity.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.gMT6Me3K7RQxoFN87w2nNPJKOWV1n3c_Nu5Wpo0Yj1Q'

    // Create message using Supabase REST API
    const messageResponse = await fetch(
      `${supabaseUrl}/rest/v1/Message`,
      {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          senderId: user.id,
          receiverId,
          content,
        }),
      }
    )

    if (!messageResponse.ok) {
      throw new Error(`Failed to send message: ${messageResponse.statusText}`)
    }

    const message = await messageResponse.json()

    return NextResponse.json({
      success: true,
      message: Array.isArray(message) ? message[0] : message,
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
