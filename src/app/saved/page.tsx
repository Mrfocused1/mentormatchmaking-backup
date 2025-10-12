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
} from 'lucide-react'

// Mock saved mentors data
const mockSavedMentors = [
  {
    id: '1',
    name: 'Sarah Thompson',
    avatar: null,
    role: 'Senior Product Designer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    expertise: ['Product Design', 'UX/UI', 'Design Systems'],
    rating: 4.8,
    reviewCount: 42,
    savedDate: '2025-10-01',
    collections: ['Career Goals', 'Design Mentors'],
    bio: 'Passionate product designer with 12+ years of experience',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: null,
    role: 'Engineering Manager',
    company: 'StartupCo',
    location: 'New York, NY',
    expertise: ['Leadership', 'Software Engineering', 'System Design'],
    rating: 4.9,
    reviewCount: 38,
    savedDate: '2025-10-05',
    collections: ['Career Goals'],
    bio: 'Helping engineers level up their technical and leadership skills',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: null,
    role: 'VP of Product',
    company: 'GrowthInc',
    location: 'Austin, TX',
    expertise: ['Product Strategy', 'Growth', 'Team Building'],
    rating: 5.0,
    reviewCount: 56,
    savedDate: '2025-09-28',
    collections: ['Design Mentors', 'Product Leaders'],
    bio: 'Product leader passionate about building great products',
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: null,
    role: 'Senior Designer',
    company: 'CreativeStudio',
    location: 'Los Angeles, CA',
    expertise: ['UI Design', 'Branding', 'Illustration'],
    rating: 4.7,
    reviewCount: 29,
    savedDate: '2025-10-08',
    collections: ['Design Mentors'],
    bio: 'Creative designer specializing in brand identity and UI',
  },
]

// Mock collections
const mockCollections = [
  { id: '1', name: 'Career Goals', color: 'bg-blue-500', count: 2 },
  { id: '2', name: 'Design Mentors', color: 'bg-purple-500', count: 3 },
  { id: '3', name: 'Product Leaders', color: 'bg-green-500', count: 1 },
]

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | string

export default function SavedMentorsPage() {
  const router = useRouter()
  const [savedMentors, setSavedMentors] = useState(mockSavedMentors)
  const [collections, setCollections] = useState(mockCollections)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filterCollection, setFilterCollection] = useState<FilterType>('all')
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [editingCollection, setEditingCollection] = useState<{ id: string; name: string } | null>(
    null
  )

  // Filter mentors by collection
  const filteredMentors =
    filterCollection === 'all'
      ? savedMentors
      : savedMentors.filter(m => m.collections.includes(filterCollection))

  // Handle unsave
  const handleUnsave = (mentorId: string) => {
    if (confirm('Remove this mentor from your saved list?')) {
      setSavedMentors(prev => prev.filter(m => m.id !== mentorId))
    }
  }

  // Handle create collection
  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setCollections(prev => [
        ...prev,
        {
          id: String(Date.now()),
          name: newCollectionName.trim(),
          color: randomColor,
          count: 0,
        },
      ])
      setNewCollectionName('')
      setShowNewCollectionModal(false)
    }
  }

  // Handle delete collection
  const handleDeleteCollection = (collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId)
    if (collection && confirm(`Delete "${collection.name}" collection?`)) {
      setCollections(prev => prev.filter(c => c.id !== collectionId))
      // Remove collection from all mentors
      setSavedMentors(prev =>
        prev.map(m => ({
          ...m,
          collections: m.collections.filter(c => c !== collection.name),
        }))
      )
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
  const handleSaveCollectionEdit = () => {
    if (editingCollection && editingCollection.name.trim()) {
      const oldCollection = collections.find(c => c.id === editingCollection.id)
      if (oldCollection) {
        // Update collection name
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
    }
  }

  // Render mentor card
  const renderMentorCard = (mentor: typeof mockSavedMentors[0]) => {
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
