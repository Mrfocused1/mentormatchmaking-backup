'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, MapPin, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Session {
  id: string
  title?: string
  scheduledAt: string
  duration: number
  status: string
  notes?: string
  mentor: {
    id: string
    name: string
    email: string
    Profile?: {
      profilePicture?: string
    }
  }
  mentee: {
    id: string
    name: string
    email: string
    Profile?: {
      profilePicture?: string
    }
  }
}

export default function SessionsAdminPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '20',
          status: filterStatus
        })

        const response = await fetch(`/api/admin/sessions?${params}`)
        if (response.ok) {
          const data = await response.json()
          setSessions(data.sessions)
          setTotal(data.total)
        } else {
          console.error('Failed to fetch sessions')
        }
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [filterStatus, page])

  if (loading && sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  const stats = [
    { label: 'Total Sessions', value: total.toLocaleString(), color: 'bg-purple-500' },
    { label: 'Scheduled', value: sessions.filter(s => s.status === 'SCHEDULED').length.toString(), color: 'bg-blue-500' },
    { label: 'Completed', value: sessions.filter(s => s.status === 'COMPLETED').length.toString(), color: 'bg-green-500' },
    { label: 'Cancelled', value: sessions.filter(s => s.status === 'CANCELLED').length.toString(), color: 'bg-red-500' },
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
            <option value="all">All Sessions</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-primary-dark">
                      {session.title || 'Mentorship Session'}
                    </h3>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                      {getStatusIcon(session.status)}
                      {session.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mentor</p>
                      <div className="flex items-center gap-2">
                        {session.mentor.Profile?.profilePicture ? (
                          <img
                            src={session.mentor.Profile.profilePicture}
                            alt={session.mentor.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary-accent flex items-center justify-center text-xs text-primary-dark font-bold">
                            {session.mentor.name.charAt(0)}
                          </div>
                        )}
                        <p className="font-semibold text-gray-700">{session.mentor.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mentee</p>
                      <div className="flex items-center gap-2">
                        {session.mentee.Profile?.profilePicture ? (
                          <img
                            src={session.mentee.Profile.profilePicture}
                            alt={session.mentee.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary-accent flex items-center justify-center text-xs text-primary-dark font-bold">
                            {session.mentee.name.charAt(0)}
                          </div>
                        )}
                        <p className="font-semibold text-gray-700">{session.mentee.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(session.scheduledAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {session.duration} minutes
                    </div>
                  </div>

                  {session.notes && (
                    <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {session.notes}
                    </p>
                  )}
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {((page - 1) * 20) + 1}-{Math.min(page * 20, total)} of {total.toLocaleString()} sessions
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page * 20 >= total}
              className="px-4 py-2 bg-primary-accent text-primary-dark rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
