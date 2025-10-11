# MentorMatchmaking Platform

A comprehensive mentorship platform connecting mentees with experienced mentors across industries. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Core Features
- **Dual User Types**: Separate signup flows for mentors and mentees
- **Smart Matching**: Intelligent algorithm to connect users based on goals and interests
- **Dual Discovery Modes**:
  - Tinder-style swipe cards for quick browsing
  - Traditional grid view with advanced filters
- **Real-time Chat**: Instant messaging between matched users
- **Calendar Integration**: Schedule and manage mentorship sessions
- **Review System**: Rate and review mentorship experiences
- **Profile Management**: Comprehensive profiles with verification badges
- **Industry Coverage**: 25+ industries supported

### Safety & Security
- Age verification for users under 18
- Report and block functionality
- Admin moderation dashboard
- Secure authentication with NextAuth
- Privacy controls (Active, Not Accepting, Paused, Private profiles)

### SEO & Content
- Blog system with admin CMS
- Comprehensive SEO optimization
- Schema markup for enhanced search visibility
- Keyword optimization focused on "mentor" and related terms

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io
- **Styling**: Custom Tailwind config with Montserrat font
- **Components**: Custom UI component library

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#25283D` - Main text, headers
- **Primary Accent**: `#98DFEA` - Primary CTAs, links
- **Secondary Accent**: `#8F3985` - Secondary CTAs, badges
- **Soft Accent**: `#EFD9CE` - Soft backgrounds
- **Vibrant Accent**: `#07BEB8` - Success states, verification

### Typography
- **Font**: Montserrat (weights: 400, 500, 600, 700, 900)
- **No gradients or glassmorphism**
- **Clean, minimalistic design with solid colors**

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mentormatchmaking
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env` to `.env.local` and update with your values:
```bash
# Database (use Prisma Postgres, PostgreSQL, or Supabase)
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""

# Email Service
EMAIL_FROM="noreply@mentormatchmaking.com"
RESEND_API_KEY=""

# File Upload
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (when you have a database connected)
npx prisma migrate dev

# Seed the database with initial data (optional)
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
mentormatchmaking/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Base UI components
│   │   ├── layout/      # Layout components
│   │   ├── features/    # Feature-specific components
│   │   └── forms/       # Form components
│   ├── lib/             # Utilities and database
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 🗄️ Database Schema

The application uses a comprehensive database schema including:
- Users & Profiles
- Industries & Interests
- Interest Requests & Matches
- Messages & Sessions
- Reviews & Ratings
- Notifications
- Blog Posts & Categories
- Age Verification
- Reports & Blocks

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

### Database Options
- **Development**: Prisma Postgres (local)
- **Production**: Supabase, Neon, or PlanetScale

## 📝 Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js setup with TypeScript
- [x] Tailwind CSS with custom design system
- [x] Prisma schema design
- [x] Base UI components
- [x] Landing page

### Phase 2: Authentication & Users
- [ ] NextAuth implementation
- [ ] Signup flows (mentor/mentee)
- [ ] User dashboards
- [ ] Profile creation/editing

### Phase 3: Discovery & Matching
- [ ] Swipe card interface
- [ ] Grid view with filters
- [ ] Interest request system
- [ ] Mutual matching logic

### Phase 4: Communication
- [ ] Real-time chat with Socket.io
- [ ] Notification system
- [ ] Email notifications

### Phase 5: Scheduling & Reviews
- [ ] Calendar integration
- [ ] Session scheduling
- [ ] Review system

### Phase 6: Admin & Moderation
- [ ] Admin dashboard
- [ ] Content moderation
- [ ] Analytics
- [ ] Blog CMS

### Phase 7: Polish & Launch
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Testing
- [ ] Documentation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📈 SEO Optimization

The platform is optimized for search engines with:
- Meta tags for all pages
- Schema markup (Organization, Service, Person, BlogPosting)
- XML sitemap generation
- Optimized for "mentor" keywords
- Blog system for content marketing
- Fast loading times (Core Web Vitals optimized)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@mentormatchmaking.com or open an issue in the repository.

## 🙏 Acknowledgments

- Built with Next.js and the amazing React ecosystem
- Design inspiration from modern SaaS platforms
- Montserrat font by Google Fonts
