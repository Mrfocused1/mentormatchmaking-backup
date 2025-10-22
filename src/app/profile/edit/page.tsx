'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProfilePhotoUpload } from '@/components/profile/profile-photo-upload'
import { CVUpload } from '@/components/profile/cv-upload'
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle,
  Upload,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'

export default function EditProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  const [profileData, setProfileData] = useState({
    bio: '',
    workExperience: '',
    city: '',
    timezone: '',
    linkedIn: '',
    twitter: '',
    instagram: '',
    availableHours: '',
    helpsWith: '',
    lookingFor: '',
    goals: '',
    interests: [] as string[],
    industries: [] as string[],
  })

  const [newInterest, setNewInterest] = useState('')
  const [newIndustry, setNewIndustry] = useState('')

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          console.error('Auth error:', authError)
          router.push('/login')
          return
        }

        // Fetch user profile with direct Supabase query
        const { data: userProfile, error: profileError } = await supabase
          .from('User')
          .select('*, Profile(*)')
          .eq('id', user.id)
          .maybeSingle()

        if (profileError) {
          console.error('Profile error:', profileError)
          throw new Error('Failed to fetch profile')
        }

        if (!userProfile) {
          console.log('User not found, redirecting to onboarding')
          router.push('/onboarding/mentee')
          return
        }

        setUserData(userProfile)

        // Populate form with existing data
        setProfileData({
          bio: userProfile.Profile?.bio || '',
          workExperience: userProfile.Profile?.workExperience || '',
          city: userProfile.Profile?.city || '',
          timezone: userProfile.Profile?.timezone || '',
          linkedIn: userProfile.Profile?.linkedIn || '',
          twitter: userProfile.Profile?.twitter || '',
          instagram: userProfile.Profile?.instagram || '',
          availableHours: userProfile.Profile?.availableHours?.toString() || '',
          helpsWith: userProfile.Profile?.helpsWith || '',
          lookingFor: userProfile.Profile?.lookingFor || '',
          goals: userProfile.Profile?.goals || '',
          interests: [], // TODO: Load from separate interests table if needed
          industries: [], // TODO: Load from separate industries table if needed
        })
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleAddInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newInterest.trim()]
      })
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter(i => i !== interest)
    })
  }

  const handleAddIndustry = () => {
    if (newIndustry.trim() && !profileData.industries.includes(newIndustry.trim())) {
      setProfileData({
        ...profileData,
        industries: [...profileData.industries, newIndustry.trim()]
      })
      setNewIndustry('')
    }
  }

  const handleRemoveIndustry = (industry: string) => {
    setProfileData({
      ...profileData,
      industries: profileData.industries.filter(i => i !== industry)
    })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(false)

      const supabase = createClient()

      // Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        throw new Error('Not authenticated')
      }

      // Update profile with direct Supabase query
      const { error: updateError } = await supabase
        .from('Profile')
        .update({
          bio: profileData.bio || null,
          workExperience: profileData.workExperience || null,
          city: profileData.city || null,
          timezone: profileData.timezone || null,
          linkedIn: profileData.linkedIn || null,
          twitter: profileData.twitter || null,
          instagram: profileData.instagram || null,
          availableHours: profileData.availableHours ? parseInt(profileData.availableHours) : null,
          helpsWith: profileData.helpsWith || null,
          lookingFor: profileData.lookingFor || null,
          goals: profileData.goals || null,
          // Note: interests and industries would need separate table handling
        })
        .eq('userId', user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error('Failed to update profile')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      console.error('Error saving profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-accent mx-auto mb-4" />
            <p className="text-neutral-600 font-montserrat">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !userData) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-600 font-montserrat mb-4">{error}</p>
            <Button onClick={() => router.back()} className="bg-primary-accent text-primary-dark">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
                </Link>
              </div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Edit Profile
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Update your information to help others connect with you
              </p>
            </div>
            <Button
              onClick={handleSave}
              size="lg"
              disabled={saving}
              className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Edit Form */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-montserrat">Profile updated successfully! Redirecting to dashboard...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800 font-montserrat">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Photo */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {userData && (
                  <ProfilePhotoUpload
                    currentPhotoUrl={userData.profile?.profilePicture}
                    userId={userData.id}
                    userName={userData.name || ''}
                    onUploadSuccess={(url) => {
                      // Update local state
                      setUserData({
                        ...userData,
                        profile: {
                          ...userData.profile,
                          profilePicture: url,
                        },
                      })
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* CV/Resume Upload */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">CV / Resume</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {userData && (
                  <CVUpload
                    currentCVUrl={userData.Profile?.cvUrl}
                    userId={userData.id}
                    userName={userData.name || ''}
                    onUploadSuccess={(url) => {
                      // Update local state
                      setUserData({
                        ...userData,
                        Profile: {
                          ...userData.Profile,
                          cvUrl: url,
                        },
                      })
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ''}
                    disabled
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm bg-neutral-100 text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-neutral-500 font-montserrat mt-1">
                    Name cannot be changed here. Contact support to update.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Bio *
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    placeholder="Tell others about yourself, your experience, and what you're looking for..."
                  />
                  <p className="text-xs text-neutral-500 font-montserrat mt-1">
                    {profileData.bio.length} / 500 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Work Experience / Job Title
                    </label>
                    <input
                      type="text"
                      value={profileData.workExperience}
                      onChange={(e) => handleChange('workExperience', e.target.value)}
                      placeholder="e.g., Senior Software Engineer at Google"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={profileData.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    placeholder="e.g., PST, EST, GMT"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Available Hours Per Month
                  </label>
                  <input
                    type="number"
                    value={profileData.availableHours}
                    onChange={(e) => handleChange('availableHours', e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    {userData?.role === 'MENTOR' ? 'What I Can Help With' : 'What I\'m Looking For'}
                  </label>
                  <textarea
                    value={userData?.role === 'MENTOR' ? profileData.helpsWith : profileData.lookingFor}
                    onChange={(e) => handleChange(userData?.role === 'MENTOR' ? 'helpsWith' : 'lookingFor', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    placeholder={userData?.role === 'MENTOR' ? 'Describe what you can help mentees with...' : 'Describe what kind of mentorship you\'re looking for...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Goals
                  </label>
                  <textarea
                    value={profileData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    placeholder="What are your professional goals?"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interests & Expertise */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Interests & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Add Interests
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                      placeholder="e.g., Web Development, AI, Design, Leadership"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                    <Button onClick={handleAddInterest} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.interests.length > 0 ? (
                    profileData.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="px-3 py-1 text-sm bg-primary-accent/10 border-primary-accent/30 text-primary-dark"
                      >
                        {interest}
                        <button
                          onClick={() => handleRemoveInterest(interest)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500 font-montserrat">No interests added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Industries */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Industries</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Add Industries
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddIndustry()}
                      placeholder="e.g., Technology, Healthcare, Finance"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                    <Button onClick={handleAddIndustry} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.industries.length > 0 ? (
                    profileData.industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant="outline"
                        className="px-3 py-1 text-sm bg-secondary-accent/10 border-secondary-accent/30 text-primary-dark"
                      >
                        {industry}
                        <button
                          onClick={() => handleRemoveIndustry(industry)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500 font-montserrat">No industries added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    <Linkedin className="inline h-4 w-4 mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={profileData.linkedIn}
                    onChange={(e) => handleChange('linkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    <Twitter className="inline h-4 w-4 mr-2" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={profileData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    <Instagram className="inline h-4 w-4 mr-2" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={profileData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button (Bottom) */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                size="lg"
                disabled={saving}
                asChild={!saving}
              >
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button
                onClick={handleSave}
                size="lg"
                disabled={saving}
                className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
