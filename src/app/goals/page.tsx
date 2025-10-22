'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Target,
  Plus,
  Calendar,
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  TrendingUp,
  Award,
  Clock,
  X,
  Flag,
  BarChart3,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface Milestone {
  id: string
  text: string
  completed: boolean
  completedDate?: string
}

interface Goal {
  id: string
  title: string
  description: string
  category: 'career' | 'skill' | 'project' | 'networking' | 'other'
  priority: 'high' | 'medium' | 'low'
  deadline: string
  progress: number
  milestones: Milestone[]
  createdDate: string
  status: 'active' | 'completed' | 'archived'
}

const categoryConfig = {
  career: { color: 'bg-blue-500', label: 'Career' },
  skill: { color: 'bg-purple-500', label: 'Skill' },
  project: { color: 'bg-green-500', label: 'Project' },
  networking: { color: 'bg-yellow-500', label: 'Networking' },
  other: { color: 'bg-neutral-500', label: 'Other' },
}

const priorityConfig = {
  high: { color: 'text-red-600', bgColor: 'bg-red-100', label: 'High Priority' },
  medium: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Medium Priority' },
  low: { color: 'text-green-600', bgColor: 'bg-green-100', label: 'Low Priority' },
}

export default function GoalsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [goals, setGoals] = useState<Goal[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<'active' | 'completed' | 'all'>('active')
  const [showNewGoalModal, setShowNewGoalModal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'career' as Goal['category'],
    priority: 'medium' as Goal['priority'],
    deadline: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Helper functions to convert between database and UI formats
  const toDbCategory = (cat: string) => cat.toUpperCase()
  const fromDbCategory = (cat: string) => cat.toLowerCase() as Goal['category']
  const toDbPriority = (pri: string) => pri.toUpperCase()
  const fromDbPriority = (pri: string) => pri.toLowerCase() as Goal['priority']
  const toDbStatus = (stat: string) => stat.toUpperCase()
  const fromDbStatus = (stat: string) => stat.toLowerCase() as Goal['status']

  // Fetch goals from database
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setCurrentUserId(user.id)

        // Fetch goals with milestones
        const { data: goalsData, error: goalsError } = await supabase
          .from('Goal')
          .select(`
            id,
            title,
            description,
            category,
            priority,
            deadline,
            progress,
            status,
            createdAt,
            Milestone (
              id,
              text,
              completed,
              completedDate
            )
          `)
          .eq('userId', user.id)
          .order('createdAt', { ascending: false })

        if (goalsError) throw goalsError

        // Transform to frontend format
        const transformedGoals: Goal[] = (goalsData || []).map((goal: any) => ({
          id: goal.id,
          title: goal.title,
          description: goal.description || '',
          category: fromDbCategory(goal.category),
          priority: fromDbPriority(goal.priority),
          deadline: new Date(goal.deadline).toISOString().split('T')[0],
          progress: goal.progress,
          milestones: (goal.Milestone || []).map((m: any) => ({
            id: m.id,
            text: m.text,
            completed: m.completed,
            completedDate: m.completedDate ? new Date(m.completedDate).toISOString().split('T')[0] : undefined,
          })),
          createdDate: new Date(goal.createdAt).toISOString().split('T')[0],
          status: fromDbStatus(goal.status),
        }))

        setGoals(transformedGoals)
      } catch (err) {
        console.error('Error fetching goals:', err)
        setError(err instanceof Error ? err.message : 'Failed to load goals')
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
  }, [supabase, router])

  // Filter goals
  const filteredGoals = goals.filter(goal => {
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus
    return categoryMatch && statusMatch
  })

  // Calculate stats
  const totalGoals = goals.filter(g => g.status === 'active').length
  const completedGoals = goals.filter(g => g.status === 'completed').length
  const averageProgress =
    goals.filter(g => g.status === 'active').length > 0
      ? Math.round(
          goals.filter(g => g.status === 'active').reduce((acc, g) => acc + g.progress, 0) /
            goals.filter(g => g.status === 'active').length
        )
      : 0

  // Toggle milestone
  const toggleMilestone = async (goalId: string, milestoneId: string) => {
    try {
      const goal = goals.find(g => g.id === goalId)
      const milestone = goal?.milestones.find(m => m.id === milestoneId)
      if (!goal || !milestone) return

      const newCompleted = !milestone.completed
      const newCompletedDate = newCompleted ? new Date().toISOString() : null

      // Update milestone in database
      const { error: milestoneError } = await supabase
        .from('Milestone')
        .update({
          completed: newCompleted,
          completedDate: newCompletedDate,
        })
        .eq('id', milestoneId)

      if (milestoneError) throw milestoneError

      // Calculate new progress
      const updatedMilestones = goal.milestones.map(m =>
        m.id === milestoneId
          ? { ...m, completed: newCompleted, completedDate: newCompletedDate ? newCompletedDate.split('T')[0] : undefined }
          : m
      )
      const completedCount = updatedMilestones.filter(m => m.completed).length
      const newProgress = Math.round((completedCount / updatedMilestones.length) * 100)
      const newStatus = newProgress === 100 ? 'completed' : 'active'

      // Update goal progress and status in database
      const { error: goalError } = await supabase
        .from('Goal')
        .update({
          progress: newProgress,
          status: toDbStatus(newStatus),
        })
        .eq('id', goalId)

      if (goalError) throw goalError

      // Update local state
      setGoals(prev =>
        prev.map(g =>
          g.id === goalId
            ? { ...g, milestones: updatedMilestones, progress: newProgress, status: newStatus }
            : g
        )
      )
    } catch (err) {
      console.error('Error toggling milestone:', err)
      alert('Failed to update milestone. Please try again.')
    }
  }

  // Delete goal
  const deleteGoal = async (goalId: string) => {
    if (!confirm('Are you sure you want to delete this goal?')) return

    try {
      const { error } = await supabase
        .from('Goal')
        .delete()
        .eq('id', goalId)

      if (error) throw error

      setGoals(prev => prev.filter(g => g.id !== goalId))
    } catch (err) {
      console.error('Error deleting goal:', err)
      alert('Failed to delete goal. Please try again.')
    }
  }

  // Create new goal
  const createGoal = async () => {
    if (!newGoal.title.trim() || !newGoal.deadline || !currentUserId) return

    try {
      const { data, error } = await supabase
        .from('Goal')
        .insert({
          userId: currentUserId,
          title: newGoal.title.trim(),
          description: newGoal.description.trim() || null,
          category: toDbCategory(newGoal.category),
          priority: toDbPriority(newGoal.priority),
          deadline: new Date(newGoal.deadline).toISOString(),
          progress: 0,
          status: 'ACTIVE',
        })
        .select()
        .single()

      if (error) throw error

      const goal: Goal = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        category: fromDbCategory(data.category),
        priority: fromDbPriority(data.priority),
        deadline: new Date(data.deadline).toISOString().split('T')[0],
        progress: 0,
        milestones: [],
        createdDate: new Date(data.createdAt).toISOString().split('T')[0],
        status: 'active',
      }

      setGoals(prev => [goal, ...prev])
      setNewGoal({
        title: '',
        description: '',
        category: 'career',
        priority: 'medium',
        deadline: '',
      })
      setShowNewGoalModal(false)
    } catch (err) {
      console.error('Error creating goal:', err)
      alert('Failed to create goal. Please try again.')
    }
  }

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
                Goals & Progress
              </h1>
              <p className="text-white/80 font-montserrat">
                Set goals, track milestones, and measure your growth
              </p>
            </div>
            <Button
              onClick={() => setShowNewGoalModal(true)}
              className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 font-bold"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Loading your goals...
                </h3>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Error loading goals
                </h3>
                <p className="text-neutral-600 font-montserrat mb-8">{error}</p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-blue-600" />
                  <span className="text-3xl font-black font-montserrat text-blue-600">
                    {totalGoals}
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-900 font-montserrat">Active Goals</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-8 w-8 text-green-600" />
                  <span className="text-3xl font-black font-montserrat text-green-600">
                    {completedGoals}
                  </span>
                </div>
                <p className="text-sm font-semibold text-green-900 font-montserrat">
                  Goals Completed
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <span className="text-3xl font-black font-montserrat text-purple-600">
                    {averageProgress}%
                  </span>
                </div>
                <p className="text-sm font-semibold text-purple-900 font-montserrat">
                  Average Progress
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-neutral-700 font-montserrat">
              Category:
            </span>
            <Button
              variant={filterCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterCategory('all')}
              className={filterCategory === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              All
            </Button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={filterCategory === key ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterCategory(key)}
                className={filterCategory === key ? `${config.color} text-white` : ''}
              >
                {config.label}
              </Button>
            ))}

            <span className="ml-4 text-sm font-semibold text-neutral-700 font-montserrat">
              Status:
            </span>
            <Button
              variant={filterStatus === 'active' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus('active')}
              className={filterStatus === 'active' ? 'bg-blue-600 text-white' : ''}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus('completed')}
              className={filterStatus === 'completed' ? 'bg-green-600 text-white' : ''}
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              All
            </Button>
          </div>

          {/* Goals List */}
          {filteredGoals.length > 0 ? (
            <div className="space-y-6">
              {filteredGoals.map(goal => {
                const categoryData = categoryConfig[goal.category]
                const priorityData = priorityConfig[goal.priority]

                return (
                  <Card key={goal.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="border-b border-neutral-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-black font-montserrat text-primary-dark">
                              {goal.title}
                            </h3>
                            <Badge className={`${categoryData.color} text-white`} size="sm">
                              {categoryData.label}
                            </Badge>
                            <Badge
                              className={`${priorityData.bgColor} ${priorityData.color}`}
                              size="sm"
                            >
                              <Flag className="h-3 w-3 mr-1" />
                              {priorityData.label}
                            </Badge>
                          </div>
                          {goal.description && (
                            <p className="text-sm text-neutral-600 font-montserrat mb-3">
                              {goal.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-neutral-500 font-montserrat">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {goal.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Created: {goal.createdDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-neutral-600">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteGoal(goal.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-neutral-700 font-montserrat">
                            Overall Progress
                          </span>
                          <span className="text-2xl font-black font-montserrat text-primary-dark">
                            {goal.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`${categoryData.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestones */}
                      {goal.milestones.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold font-montserrat text-neutral-700 mb-3">
                            Milestones ({goal.milestones.filter(m => m.completed).length}/
                            {goal.milestones.length})
                          </h4>
                          <div className="space-y-2">
                            {goal.milestones.map(milestone => (
                              <button
                                key={milestone.id}
                                onClick={() => toggleMilestone(goal.id, milestone.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all group ${
                                  milestone.completed
                                    ? 'bg-green-50 hover:bg-green-100'
                                    : 'bg-neutral-50 hover:bg-neutral-100'
                                }`}
                              >
                                {milestone.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                ) : (
                                  <Circle className="h-5 w-5 text-neutral-400 flex-shrink-0 group-hover:text-neutral-600" />
                                )}
                                <span
                                  className={`flex-1 text-left text-sm font-montserrat ${
                                    milestone.completed
                                      ? 'line-through text-neutral-500'
                                      : 'text-neutral-800'
                                  }`}
                                >
                                  {milestone.text}
                                </span>
                                {milestone.completedDate && (
                                  <span className="text-xs text-green-600 font-montserrat">
                                    {milestone.completedDate}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {goal.status === 'completed' && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                          <div className="flex items-center gap-2 text-green-800">
                            <Award className="h-5 w-5" />
                            <span className="font-bold font-montserrat">
                              Goal Completed! 🎉
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                  No goals found
                </h3>
                <p className="text-neutral-500 font-montserrat mb-6">
                  {filterCategory === 'all' && filterStatus === 'all'
                    ? "You haven't set any goals yet. Create your first goal to start tracking your progress!"
                    : 'No goals match your current filters. Try adjusting the filters above.'}
                </p>
                {filterCategory === 'all' && filterStatus === 'all' && (
                  <Button
                    onClick={() => setShowNewGoalModal(true)}
                    className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Goal
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
            </>
          )}
        </div>
      </section>

      {/* New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <CardTitle className="font-montserrat text-primary-dark">
                  Create New Goal
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewGoalModal(false)}
                  className="text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 font-montserrat mb-2">
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Build a Strong Design Portfolio"
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 font-montserrat mb-2">
                  Description
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={e => setNewGoal({ ...newGoal, description: e.target.value })}
                  rows={3}
                  placeholder="Describe your goal..."
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 font-montserrat mb-2">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={e => setNewGoal({ ...newGoal, category: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                  >
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 font-montserrat mb-2">
                    Priority
                  </label>
                  <select
                    value={newGoal.priority}
                    onChange={e => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 font-montserrat mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={createGoal}
                  disabled={!newGoal.title.trim() || !newGoal.deadline}
                  className="flex-1 bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewGoalModal(false)}
                  className="flex-1"
                >
                  Cancel
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
