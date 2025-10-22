import { sendConnectionRequestEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { senderId, recipientId, message } = await request.json()

    // Get both users
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [senderId, recipientId])

    const sender = users?.find(u => u.id === senderId)
    const recipient = users?.find(u => u.id === recipientId)

    if (!sender || !recipient) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Create connection request
    const { data: connectionRequest } = await supabase
      .from('ConnectionRequest')
      .insert({
        senderId,
        recipientId,
        message,
        status: 'PENDING',
        sentAt: new Date().toISOString()
      })
      .select()
      .single()

    // Send email notification
    await sendConnectionRequestEmail(
      recipient.email,
      recipient.name,
      sender.name,
      sender.role === 'MENTOR' ? 'Mentor' : 'Mentee',
      message || '',
      `https://look4mentors.com/connections?request=${connectionRequest.id}`,
      sender.profilePhoto || undefined
    )

    return NextResponse.json({ success: true, connectionRequest })
  } catch (error) {
    console.error('Error creating connection request:', error)
    return NextResponse.json(
      { error: 'Failed to create connection request' },
      { status: 500 }
    )
  }
}
