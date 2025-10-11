'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Expandable, ExpandableTrigger, ExpandableContent, useExpandable } from '@/components/ui/expandable'
import {
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  Users,
  Clock,
  X,
  ChevronDown,
  SlidersHorizontal,
  Heart,
  Linkedin,
  Instagram,
  Twitter,
  Upload,
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
  ChevronUp
} from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'

export default function BrowseMentors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('recommended')
  const [showInterestModal, setShowInterestModal] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [interestMessage, setInterestMessage] = useState('')
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards') // Default to cards on mobile
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [expandedMentorId, setExpandedMentorId] = useState<number | null>(null)

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'London, UK',
      industry: 'Technology',
      rating: 4.9,
      reviewCount: 127,
      mentees: 45,
      yearsExperience: 12,
      expertise: ['Software Development', 'Career Growth', 'Leadership'],
      availability: 'Available',
      bio: 'Passionate about helping early-career engineers navigate the tech industry. Specialized in full-stack development and career advancement strategies.',
      avatar: null,
      socialMedia: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahj_codes',
        instagram: null,
        tiktok: null,
      },
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Marketing Director',
      company: 'Adobe',
      location: 'Manchester, UK',
      industry: 'Marketing',
      rating: 4.8,
      reviewCount: 93,
      mentees: 38,
      yearsExperience: 15,
      expertise: ['Digital Marketing', 'Brand Strategy', 'Team Management'],
      availability: 'Limited',
      bio: 'Marketing executive with 15+ years of experience in digital transformation and brand building. Love mentoring aspiring marketers.',
      avatar: null,
      socialMedia: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        twitter: 'https://twitter.com/mchen_marketing',
        instagram: 'https://instagram.com/michaelchen',
        tiktok: 'https://tiktok.com/@mchen_tips',
      },
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Birmingham, UK',
      industry: 'Technology',
      rating: 5.0,
      reviewCount: 156,
      mentees: 52,
      yearsExperience: 10,
      expertise: ['Product Strategy', 'User Research', 'Agile'],
      availability: 'Available',
      bio: 'Helping product managers and aspiring PMs build successful products and advance their careers in tech.',
      avatar: null,
      socialMedia: {
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        twitter: null,
        instagram: null,
        tiktok: null,
      },
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Financial Analyst',
      company: 'Goldman Sachs',
      location: 'Edinburgh, Scotland',
      industry: 'Finance',
      rating: 4.7,
      reviewCount: 82,
      mentees: 31,
      yearsExperience: 8,
      expertise: ['Investment Banking', 'Financial Modeling', 'Career Transition'],
      availability: 'Available',
      bio: 'Former investment banker helping professionals break into finance and advance their careers in the financial services industry.',
      avatar: null,
      socialMedia: {
        linkedin: 'https://linkedin.com/in/davidkim',
        twitter: 'https://twitter.com/davidkim_finance',
        instagram: null,
        tiktok: null,
      },
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      title: 'UX Design Lead',
      company: 'Apple',
      location: 'Bristol, UK',
      industry: 'Design',
      rating: 4.9,
      reviewCount: 104,
      mentees: 42,
      yearsExperience: 11,
      expertise: ['UX Design', 'Design Thinking', 'Portfolio Building'],
      availability: 'Limited',
      bio: 'Passionate about mentoring designers at all levels. Specialized in UX research, interaction design, and building stellar portfolios.',
      avatar: null,
      socialMedia: {
        linkedin: 'https://linkedin.com/in/jessicataylor',
        twitter: 'https://twitter.com/jtaylor_ux',
        instagram: 'https://instagram.com/jessicataylordesign',
        tiktok: null,
      },
    },
    {
      id: 6,
      name: 'James Anderson',
      title: 'Data Science Manager',
      company: 'Amazon',
      location: 'Cardiff, Wales',
      industry: 'Technology',
      rating: 4.8,
      reviewCount: 91,
      mentees: 36,
      yearsExperience: 13,
      expertise: ['Machine Learning', 'Data Analytics', 'Career Development'],
      availability: 'Available',
      bio: 'Data scientist turned manager, helping others navigate careers in data science, ML engineering, and analytics.',
      avatar: null,
      socialMedia: {
        linkedin: null,
        twitter: null,
        instagram: null,
        tiktok: null,
      },
    },
  ]

  const industries = [
    'Technology',
    'Marketing',
    'Finance',
    'Design',
    'Healthcare',
    'Education',
    'Consulting',
    'Sales',
  ]

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
    'Available',
    'Limited',
    'Fully Booked',
  ]

  const experienceLevels = [
    '5-10 years',
    '10-15 years',
    '15+ years',
  ]

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'availability', label: 'Available Now' },
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
    setSelectedExpertise([])
    setSelectedAvailability([])
    setExperienceLevel([])
    setSearchQuery('')
  }

  const activeFiltersCount =
    selectedIndustries.length +
    selectedExpertise.length +
    selectedAvailability.length +
    experienceLevel.length

  const messageTemplates = [
    {
      title: 'Professional Introduction',
      content: `Hi [Mentor Name],

I came across your profile and was impressed by your experience in [Industry/Field]. I'm currently working as a [Your Role] and am eager to learn from someone with your background.

I would be honored to have you as my mentor. I'm particularly interested in [Specific Area] and believe your guidance could help me grow in my career.

Looking forward to connecting with you!

Best regards,
[Your Name]`
    },
    {
      title: 'Career Transition',
      content: `Dear [Mentor Name],

I'm in the process of transitioning into [New Field/Role] and your profile stood out to me because of your extensive experience in this area.

I would greatly appreciate the opportunity to learn from you and gain insights into [Specific Topic]. Your mentorship would be invaluable as I navigate this career change.

Thank you for considering my request!

Sincerely,
[Your Name]`
    },
    {
      title: 'Skill Development',
      content: `Hello [Mentor Name],

I'm reaching out because I'm focused on developing my skills in [Specific Skill/Area] and I believe your expertise would be incredibly valuable.

I've been following your work in [Industry] and would love the opportunity to learn from your experience. I'm committed to making the most of any mentorship opportunity.

I hope we can connect soon!

Best,
[Your Name]`
    },
    {
      title: 'Industry Navigation',
      content: `Hi [Mentor Name],

I'm currently navigating the [Industry] landscape and would greatly benefit from your insights and experience in this field.

As someone who has successfully built a career in [Industry], your guidance would be invaluable in helping me understand industry trends, best practices, and potential opportunities.

I would be grateful for the chance to learn from your journey and gain perspective on how to thrive in this industry.

Thank you for considering mentoring me!

Warm regards,
[Your Name]`
    },
    {
      title: 'Life Mentorship & Support',
      content: `Dear [Mentor Name],

I'm reaching out because I'm looking for guidance not just professionally, but also in maintaining balance and finding fulfillment in my career journey.

Your approach to [Work-Life Balance/Personal Development/Leadership] really resonates with me, and I believe your mentorship could help me grow both personally and professionally.

I would appreciate the opportunity to learn from your experiences and gain wisdom on navigating both career challenges and life decisions.

Looking forward to the possibility of connecting with you!

Sincerely,
[Your Name]`
    },
  ]

  const handleShowInterest = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowInterestModal(true)
    setInterestMessage('')
    setUploadedCV(null)
  }

  const handleCloseInterestModal = () => {
    setShowInterestModal(false)
    setSelectedMentor(null)
    setInterestMessage('')
    setUploadedCV(null)
  }

  const handleUseTemplate = (template: string) => {
    setInterestMessage(template)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (allowedTypes.includes(file.type)) {
        setUploadedCV(file)
      } else {
        alert('Please upload a PDF or Word document')
      }
    }
  }

  const handleSubmitInterest = () => {
    console.log('Interest submitted:', {
      mentor: selectedMentor,
      message: interestMessage,
      cv: uploadedCV
    })
    // Here you would send the data to your backend
    alert('Interest sent successfully!')
    handleCloseInterestModal()
  }

  const handleSwipe = (direction: 'left' | 'right', mentor: any) => {
    setSwipeDirection(direction)

    setTimeout(() => {
      if (direction === 'right') {
        // User is interested - show interest modal directly
        handleShowInterest(mentor)
      }
      // Move to next card
      if (currentCardIndex < mentors.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1)
      }
      setSwipeDirection(null)
    }, 300)
  }

  const handleCardAction = (action: 'skip' | 'interested', mentor: any) => {
    if (action === 'interested') {
      handleShowInterest(mentor)
    }
    // Move to next card
    if (currentCardIndex < mentors.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl">
              Find Your Perfect Mentor
            </h1>
            <p className="mt-4 text-lg text-white/90 font-montserrat">
              Browse our network of experienced mentors ready to guide your journey
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by name, company, or expertise..."
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
      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24 shadow-lg max-h-[calc(100vh-7rem)] overflow-y-auto bg-white border-neutral-200">
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
                        Industry
                      </h4>
                      <div className="space-y-2">
                        {industries.map((industry) => (
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

                    {/* Expertise Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Expertise
                      </h4>
                      <div className="space-y-2">
                        {expertiseAreas.map((expertise) => (
                          <label key={expertise} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedExpertise.includes(expertise)}
                              onChange={() => toggleArrayItem(selectedExpertise, expertise, setSelectedExpertise)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {expertise}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Availability Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Availability
                      </h4>
                      <div className="space-y-2">
                        {availabilityOptions.map((availability) => (
                          <label key={availability} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedAvailability.includes(availability)}
                              onChange={() => toggleArrayItem(selectedAvailability, availability, setSelectedAvailability)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {availability}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-sm font-semibold font-montserrat text-primary-dark mb-3">
                        Experience Level
                      </h4>
                      <div className="space-y-2">
                        {experienceLevels.map((level) => (
                          <label key={level} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={experienceLevel.includes(level)}
                              onChange={() => toggleArrayItem(experienceLevel, level, setExperienceLevel)}
                              className="h-4 w-4 rounded border-neutral-300 text-primary-accent focus:ring-primary-accent cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-montserrat text-neutral-700 group-hover:text-primary-dark">
                              {level}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mentors Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    {mentors.length} Mentors Available
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
                  {currentCardIndex < mentors.length ? (
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
                            <span className="text-sm font-semibold font-montserrat">Swipe Right if Interested</span>
                            <ChevronRight className="h-5 w-5 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Card Stack */}
                      <div className="relative h-[450px] mb-6">
                        {/* Show current card and next card */}
                        {mentors.slice(currentCardIndex, currentCardIndex + 2).map((mentor, index) => (
                          <SwipeableCard
                            key={mentor.id + currentCardIndex}
                            mentor={mentor}
                            onSwipe={(direction) => handleSwipe(direction, mentor)}
                            isTop={index === 0}
                          />
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center items-center gap-6">
                        <button
                          onClick={() => handleCardAction('skip', mentors[currentCardIndex])}
                          className="w-16 h-16 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:border-neutral-400 hover:scale-110 transition-all active:scale-95"
                        >
                          <ThumbsDown className="h-6 w-6 text-neutral-600" />
                        </button>

                        <button
                          onClick={() => handleCardAction('interested', mentors[currentCardIndex])}
                          className="w-16 h-16 rounded-full bg-secondary-accent border-2 border-secondary-accent shadow-lg flex items-center justify-center hover:scale-110 transition-all active:scale-95"
                        >
                          <Heart className="h-6 w-6 text-white" />
                        </button>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-6 text-center">
                        <p className="text-sm font-semibold font-montserrat text-neutral-600">
                          {currentCardIndex + 1} of {mentors.length}
                        </p>
                        <div className="mt-2 w-full max-w-xs mx-auto h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-accent transition-all duration-300"
                            style={{ width: `${((currentCardIndex + 1) / mentors.length) * 100}%` }}
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
                        You've Seen All Mentors!
                      </h3>
                      <p className="text-neutral-600 font-montserrat mb-6">
                        Check back later for new mentors or adjust your filters
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
                {mentors.map((mentor) => (
                  <Expandable
                    key={mentor.id}
                    expanded={expandedMentorId === mentor.id}
                    onExpandedChange={(expanded) => setExpandedMentorId(expanded ? mentor.id : null)}
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-shadow border-neutral-200 hover:border-primary-accent">
                      <CardContent className="p-6">
                        <ExpandableTrigger>
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              <Avatar
                                fallback={mentor.name}
                                size="xl"
                                className="mx-auto sm:mx-0"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                                <div>
                                  <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                                    {mentor.name}
                                  </h3>
                                  <p className="text-sm font-semibold font-montserrat text-neutral-700 mt-1">
                                    {mentor.title}
                                  </p>
                                  <p className="text-sm font-montserrat text-neutral-600">
                                    {mentor.company}
                                  </p>
                                </div>

                                {/* Rating & Expand Icon */}
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-warning text-warning" />
                                    <span className="text-lg font-bold font-montserrat text-primary-dark">
                                      {mentor.rating}
                                    </span>
                                    <span className="text-sm text-neutral-600 font-montserrat">
                                      ({mentor.reviewCount})
                                    </span>
                                  </div>
                                  {expandedMentorId === mentor.id ? (
                                    <ChevronUp className="h-6 w-6 text-primary-accent" />
                                  ) : (
                                    <ChevronDown className="h-6 w-6 text-primary-accent" />
                                  )}
                                </div>
                              </div>

                              {/* Info Tags */}
                              <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 font-montserrat">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {mentor.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  {mentor.yearsExperience} years exp.
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {mentor.mentees} mentees
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className={`h-4 w-4 ${mentor.availability === 'Available' ? 'text-success' : 'text-warning'}`} />
                                  <span className={mentor.availability === 'Available' ? 'text-success' : 'text-warning'}>
                                    {mentor.availability}
                                  </span>
                                </div>
                              </div>

                              {/* Bio */}
                              <p className="text-sm text-neutral-700 font-montserrat mb-4 leading-relaxed">
                                {mentor.bio}
                              </p>

                              {/* Expertise Tags */}
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" size="sm" className="border-primary-accent text-primary-accent">
                                  {mentor.industry}
                                </Badge>
                                {mentor.expertise.map((skill, index) => (
                                  <Badge key={index} variant="secondary" size="sm">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </ExpandableTrigger>

                        {/* Expanded Content */}
                        <ExpandableContent animationPreset="slide-up">
                          <div className="mt-6 pt-6 border-t border-neutral-200 space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4">
                              <Card className="border-primary-accent/20 bg-primary-accent/5">
                                <CardContent className="p-4 text-center">
                                  <Briefcase className="h-6 w-6 text-primary-accent mx-auto mb-2" />
                                  <p className="text-2xl font-bold font-montserrat text-primary-dark">
                                    {mentor.yearsExperience}
                                  </p>
                                  <p className="text-xs text-neutral-600 font-montserrat">Years Experience</p>
                                </CardContent>
                              </Card>
                              <Card className="border-secondary-accent/20 bg-secondary-accent/5">
                                <CardContent className="p-4 text-center">
                                  <Users className="h-6 w-6 text-secondary-accent mx-auto mb-2" />
                                  <p className="text-2xl font-bold font-montserrat text-primary-dark">
                                    {mentor.mentees}
                                  </p>
                                  <p className="text-xs text-neutral-600 font-montserrat">Mentees Guided</p>
                                </CardContent>
                              </Card>
                              <Card className={`border-${mentor.availability === 'Available' ? 'success' : 'warning'}/20 bg-${mentor.availability === 'Available' ? 'success' : 'warning'}/5`}>
                                <CardContent className="p-4 text-center">
                                  <Clock className={`h-6 w-6 ${mentor.availability === 'Available' ? 'text-success' : 'text-warning'} mx-auto mb-2`} />
                                  <p className={`text-lg font-bold font-montserrat ${mentor.availability === 'Available' ? 'text-success' : 'text-warning'}`}>
                                    {mentor.availability}
                                  </p>
                                  <p className="text-xs text-neutral-600 font-montserrat">Status</p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Social Media */}
                            {(mentor.socialMedia.linkedin || mentor.socialMedia.twitter || mentor.socialMedia.instagram || mentor.socialMedia.tiktok) && (
                              <div>
                                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-3">
                                  Connect Online
                                </h3>
                                <div className="flex items-center gap-4">
                                  {mentor.socialMedia.linkedin && (
                                    <a
                                      href={mentor.socialMedia.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all group"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Linkedin className="h-5 w-5 text-neutral-600 group-hover:text-primary-accent transition-colors" />
                                      <span className="text-sm font-semibold font-montserrat text-neutral-700 group-hover:text-primary-accent transition-colors">
                                        LinkedIn
                                      </span>
                                    </a>
                                  )}
                                  {mentor.socialMedia.twitter && (
                                    <a
                                      href={mentor.socialMedia.twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all group"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Twitter className="h-5 w-5 text-neutral-600 group-hover:text-primary-accent transition-colors" />
                                      <span className="text-sm font-semibold font-montserrat text-neutral-700 group-hover:text-primary-accent transition-colors">
                                        Twitter
                                      </span>
                                    </a>
                                  )}
                                  {mentor.socialMedia.instagram && (
                                    <a
                                      href={mentor.socialMedia.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all group"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Instagram className="h-5 w-5 text-neutral-600 group-hover:text-primary-accent transition-colors" />
                                      <span className="text-sm font-semibold font-montserrat text-neutral-700 group-hover:text-primary-accent transition-colors">
                                        Instagram
                                      </span>
                                    </a>
                                  )}
                                  {mentor.socialMedia.tiktok && (
                                    <a
                                      href={mentor.socialMedia.tiktok}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all group"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <FaTiktok className="h-5 w-5 text-neutral-600 group-hover:text-primary-accent transition-colors" />
                                      <span className="text-sm font-semibold font-montserrat text-neutral-700 group-hover:text-primary-accent transition-colors">
                                        TikTok
                                      </span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Action Button */}
                            <div className="flex justify-center">
                              <Button
                                size="lg"
                                variant="primary"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleShowInterest(mentor)
                                }}
                                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white"
                              >
                                <Heart className="mr-2 h-5 w-5" />
                                Show Interest
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
                  Load More Mentors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Show Interest Modal */}
      {showInterestModal && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                  Show Interest in {selectedMentor.name}
                </h2>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  {selectedMentor.title} at {selectedMentor.company}
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
              {/* Message Templates */}
              <div>
                <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-3">
                  Message Templates <span className="text-neutral-500 font-normal">(optional)</span>
                </label>
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  Choose a template to get started, then customize it to make it your own
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
                  Your Message *
                </label>
                <textarea
                  value={interestMessage}
                  onChange={(e) => setInterestMessage(e.target.value)}
                  rows={10}
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
                <p className="text-sm text-neutral-600 font-montserrat mb-3">
                  Sharing your CV helps mentors understand your background better
                </p>

                {uploadedCV ? (
                  <div className="flex items-center justify-between p-4 bg-primary-accent/10 border-2 border-primary-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-accent/20 rounded-lg">
                        <FileText className="h-5 w-5 text-primary-accent" />
                      </div>
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
                      className="text-neutral-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-accent hover:bg-primary-accent/5 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-primary-accent mb-2 group-hover:scale-110 transition-transform" />
                      <p className="mb-1 text-sm font-semibold font-montserrat text-neutral-700">
                        Click to upload CV/Resume
                      </p>
                      <p className="text-xs text-neutral-500 font-montserrat">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
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
                      Your interest will be sent to {selectedMentor.name}. If they accept, you'll be able to message them directly and schedule your first session.
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
                onClick={handleCloseInterestModal}
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmitInterest}
                disabled={!interestMessage.trim()}
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Interest
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
function SwipeableCard({ mentor, onSwipe, isTop }: { mentor: any; onSwipe: (direction: 'left' | 'right') => void; isTop: boolean }) {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [touchStartTime, setTouchStartTime] = useState(0)

  const minSwipeDistance = 50
  const maxTapDuration = 200 // milliseconds

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
    setTouchStartTime(Date.now())
    setIsDragging(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentTouch = e.targetTouches[0].clientX
    setDragOffset(currentTouch - touchStart)
    setTouchEnd(currentTouch)
  }

  const onTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const touchDuration = Date.now() - touchStartTime
    const distance = touchStart - touchEnd

    // Check if it was a tap (short duration, minimal movement)
    if (touchDuration < maxTapDuration && Math.abs(distance) < 10) {
      // It's a tap - toggle expansion
      setIsExpanded(!isExpanded)
      setDragOffset(0)
      setTouchStart(0)
      setTouchEnd(0)
      return
    }

    if (!touchStart || !touchEnd) {
      setDragOffset(0)
      return
    }

    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        onSwipe('left')
      } else if (isRightSwipe) {
        onSwipe('right')
      }
    }

    setDragOffset(0)
    setTouchStart(0)
    setTouchEnd(0)
  }

  const rotation = dragOffset * 0.1
  const opacity = 1 - Math.abs(dragOffset) / 300

  return (
    <div
      className={`absolute inset-0 transition-all duration-200 ${
        isTop ? 'z-20' : 'z-10 scale-95 opacity-70'
      }`}
      style={{
        transform: isTop && !isExpanded
          ? `translateX(${dragOffset}px) rotate(${rotation}deg)`
          : undefined,
        opacity: isTop && !isExpanded ? opacity : undefined,
      }}
      onTouchStart={isExpanded ? undefined : onTouchStart}
      onTouchMove={isExpanded ? undefined : onTouchMove}
      onTouchEnd={isExpanded ? undefined : onTouchEnd}
    >
      <Card className={`shadow-2xl border-2 border-neutral-200 overflow-y-auto transition-all duration-300 ${
        isExpanded ? 'h-[90vh]' : 'h-full'
      }`}>
        <CardContent className="p-0">
          {/* Header with Avatar Left and Social Right */}
          <div className="p-3 border-b border-neutral-100 flex-shrink-0 bg-white sticky top-0 z-10">
            <div className="flex items-start gap-3">
              {/* Avatar and Info */}
              <Avatar
                fallback={mentor.name}
                size="md"
                className="shadow flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold font-montserrat text-primary-dark truncate">
                  {mentor.name}
                </h3>
                <p className="text-xs font-semibold text-neutral-700 font-montserrat truncate">
                  {mentor.title}
                </p>
                <p className="text-xs text-neutral-600 font-montserrat truncate">
                  {mentor.company}
                </p>
                <div className="flex items-center flex-wrap gap-2 mt-1 text-xs text-neutral-600">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="font-bold font-montserrat text-primary-dark">{mentor.rating}</span>
                  </div>
                  <span className="text-neutral-300">•</span>
                  <div className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    <span className="font-montserrat truncate max-w-[100px]">{mentor.location}</span>
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-primary-accent" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary-accent" />
                )}
                {/* Social Media Icons - show only when collapsed */}
                {!isExpanded && (mentor.socialMedia.linkedin || mentor.socialMedia.twitter || mentor.socialMedia.instagram || mentor.socialMedia.tiktok) && (
                  <div className="flex flex-col gap-1">
                    {mentor.socialMedia.linkedin && (
                      <a
                        href={mentor.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-primary-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            {isExpanded && (
              <p className="text-xs text-center text-primary-accent font-semibold font-montserrat mt-2">
                Tap the arrow to close
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-primary-accent/10 rounded">
                <Briefcase className="h-3 w-3 text-primary-accent flex-shrink-0" />
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xs font-bold font-montserrat text-primary-dark">
                    {mentor.yearsExperience}
                  </span>
                  <span className="text-[10px] text-neutral-600 font-montserrat">yrs</span>
                </div>
              </div>
              <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded ${
                mentor.availability === 'Available' ? 'bg-success/10' : 'bg-warning/10'
              }`}>
                <Clock className={`h-3 w-3 flex-shrink-0 ${
                  mentor.availability === 'Available' ? 'text-success' : 'text-warning'
                }`} />
                <span className={`text-[10px] font-semibold font-montserrat ${
                  mentor.availability === 'Available' ? 'text-success' : 'text-warning'
                }`}>
                  {mentor.availability}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-3">
              <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide">About</h4>
              <p className={`text-[11px] text-neutral-700 font-montserrat leading-snug ${!isExpanded ? 'line-clamp-2' : ''}`}>
                {mentor.bio}
              </p>
            </div>

            {/* Industry */}
            <div className="mb-3">
              <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide">Industry</h4>
              <Badge variant="outline" size="sm" className="border-primary-accent text-primary-accent text-[10px] py-0 px-2">
                {mentor.industry}
              </Badge>
            </div>

            {/* Expertise */}
            <div className="mb-3">
              <h4 className="text-[10px] font-bold font-montserrat text-primary-dark mb-1 uppercase tracking-wide">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {(isExpanded ? mentor.expertise : mentor.expertise.slice(0, 3)).map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" size="sm" className="text-[10px] py-0 px-2">
                    {skill}
                  </Badge>
                ))}
                {!isExpanded && mentor.expertise.length > 3 && (
                  <Badge variant="secondary" size="sm" className="text-[10px] py-0 px-2">
                    +{mentor.expertise.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-4 mt-4 pt-4 border-t border-neutral-200">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-2">
                  <Card className="border-primary-accent/20 bg-primary-accent/5">
                    <CardContent className="p-2 text-center">
                      <Briefcase className="h-4 w-4 text-primary-accent mx-auto mb-1" />
                      <p className="text-lg font-bold font-montserrat text-primary-dark">
                        {mentor.yearsExperience}
                      </p>
                      <p className="text-[8px] text-neutral-600 font-montserrat">Years Exp</p>
                    </CardContent>
                  </Card>
                  <Card className="border-secondary-accent/20 bg-secondary-accent/5">
                    <CardContent className="p-2 text-center">
                      <Users className="h-4 w-4 text-secondary-accent mx-auto mb-1" />
                      <p className="text-lg font-bold font-montserrat text-primary-dark">
                        {mentor.mentees}
                      </p>
                      <p className="text-[8px] text-neutral-600 font-montserrat">Mentees</p>
                    </CardContent>
                  </Card>
                  <Card className={`border-${mentor.availability === 'Available' ? 'success' : 'warning'}/20 bg-${mentor.availability === 'Available' ? 'success' : 'warning'}/5`}>
                    <CardContent className="p-2 text-center">
                      <Clock className={`h-4 w-4 ${mentor.availability === 'Available' ? 'text-success' : 'text-warning'} mx-auto mb-1`} />
                      <p className={`text-sm font-bold font-montserrat ${mentor.availability === 'Available' ? 'text-success' : 'text-warning'}`}>
                        {mentor.availability}
                      </p>
                      <p className="text-[8px] text-neutral-600 font-montserrat">Status</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Media */}
                {(mentor.socialMedia.linkedin || mentor.socialMedia.twitter || mentor.socialMedia.instagram || mentor.socialMedia.tiktok) && (
                  <div>
                    <h4 className="text-sm font-bold font-montserrat text-primary-dark mb-2">
                      Connect Online
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.socialMedia.linkedin && (
                        <a
                          href={mentor.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-4 w-4 text-neutral-600" />
                          <span className="text-xs font-semibold font-montserrat text-neutral-700">
                            LinkedIn
                          </span>
                        </a>
                      )}
                      {mentor.socialMedia.twitter && (
                        <a
                          href={mentor.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="h-4 w-4 text-neutral-600" />
                          <span className="text-xs font-semibold font-montserrat text-neutral-700">
                            Twitter
                          </span>
                        </a>
                      )}
                      {mentor.socialMedia.instagram && (
                        <a
                          href={mentor.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram className="h-4 w-4 text-neutral-600" />
                          <span className="text-xs font-semibold font-montserrat text-neutral-700">
                            Instagram
                          </span>
                        </a>
                      )}
                      {mentor.socialMedia.tiktok && (
                        <a
                          href={mentor.socialMedia.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTiktok className="h-4 w-4 text-neutral-600" />
                          <span className="text-xs font-semibold font-montserrat text-neutral-700">
                            TikTok
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Swipe Indicators */}
          {!isExpanded && dragOffset !== 0 && (
            <>
              {dragOffset > 0 && (
                <div className="absolute top-20 right-8 bg-secondary-accent text-white px-6 py-3 rounded-full font-bold font-montserrat text-lg shadow-xl transform rotate-12">
                  INTERESTED
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
