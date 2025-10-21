'use client'

import { useState } from 'react'
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
  Target,
  Briefcase,
  Clock,
  CheckCircle,
  Sparkles,
  X,
  Plus,
  Loader2
} from 'lucide-react'

const TOTAL_STEPS = 4

export default function MenteeOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',

    // Step 2: Goals & Interests
    careerGoals: [] as string[],
    areasOfInterest: [] as string[],
    specificGoals: '',

    // Step 3: Current Status
    currentStatus: '',
    jobTitle: '',
    company: '',
    industry: '',
    experienceLevel: '',

    // Step 4: Preferences
    hoursPerMonth: '',
    preferredMeetingFormat: [] as string[],
    timezone: '',
    mentorPreferences: '',
  })

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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Call API to create profile
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: 'mentee',
          careerGoals: formData.careerGoals,
          areasOfInterest: formData.areasOfInterest,
          specificGoals: formData.specificGoals,
          currentStatus: formData.currentStatus,
          jobTitle: formData.jobTitle,
          company: formData.company,
          industry: formData.industry,
          experienceLevel: formData.experienceLevel,
          hoursPerMonth: formData.hoursPerMonth,
          preferredMeetingFormat: formData.preferredMeetingFormat,
          timezone: formData.timezone,
          location: formData.location,
          mentorPreferences: formData.mentorPreferences,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create profile')
      }

      // Success! Redirect to dashboard
      router.push('/dashboard?success=mentee-signup')
      router.refresh()
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} setFormData={setFormData} />
      case 2:
        return <GoalsInterestsStep formData={formData} setFormData={setFormData} />
      case 3:
        return <CurrentStatusStep formData={formData} setFormData={setFormData} />
      case 4:
        return <PreferencesStep formData={formData} setFormData={setFormData} />
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
            <Badge variant="new" className="mb-4 bg-primary-accent text-primary-dark border-primary-accent">
              <Sparkles className="mr-1 h-3 w-3" />
              Mentee Onboarding
            </Badge>
            <h1 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl">
              Find Your Mentor
            </h1>
            <p className="mt-4 text-lg text-white font-montserrat">
              Start your journey to professional growth
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
                className="h-full bg-primary-accent transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-12">
            {[
              { number: 1, title: 'Personal Info', icon: User },
              { number: 2, title: 'Goals', icon: Target },
              { number: 3, title: 'Status', icon: Briefcase },
              { number: 4, title: 'Preferences', icon: Clock },
            ].map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.number
                      ? 'bg-primary-accent text-primary-dark'
                      : currentStep === step.number
                      ? 'bg-primary-accent text-primary-dark ring-4 ring-primary-accent/20'
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
          <Card className="border-0 shadow-card mb-8">
            <CardContent className="pt-6">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-red-800 font-montserrat">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting}
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
                disabled={isSubmitting}
                className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark gap-2"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <CheckCircle className="h-5 w-5" />
                  </>
                )}
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
          Let's start with the basics. This information will be visible on your mentee profile.
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
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
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
          placeholder="e.g., London, Manchester, Birmingham"
        />
        <p className="text-xs text-neutral-500 font-montserrat mt-2">
          This doesn't need to be your exact address, just your general area or city
        </p>
      </div>
    </div>
  )
}

function GoalsInterestsStep({ formData, setFormData }: any) {
  const [showOtherCareerGoal, setShowOtherCareerGoal] = useState(false)
  const [customCareerGoal, setCustomCareerGoal] = useState('')
  const [showOtherInterest, setShowOtherInterest] = useState(false)
  const [customInterest, setCustomInterest] = useState('')

  const careerGoalOptions = [
    'Career Transition',
    'Skill Development',
    'Leadership Growth',
    'Starting a Business',
    'Interview Preparation',
    'Salary Negotiation',
    'Work-Life Balance',
    'Industry Navigation',
  ]

  const interestOptions = [
    'Leadership',
    'Career Development',
    'Technical Skills',
    'Communication',
    'Project Management',
    'Entrepreneurship',
    'Networking',
    'Podcasting',
    'Hosting',
    'Fitness',
    'Content Creation',
  ]

  const toggleCareerGoal = (goal: string) => {
    if (formData.careerGoals.includes(goal)) {
      setFormData({
        ...formData,
        careerGoals: formData.careerGoals.filter((g: string) => g !== goal)
      })
    } else {
      setFormData({
        ...formData,
        careerGoals: [...formData.careerGoals, goal]
      })
    }
  }

  const toggleInterest = (interest: string) => {
    if (formData.areasOfInterest.includes(interest)) {
      setFormData({
        ...formData,
        areasOfInterest: formData.areasOfInterest.filter((i: string) => i !== interest)
      })
    } else {
      setFormData({
        ...formData,
        areasOfInterest: [...formData.areasOfInterest, interest]
      })
    }
  }

  const handleAddCustomCareerGoal = () => {
    if (customCareerGoal.trim() && !formData.careerGoals.includes(customCareerGoal.trim())) {
      setFormData({
        ...formData,
        careerGoals: [...formData.careerGoals, customCareerGoal.trim()]
      })
      setCustomCareerGoal('')
    }
  }

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !formData.areasOfInterest.includes(customInterest.trim())) {
      setFormData({
        ...formData,
        areasOfInterest: [...formData.areasOfInterest, customInterest.trim()]
      })
      setCustomInterest('')
    }
  }

  const removeCustomCareerGoal = (goal: string) => {
    setFormData({
      ...formData,
      careerGoals: formData.careerGoals.filter((g: string) => g !== goal)
    })
  }

  const removeCustomInterest = (interest: string) => {
    setFormData({
      ...formData,
      areasOfInterest: formData.areasOfInterest.filter((i: string) => i !== interest)
    })
  }

  const customCareerGoals = formData.careerGoals.filter(
    (item: string) => !careerGoalOptions.includes(item)
  )

  const customInterests = formData.areasOfInterest.filter(
    (item: string) => !interestOptions.includes(item)
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Goals & Interests
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Tell us what you're looking to achieve through mentorship.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
          What are your career goals? * (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-3">
          {careerGoalOptions.map((goal) => (
            <Badge
              key={goal}
              variant={formData.careerGoals.includes(goal) ? 'default' : 'outline'}
              size="lg"
              className={`cursor-pointer transition-all ${
                formData.careerGoals.includes(goal)
                  ? 'bg-primary-accent text-primary-dark border-primary-accent'
                  : 'hover:bg-primary-accent/10 hover:border-primary-accent'
              }`}
              onClick={() => toggleCareerGoal(goal)}
            >
              {goal}
            </Badge>
          ))}

          <Badge
            variant={showOtherCareerGoal ? 'default' : 'outline'}
            size="lg"
            className={`cursor-pointer transition-all ${
              showOtherCareerGoal
                ? 'bg-primary-accent text-primary-dark border-primary-accent'
                : 'hover:bg-primary-accent/10 hover:border-primary-accent'
            }`}
            onClick={() => setShowOtherCareerGoal(!showOtherCareerGoal)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Other
          </Badge>

          {customCareerGoals.map((goal: string) => (
            <Badge
              key={goal}
              variant="default"
              size="lg"
              className="bg-primary-accent text-primary-dark border-primary-accent group relative pr-8"
            >
              {goal}
              <button
                onClick={() => removeCustomCareerGoal(goal)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-primary-dark/20 rounded-full p-0.5 transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        {showOtherCareerGoal && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={customCareerGoal}
              onChange={(e) => setCustomCareerGoal(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddCustomCareerGoal()
                }
              }}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
              placeholder="Type your career goal and press Enter"
            />
            <Button
              type="button"
              onClick={handleAddCustomCareerGoal}
              className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
            >
              Add
            </Button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
          Areas of Interest * (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((interest) => (
            <Badge
              key={interest}
              variant={formData.areasOfInterest.includes(interest) ? 'default' : 'outline'}
              size="lg"
              className={`cursor-pointer transition-all ${
                formData.areasOfInterest.includes(interest)
                  ? 'bg-primary-accent text-primary-dark border-primary-accent'
                  : 'hover:bg-primary-accent/10 hover:border-primary-accent'
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </Badge>
          ))}

          <Badge
            variant={showOtherInterest ? 'default' : 'outline'}
            size="lg"
            className={`cursor-pointer transition-all ${
              showOtherInterest
                ? 'bg-primary-accent text-primary-dark border-primary-accent'
                : 'hover:bg-primary-accent/10 hover:border-primary-accent'
            }`}
            onClick={() => setShowOtherInterest(!showOtherInterest)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Other
          </Badge>

          {customInterests.map((interest: string) => (
            <Badge
              key={interest}
              variant="default"
              size="lg"
              className="bg-primary-accent text-primary-dark border-primary-accent group relative pr-8"
            >
              {interest}
              <button
                onClick={() => removeCustomInterest(interest)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-primary-dark/20 rounded-full p-0.5 transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        {showOtherInterest && (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddCustomInterest()
                }
              }}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
              placeholder="Type your area of interest and press Enter"
            />
            <Button
              type="button"
              onClick={handleAddCustomInterest}
              className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
            >
              Add
            </Button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
          Specific Goals <span className="text-neutral-500 font-normal">(optional)</span>
        </label>
        <textarea
          value={formData.specificGoals}
          onChange={(e) => setFormData({ ...formData, specificGoals: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat resize-none"
          placeholder="Tell us more about what you'd like to achieve (e.g., transition to a new career, learn specific skills, prepare for a promotion, etc.)"
        />
      </div>
    </div>
  )
}

function CurrentStatusStep({ formData, setFormData }: any) {
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

  const getJobTitleLabel = () => {
    switch (formData.currentStatus) {
      case 'student':
        return 'Field of Study'
      case 'unemployed':
        return 'Previous Job Title'
      case 'career-change':
        return 'Current/Previous Job Title'
      default:
        return 'Current Job Title'
    }
  }

  const getCompanyLabel = () => {
    switch (formData.currentStatus) {
      case 'student':
        return 'School/University'
      case 'unemployed':
        return 'Previous Company'
      case 'career-change':
        return 'Current/Previous Company'
      default:
        return 'Company'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
          Current Status
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Help us understand your current professional situation.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
          Current Status *
        </label>
        <select
          value={formData.currentStatus}
          onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          <option value="">Select your current status</option>
          <option value="employed">Currently Employed</option>
          <option value="student">Student</option>
          <option value="unemployed">Unemployed/Job Seeking</option>
          <option value="career-change">Looking to Change Careers</option>
        </select>
      </div>

      {formData.currentStatus && (
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
                placeholder={
                  formData.currentStatus === 'student'
                    ? 'Computer Science'
                    : 'Marketing Coordinator'
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
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat"
                placeholder={
                  formData.currentStatus === 'student'
                    ? 'University Name'
                    : 'Company Name'
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
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
                Experience Level *
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="junior">Junior (2-5 years)</option>
                <option value="mid">Mid-Level (5-8 years)</option>
                <option value="senior">Senior (8+ years)</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function PreferencesStep({ formData, setFormData }: any) {
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
          Preferences
        </h2>
        <p className="text-neutral-600 font-montserrat">
          Tell us about your availability and mentor preferences.
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="">Select hours</option>
            <option value="1-2">1-2 hours</option>
            <option value="2-4">2-4 hours</option>
            <option value="4-8">4-8 hours</option>
            <option value="8+">8+ hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
            Preferred Messaging Schedule * (Select all that apply)
          </label>
          <p className="text-sm text-neutral-600 font-montserrat mb-3">
            All communication on this platform is text-based messaging only. Select your preferred frequency for exchanging messages with mentors.
          </p>
          <div className="flex flex-wrap gap-3">
            {messagingSchedules.map((schedule) => (
              <Badge
                key={schedule}
                variant={formData.preferredMeetingFormat.includes(schedule) ? 'default' : 'outline'}
                size="lg"
                className={`cursor-pointer transition-all ${
                  formData.preferredMeetingFormat.includes(schedule)
                    ? 'bg-primary-accent text-primary-dark border-primary-accent'
                    : 'hover:bg-primary-accent/10 hover:border-primary-accent'
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
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat bg-white appearance-none cursor-pointer"
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

        <div>
          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
            Mentor Preferences <span className="text-neutral-500 font-normal">(optional)</span>
          </label>
          <textarea
            value={formData.mentorPreferences}
            onChange={(e) => setFormData({ ...formData, mentorPreferences: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat resize-none"
            placeholder="Tell us about your ideal mentor (e.g., industry experience, communication style, specific expertise, etc.)"
          />
        </div>
      </div>

      <div className="bg-primary-accent/10 border border-primary-accent/20 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary-dark" />
          Almost Done!
        </h3>
        <p className="text-sm text-neutral-700 font-montserrat">
          Click "Complete Profile" to finish your mentee registration. We'll start matching you with mentors right away!
        </p>
      </div>
    </div>
  )
}
