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
  Eye
} from 'lucide-react'

// Mock mentor data
const mockMentor = {
  id: 'john-smith',
  name: 'John Smith',
  title: 'Senior Product Manager',
  company: 'Google',
  location: 'San Francisco, CA',
  avatar: null,
  rating: 4.9,
  reviewCount: 127,
  totalSessions: 250,
  responseTime: '< 2 hours',
  bio: 'Experienced product leader with 10+ years building products at scale. Passionate about helping aspiring PMs grow their careers and build amazing products.',
  expertise: ['Product Strategy', 'User Research', 'Roadmap Planning', 'Stakeholder Management'],
  achievements: [
    'Launched 5 products reaching 10M+ users',
    'Former Director of Product at Airbnb',
    'MBA from Stanford GSB'
  ]
}

// Mock availability slots
const mockSlots = [
  {
    id: 1,
    date: '2025-10-15',
    day: 'Monday',
    slots: [
      { id: 101, time: '09:00 AM', duration: 60, type: 'Career Coaching', available: true },
      { id: 102, time: '10:00 AM', duration: 60, type: 'Career Coaching', available: true },
      { id: 103, time: '11:00 AM', duration: 60, type: 'Career Coaching', available: false },
      { id: 104, time: '02:00 PM', duration: 60, type: 'Technical Review', available: true },
      { id: 105, time: '03:00 PM', duration: 60, type: 'Technical Review', available: true },
      { id: 106, time: '04:00 PM', duration: 60, type: 'Technical Review', available: false }
    ]
  },
  {
    id: 2,
    date: '2025-10-16',
    day: 'Tuesday',
    slots: []
  },
  {
    id: 3,
    date: '2025-10-17',
    day: 'Wednesday',
    slots: [
      { id: 201, time: '10:00 AM', duration: 60, type: 'Product Strategy', available: true },
      { id: 202, time: '11:00 AM', duration: 60, type: 'Product Strategy', available: true },
      { id: 203, time: '01:00 PM', duration: 60, type: 'Product Strategy', available: true }
    ]
  },
  {
    id: 4,
    date: '2025-10-18',
    day: 'Thursday',
    slots: []
  },
  {
    id: 5,
    date: '2025-10-19',
    day: 'Friday',
    slots: [
      { id: 301, time: '03:00 PM', duration: 60, type: 'Interview Prep', available: true },
      { id: 302, time: '04:00 PM', duration: 60, type: 'Interview Prep', available: true },
      { id: 303, time: '05:00 PM', duration: 60, type: 'Interview Prep', available: true }
    ]
  }
]

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

export default function BookSessionPage({ params }: { params: { mentorId: string } }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingNotes, setBookingNotes] = useState('')
  const [currentWeekStart, setCurrentWeekStart] = useState(0)

  // Connection status - in production, this would come from API
  // 'none' = not connected, 'pending' = request sent, 'connected' = can book
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>('none')
  const [showInterestModal, setShowInterestModal] = useState(false)

  // Get week of dates
  const getWeekDates = () => {
    return mockSlots.slice(currentWeekStart, currentWeekStart + 7)
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
    if (currentWeekStart + 7 < mockSlots.length) {
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
  const handleShowInterest = () => {
    // In production, this would send interest request via API
    setConnectionStatus('pending')
    setShowInterestModal(false)
    alert('Connection request sent! You\'ll be notified when the mentor accepts.')
  }

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // In production, this would create a booking via API
    alert(`Session booked!\n\nDate: ${selectedDate}\nTime: ${selectedSlot.time}\nType: ${selectedSlot.type}`)
    setShowBookingModal(false)
    setBookingNotes('')
    setSelectedSlot(null)
    setSelectedDate(null)
  }

  // Get selected date object
  const selectedDateObj = mockSlots.find(d => d.date === selectedDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-dark to-secondary-accent/20">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="shadow-2xl overflow-hidden border-0">
            {/* Mentor Profile Header */}
            <div className="bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="relative">
                  <Avatar fallback={mockMentor.name} size="2xl" className="border-4 border-white shadow-xl" />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl font-black font-montserrat text-primary-dark mb-2">
                        {mockMentor.name}
                      </h1>
                      <p className="text-lg font-semibold font-montserrat text-neutral-700">
                        {mockMentor.title}
                      </p>
                      <p className="text-md font-montserrat text-neutral-600">
                        @ {mockMentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-xl font-bold font-montserrat text-primary-dark">
                        {mockMentor.rating}
                      </span>
                      <span className="text-sm text-neutral-600">
                        ({mockMentor.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <MapPin className="h-4 w-4 text-primary-accent" />
                      {mockMentor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <Users className="h-4 w-4 text-secondary-accent" />
                      {mockMentor.totalSessions} sessions completed
                    </div>
                    <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                      <Clock className="h-4 w-4 text-vibrant-accent" />
                      Responds in {mockMentor.responseTime}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-neutral-700 font-montserrat leading-relaxed mb-4">
                    {mockMentor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {mockMentor.expertise.map((skill, idx) => (
                      <Badge key={idx} className="bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 border-t-2 border-neutral-100">
              <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mockMentor.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-montserrat text-neutral-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Connection Status Banner */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {connectionStatus === 'none' && (
            <Card className="shadow-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
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
                      You can view {mockMentor.name}'s availability, but you need to connect first before booking a session. Send a connection request to get started!
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowInterestModal(true)}
                      className="bg-gradient-to-r from-secondary-accent to-vibrant-accent text-white hover:from-secondary-accent/90 hover:to-vibrant-accent/90 shadow-lg"
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
            <Card className="shadow-xl border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50">
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
                      Your connection request has been sent to {mockMentor.name}. You'll be able to book sessions once they accept your request. Mentors typically respond within {mockMentor.responseTime}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {connectionStatus === 'connected' && (
            <Card className="shadow-xl border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50">
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
                      You can now book sessions with {mockMentor.name}. Select any available time slot below to schedule your mentorship session.
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
                : `See when ${mockMentor.name} is available for mentorship sessions`
              }
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            {/* Session Types */}
            <div className="bg-gradient-to-r from-neutral-50 to-white p-6 border-b-2 border-neutral-100">
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
            <CardHeader className="bg-gradient-to-r from-secondary-accent to-vibrant-accent text-white">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Connect with {mockMentor.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Mentor Summary */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl">
                <Avatar fallback={mockMentor.name} size="lg" className="border-2 border-white shadow-md" />
                <div className="flex-1">
                  <h3 className="font-bold font-montserrat text-primary-dark">{mockMentor.name}</h3>
                  <p className="text-sm font-montserrat text-neutral-600">{mockMentor.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-primary-dark">{mockMentor.rating}</span>
                    <span className="text-xs text-neutral-500">({mockMentor.totalSessions} sessions)</span>
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
                      Once {mockMentor.name} accepts your request, you'll be able to book mentorship sessions directly. You can view their availability now to help you decide!
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
                  className="flex-1 bg-gradient-to-r from-secondary-accent to-vibrant-accent text-white hover:from-secondary-accent/90 hover:to-vibrant-accent/90 shadow-lg"
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
                ⏱️ {mockMentor.name} typically responds within {mockMentor.responseTime}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary-accent to-secondary-accent text-primary-dark">
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
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{mockMentor.name}</span>
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
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{selectedSlot?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Duration</span>
                  <span className="text-sm font-bold font-montserrat text-primary-dark">{selectedSlot?.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold font-montserrat text-neutral-600">Type</span>
                  <Badge className={sessionTypeInfo[selectedSlot?.type]?.color}>
                    {selectedSlot?.type}
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
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg"
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
