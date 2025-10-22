import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const { data: preferences } = await supabase
      .from('NotificationPreferences')
      .select('*')
      .eq('userId', userId)
      .single()

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Error fetching preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { userId, preferences } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('NotificationPreferences')
      .upsert({
        userId,
        emailOnNewMessage: preferences.emailOnNewMessage ?? true,
        emailOnNewMatch: preferences.emailOnNewMatch ?? true,
        emailOnSessionReminder: preferences.emailOnSessionReminder ?? true,
        emailOnProfileView: preferences.emailOnProfileView ?? false,
        emailOnReviewRequest: preferences.emailOnReviewRequest ?? true,
        weeklyDigest: preferences.weeklyDigest ?? true,
        marketingEmails: preferences.marketingEmails ?? true,
        updatedAt: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, preferences: data })
  } catch (error) {
    console.error('Error updating preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
