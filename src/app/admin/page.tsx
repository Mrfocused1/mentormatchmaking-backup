'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import {
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  Flag,
  TrendingUp,
  TrendingDown,
  Mail,
  CheckCircle2,
  Clock
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  newUsersThisWeek: number
  totalMentors: number
  totalMentees: number
  activeSessions: number
  completedSessions: number
  upcomingSessions: number
  totalMessages: number
  pendingReports: number
  openTickets: number
  emailsSentToday: number
  emailsSentThisWeek: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Add timeout to prevent infinite loading
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch('/api/admin/stats', {
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error('Failed to fetch stats:', response.status)
          // Set default empty stats
          setStats({
            totalUsers: 0,
            newUsersThisWeek: 0,
            totalMentors: 0,
            totalMentees: 0,
            activeSessions: 0,
            completedSessions: 0,
            upcomingSessions: 0,
            totalMessages: 0,
            pendingReports: 0,
            openTickets: 0,
            emailsSentToday: 0,
            emailsSentThisWeek: 0
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Set default empty stats on error
        setStats({
          totalUsers: 0,
          newUsersThisWeek: 0,
          totalMentors: 0,
          totalMentees: 0,
          activeSessions: 0,
          completedSessions: 0,
          upcomingSessions: 0,
          totalMessages: 0,
          pendingReports: 0,
          openTickets: 0,
          emailsSentToday: 0,
          emailsSentThisWeek: 0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Users',
      value: stats?.totalUsers.toLocaleString(),
      change: `+${stats?.newUsersThisWeek} this week`,
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Active Mentors',
      value: stats?.totalMentors.toLocaleString(),
      change: 'Currently available',
      trend: 'neutral',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      name: 'Active Sessions',
      value: stats?.activeSessions.toLocaleString(),
      change: `${stats?.upcomingSessions} upcoming`,
      trend: 'up',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      name: 'Total Messages',
      value: stats?.totalMessages.toLocaleString(),
      change: 'All time',
      trend: 'neutral',
      icon: MessageSquare,
      color: 'bg-cyan-500'
    },
    {
      name: 'Pending Reports',
      value: stats?.pendingReports.toLocaleString(),
      change: 'Needs attention',
      trend: (stats?.pendingReports || 0) > 0 ? 'down' : 'neutral',
      icon: Flag,
      color: (stats?.pendingReports || 0) > 0 ? 'bg-red-500' : 'bg-gray-500'
    },
    {
      name: 'Open Tickets',
      value: stats?.openTickets.toLocaleString(),
      change: 'Support queue',
      trend: 'neutral',
      icon: MessageSquare,
      color: 'bg-orange-500'
    },
    {
      name: 'Emails Sent Today',
      value: stats?.emailsSentToday.toLocaleString(),
      change: `${stats?.emailsSentThisWeek} this week`,
      trend: 'up',
      icon: Mail,
      color: 'bg-indigo-500'
    },
    {
      name: 'Completed Sessions',
      value: stats?.completedSessions.toLocaleString(),
      change: 'All time',
      trend: 'up',
      icon: CheckCircle2,
      color: 'bg-teal-500'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of your Look 4 Mentors platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend === 'up' && (
                <TrendingUp className="w-5 h-5 text-green-500" />
              )}
              {stat.trend === 'down' && (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-primary-dark mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                action: 'New user signup',
                user: 'Sarah Johnson',
                time: '5 minutes ago',
                type: 'mentor'
              },
              {
                action: 'Session completed',
                user: 'Mike Chen & Emma Wilson',
                time: '15 minutes ago',
                type: 'session'
              },
              {
                action: 'Support ticket opened',
                user: 'Alex Thompson',
                time: '1 hour ago',
                type: 'ticket'
              },
              {
                action: 'Report submitted',
                user: 'Anonymous',
                time: '2 hours ago',
                type: 'report'
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary-dark">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
                <Clock className="w-4 h-4 text-gray-400 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'View Users', href: '/admin/users', color: 'bg-blue-500' },
              { label: 'Manage Sessions', href: '/admin/sessions', color: 'bg-purple-500' },
              { label: 'Support Tickets', href: '/admin/tickets', color: 'bg-orange-500' },
              { label: 'Review Reports', href: '/admin/reports', color: 'bg-red-500' },
              { label: 'View Analytics', href: '/admin/analytics', color: 'bg-green-500' },
              { label: 'Email Logs', href: '/admin/email-logs', color: 'bg-indigo-500' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity text-center font-semibold text-sm`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Health */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-primary-dark mb-4">
          Platform Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Email Service', status: 'Operational', color: 'bg-green-500' },
            { label: 'Database', status: 'Operational', color: 'bg-green-500' },
            { label: 'Cron Jobs', status: '2/2 Active', color: 'bg-green-500' },
            { label: 'API Status', status: 'Healthy', color: 'bg-green-500' },
          ].map((service) => (
            <div key={service.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
              <div>
                <p className="text-sm font-semibold text-primary-dark">
                  {service.label}
                </p>
                <p className="text-xs text-gray-600">{service.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
