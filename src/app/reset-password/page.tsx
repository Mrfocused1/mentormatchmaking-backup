'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function ResetPassword() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsValidSession(!!session)
    }
    checkSession()
  }, [supabase])

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    // Validation
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your password')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      setIsLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        setError(updateError.message)
        setIsLoading(false)
        return
      }

      setSuccess(true)
      setIsLoading(false)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login?reset=success')
      }, 2000)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  // Show loading while checking session
  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary-accent border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-neutral-600 font-montserrat">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show error if no valid session
  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-neutral-200">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
                  Invalid or Expired Link
                </h2>
                <p className="text-neutral-600 font-montserrat mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Link href="/forgot-password">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full bg-vibrant-accent hover:bg-vibrant-accent/90"
                  >
                    Request New Link
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-montserrat text-primary-dark sm:text-4xl">
              Set New Password
            </h1>
            <p className="mt-3 text-lg text-neutral-600 font-montserrat">
              {success
                ? 'Your password has been updated!'
                : 'Enter your new password below'}
            </p>
          </div>

          {/* Reset Password Card */}
          <Card className="shadow-xl border-neutral-200">
            <CardContent className="p-8">
              {success ? (
                <div className="space-y-6 text-center">
                  {/* Success Message */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-800 font-montserrat mb-1">
                        Password Updated!
                      </p>
                      <p className="text-sm text-green-700 font-montserrat">
                        Your password has been successfully updated. Redirecting you to login...
                      </p>
                    </div>
                  </div>

                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-full bg-vibrant-accent hover:bg-vibrant-accent/90"
                    >
                      Go to Login
                    </Button>
                  </Link>
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

                  {/* New Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (error) setError('')
                        }}
                        className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                        placeholder="Enter your new password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold font-montserrat text-primary-dark mb-2"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (error) setError('')
                        }}
                        className="block w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-colors"
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="text-xs text-neutral-600 font-montserrat space-y-1 bg-neutral-50 p-3 rounded-lg">
                    <p className="font-semibold text-neutral-700 mb-1">Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>At least 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                    </ul>
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
                        Updating Password...
                      </span>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </form>
              )}
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
