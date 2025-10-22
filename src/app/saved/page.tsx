'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
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
  Heart,
  Star,
  MapPin,
  Briefcase,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Folder,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Filter,
  Grid3x3,
  List,
  FolderOpen,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface SavedMentor {
  id: string
  name: string
  avatar: string | null
  role: string
  company: string
  location: string
  expertise: string[]
  rating: number
  reviewCount: number
  savedDate: string
  collections: string[]
  bio: string
}

interface Collection {
  id: string
  name: string
  color: string
  count: number
}

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | string

export default function SavedMentorsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [savedMentors, setSavedMentors] = useState<SavedMentor[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterCollection, setFilterCollection] = useState<FilterType>('all')
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [editingCollection, setEditingCollection] = useState<{ id: string; name: string } | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Color palette for collections
  const collectionColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500']

  // Fetch saved mentors and collections
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

        // Fetch saved profiles
        const { data: savedData, error: savedError } = await supabase
          .from('SavedProfile')
          .select(`
            id,
            savedAt,
            savedUserId,
            User:savedUserId (
              id,
              name,
              role,
              Profile (
                profilePicture,
                workExperience,
                city,
                bio
              )
            )
          `)
          .eq('userId', user.id)
          .order('savedAt', { ascending: false })

        if (savedError) throw savedError

        // Fetch collections
        const { data: collectionsData, error: collectionsError } = await supabase
          .from('Collection')
          .select('*')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false })

        if (collectionsError) throw collectionsError

        // Get review stats for saved users
        const savedUserIds = (savedData || []).map((s: any) => s.savedUserId).filter(Boolean)

        const [reviewsData] = await Promise.all([
          supabase
            .from('Review')
            .select('reviewedId, rating')
            .in('reviewedId', savedUserIds)
        ])

        // Calculate review stats
        const reviewStats = (reviewsData.data || []).reduce((acc: any, r: any) => {
          if (!acc[r.reviewedId]) acc[r.reviewedId] = { total: 0, sum: 0, count: 0 }
          acc[r.reviewedId].sum += r.rating
          acc[r.reviewedId].count += 1
          acc[r.reviewedId].total = acc[r.reviewedId].sum / acc[r.reviewedId].count
          return acc
        }, {})

        // Transform saved mentors
        const transformedMentors: SavedMentor[] = (savedData || []).map((saved: any) => {
          const user = saved.User
          const profile = Array.isArray(user?.Profile) ? user.Profile[0] : user?.Profile
          const stats = reviewStats[saved.savedUserId] || { total: 0, count: 0 }

          return {
            id: saved.savedUserId || '',
            name: user?.name || 'Unknown',
            avatar: profile?.profilePicture || null,
            role: profile?.workExperience || 'Mentor',
            company: '',
            location: profile?.city || 'Location not set',
            expertise: [],
            rating: Number(stats.total.toFixed(1)) || 0,
            reviewCount: stats.count || 0,
            savedDate: new Date(saved.savedAt).toLocaleDateString(),
            collections: [],
            bio: profile?.bio || 'No bio available',
          }
        })

        // Transform collections with counts
        const transformedCollections: Collection[] = (collectionsData || []).map((col: any) => ({
          id: col.id,
          name: col.name,
          color: col.color || collectionColors[Math.floor(Math.random() * collectionColors.length)],
          count: 0, // Will be calculated below
        }))

        setSavedMentors(transformedMentors)
        setCollections(transformedCollections)
      } catch (err) {
        console.error('Error fetching saved mentors:', err)
        setError(err instanceof Error ? err.message : 'Failed to load saved mentors')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, router])

  // Filter mentors by collection
  const filteredMentors =
    filterCollection === 'all'
      ? savedMentors
      : savedMentors.filter(m => m.collections.includes(filterCollection))

  // Handle unsave
  const handleUnsave = async (mentorId: string) => {
    if (!currentUserId || !confirm('Remove this mentor from your saved list?')) return

    try {
      const { error } = await supabase
        .from('SavedProfile')
        .delete()
        .eq('userId', currentUserId)
        .eq('savedUserId', mentorId)

      if (error) throw error

      setSavedMentors(prev => prev.filter(m => m.id !== mentorId))
    } catch (err) {
      console.error('Error unsaving mentor:', err)
      alert('Failed to unsave mentor. Please try again.')
    }
  }

  // Handle create collection
  const handleCreateCollection = async () => {
    if (!newCollectionName.trim() || !currentUserId) return

    try {
      const randomColor = collectionColors[Math.floor(Math.random() * collectionColors.length)]

      const { data, error } = await supabase
        .from('Collection')
        .insert({
          userId: currentUserId,
          name: newCollectionName.trim(),
          color: randomColor,
        })
        .select()
        .single()

      if (error) throw error

      setCollections(prev => [
        ...prev,
        {
          id: data.id,
          name: data.name,
          color: data.color || randomColor,
          count: 0,
        },
      ])
      setNewCollectionName('')
      setShowNewCollectionModal(false)
    } catch (err) {
      console.error('Error creating collection:', err)
      alert('Failed to create collection. Please try again.')
    }
  }

  // Handle delete collection
  const handleDeleteCollection = async (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId)
    if (!collection || !confirm(`Delete "${collection.name}" collection?`)) return

    try {
      const { error } = await supabase
        .from('Collection')
        .delete()
        .eq('id', collectionId)

      if (error) throw error

      setCollections(prev => prev.filter(c => c.id !== collectionId))
      // Remove collection from all mentors
      setSavedMentors(prev =>
        prev.map(m => ({
          ...m,
          collections: m.collections.filter(c => c !== collection.name),
        }))
      )
    } catch (err) {
      console.error('Error deleting collection:', err)
      alert('Failed to delete collection. Please try again.')
    }
  }

  // Handle edit collection
  const handleEditCollection = (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId)
    if (collection) {
      setEditingCollection({ id: collectionId, name: collection.name })
    }
  }

  // Handle save collection edit
  const handleSaveCollectionEdit = async () => {
    if (!editingCollection || !editingCollection.name.trim()) return

    try {
      const { error } = await supabase
        .from('Collection')
        .update({ name: editingCollection.name.trim() })
        .eq('id', editingCollection.id)

      if (error) throw error

      const oldCollection = collections.find(c => c.id === editingCollection.id)
      if (oldCollection) {
        // Update collection name in state
        setCollections(prev =>
          prev.map(c => (c.id === editingCollection.id ? { ...c, name: editingCollection.name } : c))
        )
        // Update collection name in all mentors
        setSavedMentors(prev =>
          prev.map(m => ({
            ...m,
            collections: m.collections.map(c =>
              c === oldCollection.name ? editingCollection.name : c
            ),
          }))
        )
      }
      setEditingCollection(null)
    } catch (err) {
      console.error('Error updating collection:', err)
      alert('Failed to update collection. Please try again.')
    }
  }

  // Render mentor card
  const renderMentorCard = (mentor: SavedMentor) => {
    if (viewMode === 'grid') {
      return (
        <Card key={mentor.id} className="shadow-md hover:shadow-xl transition-all group">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Avatar fallback={mentor.name} size="lg" className="border-2 border-primary-accent" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUnsave(mentor.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <h3
              className="text-lg font-bold font-montserrat text-primary-dark mb-1 cursor-pointer hover:text-primary-accent"
              onClick={() => router.push(`/mentors/${mentor.id}`)}
            >
              {mentor.name}
            </h3>
            <p className="text-sm text-neutral-600 font-montserrat mb-1">{mentor.role}</p>
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-montserrat mb-3">
              <Briefcase className="h-3 w-3" />
              {mentor.company}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-bold font-montserrat text-primary-dark">
                  {mentor.rating}
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-montserrat">
                ({mentor.reviewCount} reviews)
              </span>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {mentor.expertise.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-primary-accent/10 text-primary-dark border-primary-accent/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Collections */}
            {mentor.collections.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.collections.map((collection, index) => {
                  const collectionData = collections.find(c => c.name === collection)
                  return (
                    <Badge
                      key={index}
                      className={`${collectionData?.color || 'bg-neutral-500'} text-white`}
                      size="sm"
                    >
                      <Folder className="h-3 w-3 mr-1" />
                      {collection}
                    </Badge>
                  )
                })}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push(`/mentors/${mentor.id}`)}
                className="flex-1 bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/messages')}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    } else {
      // List view
      return (
        <Card key={mentor.id} className="shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar fallback={mentor.name} size="md" className="border-2 border-primary-accent flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg font-bold font-montserrat text-primary-dark mb-1 cursor-pointer hover:text-primary-accent"
                  onClick={() => router.push(`/mentors/${mentor.id}`)}
                >
                  {mentor.name}
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat mb-2">
                  {mentor.role} at {mentor.company}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-bold font-montserrat text-primary-dark">
                      {mentor.rating}
                    </span>
                    <span className="text-xs text-neutral-500 font-montserrat">
                      ({mentor.reviewCount})
                    </span>
                  </div>
                  {mentor.collections.slice(0, 2).map((collection, index) => {
                    const collectionData = collections.find(c => c.name === collection)
                    return (
                      <Badge
                        key={index}
                        className={`${collectionData?.color || 'bg-neutral-500'} text-white`}
                        size="sm"
                      >
                        {collection}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/mentors/${mentor.id}`)}
                >
                  View Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUnsave(mentor.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
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
                Saved Mentors
              </h1>
              <p className="text-white/80 font-montserrat">
                Organize and manage your favorite mentors
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={
                  viewMode === 'grid'
                    ? 'bg-primary-accent text-primary-dark'
                    : 'border-white text-white hover:bg-white hover:text-primary-dark'
                }
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={
                  viewMode === 'list'
                    ? 'bg-primary-accent text-primary-dark'
                    : 'border-white text-white hover:bg-white hover:text-primary-dark'
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Collections */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader className="bg-primary-dark text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 font-montserrat">
                      <FolderOpen className="h-5 w-5" />
                      Collections
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewCollectionModal(true)}
                      className="text-white hover:bg-white/20"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => setFilterCollection('all')}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        filterCollection === 'all'
                          ? 'bg-primary-accent/10 text-primary-dark font-semibold'
                          : 'hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-montserrat">All Saved</span>
                        <Badge variant="outline" size="sm">
                          {savedMentors.length}
                        </Badge>
                      </div>
                    </button>

                    {collections.map(collection => (
                      <div
                        key={collection.id}
                        className={`group rounded-lg transition-colors ${
                          filterCollection === collection.name
                            ? 'bg-primary-accent/10'
                            : 'hover:bg-neutral-100'
                        }`}
                      >
                        {editingCollection?.id === collection.id ? (
                          <div className="p-3 flex items-center gap-2">
                            <input
                              type="text"
                              value={editingCollection.name}
                              onChange={e =>
                                setEditingCollection({ ...editingCollection, name: e.target.value })
                              }
                              className="flex-1 px-2 py-1 text-sm border border-neutral-300 rounded font-montserrat"
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleSaveCollectionEdit}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingCollection(null)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setFilterCollection(collection.name)}
                            className="w-full text-left p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1">
                                <div className={`w-3 h-3 rounded-full ${collection.color}`} />
                                <span
                                  className={`font-montserrat truncate ${
                                    filterCollection === collection.name
                                      ? 'text-primary-dark font-semibold'
                                      : 'text-neutral-700'
                                  }`}
                                >
                                  {collection.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleEditCollection(collection.id)
                                  }}
                                  className="text-neutral-600 hover:text-primary-accent"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleDeleteCollection(collection.id)
                                  }}
                                  className="text-neutral-600 hover:text-red-600"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              <Badge variant="outline" size="sm" className="ml-2">
                                {collection.count}
                              </Badge>
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Saved Mentors */}
            <div className="lg:col-span-3">
              {loading ? (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                    <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                      Loading saved mentors...
                    </h3>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                      Error loading saved mentors
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
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black font-montserrat text-primary-dark">
                      {filterCollection === 'all'
                        ? `All Saved (${savedMentors.length})`
                        : `${filterCollection} (${filteredMentors.length})`}
                    </h2>
                  </div>

                  {/* Mentors Grid/List */}
                  {filteredMentors.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredMentors.map(renderMentorCard)}
                </div>
              ) : (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                      No saved mentors
                    </h3>
                    <p className="text-neutral-500 font-montserrat mb-6">
                      {filterCollection === 'all'
                        ? "You haven't saved any mentors yet. Browse mentors to get started!"
                        : `No mentors in "${filterCollection}" collection.`}
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => router.push('/browse-mentors')}
                      className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                    >
                      Browse Mentors
                    </Button>
                  </CardContent>
                </Card>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* New Collection Modal */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader>
              <CardTitle className="font-montserrat text-primary-dark">
                Create New Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={newCollectionName}
                onChange={e => setNewCollectionName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreateCollection()}
                placeholder="Enter collection name..."
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim()}
                  className="flex-1 bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                >
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewCollectionModal(false)
                    setNewCollectionName('')
                  }}
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
