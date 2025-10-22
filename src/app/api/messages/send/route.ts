import { sendNewMessageEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { senderId, recipientId, content } = await request.json()

    // Get sender and recipient
    const { data: users } = await supabase
      .from('User')
      .select('*')
      .in('id', [senderId, recipientId])

    const sender = users?.find(u => u.id === senderId)
    const recipient = users?.find(u => u.id === recipientId)

    if (!sender || !recipient) {
      return NextResponse.json({ error: 'Users not found' }, { status: 404 })
    }

    // Create message
    const { data: message } = await supabase
      .from('Message')
      .insert({
        senderId,
        recipientId,
        content,
        sentAt: new Date().toISOString()
      })
      .select()
      .single()

    // Check recipient's notification preferences
    const { data: preferences } = await supabase
      .from('NotificationPreferences')
      .select('*')
      .eq('userId', recipientId)
      .single()

    // Send email notification if enabled (default true if no preferences set)
    if (preferences?.emailOnNewMessage !== false) {
      const messagePreview = content.length > 150
        ? content.substring(0, 150) + '...'
        : content

      await sendNewMessageEmail(
        recipient.email,
        recipient.name,
        sender.name,
        messagePreview,
        `https://look4mentors.com/messages`,
        sender.profilePhoto || undefined
      )
    }

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
