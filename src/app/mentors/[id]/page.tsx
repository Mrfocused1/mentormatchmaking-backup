'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ReviewCard, Review } from '@/components/reviews/review-card'
import {
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'

// Mock mentor data
const mockMentor = {
  id: '1',
  name: 'Sarah Thompson',
  avatar: null,
  role: 'Senior Product Designer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  yearsExperience: 12,
  bio: 'Passionate product designer with over 12 years of experience in creating user-centered designs for Fortune 500 companies. I specialize in UX/UI design, design systems, and mentoring aspiring designers. My mission is to help others navigate their design careers and unlock their creative potential.',
  expertise: [
    'Product Design',
    'UX/UI Design',
    'Design Systems',
    'User Research',
    'Prototyping',
    'Figma',
    'Leadership',
  ],
  achievements: [
    'Led design team at 3 Fortune 500 companies',
    'Published author on UX design',
    'Speaker at 10+ design conferences',
    'Mentored 50+ designers to senior roles',
  ],
  education: [
    {
      degree: 'Master of Fine Arts',
      field: 'Interaction Design',
      school: 'School of Visual Arts',
      year: '2012',
    },
    {
      degree: 'Bachelor of Arts',
      field: 'Graphic Design',
      school: 'Rhode Island School of Design',
      year: '2008',
    },
  ],
  sessionTypes: [
    { name: 'Career Guidance', price: '$150', duration: '60 min' },
    { name: 'Portfolio Review', price: '$120', duration: '45 min' },
    { name: 'Design Critique', price: '$100', duration: '30 min' },
    { name: 'Career Transition', price: '$180', duration: '90 min' },
  ],
  stats: {
    totalSessions: 156,
    totalMentees: 48,
    averageRating: 4.8,
    totalReviews: 42,
    responseTime: '2 hours',
  },
  availability: 'Usually responds within 2 hours',
  isAvailable: true,
}

// Mock reviews
const mockReviews: Review[] = [
  {
    id: '1',
    reviewerName: 'Emily Rodriguez',
    reviewerAvatar: null,
    reviewerRole: 'Product Manager at StartupCo',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 4,
      professionalism: 5,
    },
    reviewText:
      'Absolutely incredible mentor! Sarah provided actionable insights that helped me land my dream job. Her expertise in product design is unmatched, and she took the time to review my portfolio in detail.',
    sessionType: 'Career Guidance',
    timestamp: '2 days ago',
    helpfulCount: 12,
    unhelpfulCount: 0,
    userVote: null,
  },
  {
    id: '2',
    reviewerName: 'Michael Chen',
    reviewerAvatar: null,
    reviewerRole: 'UX Designer',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 5,
      professionalism: 5,
    },
    reviewText:
      'Sarah is an exceptional mentor. She helped me navigate a complex career transition and provided invaluable guidance on building my personal brand.',
    sessionType: 'Career Transition',
    timestamp: '2 weeks ago',
    helpfulCount: 15,
    unhelpfulCount: 0,
    userVote: null,
  },
  {
    id: '3',
    reviewerName: 'David Kim',
    reviewerAvatar: null,
    reviewerRole: 'Junior Designer',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 5,
      professionalism: 5,
    },
    reviewText:
      'Best mentorship session I\'ve ever had! Sarah\'s feedback on my work was detailed and constructive.',
    sessionType: 'Design Critique',
    timestamp: '3 weeks ago',
    helpfulCount: 9,
    unhelpfulCount: 0,
    userVote: null,
  },
]

export default function MentorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const mentorId = params.id as string

  const [reviews, setReviews] = useState(mockReviews)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Display limited reviews initially
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  // Handle helpful/unhelpful votes
  const handleHelpfulClick = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          if (r.userVote === 'helpful') {
            return { ...r, helpfulCount: r.helpfulCount - 1, userVote: null }
          } else if (r.userVote === 'unhelpful') {
            return {
              ...r,
              helpfulCount: r.helpfulCount + 1,
              unhelpfulCount: r.unhelpfulCount - 1,
              userVote: 'helpful' as const,
            }
          } else {
            return { ...r, helpfulCount: r.helpfulCount + 1, userVote: 'helpful' as const }
          }
        }
        return r
      })
    )
  }

  const handleUnhelpfulClick = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          if (r.userVote === 'unhelpful') {
            return { ...r, unhelpfulCount: r.unhelpfulCount - 1, userVote: null }
          } else if (r.userVote === 'helpful') {
            return {
              ...r,
              helpfulCount: r.helpfulCount - 1,
              unhelpfulCount: r.unhelpfulCount + 1,
              userVote: 'unhelpful' as const,
            }
          } else {
            return { ...r, unhelpfulCount: r.unhelpfulCount + 1, userVote: 'unhelpful' as const }
          }
        }
        return r
      })
    )
  }

  const handleReportClick = (reviewId: string) => {
    alert('Review reported. Our team will review it shortly.')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/browse-mentors"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Browse</span>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <Avatar
                  fallback={mockMentor.name}
                  size="xl"
                  className="border-4 border-primary-accent shadow-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-black font-montserrat text-white mb-2">
                        {mockMentor.name}
                      </h1>
                      <p className="text-xl text-primary-accent font-semibold font-montserrat mb-2">
                        {mockMentor.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-white/90 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm font-montserrat">{mockMentor.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-montserrat">{mockMentor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-montserrat">
                        {mockMentor.yearsExperience} years experience
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(mockMentor.stats.averageRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-none text-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-bold font-montserrat">
                      {mockMentor.stats.averageRating}
                    </span>
                    <span className="text-white/70 font-montserrat">
                      ({mockMentor.stats.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => router.push(`/sessions/book/${mentorId}`)}
                      className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 font-bold"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                    <Button
                      onClick={() => router.push('/messages')}
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-dark"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      onClick={() => setIsSaved(!isSaved)}
                      variant="outline"
                      className={`border-2 ${
                        isSaved
                          ? 'bg-secondary-accent border-secondary-accent text-white'
                          : 'border-white text-white hover:bg-white hover:text-primary-dark'
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-dark"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Availability Badge */}
              {mockMentor.isAvailable && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold font-montserrat text-green-100">
                    {mockMentor.availability}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <Card className="lg:w-80 shadow-2xl">
              <CardHeader className="bg-secondary-accent text-white">
                <CardTitle className="flex items-center gap-2 font-montserrat">
                  <BarChart3 className="h-5 w-5" />
                  Mentor Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-montserrat text-neutral-600">
                      Total Sessions
                    </span>
                    <span className="text-xl font-black font-montserrat text-primary-dark">
                      {mockMentor.stats.totalSessions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-montserrat text-neutral-600">
                      Total Mentees
                    </span>
                    <span className="text-xl font-black font-montserrat text-primary-dark">
                      {mockMentor.stats.totalMentees}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-montserrat text-neutral-600">
                      Response Time
                    </span>
                    <span className="text-xl font-black font-montserrat text-primary-dark">
                      {mockMentor.stats.responseTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-montserrat text-primary-dark">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 font-montserrat leading-relaxed">
                    {mockMentor.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Expertise */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-montserrat text-primary-dark">
                    Areas of Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockMentor.expertise.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        size="lg"
                        className="bg-primary-accent/10 text-primary-dark border-primary-accent/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                    <Award className="h-5 w-5 text-secondary-accent" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mockMentor.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-neutral-700 font-montserrat"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      Reviews ({mockMentor.stats.totalReviews})
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-montserrat text-primary-dark">
                        {mockMentor.stats.averageRating}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(mockMentor.stats.averageRating)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'fill-none text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {displayedReviews.map(review => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        onHelpfulClick={handleHelpfulClick}
                        onUnhelpfulClick={handleUnhelpfulClick}
                        onReportClick={handleReportClick}
                        showCategoryRatings={true}
                      />
                    ))}
                  </div>
                  {reviews.length > 3 && (
                    <div className="mt-6 text-center">
                      <Button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        variant="outline"
                        className="border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark"
                      >
                        {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Session Types */}
              <Card className="shadow-lg sticky top-24">
                <CardHeader className="bg-primary-dark text-white">
                  <CardTitle className="flex items-center gap-2 font-montserrat">
                    <Calendar className="h-5 w-5" />
                    Session Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockMentor.sessionTypes.map((session, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold font-montserrat text-primary-dark">
                            {session.name}
                          </h4>
                          <span className="text-lg font-black font-montserrat text-secondary-accent">
                            {session.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-montserrat">{session.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => router.push(`/sessions/book/${mentorId}`)}
                    className="w-full mt-6 bg-primary-accent text-primary-dark hover:bg-primary-accent/90 font-bold"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Availability
                  </Button>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                    <GraduationCap className="h-5 w-5 text-secondary-accent" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMentor.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-primary-accent pl-4">
                        <h4 className="font-bold font-montserrat text-primary-dark mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-neutral-600 font-montserrat mb-1">
                          {edu.field}
                        </p>
                        <p className="text-sm text-neutral-500 font-montserrat">
                          {edu.school} • {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
