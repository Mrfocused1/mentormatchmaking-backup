'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Check,
  X,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Star,
  Loader2
} from 'lucide-react'

type SessionFilter = 'all' | 'scheduled' | 'completed' | 'cancelled'

interface Session {
  id: string
  mentorId: string
  menteeId: string
  title: string
  scheduledAt: string
  duration: number
  status: string
  notes?: string | null
  mentor: {
    id: string
    name: string | null
    profile: {
      profilePicture?: string | null
    } | null
  }
  mentee: {
    id: string
    name: string | null
    profile: {
      profilePicture?: string | null
    } | null
  }
}

export default function SessionsPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<SessionFilter>('all')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)

  // Fetch sessions
  useEffect(() => {
    fetchSessions()
  }, [activeFilter])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const url = activeFilter === 'all'
        ? '/api/sessions'
        : `/api/sessions?status=${activeFilter.toUpperCase()}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle session cancellation
  const handleCancelSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to cancel this session? The other person will be notified.')) {
      return
    }

    try {
      setCancelling(sessionId)
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        alert('Session cancelled successfully')
        fetchSessions() // Refresh the list
      } else {
        alert(data.error || 'Failed to cancel session')
      }
    } catch (error) {
      console.error('Error cancelling session:', error)
      alert('Failed to cancel session')
    } finally {
      setCancelling(null)
    }
  }

  // Calendar navigation
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Generate calendar days (simplified)
  const generateCalendarDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Check if a day has sessions
  const hasSessionOnDay = (day: number | null) => {
    if (!day) return false
    const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      .toISOString()
      .split('T')[0]

    return sessions.some(s => {
      const sessionDate = new Date(s.scheduledAt).toISOString().split('T')[0]
      return sessionDate === dateStr && s.status === 'SCHEDULED'
    })
  }

  // Filter sessions based on active filter
  const displayedSessions = sessions.filter(session => {
    if (activeFilter === 'all') return true
    return session.status === activeFilter.toUpperCase()
  })

  // Group sessions by date
  const groupedSessions = displayedSessions.reduce((acc, session) => {
    const date = new Date(session.scheduledAt).toLocaleDateString()
    if (!acc[date]) acc[date] = []
    acc[date].push(session)
    return acc
  }, {} as Record<string, Session[]>)

  // Count sessions by status
  const sessionCounts = {
    all: sessions.length,
    scheduled: sessions.filter(s => s.status === 'SCHEDULED').length,
    completed: sessions.filter(s => s.status === 'COMPLETED').length,
    cancelled: sessions.filter(s => s.status === 'CANCELLED').length,
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
            Sessions
          </h1>
          <p className="mt-2 text-white/80 font-montserrat">
            Manage your mentorship sessions and schedule new appointments
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar View */}
            <div className="lg:col-span-1">
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={previousMonth}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-neutral-600" />
                    </button>
                    <h2 className="text-lg font-black font-montserrat text-primary-dark">
                      {monthName}
                    </h2>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-neutral-600" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-bold font-montserrat text-neutral-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square flex items-center justify-center text-sm font-montserrat rounded-lg ${
                          day
                            ? hasSessionOnDay(day)
                              ? 'bg-primary-accent text-primary-dark font-bold cursor-pointer hover:bg-primary-accent/80'
                              : 'text-neutral-700 hover:bg-neutral-100 cursor-pointer'
                            : ''
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-2 text-xs font-montserrat text-neutral-600">
                      <div className="w-3 h-3 bg-primary-accent rounded"></div>
                      <span>Has sessions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-md mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Session Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">All Sessions</span>
                      <Badge variant="default" className="bg-neutral-600 text-white">
                        {sessionCounts.all}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">Scheduled</span>
                      <Badge variant="default" className="bg-primary-accent text-primary-dark">
                        {sessionCounts.scheduled}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">Completed</span>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        {sessionCounts.completed}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">Cancelled</span>
                      <Badge variant="secondary" className="bg-red-600 text-white">
                        {sessionCounts.cancelled}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sessions List */}
            <div className="lg:col-span-2">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <Filter className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                <Button
                  variant={activeFilter === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('all')}
                  className={activeFilter === 'all' ? 'bg-neutral-600 text-white' : ''}
                >
                  All ({sessionCounts.all})
                </Button>
                <Button
                  variant={activeFilter === 'scheduled' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('scheduled')}
                  className={activeFilter === 'scheduled' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Scheduled ({sessionCounts.scheduled})
                </Button>
                <Button
                  variant={activeFilter === 'completed' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('completed')}
                  className={activeFilter === 'completed' ? 'bg-green-600 text-white' : ''}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Completed ({sessionCounts.completed})
                </Button>
                <Button
                  variant={activeFilter === 'cancelled' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('cancelled')}
                  className={activeFilter === 'cancelled' ? 'bg-red-600 text-white' : ''}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancelled ({sessionCounts.cancelled})
                </Button>
              </div>

              {/* Sessions Cards */}
              <div className="space-y-4">
                {loading ? (
                  <Card className="shadow-md">
                    <CardContent className="p-12 text-center">
                      <Loader2 className="h-12 w-12 text-primary-accent mx-auto mb-4 animate-spin" />
                      <p className="text-neutral-500 font-montserrat">Loading sessions...</p>
                    </CardContent>
                  </Card>
                ) : displayedSessions.length > 0 ? (
                  displayedSessions.map((session) => {
                    const sessionDate = new Date(session.scheduledAt)
                    const sessionTime = sessionDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })

                    return (
                      <Card key={session.id} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <Avatar
                              src={session.mentor.profile?.profilePicture || undefined}
                              fallback={session.mentor.name || 'M'}
                              size="md"
                              className="flex-shrink-0"
                            />

                            {/* Session Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <h3 className="font-bold font-montserrat text-primary-dark text-lg">
                                    {session.title}
                                  </h3>
                                  <p className="text-sm font-montserrat text-neutral-600">
                                    with {session.mentor.name} and {session.mentee.name}
                                  </p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className={
                                    session.status === 'SCHEDULED'
                                      ? 'bg-green-100 text-green-700'
                                      : session.status === 'COMPLETED'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-neutral-100 text-neutral-700'
                                  }
                                >
                                  {session.status}
                                </Badge>
                              </div>

                              {/* Session Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                                  <Calendar className="h-4 w-4 text-primary-accent" />
                                  {sessionDate.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                                  <Clock className="h-4 w-4 text-secondary-accent" />
                                  {sessionTime}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  {session.duration} minutes
                                </div>
                              </div>

                              {/* Session Notes */}
                              {session.notes && (
                                <p className="text-sm font-montserrat text-neutral-600 bg-neutral-50 p-3 rounded-lg mb-3">
                                  <span className="font-semibold">Notes:</span> {session.notes}
                                </p>
                              )}

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2">
                                {session.status === 'SCHEDULED' && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCancelSession(session.id)}
                                    disabled={cancelling === session.id}
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    {cancelling === session.id ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                        Cancelling...
                                      </>
                                    ) : (
                                      <>
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel
                                      </>
                                    )}
                                  </Button>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push('/messages')}
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <Card className="shadow-md">
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                        No {activeFilter} sessions
                      </h3>
                      <p className="text-neutral-500 font-montserrat mb-4">
                        {activeFilter === 'all' && "You don't have any sessions yet."}
                        {activeFilter === 'scheduled' && "You don't have any scheduled sessions."}
                        {activeFilter === 'completed' && "You don't have any completed sessions yet."}
                        {activeFilter === 'cancelled' && "You don't have any cancelled sessions."}
                      </p>
                      <Button
                        variant="primary"
                        className="bg-primary-accent text-primary-dark"
                        onClick={() => router.push('/browse-mentors')}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Find a Mentor
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
