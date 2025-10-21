'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
  Sparkles,
  CheckCircle
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData)
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@look4mentors.com',
      description: 'Send us an email anytime',
      href: 'mailto:support@look4mentors.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm EST',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Mentorship Way, Suite 100',
      description: 'London, UK EC1A 1BB',
      href: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday',
      description: '8:00 AM - 6:00 PM EST',
      href: null,
    },
  ]

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'mentor', label: 'Mentor Application' },
    { value: 'mentee', label: 'Mentee Support' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
  ]

  const faqs = [
    {
      icon: HelpCircle,
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days.',
    },
    {
      icon: MessageCircle,
      question: 'How can I communicate with the support team?',
      answer: 'You can reach us via email, phone, or this contact form. We\'ll respond to your inquiry within 24 hours during business days.',
    },
    {
      icon: Users,
      question: 'Do you offer enterprise solutions?',
      answer: 'Absolutely! Select "Partnership Opportunities" and tell us about your organization.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-primary-accent/20 border border-primary-accent/30 rounded-full">
              <Sparkles className="mr-2 h-4 w-4 text-primary-accent" />
              <span className="text-sm font-semibold font-montserrat text-primary-accent">
                We're Here to Help
              </span>
            </div>
            <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 font-montserrat lg:text-xl">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {submitted && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 animate-in slide-in- duration-500">
          <div className="bg-white border-2 border-primary-accent shadow-2xl rounded-lg p-6 max-w-md w-full">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary-accent" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-1">
                  Message Sent!
                </h3>
                <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-neutral-200">
                <CardContent className="p-8 sm:p-12">
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors appearance-none bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                        }}
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="block w-full px-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="xl"
                      variant="primary"
                      className="w-full bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="border-neutral-200 hover:border-primary-accent transition-colors">
                      <CardContent className="p-6">
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-start gap-4 group"
                          >
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary-accent/10 flex items-center justify-center group-hover:bg-primary-accent/20 transition-colors">
                                <item.icon className="h-5 w-5 text-primary-accent" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">
                                {item.title}
                              </p>
                              <p className="text-sm font-medium font-montserrat text-neutral-700">
                                {item.content}
                              </p>
                              <p className="text-xs text-neutral-500 font-montserrat mt-1">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary-accent/10 flex items-center justify-center">
                                <item.icon className="h-5 w-5 text-primary-accent" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">
                                {item.title}
                              </p>
                              <p className="text-sm font-medium font-montserrat text-neutral-700">
                                {item.content}
                              </p>
                              <p className="text-xs text-neutral-500 font-montserrat mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick FAQs */}
              <div>
                <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-6">
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="border-neutral-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <faq.icon className="h-5 w-5 text-secondary-accent flex-shrink-0 mt-0.5" />
                          <h4 className="text-sm font-semibold font-montserrat text-primary-dark">
                            {faq.question}
                          </h4>
                        </div>
                        <p className="text-sm text-neutral-600 font-montserrat">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
