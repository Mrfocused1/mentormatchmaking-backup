'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Eye,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Mail,
  MessageCircle,
  Heart,
  Calendar,
  Trash2,
  LogOut,
  Check
} from 'lucide-react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account')

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'mentor',
    phone: '+44 20 1234 5678',
    location: 'London, UK',
  }

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    newMessages: true,
    interestRequests: true,
    matches: true,
    sessionReminders: true,
    weeklyDigest: false,
    marketingEmails: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    newMessages: true,
    interestRequests: true,
    matches: false,
    sessionReminders: true,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // public, connections, private
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessagesFrom: 'matches', // anyone, matches, none
    showOnlineStatus: true,
  })

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
  })

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              Settings
            </h1>
            <p className="mt-2 text-white/80 font-montserrat">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm font-medium transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary-accent text-primary-dark'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <section.icon className="h-5 w-5" />
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <>
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary-accent" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            defaultValue={user.phone}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            defaultValue={user.location}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <Button className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark">
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="ghost">Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary-accent" />
                        Password & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <Button className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark">
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-red-200">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <Trash2 className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold font-montserrat text-neutral-900">
                            Delete Account
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat mt-1">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                        </div>
                        <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                      <div className="flex items-start justify-between pt-4 border-t border-neutral-200">
                        <div>
                          <h3 className="font-semibold font-montserrat text-neutral-900">
                            Deactivate Account
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat mt-1">
                            Temporarily deactivate your account. You can reactivate it anytime.
                          </p>
                        </div>
                        <Button variant="ghost" className="text-neutral-600 hover:bg-neutral-100">
                          Deactivate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <>
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary-accent" />
                        Email Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {Object.entries(emailNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                          <div>
                            <h3 className="font-semibold font-montserrat text-neutral-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              {key === 'newMessages' && 'Receive emails when you get new messages'}
                              {key === 'interestRequests' && 'Get notified about new interest requests'}
                              {key === 'matches' && 'Be notified when you match with someone'}
                              {key === 'sessionReminders' && 'Reminders about upcoming sessions'}
                              {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                              {key === 'marketingEmails' && 'Updates about new features and tips'}
                            </p>
                          </div>
                          <button
                            onClick={() => setEmailNotifications(prev => ({ ...prev, [key]: !value }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary-accent" />
                        Push Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {Object.entries(pushNotifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                          <div>
                            <h3 className="font-semibold font-montserrat text-neutral-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              {key === 'newMessages' && 'Push notifications for new messages'}
                              {key === 'interestRequests' && 'Push notifications for interest requests'}
                              {key === 'matches' && 'Push notifications for new matches'}
                              {key === 'sessionReminders' && 'Push notifications for session reminders'}
                            </p>
                          </div>
                          <button
                            onClick={() => setPushNotifications(prev => ({ ...prev, [key]: !value }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <>
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-primary-accent" />
                        Profile Visibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
                          Who can see your profile?
                        </label>
                        <div className="space-y-3">
                          {['public', 'connections', 'private'].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option}
                                checked={privacySettings.profileVisibility === option}
                                onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                                className="w-4 h-4 text-primary-accent focus:ring-primary-accent"
                              />
                              <div>
                                <span className="font-medium font-montserrat text-neutral-900 capitalize">{option}</span>
                                <p className="text-sm text-neutral-600 font-montserrat">
                                  {option === 'public' && 'Anyone can view your profile'}
                                  {option === 'connections' && 'Only your matches can view your profile'}
                                  {option === 'private' && 'Only you can view your profile'}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-200 space-y-4">
                        <h3 className="font-semibold font-montserrat text-neutral-900">
                          Contact Information
                        </h3>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h4 className="font-medium font-montserrat text-neutral-900">Show Email Address</h4>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              Display your email on your profile
                            </p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.showEmail ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.showEmail ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h4 className="font-medium font-montserrat text-neutral-900">Show Phone Number</h4>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              Display your phone number on your profile
                            </p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings(prev => ({ ...prev, showPhone: !prev.showPhone }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.showPhone ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.showPhone ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h4 className="font-medium font-montserrat text-neutral-900">Show Location</h4>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              Display your location on your profile
                            </p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings(prev => ({ ...prev, showLocation: !prev.showLocation }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.showLocation ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.showLocation ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-primary-accent" />
                        Messaging
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-3">
                          Who can send you messages?
                        </label>
                        <div className="space-y-3">
                          {['anyone', 'matches', 'none'].map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                name="allowMessagesFrom"
                                value={option}
                                checked={privacySettings.allowMessagesFrom === option}
                                onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessagesFrom: e.target.value }))}
                                className="w-4 h-4 text-primary-accent focus:ring-primary-accent"
                              />
                              <div>
                                <span className="font-medium font-montserrat text-neutral-900 capitalize">{option}</span>
                                <p className="text-sm text-neutral-600 font-montserrat">
                                  {option === 'anyone' && 'Anyone can send you messages'}
                                  {option === 'matches' && 'Only your matches can message you'}
                                  {option === 'none' && 'Block all incoming messages'}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-200">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h4 className="font-medium font-montserrat text-neutral-900">Show Online Status</h4>
                            <p className="text-sm text-neutral-600 font-montserrat mt-1">
                              Let others see when you're online
                            </p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              privacySettings.showOnlineStatus ? 'bg-primary-accent' : 'bg-neutral-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary-accent" />
                        Blocked Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-sm text-neutral-600 font-montserrat mb-4">
                        You haven't blocked any users yet. Blocked users cannot see your profile or send you messages.
                      </p>
                      <Button variant="outline">
                        Manage Blocked Users
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Preferences */}
              {activeSection === 'preferences' && (
                <>
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary-accent" />
                        Language & Region
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Language
                        </label>
                        <select
                          value={accountSettings.language}
                          onChange={(e) => setAccountSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="pt">Português</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={accountSettings.timezone}
                          onChange={(e) => setAccountSettings(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                        >
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={accountSettings.currency}
                          onChange={(e) => setAccountSettings(prev => ({ ...prev, currency: e.target.value }))}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <Button className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark">
                          <Check className="h-4 w-4 mr-2" />
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle>Data & Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between py-3 border-b border-neutral-100">
                        <div>
                          <h3 className="font-semibold font-montserrat text-neutral-900">
                            Download Your Data
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat mt-1">
                            Get a copy of all your data including profile, messages, and activity
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                      <div className="flex items-start justify-between py-3">
                        <div>
                          <h3 className="font-semibold font-montserrat text-neutral-900">
                            Privacy Policy
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat mt-1">
                            Read our privacy policy and terms of service
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/privacy">View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
