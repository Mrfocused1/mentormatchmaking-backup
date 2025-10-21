'use client'

export const dynamic = 'force-dynamic'

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
  Download
} from 'lucide-react'

export default function MentorAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  // Mock analytics data - would come from API
  const analytics = {
    totalSessions: 156,
    completedSessions: 142,
    upcomingSessions: 8,
    cancelledSessions: 6,
    averageRating: 4.8,
    totalReviews: 89,
    totalMentees: 34,
    activeMentees: 12,
    profileViews: 2847,
    connectionRequests: 45,
    acceptedRequests: 34,
    responseTime: '< 2 hours',
    responseRate: 95
  }

  // Session activity over time
  const sessionActivity = [
    { label: 'Week 1', value: 8, color: 'bg-primary-accent' },
    { label: 'Week 2', value: 12, color: 'bg-primary-accent' },
    { label: 'Week 3', value: 10, color: 'bg-primary-accent' },
    { label: 'Week 4', value: 15, color: 'bg-primary-accent' }
  ]

  // Session types breakdown
  const sessionTypes = [
    { label: 'Career', value: 45, color: 'bg-secondary-accent' },
    { label: 'Technical', value: 38, color: 'bg-vibrant-accent' },
    { label: 'Product', value: 32, color: 'bg-yellow-500' },
    { label: 'Interview', value: 27, color: 'bg-green-600' }
  ]

  // Recent reviews
  const recentReviews = [
    {
      id: 1,
      menteeName: 'Alex Thompson',
      rating: 5,
      comment: 'Incredibly helpful session! Sarah provided clear guidance on my career transition.',
      date: '2 days ago'
    },
    {
      id: 2,
      menteeName: 'Emily Rodriguez',
      rating: 5,
      comment: 'Best mentor on the platform. Always prepared and insightful.',
      date: '5 days ago'
    },
    {
      id: 3,
      menteeName: 'Michael Chen',
      rating: 4,
      comment: 'Great advice on product strategy. Looking forward to our next session.',
      date: '1 week ago'
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
