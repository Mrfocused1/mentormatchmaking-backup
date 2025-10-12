'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Save,
  Calendar,
  Clock,
  User,
  CheckCircle,
  Plus,
  X,
  Edit2,
  FileText,
  Target,
  Lightbulb,
  AlertCircle,
} from 'lucide-react'

// Mock session data
const mockSession = {
  id: '1',
  mentorName: 'Sarah Thompson',
  menteeName: 'Michael Chen',
  userRole: 'mentee',
  date: '2025-10-10',
  time: '2:00 PM - 3:00 PM',
  duration: '60 minutes',
  topic: 'Career Guidance Session',
  status: 'completed',
}

interface ActionItem {
  id: string
  text: string
  completed: boolean
  assignedTo: 'mentor' | 'mentee'
  dueDate?: string
}

interface Note {
  id: string
  content: string
  category: 'general' | 'key-point' | 'resource' | 'question'
}

export default function SessionNotesPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string

  // Notes state
  const [sessionSummary, setSessionSummary] = useState(
    'We discussed career transition strategies and portfolio optimization. Sarah provided valuable insights on building a personal brand and networking effectively in the design industry.'
  )
  const [keyTakeaways, setKeyTakeaways] = useState([
    'Focus on building a strong portfolio with 3-5 case studies',
    'Network authentically - quality over quantity',
    'Consider specializing in a specific area of product design',
  ])
  const [newTakeaway, setNewTakeaway] = useState('')

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: '1',
      text: 'Update portfolio with 2 new case studies',
      completed: false,
      assignedTo: 'mentee',
      dueDate: '2025-10-20',
    },
    {
      id: '2',
      text: 'Research and connect with 5 designers on LinkedIn',
      completed: false,
      assignedTo: 'mentee',
      dueDate: '2025-10-15',
    },
    {
      id: '3',
      text: 'Share design system resources',
      completed: true,
      assignedTo: 'mentor',
    },
  ])
  const [newActionItem, setNewActionItem] = useState('')
  const [newActionAssignee, setNewActionAssignee] = useState<'mentor' | 'mentee'>('mentee')
  const [newActionDueDate, setNewActionDueDate] = useState('')

  const [resources, setResources] = useState([
    { id: '1', title: 'Design Systems 101', url: 'https://example.com/design-systems', type: 'article' },
    { id: '2', title: 'Portfolio Best Practices', url: 'https://example.com/portfolio', type: 'guide' },
  ])
  const [newResource, setNewResource] = useState({ title: '', url: '' })

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Add key takeaway
  const handleAddTakeaway = () => {
    if (newTakeaway.trim()) {
      setKeyTakeaways(prev => [...prev, newTakeaway.trim()])
      setNewTakeaway('')
    }
  }

  // Remove key takeaway
  const handleRemoveTakeaway = (index: number) => {
    setKeyTakeaways(prev => prev.filter((_, i) => i !== index))
  }

  // Add action item
  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems(prev => [
        ...prev,
        {
          id: String(Date.now()),
          text: newActionItem.trim(),
          completed: false,
          assignedTo: newActionAssignee,
          dueDate: newActionDueDate || undefined,
        },
      ])
      setNewActionItem('')
      setNewActionDueDate('')
    }
  }

  // Toggle action item completion
  const toggleActionItem = (id: string) => {
    setActionItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    )
  }

  // Remove action item
  const handleRemoveActionItem = (id: string) => {
    setActionItems(prev => prev.filter(item => item.id !== id))
  }

  // Add resource
  const handleAddResource = () => {
    if (newResource.title.trim() && newResource.url.trim()) {
      setResources(prev => [
        ...prev,
        {
          id: String(Date.now()),
          title: newResource.title.trim(),
          url: newResource.url.trim(),
          type: 'link',
        },
      ])
      setNewResource({ title: '', url: '' })
    }
  }

  // Remove resource
  const handleRemoveResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  // Save notes
  const handleSaveNotes = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSaving(false)
    setLastSaved(new Date())
  }

  // Calculate progress
  const completedActionItems = actionItems.filter(item => item.completed).length
  const totalActionItems = actionItems.length
  const progressPercentage =
    totalActionItems > 0 ? Math.round((completedActionItems / totalActionItems) * 100) : 0

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/sessions"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Sessions</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl mb-2">
            Session Notes & Summary
          </h1>
          <p className="text-white/80 font-montserrat">
            Document key takeaways and action items from your session
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Session Info Card */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-primary-dark text-white">
              <CardTitle className="font-montserrat">Session Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar
                  fallback={
                    mockSession.userRole === 'mentor'
                      ? mockSession.menteeName
                      : mockSession.mentorName
                  }
                  size="md"
                  className="border-2 border-primary-accent"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-1">
                    {mockSession.topic}
                  </h3>
                  <p className="text-sm text-neutral-600 font-montserrat mb-3">
                    with{' '}
                    {mockSession.userRole === 'mentor'
                      ? mockSession.menteeName
                      : mockSession.mentorName}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.duration}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="success" className="bg-green-100 text-green-700 border-green-300">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Items Progress */}
          {totalActionItems > 0 && (
            <Card className="shadow-lg mb-8 border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold font-montserrat text-blue-900">
                      Action Items Progress
                    </h3>
                  </div>
                  <span className="text-2xl font-black font-montserrat text-blue-600">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-blue-800 font-montserrat">
                  {completedActionItems} of {totalActionItems} action items completed
                </p>
              </CardContent>
            </Card>
          )}

          {/* Session Summary */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                <FileText className="h-5 w-5 text-secondary-accent" />
                Session Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={sessionSummary}
                onChange={e => setSessionSummary(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat text-neutral-800 resize-none"
                placeholder="Write a brief summary of what was discussed in this session..."
              />
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {keyTakeaways.map((takeaway, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg group"
                  >
                    <CheckCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="flex-1 text-sm font-montserrat text-neutral-800">{takeaway}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTakeaway(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add Takeaway */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTakeaway}
                  onChange={e => setNewTakeaway(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTakeaway()}
                  placeholder="Add a key takeaway..."
                  className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                />
                <Button
                  onClick={handleAddTakeaway}
                  variant="primary"
                  disabled={!newTakeaway.trim()}
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                <Target className="h-5 w-5 text-blue-600" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {actionItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg group transition-all ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleActionItem(item.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-green-600 border-green-600'
                          : 'border-neutral-300 hover:border-blue-600'
                      }`}
                    >
                      {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                    </button>

                    <div className="flex-1">
                      <p
                        className={`text-sm font-montserrat mb-2 ${
                          item.completed ? 'line-through text-neutral-500' : 'text-neutral-800'
                        }`}
                      >
                        {item.text}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          size="sm"
                          className={
                            item.assignedTo === 'mentor'
                              ? 'bg-purple-100 text-purple-700 border-purple-300'
                              : 'bg-blue-100 text-blue-700 border-blue-300'
                          }
                        >
                          <User className="h-3 w-3 mr-1" />
                          {item.assignedTo === 'mentor' ? 'Mentor' : 'Mentee'}
                        </Badge>
                        {item.dueDate && (
                          <Badge variant="outline" size="sm" className="text-neutral-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            Due: {item.dueDate}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveActionItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add Action Item */}
              <div className="space-y-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <input
                  type="text"
                  value={newActionItem}
                  onChange={e => setNewActionItem(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleAddActionItem()}
                  placeholder="Add a new action item..."
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                />
                <div className="flex flex-wrap gap-3">
                  <select
                    value={newActionAssignee}
                    onChange={e => setNewActionAssignee(e.target.value as 'mentor' | 'mentee')}
                    className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat text-sm"
                  >
                    <option value="mentee">Assign to Mentee</option>
                    <option value="mentor">Assign to Mentor</option>
                  </select>
                  <input
                    type="date"
                    value={newActionDueDate}
                    onChange={e => setNewActionDueDate(e.target.value)}
                    className="px-3 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat text-sm"
                  />
                  <Button
                    onClick={handleAddActionItem}
                    variant="primary"
                    disabled={!newActionItem.trim()}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Action Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources & Links */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                <FileText className="h-5 w-5 text-green-600" />
                Resources & Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {resources.map(resource => (
                  <div
                    key={resource.id}
                    className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold font-montserrat text-neutral-800 mb-1">
                        {resource.title}
                      </h4>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:text-green-700 font-montserrat hover:underline break-all"
                      >
                        {resource.url}
                      </a>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveResource(resource.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add Resource */}
              <div className="space-y-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <input
                  type="text"
                  value={newResource.title}
                  onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="Resource title..."
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                />
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={e => setNewResource({ ...newResource, url: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && handleAddResource()}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                  />
                  <Button
                    onClick={handleAddResource}
                    variant="primary"
                    disabled={!newResource.title.trim() || !newResource.url.trim()}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-600 font-montserrat">
              {lastSaved ? (
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              ) : (
                <span className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  Unsaved changes
                </span>
              )}
            </div>
            <Button
              onClick={handleSaveNotes}
              disabled={isSaving}
              className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 font-bold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-dark mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
