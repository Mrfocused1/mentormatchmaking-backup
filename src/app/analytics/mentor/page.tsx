'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/analytics/stat-card'
import { ProgressMetric } from '@/components/analytics/progress-metric'
import { SimpleBarChart } from '@/components/analytics/simple-bar-chart'
import { MetricComparison } from '@/components/analytics/metric-comparison'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Users,
  Star,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  TrendingUp,
  Award,
  Heart,
  CheckCircle,
  Target,
  BarChart3,
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react'

interface AnalyticsData {
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  cancelledSessions: number
  averageRating: number
  totalReviews: number
  totalMentees: number
  activeMentees: number
  profileViews: number
  connectionRequests: number
  acceptedRequests: number
  responseTime: string
  responseRate: number
}

interface ReviewData {
  id: string
  menteeName: string
  rating: number
  comment: string | null
  date: string
}

export default function MentorAnalyticsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    completedSessions: 0,
    upcomingSessions: 0,
    cancelledSessions: 0,
    averageRating: 0,
    totalReviews: 0,
    totalMentees: 0,
    activeMentees: 0,
    profileViews: 0,
    connectionRequests: 0,
    acceptedRequests: 0,
    responseTime: '< 24 hours',
    responseRate: 0
  })

  const [sessionActivity, setSessionActivity] = useState<Array<{ label: string; value: number; color: string }>>([])
  const [sessionTypes, setSessionTypes] = useState<Array<{ label: string; value: number; color: string }>>([])
  const [recentReviews, setRecentReviews] = useState<ReviewData[]>([])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Calculate date range
        const now = new Date()
        const startDate = new Date()
        if (timeRange === '7d') {
          startDate.setDate(now.getDate() - 7)
        } else if (timeRange === '30d') {
          startDate.setDate(now.getDate() - 30)
        } else if (timeRange === '90d') {
          startDate.setDate(now.getDate() - 90)
        } else {
          startDate.setFullYear(1970) // all time
        }

        // Fetch all sessions
        const { data: sessionsData } = await supabase
          .from('Session')
          .select('id, status, scheduledAt, duration, menteeId')
          .eq('mentorId', user.id)
          .gte('scheduledAt', startDate.toISOString())

        const sessions = sessionsData || []
        const totalSessions = sessions.length
        const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length
        const upcomingSessions = sessions.filter(s => s.status === 'SCHEDULED').length
        const cancelledSessions = sessions.filter(s => s.status === 'CANCELLED').length

        // Calculate unique mentees
        const uniqueMenteeIds = new Set(sessions.map(s => s.menteeId))
        const totalMentees = uniqueMenteeIds.size

        // Fetch reviews
        const { data: reviewsData } = await supabase
          .from('Review')
          .select(`
            id, rating, comment, createdAt,
            User_Review_reviewerIdToUser:reviewerId (name)
          `)
          .eq('reviewedId', user.id)
          .order('createdAt', { ascending: false })

        const reviews = reviewsData || []
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0

        // Fetch profile views (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(now.getDate() - 30)

        const { data: viewsData } = await supabase
          .from('ProfileView')
          .select('id')
          .eq('viewedId', user.id)
          .gte('viewedAt', thirtyDaysAgo.toISOString())

        const profileViews = viewsData?.length || 0

        // Fetch connection requests
        const { data: requestsData } = await supabase
          .from('InterestRequest')
          .select('id, status')
          .eq('toUserId', user.id)

        const requests = requestsData || []
        const totalRequests = requests.length
        const acceptedRequests = requests.filter(r => r.status === 'ACCEPTED').length
        const responseRate = totalRequests > 0 ? Math.round((acceptedRequests / totalRequests) * 100) : 0

        setAnalytics({
          totalSessions,
          completedSessions,
          upcomingSessions,
          cancelledSessions,
          averageRating: Number(avgRating.toFixed(1)),
          totalReviews: reviews.length,
          totalMentees,
          activeMentees: uniqueMenteeIds.size, // for now, same as total
          profileViews,
          connectionRequests: totalRequests,
          acceptedRequests,
          responseTime: '< 24 hours',
          responseRate
        })

        // Session activity by week (last 4 weeks)
        const weeklyActivity: Record<number, number> = {}
        sessions.forEach(s => {
          const sessionDate = new Date(s.scheduledAt)
          const weeksDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
          if (weeksDiff >= 0 && weeksDiff < 4) {
            weeklyActivity[3 - weeksDiff] = (weeklyActivity[3 - weeksDiff] || 0) + 1
          }
        })

        setSessionActivity([
          { label: 'Week 1', value: weeklyActivity[0] || 0, color: 'bg-primary-accent' },
          { label: 'Week 2', value: weeklyActivity[1] || 0, color: 'bg-primary-accent' },
          { label: 'Week 3', value: weeklyActivity[2] || 0, color: 'bg-primary-accent' },
          { label: 'Week 4', value: weeklyActivity[3] || 0, color: 'bg-primary-accent' }
        ])

        // Recent reviews (top 3)
        const transformedReviews: ReviewData[] = reviews.slice(0, 3).map(r => {
          const reviewer = Array.isArray(r.User_Review_reviewerIdToUser)
            ? r.User_Review_reviewerIdToUser[0]
            : r.User_Review_reviewerIdToUser

          const createdDate = new Date(r.createdAt)
          const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (24 * 60 * 60 * 1000))
          let dateStr = ''
          if (daysDiff === 0) dateStr = 'Today'
          else if (daysDiff === 1) dateStr = '1 day ago'
          else if (daysDiff < 7) dateStr = `${daysDiff} days ago'`
          else if (daysDiff < 14) dateStr = '1 week ago'
          else if (daysDiff < 30) dateStr = `${Math.floor(daysDiff / 7)} weeks ago`
          else dateStr = `${Math.floor(daysDiff / 30)} months ago`

          return {
            id: r.id,
            menteeName: reviewer?.name || 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            date: dateStr
          }
        })

        setRecentReviews(transformedReviews)

        // For session types - we don't have this data in schema, so create placeholder
        setSessionTypes([
          { label: 'General', value: totalSessions, color: 'bg-secondary-accent' }
        ])

      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange, supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <section className="pt-24 pb-12 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Loading analytics...
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <section className="pt-24 pb-12 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Error loading analytics
                </h3>
                <p className="text-neutral-600 font-montserrat mb-8">{error}</p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/mentor"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Mentor Analytics
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Track your mentorship impact and growth
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
                {(['7d', '30d', '90d', 'all'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold font-montserrat transition-colors ${
                      timeRange === range
                        ? 'bg-primary-accent text-primary-dark'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {range === '7d' && 'Last 7 Days'}
                    {range === '30d' && 'Last 30 Days'}
                    {range === '90d' && 'Last 90 Days'}
                    {range === 'all' && 'All Time'}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary-accent text-primary-accent bg-white hover:bg-primary-accent/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Sessions"
              value={analytics.totalSessions}
              subtitle={`${analytics.completedSessions} completed`}
              icon={Calendar}
              iconColor="text-primary-accent"
              iconBgColor="bg-primary-accent/10"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Average Rating"
              value={analytics.averageRating}
              subtitle={`${analytics.totalReviews} reviews`}
              icon={Star}
              iconColor="text-yellow-600"
              iconBgColor="bg-yellow-100"
              trend={{ value: 3, isPositive: true }}
            />
            <StatCard
              title="Total Mentees"
              value={analytics.totalMentees}
              subtitle={`${analytics.activeMentees} currently active`}
              icon={Users}
              iconColor="text-secondary-accent"
              iconBgColor="bg-secondary-accent/10"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Profile Views"
              value={analytics.profileViews}
              subtitle="Last 30 days"
              icon={Eye}
              iconColor="text-vibrant-accent"
              iconBgColor="bg-vibrant-accent/10"
              trend={{ value: 22, isPositive: true }}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Session Activity */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary-accent" />
                    Session Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SimpleBarChart data={sessionActivity} height={220} />
                </CardContent>
              </Card>

              {/* Session Types Breakdown */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary-accent" />
                    Sessions by Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SimpleBarChart data={sessionTypes} height={220} />
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Recent Reviews
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/reviews">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-neutral-100">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="p-6 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="font-bold font-montserrat text-primary-dark">
                              {review.menteeName}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-neutral-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-neutral-500 font-montserrat whitespace-nowrap">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm font-montserrat text-neutral-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Response Metrics */}
              <MetricComparison
                title="Response Metrics"
                metrics={[
                  {
                    label: 'Response Time',
                    value: analytics.responseTime,
                    icon: Clock,
                    color: 'bg-vibrant-accent'
                  },
                  {
                    label: 'Response Rate',
                    value: `${analytics.responseRate}%`,
                    icon: CheckCircle,
                    color: 'bg-green-600'
                  }
                ]}
              />

              {/* Connection Stats */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5 text-secondary-accent" />
                    Connection Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ProgressMetric
                    label="Acceptance Rate"
                    current={analytics.acceptedRequests}
                    total={analytics.connectionRequests}
                    color="secondary"
                  />
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600 font-montserrat">
                        Total Requests
                      </span>
                      <span className="text-lg font-black font-montserrat text-primary-dark">
                        {analytics.connectionRequests}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600 font-montserrat">
                        Accepted
                      </span>
                      <span className="text-lg font-black font-montserrat text-green-600">
                        {analytics.acceptedRequests}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Completion */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Session Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ProgressMetric
                    label="Completion Rate"
                    current={analytics.completedSessions}
                    total={analytics.totalSessions}
                    color="success"
                  />
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-black font-montserrat text-green-600">
                        {analytics.completedSessions}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        Completed
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-black font-montserrat text-blue-600">
                        {analytics.upcomingSessions}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        Upcoming
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card className="shadow-lg bg-primary-accent/10 border-2 border-primary-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary-accent" />
                    Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Total Mentoring Hours
                    </span>
                    <span className="text-lg font-black font-montserrat text-primary-dark">
                      234 hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Lives Impacted
                    </span>
                    <span className="text-lg font-black font-montserrat text-secondary-accent">
                      {analytics.totalMentees}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Platform Rank
                    </span>
                    <Badge className="bg-vibrant-accent text-white">Top 5%</Badge>
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
