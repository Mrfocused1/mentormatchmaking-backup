'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { FilterSelection } from '@/components/browse/filter-selection'
import { SwipeCard } from '@/components/browse/swipe-card'
import { MentorListCard } from '@/components/browse/mentor-list-card'
import {
  ChevronLeft,
  Layers,
  List,
  SlidersHorizontal,
  Heart,
  X,
  Send,
  Upload,
  FileText,
  CheckCircle,
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react'

export default function BrowseMentorsNew() {
  const router = useRouter()
  const supabase = createClient()

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mentors, setMentors] = useState<any[]>([])

  // Step 1: Filter Selection or Step 2: Results View
  const [currentStep, setCurrentStep] = useState<'filters' | 'results'>('filters')

  // View mode: swipe or list
  const [viewMode, setViewMode] = useState<'swipe' | 'list'>('swipe')

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])

  // Swipe state
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  // Modal state
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [interestMessage, setInterestMessage] = useState('')
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)

  // Fetch mentors from database
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)

        // Fetch all mentors with their profiles
        const { data: mentorsData, error: mentorsError } = await supabase
          .from('User')
          .select(`
            id,
            name,
            role,
            Profile (
              profilePicture,
              bio,
              workExperience,
              yearsOfExperience,
              city,
              country,
              status,
              helpsWith
            )
          `)
          .eq('role', 'MENTOR')
          .eq('Profile.status', 'ACTIVE')
          .limit(50)

        if (mentorsError) throw mentorsError

        // Get additional data for each mentor (reviews, etc.)
        const mentorsWithDetails = await Promise.all(
          (mentorsData || []).map(async (mentor: any) => {
            // Get review stats
            const { data: reviews } = await supabase
              .from('Review')
              .select('rating')
              .eq('reviewedId', mentor.id)

            const avgRating = reviews && reviews.length > 0
              ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
              : 0

            // Get mentee count
            const { count: menteeCount } = await supabase
              .from('Match')
              .select('*', { count: 'exact', head: true })
              .or(`user1Id.eq.${mentor.id},user2Id.eq.${mentor.id}`)
              .eq('status', 'ACTIVE')

            return {
              id: mentor.id,
              name: mentor.name,
              title: mentor.Profile?.workExperience?.split('\n')[0] || 'Professional',
              company: 'Company', // TODO: Add company field to Profile
              location: `${mentor.Profile?.city || ''}, ${mentor.Profile?.country || ''}`.trim() || 'Remote',
              industry: 'Technology', // TODO: Get from industries relation
              rating: parseFloat(avgRating.toFixed(1)),
              reviewCount: reviews?.length || 0,
              mentees: menteeCount || 0,
              yearsExperience: mentor.Profile?.yearsOfExperience === 'ENTRY' ? 2 : mentor.Profile?.yearsOfExperience === 'MID' ? 5 : mentor.Profile?.yearsOfExperience === 'SENIOR' ? 10 : 15,
              expertise: mentor.Profile?.helpsWith?.split(',').map((s: string) => s.trim()) || [],
              availability: mentor.Profile?.status === 'ACTIVE' ? 'Available' : 'Limited',
              bio: mentor.Profile?.bio || 'Passionate about mentoring and helping others grow.',
              avatar: mentor.Profile?.profilePicture,
              languages: ['English'],
              industries: ['Technology']
            }
          })
        )

        setMentors(mentorsWithDetails)
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching mentors:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  // OLD MOCK DATA - REMOVED
  /* const mentors = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      industry: 'Technology',
      rating: 4.9,
      reviewCount: 127,
      mentees: 45,
      yearsExperience: 8,
      expertise: ['React', 'Node.js', 'System Design', 'AWS', 'Leadership', 'Career Planning'],
      availability: 'Available',
      bio: 'Passionate about helping junior developers navigate their tech careers. Previously at Google and Meta, I\'ve learned valuable lessons I love to share. Specialized in full-stack development and career advancement.',
      avatar: null,
      languages: ['English (Native)', 'Mandarin (Fluent)'],
      industries: ['Technology', 'Startups', 'SaaS'],
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Marketing Director',
      company: 'Fortune 500',
      location: 'New York, NY',
      industry: 'Marketing',
      rating: 5.0,
      reviewCount: 93,
      mentees: 28,
      yearsExperience: 12,
      expertise: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'Analytics', 'Team Management'],
      availability: 'Limited',
      bio: 'Helping marketing professionals grow their careers and master data-driven strategies. 12+ years experience in digital transformation and brand building at Fortune 500 companies.',
      avatar: null,
      languages: ['English (Native)', 'Spanish (Native)'],
      industries: ['Marketing', 'Advertising', 'E-commerce'],
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      industry: 'Technology',
      rating: 4.8,
      reviewCount: 156,
      mentees: 52,
      yearsExperience: 10,
      expertise: ['Product Strategy', 'User Research', 'Agile', 'Roadmapping', 'Stakeholder Management'],
      availability: 'Available',
      bio: 'Helping product managers and aspiring PMs build successful products and advance their careers in tech. Specialized in B2B SaaS and enterprise products.',
      avatar: null,
      languages: ['English (Native)', 'French (Conversational)'],
      industries: ['Technology', 'SaaS', 'Enterprise Software'],
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Financial Analyst',
      company: 'Goldman Sachs',
      location: 'London, UK',
      industry: 'Finance',
      rating: 4.7,
      reviewCount: 82,
      mentees: 31,
      yearsExperience: 8,
      expertise: ['Investment Banking', 'Financial Modeling', 'Career Transition', 'Excel', 'Valuation'],
      availability: 'Available',
      bio: 'Former investment banker helping professionals break into finance and advance their careers in financial services. Expert in career transitions and technical skill development.',
      avatar: null,
      languages: ['English (Fluent)', 'Korean (Native)'],
      industries: ['Finance', 'Investment Banking', 'Consulting'],
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      title: 'UX Design Lead',
      company: 'Apple',
      location: 'Cupertino, CA',
      industry: 'Design',
      rating: 4.9,
      reviewCount: 104,
      mentees: 42,
      yearsExperience: 11,
      expertise: ['UX Design', 'Design Thinking', 'Portfolio Building', 'User Research', 'Prototyping'],
      availability: 'Limited',
      bio: 'Passionate about mentoring designers at all levels. Specialized in UX research, interaction design, and building stellar portfolios that land dream jobs.',
      avatar: null,
      languages: ['English (Native)'],
      industries: ['Design', 'Technology', 'Consumer Products'],
    },
    {
      id: 6,
      name: 'James Anderson',
      title: 'Data Science Manager',
      company: 'Amazon',
      location: 'Austin, TX',
      industry: 'Technology',
      rating: 4.8,
      reviewCount: 91,
      mentees: 36,
      yearsExperience: 13,
      expertise: ['Machine Learning', 'Data Analytics', 'Python', 'SQL', 'Career Development'],
      availability: 'Available',
      bio: 'Data scientist turned manager, helping others navigate careers in data science, ML engineering, and analytics. Expert in technical interview prep and career growth.',
      avatar: null,
      languages: ['English (Native)'],
      industries: ['Technology', 'E-commerce', 'AI/ML'],
    },
  ] */
  // END OF MOCK DATA - NOW USING SUPABASE

  const industries = ['Technology', 'Marketing', 'Finance', 'Design', 'Healthcare', 'Education', 'Consulting']
  const expertiseAreas = [
    'Software Development',
    'Career Growth',
    'Leadership',
    'Digital Marketing',
    'Brand Strategy',
    'Product Strategy',
    'Data Science',
    'UX Design',
    'Financial Modeling',
    'Project Management',
  ]
  const availabilityOptions = ['Available', 'Limited', 'Fully Booked']
  const experienceLevels = ['0-5 years', '5-10 years', '10-15 years', '15+ years']

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    )
  }

  const toggleExpertise = (expertise: string) => {
    setSelectedExpertise(prev =>
      prev.includes(expertise) ? prev.filter(e => e !== expertise) : [...prev, expertise]
    )
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability(prev =>
      prev.includes(availability) ? prev.filter(a => a !== availability) : [...prev, availability]
    )
  }

  const toggleExperience = (experience: string) => {
    setSelectedExperience(prev =>
      prev.includes(experience) ? prev.filter(e => e !== experience) : [...prev, experience]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedIndustries([])
    setSelectedExpertise([])
    setSelectedAvailability([])
    setSelectedExperience([])
  }

  const handleShowResults = () => {
    setCurrentStep('results')
  }

  const handleBackToFilters = () => {
    setCurrentStep('filters')
    setCurrentCardIndex(0)
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // User is interested
      handleShowInterest(mentors[currentCardIndex])
    }
    // Move to next card
    if (currentCardIndex < mentors.length - 1) {
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1)
      }, 300)
    }
  }

  const handleShowInterest = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowInterestModal(true)
  }

  const handleCloseInterestModal = () => {
    setShowInterestModal(false)
    setSelectedMentor(null)
    setInterestMessage('')
    setUploadedCV(null)
  }

  const handleSubmitInterest = () => {
    console.log('Interest submitted:', {
      mentor: selectedMentor,
      message: interestMessage,
      cv: uploadedCV,
    })
    alert('Interest sent successfully!')
    handleCloseInterestModal()
    // Move to next card if in swipe mode
    if (viewMode === 'swipe' && currentCardIndex < mentors.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (allowedTypes.includes(file.type)) {
        setUploadedCV(file)
      } else {
        alert('Please upload a PDF or Word document')
      }
    }
  }

  const handleViewProfile = (mentor: any) => {
    // This would navigate to detailed profile page
    console.log('View profile:', mentor)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* STEP 1: Filter Selection */}
      {currentStep === 'filters' && (
        <FilterSelection
          industries={industries}
          expertiseAreas={expertiseAreas}
          availabilityOptions={availabilityOptions}
          experienceLevels={experienceLevels}
          selectedIndustries={selectedIndustries}
          selectedExpertise={selectedExpertise}
          selectedAvailability={selectedAvailability}
          selectedExperience={selectedExperience}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onIndustryToggle={toggleIndustry}
          onExpertiseToggle={toggleExpertise}
          onAvailabilityToggle={toggleAvailability}
          onExperienceToggle={toggleExperience}
          onClearAll={clearAllFilters}
          onShowResults={handleShowResults}
          resultsCount={mentors.length}
        />
      )}

      {/* STEP 2: Results View */}
      {currentStep === 'results' && (
        <div className="min-h-screen pt-20 pb-12 bg-neutral-50">
          {/* Results Header */}
          <div className="bg-white border-b border-neutral-200 py-4 sticky top-16 z-40">
            <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToFilters}
                  className="text-primary-accent hover:text-primary-accent/80"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Filters
                </Button>
                <div className="hidden sm:block h-6 w-px bg-neutral-200" />
                <p className="text-sm font-semibold font-montserrat text-neutral-700">
                  {mentors.length} mentors match your criteria
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('swipe')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === 'swipe'
                      ? 'bg-white text-primary-dark shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-semibold font-montserrat hidden sm:inline">Swipe</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-dark shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="text-sm font-semibold font-montserrat hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Swipe View */}
          {viewMode === 'swipe' && (
            <div className="mx-auto max-w-lg px-6 py-8">
              {currentCardIndex < mentors.length ? (
                <>
                  {/* Instructions (show on first card only) */}
                  {currentCardIndex === 0 && (
                    <div className="mb-6 bg-primary-accent/10 border border-primary-accent/20 rounded-xl p-4 text-center animate-in fade-in duration-500">
                      <p className="text-sm font-semibold font-montserrat text-primary-dark">
                        👉 Swipe right to connect • Swipe left to pass
                      </p>
                      <p className="text-xs text-neutral-600 font-montserrat mt-1">
                        Or use the buttons below
                      </p>
                    </div>
                  )}

                  {/* Card Stack */}
                  <div className="relative h-[600px] mb-6">
                    {mentors.slice(currentCardIndex, currentCardIndex + 2).map((mentor, index) => (
                      <SwipeCard
                        key={`${mentor.id}-${currentCardIndex}`}
                        mentor={mentor}
                        onSwipe={handleSwipe}
                        isTop={index === 0}
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center items-center gap-8 mb-6">
                    <button
                      onClick={() => handleSwipe('left')}
                      className="w-16 h-16 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:border-neutral-400 hover:scale-110 transition-all active:scale-95"
                    >
                      <X className="h-7 w-7 text-neutral-600" />
                    </button>

                    <button
                      onClick={() => handleSwipe('right')}
                      className="w-20 h-20 rounded-full bg-secondary-accent border-2 border-secondary-accent shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
                    >
                      <Heart className="h-8 w-8 text-white fill-white" />
                    </button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="text-center">
                    <p className="text-sm font-semibold font-montserrat text-neutral-600 mb-2">
                      {currentCardIndex + 1} of {mentors.length}
                    </p>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-accent transition-all duration-300"
                        style={{ width: `${((currentCardIndex + 1) / mentors.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                // All Done State
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-vibrant-accent/10 mb-6">
                    <CheckCircle className="h-12 w-12 text-vibrant-accent" />
                  </div>
                  <h3 className="text-3xl font-bold font-montserrat text-primary-dark mb-3">
                    You've Seen All Mentors!
                  </h3>
                  <p className="text-lg text-neutral-600 font-montserrat mb-8">
                    Check back later for new mentors or adjust your filters
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentCardIndex(0)}
                      className="border-2 border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Start Over
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleBackToFilters}
                      className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
                    >
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      Change Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="mx-auto max-w-5xl px-6 py-8">
              <div className="space-y-6">
                {mentors.map((mentor) => (
                  <MentorListCard
                    key={mentor.id}
                    mentor={mentor}
                    onShowInterest={handleShowInterest}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interest Modal */}
      {showInterestModal && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                  Connect with {selectedMentor.name}
                </h2>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  {selectedMentor.title} @ {selectedMentor.company}
                </p>
              </div>
              <button
                onClick={handleCloseInterestModal}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 space-y-6">
              {/* Message Box */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                  Your Message *
                </label>
                <textarea
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm resize-none"
                  placeholder="Introduce yourself and explain why you'd like this person as your mentor..."
                  required
                />
                <p className="text-xs text-neutral-500 font-montserrat mt-2">
                  {interestMessage.length} characters
                </p>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                  Upload Your CV/Resume <span className="text-neutral-500 font-normal">(optional)</span>
                </label>

                {uploadedCV ? (
                  <div className="flex items-center justify-between p-4 bg-primary-accent/10 border-2 border-primary-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary-accent" />
                      <div>
                        <p className="text-sm font-semibold font-montserrat text-primary-dark">
                          {uploadedCV.name}
                        </p>
                        <p className="text-xs text-neutral-600 font-montserrat">
                          {(uploadedCV.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedCV(null)}
                      className="text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-accent hover:bg-primary-accent/5 transition-all">
                    <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                    <p className="text-sm font-semibold font-montserrat text-neutral-700">
                      Click to upload
                    </p>
                    <p className="text-xs text-neutral-500 font-montserrat">PDF, DOC, or DOCX</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  </label>
                )}
              </div>

              {/* Info */}
              <div className="bg-primary-accent/10 border border-primary-accent/20 rounded-lg p-4">
                <p className="text-sm text-primary-dark font-montserrat">
                  <strong>What happens next?</strong> Your message will be sent to {selectedMentor.name}. If they accept, you'll be matched and can start your mentorship journey!
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 px-8 py-6 flex gap-4 justify-end rounded-b-2xl">
              <Button variant="outline" size="lg" onClick={handleCloseInterestModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitInterest}
                disabled={!interestMessage.trim()}
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white disabled:opacity-50"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
