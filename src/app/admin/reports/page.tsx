'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Flag, AlertTriangle, CheckCircle, XCircle, MoreVertical } from 'lucide-react'

interface Report {
  id: string
  reason: string
  description?: string
  status: string
  resolvedNote?: string
  createdAt: string
  severity: string
  reporter: {
    id: string
    name: string
    email: string
  }
  reported: {
    id: string
    name: string
    email: string
  }
}

export default function ReportsAdminPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('PENDING')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchReports() {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '20',
          status: filterStatus
        })

        // Add timeout to prevent infinite loading
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch(`/api/admin/reports?${params}`, {
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          setReports(data.reports)
          setTotal(data.total)
        } else {
          console.error('Failed to fetch reports')
          // Set empty reports array on error
          setReports([])
          setTotal(0)
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
        // Set empty reports array on timeout/error
        setReports([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [filterStatus, page])

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  const stats = [
    { label: 'Pending Reports', value: reports.filter(r => r.status === 'PENDING').length.toString(), color: 'bg-red-500' },
    { label: 'Under Review', value: reports.filter(r => r.status === 'REVIEWING').length.toString(), color: 'bg-yellow-500' },
    { label: 'Resolved', value: reports.filter(r => r.status === 'RESOLVED').length.toString(), color: 'bg-green-500' },
    { label: 'Total', value: total.toLocaleString(), color: 'bg-purple-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-red-100 text-red-800'
      case 'REVIEWING':
        return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED':
      case 'DISMISSED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white'
      case 'high':
        return 'bg-orange-600 text-white'
      case 'medium':
        return 'bg-yellow-600 text-white'
      case 'low':
        return 'bg-gray-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Reports & Moderation
        </h1>
        <p className="text-gray-600">
          Review and manage user reports to maintain platform safety
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
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Under Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="all">All Reports</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-sm border-2 border-red-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-primary-dark">
                      {report.reason.replace(/_/g, ' ')}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(report.severity)}`}>
                      {report.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500">Reported User</p>
                      <p className="font-semibold text-red-600">{report.reported.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reported By</p>
                      <p className="font-semibold">{report.reporter.name}</p>
                    </div>
                  </div>

                  {report.description && (
                    <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
                      {report.description}
                    </p>
                  )}

                  {report.resolvedNote && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
                      <p className="text-sm font-semibold text-green-800 mb-1">Resolution:</p>
                      <p className="text-sm text-green-700">{report.resolvedNote}</p>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Reported {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Suspend User
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Issue Warning
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Resolve
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                View User Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {((page - 1) * 20) + 1}-{Math.min(page * 20, total)} of {total.toLocaleString()} reports
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
