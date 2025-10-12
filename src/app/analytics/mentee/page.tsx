'use client'

import { useState } from 'react'
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
  Sparkles
} from 'lucide-react'

export default function MenteeAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  // Mock analytics data - would come from API
  const analytics = {
    totalSessions: 32,
    completedSessions: 28,
    upcomingSessions: 3,
    cancelledSessions: 1,
    totalMentors: 5,
    activeMentors: 2,
    totalHours: 48,
    goalsSet: 12,
    goalsCompleted: 8,
    reviewsGiven: 22,
    profileCompleteness: 85
  }

  // Session activity over time
  const sessionActivity = [
    { label: 'Week 1', value: 5, color: 'bg-secondary-accent' },
    { label: 'Week 2', value: 8, color: 'bg-secondary-accent' },
    { label: 'Week 3', value: 7, color: 'bg-secondary-accent' },
    { label: 'Week 4', value: 8, color: 'bg-secondary-accent' }
  ]

  // Learning topics
  const learningTopics = [
    { label: 'Career', value: 12, color: 'bg-primary-accent' },
    { label: 'Technical', value: 9, color: 'bg-vibrant-accent' },
    { label: 'Product', value: 7, color: 'bg-yellow-500' },
    { label: 'Interview', value: 4, color: 'bg-green-600' }
  ]

  // Active goals
  const activeGoals = [
    {
      id: 1,
      title: 'Land a Senior PM role',
      progress: 75,
      deadline: 'Dec 2025',
      mentor: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Build portfolio website',
      progress: 60,
      deadline: 'Nov 2025',
      mentor: 'Alex Thompson'
    },
    {
      id: 3,
      title: 'Complete system design course',
      progress: 40,
      deadline: 'Jan 2026',
      mentor: 'Emily Rodriguez'
    }
  ]

  // Recent sessions
  const recentSessions = [
    {
      id: 1,
      mentor: 'Sarah Johnson',
      topic: 'Career Strategy',
      date: '2 days ago',
      rating: 5
    },
    {
      id: 2,
      mentor: 'Alex Thompson',
      topic: 'Portfolio Review',
      date: '5 days ago',
      rating: 5
    },
    {
      id: 3,
      mentor: 'Emily Rodriguez',
      topic: 'Technical Interview Prep',
      date: '1 week ago',
      rating: 4
    }
  ]

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
                                i < session.rating
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
