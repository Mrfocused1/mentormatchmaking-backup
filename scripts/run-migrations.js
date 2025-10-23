/**
 * Database Migration Script
 * Runs SQL migrations and sets admin user
 */

const { createClient } = require('@supabase/supabase-js')
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const databaseUrl = process.env.DATABASE_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!databaseUrl || !supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials in .env.local')
  console.error('   Required: DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create Supabase client with service role (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Create PostgreSQL client
const pgClient = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
})

async function runMigration(migrationFile, description) {
  console.log(`\n📝 Running migration: ${description}...`)

  try {
    const sqlPath = path.join(__dirname, '..', 'prisma', 'migrations', migrationFile)
    const sql = fs.readFileSync(sqlPath, 'utf8')

    console.log(`   Executing SQL from ${migrationFile}...`)

    // Execute the entire SQL file at once
    // PostgreSQL can handle multiple statements in one execution
    const result = await pgClient.query(sql)

    console.log(`✅ Migration ${description} completed successfully`)
    return true
  } catch (error) {
    // Some errors are expected (like "already exists")
    if (error.message.includes('already exists') ||
        error.message.includes('duplicate') ||
        error.code === '42P07' || // duplicate_table
        error.code === '42710' || // duplicate_object
        error.code === '42701') { // duplicate_column
      console.log(`   ⚠️  Migration already applied (this is normal)`)
      return true
    } else {
      console.error(`❌ Failed to run migration ${description}:`)
      console.error(`   Error: ${error.message}`)
      return false
    }
  }
}

async function setAdminUser(email) {
  console.log(`\n👤 Setting ${email} as admin...`)

  try {
    // First check if user exists
    const { data: users, error: fetchError } = await supabase
      .from('User')
      .select('id, name, email, isAdmin')
      .eq('email', email)

    if (fetchError) {
      console.error('❌ Error fetching user:', fetchError.message)
      return false
    }

    if (!users || users.length === 0) {
      console.error(`❌ No user found with email: ${email}`)
      console.log('   Please make sure this user has created an account first.')
      return false
    }

    const user = users[0]
    console.log(`   Found user: ${user.name} (${user.email})`)

    if (user.isAdmin) {
      console.log('   ℹ️  User is already an admin')
      return true
    }

    // Update user to be admin
    const { error: updateError } = await supabase
      .from('User')
      .update({ isAdmin: true })
      .eq('id', user.id)

    if (updateError) {
      console.error('❌ Error updating user:', updateError.message)
      return false
    }

    console.log('✅ User successfully set as admin')
    return true
  } catch (error) {
    console.error('❌ Failed to set admin user:', error.message)
    return false
  }
}

async function verifyMigrations() {
  console.log('\n🔍 Verifying migrations...')

  try {
    // Check for new tables
    const tables = [
      'VerificationToken',
      'NotificationPreferences',
      'SupportTicket',
      'TicketReply',
      'Report',
      'ProfileView',
      'ConnectionRequest',
      'Ticket',
      'EmailLog'
    ]

    console.log('\n   Checking tables:')
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1)

      if (error) {
        console.log(`   ❌ ${table} - NOT FOUND`)
      } else {
        console.log(`   ✅ ${table} - exists`)
      }
    }

    console.log('\n✅ Verification complete')
  } catch (error) {
    console.error('❌ Verification failed:', error.message)
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          Database Migration Script                        ║')
  console.log('║          Look 4 Mentors Admin Dashboard Setup             ║')
  console.log('╚════════════════════════════════════════════════════════════╝')

  try {
    // Connect to database
    console.log('\n🔌 Connecting to database...')
    await pgClient.connect()
    console.log('✅ Connected to database')

    // Run migrations
    await runMigration('add_email_system_fields.sql', 'Email System Fields')
    await runMigration('add_ticket_emaillog_tables.sql', 'Ticket & EmailLog Tables')

    // Set admin user
    await setAdminUser('paulshonowo2@gmail.com')

    // Verify migrations
    await verifyMigrations()

    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║                    Migration Complete!                     ║')
    console.log('╚════════════════════════════════════════════════════════════╝')
    console.log('\n✅ Next Steps:')
    console.log('   1. Login to your account at https://www.look4mentors.com/login')
    console.log('   2. Navigate to https://www.look4mentors.com/admin')
    console.log('   3. You should now have access to the admin dashboard')
    console.log('\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    // Disconnect from database
    console.log('🔌 Disconnecting from database...')
    await pgClient.end()
    console.log('✅ Disconnected\n')
  }
}

main().catch(console.error)
