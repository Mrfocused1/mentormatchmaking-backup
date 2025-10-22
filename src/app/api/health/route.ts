import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test Supabase REST API connection
    const supabaseUrl = 'https://igkalvcxjpkctfkytity.supabase.co'
    const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk0OTQwNywiZXhwIjoyMDc2NTI1NDA3fQ.mEZ5EzdzVtu590hbGqd2mWVI-bPxe97xsBmVgR8jrXE'

    const headers = {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
    }

    // Test connection by fetching users count
    const response = await fetch(
      `${supabaseUrl}/rest/v1/User?select=id&limit=1`,
      { headers }
    )

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status}`)
    }

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      method: 'supabase-rest-api',
      timestamp: new Date().toISOString(),
      env: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      database: 'disconnected',
      method: 'supabase-rest-api',
    }, { status: 500 })
  }
}
