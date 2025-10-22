# External Services Configuration Guide

This guide will help you configure all external services needed for the Look 4 Mentors platform.

## ✅ Completed
- **Database**: Supabase PostgreSQL (configured)
- **Authentication**: Supabase Auth (configured)
- **Mock Data**: All removed and replaced with Supabase queries

## 🔧 Services to Configure

### 1. OAuth Providers (Google & LinkedIn)

#### Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: "Web application"
   - Authorized redirect URIs:
     - Development: `http://localhost:3001/api/auth/callback/google`
     - Production: `https://look4mentors.com/api/auth/callback/google`
5. **Copy credentials**:
   - Client ID → `GOOGLE_CLIENT_ID`
   - Client Secret → `GOOGLE_CLIENT_SECRET`

#### LinkedIn OAuth Setup

1. **Go to LinkedIn Developers**: https://www.linkedin.com/developers/
2. **Create an app**:
   - App name: "Look 4 Mentors"
   - LinkedIn Page: (your company page)
   - App logo: Upload your logo
3. **Configure OAuth 2.0**:
   - Products tab: Request "Sign In with LinkedIn"
   - Auth tab: Add redirect URLs:
     - Development: `http://localhost:3001/api/auth/callback/linkedin`
     - Production: `https://look4mentors.com/api/auth/callback/linkedin`
4. **Copy credentials**:
   - Client ID → `LINKEDIN_CLIENT_ID`
   - Client Secret → `LINKEDIN_CLIENT_SECRET`

**Add to `.env.local`:**
```env
# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

---

### 2. Email Service (Resend)

Resend is a modern email API that's perfect for transactional emails.

#### Setup Steps:

1. **Sign up**: https://resend.com/
2. **Verify your domain** (look4mentors.com):
   - Go to "Domains" tab
   - Add your domain
   - Add DNS records (SPF, DKIM, DMARC)
   - Verify domain
3. **Create API Key**:
   - Go to "API Keys" tab
   - Create a new key with "Sending access"
   - Copy the key → `RESEND_API_KEY`
4. **Test email sending**:
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "noreply@look4mentors.com",
       "to": "your-email@example.com",
       "subject": "Test Email",
       "html": "<p>Hello from Look 4 Mentors!</p>"
     }'
   ```

**Add to `.env.local`:**
```env
# Email Service
EMAIL_FROM=noreply@look4mentors.com
RESEND_API_KEY=re_your_api_key_here
```

**Email Templates Needed:**
- Welcome email (mentor signup)
- Welcome email (mentee signup)
- Email verification
- Password reset
- Match notification
- Message notification
- Session reminder
- Session confirmation
- Review request

---

### 3. File Upload Service

The platform currently uses direct Supabase storage. If you want to use a dedicated service:

#### Option A: Supabase Storage (Recommended - Already Configured)

Supabase already provides file storage. You just need to configure buckets:

1. **Go to Supabase Dashboard**: https://app.supabase.com/
2. **Navigate to Storage**
3. **Create buckets**:
   - `profile-pictures` (public)
   - `cvs` (private)
   - `documents` (private)
4. **Set up policies**:
   ```sql
   -- Profile pictures (public read, authenticated write)
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'profile-pictures');
   CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-pictures' AND auth.role() = 'authenticated');

   -- CVs (private)
   CREATE POLICY "Owner Access" ON storage.objects FOR SELECT USING (bucket_id = 'cvs' AND auth.uid() = owner);
   CREATE POLICY "Owner Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cvs' AND auth.uid() = owner);
   ```

**Already configured in your `.env.local`** - no additional setup needed!

#### Option B: UploadThing (Alternative)

If you prefer a dedicated upload service:

1. **Sign up**: https://uploadthing.com/
2. **Create app**
3. **Get API keys**:
   - App ID → `UPLOADTHING_APP_ID`
   - Secret → `UPLOADTHING_SECRET`

**Add to `.env.local`:**
```env
# UploadThing (optional)
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=your_app_id
```

---

### 4. Production Environment Variables

#### Vercel Configuration:

```bash
cd mentormatchmaking

# Set Supabase variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Enter: https://igkalvcxjpkctfkytity.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Enter: your-anon-key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Enter: your-service-role-key

# Set site URL
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://look4mentors.com

# Set OAuth credentials (after you get them)
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add LINKEDIN_CLIENT_ID production
vercel env add LINKEDIN_CLIENT_SECRET production

# Set email service
vercel env add EMAIL_FROM production
# Enter: noreply@look4mentors.com

vercel env add RESEND_API_KEY production
# Enter: re_your_api_key

# Deploy with new environment variables
vercel --prod
```

---

## 📝 Optional Services

### Analytics (Optional)

#### Google Analytics:
1. Create property at https://analytics.google.com/
2. Get Measurement ID → `GOOGLE_ANALYTICS_ID`
3. Add to `.env.local`:
   ```env
   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### Error Tracking (Optional)

#### Sentry:
1. Create project at https://sentry.io/
2. Get DSN → `SENTRY_DSN`
3. Add to `.env.local`:
   ```env
   SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

### Payment Processing (Future)

#### Stripe (when you're ready to monetize):
1. Sign up at https://stripe.com/
2. Get API keys
3. Configure webhook endpoint
4. Add to `.env.local`:
   ```env
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

## ✅ Verification Checklist

- [ ] Google OAuth working in dev
- [ ] Google OAuth working in production
- [ ] LinkedIn OAuth working in dev
- [ ] LinkedIn OAuth working in production
- [ ] Test email sending (welcome email)
- [ ] Test email sending (password reset)
- [ ] Test file upload (profile pictures)
- [ ] Test file upload (CVs)
- [ ] All environment variables set on Vercel
- [ ] Production build successful
- [ ] Production deployment successful

---

## 🚀 Deployment Commands

```bash
# 1. Test locally
npm run dev

# 2. Build and test production build
npm run build
npm start

# 3. Deploy to Vercel
vercel --prod

# 4. Check deployment
vercel ls
vercel inspect [deployment-url]
```

---

## 📞 Support

If you need help with any of these setups:
- Supabase: https://supabase.com/docs
- Resend: https://resend.com/docs
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- LinkedIn OAuth: https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication
- Vercel: https://vercel.com/docs

---

## 🎉 Summary of Completed Work

### ✅ Mock Data Removed:
1. **Forum page** - Now fetches from `ForumCategory`, `ForumPost`, `ForumReply` tables
2. **Browse mentors page** - Now fetches from `User`, `Profile`, `Review`, `Match` tables
3. **Sessions availability page** - Now fetches from `MentorAvailability`, `TimeSlot` tables

### ✅ All Pages Using Real Data:
- Dashboards (mentor/mentee)
- Analytics pages
- Goals tracking
- Saved profiles
- Following/followers
- Messages
- Session booking
- Notifications
- Matches

### ✅ Build Status:
- **Build successful** ✅
- No TypeScript errors ✅
- All routes compiled ✅
- Ready for production ✅
