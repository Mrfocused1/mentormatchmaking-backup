'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit,
  Copy,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react'

// Time slot type
interface TimeSlot {
  id: number
  dayOfWeek: string
  startTime: string
  endTime: string
  duration: number // in minutes
  sessionType: string
  price: number
  maxBookings: number
  currentBookings: number
}

// Mock availability data
const mockAvailability: TimeSlot[] = [
  {
    id: 1,
    dayOfWeek: 'Monday',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    duration: 60,
    sessionType: 'Career Coaching',
    price: 0,
    maxBookings: 3,
    currentBookings: 1
  },
  {
    id: 2,
    dayOfWeek: 'Monday',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    duration: 60,
    sessionType: 'Technical Review',
    price: 0,
    maxBookings: 3,
    currentBookings: 2
  },
  {
    id: 3,
    dayOfWeek: 'Wednesday',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    duration: 60,
    sessionType: 'Product Strategy',
    price: 0,
    maxBookings: 3,
    currentBookings: 0
  },
  {
    id: 4,
    dayOfWeek: 'Friday',
    startTime: '03:00 PM',
    endTime: '06:00 PM',
    duration: 60,
    sessionType: 'Interview Prep',
    price: 0,
    maxBookings: 3,
    currentBookings: 3
  }
]

// Default session types that can be customized
const defaultSessionTypes = [
  'Career Coaching',
  'Technical Review',
  'Product Strategy',
  'Interview Prep',
  'Resume Review',
  'Portfolio Review',
  'General Discussion'
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<TimeSlot[]>(mockAvailability)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sessionTypes, setSessionTypes] = useState<string[]>(defaultSessionTypes)
  const [showSessionTypeManager, setShowSessionTypeManager] = useState(false)
  const [newSessionTypeName, setNewSessionTypeName] = useState('')
  const [editingSessionType, setEditingSessionType] = useState<{ old: string; new: string } | null>(null)
  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    duration: 60,
    sessionType: 'Career Coaching',
    maxBookings: 1
  })

  // Get unique booking link
  const bookingLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/sessions/book/john-smith`

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(bookingLink)
    alert('Booking link copied to clipboard!')
  }

  // Share link
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Book a session with me',
        text: 'Schedule a mentorship session',
        url: bookingLink
      })
    } else {
      copyLink()
    }
  }

  // Add new time slot
  const handleAddSlot = () => {
    const slot: TimeSlot = {
      id: Date.now(),
      ...newSlot,
      price: 0,
      currentBookings: 0
    }
    setAvailability([...availability, slot])
    setShowAddForm(false)
    // Reset form
    setNewSlot({
      dayOfWeek: 'Monday',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      duration: 60,
      sessionType: 'Career Coaching',
      maxBookings: 1
    })
  }

  // Delete time slot
  const handleDeleteSlot = (id: number) => {
    if (confirm('Are you sure you want to delete this availability slot?')) {
      setAvailability(availability.filter(slot => slot.id !== id))
    }
  }

  // Add new session type
  const handleAddSessionType = () => {
    if (newSessionTypeName.trim() && !sessionTypes.includes(newSessionTypeName.trim())) {
      setSessionTypes([...sessionTypes, newSessionTypeName.trim()])
      setNewSessionTypeName('')
      alert('Session type added successfully!')
    } else if (sessionTypes.includes(newSessionTypeName.trim())) {
      alert('This session type already exists!')
    }
  }

  // Start editing session type
  const handleStartEdit = (typeName: string) => {
    setEditingSessionType({ old: typeName, new: typeName })
  }

  // Save edited session type
  const handleSaveEdit = () => {
    if (editingSessionType && editingSessionType.new.trim()) {
      // Update session types list
      const updatedTypes = sessionTypes.map(type =>
        type === editingSessionType.old ? editingSessionType.new.trim() : type
      )
      setSessionTypes(updatedTypes)

      // Update all existing slots with this session type
      const updatedAvailability = availability.map(slot =>
        slot.sessionType === editingSessionType.old
          ? { ...slot, sessionType: editingSessionType.new.trim() }
          : slot
      )
      setAvailability(updatedAvailability)

      setEditingSessionType(null)
      alert('Session type updated successfully!')
    }
  }

  // Delete session type
  const handleDeleteSessionType = (typeName: string) => {
    // Check if any slots use this type
    const slotsUsingType = availability.filter(slot => slot.sessionType === typeName)

    if (slotsUsingType.length > 0) {
      if (!confirm(`${slotsUsingType.length} time slot(s) are using "${typeName}". Deleting this will remove those slots. Continue?`)) {
        return
      }
      // Remove slots using this type
      setAvailability(availability.filter(slot => slot.sessionType !== typeName))
    }

    setSessionTypes(sessionTypes.filter(type => type !== typeName))
    alert('Session type deleted successfully!')
  }

  // Group slots by day
  const slotsByDay = daysOfWeek.map(day => ({
    day,
    slots: availability.filter(slot => slot.dayOfWeek === day)
  }))

  // Calculate stats
  const totalSlots = availability.reduce((sum, slot) => sum + slot.maxBookings, 0)
  const bookedSlots = availability.reduce((sum, slot) => sum + slot.currentBookings, 0)
  const availableSlots = totalSlots - bookedSlots

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
            Manage Availability
          </h1>
          <p className="mt-2 text-white/80 font-montserrat">
            Set your mentorship availability and let mentees book sessions with you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats & Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Availability Stats */}
              <Card className="shadow-xl border-2 border-primary-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg">Availability Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary-accent/10 rounded-xl p-4">
                    <div className="text-3xl font-black font-montserrat text-primary-dark mb-1">
                      {availableSlots}
                    </div>
                    <div className="text-sm font-montserrat text-neutral-600">
                      Available Slots
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-2xl font-bold font-montserrat text-green-600">
                        {bookedSlots}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        Booked
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-2xl font-bold font-montserrat text-blue-600">
                        {totalSlots}
                      </div>
                      <div className="text-xs font-montserrat text-neutral-600">
                        Total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Link */}
              <Card className="shadow-xl border-2 border-secondary-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg">Your Booking Link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-montserrat text-neutral-600">
                    Share this link with mentees so they can book sessions with you
                  </p>
                  <div className="bg-neutral-50 rounded-lg p-3 break-all text-sm font-mono text-primary-accent">
                    {bookingLink}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyLink}
                      className="flex-1 border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={shareLink}
                      className="flex-1 border-secondary-accent text-secondary-accent hover:bg-secondary-accent/10"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Link href={bookingLink}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-neutral-600 hover:text-primary-accent"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview Public Page
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Session Types Manager */}
              <Card className="shadow-xl border-2 border-vibrant-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Session Types</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSessionTypeManager(!showSessionTypeManager)}
                      className="text-vibrant-accent"
                    >
                      {showSessionTypeManager ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!showSessionTypeManager ? (
                    // Display mode
                    <div className="space-y-2">
                      {sessionTypes.map((type, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                          <div className="w-2 h-2 bg-secondary-accent rounded-full"></div>
                          <span className="text-sm font-montserrat text-neutral-700 flex-1">{type}</span>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSessionTypeManager(true)}
                        className="w-full text-vibrant-accent hover:bg-vibrant-accent/10 mt-2"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Manage Types
                      </Button>
                    </div>
                  ) : (
                    // Edit mode
                    <div className="space-y-3">
                      {/* Add new type */}
                      <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                        <label className="block text-xs font-semibold font-montserrat text-neutral-700 mb-2">
                          Add New Session Type
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newSessionTypeName}
                            onChange={(e) => setNewSessionTypeName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSessionType()}
                            placeholder="e.g., Mock Interview"
                            className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleAddSessionType}
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Existing types */}
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {sessionTypes.map((type, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                            {editingSessionType?.old === type ? (
                              // Edit mode for this type
                              <>
                                <input
                                  type="text"
                                  value={editingSessionType.new}
                                  onChange={(e) => setEditingSessionType({ ...editingSessionType, new: e.target.value })}
                                  className="flex-1 px-2 py-1 border border-primary-accent rounded font-montserrat text-sm focus:outline-none focus:ring-1 focus:ring-primary-accent"
                                  autoFocus
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  className="text-green-600 hover:bg-green-50 p-1"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingSessionType(null)}
                                  className="text-neutral-500 hover:bg-neutral-100 p-1"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              // Display mode for this type
                              <>
                                <span className="text-sm font-montserrat text-neutral-700 flex-1">{type}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStartEdit(type)}
                                  className="text-primary-accent hover:bg-primary-accent/10 p-1"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSessionType(type)}
                                  className="text-red-600 hover:bg-red-50 p-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSessionTypeManager(false)}
                        className="w-full"
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="shadow-md bg-vibrant-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-vibrant-accent" />
                    Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-montserrat text-neutral-700">
                    • Keep your availability updated
                  </p>
                  <p className="text-sm font-montserrat text-neutral-700">
                    • Block off personal time
                  </p>
                  <p className="text-sm font-montserrat text-neutral-700">
                    • Set realistic session durations
                  </p>
                  <p className="text-sm font-montserrat text-neutral-700">
                    • Customize your session types
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Availability Schedule */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add New Slot Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black font-montserrat text-primary-dark">
                  Weekly Schedule
                </h2>
                <Button
                  variant="primary"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary-accent text-primary-dark shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </div>

              {/* Add Slot Form */}
              {showAddForm && (
                <Card className="shadow-xl border-2 border-primary-accent">
                  <CardHeader>
                    <CardTitle>Add New Availability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Day of Week
                        </label>
                        <select
                          value={newSlot.dayOfWeek}
                          onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        >
                          {daysOfWeek.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Session Type
                        </label>
                        <select
                          value={newSlot.sessionType}
                          onChange={(e) => setNewSlot({ ...newSlot, sessionType: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        >
                          {sessionTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Session Duration (minutes)
                        </label>
                        <select
                          value={newSlot.duration}
                          onChange={(e) => setNewSlot({ ...newSlot, duration: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        >
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">60 minutes</option>
                          <option value="90">90 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Max Bookings Per Slot
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={newSlot.maxBookings}
                          onChange={(e) => setNewSlot({ ...newSlot, maxBookings: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="primary"
                        onClick={handleAddSlot}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Add Availability
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Weekly Schedule */}
              <div className="space-y-4">
                {slotsByDay.map(({ day, slots }) => (
                  <Card key={day} className="shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-primary-dark">{day}</CardTitle>
                        <Badge variant="secondary" className="bg-neutral-100 text-neutral-700">
                          {slots.length} slot{slots.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {slots.length > 0 ? (
                        <div className="space-y-3">
                          {slots.map(slot => (
                            <div
                              key={slot.id}
                              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-accent transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge className="bg-secondary-accent text-white">
                                    {slot.sessionType}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={
                                      slot.currentBookings >= slot.maxBookings
                                        ? 'border-red-600 text-red-600'
                                        : 'border-green-600 text-green-600'
                                    }
                                  >
                                    {slot.currentBookings}/{slot.maxBookings} booked
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-montserrat text-neutral-600">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-primary-accent" />
                                    {slot.startTime} - {slot.endTime}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-secondary-accent" />
                                    {slot.duration} min sessions
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSlot(slot.id)}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-sm font-montserrat text-neutral-500">
                            No availability set for {day}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
