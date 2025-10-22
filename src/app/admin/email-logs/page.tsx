'use client'

export const dynamic = 'force-dynamic'

import { Mail, CheckCircle, XCircle, Clock, Search } from 'lucide-react'
import { useState } from 'react'

export default function EmailLogsAdminPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const emailLogs = [
    {
      id: '1',
      recipient: 'sarah.j@example.com',
      subject: 'Session Reminder - Tomorrow at 2:00 PM',
      type: 'Session Reminder',
      status: 'delivered',
      sentAt: '2025-10-22T14:30:00',
      opened: true,
      clicked: true
    },
    {
      id: '2',
      recipient: 'mike.chen@example.com',
      subject: 'Welcome to Look 4 Mentors!',
      type: 'Welcome Email',
      status: 'delivered',
      sentAt: '2025-10-22T10:15:00',
      opened: true,
      clicked: false
    },
    {
      id: '3',
      recipient: 'emma.w@example.com',
      subject: 'New Message from Alex Thompson',
      type: 'New Message',
      status: 'delivered',
      sentAt: '2025-10-22T09:45:00',
      opened: false,
      clicked: false
    },
    {
      id: '4',
      recipient: 'invalid@email',
      subject: 'Password Reset Request',
      type: 'Password Reset',
      status: 'bounced',
      sentAt: '2025-10-22T08:20:00',
      opened: false,
      clicked: false
    },
    {
      id: '5',
      recipient: 'john.doe@example.com',
      subject: 'Your Weekly Summary',
      type: 'Weekly Summary',
      status: 'delivered',
      sentAt: '2025-10-22T09:00:00',
      opened: true,
      clicked: true
    },
  ]

  const stats = [
    { label: 'Sent Today', value: '234', color: 'bg-blue-500' },
    { label: 'Delivered', value: '229', color: 'bg-green-500' },
    { label: 'Opened', value: '156', color: 'bg-purple-500' },
    { label: 'Bounced', value: '5', color: 'bg-red-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'bounced':
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'bounced':
      case 'failed':
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

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Types</option>
            <option>Welcome Email</option>
            <option>Session Reminder</option>
            <option>Password Reset</option>
            <option>Weekly Summary</option>
            <option>New Message</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Status</option>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Bounced</option>
          </select>

          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent"
          />
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
                    <span className="text-sm text-gray-600">{log.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(log.sentAt).toLocaleString()}
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
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing 1-5 of 234 emails
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary-accent text-primary-dark rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Rate Chart */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-primary-dark mb-4">
          Email Delivery Rate (Last 7 Days)
        </h2>
        <div className="h-48 flex items-end justify-between gap-2">
          {[98, 97, 99, 96, 98, 99, 97].map((rate, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-green-500 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${rate}%` }}
              ></div>
              <p className="text-xs text-gray-500 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </p>
              <p className="text-sm font-semibold text-primary-dark">{rate}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
