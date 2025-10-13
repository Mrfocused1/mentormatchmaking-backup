'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  UserCheck,
  UserX,
  MessageSquare,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  Clock,
  Star,
  Activity,
  Calendar,
  BarChart3,
  Search,
  Filter,
  Download,
  AlertCircle,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Bell,
  Settings,
  Home
} from 'lucide-react'

// Mock data for pending approvals
const mockPendingApprovals = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+44 7700 900123',
    role: 'mentor',
    appliedDate: '2025-10-13',
    jobTitle: 'Senior Product Manager',
    company: 'Amazon',
    yearsExperience: '10-15',
    expertise: ['Product Strategy', 'Leadership', 'User Research'],
    hasConnectedSocial: false,
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: null,
      instagram: null,
    },
    preferredNotification: 'email',
    avatar: null,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+44 7700 900456',
    role: 'mentor',
    appliedDate: '2025-10-13',
    jobTitle: 'Tech Lead',
    company: 'Google',
    yearsExperience: '10-15',
    expertise: ['React', 'Node.js', 'System Design', 'Team Management'],
    hasConnectedSocial: true,
    socialMedia: {
      linkedin: 'https://linkedin.com/in/mariagarcia',
      twitter: 'https://twitter.com/mariagarcia',
      instagram: 'https://instagram.com/mariagarcia',
    },
    preferredNotification: 'sms',
    avatar: null,
  },
  {
    id: 3,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: null,
    role: 'mentee',
    appliedDate: '2025-10-12',
    jobTitle: 'Junior Developer',
    company: 'Startup Inc',
    yearsExperience: '0-3',
    expertise: ['JavaScript', 'Career Development'],
    hasConnectedSocial: false,
    socialMedia: {
      linkedin: null,
      twitter: null,
      instagram: null,
    },
    preferredNotification: 'email',
    avatar: null,
  },
]

// Mock data for all users
const mockAllUsers = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    role: 'mentor',
    status: 'active',
    verified: true,
    joinedDate: '2025-09-15',
    lastActive: '2 hours ago',
    totalSessions: 24,
    rating: 4.9,
    avatar: null,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    role: 'mentor',
    status: 'active',
    verified: true,
    joinedDate: '2025-09-20',
    lastActive: '1 day ago',
    totalSessions: 18,
    rating: 5.0,
    avatar: null,
  },
  {
    id: 3,
    name: 'Emily Thompson',
    email: 'emily.t@email.com',
    role: 'mentee',
    status: 'active',
    verified: false,
    joinedDate: '2025-10-01',
    lastActive: '5 hours ago',
    totalSessions: 8,
    rating: 4.8,
    avatar: null,
  },
]

// Mock analytics data
const analyticsData = {
  totalUsers: 1247,
  totalMentors: 428,
  totalMentees: 819,
  pendingApprovals: 3,
  activeSessions: 156,
  completedSessions: 3542,
  averageRating: 4.8,
  messagesExchanged: 28934,
}

type Tab = 'overview' | 'pending' | 'users' | 'messages' | 'analytics' | 'settings'

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const handleApproveUser = (userId: number, userName: string, preferredNotification: string) => {
    if (confirm(`Approve ${userName}? They will receive a ${preferredNotification === 'email' ? 'email' : 'SMS'} notification and be able to log in.`)) {
      // In production, this would call the backend API
      console.log('Approving user:', userId)
      alert(`✓ ${userName} has been approved! ${preferredNotification === 'email' ? 'Email' : 'SMS'} notification sent.`)
      // Remove from pending list (in production, refetch data)
    }
  }

  const handleDenyUser = (userId: number, userName: string) => {
    const reason = prompt(`Deny ${userName}'s application? Please provide a reason (optional):`)
    if (reason !== null) {
      // In production, this would call the backend API
      console.log('Denying user:', userId, 'Reason:', reason)
      alert(`✗ ${userName}'s application has been denied.`)
      // Remove from pending list (in production, refetch data)
    }
  }

  const handleViewProfile = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleToggleVerification = (userId: number, userName: string, currentStatus: boolean) => {
    if (confirm(`${currentStatus ? 'Remove' : 'Grant'} verification badge for ${userName}?`)) {
      console.log('Toggle verification for user:', userId)
      alert(`${currentStatus ? '✗ Removed' : '✓ Granted'} verification badge for ${userName}`)
    }
  }

  const handleSuspendUser = (userId: number, userName: string) => {
    if (confirm(`Suspend ${userName}'s account? They will not be able to log in until reactivated.`)) {
      console.log('Suspending user:', userId)
      alert(`${userName}'s account has been suspended.`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Admin Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-red-600 text-white border-red-600">
                  <Shield className="mr-1 h-3 w-3" />
                  Admin Access
                </Badge>
                <Badge variant="outline" className="border-primary-accent text-primary-accent">
                  {mockPendingApprovals.length} Pending Approvals
                </Badge>
              </div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Administration Dashboard
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Manage users, approvals, and platform analytics
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            <Button
              variant={activeTab === 'overview' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('pending')}
              className={activeTab === 'pending' ? 'bg-secondary-accent text-white' : ''}
            >
              <Bell className="h-4 w-4 mr-1" />
              Pending ({mockPendingApprovals.length})
            </Button>
            <Button
              variant={activeTab === 'users' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('users')}
              className={activeTab === 'users' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <Users className="h-4 w-4 mr-1" />
              All Users
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('messages')}
              className={activeTab === 'messages' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('analytics')}
              className={activeTab === 'analytics' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Analytics
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('settings')}
              className={activeTab === 'settings' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Total Users</p>
                        <p className="text-3xl font-black font-montserrat text-primary-dark">
                          {analyticsData.totalUsers.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-primary-accent/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Mentors</p>
                        <p className="text-3xl font-black font-montserrat text-secondary-accent">
                          {analyticsData.totalMentors}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-secondary-accent/10 rounded-full flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-secondary-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Pending Approvals</p>
                        <p className="text-3xl font-black font-montserrat text-warning">
                          {analyticsData.pendingApprovals}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-warning/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Avg Rating</p>
                        <p className="text-3xl font-black font-montserrat text-primary-dark">
                          {analyticsData.averageRating}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary-accent" />
                      Recent Signups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPendingApprovals.slice(0, 3).map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <Avatar fallback={user.name} size="sm" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold font-montserrat text-primary-dark text-sm">
                              {user.name}
                            </p>
                            <p className="text-xs text-neutral-600 font-montserrat">
                              {user.role === 'mentor' ? 'Mentor' : 'Mentee'} • {user.appliedDate}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Pending
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary-accent" />
                      Platform Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Active Sessions</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.activeSessions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Completed Sessions</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.completedSessions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Messages Exchanged</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.messagesExchanged.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Pending Approvals Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    Pending Approvals
                  </h2>
                  <p className="text-neutral-600 font-montserrat mt-1">
                    Review and approve new mentor and mentee applications
                  </p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  {mockPendingApprovals.length} Pending
                </Badge>
              </div>

              <div className="space-y-4">
                {mockPendingApprovals.map((user) => (
                  <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <Avatar fallback={user.name} size="lg" className="flex-shrink-0" />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                                  {user.name}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className={user.role === 'mentor' ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-primary-dark'}
                                >
                                  {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                                </Badge>
                                {user.hasConnectedSocial && (
                                  <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Social Connected
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-neutral-700 font-montserrat">
                                {user.jobTitle} at {user.company}
                              </p>
                              <p className="text-xs text-neutral-500 font-montserrat mt-1">
                                Applied: {new Date(user.appliedDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Mail className="h-4 w-4 text-primary-accent" />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                                <Phone className="h-4 w-4 text-primary-accent" />
                                {user.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Bell className="h-4 w-4 text-primary-accent" />
                              Prefers {user.preferredNotification === 'email' ? 'Email' : 'SMS'}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Clock className="h-4 w-4 text-primary-accent" />
                              {user.yearsExperience} years experience
                            </div>
                          </div>

                          {/* Expertise */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-neutral-500 font-montserrat mb-2 uppercase">
                              Expertise
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {user.expertise.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="border-primary-accent/30 text-primary-accent">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Social Media */}
                          {(user.socialMedia.linkedin || user.socialMedia.twitter || user.socialMedia.instagram) && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-neutral-500 font-montserrat mb-2 uppercase">
                                Social Media
                              </p>
                              <div className="flex items-center gap-3">
                                {user.socialMedia.linkedin && (
                                  <a
                                    href={user.socialMedia.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {user.socialMedia.twitter && (
                                  <a
                                    href={user.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                                {user.socialMedia.instagram && (
                                  <a
                                    href={user.socialMedia.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Instagram className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Auto-Approval Notice */}
                          {user.hasConnectedSocial && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-green-800 font-montserrat">
                                    Eligible for Auto-Approval
                                  </p>
                                  <p className="text-xs text-green-700 font-montserrat mt-1">
                                    This user has connected their social media accounts and can be auto-approved for immediate access.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant="primary"
                              onClick={() => handleApproveUser(user.id, user.name, user.preferredNotification)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve & Notify
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDenyUser(user.id, user.name)}
                              className="border-red-600 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Deny Application
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => handleViewProfile(user)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Full Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {mockPendingApprovals.length === 0 && (
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                        All Caught Up!
                      </h3>
                      <p className="text-neutral-500 font-montserrat">
                        There are no pending approvals at this time.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* All Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    All Users
                  </h2>
                  <p className="text-neutral-600 font-montserrat mt-1">
                    Manage user accounts and verification status
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {mockAllUsers.map((user) => (
                  <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <Avatar fallback={user.name} size="md" className="flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                              {user.name}
                            </h3>
                            {user.verified && (
                              <Badge variant="default" className="bg-primary-accent text-primary-dark">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className={user.role === 'mentor' ? 'bg-secondary-accent text-white' : 'bg-neutral-200 text-neutral-700'}
                            >
                              {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                            >
                              {user.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 font-montserrat">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 font-montserrat">
                            <span>Joined {user.joinedDate}</span>
                            <span>•</span>
                            <span>Last active {user.lastActive}</span>
                            <span>•</span>
                            <span>{user.totalSessions} sessions</span>
                            {user.rating && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                  <span>{user.rating}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleVerification(user.id, user.name, user.verified)}
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            {user.verified ? 'Remove Badge' : 'Verify'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewProfile(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuspendUser(user.id, user.name)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                Platform Messages
              </h2>
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                    Message Monitoring
                  </h3>
                  <p className="text-neutral-500 font-montserrat mb-4">
                    View and monitor all platform messages for safety and compliance
                  </p>
                  <Button variant="primary" className="bg-primary-accent text-primary-dark">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View All Conversations
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                Platform Analytics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
                      <p className="text-neutral-500 font-montserrat">Chart placeholder - integrate analytics library</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Session Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
                      <p className="text-neutral-500 font-montserrat">Chart placeholder - integrate analytics library</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                Admin Settings
              </h2>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Approval Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark">
                        Auto-approve users with social media
                      </p>
                      <p className="text-sm text-neutral-600 font-montserrat mt-1">
                        Automatically approve users who connect their social media accounts during signup
                      </p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark">
                        Email notifications for new signups
                      </p>
                      <p className="text-sm text-neutral-600 font-montserrat mt-1">
                        Receive email notifications when new users sign up
                      </p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
