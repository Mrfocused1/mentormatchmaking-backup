'use client'

export const dynamic = 'force-dynamic'

import { Mail, CheckCircle, XCircle, Clock, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface EmailLog {
  id: string
  recipient: string
  subject: string
  type: string
  status: string
  opened: boolean
  clicked: boolean
  createdAt: string
}

export default function EmailLogsAdminPage() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchEmailLogs() {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '20',
          search: searchTerm,
          type: filterType,
          status: filterStatus
        })

        const response = await fetch(`/api/admin/email-logs?${params}`)
        if (response.ok) {
          const data = await response.json()
          setEmailLogs(data.emailLogs)
          setTotal(data.total)
        } else {
          console.error('Failed to fetch email logs')
        }
      } catch (error) {
        console.error('Error fetching email logs:', error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchEmailLogs()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, filterType, filterStatus, page])

  if (loading && emailLogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  const stats = [
    { label: 'Sent Today', value: emailLogs.length.toString(), color: 'bg-blue-500' },
    { label: 'Delivered', value: emailLogs.filter(e => e.status === 'DELIVERED').length.toString(), color: 'bg-green-500' },
    { label: 'Opened', value: emailLogs.filter(e => e.opened).length.toString(), color: 'bg-purple-500' },
    { label: 'Bounced', value: emailLogs.filter(e => e.status === 'BOUNCED').length.toString(), color: 'bg-red-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
      case 'SENT':
        return 'bg-yellow-100 text-yellow-800'
      case 'BOUNCED':
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4" />
      case 'PENDING':
      case 'SENT':
        return <Clock className="w-4 h-4" />
      case 'BOUNCED':
      case 'FAILED':
        return <XCircle className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Email Logs
        </h1>
        <p className="text-gray-600">
          Monitor all email activity and delivery status
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by recipient email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <option value="all">All Types</option>
            <option value="WELCOME_MENTOR">Welcome Mentor</option>
            <option value="WELCOME_MENTEE">Welcome Mentee</option>
            <option value="SESSION_REMINDER">Session Reminder</option>
            <option value="PASSWORD_RESET">Password Reset</option>
            <option value="NEW_MESSAGE">New Message</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <option value="all">All Status</option>
            <option value="DELIVERED">Delivered</option>
            <option value="PENDING">Pending</option>
            <option value="BOUNCED">Bounced</option>
          </select>
        </div>
      </div>

      {/* Email Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sent At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {emailLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {log.recipient}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 max-w-md truncate">
                      {log.subject}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{log.type.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 text-xs">
                      <span className={log.opened ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                        {log.opened ? '✓ Opened' : 'Not opened'}
                      </span>
                      {log.opened && (
                        <span className={log.clicked ? 'text-blue-600 font-semibold' : 'text-gray-400'}>
                          {log.clicked ? '✓ Clicked' : 'No clicks'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 20 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {((page - 1) * 20) + 1}-{Math.min(page * 20, total)} of {total.toLocaleString()} emails
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
    </div>
  )
}
