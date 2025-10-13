'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  Target,
  Clock,
  CheckCircle,
  Sparkles,
  X,
  Plus,
  Linkedin,
  Instagram,
  Twitter
} from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'
import { incrementActiveMentors } from '@/lib/stats'

const TOTAL_STEPS = 4

export default function MentorOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const formCardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    tiktokUrl: '',

    // Step 2: Professional Background
    employmentType: '',
    jobTitle: '',
    company: '',
    businessName: '',
    industry: '',
    yearsOfExperience: '',
    expertise: [] as string[],

    // Step 3: Mentorship Goals
    mentorshipAreas: [] as string[],
    availability: '',
    mentorExperienceLevel: '',

    // Step 4: Availability & Commitment
    hoursPerMonth: '',
    preferredMeetingFormat: [] as string[],
    timezone: '',
  })

  // Scroll to top of form when step changes
  useEffect(() => {
    if (formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // Also scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend

    // Increment the active mentors count
    incrementActiveMentors()

    // Redirect to homepage with success message
    router.push('/?success=mentor-signup')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} setFormData={setFormData} />
      case 2:
        return <ProfessionalBackgroundStep formData={formData} setFormData={setFormData} />
      case 3:
        return <MentorshipGoalsStep formData={formData} setFormData={setFormData} />
      case 4:
        return <AvailabilityStep formData={formData} setFormData={setFormData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />

      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="new" className="mb-4 bg-secondary-accent text-white border-secondary-accent">
              <Sparkles className="mr-1 h-3 w-3" />
              Mentor Onboarding
            </Badge>
            <h1 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl">
              Become a Mentor
            </h1>
            <p className="mt-4 text-lg text-white font-montserrat">
              Help shape the future by sharing your expertise
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold font-montserrat text-white">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm font-montserrat text-white">
                {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary-accent transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-12">
            {[
              { number: 1, title: 'Personal Info', icon: User },
              { number: 2, title: 'Background', icon: Briefcase },
              { number: 3, title: 'Goals', icon: Target },
              { number: 4, title: 'Availability', icon: Clock },
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.number
                      ? 'bg-secondary-accent text-white'
                      : currentStep === step.number
                      ? 'bg-secondary-accent text-white ring-4 ring-secondary-accent/20'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <span className="text-xs font-montserrat text-white text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <Card ref={formCardRef} className="border-0 shadow-card mb-8">
            <CardContent className="pt-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Previous
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white gap-2"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white gap-2"
              >
                Complete Profile
                <CheckCircle className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step Components
function PersonalInfoStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Personal Information
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Let's start with the basics. This information will be visible on your mentor profile.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            Phone Number <span className="text-neutral-500 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
            placeholder="+44 20 1234 5678"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
          placeholder="e.g., London, Manchester, Birmingham"
        />
        <p className="text-xs text-neutral-500 font-montserrat mt-2">
          This doesn't need to be your exact address, just your general area or city
        </p>
      </div>

      {/* Social Media Section */}
      <div className="pt-6 border-t border-neutral-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold font-montserrat text-primary-dark mb-1">
            Social Media Profiles
          </h3>
          <p className="text-sm text-neutral-600 font-montserrat">
            Add your social media links so mentees can connect with you <span className="text-neutral-500">(optional)</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2 flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-primary-accent" />
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2 flex items-center gap-2">
              <Twitter className="h-4 w-4 text-primary-accent" />
              Twitter
            </label>
            <input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2 flex items-center gap-2">
              <Instagram className="h-4 w-4 text-primary-accent" />
              Instagram
            </label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2 flex items-center gap-2">
              <FaTiktok className="h-4 w-4 text-primary-accent" />
              TikTok
            </label>
            <input
              type="url"
              value={formData.tiktokUrl}
              onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
              placeholder="https://tiktok.com/@yourhandle"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfessionalBackgroundStep({ formData, setFormData }: any) {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [customExpertise, setCustomExpertise] = useState('')

  const industries = [
    'Technology & IT',
    'Finance & Accounting',
    'Marketing & Advertising',
    'Healthcare & Medicine',
    'Education & Training',
    'Engineering',
    'Creative Arts & Design',
    'Sales & Business Development',
    'Human Resources',
    'Legal & Law',
  ]

  const expertiseAreas = [
    'Leadership',
    'Career Development',
    'Technical Skills',
    'Communication',
    'Project Management',
    'Entrepreneurship',
    'Work-Life Balance',
    'Networking',
    'Podcasting',
    'Hosting',
    'Fitness',
    'Content Creation',
  ]

  const toggleExpertise = (area: string) => {
    if (formData.expertise.includes(area)) {
      setFormData({
        ...formData,
        expertise: formData.expertise.filter((e: string) => e !== area)
      })
    } else {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, area]
      })
    }
  }

  const handleAddCustomExpertise = () => {
    if (customExpertise.trim() && !formData.expertise.includes(customExpertise.trim())) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, customExpertise.trim()]
      })
      setCustomExpertise('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCustomExpertise()
    }
  }

  const removeCustomExpertise = (area: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((e: string) => e !== area)
    })
  }

  // Get custom expertise (not in predefined list)
  const customExpertiseItems = formData.expertise.filter(
    (item: string) => !expertiseAreas.includes(item)
  )

  const getJobTitleLabel = () => {
    switch (formData.employmentType) {
      case 'self-employed':
        return 'Your Role/Title'
      case 'business-owner':
        return 'Your Role in the Business'
      case 'charity':
        return 'Your Role in the Organization'
      default:
        return 'Current Job Title'
    }
  }

  const getCompanyLabel = () => {
    switch (formData.employmentType) {
      case 'self-employed':
        return 'Business/Practice Name'
      case 'business-owner':
        return 'Business Name'
      case 'charity':
        return 'Organization Name'
      default:
        return 'Company'
    }
  }

  const getCompanyPlaceholder = () => {
    switch (formData.employmentType) {
      case 'self-employed':
        return 'Your consulting practice or freelance business'
      case 'business-owner':
        return 'Your company name'
      case 'charity':
        return 'Your organization name'
      default:
        return 'Tech Corp'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Professional Background
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Share your professional experience to help us match you with the right mentees.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
          Employment Type *
        </label>
        <select
          value={formData.employmentType}
          onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="">Select employment type</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-Employed</option>
          <option value="business-owner">Business Owner</option>
          <option value="charity">Charity/Non-Profit</option>
        </select>
      </div>

      {formData.employmentType && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                {getJobTitleLabel()} *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
                placeholder={
                  formData.employmentType === 'employed'
                    ? 'Senior Software Engineer'
                    : formData.employmentType === 'self-employed'
                    ? 'Freelance Consultant'
                    : formData.employmentType === 'business-owner'
                    ? 'CEO / Founder'
                    : 'Executive Director'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                {getCompanyLabel()} *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
                placeholder={getCompanyPlaceholder()}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select an industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                Years of Experience *
              </label>
              <select
                value={formData.yearsOfExperience}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select experience</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
              Areas of Expertise * (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-3">
              {expertiseAreas.map((area) => (
                <Badge
                  key={area}
                  variant={formData.expertise.includes(area) ? 'default' : 'outline'}
                  size="lg"
                  className={`cursor-pointer transition-all ${
                    formData.expertise.includes(area)
                      ? 'bg-secondary-accent text-white border-secondary-accent'
                      : 'hover:bg-secondary-accent/10 hover:border-secondary-accent'
                  }`}
                  onClick={() => toggleExpertise(area)}
                >
                  {area}
                </Badge>
              ))}

              {/* Other Badge */}
              <Badge
                variant={showOtherInput ? 'default' : 'outline'}
                size="lg"
                className={`cursor-pointer transition-all ${
                  showOtherInput
                    ? 'bg-secondary-accent text-white border-secondary-accent'
                    : 'hover:bg-secondary-accent/10 hover:border-secondary-accent'
                }`}
                onClick={() => setShowOtherInput(!showOtherInput)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Other
              </Badge>

              {/* Display custom expertise items */}
              {customExpertiseItems.map((area: string) => (
                <Badge
                  key={area}
                  variant="default"
                  size="lg"
                  className="bg-secondary-accent text-white border-secondary-accent group relative pr-8"
                >
                  {area}
                  <button
                    onClick={() => removeCustomExpertise(area)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-0.5 transition-all"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Custom Expertise Input */}
            {showOtherInput && (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customExpertise}
                  onChange={(e) => setCustomExpertise(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat"
                  placeholder="Type your expertise area and press Enter"
                />
                <Button
                  type="button"
                  onClick={handleAddCustomExpertise}
                  className="bg-secondary-accent hover:bg-secondary-accent/90 text-white"
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function MentorshipGoalsStep({ formData, setFormData }: any) {
  const mentorshipAreas = [
    'Career Transition',
    'Skill Development',
    'Leadership Growth',
    'Starting a Business',
    'Interview Preparation',
    'Salary Negotiation',
    'Work-Life Balance',
    'Industry Navigation',
  ]

  const experienceLevels = [
    { value: 'junior', label: 'Junior (0-3 years)' },
    { value: 'mid-level', label: 'Mid-Level (3-7 years)' },
    { value: 'senior', label: 'Senior (7-15 years)' },
    { value: 'expert', label: 'Expert (15+ years)' },
  ]

  const toggleMentorshipArea = (area: string) => {
    if (formData.mentorshipAreas.includes(area)) {
      setFormData({
        ...formData,
        mentorshipAreas: formData.mentorshipAreas.filter((a: string) => a !== area)
      })
    } else {
      setFormData({
        ...formData,
        mentorshipAreas: [...formData.mentorshipAreas, area]
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Mentorship Goals
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Help us understand what type of mentorship you'd like to provide.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
          What areas would you like to mentor in? * (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-3">
          {mentorshipAreas.map((area) => (
            <Badge
              key={area}
              variant={formData.mentorshipAreas.includes(area) ? 'default' : 'outline'}
              size="lg"
              className={`cursor-pointer transition-all ${
                formData.mentorshipAreas.includes(area)
                  ? 'bg-secondary-accent text-white border-secondary-accent'
                  : 'hover:bg-secondary-accent/10 hover:border-secondary-accent'
              }`}
              onClick={() => toggleMentorshipArea(area)}
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
          Experience Level in Your Field *
        </label>
        <div className="flex flex-wrap gap-3">
          {experienceLevels.map((level) => (
            <Badge
              key={level.value}
              variant={formData.mentorExperienceLevel === level.value ? 'default' : 'outline'}
              size="lg"
              className={`cursor-pointer transition-all ${
                formData.mentorExperienceLevel === level.value
                  ? 'bg-secondary-accent text-white border-secondary-accent'
                  : 'hover:bg-secondary-accent/10 hover:border-secondary-accent'
              }`}
              onClick={() => setFormData({ ...formData, mentorExperienceLevel: level.value })}
            >
              {level.label}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-sm text-neutral-600 font-montserrat">
          This helps us match you with mentees who can benefit most from your level of expertise.
        </p>
      </div>
    </div>
  )
}

function AvailabilityStep({ formData, setFormData }: any) {
  const messagingSchedules = ['Daily Check-ins', 'Few Times Per Week', 'Weekly Conversations', 'Bi-weekly Sessions']

  const toggleMessagingSchedule = (schedule: string) => {
    if (formData.preferredMeetingFormat.includes(schedule)) {
      setFormData({
        ...formData,
        preferredMeetingFormat: formData.preferredMeetingFormat.filter((f: string) => f !== schedule)
      })
    } else {
      setFormData({
        ...formData,
        preferredMeetingFormat: [...formData.preferredMeetingFormat, schedule]
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Availability & Commitment
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Let us know when and how you'd like to connect with your mentees.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            How many hours per month can you commit? *
          </label>
          <select
            value={formData.hoursPerMonth}
            onChange={(e) => setFormData({ ...formData, hoursPerMonth: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Select hours</option>
            <option value="2-4">2-4 hours</option>
            <option value="4-8">4-8 hours</option>
            <option value="8-12">8-12 hours</option>
            <option value="12+">12+ hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
            Preferred Messaging Schedule * (Select all that apply)
          </label>
          <p className="text-sm text-neutral-600 font-montserrat mb-3">
            All communication on this platform is text-based messaging only. Select your preferred frequency for exchanging messages with mentees.
          </p>
          <div className="flex flex-wrap gap-3">
            {messagingSchedules.map((schedule) => (
              <Badge
                key={schedule}
                variant={formData.preferredMeetingFormat.includes(schedule) ? 'default' : 'outline'}
                size="lg"
                className={`cursor-pointer transition-all ${
                  formData.preferredMeetingFormat.includes(schedule)
                    ? 'bg-secondary-accent text-white border-secondary-accent'
                    : 'hover:bg-secondary-accent/10 hover:border-secondary-accent'
                }`}
                onClick={() => toggleMessagingSchedule(schedule)}
              >
                {schedule}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            Timezone *
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Select timezone</option>
            <option value="GMT">GMT (London)</option>
            <option value="BST">BST (British Summer Time)</option>
            <option value="CET">Central European Time (CET)</option>
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
          </select>
        </div>
      </div>

      <div className="bg-primary-accent/10 border border-primary-accent/20 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary-dark" />
          Almost Done!
        </h3>
        <p className="text-sm text-neutral-700 font-montserrat">
          Click "Complete Profile" to finish your mentor registration. You'll be able to edit your profile anytime from your dashboard.
        </p>
      </div>
    </div>
  )
}
