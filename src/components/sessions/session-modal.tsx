'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Calendar, Clock, FileText, Loader2 } from 'lucide-react'

interface SessionModalProps {
  isOpen: boolean
  onClose: () => void
  mentorId: string
  menteeId: string
  mentorName?: string
  menteeName?: string
  onSuccess?: () => void
}

export function SessionModal({
  isOpen,
  onClose,
  mentorId,
  menteeId,
  mentorName,
  menteeName,
  onSuccess,
}: SessionModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    scheduledAt: '',
    duration: '60',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId,
          menteeId,
          title: formData.title || 'Mentorship Session',
          scheduledAt: formData.scheduledAt,
          duration: parseInt(formData.duration),
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create session')
      }

      alert('Session scheduled successfully!')
      onSuccess?.()
      onClose()

      // Reset form
      setFormData({
        title: '',
        scheduledAt: '',
        duration: '60',
        notes: '',
      })
    } catch (err) {
      console.error('Error creating session:', err)
      alert(err instanceof Error ? err.message : 'Failed to create session')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
              Schedule Session
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Participants Info */}
          {(mentorName || menteeName) && (
            <div className="mb-6 p-4 bg-primary-accent/10 rounded-lg">
              <p className="text-sm font-montserrat text-neutral-700">
                <span className="font-semibold">Mentor:</span> {mentorName || 'You'}
              </p>
              <p className="text-sm font-montserrat text-neutral-700 mt-1">
                <span className="font-semibold">Mentee:</span> {menteeName || 'You'}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Session Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Career Development Discussion"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>

            {/* Date and Time */}
            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                Date & Time *
              </label>
              <input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                <Clock className="inline h-4 w-4 mr-2" />
                Duration (minutes)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                placeholder="Add any topics or goals for this session..."
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary-accent text-primary-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Session
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
