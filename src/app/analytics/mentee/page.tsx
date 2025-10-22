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
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle,
  BarChart3,
  Download,
  Star,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react'

interface AnalyticsData {
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  cancelledSessions: number
  totalMentors: number
  activeMentors: number
  totalHours: number
  goalsSet: number
  goalsCompleted: number
  reviewsGiven: number
  profileCompleteness: number
}

interface GoalData {
  id: string
  title: string
  progress: number
  deadline: string
  mentor: string
}

interface SessionData {
  id: string
  mentor: string
  topic: string
  date: string
  rating: number | null
}

export default function MenteeAnalyticsPage() {
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
    totalMentors: 0,
    activeMentors: 0,
    totalHours: 0,
    goalsSet: 0,
    goalsCompleted: 0,
    reviewsGiven: 0,
    profileCompleteness: 0
  })

  const [sessionActivity, setSessionActivity] = useState<Array<{ label: string; value: number; color: string }>>([])
  const [learningTopics, setLearningTopics] = useState<Array<{ label: string; value: number; color: string }>>([])
  const [activeGoals, setActiveGoals] = useState<GoalData[]>([])
  const [recentSessions, setRecentSessions] = useState<SessionData[]>([])

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

        // Fetch all sessions (as mentee)
        const { data: sessionsData } = await supabase
          .from('Session')
          .select(`
            id, status, scheduledAt, duration, mentorId,
            User_Session_mentorIdToUser:mentorId (name)
          `)
          .eq('menteeId', user.id)
          .gte('scheduledAt', startDate.toISOString())

        const sessions = sessionsData || []
        const totalSessions = sessions.length
        const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length
        const upcomingSessions = sessions.filter(s => s.status === 'SCHEDULED').length
        const cancelledSessions = sessions.filter(s => s.status === 'CANCELLED').length

        // Calculate total hours
        const totalMinutes = sessions
          .filter(s => s.status === 'COMPLETED')
          .reduce((sum, s) => sum + (s.duration || 0), 0)
        const totalHours = Math.round(totalMinutes / 60)

        // Calculate unique mentors
        const uniqueMentorIds = new Set(sessions.map(s => s.mentorId))
        const totalMentors = uniqueMentorIds.size

        // Fetch goals
        const { data: goalsData } = await supabase
          .from('Goal')
          .select('id, title, progress, deadline, status')
          .eq('userId', user.id)

        const goals = goalsData || []
        const goalsSet = goals.length
        const goalsCompleted = goals.filter(g => g.status === 'COMPLETED').length

        // Fetch reviews given by this user
        const { data: reviewsData } = await supabase
          .from('Review')
          .select('id')
          .eq('reviewerId', user.id)

        const reviewsGiven = reviewsData?.length || 0

        // Get profile completeness
        const { data: profileData } = await supabase
          .from('Profile')
          .select('*')
          .eq('userId', user.id)
          .single()

        const profileCompleteness = profileData?.completionPercentage || 0

        setAnalytics({
          totalSessions,
          completedSessions,
          upcomingSessions,
          cancelledSessions,
          totalMentors,
          activeMentors: uniqueMentorIds.size, // for now, same as total
          totalHours,
          goalsSet,
          goalsCompleted,
          reviewsGiven,
          profileCompleteness
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
          { label: 'Week 1', value: weeklyActivity[0] || 0, color: 'bg-secondary-accent' },
          { label: 'Week 2', value: weeklyActivity[1] || 0, color: 'bg-secondary-accent' },
          { label: 'Week 3', value: weeklyActivity[2] || 0, color: 'bg-secondary-accent' },
          { label: 'Week 4', value: weeklyActivity[3] || 0, color: 'bg-secondary-accent' }
        ])

        // Active goals (top 3)
        const transformedGoals: GoalData[] = goals
          .filter(g => g.status === 'ACTIVE')
          .slice(0, 3)
          .map(g => ({
            id: g.id,
            title: g.title,
            progress: g.progress,
            deadline: new Date(g.deadline).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            mentor: 'General' // We don't have mentor-goal relationship in schema
          }))

        setActiveGoals(transformedGoals)

        // Recent sessions (top 3)
        const transformedSessions: SessionData[] = sessions
          .slice(0, 3)
          .map(s => {
            const mentor = Array.isArray(s.User_Session_mentorIdToUser)
              ? s.User_Session_mentorIdToUser[0]
              : s.User_Session_mentorIdToUser

            const sessionDate = new Date(s.scheduledAt)
            const daysDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (24 * 60 * 60 * 1000))
            let dateStr = ''
            if (daysDiff === 0) dateStr = 'Today'
            else if (daysDiff === 1) dateStr = '1 day ago'
            else if (daysDiff < 7) dateStr = `${daysDiff} days ago`
            else if (daysDiff < 14) dateStr = '1 week ago'
            else dateStr = `${Math.floor(daysDiff / 7)} weeks ago`

            return {
              id: s.id,
              mentor: mentor?.name || 'Unknown Mentor',
              topic: 'General Session', // We don't have topic in schema
              date: dateStr,
              rating: null // Would need to fetch from Review table
            }
          })

        setRecentSessions(transformedSessions)

        // Learning topics - placeholder since we don't track this
        setLearningTopics([
          { label: 'General', value: totalSessions, color: 'bg-primary-accent' }
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
              href="/dashboard/mentee"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Learning Analytics
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Track your mentorship journey and growth
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
              title="Sessions Attended"
              value={analytics.completedSessions}
              subtitle={`${analytics.upcomingSessions} upcoming`}
              icon={Calendar}
              iconColor="text-secondary-accent"
              iconBgColor="bg-secondary-accent/10"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Mentors"
              value={analytics.activeMentors}
              subtitle={`${analytics.totalMentors} total connections`}
              icon={Users}
              iconColor="text-primary-accent"
              iconBgColor="bg-primary-accent/10"
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Mentorship Hours"
              value={analytics.totalHours}
              subtitle="Total learning time"
              icon={Clock}
              iconColor="text-vibrant-accent"
              iconBgColor="bg-vibrant-accent/10"
              trend={{ value: 18, isPositive: true }}
            />
            <StatCard
              title="Goals Completed"
              value={`${analytics.goalsCompleted}/${analytics.goalsSet}`}
              subtitle={`${Math.round((analytics.goalsCompleted / analytics.goalsSet) * 100)}% completion rate`}
              icon={Target}
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
              trend={{ value: 25, isPositive: true }}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts & Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Session Activity */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-secondary-accent" />
                    Session Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SimpleBarChart data={sessionActivity} height={220} />
                </CardContent>
              </Card>

              {/* Learning Topics */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary-accent" />
                    Learning Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SimpleBarChart data={learningTopics} height={220} />
                </CardContent>
              </Card>

              {/* Active Goals */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Active Goals
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/goals">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {activeGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold font-montserrat text-primary-dark">
                            {goal.title}
                          </h4>
                          <p className="text-sm text-neutral-600 font-montserrat mt-1">
                            with {goal.mentor}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          {goal.deadline}
                        </Badge>
                      </div>
                      <ProgressMetric
                        label="Progress"
                        current={goal.progress}
                        total={100}
                        color="success"
                        showPercentage={false}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Sessions */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-vibrant-accent" />
                      Recent Sessions
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/sessions">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-neutral-100">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="p-6 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <p className="font-bold font-montserrat text-primary-dark">
                              {session.topic}
                            </p>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              with {session.mentor}
                            </p>
                          </div>
                          <span className="text-xs text-neutral-500 font-montserrat whitespace-nowrap">
                            {session.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (session.rating ?? 0)
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats & Progress */}
            <div className="space-y-6">
              {/* Learning Stats */}
              <MetricComparison
                title="Learning Stats"
                metrics={[
                  {
                    label: 'Avg Session Duration',
                    value: '90 min',
                    icon: Clock,
                    color: 'bg-vibrant-accent'
                  },
                  {
                    label: 'Reviews Given',
                    value: analytics.reviewsGiven,
                    icon: Star,
                    color: 'bg-yellow-600'
                  }
                ]}
              />

              {/* Profile Completeness */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary-accent" />
                    Profile Strength
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ProgressMetric
                    label="Profile Completeness"
                    current={analytics.profileCompleteness}
                    total={100}
                    color="primary"
                  />
                  <p className="text-sm font-montserrat text-neutral-600 pt-4 border-t border-neutral-200">
                    Complete profiles get 3x more mentor matches!
                  </p>
                  <Button variant="outline" size="sm" fullWidth asChild>
                    <Link href="/profile/edit">
                      Complete Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Goal Progress */}
              <Card className="shadow-lg">
                <CardHeader className="border-b border-neutral-200">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Goal Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <ProgressMetric
                    label="Overall Goals"
                    current={analytics.goalsCompleted}
                    total={analytics.goalsSet}
                    color="success"
                  />
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-black font-montserrat text-green-600">
                        {analytics.goalsCompleted}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        Completed
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-black font-montserrat text-blue-600">
                        {analytics.goalsSet - analytics.goalsCompleted}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        In Progress
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Summary */}
              <Card className="shadow-lg bg-secondary-accent/10 border-2 border-secondary-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-secondary-accent" />
                    Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Total Learning Hours
                    </span>
                    <span className="text-lg font-black font-montserrat text-primary-dark">
                      {analytics.totalHours} hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Mentors Connected
                    </span>
                    <span className="text-lg font-black font-montserrat text-secondary-accent">
                      {analytics.totalMentors}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-montserrat text-neutral-700">
                      Growth Score
                    </span>
                    <Badge className="bg-vibrant-accent text-white">Excellent</Badge>
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
