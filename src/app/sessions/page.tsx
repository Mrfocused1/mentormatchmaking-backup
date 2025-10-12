'use client'

import { useState } from 'react'
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
  Star
} from 'lucide-react'

// Mock session data
const mockSessions = {
  upcoming: [
    {
      id: 1,
      mentorName: 'Sarah Thompson',
      menteeName: 'Michael Chen',
      userRole: 'mentee',
      date: '2025-10-15',
      time: '2:00 PM - 3:00 PM',
      duration: '60 minutes',
      topic: 'Product Roadmap Review',
      status: 'confirmed',
      notes: 'Bring your product roadmap and key metrics for review'
    },
    {
      id: 2,
      mentorName: 'Emily Rodriguez',
      menteeName: 'You',
      userRole: 'mentee',
      date: '2025-10-18',
      time: '10:00 AM - 11:00 AM',
      duration: '60 minutes',
      topic: 'Career Development Discussion',
      status: 'confirmed',
      notes: 'Discuss career transition strategy'
    },
    {
      id: 3,
      mentorName: 'You',
      menteeName: 'David Kim',
      userRole: 'mentor',
      date: '2025-10-20',
      time: '3:00 PM - 4:00 PM',
      duration: '60 minutes',
      topic: 'Interview Preparation',
      status: 'confirmed',
      notes: 'Mock technical interview session'
    }
  ],
  pending: [
    {
      id: 4,
      mentorName: 'You',
      menteeName: 'Jessica Liu',
      userRole: 'mentor',
      date: '2025-10-22',
      time: '1:00 PM - 2:00 PM',
      duration: '60 minutes',
      topic: 'Product Strategy Session',
      status: 'pending',
      requestedBy: 'mentee',
      notes: 'Would love to discuss go- strategy for my new feature'
    },
    {
      id: 5,
      mentorName: 'Robert Taylor',
      menteeName: 'You',
      userRole: 'mentee',
      date: '2025-10-25',
      time: '11:00 AM - 12:00 PM',
      duration: '60 minutes',
      topic: 'Technical Architecture Review',
      status: 'pending',
      requestedBy: 'you',
      notes: 'Review system design for scalability'
    }
  ],
  past: [
    {
      id: 6,
      mentorName: 'Sarah Thompson',
      menteeName: 'You',
      userRole: 'mentee',
      date: '2025-10-05',
      time: '2:00 PM - 3:00 PM',
      duration: '60 minutes',
      topic: 'Stakeholder Management',
      status: 'completed',
      rating: 5,
      reviewed: true,
      markedComplete: true
    },
    {
      id: 7,
      mentorName: 'You',
      menteeName: 'Alex Martinez',
      userRole: 'mentor',
      date: '2025-10-01',
      time: '10:00 AM - 11:00 AM',
      duration: '60 minutes',
      topic: 'Resume Review',
      status: 'completed',
      rating: 5,
      reviewed: true,
      markedComplete: true
    },
    {
      id: 8,
      mentorName: 'Emily Rodriguez',
      menteeName: 'You',
      userRole: 'mentee',
      date: '2025-09-28',
      time: '3:00 PM - 4:00 PM',
      duration: '60 minutes',
      topic: 'Negotiation Strategies',
      status: 'completed',
      rating: 0,
      reviewed: false,
      markedComplete: false
    }
  ]
}

type SessionFilter = 'upcoming' | 'pending' | 'past'

export default function SessionsPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<SessionFilter>('upcoming')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get sessions based on filter
  const displayedSessions = mockSessions[activeFilter]

  // Handle session actions
  const handleAcceptSession = (sessionId: number) => {
    alert('Session request accepted!')
  }

  const handleDeclineSession = (sessionId: number) => {
    if (confirm('Are you sure you want to decline this session request?')) {
      alert('Session request declined.')
    }
  }

  const handleCancelSession = (sessionId: number) => {
    if (confirm('Are you sure you want to cancel this session? The other person will be notified.')) {
      alert('Session cancelled.')
    }
  }

  const handleLeaveReview = (sessionId: number) => {
    router.push(`/sessions/${sessionId}/review`)
  }

  const handleMarkComplete = (sessionId: number) => {
    if (confirm('Mark this session as completed? Both parties need to confirm completion before you can leave a review.')) {
      alert('Session marked as complete!')
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
    const dateStr = `2025-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return mockSessions.upcoming.some(s => s.date === dateStr)
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
                      <span className="text-sm font-montserrat text-neutral-600">Upcoming</span>
                      <Badge variant="default" className="bg-primary-accent text-primary-dark">
                        {mockSessions.upcoming.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">Pending</span>
                      <Badge variant="secondary" className="bg-yellow-500 text-white">
                        {mockSessions.pending.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-montserrat text-neutral-600">Completed</span>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        {mockSessions.past.length}
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
                  variant={activeFilter === 'upcoming' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('upcoming')}
                  className={activeFilter === 'upcoming' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming ({mockSessions.upcoming.length})
                </Button>
                <Button
                  variant={activeFilter === 'pending' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('pending')}
                  className={activeFilter === 'pending' ? 'bg-yellow-500 text-white' : ''}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Pending ({mockSessions.pending.length})
                </Button>
                <Button
                  variant={activeFilter === 'past' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter('past')}
                  className={activeFilter === 'past' ? 'bg-green-600 text-white' : ''}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Past ({mockSessions.past.length})
                </Button>
              </div>

              {/* Sessions Cards */}
              <div className="space-y-4">
                {displayedSessions.length > 0 ? (
                  displayedSessions.map((session: any) => (
                    <Card key={session.id} className="shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <Avatar
                            fallback={session.userRole === 'mentor' ? session.menteeName : session.mentorName}
                            size="md"
                            className="flex-shrink-0"
                          />

                          {/* Session Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-bold font-montserrat text-primary-dark text-lg">
                                  {session.topic}
                                </h3>
                                <p className="text-sm font-montserrat text-neutral-600">
                                  with {session.userRole === 'mentor' ? session.menteeName : session.mentorName}
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className={
                                  session.status === 'confirmed'
                                    ? 'bg-green-100 text-green-700'
                                    : session.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
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
                                {new Date(session.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                                <Clock className="h-4 w-4 text-secondary-accent" />
                                {session.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                                <Clock className="h-4 w-4 text-blue-600" />
                                {session.duration}
                              </div>
                            </div>

                            {/* Session Notes */}
                            {session.notes && (
                              <p className="text-sm font-montserrat text-neutral-600 bg-neutral-50 p-3 rounded-lg mb-3">
                                <span className="font-semibold">Notes:</span> {session.notes}
                              </p>
                            )}

                            {/* Session Rating (for completed sessions) */}
                            {session.status === 'completed' && session.reviewed && (
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < session.rating
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-neutral-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">
                              {session.status === 'confirmed' && activeFilter === 'upcoming' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCancelSession(session.id)}
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}

                              {session.status === 'pending' && (
                                <>
                                  {session.requestedBy === 'mentee' && session.userRole === 'mentor' && (
                                    <>
                                      <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAcceptSession(session.id)}
                                        className="bg-green-600 text-white hover:bg-green-700"
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeclineSession(session.id)}
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                  {session.requestedBy === 'you' && (
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                                      Waiting for response
                                    </Badge>
                                  )}
                                </>
                              )}

                              {session.status === 'completed' && !session.markedComplete && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleMarkComplete(session.id)}
                                  className="bg-green-600 text-white hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Mark as Complete
                                </Button>
                              )}

                              {session.status === 'completed' && session.markedComplete && !session.reviewed && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleLeaveReview(session.id)}
                                  className="bg-secondary-accent text-white hover:bg-secondary-accent/90"
                                >
                                  <Star className="h-4 w-4 mr-1" />
                                  Leave Review
                                </Button>
                              )}

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => alert('Message feature would open here')}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="shadow-md">
                    <CardContent className="p-12 text-center">
                      <Calendar className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                        No {activeFilter} sessions
                      </h3>
                      <p className="text-neutral-500 font-montserrat mb-4">
                        {activeFilter === 'upcoming' && "You don't have any upcoming sessions scheduled."}
                        {activeFilter === 'pending' && "You don't have any pending session requests."}
                        {activeFilter === 'past' && "You don't have any completed sessions yet."}
                      </p>
                      {activeFilter === 'upcoming' && (
                        <Button variant="primary" className="bg-primary-accent text-primary-dark">
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule a Session
                        </Button>
                      )}
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
