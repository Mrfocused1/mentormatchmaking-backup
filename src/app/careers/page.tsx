'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Rocket,
  Heart,
  TrendingUp,
  Coffee,
  Zap,
  Target,
  Award,
  Upload,
  FileText,
  X,
  Send,
  Briefcase
} from 'lucide-react'

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    linkedIn: '',
    portfolio: '',
    message: '',
  })
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)

  const benefits = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Fast-Growing Startup',
      description: 'Join us on our mission to transform mentorship and be part of something big from the ground up.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Amazing Team',
      description: 'Work with passionate, talented people who care about making a real impact on careers worldwide.'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Growth Opportunities',
      description: 'Accelerate your career with mentorship, learning budgets, and opportunities to take on new challenges.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Meaningful Work',
      description: 'Every day, you\'ll help connect people and transform careers. Your work truly matters.'
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours. Work from anywhere and maintain work-life balance.'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Competitive Package',
      description: 'Competitive salary, equity options, health benefits, and generous PTO. We value our team.'
    }
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Impact-Driven',
      description: 'We measure success by the careers we transform and the connections we enable.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Move Fast',
      description: 'We iterate quickly, learn from feedback, and continuously improve our platform.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community First',
      description: 'Our users are at the heart of everything. We build for real people with real goals.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Inclusive & Diverse',
      description: 'We celebrate differences and create opportunities for everyone, regardless of background.'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (allowedTypes.includes(file.type)) {
        setUploadedCV(file)
      } else {
        alert('Please upload a PDF or Word document')
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', { formData, cv: uploadedCV })
    alert('Application submitted successfully! We\'ll be in touch soon.')
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      linkedIn: '',
      portfolio: '',
      message: '',
    })
    setUploadedCV(null)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-white/90 font-montserrat max-w-2xl mx-auto">
            We're always looking for talented individuals who want to make a difference. We're open to people from all different backgrounds and skill sets. Pitch yourself and tell us what you can bring to our team!
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              Why Join MentorMatchmaking?
            </h2>
            <p className="text-lg text-neutral-600 font-montserrat max-w-3xl mx-auto">
              We're on a mission to democratize access to mentorship and help millions of professionals achieve their career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-neutral-200 hover:border-primary-accent transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-accent/10 flex items-center justify-center text-primary-accent mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-montserrat leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 font-montserrat max-w-3xl mx-auto">
              These principles guide everything we do and shape our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-neutral-200 hover:border-secondary-accent transition-all">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-accent/10 text-secondary-accent mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-montserrat">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="shadow-xl border-neutral-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
                  Pitch Yourself to Join Our Team
                </h2>
                <p className="text-neutral-600 font-montserrat">
                  Tell us about yourself and what you can bring to MentorMatchmaking. We're open to all talents and backgrounds!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                    What role/area would you like to contribute in? *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                    placeholder="e.g., Marketing, Engineering, Design, Operations, etc."
                  />
                  <p className="text-xs text-neutral-500 font-montserrat mt-2">
                    Tell us what area you'd like to work in or what skills you can bring to our team
                  </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                      Portfolio / Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                    Upload Your CV / Resume *
                  </label>
                  <p className="text-sm text-neutral-600 font-montserrat mb-3">
                    Please upload your most recent CV or resume
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
                        type="button"
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
                        required
                      />
                    </label>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-primary-dark mb-2">
                    Pitch Yourself - What Can You Bring to Our Team? *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent font-montserrat text-sm resize-none"
                    placeholder="Tell us about your skills, experience, and what unique value you'd bring to MentorMatchmaking. Be creative and authentic - we want to know what makes you special!"
                  />
                  <p className="text-xs text-neutral-500 font-montserrat mt-2">
                    {formData.message.length} characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1 bg-secondary-accent hover:bg-secondary-accent/90 text-white"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Application
                  </Button>
                </div>

                <p className="text-xs text-neutral-500 font-montserrat text-center">
                  By submitting this application, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
