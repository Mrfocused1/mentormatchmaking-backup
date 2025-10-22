# Resend Email Setup Guide for Look 4 Mentors

Complete guide to setting up professional emails from `support@look4mentors.com` using Resend.

---

## 📧 Step 1: Create Resend Account

1. **Sign up**: Go to https://resend.com/signup
2. **Verify your email**: Check your inbox and verify
3. **Login**: https://resend.com/login

---

## 🌐 Step 2: Add Your Domain (look4mentors.com)

### 2.1 Add Domain to Resend

1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter: `look4mentors.com`
4. Click **"Add"**

### 2.2 Configure DNS Records

Resend will provide you with DNS records to add. You need to add these to your domain registrar (where you bought look4mentors.com).

**Example DNS Records:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ | `resend-domain-verification=abc123...` | 3600 |
| MX | @ | `feedback-smtp.resend.com` | 3600 |
| TXT | resend._domainkey | `p=MIGfMA0GCSqG...` | 3600 |
| TXT | _dmarc | `v=DMARC1; p=none;` | 3600 |

### 2.3 How to Add DNS Records (Common Registrars)

#### If using Namecheap:
1. Login to Namecheap
2. Go to "Domain List" → Your domain → "Manage"
3. Click "Advanced DNS"
4. Click "Add New Record"
5. Add each record from Resend

#### If using GoDaddy:
1. Login to GoDaddy
2. Go to "My Products" → "Domains"
3. Click on your domain
4. Click "DNS" tab
5. Add each record from Resend

#### If using Cloudflare:
1. Login to Cloudflare
2. Select your domain
3. Go to "DNS" tab
4. Click "Add record"
5. Add each record from Resend

### 2.4 Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. Go back to Resend dashboard
3. Click **"Verify"** next to your domain
4. ✅ Status should change to "Verified"

**Note**: DNS propagation can take up to 24 hours, but usually happens within minutes.

---

## 🔑 Step 3: Get API Key

1. In Resend dashboard, go to **"API Keys"**
2. Click **"Create API Key"**
3. Name it: `Look 4 Mentors Production`
4. Select permissions: **"Sending access"**
5. Click **"Create"**
6. **Copy the API key** (starts with `re_`)
7. ⚠️ **Save it immediately** - you won't see it again!

---

## 💻 Step 4: Add to Your Application

### 4.1 Update `.env.local`

```env
# Email Service (Resend)
EMAIL_FROM=support@look4mentors.com
RESEND_API_KEY=re_your_api_key_here
```

### 4.2 Update Vercel Environment Variables

```bash
cd mentormatchmaking

# Add email configuration
vercel env add EMAIL_FROM production
# Enter: support@look4mentors.com

vercel env add RESEND_API_KEY production
# Paste your API key (re_...)

# Also add for preview and development
vercel env add EMAIL_FROM preview
vercel env add RESEND_API_KEY preview

vercel env add EMAIL_FROM development
vercel env add RESEND_API_KEY development
```

---

## ✅ Step 5: Test Email Sending

### 5.1 Install Resend SDK

```bash
npm install resend
```

### 5.2 Test with CLI

```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "support@look4mentors.com",
    "to": "your-personal-email@gmail.com",
    "subject": "Test Email from Look 4 Mentors",
    "html": "<p>Hello! This is a test email from your mentorship platform.</p>"
  }'
```

**Expected Response:**
```json
{
  "id": "abc123...",
  "from": "support@look4mentors.com",
  "to": "your-personal-email@gmail.com",
  "created_at": "2025-10-22T20:00:00.000Z"
}
```

### 5.3 Check Your Inbox

- Check the email you sent to
- Look in **Spam/Junk** if not in inbox
- If email arrives → ✅ Setup successful!

---

## 📊 Step 6: Monitor Emails

### Resend Dashboard Features:

1. **Emails Tab**: View all sent emails
2. **Analytics**: Open rates, click rates
3. **Logs**: Delivery status, bounces, complaints
4. **Webhooks**: Get notified of email events

### Setup Webhooks (Optional):

1. Go to **Webhooks** in Resend
2. Click **"Add Endpoint"**
3. Enter URL: `https://look4mentors.com/api/webhooks/email`
4. Select events: `email.delivered`, `email.bounced`, `email.opened`
5. Save and copy signing secret

---

## 🎨 Email Templates Overview

Your application will send these emails:

### Authentication Emails:
1. **Welcome Email (Mentors)** - When mentor signs up
2. **Welcome Email (Mentees)** - When mentee signs up
3. **Email Verification** - Verify email address
4. **Password Reset** - Forgot password flow
5. **Password Changed** - Confirmation after password change

### Notification Emails:
6. **New Match** - When matched with someone
7. **New Message** - When receiving a message
8. **Connection Request** - Someone wants to connect
9. **Session Reminder** - Upcoming session (24h before)
10. **Session Confirmed** - Session booking confirmed
11. **Session Cancelled** - Session was cancelled

### Engagement Emails:
12. **Review Request** - After completed session
13. **Profile View** - Someone viewed your profile
14. **Monthly Summary** - Monthly stats and achievements
15. **Inactive User** - Re-engagement email

### Support Emails:
16. **Contact Form Submission** - Auto-reply
17. **Report Received** - Confirmation of report
18. **Help Request** - Support ticket confirmation

---

## 🔒 Best Practices

### Email Sending Limits:

**Resend Free Tier:**
- 100 emails/day
- 3,000 emails/month

**Resend Pro ($20/month):**
- 50,000 emails/month
- Custom sending limits

### Rate Limiting:
- Don't send more than 10 emails/second
- Batch emails for bulk operations
- Use queue system for high volume

### Email Deliverability:

1. ✅ **Always use verified domain**
2. ✅ **Include unsubscribe link**
3. ✅ **Don't send spam**
4. ✅ **Monitor bounce rates**
5. ✅ **Keep email lists clean**
6. ✅ **Use proper email headers**

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check API Key**: Make sure it starts with `re_`
2. **Verify Domain**: Domain must show "Verified" in Resend
3. **Check From Address**: Must be `@look4mentors.com`
4. **Check Logs**: View errors in Resend dashboard
5. **Test with curl**: Try the curl command above

### Email Going to Spam?

1. **SPF/DKIM**: Ensure DNS records are correct
2. **DMARC**: Add DMARC policy to DNS
3. **Content**: Avoid spam trigger words
4. **Engagement**: Users should whitelist your domain
5. **Unsubscribe**: Always include unsubscribe link

### Domain Not Verifying?

1. **Wait**: DNS can take up to 24 hours
2. **Check DNS**: Use https://dnschecker.org
3. **Copy Exactly**: DNS records must be exact
4. **No Proxy**: Disable Cloudflare proxy for TXT records
5. **Contact Support**: Resend support is very responsive

---

## 📈 Next Steps After Setup

1. ✅ Domain verified
2. ✅ API key obtained
3. ✅ Environment variables set
4. ✅ Test email sent successfully
5. 🚀 Deploy application with email integration
6. 📧 Monitor email delivery in Resend dashboard
7. 📊 Set up webhooks for tracking (optional)
8. 💼 Upgrade to Pro plan when needed

---

## 📞 Support

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: support@resend.com
- **DNS Help**: https://resend.com/docs/dashboard/domains/introduction
- **Status Page**: https://resend.com/status

---

## 🎉 Summary

Once setup is complete, you'll be able to send professional emails from:
- `support@look4mentors.com` - Main support email
- `noreply@look4mentors.com` - Automated emails (optional)
- `hello@look4mentors.com` - Marketing emails (optional)

All emails will have proper branding, deliverability, and tracking! 📧✨
