'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Expandable, ExpandableTrigger, ExpandableContent } from '@/components/ui/expandable'
import {
  Search,
  Star,
  MapPin,
  Briefcase,
  Clock,
  X,
  SlidersHorizontal,
  Heart,
  FileText,
  Send,
  User,
  List,
  Layers,
  ThumbsDown,
  Eye,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Lightbulb,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function BrowseMentees() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedCareerStages, setSelectedCareerStages] = useState<string[]>([])
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('recommended')
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [selectedMentee, setSelectedMentee] = useState<any>(null)
  const [offerMessage, setOfferMessage] = useState('')
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [expandedMenteeId, setExpandedMenteeId] = useState<number | null>(null)

  // Mock mentee data (privacy-protected)
  const mentees = [
    {
      id: 1,
      firstName: 'Alex',
      ageRange: '22-25',
      location: 'London, UK',
      careerStage: 'College Student',
      industryInterests: ['Technology', 'Product Management', 'Startups'],
      aspirations: 'I want to break into product management at a tech company. I\'m fascinated by how great products are built and want to learn from someone who\'s done it.',
      whyMentorship: 'Looking for guidance on transitioning from my computer science degree into a PM role. I want to understand the day-to-day and build the right skills.',
      skillsToLearn: ['Product Strategy', 'User Research', 'Stakeholder Management'],
      mentorshipStyle: 'Monthly 1-on-1 calls, casual but structured',
      avatarColor: 'bg-blue-500',
    },
    {
      id: 2,
      firstName: 'Jordan',
      ageRange: '26-30',
      location: 'Manchester, UK',
      careerStage: 'Early Career Professional',
      industryInterests: ['Marketing', 'Digital Strategy', 'E-commerce'],
      aspirations: 'I want to become a marketing leader who can drive growth for consumer brands. I\'m particularly interested in digital-first strategies.',
      whyMentorship: 'I\'ve been in marketing for 3 years but want to accelerate my growth and learn from someone who\'s scaled marketing teams.',
      skillsToLearn: ['Growth Marketing', 'Team Leadership', 'Strategic Planning'],
      mentorshipStyle: 'Bi-weekly calls with ad-hoc messaging',
      avatarColor: 'bg-purple-500',
    },
    {
      id: 3,
      firstName: 'Taylor',
      ageRange: '31-35',
      location: 'Birmingham, UK',
      careerStage: 'Career Transitioner',
      industryInterests: ['UX Design', 'Design Systems', 'Accessibility'],
      aspirations: 'Transitioning from graphic design to UX/UI design. I want to work on meaningful products that prioritize user experience and accessibility.',
      whyMentorship: 'Need guidance navigating a career pivot, building a UX portfolio, and understanding what companies look for in UX designers.',
      skillsToLearn: ['UX Research', 'Interaction Design', 'Portfolio Building'],
      mentorshipStyle: 'Weekly portfolio reviews and feedback',
      avatarColor: 'bg-pink-500',
    },
    {
      id: 4,
      firstName: 'Morgan',
      ageRange: '20-25',
      location: 'Edinburgh, Scotland',
      careerStage: 'College Student',
      industryInterests: ['Finance', 'Investment Banking', 'Private Equity'],
      aspirations: 'I want to break into investment banking and eventually move to private equity. I\'m studying finance and want to understand what it really takes.',
      whyMentorship: 'Looking for honest insights about the finance industry, what skills matter most, and how to stand out in recruiting.',
      skillsToLearn: ['Financial Modeling', 'Deal Analysis', 'Networking'],
      mentorshipStyle: 'Flexible calls when needed, quick questions welcome',
      avatarColor: 'bg-green-500',
    },
    {
      id: 5,
      firstName: 'Casey',
      ageRange: '26-30',
      location: 'Bristol, UK',
      careerStage: 'Early Career Professional',
      industryInterests: ['Software Engineering', 'Machine Learning', 'AI'],
      aspirations: 'I want to deepen my expertise in machine learning and contribute to cutting-edge AI projects. Long-term, I see myself as a tech lead.',
      whyMentorship: 'I have strong coding skills but want to grow into more complex ML work and understand the career path to technical leadership.',
      skillsToLearn: ['Advanced ML', 'System Design', 'Technical Leadership'],
      mentorshipStyle: 'Monthly deep-dive technical discussions',
      avatarColor: 'bg-indigo-500',
    },
    {
      id: 6,
      firstName: 'Riley',
      ageRange: '22-25',
      location: 'Cardiff, Wales',
      careerStage: 'Recent Graduate',
      industryInterests: ['Healthcare', 'Biotech', 'Medical Devices'],
      aspirations: 'I want to work in healthcare innovation, specifically in medical device development. I believe technology can transform patient care.',
      whyMentorship: 'New to the industry and want to understand the landscape, regulatory environment, and how to make an impact in healthcare tech.',
      skillsToLearn: ['Healthcare Industry', 'Regulatory Affairs', 'Product Development'],
      mentorshipStyle: 'Monthly 1-on-1s with industry insights',
      avatarColor: 'bg-teal-500',
    },
  ]

  const industryOptions = [
    'Technology',
    'Marketing',
    'Finance',
    'Design',
    'Healthcare',
    'Education',
    'Consulting',
    'Sales',
    'Product Management',
    'Engineering',
  ]

  const careerStageOptions = [
    'High School Student',
    'College Student',
    'Recent Graduate',
    'Early Career Professional',
    'Career Transitioner',
    'Mid-Career Professional',
  ]

  const ageRangeOptions = [
    '18-21',
    '22-25',
    '26-30',
    '31-35',
    '36-40',
    '40+',
  ]

  const locationOptions = [
    'London, UK',
    'Manchester, UK',
    'Birmingham, UK',
    'Edinburgh, Scotland',
    'Bristol, UK',
    'Cardiff, Wales',
    'Glasgow, Scotland',
    'Remote/Virtual',
  ]

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'newest', label: 'Newest First' },
    { value: 'location', label: 'Closest to Me' },
  ]

  const messageTemplates = [
    {
      title: 'Experience Sharing',
      content: `Hi [Mentee Name],

I saw your profile and was impressed by your aspirations in [Industry]. I have [X] years of experience in this field and have helped many professionals navigate similar journeys.

I'd be happy to share my experiences, provide guidance, and help you achieve your goals. I believe I can offer valuable insights in [Specific Area].

Looking forward to connecting!

Best,
[Your Name]`
    },
    {
      title: 'Skill Development',
      content: `Dear [Mentee Name],

Your interest in developing skills in [Skill Area] resonates with me. I've spent considerable time mastering these areas and would love to help you accelerate your learning.

I can offer structured guidance, resources, and practical advice to help you grow in [Specific Skills]. I believe mentorship is about passing forward the knowledge we've gained.

Let's connect and see how I can support your journey!

Sincerely,
[Your Name]`
    },
    {
      title: 'Career Transition Support',
      content: `Hello [Mentee Name],

I understand the challenges of career transitions firsthand. Your goal of moving into [New Field] is exciting, and I'd like to help make that transition smoother.

With my background in [Industry], I can provide insights on what employers look for, how to position yourself, and what skills to prioritize.

I'm here to support your transition!

Best regards,
[Your Name]`
    },
    {
      title: 'Industry Navigation',
      content: `Hi [Mentee Name],

Navigating the [Industry] landscape can be complex, and I'd love to help guide you through it. I've worked across different companies and roles in this space.

I can offer perspective on industry trends, career paths, networking strategies, and practical advice for standing out in this field.

Let's work together to accelerate your growth!

Best,
[Your Name]`
    },
    {
      title: 'Personal Growth & Support',
      content: `Dear [Mentee Name],

Beyond technical skills, I believe mentorship is about personal growth and building confidence. Your aspirations show great ambition, and I'd like to support you holistically.

I can offer guidance not just on professional development, but also on work-life balance, overcoming challenges, and building a fulfilling career.

I'm excited to potentially work with you!

Warm regards,
[Your Name]`
    },
  ]

  const toggleArrayItem = (array: string[], item: string, setter: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const clearAllFilters = () => {
    setSelectedIndustries([])
    setSelectedCareerStages([])
    setSelectedAgeRanges([])
    setSelectedLocations([])
    setSearchQuery('')
  }

  const activeFiltersCount =
    selectedIndustries.length +
    selectedCareerStages.length +
    selectedAgeRanges.length +
    selectedLocations.length

  const handleOfferMentorship = (mentee: any) => {
    setSelectedMentee(mentee)
    setShowOfferModal(true)
    setOfferMessage('')
  }

  const handleCloseOfferModal = () => {
    setShowOfferModal(false)
    setSelectedMentee(null)
    setOfferMessage('')
  }

  const handleUseTemplate = (template: string) => {
    setOfferMessage(template)
  }

  const handleSubmitOffer = () => {
    console.log('Mentorship offer submitted:', {
      mentee: selectedMentee,
      message: offerMessage
    })
    alert('Mentorship offer sent successfully!')
    handleCloseModal()
  }

  const handleSwipe = (direction: 'left' | 'right', mentee: any) => {
    setSwipeDirection(direction)

    setTimeout(() => {
      if (direction === 'right') {
        handleOfferMentorship(mentee)
      }
      if (currentCardIndex < mentees.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1)
      }
      setSwipeDirection(null)
    }, 300)
  }

  const handleCardAction = (action: 'skip' | 'interested', mentee: any) => {
    if (action === 'interested') {
      handleOfferMentorship(mentee)
    }
    if (currentCardIndex < mentees.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl">
              Find Mentees to Guide
            </h1>
            <p className="mt-4 text-lg text-white/90 font-montserrat">
              Connect with aspiring professionals seeking your guidance and expertise
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by industry, career stage, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-0 font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-lg"
                />
              </div>
              <Button
                size="lg"
                variant="primary"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-primary-dark hover:bg-neutral-100 shadow-lg lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary-accent text-primary-dark rounded-full px-2 py-0.5 text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24 shadow-lg max-h-[calc(100vh-7rem)] overflow-y-auto">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                      Filters
                    </h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Industry Filter */}
                    <div>
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Industry Interests
                      </h4>
                      <div className="space-y-2">
                        {industryOptions.map((industry) => (
                          <label key={industry} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedIndustries.includes(industry)}
                              onChange={() => toggleArrayItem(selectedIndustries, industry, setSelectedIndustries)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {industry}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Career Stage Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Career Stage
                      </h4>
                      <div className="space-y-2">
                        {careerStageOptions.map((stage) => (
                          <label key={stage} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCareerStages.includes(stage)}
                              onChange={() => toggleArrayItem(selectedCareerStages, stage, setSelectedCareerStages)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {stage}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Age Range Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Age Range
                      </h4>
                      <div className="space-y-2">
                        {ageRangeOptions.map((range) => (
                          <label key={range} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedAgeRanges.includes(range)}
                              onChange={() => toggleArrayItem(selectedAgeRanges, range, setSelectedAgeRanges)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {range}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Location
                      </h4>
                      <div className="space-y-2">
                        {locationOptions.map((location) => (
                          <label key={location} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location)}
                              onChange={() => toggleArrayItem(selectedLocations, location, setSelectedLocations)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {location}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mentees Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    {mentees.length} Mentees Seeking Guidance
                  </h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                    </p>
                  )}
                </div>

                {/* View Toggle (Mobile Only) */}
                <div className="lg:hidden flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      viewMode === 'cards'
                        ? 'bg-white text-primary-dark shadow-sm'
                        : 'text-neutral-600'
                    }`}
                  >
                    <Layers className="h-4 w-4" />
                    <span className="text-sm font-semibold font-montserrat">Cards</span>
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
                    <span className="text-sm font-semibold font-montserrat">List</span>
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 hidden lg:flex">
                  <span className="text-sm font-semibold font-montserrat text-neutral-700">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Card View (Mobile Only) */}
              {viewMode === 'cards' && (
                <div className="lg:hidden">
                  {currentCardIndex < mentees.length ? (
                    <>
                      {/* Swipe Instructions */}
                      <div className="mb-4 bg-secondary-accent p-4 rounded-xl shadow-md">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5 animate-pulse" />
                            <span className="text-sm font-semibold font-montserrat">Swipe Left to Pass</span>
                          </div>
                          <div className="h-8 w-px bg-white/30" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold font-montserrat">Swipe Right to Offer Mentorship</span>
                            <ChevronRight className="h-5 w-5 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Card Stack */}
                      <div className="relative h-[500px] mb-6">
                        {mentees.slice(currentCardIndex, currentCardIndex + 2).map((mentee, index) => (
                          <SwipeableCard
                            key={mentee.id + currentCardIndex}
                            mentee={mentee}
                            onSwipe={(direction) => handleSwipe(direction, mentee)}
                            isTop={index === 0}
                          />
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center items-center gap-8">
                        <button
                          onClick={() => handleCardAction('skip', mentees[currentCardIndex])}
                          className="w-16 h-16 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:border-neutral-400 hover:scale-110 transition-all active:scale-95"
                        >
                          <ThumbsDown className="h-6 w-6 text-neutral-600" />
                        </button>

                        <button
                          onClick={() => handleCardAction('interested', mentees[currentCardIndex])}
                          className="w-16 h-16 rounded-full bg-secondary-accent border-2 border-secondary-accent shadow-lg flex items-center justify-center hover:scale-110 transition-all active:scale-95"
                        >
                          <Heart className="h-6 w-6 text-white" />
                        </button>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-6 text-center">
                        <p className="text-sm font-semibold font-montserrat text-neutral-600">
                          {currentCardIndex + 1} of {mentees.length}
                        </p>
                        <div className="mt-2 w-full max-w-xs mx-auto h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-accent transition-all duration-300"
                            style={{ width: `${((currentCardIndex + 1) / mentees.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-accent/10 mb-4">
                        <CheckCircle className="h-10 w-10 text-primary-accent" />
                      </div>
                      <h3 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
                        You've Seen All Mentees!
                      </h3>
                      <p className="text-neutral-600 font-montserrat mb-6">
                        Check back later for new mentees or adjust your filters
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setCurrentCardIndex(0)}
                        className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
                      >
                        Start Over
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* List View */}
              <div className={`grid grid-cols-1 gap-6 ${viewMode === 'cards' ? 'hidden lg:grid' : ''}`}>
                {mentees.map((mentee) => (
                  <Expandable
                    key={mentee.id}
                    expanded={expandedMenteeId === mentee.id}
                    onExpandedChange={(expanded) => setExpandedMenteeId(expanded ? mentee.id : null)}
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-shadow border-neutral-200 hover:border-primary-accent">
                      <CardContent className="p-6">
                        <ExpandableTrigger>
                          <div className="flex flex-col sm:flex-row gap-6 cursor-pointer">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              <div className={`w-20 h-20 rounded-full ${mentee.avatarColor} flex items-center justify-center text-white text-2xl font-bold font-montserrat shadow-lg mx-auto sm:mx-0`}>
                                {mentee.firstName.charAt(0)}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                <div>
                                  <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                                    {mentee.firstName}
                                  </h3>
                                  <p className="text-sm font-semibold font-montserrat text-neutral-700 mt-1">
                                    {mentee.careerStage}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-neutral-600">
                                    <div className="flex items-center gap-1">
                                      <User className="h-4 w-4" />
                                      {mentee.ageRange}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {mentee.location}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {expandedMenteeId === mentee.id ? (
                                    <ChevronUp className="h-6 w-6 text-primary-accent" />
                                  ) : (
                                    <ChevronDown className="h-6 w-6 text-primary-accent" />
                                  )}
                                </div>
                              </div>

                              {/* Aspirations */}
                              <div className="mb-4">
                                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                                  <Target className="h-4 w-4 text-primary-accent" />
                                  Career Aspirations
                                </h4>
                                <p className="text-sm text-neutral-700 font-montserrat leading-relaxed line-clamp-2">
                                  {mentee.aspirations}
                                </p>
                              </div>

                              {/* Industry Interests */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {mentee.industryInterests.slice(0, 3).map((interest, index) => (
                                  <Badge key={index} variant="outline" size="sm" className="border-primary-accent text-primary-accent">
                                    {interest}
                                  </Badge>
                                ))}
                                {mentee.industryInterests.length > 3 && (
                                  <Badge variant="outline" size="sm" className="border-neutral-300 text-neutral-600">
                                    +{mentee.industryInterests.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </ExpandableTrigger>

                        <ExpandableContent animationPreset="slide-up">
                          <div className="mt-6 pt-6 border-t border-neutral-200 space-y-6">
                            {/* Why Mentorship */}
                            <div>
                              <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4 text-secondary-accent" />
                                Why Seeking Mentorship
                              </h4>
                              <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                                {mentee.whyMentorship}
                              </p>
                            </div>

                            {/* Full Aspirations */}
                            <div>
                              <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary-accent" />
                                Career Aspirations (Full)
                              </h4>
                              <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                                {mentee.aspirations}
                              </p>
                            </div>

                            {/* All Industry Interests */}
                            <div>
                              <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2">
                                All Industry Interests
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {mentee.industryInterests.map((interest, index) => (
                                  <Badge key={index} variant="outline" size="sm" className="border-primary-accent text-primary-accent">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Skills to Learn */}
                            <div>
                              <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-secondary-accent" />
                                Skills to Learn
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {mentee.skillsToLearn.map((skill, index) => (
                                  <Badge key={index} variant="secondary" size="sm">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Mentorship Style */}
                            <div>
                              <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary-accent" />
                                Preferred Mentorship Style
                              </h4>
                              <p className="text-sm text-neutral-700 font-montserrat">
                                {mentee.mentorshipStyle}
                              </p>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4">
                              <Button
                                size="lg"
                                variant="primary"
                                className="w-full bg-secondary-accent hover:bg-secondary-accent/90 text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOfferMentorship(mentee)
                                }}
                              >
                                <Heart className="mr-2 h-5 w-5" />
                                Offer Mentorship
                              </Button>
                            </div>
                          </div>
                        </ExpandableContent>
                      </CardContent>
                    </Card>
                  </Expandable>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark"
                >
                  Load More Mentees
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Mentorship Modal */}
      {showOfferModal && selectedMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                  Offer Mentorship to {selectedMentee.firstName}
                </h2>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  {selectedMentee.careerStage} • Interested in {selectedMentee.industryInterests[0]}
                </p>
              </div>
              <button
                onClick={handleCloseOfferModal}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 space-y-6">
              {/* Message Templates */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Message Templates <span className="text-neutral-500 font-normal">(optional)</span>
                </label>
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  Choose a template to get started, then customize it to explain what you can offer
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {messageTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleUseTemplate(template.content)}
                      className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all text-left group"
                    >
                      <FileText className="h-5 w-5 text-primary-accent mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark">
                        {template.title}
                      </h4>
                      <p className="text-xs text-neutral-600 font-montserrat mt-1">
                        Click to use this template
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                  Your Mentorship Offer *
                </label>
                <textarea
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm resize-none"
                  placeholder="Explain what you can offer as a mentor, your relevant experience, and how you can help them achieve their goals..."
                  required
                />
                <p className="text-xs text-neutral-500 font-montserrat mt-2">
                  {offerMessage.length} characters
                </p>
              </div>

              {/* Info Banner */}
              <div className="bg-secondary-accent/10 border border-secondary-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-secondary-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-1">
                      What happens next?
                    </h4>
                    <p className="text-sm text-neutral-700 font-montserrat">
                      Your mentorship offer will be sent to {selectedMentee.firstName}. If they accept, you'll both be matched and can start your mentorship journey together!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 px-8 py-6 flex flex-col sm:flex-row gap-4 justify-end rounded-b-2xl">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCloseOfferModal}
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitOffer}
                disabled={!offerMessage.trim()}
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Offer
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

// Swipeable Card Component
function SwipeableCard({ mentee, onSwipe, isTop }: { mentee: any; onSwipe: (direction: 'left' | 'right') => void; isTop: boolean }) {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)

  const minSwipeDistance = 50
  const maxTapDuration = 200 // milliseconds
  const maxTapMovement = 10 // pixels

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchEndY(0)
    setTouchStart(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
    setTouchStartTime(Date.now())
    setIsDragging(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentTouch = e.targetTouches[0].clientX
    const currentTouchY = e.targetTouches[0].clientY

    // Only allow swipe if not expanded
    if (!isExpanded) {
      setDragOffset(currentTouch - touchStart)
    }
    setTouchEnd(currentTouch)
    setTouchEndY(currentTouchY)
  }

  const onTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const touchDuration = Date.now() - touchStartTime
    const distanceX = Math.abs(touchStart - touchEnd)
    const distanceY = Math.abs(touchStartY - touchEndY)
    const totalMovement = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Check if it was a tap (short duration, minimal movement)
    if (touchDuration < maxTapDuration && totalMovement < maxTapMovement) {
      // It's a tap - toggle expansion
      setIsExpanded(!isExpanded)
      setDragOffset(0)
      setTouchStart(0)
      setTouchEnd(0)
      setTouchStartY(0)
      setTouchEndY(0)
      return
    }

    // Only allow swipe if not expanded
    if (!isExpanded && touchStart && touchEnd) {
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance

      if (isLeftSwipe) {
        onSwipe('left')
      } else if (isRightSwipe) {
        onSwipe('right')
      }
    }

    setDragOffset(0)
    setTouchStart(0)
    setTouchEnd(0)
    setTouchStartY(0)
    setTouchEndY(0)
  }

  const rotation = dragOffset * 0.1
  const opacity = 1 - Math.abs(dragOffset) / 300

  return (
    <div
      className={`absolute inset-0 transition-all duration-200 ${
        isTop ? 'z-20' : 'z-10 scale-95 opacity-70'
      }`}
      style={{
        transform: isTop
          ? `translateX(${dragOffset}px) rotate(${rotation}deg)`
          : undefined,
        opacity: isTop ? opacity : undefined,
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Card className={`shadow-2xl border-2 ${isExpanded ? 'h-[90vh] overflow-y-auto' : 'h-full overflow-hidden'}`}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Header with Avatar and Basic Info */}
          <div className="p-3 border-b border-neutral-100 flex-shrink-0">
            <div className="flex items-start gap-3">
              {/* Placeholder Avatar */}
              <div className={`w-16 h-16 rounded-full ${mentee.avatarColor} flex items-center justify-center text-white text-2xl font-bold font-montserrat shadow flex-shrink-0`}>
                {mentee.firstName.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold font-montserrat text-primary-dark truncate">
                      {mentee.firstName}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-700 font-montserrat truncate">
                      {mentee.careerStage}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-1 text-xs text-neutral-600">
                      <div className="flex items-center gap-0.5">
                        <User className="h-3 w-3" />
                        <span className="font-montserrat">{mentee.ageRange}</span>
                      </div>
                      <span className="text-neutral-300">•</span>
                      <div className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        <span className="font-montserrat truncate max-w-[100px]">{mentee.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-primary-accent" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary-accent" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {isExpanded && (
              <div className="mt-2 text-center">
                <p className="text-xs text-neutral-500 font-montserrat">
                  Tap the arrow to close • Swipe disabled while expanded
                </p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="space-y-2.5">
              {/* Career Aspirations */}
              <div>
                <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide flex items-center gap-1">
                  <Target className="h-3 w-3 text-primary-accent" />
                  Career Goals
                </h4>
                <p className="text-[11px] text-neutral-700 font-montserrat leading-snug line-clamp-3">
                  {mentee.aspirations}
                </p>
              </div>

              {/* Why Mentorship */}
              <div>
                <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="h-3 w-3 text-secondary-accent" />
                  Why Seeking Mentorship
                </h4>
                <p className="text-[11px] text-neutral-700 font-montserrat leading-snug line-clamp-2">
                  {mentee.whyMentorship}
                </p>
              </div>

              {/* Industry Interests */}
              <div>
                <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide">Industry Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {mentee.industryInterests.slice(0, 3).map((interest: string, index: number) => (
                    <Badge key={index} variant="outline" size="sm" className="border-primary-accent text-primary-accent text-[10px] py-0 px-2">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills to Learn */}
              <div>
                <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-secondary-accent" />
                  Wants to Learn
                </h4>
                <div className="flex flex-wrap gap-1">
                  {mentee.skillsToLearn.slice(0, 3).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" size="sm" className="text-[10px] py-0 px-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="p-4 space-y-4 bg-white">
              {/* Full Aspirations */}
              <div>
                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary-accent" />
                  Career Aspirations (Full)
                </h4>
                <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                  {mentee.aspirations}
                </p>
              </div>

              {/* Why Mentorship */}
              <div>
                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-secondary-accent" />
                  Why Seeking Mentorship
                </h4>
                <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                  {mentee.whyMentorship}
                </p>
              </div>

              {/* All Industry Interests */}
              <div>
                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2">
                  All Industry Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mentee.industryInterests.map((interest: string, index: number) => (
                    <Badge key={index} variant="outline" size="sm" className="border-primary-accent text-primary-accent">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills to Learn */}
              <div>
                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary-accent" />
                  Skills to Learn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mentee.skillsToLearn.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Mentorship Style */}
              <div>
                <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-accent" />
                  Preferred Mentorship Style
                </h4>
                <p className="text-sm text-neutral-700 font-montserrat">
                  {mentee.mentorshipStyle}
                </p>
              </div>
            </div>
          )}

          {/* Swipe Indicators */}
          {dragOffset !== 0 && !isExpanded && (
            <>
              {dragOffset > 0 && (
                <div className="absolute top-20 right-8 bg-secondary-accent text-white px-6 py-3 rounded-full font-bold font-montserrat text-lg shadow-xl transform rotate-12">
                  OFFER
                </div>
              )}
              {dragOffset < 0 && (
                <div className="absolute top-20 left-8 bg-neutral-600 text-white px-6 py-3 rounded-full font-bold font-montserrat text-lg shadow-xl transform -rotate-12">
                  PASS
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
