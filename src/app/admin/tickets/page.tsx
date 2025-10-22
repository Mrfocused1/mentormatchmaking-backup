'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { MessageSquare, Clock, User, Mail, MoreVertical } from 'lucide-react'

export default function TicketsAdminPage() {
  const [filterStatus, setFilterStatus] = useState('OPEN')

  // Mock data
  const tickets = [
    {
      id: '1',
      subject: 'Cannot reset password',
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'I am trying to reset my password but not receiving the email...',
      status: 'OPEN',
      createdAt: '2025-10-22T14:30:00',
      priority: 'high'
    },
    {
      id: '2',
      subject: 'Session booking issue',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      message: 'When I try to book a session with a mentor, I get an error message...',
      status: 'IN_PROGRESS',
      createdAt: '2025-10-22T10:15:00',
      priority: 'medium'
    },
    {
      id: '3',
      subject: 'Profile photo upload problem',
      name: 'Bob Johnson',
      email: 'bob.j@example.com',
      message: 'My profile photo keeps failing to upload. File size is under 5MB...',
      status: 'OPEN',
      createdAt: '2025-10-21T16:45:00',
      priority: 'low'
    },
    {
      id: '4',
      subject: 'Billing question',
      name: 'Alice Williams',
      email: 'alice.w@example.com',
      message: 'I was charged twice for my subscription this month...',
      status: 'RESOLVED',
      createdAt: '2025-10-20T09:20:00',
      priority: 'high'
    },
  ]

  const stats = [
    { label: 'Open Tickets', value: '7', color: 'bg-red-500' },
    { label: 'In Progress', value: '5', color: 'bg-yellow-500' },
    { label: 'Resolved Today', value: '12', color: 'bg-green-500' },
    { label: 'Avg Response Time', value: '2.3h', color: 'bg-blue-500' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-100 text-red-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-dark mb-2">
          Support Tickets
        </h1>
        <p className="text-gray-600">
          Manage customer support inquiries
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
            <option value="OPEN">Open Tickets</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="all">All Tickets</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>All Priorities</option>
            <option>High Priority</option>
            <option>Medium Priority</option>
            <option>Low Priority</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-primary-dark">
                      {ticket.subject}
                    </h3>
                    <span className={`text-xs font-semibold uppercase ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {ticket.message}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {ticket.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {ticket.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(ticket.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary-accent text-primary-dark rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Reply
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Resolve
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
