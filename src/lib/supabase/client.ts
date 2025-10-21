import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  //  Temporarily hardcoded - will use env vars after confirming this works
  const supabaseUrl = 'https://igkalvcxjpkctfkytity.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlna2FsdmN4anBrY3Rma3l0aXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDk0MDcsImV4cCI6MjA3NjUyNTQwN30.Ctcj8YgaDCS-pvOy9gJUxE4BqpS5GiohdqoJpD7KEIw'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
