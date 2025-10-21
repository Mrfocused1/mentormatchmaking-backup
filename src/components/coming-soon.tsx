'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'

const PREVIEW_PASSWORD = 'mentormatch2025' // You can change this to any password you want

interface ComingSoonProps {
  onAuthenticated: () => void
}

export function ComingSoon({ onAuthenticated }: ComingSoonProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === PREVIEW_PASSWORD) {
      setSuccess(true)
      setError(false)

      // Store authentication in localStorage
      localStorage.setItem('preview_access', 'true')

      // Wait a moment to show success state, then authenticate
      setTimeout(() => {
        onAuthenticated()
      }, 800)
    } else {
      setError(true)
      setSuccess(false)
      setPassword('')

      // Clear error after 3 seconds
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vibrant-accent/20 mb-6">
            <Lock className="h-10 w-10 text-vibrant-accent" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-montserrat text-white mb-4">
            Look 4 Mentors
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-accent/10 border border-primary-accent/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-accent rounded-full animate-pulse" />
            <span className="text-sm font-bold font-montserrat text-primary-accent">
              COMING SOON
            </span>
          </div>
          <p className="text-xl text-white/80 font-montserrat max-w-lg mx-auto">
            We're building something amazing. Connect with mentors who will transform your journey.
          </p>
        </div>

        {/* Password Card */}
        <Card className="shadow-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black font-montserrat text-white mb-2">
                Get a Sneak Peek
              </h2>
              <p className="text-white/70 font-montserrat">
                Enter the password to preview the platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter preview password"
                    className={`w-full px-4 py-4 pr-12 bg-white/10 border-2 rounded-lg font-montserrat text-white placeholder-white/40 focus:outline-none transition-all ${
                      error
                        ? 'border-error focus:border-error'
                        : success
                        ? 'border-success focus:border-success'
                        : 'border-white/20 focus:border-primary-accent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-3 flex items-center gap-2 text-error text-sm font-semibold font-montserrat">
                    <XCircle className="h-4 w-4" />
                    <span>Incorrect password. Please try again.</span>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mt-3 flex items-center gap-2 text-success text-sm font-semibold font-montserrat">
                    <CheckCircle className="h-4 w-4" />
                    <span>Access granted! Redirecting...</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!password || success}
                className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90 font-bold text-lg shadow-lg"
              >
                {success ? 'Unlocking...' : 'Unlock Preview'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-accent/20 mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-bold font-montserrat text-white mb-1">
              Expert Mentors
            </h3>
            <p className="text-sm text-white/70 font-montserrat">
              Connect with industry leaders
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-accent/20 mb-3">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-bold font-montserrat text-white mb-1">
              Real-time Messaging
            </h3>
            <p className="text-sm text-white/70 font-montserrat">
              Seamless communication
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-vibrant-accent/20 mb-3">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-bold font-montserrat text-white mb-1">
              Easy Scheduling
            </h3>
            <p className="text-sm text-white/70 font-montserrat">
              Book sessions instantly
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/50 font-montserrat text-sm">
            © 2025 Look 4 Mentors. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
