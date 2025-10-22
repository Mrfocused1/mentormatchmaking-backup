'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Video,
  MapPin,
  X,
  Check,
  Edit2,
  Trash2,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string
  startTime: string
  endTime: string
  type: 'session' | 'meeting' | 'event'
  attendee?: {
    name: string
    avatar: string | null
  }
  location?: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

// Helper to convert Session status to CalendarEvent status
const mapSessionStatus = (status: string): 'confirmed' | 'pending' | 'cancelled' => {
  if (status === 'SCHEDULED') return 'confirmed'
  if (status === 'CANCELLED') return 'cancelled'
  return 'pending'
}

type ViewMode = 'month' | 'week'

export default function CalendarPage() {
  const router = useRouter()
  const supabase = createClient()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)

  // Fetch sessions for current month/week
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Calculate date range for current view
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const startOfMonth = new Date(year, month, 1)
        const endOfMonth = new Date(year, month + 1, 0)

        // Fetch sessions where user is either mentor or mentee
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('Session')
          .select(`
            id,
            title,
            notes,
            scheduledAt,
            duration,
            status,
            User_Session_mentorIdToUser:mentorId (
              id,
              name,
              Profile (profilePicture)
            ),
            User_Session_menteeIdToUser:menteeId (
              id,
              name,
              Profile (profilePicture)
            )
          `)
          .or(`mentorId.eq.${user.id},menteeId.eq.${user.id}`)
          .gte('scheduledAt', startOfMonth.toISOString())
          .lte('scheduledAt', endOfMonth.toISOString())
          .order('scheduledAt')

        if (sessionsError) throw sessionsError

        // Transform sessions to CalendarEvent format
        const transformedEvents: CalendarEvent[] = (sessionsData || []).map((session: any) => {
          const scheduledDate = new Date(session.scheduledAt)
          const mentor = session.User_Session_mentorIdToUser
          const mentee = session.User_Session_menteeIdToUser

          // Determine who the attendee is (the other person, not current user)
          const isUserMentor = mentor?.id === user.id
          const attendee = isUserMentor ? mentee : mentor
          const attendeeProfile = Array.isArray(attendee?.Profile) ? attendee.Profile[0] : attendee?.Profile

          const endTime = new Date(scheduledDate.getTime() + session.duration * 60000)

          return {
            id: session.id,
            title: session.title || 'Mentorship Session',
            description: session.notes || undefined,
            date: scheduledDate.toISOString().split('T')[0],
            startTime: scheduledDate.toTimeString().substring(0, 5),
            endTime: endTime.toTimeString().substring(0, 5),
            type: 'session',
            attendee: {
              name: attendee?.name || 'Unknown',
              avatar: attendeeProfile?.profilePicture || null,
            },
            location: 'Video Call',
            status: mapSessionStatus(session.status),
          }
        })

        setEvents(transformedEvents)
      } catch (err) {
        console.error('Error fetching sessions:', err)
        setError(err instanceof Error ? err.message : 'Failed to load calendar')
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [supabase, router, currentDate, viewMode])

  // Navigation
  const previousPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() - 7)
      setCurrentDate(newDate)
    }
  }

  const nextPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(currentDate.getDate() + 7)
      setCurrentDate(newDate)
    }
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Generate calendar days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  // Generate week days
  const generateWeekDays = () => {
    const days: Date[] = []
    const startOfWeek = new Date(currentDate)
    const dayOfWeek = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }

    return days
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(e => e.date === dateStr)
  }

  // Format period title
  const periodTitle =
    viewMode === 'month'
      ? currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
      : `Week of ${generateWeekDays()[0].toLocaleDateString('default', { month: 'short', day: 'numeric' })}`

  // Event type colors
  const eventTypeColors = {
    session: 'bg-blue-500 border-blue-600',
    meeting: 'bg-purple-500 border-purple-600',
    event: 'bg-green-500 border-green-600',
  }

  // Status colors
  const statusColors = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    // Could open "Add event" modal here
  }

  // Delete event
  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId))
      setShowEventModal(false)
      setSelectedEvent(null)
    }
  }

  const calendarDays = viewMode === 'month' ? generateMonthDays() : generateWeekDays()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl mb-2">
                Calendar
              </h1>
              <p className="text-white/80 font-montserrat">
                Manage your sessions and schedule new appointments
              </p>
            </div>
            <Button
              onClick={() => router.push('/sessions/book')}
              className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 font-bold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Calendar Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={previousPeriod}
                className="border-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-black font-montserrat text-primary-dark min-w-[200px] text-center">
                {periodTitle}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPeriod}
                className="border-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="border-2"
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'month' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
                className={
                  viewMode === 'month'
                    ? 'bg-primary-accent text-primary-dark'
                    : 'border-2'
                }
              >
                Month
              </Button>
              <Button
                variant={viewMode === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
                className={
                  viewMode === 'week'
                    ? 'bg-primary-accent text-primary-dark'
                    : 'border-2'
                }
              >
                Week
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <Card className="shadow-xl">
            <CardContent className="p-0">
              {/* Header Row - Days of Week */}
              <div className="grid grid-cols-7 gap-0 border-b border-neutral-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div
                    key={day}
                    className="text-center py-3 font-bold font-montserrat text-neutral-700 text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Body */}
              {viewMode === 'month' ? (
                <div className="grid grid-cols-7 gap-0">
                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDate(day)
                    const isToday =
                      day?.toDateString() === new Date().toDateString()
                    const isCurrentMonth = day?.getMonth() === currentDate.getMonth()

                    return (
                      <div
                        key={index}
                        onClick={() => day && handleDateClick(day)}
                        className={`min-h-[120px] border-r border-b border-neutral-200 p-2 transition-colors cursor-pointer hover:bg-neutral-50 ${
                          !day ? 'bg-neutral-50' : isCurrentMonth ? 'bg-white' : 'bg-neutral-50/50'
                        }`}
                      >
                        {day && (
                          <>
                            <div
                              className={`text-sm font-semibold font-montserrat mb-2 ${
                                isToday
                                  ? 'bg-primary-accent text-primary-dark w-7 h-7 rounded-full flex items-center justify-center'
                                  : isCurrentMonth
                                  ? 'text-neutral-700'
                                  : 'text-neutral-400'
                              }`}
                            >
                              {day.getDate()}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map(event => (
                                <button
                                  key={event.id}
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleEventClick(event)
                                  }}
                                  className={`w-full text-left text-xs px-2 py-1 rounded border ${eventTypeColors[event.type]} text-white font-montserrat truncate hover:opacity-80 transition-opacity`}
                                >
                                  {event.startTime} {event.title}
                                </button>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-neutral-500 font-montserrat px-2">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                // Week view with hourly slots
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Time slots */}
                    {Array.from({ length: 14 }, (_, i) => i + 8).map(hour => (
                      <div key={hour} className="grid grid-cols-8 border-b border-neutral-200">
                        <div className="p-2 text-xs font-semibold text-neutral-600 font-montserrat text-right pr-4">
                          {hour}:00
                        </div>
                        {calendarDays.map((day, dayIndex) => {
                          const timeSlotEvents = getEventsForDate(day).filter(e => {
                            const eventHour = parseInt(e.startTime.split(':')[0])
                            return eventHour === hour
                          })

                          return (
                            <div
                              key={dayIndex}
                              className="border-l border-neutral-200 p-1 min-h-[60px] hover:bg-neutral-50 transition-colors"
                            >
                              {timeSlotEvents.map(event => (
                                <button
                                  key={event.id}
                                  onClick={() => handleEventClick(event)}
                                  className={`w-full text-left text-xs px-2 py-1 rounded border ${eventTypeColors[event.type]} text-white font-montserrat hover:opacity-80 transition-opacity`}
                                >
                                  <div className="font-semibold truncate">{event.title}</div>
                                  <div className="opacity-90">
                                    {event.startTime}-{event.endTime}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-neutral-700 font-montserrat">
              Event Types:
            </span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm font-montserrat text-neutral-600">Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm font-montserrat text-neutral-600">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm font-montserrat text-neutral-600">Events</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="max-w-lg w-full shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-2">
                    {selectedEvent.title}
                  </h3>
                  <Badge className={statusColors[selectedEvent.status]} size="sm">
                    {selectedEvent.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEventModal(false)}
                  className="text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {selectedEvent.description && (
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  {selectedEvent.description}
                </p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm font-montserrat text-neutral-700">
                  <CalendarIcon className="h-5 w-5 text-secondary-accent" />
                  <span>
                    {new Date(selectedEvent.date).toLocaleDateString('default', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm font-montserrat text-neutral-700">
                  <Clock className="h-5 w-5 text-secondary-accent" />
                  <span>
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-sm font-montserrat text-neutral-700">
                    <MapPin className="h-5 w-5 text-secondary-accent" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.attendee && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-secondary-accent" />
                    <div className="flex items-center gap-2">
                      <Avatar
                        fallback={selectedEvent.attendee.name}
                        size="sm"
                        className="border border-primary-accent"
                      />
                      <span className="text-sm font-montserrat text-neutral-700">
                        {selectedEvent.attendee.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/sessions/${selectedEvent.id}`)}
                  className="flex-1 border-2"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {selectedEvent.type === 'session' && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/sessions/${selectedEvent.id}/notes`)}
                    className="flex-1 border-2"
                  >
                    View Notes
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
