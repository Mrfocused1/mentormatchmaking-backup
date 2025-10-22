'use client'

export const dynamic = 'force-dynamic'

import { TrendingUp, Users, Calendar, MessageSquare, Target, Award } from 'lucide-react'

export default function AnalyticsAdminPage() {
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
            label: 'Total Revenue',
            value: '$45,239',
            change: '+12.5%',
            trend: 'up',
            icon: Target,
            color: 'bg-green-500'
          },
          {
            label: 'Active Users (30d)',
            value: '892',
            change: '+8.3%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            label: 'Session Completion Rate',
            value: '94.2%',
            change: '+2.1%',
            trend: 'up',
            icon: Award,
            color: 'bg-purple-500'
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
            {[65, 75, 85, 92, 108, 124].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-accent rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${(value / 124) * 100}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-2">
                  {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}
                </p>
                <p className="text-sm font-semibold text-primary-dark">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Session Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Session Type Distribution
          </h2>
          <div className="space-y-4">
            {[
              { type: 'Career Coaching', count: 324, percentage: 36, color: 'bg-blue-500' },
              { type: 'Technical Mentoring', count: 285, percentage: 32, color: 'bg-purple-500' },
              { type: 'Leadership Skills', count: 198, percentage: 22, color: 'bg-green-500' },
              { type: 'Interview Prep', count: 85, percentage: 10, color: 'bg-orange-500' },
            ].map((session) => (
              <div key={session.type}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{session.type}</span>
                  <span className="text-sm text-gray-600">{session.count} sessions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${session.color} h-3 rounded-full transition-all`}
                    style={{ width: `${session.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Avg. Sessions/User', value: '4.2', icon: Calendar },
          { label: 'Messages Sent/Day', value: '1,245', icon: MessageSquare },
          { label: 'Mentor Match Rate', value: '87%', icon: Users },
          { label: 'User Satisfaction', value: '4.7/5', icon: Award },
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

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Mentors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Top Mentors (This Month)
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', sessions: 28, rating: 4.9, specialty: 'Career Coaching' },
              { name: 'Emma Wilson', sessions: 25, rating: 4.8, specialty: 'Leadership' },
              { name: 'David Lee', sessions: 22, rating: 4.9, specialty: 'Tech Mentoring' },
              { name: 'Jennifer Smith', sessions: 20, rating: 4.7, specialty: 'Interview Prep' },
            ].map((mentor, index) => (
              <div key={mentor.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary-accent flex items-center justify-center text-primary-dark font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary-dark">{mentor.name}</p>
                  <p className="text-xs text-gray-600">{mentor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{mentor.sessions} sessions</p>
                  <p className="text-xs text-gray-600">⭐ {mentor.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Times */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Peak Session Times
          </h2>
          <div className="space-y-3">
            {[
              { day: 'Monday', time: '6:00 PM - 8:00 PM', sessions: 45 },
              { day: 'Tuesday', time: '7:00 PM - 9:00 PM', sessions: 42 },
              { day: 'Wednesday', time: '6:00 PM - 8:00 PM', sessions: 48 },
              { day: 'Thursday', time: '7:00 PM - 9:00 PM', sessions: 51 },
              { day: 'Friday', time: '5:00 PM - 7:00 PM', sessions: 38 },
            ].map((slot) => (
              <div key={slot.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-primary-dark">{slot.day}</p>
                  <p className="text-sm text-gray-600">{slot.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-dark">{slot.sessions}</p>
                  <p className="text-xs text-gray-600">sessions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
