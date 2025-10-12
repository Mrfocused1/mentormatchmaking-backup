'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { FilterSelection } from '@/components/browse/filter-selection'
import { SwipeCard } from '@/components/browse/swipe-card'
import { MentorListCard } from '@/components/browse/mentor-list-card'
import { motion, AnimatePresence } from 'framer-motion'
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
  Search,
  Check
} from 'lucide-react'

export default function BrowseMentorsNew() {
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
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Swipe feedback animation state
  const [swipeFeedback, setSwipeFeedback] = useState<'left' | 'right' | null>(null)

  // Onboarding overlay state (mobile only)
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Show onboarding overlay when entering results view on mobile
  useEffect(() => {
    if (currentStep === 'results' && viewMode === 'swipe') {
      // Check if mobile (width < 768px) and hasn't been shown before
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
      const hasSeenOnboarding = typeof window !== 'undefined' && localStorage.getItem('hasSeenSwipeOnboarding') === 'true'

      if (isMobile && !hasSeenOnboarding) {
        setShowOnboarding(true)
        localStorage.setItem('hasSeenSwipeOnboarding', 'true')
      }
    }
  }, [currentStep, viewMode])

  const handleDismissOnboarding = () => {
    setShowOnboarding(false)
  }

  // Mock data
  const mentors = [
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
      bio: 'Passionate about helping junior developers navigate their tech careers. Previously at Google and Meta, I have learned valuable lessons I love to share. Specialized in full-stack development and career advancement.',
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
  ]

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
  const availabilityOptions = [
    'Currently Online',
    'Active within 24hrs',
    'Active this week',
    'Accepting New Mentees'
  ]
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

  const totalFilters =
    selectedIndustries.length +
    selectedExpertise.length +
    selectedAvailability.length +
    selectedExperience.length

  const applyFiltersAndClose = () => {
    setShowFilterModal(false)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
  }

  const handleShowResults = () => {
    setCurrentStep('results')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
  }

  const handleBackToFilters = () => {
    setCurrentStep('filters')
    setCurrentCardIndex(0)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    // Show swipe feedback animation
    setSwipeFeedback(direction)

    // Clear animation after 500ms
    setTimeout(() => {
      setSwipeFeedback(null)
    }, 500)

    if (direction === 'right') {
      // User is interested - delay modal until after animation
      setTimeout(() => {
        handleShowInterest(mentors[currentCardIndex])
      }, 500)
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
        <div className="min-h-screen pt-0 pb-0 bg-neutral-50">
          {/* Minimal Top Bar */}
          <div className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 py-3 fixed top-16 left-0 right-0 z-40 mt-0">
            <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToFilters}
                className="text-primary-accent hover:text-primary-accent/80"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* View Toggle - Centered */}
              <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('swipe')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === 'swipe'
                      ? 'bg-white text-primary-dark shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-dark shadow-sm'
                      : 'text-neutral-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Placeholder for balance */}
              <div className="w-10" />
            </div>
          </div>

          {/* Floating Filter Button with Pulse & Glow */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="fixed top-24 right-4 z-50 bg-primary-accent hover:bg-primary-accent/90 text-primary-dark rounded-full p-4 shadow-2xl transition-all active:scale-95 animate-pulse-glow"
          >
            <SlidersHorizontal className="h-6 w-6" />
            {totalFilters > 0 && (
              <div className="absolute -top-1 -right-1 bg-secondary-accent text-white text-xs font-bold font-montserrat rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                {totalFilters}
              </div>
            )}
          </button>

          {/* Swipe Feedback Animation Overlay */}
          <AnimatePresence>
            {swipeFeedback && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
              >
                {swipeFeedback === 'left' ? (
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping">
                      <div className="w-32 h-32 rounded-full bg-red-500/30 blur-xl" />
                    </div>
                    <div className="relative bg-red-500 rounded-full p-8 shadow-2xl">
                      <X className="h-16 w-16 text-white stroke-[3]" />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping">
                      <div className="w-32 h-32 rounded-full bg-green-500/30 blur-xl" />
                    </div>
                    <div className="relative bg-green-500 rounded-full p-8 shadow-2xl">
                      <Check className="h-16 w-16 text-white stroke-[3]" />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swipe View */}
          {viewMode === 'swipe' && (
            <div className="mx-auto max-w-lg px-6 pt-28 pb-8">
              {currentCardIndex < mentors.length ? (
                <>
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
            <div className="mx-auto max-w-5xl px-6 pt-28 pb-8">
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

      {/* Filter Modal - Slides from Bottom */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilterModal(false)}
          />

          {/* Modal Content */}
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden animate-in slide-in- duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h2 className="text-xl font-bold font-montserrat text-primary-dark">
                  Filter Mentors
                </h2>
                <p className="text-sm text-neutral-600 font-montserrat">
                  {mentors.length} mentors match your criteria
                </p>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Filter Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-140px)] px-6 py-6 space-y-6">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name, skills, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                </div>
              </div>

              {/* Industries */}
              <div>
                <h3 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Industry
                  {selectedIndustries.length > 0 && (
                    <span className="ml-2 text-xs bg-primary-accent text-primary-dark px-2 py-1 rounded-full">
                      {selectedIndustries.length}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => toggleIndustry(industry)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedIndustries.includes(industry)
                          ? 'bg-primary-accent text-primary-dark shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div>
                <h3 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Expertise
                  {selectedExpertise.length > 0 && (
                    <span className="ml-2 text-xs bg-secondary-accent text-white px-2 py-1 rounded-full">
                      {selectedExpertise.length}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expertiseAreas.map((expertise) => (
                    <button
                      key={expertise}
                      onClick={() => toggleExpertise(expertise)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedExpertise.includes(expertise)
                          ? 'bg-secondary-accent text-white shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {expertise}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Experience Level
                  {selectedExperience.length > 0 && (
                    <span className="ml-2 text-xs bg-vibrant-accent text-white px-2 py-1 rounded-full">
                      {selectedExperience.length}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleExperience(level)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedExperience.includes(level)
                          ? 'bg-vibrant-accent text-white shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability & Activity */}
              <div>
                <h3 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Availability & Activity
                  {selectedAvailability.length > 0 && (
                    <span className="ml-2 text-xs bg-success text-white px-2 py-1 rounded-full">
                      {selectedAvailability.length}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((availability) => (
                    <button
                      key={availability}
                      onClick={() => toggleAvailability(availability)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedAvailability.includes(availability)
                          ? 'bg-success text-white shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {availability}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-3">
              {totalFilters > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={clearAllFilters}
                  className="flex-1 border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="primary"
                size="lg"
                onClick={applyFiltersAndClose}
                className="flex-1 bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
              >
                Show {mentors.length} Mentors
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interest Modal */}
      {showInterestModal && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-primary-accent px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    Connect with {selectedMentor.name}
                  </h2>
                  <p className="text-sm text-primary-dark/80 font-montserrat mt-1 font-medium">
                    {selectedMentor.title} @ {selectedMentor.company}
                  </p>
                </div>
                <button
                  onClick={handleCloseInterestModal}
                  className="text-primary-dark/60 hover:text-primary-dark transition-colors p-2 hover:bg-white/30 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-8 space-y-6 max-h-[calc(90vh-240px)] overflow-y-auto">
              {/* Message Box */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold font-montserrat text-primary-dark mb-3">
                  <div className="w-1 h-5 bg-secondary-accent rounded-full"></div>
                  Your Message <span className="text-secondary-accent">*</span>
                </label>
                <textarea
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={8}
                  className="w-full px-5 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-secondary-accent hover:border-neutral-300 font-montserrat text-base resize-none transition-all shadow-sm"
                  placeholder="Hi! I'm interested in learning from your experience in..."
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-neutral-500 font-montserrat">
                    {interestMessage.length} / 500 characters
                  </p>
                  <p className="text-xs text-neutral-400 font-montserrat italic">
                    Be specific and genuine
                  </p>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold font-montserrat text-primary-dark mb-3">
                  <div className="w-1 h-5 bg-primary-accent rounded-full"></div>
                  Upload Your CV/Resume <span className="text-neutral-500 font-normal text-xs ml-1">(optional)</span>
                </label>

                {uploadedCV ? (
                  <div className="flex items-center justify-between p-5 bg-primary-accent/10 border-2 border-primary-accent rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-accent rounded-xl p-3">
                        <FileText className="h-6 w-6 text-primary-dark" />
                      </div>
                      <div>
                        <p className="text-sm font-bold font-montserrat text-primary-dark">
                          {uploadedCV.name}
                        </p>
                        <p className="text-xs text-neutral-600 font-montserrat mt-0.5">
                          {(uploadedCV.size / 1024).toFixed(1)} KB • Ready to send
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedCV(null)}
                      className="text-neutral-400 hover:text-red-500 transition-all p-2 hover:bg-white rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-primary-accent hover:bg-primary-accent/5 transition-all">
                    <div className="bg-neutral-100 group-hover:bg-primary-accent/20 rounded-full p-4 mb-3 transition-all">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-primary-accent transition-colors" />
                    </div>
                    <p className="text-base font-bold font-montserrat text-neutral-700 group-hover:text-primary-dark transition-colors">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-neutral-500 font-montserrat mt-1">PDF, DOC, or DOCX • Max 10MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                  </label>
                )}
              </div>

              {/* Info */}
              <div className="bg-vibrant-accent/10 border-l-4 border-vibrant-accent rounded-xl p-5">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="bg-vibrant-accent rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-dark font-montserrat mb-1">
                      What happens next?
                    </p>
                    <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                      Your message will be sent to {selectedMentor.name}. If they accept, you'll be matched and can start your mentorship journey!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t-2 border-neutral-100 px-8 py-6 flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCloseInterestModal}
                className="flex-1 border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 font-bold"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitInterest}
                disabled={!interestMessage.trim()}
                className="flex-1 bg-secondary-accent hover:bg-secondary-accent/90 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all font-bold"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Overlay (Mobile Only) */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismissOnboarding}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 md:hidden cursor-pointer"
          >
            <div className="text-center">
              {/* Swipe Animation */}
              <div className="mb-8 relative">
                <motion.div
                  animate={{
                    x: [-40, 40, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block"
                >
                  <div className="bg-white/20 rounded-full p-6">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      {/* Hand/Finger Swipe Gesture */}
                      <path
                        d="M9 11V6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 11V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13 11V5C13 4.44772 13.4477 4 14 4C14.5523 4 15 4.44772 15 5V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15 11V7C15 6.44772 15.4477 6 16 6C16.5523 6 17 6.44772 17 7V13C17 16.3137 14.3137 19 11 19H10C7.23858 19 5 16.7614 5 14V12C5 11.4477 5.44772 11 6 11C6.55228 11 7 11.4477 7 12V14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Instructions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold font-montserrat text-white mb-4">
                  Swipe to Browse
                </h2>
                <p className="text-lg text-white/90 font-montserrat mb-2">
                  <span className="text-green-400">→ Swipe right</span> to connect
                </p>
                <p className="text-lg text-white/90 font-montserrat mb-8">
                  <span className="text-red-400">← Swipe left</span> to pass
                </p>
              </motion.div>

              {/* Tap to Start */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, repeat: Infinity, repeatType: "reverse", duration: 1 }}
                className="mt-12"
              >
                <p className="text-base font-semibold font-montserrat text-white/70">
                  Tap anywhere to start
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  )
}
