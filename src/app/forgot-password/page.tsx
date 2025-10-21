'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    // Basic validation
    if (!email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-montserrat text-primary-dark sm:text-4xl">
              Reset Your Password
            </h1>
            <p className="mt-3 text-lg text-neutral-600 font-montserrat">
              {success
                ? 'Check your email for the reset link'
                : 'Enter your email and we\'ll send you a reset link'}
            </p>
          </div>

          {/* Forgot Password Card */}
          <Card className="shadow-xl border-neutral-200">
            <CardContent className="p-8">
              {success ? (
                <div className="space-y-6">
                  {/* Success Message */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 font-montserrat mb-1">
                        Reset link sent!
                      </p>
                      <p className="text-sm text-green-700 font-montserrat">
                        We've sent a password reset link to <strong>{email}</strong>.
                        Please check your inbox and click the link to reset your password.
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="text-sm text-neutral-600 font-montserrat space-y-2">
                    <p>Didn't receive the email?</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Check your spam or junk folder</li>
                      <li>Make sure you entered the correct email address</li>
                      <li>Wait a few minutes and check again</li>
                    </ul>
                  </div>

                  {/* Resend Button */}
                  <Button
                    type="button"
                    onClick={() => {
                      setSuccess(false)
                      setEmail('')
                    }}
                    size="lg"
                    variant="outline"
                    className="w-full"
                  >
                    Try a Different Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800 font-montserrat">{error}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="xl"
                    variant="primary"
                    className="w-full bg-vibrant-accent hover:bg-vibrant-accent/90 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Reset Link...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              )}

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-neutral-600 font-montserrat">
            Need help?{' '}
            <Link
              href="/contact"
              className="font-semibold text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
