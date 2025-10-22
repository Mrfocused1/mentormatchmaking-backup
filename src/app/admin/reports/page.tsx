'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Flag, User, AlertTriangle, CheckCircle, XCircle, MoreVertical } from 'lucide-react'

export default function ReportsAdminPage() {
  const [filterStatus, setFilterStatus] = useState('PENDING')

  // Mock data
  const reports = [
    {
      id: '1',
      reportedUser: 'Problem User',
      reportedBy: 'Jane Doe',
      reason: 'Inappropriate Behavior',
      details: 'User was rude and unprofessional during our session. Made several inappropriate comments...',
      status: 'PENDING',
      createdAt: '2025-10-22T15:30:00',
      severity: 'high'
    },
    {
      id: '2',
      reportedUser: 'Spam Account',
      reportedBy: 'John Smith',
      reason: 'Spam/Scam',
      details: 'This user is sending spam messages to multiple users asking for money...',
      status: 'UNDER_REVIEW',
      createdAt: '2025-10-22T11:20:00',
      severity: 'critical'
    },
    {
      id: '3',
      reportedUser: 'Fake Profile',
      reportedBy: 'Anonymous',
      reason: 'Fake Profile',
      details: 'Profile photo appears to be stolen from stock images. Bio is copied from another site...',
      status: 'PENDING',
      createdAt: '2025-10-21T18:45:00',
      severity: 'medium'
    },
    {
      id: '4',
      reportedUser: 'Minor Issue',
      reportedBy: 'Sarah Johnson',
      reason: 'No-Show',
      details: 'User did not show up for scheduled session and did not respond to messages...',
      status: 'RESOLVED',
      createdAt: '2025-10-20T14:10:00',
      severity: 'low',
      resolution: 'Warning issued to user. Monitoring for repeat behavior.'
    },
  ]

  const stats = [
    { label: 'Pending Reports', value: '3', color: 'bg-red-500' },
    { label: 'Under Review', value: '5', color: 'bg-yellow-500' },
    { label: 'Resolved Today', value: '8', color: 'bg-green-500' },
    { label: 'Total This Month', value: '42', color: 'bg-purple-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-red-100 text-red-800'
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED':
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
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="all">All Reports</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Severity Levels</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Reasons</option>
            <option>Inappropriate Behavior</option>
            <option>Spam/Scam</option>
            <option>Fake Profile</option>
            <option>Harassment</option>
            <option>No-Show</option>
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
                      {report.reason}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(report.severity)}`}>
                      {report.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500">Reported User</p>
                      <p className="font-semibold text-red-600">{report.reportedUser}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reported By</p>
                      <p className="font-semibold">{report.reportedBy}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
                    {report.details}
                  </p>

                  {report.resolution && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-3">
                      <p className="text-sm font-semibold text-green-800 mb-1">Resolution:</p>
                      <p className="text-sm text-green-700">{report.resolution}</p>
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
    </div>
  )
}
