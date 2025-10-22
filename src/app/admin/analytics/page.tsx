'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Calendar, MessageSquare, Target, Award } from 'lucide-react'

interface Analytics {
  activeUsers: number
  completedSessions: number
  sessionCompletionRate: number
  totalMessages: number
  avgRating: number
  userGrowth: Array<{ month: string, count: number }>
  topMentors: Array<{ rank: number, name: string, sessions: number, rating: number }>
}

export default function AnalyticsAdminPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/admin/analytics')
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        } else {
          console.error('Failed to fetch analytics')
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  if (!analytics) {
    return <div className="p-8 text-center text-gray-600">Failed to load analytics</div>
  }

  const maxGrowth = Math.max(...analytics.userGrowth.map(m => m.count), 1)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Platform Analytics
        </h1>
        <p className="text-gray-600">
          Insights and metrics about your platform's performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: 'Active Users (30d)',
            value: analytics.activeUsers.toString(),
            change: '+8.3%',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            label: 'Session Completion Rate',
            value: `${analytics.sessionCompletionRate}%`,
            change: '+2.1%',
            icon: Award,
            color: 'bg-purple-500'
          },
          {
            label: 'Average Rating',
            value: analytics.avgRating.toFixed(1),
            change: 'Platform wide',
            icon: Target,
            color: 'bg-green-500'
          },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                {metric.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-primary-dark">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            User Growth (Last 6 Months)
          </h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {analytics.userGrowth.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-accent rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(data.count / maxGrowth) * 100}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                <p className="text-sm font-semibold text-primary-dark">{data.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Mentors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Top Mentors (This Month)
          </h2>
          <div className="space-y-3">
            {analytics.topMentors.slice(0, 5).map((mentor) => (
              <div key={mentor.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary-accent flex items-center justify-center text-primary-dark font-bold">
                  {mentor.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary-dark">{mentor.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{mentor.sessions} sessions</p>
                  <p className="text-xs text-gray-600">⭐ {mentor.rating.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Messages', value: analytics.totalMessages.toLocaleString(), icon: MessageSquare },
          { label: 'Completed Sessions', value: analytics.completedSessions.toLocaleString(), icon: Calendar },
          { label: 'Avg. Rating', value: `${analytics.avgRating.toFixed(1)}/5`, icon: Award },
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <metric.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-xl font-bold text-primary-dark">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
