'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Calendar, Clock, User, MapPin, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function SessionsAdminPage() {
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data
  const sessions = [
    {
      id: '1',
      mentor: 'Sarah Johnson',
      mentee: 'Mike Chen',
      type: 'Career Coaching',
      scheduledAt: '2025-10-23T14:00:00',
      duration: 60,
      status: 'SCHEDULED',
      location: 'Video Call'
    },
    {
      id: '2',
      mentor: 'Emma Wilson',
      mentee: 'Alex Thompson',
      type: 'Technical Mentoring',
      scheduledAt: '2025-10-24T10:30:00',
      duration: 45,
      status: 'SCHEDULED',
      location: 'Video Call'
    },
    {
      id: '3',
      mentor: 'David Lee',
      mentee: 'Rachel Green',
      type: 'Leadership Skills',
      scheduledAt: '2025-10-22T16:00:00',
      duration: 60,
      status: 'COMPLETED',
      location: 'Video Call'
    },
    {
      id: '4',
      mentor: 'Jennifer Smith',
      mentee: 'Tom Brown',
      type: 'Interview Prep',
      scheduledAt: '2025-10-23T11:00:00',
      duration: 30,
      status: 'CANCELLED',
      location: 'Video Call'
    },
  ]

  const stats = [
    { label: 'Total Sessions', value: '892', color: 'bg-purple-500' },
    { label: 'Upcoming', value: '45', color: 'bg-blue-500' },
    { label: 'Completed Today', value: '12', color: 'bg-green-500' },
    { label: 'Cancelled', value: '8', color: 'bg-red-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return <Clock className="w-4 h-4" />
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />
      case 'CANCELLED':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Session Management
        </h1>
        <p className="text-gray-600">
          Monitor and manage all mentorship sessions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-primary-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <option value="all">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Session Types</option>
            <option>Career Coaching</option>
            <option>Technical Mentoring</option>
            <option>Leadership Skills</option>
            <option>Interview Prep</option>
          </select>

          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                    {getStatusIcon(session.status)}
                    {session.status}
                  </span>
                  <span className="text-sm font-semibold text-purple-600">
                    {session.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Mentor</p>
                      <p className="text-sm font-semibold">{session.mentor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Mentee</p>
                      <p className="text-sm font-semibold">{session.mentee}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-semibold">{session.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(session.scheduledAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {' '}
                    ({session.duration} min)
                  </div>
                </div>
              </div>

              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
