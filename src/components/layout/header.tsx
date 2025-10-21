'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, LayoutDashboard, MessageCircle, Bell, User, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClient()

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Mock unread counts - in production these would come from API/state management
  const unreadMessages = 5
  const unreadNotifications = 3

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse-mentors' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Look 4 Mentors"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium font-montserrat text-primary-dark hover:text-vibrant-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA - Show different content based on auth */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Authenticated User Navigation */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium font-montserrat text-primary-dark hover:bg-neutral-100 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/messages"
                  className="relative flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium font-montserrat text-primary-dark hover:bg-neutral-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                  {unreadMessages > 0 && (
                    <Badge variant="secondary" size="sm" className="absolute -top-1 -right-1 bg-secondary-accent text-white px-1.5 py-0.5 text-xs">
                      {unreadMessages}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/notifications"
                  className="relative flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium font-montserrat text-primary-dark hover:bg-neutral-100 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <Badge variant="secondary" size="sm" className="absolute -top-1 -right-1 bg-red-600 text-white px-1.5 py-0.5 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/contact-admin"
                  className="flex items-center gap-2 px-3 min-h-[44px] rounded-lg text-sm font-medium font-montserrat text-vibrant-accent hover:bg-vibrant-accent/10 transition-colors"
                  title="Contact Admin"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="hidden lg:inline">Help</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center justify-center gap-2 px-3 min-h-[44px] min-w-[44px] rounded-lg text-sm font-medium font-montserrat text-primary-dark hover:bg-neutral-100 transition-colors ml-2"
                  title="Profile & Settings"
                >
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                {/* Non-Authenticated Navigation */}
                <Button variant="ghost" size="sm" className="min-h-[44px]" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button variant="primary" size="sm" className="min-h-[44px]" asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md min-h-[44px] min-w-[44px] text-primary-dark hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {/* Authenticated User Navigation - Mobile */}
          {isAuthenticated && (
            <div className="space-y-1 mb-4 pb-4 border-b border-neutral-200">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-md px-3 min-h-[44px] text-base font-medium font-montserrat text-primary-dark hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center gap-3 rounded-md px-3 min-h-[44px] text-base font-medium font-montserrat text-primary-dark hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
                {unreadMessages > 0 && (
                  <Badge variant="secondary" size="sm" className="ml-auto bg-secondary-accent text-white">
                    {unreadMessages}
                  </Badge>
                )}
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-3 rounded-md px-3 min-h-[44px] text-base font-medium font-montserrat text-primary-dark hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
                {unreadNotifications > 0 && (
                  <Badge variant="secondary" size="sm" className="ml-auto bg-red-600 text-white">
                    {unreadNotifications}
                  </Badge>
                )}
              </Link>
              <Link
                href="/contact-admin"
                className="flex items-center gap-3 rounded-md px-3 min-h-[44px] text-base font-medium font-montserrat text-vibrant-accent hover:bg-vibrant-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Contact Admin</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md px-3 min-h-[44px] text-base font-medium font-montserrat text-primary-dark hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile & Settings</span>
              </Link>
            </div>
          )}

          {/* Main Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 min-h-[44px] flex items-center text-base font-medium font-montserrat text-primary-dark hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA Buttons - Only show if not authenticated */}
          {!isAuthenticated && (
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" fullWidth className="min-h-[44px]" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="primary" fullWidth className="min-h-[44px]" asChild>
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}