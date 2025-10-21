# Supabase Authentication Setup Guide

## Step 1: Create a Supabase Project

1. **Go to Supabase**: https://supabase.com/
2. **Sign up/Login** with your GitHub account
3. **Create a New Project**:
   - Click "New Project"
   - Choose your organization (or create one)
   - Enter project details:
     - Name: `mentormatchmaking` or `look4mentors`
     - Database Password: Create a strong password (SAVE THIS!)
     - Region: Choose closest to your users (e.g., US East, EU West)
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

## Step 2: Get Your API Keys

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see two important keys:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon (public) key**: `eyJhbGciOiJ...` (long string)

**Copy both of these!** We'll add them to your `.env.local` file.

## Step 3: Configure Authentication Providers

### Enable Email/Password Authentication (Already enabled by default)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Email provider should be enabled by default
3. Under "Email Auth", you can configure:
   - ✅ Enable email confirmations: **OFF** (you said no verification)
   - ✅ Enable email change confirmations: **ON** (recommended)

### Enable LinkedIn OAuth

1. Still in **Authentication** → **Providers**
2. Find "LinkedIn" in the list
3. Click on it to configure

#### Get LinkedIn OAuth Credentials:

1. Go to **LinkedIn Developers**: https://www.linkedin.com/developers/
2. Click "Create app"
3. Fill in app details:
   - App name: "Look For Mentors"
   - LinkedIn Page: (create one or select existing)
   - App logo: Upload your logo
   - Legal agreement: Check the box
4. Click "Create app"
5. Go to the **Auth** tab
6. Copy your:
   - **Client ID**
   - **Client Secret**
7. Add **Authorized redirect URLs**:
   ```
   https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
   ```
   Replace `[YOUR-SUPABASE-PROJECT-REF]` with your actual Supabase project URL

8. Under "Products", request access to:
   - Sign In with LinkedIn
   - Share on LinkedIn (optional)

#### Configure in Supabase:

1. Back in Supabase, in LinkedIn provider settings:
2. **Enable** the LinkedIn provider
3. Paste your **LinkedIn Client ID**
4. Paste your **LinkedIn Client Secret**
5. Click **Save**

## Step 4: Set Up Your Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...your-anon-key...

# Site URL (for redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

For production, update `NEXT_PUBLIC_SITE_URL` to your actual domain.

## Step 5: Database Setup (Optional - We'll handle this via code)

Supabase automatically creates auth tables. You can link your existing Prisma schema later or use Supabase's built-in tables.

## Step 6: Test Authentication

Once everything is configured:
1. Run your Next.js app
2. Try signing up with email/password
3. Try signing in with LinkedIn
4. Check Supabase Dashboard → Authentication → Users to see registered users

## Security Notes

✅ **Never commit** `.env.local` to Git (already in `.gitignore`)
✅ Enable **Row Level Security (RLS)** on your Supabase tables
✅ Use **anon key** for client-side only (it's safe for public use)
✅ Keep your **service_role key** secret (we won't use it in browser)

## Next Steps

After completing this setup:
1. I'll install the Supabase client library
2. Create authentication context
3. Build login/signup pages
4. Add LinkedIn OAuth button
5. Implement session management

---

**When you're ready**, let me know you've completed these steps and provide your:
- Supabase Project URL
- Supabase Anon Key

Then I'll continue with the implementation!
