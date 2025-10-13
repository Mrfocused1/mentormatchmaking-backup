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
  Check,
  Eye,
  MapPin,
  Star,
  Briefcase,
  Users,
  Clock,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Link as LinkIcon
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
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileMentor, setProfileMentor] = useState<any>(null)

  // Filter modal search states
  const [industrySearch, setIndustrySearch] = useState('')
  const [expertiseSearch, setExpertiseSearch] = useState('')

  // Swipe feedback animation state
  const [swipeFeedback, setSwipeFeedback] = useState<'left' | 'right' | null>(null)

  // Onboarding overlay state (mobile only)
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Set initial view mode based on screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 768
      if (isDesktop) {
        setViewMode('list')
      }
    }
  }, [])

  // Show onboarding overlay when entering results view on mobile
  useEffect(() => {
    if (currentStep === 'results' && viewMode === 'swipe') {
      // Check if mobile (width < 768px)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

      if (isMobile) {
        setShowOnboarding(true)
      }
    }
  }, [currentStep, viewMode])

  const handleDismissOnboarding = () => {
    setShowOnboarding(false)
  }

  // Mock data with Pexels avatars
  const [mentors, setMentors] = useState([
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
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      languages: ['English (Native)', 'Mandarin (Fluent)'],
      industries: ['Technology', 'Startups', 'SaaS'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen',
        github: 'https://github.com/sarahchen',
        email: 'sarah.chen@email.com',
        website: 'https://sarahchen.dev'
      },
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
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      languages: ['English (Native)', 'Spanish (Native)'],
      industries: ['Marketing', 'Advertising', 'E-commerce'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/mrodriguez',
        twitter: 'https://twitter.com/mrodriguez',
        email: 'michael.rodriguez@email.com',
        website: 'https://michaelrodriguez.com'
      },
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
      avatar: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      languages: ['English (Native)', 'French (Conversational)'],
      industries: ['Technology', 'SaaS', 'Enterprise Software'],
      socialMedia: {
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        twitter: 'https://twitter.com/emilypm',
        github: 'https://github.com/emilyrodriguez',
        email: 'emily.rodriguez@email.com'
      },
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
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      languages: ['English (Native)'],
      industries: ['Technology', 'E-commerce', 'AI/ML'],
    },
  ])

  // Fetch Pexels images for avatars
  useEffect(() => {
    const fetchPexelsImages = async () => {
      try {
        console.log('Fetching Pexels images...')
        const response = await fetch('https://api.pexels.com/v1/search?query=professional+business+portrait&per_page=20&orientation=square', {
          headers: {
            Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp'
          }
        })

        const data = await response.json()
        console.log('Pexels API response:', data)

        if (data.photos && data.photos.length >= 6) {
          console.log('Setting mentor avatars with Pexels images')
          setMentors(prevMentors =>
            prevMentors.map((mentor, index) => ({
              ...mentor,
              avatar: data.photos[index]?.src?.medium || null
            }))
          )
        } else {
          console.log('Not enough photos returned:', data.photos?.length)
        }
      } catch (error) {
        console.error('Error fetching Pexels images:', error)
      }
    }

    fetchPexelsImages()
  }, [])

  const industries = [
    'All',
    'Technology',
    'Marketing',
    'Finance',
    'Design',
    'Healthcare',
    'Education',
    'Consulting',
    'Podcasting',
    'Radio',
    'Film Production',
    'Music Production',
    'Sound Engineering',
    'Acting',
    'Music',
    'Dance',
    'Instruments',
    'Hosting',
    'Interviews',
    'News',
    'Media',
    'Broadcasting',
    'Journalism',
    'Entertainment',
    'Television',
    'Video Production',
    'Photography',
    'Fashion',
    'Art',
    'Animation',
    'Gaming',
    'Sports',
    'Fitness',
    'Nutrition',
    'Wellness',
    'Mental Health',
    'Therapy',
    'Coaching',
    'Real Estate',
    'Architecture',
    'Engineering',
    'Manufacturing',
    'Automotive',
    'Aviation',
    'Hospitality',
    'Culinary Arts',
    'Restaurant',
    'Retail',
    'E-commerce',
    'Sales',
    'Business Development',
    'Human Resources',
    'Legal',
    'Law',
    'Accounting',
    'Investment',
    'Banking',
    'Insurance',
    'Cryptocurrency',
    'Blockchain',
    'AI/ML',
    'Data Analytics',
    'Cybersecurity',
    'Cloud Computing',
    'Mobile Development',
    'Web Development',
    'DevOps',
    'Product Management',
    'Project Management',
    'Event Planning',
    'Public Relations',
    'Advertising',
    'Creative Writing',
    'Publishing',
    'Translation',
    'Social Media',
    'Content Creation',
    'Influencer Marketing',
    'SEO/SEM',
    'Graphic Design',
    'UI/UX Design',
    'Interior Design',
    'Industrial Design',
    'Nonprofit',
    'Social Work',
    'Environmental',
    'Sustainability',
    'Agriculture',
    'Veterinary',
    'Science',
    'Research',
    'Academia',
    'Teaching',
    'Training',
    'Language',
    'Travel',
    'Tourism',
    'Logistics',
    'Supply Chain',
    'Operations',
  ]

  const expertiseAreas = [
    'All',
    'Software Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'iOS Development',
    'Android Development',
    'Web Development',
    'Game Development',
    'DevOps',
    'Cloud Computing',
    'AWS',
    'Azure',
    'Google Cloud',
    'Data Science',
    'Data Analytics',
    'Machine Learning',
    'Artificial Intelligence',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Cybersecurity',
    'Network Security',
    'Information Security',
    'Blockchain',
    'Cryptocurrency',
    'Smart Contracts',
    'Database Design',
    'SQL',
    'NoSQL',
    'System Design',
    'Architecture',
    'Microservices',
    'API Development',
    'Career Growth',
    'Career Transition',
    'Career Planning',
    'Leadership',
    'Management',
    'Team Leadership',
    'Executive Coaching',
    'Strategic Planning',
    'Business Strategy',
    'Product Strategy',
    'Product Management',
    'Product Development',
    'Agile',
    'Scrum',
    'Project Management',
    'Program Management',
    'Change Management',
    'Digital Marketing',
    'Content Marketing',
    'Email Marketing',
    'Social Media Marketing',
    'Influencer Marketing',
    'Brand Strategy',
    'Brand Development',
    'Brand Management',
    'SEO',
    'SEM',
    'PPC',
    'Google Ads',
    'Facebook Ads',
    'Marketing Analytics',
    'Growth Hacking',
    'Conversion Optimization',
    'UX Design',
    'UI Design',
    'User Research',
    'Prototyping',
    'Wireframing',
    'Design Systems',
    'Graphic Design',
    'Visual Design',
    'Motion Graphics',
    'Video Editing',
    'Photography',
    'Illustration',
    'Financial Modeling',
    'Financial Analysis',
    'Investment Banking',
    'Private Equity',
    'Venture Capital',
    'Portfolio Management',
    'Risk Management',
    'Accounting',
    'Tax Planning',
    'Budgeting',
    'Forecasting',
    'Sales',
    'Business Development',
    'Account Management',
    'Customer Success',
    'Customer Service',
    'Client Relations',
    'Negotiation',
    'Public Speaking',
    'Presentation Skills',
    'Communication Skills',
    'Writing',
    'Content Writing',
    'Copywriting',
    'Technical Writing',
    'Creative Writing',
    'Editing',
    'Podcasting',
    'Audio Production',
    'Sound Engineering',
    'Music Production',
    'Video Production',
    'Film Production',
    'Broadcasting',
    'Journalism',
    'Reporting',
    'Interviewing',
    'News Anchoring',
    'Radio Hosting',
    'TV Hosting',
    'Event Hosting',
    'Acting',
    'Voice Acting',
    'Singing',
    'Musical Instruments',
    'Music Theory',
    'Composition',
    'Songwriting',
    'Dance',
    'Choreography',
    'Performance Arts',
    'Theater',
    'Screenwriting',
    'Directing',
    'Cinematography',
    'Animation',
    '3D Modeling',
    'Character Design',
    'Concept Art',
    'Fashion Design',
    'Fashion Styling',
    'Interior Design',
    'Architecture Design',
    'Industrial Design',
    'Product Design',
    'Real Estate',
    'Property Management',
    'Real Estate Investment',
    'Human Resources',
    'Recruiting',
    'Talent Acquisition',
    'Employee Relations',
    'Compensation & Benefits',
    'Learning & Development',
    'Training',
    'Teaching',
    'Curriculum Development',
    'Education Technology',
    'Legal',
    'Contract Law',
    'Corporate Law',
    'Intellectual Property',
    'Healthcare Management',
    'Medical Practice',
    'Nursing',
    'Mental Health',
    'Therapy',
    'Counseling',
    'Life Coaching',
    'Executive Coaching',
    'Career Coaching',
    'Fitness Training',
    'Personal Training',
    'Nutrition',
    'Wellness Coaching',
    'Yoga',
    'Meditation',
    'Mindfulness',
    'Nonprofit Management',
    'Fundraising',
    'Grant Writing',
    'Social Impact',
    'Environmental Science',
    'Sustainability',
    'Renewable Energy',
    'Research',
    'Scientific Writing',
    'Academia',
    'Language Learning',
    'Translation',
    'Interpreting',
    'Travel Planning',
    'Tourism Management',
    'Event Planning',
    'Wedding Planning',
    'Logistics',
    'Supply Chain Management',
    'Operations Management',
    'Process Improvement',
    'Quality Assurance',
    'Manufacturing',
    'Lean Six Sigma',
    'Entrepreneurship',
    'Startup Founding',
    'Business Planning',
    'Pitching',
    'Fundraising Strategy',
    'Exit Strategy',
    'E-commerce',
    'Online Business',
    'Dropshipping',
    'Amazon FBA',
    'Shopify',
    'Affiliate Marketing',
    'Passive Income',
    'Personal Branding',
    'Networking',
    'Mentorship',
    'Time Management',
    'Productivity',
    'Work-Life Balance',
    'Remote Work',
    'Freelancing',
    'Consulting',
    'Resume Writing',
    'Interview Preparation',
    'Salary Negotiation',
  ]

  const availabilityOptions = [
    'All',
    'Currently Online',
    'Active within 24hrs',
    'Active this week',
    'Accepting New Mentees'
  ]

  const experienceLevels = ['All', '0-5 years', '5-10 years', '10-15 years', '15+ years']

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
    setProfileMentor(mentor)
    setShowProfileModal(true)
  }

  const handleCloseProfileModal = () => {
    setShowProfileModal(false)
    setProfileMentor(null)
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
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <button
                      onClick={() => handleSwipe('left')}
                      className="w-16 h-16 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:border-neutral-400 hover:scale-110 transition-all active:scale-95"
                    >
                      <X className="h-7 w-7 text-neutral-600" />
                    </button>

                    <button
                      onClick={() => handleViewProfile(mentors[currentCardIndex])}
                      className="w-16 h-16 rounded-full bg-white border-2 border-primary-accent shadow-lg flex items-center justify-center hover:border-primary-accent/80 hover:scale-110 transition-all active:scale-95"
                    >
                      <Eye className="h-7 w-7 text-primary-accent" />
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
                // All Done State - No More Mentors
                <div className="text-center py-20 px-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-accent/10 mb-6">
                    <SlidersHorizontal className="h-12 w-12 text-primary-accent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-montserrat text-primary-dark mb-4">
                    No More Mentors Available
                  </h3>
                  <p className="text-base sm:text-lg text-neutral-600 font-montserrat mb-3 max-w-md mx-auto leading-relaxed">
                    The mentors you're looking for may not be in this search right now.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-600 font-montserrat mb-8 max-w-md mx-auto leading-relaxed">
                    Please adjust your filters to explore more options, or come back and try again later.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleBackToFilters}
                      className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
                    >
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      Adjust Filters
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentCardIndex(0)}
                      className="border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Start Over
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
                {/* Industry Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search industries..."
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 font-montserrat text-sm text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {industries
                    .filter((industry) =>
                      industry.toLowerCase().includes(industrySearch.toLowerCase())
                    )
                    .slice(0, industrySearch ? undefined : 10)
                    .map((industry) => (
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
                {!industrySearch && industries.length > 10 && (
                  <p className="text-xs text-neutral-500 font-montserrat mt-2">
                    Showing 10 of {industries.length} industries. Use search to find more.
                  </p>
                )}
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
                {/* Expertise Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search expertise..."
                    value={expertiseSearch}
                    onChange={(e) => setExpertiseSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 font-montserrat text-sm text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {expertiseAreas
                    .filter((expertise) =>
                      expertise.toLowerCase().includes(expertiseSearch.toLowerCase())
                    )
                    .slice(0, expertiseSearch ? undefined : 10)
                    .map((expertise) => (
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
                {!expertiseSearch && expertiseAreas.length > 10 && (
                  <p className="text-xs text-neutral-500 font-montserrat mt-2">
                    Showing 10 of {expertiseAreas.length} expertise areas. Use search to find more.
                  </p>
                )}
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
                Show ({mentors.length})
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
                Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile View Modal */}
      {showProfileModal && profileMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-white px-8 py-6 border-b border-neutral-200">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {profileMentor.avatar ? (
                    <img
                      src={profileMentor.avatar}
                      alt={profileMentor.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-accent flex items-center justify-center text-white text-3xl font-bold font-montserrat shadow-lg">
                      {profileMentor.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-success border-4 border-white rounded-full" />
                </div>

                {/* Mentor Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-1">
                    {profileMentor.name}
                  </h2>
                  <p className="text-base font-semibold text-neutral-700 font-montserrat mb-1">
                    {profileMentor.title}
                  </p>
                  <p className="text-sm text-neutral-600 font-montserrat">
                    @ {profileMentor.company}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleCloseProfileModal}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full flex-shrink-0"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 space-y-6 max-h-[calc(90vh-240px)] overflow-y-auto custom-scrollbar">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <Briefcase className="h-6 w-6 text-primary-accent mx-auto mb-2" />
                  <p className="text-lg font-bold font-montserrat text-primary-dark">
                    {profileMentor.yearsExperience}
                  </p>
                  <p className="text-xs text-neutral-600 font-montserrat">Years Exp.</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <Users className="h-6 w-6 text-secondary-accent mx-auto mb-2" />
                  <p className="text-lg font-bold font-montserrat text-primary-dark">
                    {profileMentor.mentees}
                  </p>
                  <p className="text-xs text-neutral-600 font-montserrat">Mentees</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <Star className="h-6 w-6 text-warning mx-auto mb-2 fill-warning" />
                  <p className="text-lg font-bold font-montserrat text-primary-dark">
                    {profileMentor.rating}
                  </p>
                  <p className="text-xs text-neutral-600 font-montserrat">Rating</p>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-xl">
                  <Clock
                    className={`h-6 w-6 mx-auto mb-2 ${
                      profileMentor.availability === 'Available' ? 'text-success' : 'text-warning'
                    }`}
                  />
                  <p
                    className={`text-xs font-bold font-montserrat ${
                      profileMentor.availability === 'Available' ? 'text-success' : 'text-warning'
                    }`}
                  >
                    {profileMentor.availability === 'Available' ? 'Open' : 'Limited'}
                  </p>
                  <p className="text-xs text-neutral-600 font-montserrat">Status</p>
                </div>
              </div>

              {/* Location & Rating */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-neutral-700 font-montserrat">
                  <MapPin className="h-5 w-5 text-primary-accent" />
                  <span className="font-semibold">{profileMentor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="text-sm font-bold font-montserrat text-primary-dark">
                    {profileMentor.rating}
                  </span>
                  <span className="text-sm text-neutral-600 font-montserrat">
                    ({profileMentor.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary-accent rounded-full"></div>
                  About
                </h3>
                <p className="text-base text-neutral-700 font-montserrat leading-relaxed">
                  {profileMentor.bio}
                </p>
              </div>

              {/* Expertise Section */}
              <div>
                <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-secondary-accent rounded-full"></div>
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileMentor.expertise.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-accent/10 text-primary-accent border border-primary-accent/20 rounded-full text-sm font-semibold font-montserrat"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Industry Section */}
              <div>
                <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-vibrant-accent rounded-full"></div>
                  Industry
                </h3>
                <span className="inline-block px-4 py-2 bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20 rounded-full text-sm font-semibold font-montserrat">
                  {profileMentor.industry}
                </span>
              </div>

              {/* Languages Section */}
              {profileMentor.languages && profileMentor.languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                    <div className="w-1 h-5 bg-success rounded-full"></div>
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileMentor.languages.map((language: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full"
                      >
                        <Globe className="h-4 w-4 text-neutral-600" />
                        <span className="text-sm font-semibold font-montserrat text-neutral-700">
                          {language}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Industries */}
              {profileMentor.industries && profileMentor.industries.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                    <div className="w-1 h-5 bg-warning rounded-full"></div>
                    Additional Industries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileMentor.industries.map((ind: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-semibold font-montserrat"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Media Section */}
              {profileMentor.socialMedia && (
                <div>
                  <h3 className="text-sm font-bold font-montserrat text-primary-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                    <div className="w-1 h-5 bg-vibrant-accent rounded-full"></div>
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profileMentor.socialMedia.linkedin && (
                      <a
                        href={profileMentor.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 rounded-full text-sm font-semibold font-montserrat text-[#0077B5] transition-all hover:scale-105"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {profileMentor.socialMedia.twitter && (
                      <a
                        href={profileMentor.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-full text-sm font-semibold font-montserrat text-[#1DA1F2] transition-all hover:scale-105"
                      >
                        <Twitter className="h-4 w-4" />
                        <span>Twitter</span>
                      </a>
                    )}
                    {profileMentor.socialMedia.github && (
                      <a
                        href={profileMentor.socialMedia.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-800/10 hover:bg-neutral-800/20 border border-neutral-800/30 rounded-full text-sm font-semibold font-montserrat text-neutral-800 transition-all hover:scale-105"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {profileMentor.socialMedia.email && (
                      <a
                        href={`mailto:${profileMentor.socialMedia.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary-accent/10 hover:bg-secondary-accent/20 border border-secondary-accent/30 rounded-full text-sm font-semibold font-montserrat text-secondary-accent transition-all hover:scale-105"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </a>
                    )}
                    {profileMentor.socialMedia.website && (
                      <a
                        href={profileMentor.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-accent/10 hover:bg-primary-accent/20 border border-primary-accent/30 rounded-full text-sm font-semibold font-montserrat text-primary-accent transition-all hover:scale-105"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t-2 border-neutral-100 px-8 py-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  handleCloseProfileModal()
                  handleShowInterest(profileMentor)
                }}
                className="w-full bg-secondary-accent hover:bg-secondary-accent/90 text-white shadow-lg hover:shadow-xl transition-all font-bold"
              >
                <Heart className="mr-2 h-5 w-5" />
                Connect with {profileMentor.name.split(' ')[0]}
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
                  <div>
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 1250 1250"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path d="M0 0 C14.13862195 14.69889368 22.13973559 36.8305138 31.13247347 54.91389012 C33.17535602 59.01862784 35.2252041 63.11988463 37.27426147 67.22154236 C41.13910934 74.96049886 44.9978385 82.70248876 48.85428369 90.44563526 C53.25106693 99.2729334 57.65480531 108.09675533 62.05908132 116.92031682 C71.10563106 135.04462988 80.14360005 153.1732101 89.17578125 171.3046875 C92.21946923 169.86647297 95.26261288 168.4271102 98.30566406 166.98754883 C99.16225616 166.58280586 100.01884827 166.1780629 100.90139771 165.76105499 C105.31914642 163.67048712 109.72447442 161.5617293 114.09765625 159.37890625 C137.9973934 147.48144938 137.9973934 147.48144938 149.9296875 148.88671875 C171.87088056 151.07254363 186.66201259 142.76336062 205.5632782 132.45481873 C206.49114639 131.9489473 207.41901459 131.44307587 208.375 130.921875 C209.28816483 130.42273087 210.20132965 129.92358673 211.14216614 129.40931702 C221.9738179 123.61204279 234.60619104 118.1889987 247.08203125 118.171875 C248.44521484 118.16994141 248.44521484 118.16994141 249.8359375 118.16796875 C250.77308594 118.17183594 251.71023438 118.17570313 252.67578125 118.1796875 C253.61292969 118.17582031 254.55007813 118.17195312 255.515625 118.16796875 C256.42441406 118.16925781 257.33320312 118.17054688 258.26953125 118.171875 C259.09130859 118.17300293 259.91308594 118.17413086 260.75976562 118.17529297 C263.17578125 118.3046875 263.17578125 118.3046875 265.69555664 118.93481445 C268.76956463 119.39323773 270.03304639 118.78064859 272.765625 117.35546875 C274.05593628 116.70372681 274.05593628 116.70372681 275.37231445 116.03881836 C276.2768335 115.56968018 277.18135254 115.10054199 278.11328125 114.6171875 C288.73377306 109.33123115 299.19960401 105.0900106 311.17578125 104.3046875 C311.95566406 104.253125 312.73554687 104.2015625 313.5390625 104.1484375 C338.11199682 103.27473317 358.49655888 114.86440729 375.98486328 131.13452148 C380.86774754 135.82947625 385.0940563 140.9107206 389.17578125 146.3046875 C389.95308594 147.305 390.73039063 148.3053125 391.53125 149.3359375 C396.49525094 155.87863504 400.67141519 162.74068165 404.57592773 169.96020508 C405.09057555 170.9085941 405.60522337 171.85698313 406.13546658 172.83411121 C412.65053769 184.92932006 418.80255318 197.21035869 424.95372319 209.49312568 C425.97690942 211.53579224 427.00111932 213.57794248 428.02563286 215.61994362 C431.6281822 222.80074419 435.22628955 229.98375169 438.82055664 237.16870117 C442.12593171 243.77582111 445.44178172 250.37761045 448.76243883 256.97706097 C451.65247415 262.72201909 454.53446762 268.47096782 457.4107427 274.22282726 C459.11142086 277.6234052 460.81497062 281.02245159 462.52699471 284.4173336 C493.46308025 345.79535209 515.18957683 413.7369202 493.45703125 481.85546875 C486.74894451 501.75964739 476.9143673 519.64793837 464.17578125 536.3046875 C463.428125 537.284375 462.68046875 538.2640625 461.91015625 539.2734375 C453.35943032 550.0410183 443.86856542 560.62836263 433.17578125 569.3046875 C432.109766 570.21638369 431.04476622 571.12926784 429.98046875 572.04296875 C381.05273483 613.50131544 316.81235168 641.02779494 253.17578125 648.3046875 C252.09554688 648.43617188 251.0153125 648.56765625 249.90234375 648.703125 C187.20824293 654.92211087 127.22055729 633.95400409 77.42578125 596.8046875 C48.71407723 575.42852042 17.95533774 556.72887533 -13.82421875 540.3046875 C-14.43652344 539.98757813 -15.04882812 539.67046875 -15.6796875 539.34375 C-43.41862741 524.99211033 -71.61350271 512.58370716 -100.97599792 501.93351746 C-125.65780191 492.96589034 -125.65780191 492.96589034 -130.40625 482.9765625 C-132.07312566 479.15110299 -133.48411298 475.254853 -134.82421875 471.3046875 C-135.16839844 470.30824219 -135.51257813 469.31179688 -135.8671875 468.28515625 C-140.80498137 450.9681045 -139.46396925 431.23819653 -131.25 415.23828125 C-120.89436837 397.88233919 -104.82244945 386.10986388 -85.2890625 381.0859375 C-77.56760066 379.23313942 -69.77612031 377.59561073 -61.82421875 377.3046875 C-60.18453125 377.22734375 -60.18453125 377.22734375 -58.51171875 377.1484375 C-35.68796278 376.5871976 -14.16766955 381.78963255 7.56640625 388.1796875 C8.62923828 388.49196289 9.69207031 388.80423828 10.78710938 389.12597656 C12.80898342 389.72423488 14.82871806 390.32979634 16.84570312 390.94433594 C25.1736854 393.44388648 33.60568688 395.65715748 42.36328125 395.4296875 C43.96744792 395.38802083 45.57161458 395.34635417 47.17578125 395.3046875 C45.12080804 387.18878015 41.80986412 380.02347839 38.04019165 372.57267761 C37.40938392 371.31146682 36.77928598 370.0499008 36.14983118 368.78801423 C34.42897775 365.34320221 32.69824717 361.90343775 30.96580219 358.46444404 C29.09484743 354.74607342 27.23324628 351.0230239 25.37052917 347.30052185 C22.1442367 340.85605681 18.91223873 334.41448031 15.67644119 327.97478294 C10.99141449 318.65062615 6.31645228 309.32145132 1.64411978 299.99092821 C-5.94632026 284.83341983 -13.54301993 269.67905851 -21.14453125 254.52709961 C-21.59908725 253.62103654 -22.05364326 252.71497347 -22.52197368 251.78145394 C-24.36358363 248.11061682 -26.20521484 244.43979038 -28.04687192 240.76897691 C-33.11309426 230.67084452 -38.17841189 220.5722585 -43.24316406 210.47338867 C-43.6965592 209.5693455 -44.14995434 208.66530233 -44.61708872 207.73386391 C-52.18686551 192.63976476 -59.75184182 177.54326394 -67.31374514 162.44521886 C-71.97297595 153.14327339 -76.63669188 143.84360258 -81.30629934 134.54686175 C-84.50786138 128.17224152 -87.7051812 121.79550562 -90.89922951 115.41711732 C-92.73975742 111.74205897 -94.58224685 108.06801945 -96.4301281 104.39665222 C-98.12555195 101.02811901 -99.8152663 97.65678308 -101.50071271 94.28324715 C-102.39252099 92.50182631 -103.29027109 90.72338373 -104.18831193 88.94509667 C-110.71409719 75.85123605 -116.23511905 63.21644054 -116.13671875 48.4296875 C-116.1310791 47.54418213 -116.12543945 46.65867676 -116.11962891 45.74633789 C-116.00306387 39.48587201 -115.47238665 34.0491748 -112.82421875 28.3046875 C-112.4684375 27.45390625 -112.11265625 26.603125 -111.74609375 25.7265625 C-102.37012449 5.95795261 -81.42277766 -5.31457861 -61.82421875 -12.6953125 C-57.84879438 -13.9920367 -53.94136483 -14.97663907 -49.82421875 -15.6953125 C-49.0353125 -15.84742188 -48.24640625 -15.99953125 -47.43359375 -16.15625 C-29.12430111 -18.88445586 -13.23961277 -12.30405127 0 0 Z M-78.82421875 38.3046875 C-81.54446559 43.07426828 -82.7793027 46.84758134 -81.82421875 52.3046875 C-78.87000678 61.3675949 -74.74010199 69.88869803 -70.44812012 78.37727356 C-69.81575016 79.63901678 -69.18392194 80.90103162 -68.55258131 82.1632902 C-66.83446783 85.59462987 -65.10894068 89.0221924 -63.38210845 92.44915068 C-61.51392816 96.16003142 -59.65288172 99.87448752 -57.79103088 103.58854675 C-54.56878219 110.01421693 -51.34240249 116.43779839 -48.11341858 122.86008644 C-43.43707267 132.16165051 -38.76977243 141.46773178 -34.10507315 150.77514108 C-26.52480078 165.89990526 -18.94091572 181.02285408 -11.35302734 196.14379883 C-10.89960234 197.04737846 -10.44617734 197.9509581 -9.97901219 198.88191893 C-3.54535006 211.70241953 2.89189563 224.52111748 9.33057469 237.33909907 C9.78399969 238.24176913 10.23742469 239.14443919 10.70458984 240.07446289 C11.38389438 241.42680108 11.38389438 241.42680108 12.07692224 242.80645923 C19.64225344 257.86788882 27.19823408 272.93398668 34.74664831 288.00390166 C39.39471847 297.28253942 44.05053117 306.55720865 48.71656883 315.82682433 C51.9157667 322.18392568 55.10616043 328.54539535 58.28981841 334.91029314 C60.1232938 338.57514365 61.96055403 342.23795688 63.8086071 345.89548111 C85.4638411 388.77240824 85.4638411 388.77240824 80.23828125 409.2421875 C77.15365365 416.72095441 70.72544549 423.2594883 63.390625 426.5859375 C41.00902271 433.84910297 17.82848286 427.56651287 -3.86328125 420.82421875 C-30.62175434 412.53932296 -59.89319029 406.39417128 -86.38671875 418.7421875 C-94.6502046 423.25700593 -99.65616361 428.83292928 -103.13671875 437.6171875 C-104.89144073 447.02887814 -104.16028799 456.63254902 -99.82421875 465.3046875 C-97.81813509 466.18062288 -95.7709179 466.96277697 -93.7109375 467.703125 C-92.40130873 468.18074794 -91.09174118 468.65853877 -89.78222656 469.13647461 C-89.08697876 469.38734833 -88.39173096 469.63822205 -87.67541504 469.896698 C-71.45358913 475.76698555 -55.57673752 482.2633633 -39.82421875 489.3046875 C-38.12434814 490.06386475 -38.12434814 490.06386475 -36.39013672 490.83837891 C9.88711268 511.63854302 53.56996085 536.84560139 94.67504883 566.60327148 C96.84123268 568.17141906 99.00812105 569.7385814 101.17578125 571.3046875 C102.0589502 571.94301514 102.0589502 571.94301514 102.95996094 572.59423828 C131.29174535 592.96453906 161.91135164 605.91886388 196.17578125 612.3046875 C197.45710938 612.5521875 198.7384375 612.7996875 200.05859375 613.0546875 C253.0833317 621.44541526 307.75892 604.54068446 354.34033203 580.25927734 C356.18450633 579.30014971 358.03698925 578.35865605 359.890625 577.41796875 C388.66852823 562.64206514 416.30324281 541.96077351 436.17578125 516.3046875 C436.96855469 515.29019531 437.76132812 514.27570313 438.578125 513.23046875 C455.73901 490.63206689 467.28715842 461.88872199 468.17578125 433.3046875 C468.21445313 432.30791992 468.21445313 432.30791992 468.25390625 431.29101562 C469.58132347 393.02821439 458.47825125 356.552132 442.17578125 322.3046875 C441.73685547 321.37333984 441.29792969 320.44199219 440.84570312 319.48242188 C432.60136901 302.01911053 423.95073797 284.75298944 415.32314301 267.47692108 C414.43865427 265.70546956 413.55480215 263.93370022 412.67095947 262.16192627 C406.79314327 250.38570642 400.8742174 238.64096702 394.70077515 227.01667786 C391.89497211 221.71769297 389.19161868 216.3752466 386.54296875 210.99609375 C386.16978516 210.23949463 385.79660156 209.48289551 385.41210938 208.70336914 C383.90969453 205.65379362 382.40941151 202.6032703 380.92041016 199.54711914 C369.0854078 175.29225998 353.26640669 150.53484516 327.21484375 140.12109375 C317.24818025 137.44367386 307.38857951 139.01431991 298.17578125 143.3046875 C303.69348784 155.12038242 309.38974089 166.83197806 315.27636719 178.46875 C315.76911133 179.44585938 316.26185547 180.42296875 316.76953125 181.4296875 C317.20974609 182.29851562 317.64996094 183.16734375 318.10351562 184.0625 C319.17578125 186.3046875 319.17578125 186.3046875 320.17578125 189.3046875 C309.05945174 191.77498295 298.50635923 190.89819903 288.76953125 184.796875 C279.74509158 178.15216771 273.61152224 169.87671951 268.1328125 160.22265625 C265.43308451 156.19731332 262.78218674 153.840156 258.17578125 152.3046875 C243.38835239 150.56331074 230.03667192 158.54016475 217.36328125 165.0546875 C215.78498264 165.85640933 214.20620919 166.65719709 212.62695312 167.45703125 C208.80434789 169.39554799 204.98835014 171.34651073 201.17578125 173.3046875 C207.49676764 186.80356307 214.04664507 200.17359811 220.73828125 213.4921875 C221.6609983 215.33258654 222.58352515 217.17308095 223.50585938 219.01367188 C225.72698848 223.44510648 227.95064223 227.87526512 230.17578125 232.3046875 C224.48632767 236.09765655 218.32808407 236.02424395 211.71875 234.87890625 C198.67016688 231.52942743 189.02831403 221.90715042 182.12890625 210.75 C180.59154921 208.03810217 179.13901537 205.32176039 177.72265625 202.546875 C177.29122314 201.70479492 176.85979004 200.86271484 176.4152832 199.99511719 C175.56402984 198.31783042 174.72601224 196.63374304 173.90307617 194.94238281 C170.86846412 188.92378702 167.84705453 184.52844526 161.17578125 182.3046875 C146.20545879 180.41993467 132.1194842 188.46703914 119.23828125 195.1171875 C117.86181234 195.81800914 116.48486061 196.51788332 115.10742188 197.21679688 C111.79126927 198.90193783 108.48172353 200.59958481 105.17578125 202.3046875 C105.80199661 207.15460115 107.8421726 211.00462016 110.04296875 215.296875 C110.43347412 216.070952 110.82397949 216.84502899 111.22631836 217.64256287 C112.06236171 219.29861714 112.90104642 220.95334012 113.74212646 222.60684204 C115.94029034 226.92848286 118.11998846 231.25941818 120.30078125 235.58984375 C120.72986786 236.4407811 121.15895447 237.29171844 121.6010437 238.16844177 C124.84307243 244.60974091 127.98239825 251.09117113 131.05078125 257.6171875 C136.74296195 269.69358349 142.9439718 281.49964228 149.17578125 293.3046875 C138.9826786 295.46738851 128.36685394 295.66746485 119.17578125 290.3046875 C101.01348518 278.44665949 93.11644263 257.47005908 83.82202148 238.74487305 C82.69958781 236.49124073 81.57676402 234.23780267 80.45358276 231.98454285 C78.04898531 227.15894642 75.64672224 222.33219931 73.2463665 217.50449181 C69.44798653 209.86551104 65.64156266 202.23055234 61.83399963 194.59614563 C60.52715892 191.97558721 59.22038037 189.35499779 57.91362858 186.73439503 C57.58722036 186.07980693 57.26081213 185.42521883 56.92451276 184.75079473 C53.22268463 177.32670968 49.52275582 169.90167861 45.82348633 162.47631836 C45.48592581 161.79875478 45.1483653 161.12119119 44.80057568 160.42309538 C39.32194749 149.4257705 33.84804641 138.42609729 28.37514483 127.4259217 C22.74002566 116.10018613 17.09716321 104.77833009 11.44782788 93.45967895 C7.97164504 86.49427684 4.50186136 79.52576189 1.04039288 72.55303542 C-1.61235856 67.21084426 -4.2755743 61.87394022 -6.94264603 56.5388813 C-8.03172263 54.35616924 -9.11737184 52.17174306 -10.19927406 49.985466 C-11.68038812 46.99373379 -13.17385756 44.00848456 -14.67042542 41.02445984 C-15.30284372 39.73573055 -15.30284372 39.73573055 -15.94803816 38.42096633 C-20.10538499 30.19479866 -24.93706642 21.76917061 -33.82421875 18.3046875 C-49.80960541 15.65902246 -68.65220607 26.69916724 -78.82421875 38.3046875 Z" fill="white" transform="translate(528.82421875,382.6953125)"/>
                      <path d="M0 0 C1.21107422 0.29600098 2.42214844 0.59200195 3.66992188 0.89697266 C57.35040688 14.15946301 111.14478761 34.58285642 158.375 63.5 C158.99262207 63.8727002 159.61024414 64.24540039 160.24658203 64.62939453 C164.85521927 67.55786781 168.534699 71.069398 171 76 C171.72218508 83.13897709 171.44960235 88.26235486 167 94 C162.35748436 97.60031825 158.37067521 99.51325032 152.40234375 99.39453125 C145.81021088 98.31192081 139.95465375 94.10182187 134.2109375 90.8671875 C71.10935473 55.34483645 2.68681403 33.26083738 -68.875 22.75 C-69.66893158 22.630802 -70.46286316 22.511604 -71.28085327 22.38879395 C-101.19399819 17.95088848 -131.16838231 16.45810376 -161.37378311 16.61327744 C-163.86307148 16.62524309 -166.35233467 16.63217853 -168.84164429 16.63809204 C-192.25087406 16.7024934 -215.54767815 17.01497991 -238.82348633 19.74676514 C-241.12414553 20.01444419 -243.42606899 20.26820039 -245.72851562 20.52001953 C-314.60104876 28.12604529 -382.08509447 44.6095157 -444.29492188 75.65234375 C-446.65244777 76.82685123 -449.01956141 77.97821107 -451.390625 79.125 C-460.62023932 83.69514413 -469.18533367 89.24406181 -477.75 94.9375 C-478.31241394 95.31046204 -478.87482788 95.68342407 -479.45428467 96.06768799 C-487.92012025 101.70321568 -496.00789203 107.71872829 -504 114 C-503.21374741 114.00364563 -502.42749481 114.00729126 -501.61741638 114.01104736 C-494.18766948 114.04900093 -486.75841994 114.10593626 -479.3289938 114.18390274 C-475.5099211 114.22331947 -471.69107695 114.25553603 -467.87182617 114.27099609 C-464.18217741 114.2862015 -460.49315722 114.32071426 -456.80378914 114.36830902 C-455.40013167 114.38308313 -453.99638443 114.39103873 -452.59264946 114.39188385 C-438.83100515 114.4084934 -438.83100515 114.4084934 -433 119 C-429.04415794 123.97016054 -428.3574054 128.03495133 -428.6171875 134.34765625 C-429.40964105 139.83822729 -431.6345845 142.94110635 -436.0625 146.375 C-439.69704293 148.38559821 -442.32644079 149.12490784 -446.41375732 149.14717102 C-447.76786209 149.15790398 -447.76786209 149.15790398 -449.14932251 149.16885376 C-450.13741913 149.17154266 -451.12551575 149.17423157 -452.14355469 149.17700195 C-453.18613434 149.18357315 -454.22871399 149.19014435 -455.30288696 149.19691467 C-458.75921702 149.21665371 -462.21550361 149.22831159 -465.671875 149.23828125 C-466.85190346 149.24235678 -468.03193192 149.2464323 -469.24771881 149.25063133 C-475.4932691 149.27149452 -481.7387974 149.28579526 -487.984375 149.29516602 C-494.43512644 149.30623164 -500.88553305 149.34063305 -507.33616257 149.38033772 C-512.29645428 149.40648288 -517.25666357 149.41485601 -522.21701813 149.41844749 C-524.59484435 149.42331875 -526.97266677 149.43494797 -529.35042572 149.45348549 C-532.68018421 149.47783157 -536.00904695 149.47691974 -539.33886719 149.4699707 C-540.80886673 149.48918579 -540.80886673 149.48918579 -542.30856323 149.50878906 C-549.19563898 149.45646765 -553.54996207 148.16382402 -558.7421875 143.40234375 C-563.67753366 137.02043061 -563.55656445 131.37045169 -562.74904442 123.57845688 C-562.39819918 121.10402354 -561.99923927 118.64276307 -561.57885742 116.17919922 C-561.42761917 115.25424652 -561.27638092 114.32929382 -561.12055969 113.37631226 C-560.62361994 110.3510357 -560.1149864 107.32786905 -559.60546875 104.3046875 C-559.25345834 102.18587977 -558.90192917 100.06699204 -558.55085754 97.94802856 C-557.81545728 93.52093212 -557.07423987 89.09485995 -556.32885742 84.66943359 C-555.37632597 79.01126442 -554.43839904 73.35078922 -553.50481701 67.68946648 C-552.78233284 63.31834634 -552.05209699 58.94854828 -551.31954384 54.57910538 C-550.97071948 52.49280525 -550.62428165 50.40610458 -550.28032494 48.31899643 C-549.79785072 45.39861846 -549.30493754 42.48018501 -548.80932617 39.56201172 C-548.67050018 38.70881348 -548.53167419 37.85561523 -548.38864136 36.9765625 C-547.02445566 29.06869164 -545.3533471 22.40034504 -539 17 C-534.71780291 14.14520194 -530.69543263 13.5765621 -525.6875 14.36328125 C-519.798309 15.98479837 -516.27292758 18.85682809 -513 24 C-510.63143895 31.10568315 -512.25169157 38.75041874 -513.53125 45.9609375 C-513.68662231 46.87332184 -513.84199463 47.78570618 -514.0020752 48.72573853 C-514.49440183 51.61007668 -514.99667144 54.4925633 -515.5 57.375 C-516.00157405 60.27912818 -516.50102891 63.18359925 -516.9979248 66.08853149 C-517.30641923 67.88868887 -517.61791444 69.68833517 -517.93273926 71.48739624 C-518.14295715 72.70478989 -518.14295715 72.70478989 -518.35742188 73.94677734 C-518.48177612 74.65909515 -518.60613037 75.37141296 -518.73425293 76.10531616 C-519.06944986 78.17628159 -519.06944986 78.17628159 -519 81 C-517.94425781 80.21238281 -516.88851562 79.42476563 -515.80078125 78.61328125 C-480.79151181 52.75534662 -441.98068462 33.45743873 -401 19 C-400.36100769 18.7741925 -399.72201538 18.54838501 -399.06365967 18.31573486 C-337.70800131 -3.26998545 -273.71466704 -13.65428055 -209 -18 C-207.97793457 -18.07202637 -206.95586914 -18.14405273 -205.90283203 -18.21826172 C-137.22648201 -22.88078359 -66.77894022 -16.5013258 0 0 Z" fill="white" transform="translate(782,237)"/>
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
