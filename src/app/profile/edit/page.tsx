'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Upload,
  Save,
  X,
  Plus,
  Trash2,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Link2
} from 'lucide-react'

export default function EditProfilePage() {
  // Mock user data - in production this would come from auth/API
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    role: 'mentor', // or 'mentee'
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with 10+ years of experience in full-stack development. I love helping others grow in their tech careers and sharing knowledge about software architecture, clean code, and career development.',
    expertise: ['JavaScript', 'React', 'Node.js', 'System Design', 'Career Development'],
    interests: ['Web Development', 'Mentoring', 'Public Speaking', 'Open Source'],
    availability: 'Part-time',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    twitter: 'https://twitter.com/sarahjohnson',
    github: 'https://github.com/sarahjohnson',
    website: 'https://sarahjohnson.com',
    education: 'B.S. Computer Science - Stanford University',
    yearsOfExperience: '10+',
  })

  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.expertise.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        expertise: [...profileData.expertise, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      expertise: profileData.expertise.filter(s => s !== skill)
    })
  }

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

  const handleSave = () => {
    // In production, this would save to backend
    console.log('Saving profile:', profileData)
    alert('Profile updated successfully!')
  }

  const handleChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    })
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
              className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      {/* Edit Form */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <Avatar fallback={profileData.name} size="2xl" className="border-4 border-neutral-200" />
                  <div className="flex-1">
                    <p className="text-sm text-neutral-600 font-montserrat mb-3">
                      Upload a professional photo that represents you well. This will be visible to all users.
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="City, State/Country"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                  </div>
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
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Years of Experience
                    </label>
                    <select
                      value={profileData.yearsOfExperience}
                      onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    >
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                      Availability
                    </label>
                    <select
                      value={profileData.availability}
                      onChange={(e) => handleChange('availability', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Weekends">Weekends only</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    placeholder="e.g., B.S. Computer Science - Stanford University"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Add Skills
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      placeholder="e.g., JavaScript, React, Leadership"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                    <Button onClick={handleAddSkill} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="px-3 py-1 text-sm bg-primary-accent/10 border-primary-accent/30 text-primary-dark"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="text-lg">Interests</CardTitle>
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
                      placeholder="e.g., Web Development, AI, Design"
                      className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                    />
                    <Button onClick={handleAddInterest} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="px-3 py-1 text-sm bg-secondary-accent/10 border-secondary-accent/30 text-primary-dark"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
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
                    <Github className="inline h-4 w-4 mr-2" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={profileData.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    <Link2 className="inline h-4 w-4 mr-2" />
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
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
                asChild
              >
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button
                onClick={handleSave}
                size="lg"
                className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg"
              >
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
