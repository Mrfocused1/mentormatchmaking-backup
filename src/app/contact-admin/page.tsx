'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Send, CheckCircle } from 'lucide-react'

export default function ContactAdminPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In production, this would send the message to the admin via API
    console.log('Sending message to admin:', { subject, message })

    // Show success state
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubject('')
      setMessage('')
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-vibrant-accent rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl mb-4">
              Contact Admin
            </h1>
            <p className="text-lg text-white/80 font-montserrat max-w-2xl mx-auto">
              Have a question, concern, or feedback? Send a message directly to our admin team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {submitted ? (
            <Card className="shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">
                  Message Sent!
                </h2>
                <p className="text-neutral-600 font-montserrat">
                  Your message has been sent to the admin team. We'll review it and get back to you shortly.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="Brief description of your inquiry"
                      className="w-full px-4 min-h-[44px] border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-vibrant-accent focus:border-vibrant-accent"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={8}
                      placeholder="Provide details about your question or concern..."
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-vibrant-accent focus:border-vibrant-accent resize-vertical"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-primary-accent/10 border border-primary-accent/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-primary-dark font-montserrat mb-1">
                          What can you contact us about?
                        </p>
                        <ul className="text-sm text-neutral-600 font-montserrat space-y-1">
                          <li>• Technical issues or bugs</li>
                          <li>• Account-related questions</li>
                          <li>• Report inappropriate behavior</li>
                          <li>• Feature requests or feedback</li>
                          <li>• General platform inquiries</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1 bg-vibrant-accent hover:bg-vibrant-accent/90 text-white min-h-[44px]"
                      disabled={!subject.trim() || !message.trim()}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-[44px]"
                      onClick={() => {
                        setSubject('')
                        setMessage('')
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Additional Help Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Response Time
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat">
                  We typically respond within 24-48 hours during business days. Urgent issues are prioritized.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat">
                  Check out our <a href="/help" className="text-vibrant-accent hover:underline">Help Center</a> for instant answers to common questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
