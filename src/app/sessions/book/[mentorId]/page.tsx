'use client'

export const dynamic = 'force-dynamic'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Briefcase,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  Heart,
  AlertCircle,
  Eye,
  Loader2
} from 'lucide-react'

interface MentorData {
  id: string
  name: string
  title: string
  company: string
  location: string
  avatar: string | null
  rating: number
  reviewCount: number
  totalSessions: number
  responseTime: string
  bio: string
  expertise: string[]
  achievements: string[]
}

interface TimeSlotData {
  id: string
  time: string
  duration: number
  type: string
  available: boolean
}

interface DateSlot {
  id: number
  date: string
  day: string
  slots: TimeSlotData[]
}

const sessionTypeInfo: Record<string, { description: string; color: string; icon: any }> = {
  'Career Coaching': {
    description: 'Discuss career goals, transitions, and growth strategies',
    color: 'bg-primary-accent text-primary-dark',
    icon: TrendingUp
  },
  'Technical Review': {
    description: 'Review technical skills, architecture, and best practices',
    color: 'bg-secondary-accent text-white',
    icon: Briefcase
  },
  'Product Strategy': {
    description: 'Product roadmap, prioritization, and strategy discussions',
    color: 'bg-vibrant-accent text-white',
    icon: Award
  },
  'Interview Prep': {
    description: 'Mock interviews and preparation for job applications',
    color: 'bg-green-600 text-white',
    icon: Users
  }
}

export default function BookSessionPage({ params }: { params: Promise<{ mentorId: string }> }) {
  const { mentorId } = use(params)
  const router = useRouter()
  const supabase = createClient()

  const [mentor, setMentor] = useState<MentorData | null>(null)
  const [availabilitySlots, setAvailabilitySlots] = useState<DateSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotData | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingNotes, setBookingNotes] = useState('')
  const [currentWeekStart, setCurrentWeekStart] = useState(0)
  const [connectionMessage, setConnectionMessage] = useState('')

  // Connection status: 'none' = not connected, 'pending' = request sent, 'connected' = can book
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>('none')
  const [showInterestModal, setShowInterestModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setCurrentUserId(user.id)

        // Fetch mentor details with profile
        const { data: mentorData, error: mentorError } = await supabase
          .from('User')
          .select(`
            id, name, role,
            Profile (
              profilePicture, workExperience, bio, city,
              responseTime
            )
          `)
          .eq('id', mentorId)
          .single()

        if (mentorError) throw mentorError
        if (!mentorData) throw new Error('Mentor not found')

        // Fetch review stats for mentor
        const { data: reviewsData } = await supabase
          .from('Review')
          .select('rating')
          .eq('reviewedId', mentorId)

        const reviews = reviewsData || []
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0

        // Fetch total sessions count
        const { data: sessionsData } = await supabase
          .from('Session')
          .select('id', { count: 'exact', head: true })
          .eq('mentorId', mentorId)
          .eq('status', 'COMPLETED')

        const profile = Array.isArray(mentorData.Profile) ? mentorData.Profile[0] : mentorData.Profile

        // Transform to MentorData format
        const transformedMentor: MentorData = {
          id: mentorData.id,
          name: mentorData.name,
          title: profile?.workExperience || 'Mentor',
          company: '',
          location: profile?.city || 'Location not set',
          avatar: profile?.profilePicture || null,
          rating: Number(avgRating.toFixed(1)),
          reviewCount: reviews.length,
          totalSessions: sessionsData?.length || 0,
          responseTime: profile?.responseTime === 'WITHIN_24H' ? '< 24 hours' :
                        profile?.responseTime === 'TWO_THREE_DAYS' ? '2-3 days' :
                        profile?.responseTime === 'WEEKLY' ? 'within a week' : 'flexible',
          bio: profile?.bio || 'No bio available',
          expertise: [],
          achievements: []
        }

        setMentor(transformedMentor)

        // Check connection status between current user and mentor
        // First check for active match
        const { data: matchData } = await supabase
          .from('Match')
          .select('id, status')
          .or(`and(user1Id.eq.${user.id},user2Id.eq.${mentorId}),and(user1Id.eq.${mentorId},user2Id.eq.${user.id})`)
          .single()

        if (matchData && matchData.status === 'ACTIVE') {
          setConnectionStatus('connected')
        } else {
          // Check for pending interest request
          const { data: interestData } = await supabase
            .from('InterestRequest')
            .select('id, status')
            .eq('fromUserId', user.id)
            .eq('toUserId', mentorId)
            .single()

          if (interestData) {
            if (interestData.status === 'PENDING') {
              setConnectionStatus('pending')
            } else if (interestData.status === 'ACCEPTED') {
              setConnectionStatus('connected')
            } else {
              setConnectionStatus('none')
            }
          } else {
            setConnectionStatus('none')
          }
        }

        // Fetch mentor availability - generate slots for next 4 weeks
        const today = new Date()
        const slots: DateSlot[] = []

        for (let dayOffset = 0; dayOffset < 28; dayOffset++) {
          const date = new Date(today)
          date.setDate(today.getDate() + dayOffset)
          const dayOfWeek = date.getDay()

          // Get availability for this day of week
          const { data: availabilityData } = await supabase
            .from('MentorAvailability')
            .select('*')
            .eq('mentorId', mentorId)
            .eq('dayOfWeek', dayOfWeek)
            .eq('isActive', true)

          const daySlots: TimeSlotData[] = []

          if (availabilityData && availabilityData.length > 0) {
            for (const avail of availabilityData) {
              // Check if there's a booked session for this time on this date
              const dateStr = date.toISOString().split('T')[0]

              const { data: bookedSlots } = await supabase
                .from('Session')
                .select('id')
                .eq('mentorId', mentorId)
                .gte('scheduledAt', `${dateStr}T${avail.startTime}:00`)
                .lt('scheduledAt', `${dateStr}T${avail.endTime}:00`)
                .in('status', ['SCHEDULED', 'COMPLETED'])

              const isBooked = bookedSlots && bookedSlots.length > 0

              daySlots.push({
                id: `${dayOffset}-${avail.id}`,
                time: formatTime(avail.startTime),
                duration: 60,
                type: avail.sessionType || 'General Session',
                available: !isBooked
              })
            }
          }

          slots.push({
            id: dayOffset,
            date: date.toISOString().split('T')[0],
            day: date.toLocaleDateString('en-US', { weekday: 'long' }),
            slots: daySlots
          })
        }

        setAvailabilitySlots(slots)
      } catch (err) {
        console.error('Error fetching booking data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load booking page')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mentorId, supabase, router])

  // Helper function to format time
  const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  // Get week of dates
  const getWeekDates = () => {
    return availabilitySlots.slice(currentWeekStart, currentWeekStart + 7)
  }

  const weekDates = getWeekDates()

  // Navigate week
  const previousWeek = () => {
    if (currentWeekStart > 0) {
      setCurrentWeekStart(currentWeekStart - 7)
      setSelectedDate(null)
    }
  }

  const nextWeek = () => {
    if (currentWeekStart + 7 < availabilitySlots.length) {
      setCurrentWeekStart(currentWeekStart + 7)
      setSelectedDate(null)
    }
  }

  // Handle slot selection
  const handleSelectSlot = (dateObj: any, slot: any) => {
    if (!slot.available) return

    // Check if user is connected to mentor
    if (connectionStatus !== 'connected') {
      // Show interest modal instead
      setShowInterestModal(true)
      return
    }

    setSelectedDate(dateObj.date)
    setSelectedSlot(slot)
    setShowBookingModal(true)
  }

  // Handle showing interest
  const handleShowInterest = async () => {
    if (!currentUserId || !mentorId) return

    try {
      const { error } = await supabase
        .from('InterestRequest')
        .insert({
          fromUserId: currentUserId,
          toUserId: mentorId,
          message: connectionMessage || '',
          status: 'PENDING'
        })

      if (error) throw error

      setConnectionStatus('pending')
      setShowInterestModal(false)
      setConnectionMessage('')
      alert('Connection request sent! You\'ll be notified when the mentor accepts.')
    } catch (err) {
      console.error('Error sending connection request:', err)
      alert('Failed to send connection request. Please try again.')
    }
  }

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!currentUserId || !mentorId || !selectedDate || !selectedSlot) return

    try {
      // Parse the time and create scheduledAt datetime
      const scheduledAt = new Date(`${selectedDate}T${convertTo24Hour(selectedSlot.time)}:00`)

      const { error } = await supabase
        .from('Session')
        .insert({
          mentorId: mentorId,
          menteeId: currentUserId,
          scheduledAt: scheduledAt.toISOString(),
          duration: selectedSlot.duration,
          status: 'SCHEDULED',
          notes: bookingNotes || null
        })

      if (error) throw error

      alert(`Session booked!\n\nDate: ${selectedDate}\nTime: ${selectedSlot.time}\nType: ${selectedSlot.type}`)
      setShowBookingModal(false)
      setBookingNotes('')
      setSelectedSlot(null)
      setSelectedDate(null)

      // Refresh availability
      window.location.reload()
    } catch (err) {
      console.error('Error booking session:', err)
      alert('Failed to book session. Please try again.')
    }
  }

  // Helper to convert 12-hour time to 24-hour
  const convertTo24Hour = (time12: string): string => {
    const [time, period] = time12.split(' ')
    let [hours, minutes] = time.split(':').map(Number)

    if (period === 'PM' && hours !== 12) {
      hours += 12
    } else if (period === 'AM' && hours === 12) {
      hours = 0
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  // Get selected date object
  const selectedDateObj = availabilitySlots.find(d => d.date === selectedDate)

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <section className="pt-24 pb-12 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Loading booking details...
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <section className="pt-24 pb-12 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Error loading booking page
                </h3>
                <p className="text-neutral-600 font-montserrat mb-8">{error || 'Mentor not found'}</p>
                <Button
                  variant="primary"
                  onClick={() => router.push('/browse-mentors')}
                  className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90"
                >
                  Browse Mentors
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="shadow-2xl overflow-hidden border-0">
            {/* Mentor Profile Header */}
            <div className="bg-primary-accent/10 p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="relative">
                  <Avatar src={mentor.avatar} fallback={mentor.name} size="2xl" className="border-4 border-white shadow-xl" />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl font-black font-montserrat text-primary-dark mb-2">
                        {mentor.name}
                      </h1>
                      <p className="text-lg font-semibold font-montserrat text-neutral-700">
                        {mentor.title}
                      </p>
                      {mentor.company && (
                        <p className="text-md font-montserrat text-neutral-600">
                          @ {mentor.company}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-xl font-bold font-montserrat text-primary-dark">
                        {mentor.rating || 'N/A'}
                      </span>
                      <span className="text-sm text-neutral-600">
                        ({mentor.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <MapPin className="h-4 w-4 text-primary-accent" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <Users className="h-4 w-4 text-secondary-accent" />
                      {mentor.totalSessions} sessions completed
                    </div>
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <Clock className="h-4 w-4 text-vibrant-accent" />
                      Responds in {mentor.responseTime}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-neutral-700 font-montserrat leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  {/* Expertise Tags */}
                  {mentor.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, idx) => (
                        <Badge key={idx} className="bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            {mentor.achievements.length > 0 && (
              <div className="bg-white p-6 border-t-2 border-neutral-100">
                <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {mentor.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-montserrat text-neutral-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Connection Status Banner */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {connectionStatus === 'none' && (
            <Card className="shadow-xl border-2 border-yellow-400 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                      Connect to Book Sessions
                    </h3>
                    <p className="text-sm font-montserrat text-neutral-700 mb-4">
                      You can view {mentor.name}'s availability, but you need to connect first before booking a session. Send a connection request to get started!
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowInterestModal(true)}
                      className="bg-secondary-accent text-white hover:bg-secondary-accent/90 shadow-lg"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      Send Connection Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {connectionStatus === 'pending' && (
            <Card className="shadow-xl border-2 border-blue-400 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                      Connection Request Pending
                    </h3>
                    <p className="text-sm font-montserrat text-neutral-700">
                      Your connection request has been sent to {mentor.name}. You'll be able to book sessions once they accept your request. Mentors typically respond within {mentor.responseTime}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {connectionStatus === 'connected' && (
            <Card className="shadow-xl border-2 border-green-400 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                      You're Connected!
                    </h3>
                    <p className="text-sm font-montserrat text-neutral-700">
                      You can now book sessions with {mentor.name}. Select any available time slot below to schedule your mentorship session.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black font-montserrat text-white mb-3">
              {connectionStatus === 'connected' ? 'Book a Session' : 'View Availability'}
            </h2>
            <p className="text-lg text-white/90 font-montserrat">
              {connectionStatus === 'connected'
                ? 'Select a time slot that works best for you'
                : `See when ${mentor.name} is available for mentorship sessions`
              }
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            {/* Session Types */}
            <div className="bg-neutral-50 p-6 border-b-2 border-neutral-100">
              <h3 className="text-lg font-black font-montserrat text-primary-dark mb-4">
                Available Session Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(sessionTypeInfo).map(([type, info]) => {
                  const Icon = info.icon
                  return (
                    <div key={type} className="bg-white rounded-xl p-4 border-2 border-neutral-100 hover:border-primary-accent transition-colors">
                      <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center mb-3`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold font-montserrat text-primary-dark text-sm mb-1">
                        {type}
                      </h4>
                      <p className="text-xs font-montserrat text-neutral-600">
                        {info.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Calendar */}
            <CardContent className="p-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={previousWeek}
                  disabled={currentWeekStart === 0}
                  className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                  {new Date(weekDates[0].date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <Button
                  variant="outline"
                  onClick={nextWeek}
                  className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {weekDates.map(dateObj => {
                  const date = new Date(dateObj.date)
                  const isSelected = selectedDate === dateObj.date
                  const hasSlots = dateObj.slots.length > 0

                  return (
                    <div key={dateObj.id} className={`${!hasSlots ? 'opacity-40' : ''}`}>
                      {/* Date Header */}
                      <div className={`text-center p-3 rounded-t-xl border-2 ${
                        isSelected
                          ? 'bg-primary-accent border-primary-accent text-primary-dark'
                          : hasSlots
                          ? 'bg-white border-neutral-200 hover:border-primary-accent transition-colors'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}>
                        <div className="text-xs font-semibold font-montserrat uppercase">
                          {dateObj.day}
                        </div>
                        <div className="text-2xl font-black font-montserrat">
                          {date.getDate()}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="bg-white border-2 border-t-0 border-neutral-200 rounded-b-xl p-2 min-h-[200px]">
                        {hasSlots ? (
                          <div className="space-y-2">
                            {dateObj.slots.map(slot => {
                              const typeInfo = sessionTypeInfo[slot.type]
                              return (
                                <button
                                  key={slot.id}
                                  onClick={() => handleSelectSlot(dateObj, slot)}
                                  disabled={!slot.available}
                                  className={`w-full p-2 rounded-lg text-left text-xs font-montserrat transition-all ${
                                    slot.available
                                      ? connectionStatus === 'connected'
                                        ? `${typeInfo.color} hover:scale-105 hover:shadow-md cursor-pointer`
                                        : `${typeInfo.color} opacity-60 cursor-pointer hover:opacity-80`
                                      : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                  }`}
                                >
                                  <div className="font-bold flex items-center justify-between">
                                    <span>{slot.time}</span>
                                    {slot.available && connectionStatus !== 'connected' && (
                                      <Eye className="h-3 w-3 opacity-70" />
                                    )}
                                  </div>
                                  <div className="opacity-90 truncate">{slot.type}</div>
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-xs font-montserrat text-neutral-400 text-center">
                              No availability
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex flex-wrap gap-4 justify-center text-sm font-montserrat">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary-accent rounded"></div>
                    <span className="text-neutral-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-neutral-100 rounded"></div>
                    <span className="text-neutral-600">Booked</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interest/Connection Request Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="bg-secondary-accent text-white">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Connect with {mentor.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Mentor Summary */}
              <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                <Avatar src={mentor.avatar} fallback={mentor.name} size="lg" className="border-2 border-white shadow-md" />
                <div className="flex-1">
                  <h3 className="font-bold font-montserrat text-primary-dark">{mentor.name}</h3>
                  <p className="text-sm font-montserrat text-neutral-600">{mentor.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-primary-dark">{mentor.rating}</span>
                    <span className="text-xs text-neutral-500">({mentor.totalSessions} sessions)</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold font-montserrat text-primary-dark text-sm mb-1">
                      About Connection Requests
                    </h4>
                    <p className="text-xs font-montserrat text-neutral-700 leading-relaxed">
                      Once {mentor.name} accepts your request, you'll be able to book mentorship sessions directly. You can view their availability now to help you decide!
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                  Introduce yourself (optional)
                </label>
                <textarea
                  value={connectionMessage}
                  onChange={(e) => setConnectionMessage(e.target.value)}
                  placeholder="Tell the mentor a bit about yourself and why you'd like to connect..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleShowInterest}
                  className="flex-1 bg-secondary-accent text-white hover:bg-secondary-accent/90 shadow-lg"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Send Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowInterestModal(false)}
                  className="border-2"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </div>

              {/* Response Time */}
              <p className="text-xs text-neutral-500 font-montserrat text-center pt-2">
                ⏱️ {mentor.name} typically responds within {mentor.responseTime}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingModal && selectedSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="bg-primary-accent text-primary-dark">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Confirm Your Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Session Details */}
              <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Mentor</span>
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{mentor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Date</span>
                  <span className="text-sm font-bold font-montserrat text-primary-dark">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Time</span>
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{selectedSlot.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Duration</span>
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{selectedSlot.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Type</span>
                  <Badge className={sessionTypeInfo[selectedSlot.type]?.color || 'bg-neutral-200'}>
                    {selectedSlot.type}
                  </Badge>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                  Notes for mentor (optional)
                </label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="What would you like to discuss?"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 shadow-lg"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Confirm Booking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowBookingModal(false)
                    setSelectedSlot(null)
                    setSelectedDate(null)
                    setBookingNotes('')
                  }}
                  className="border-2"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </div>

              {/* Info */}
              <p className="text-xs text-neutral-500 font-montserrat text-center pt-2">
                You'll receive a confirmation email with session details
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
