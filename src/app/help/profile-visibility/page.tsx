'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function ProfileVisibilityArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Control Who Sees Your Profile</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Manage your profile visibility to control who can find you, view your information, and send you connection requests. Choose from public, private, or custom visibility settings.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Visibility Options</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Public:</strong> Anyone on the platform can find and view your profile</li>
          <li><strong>Connections Only:</strong> Only your established connections can see full profile</li>
          <li><strong>Private:</strong> Profile hidden from search, invite-only connections</li>
          <li><strong>Custom:</strong> Granular control over what information is visible</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Granular Privacy Controls</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">Customize visibility for specific elements:</p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Profile photo visibility</li>
          <li>Contact information display</li>
          <li>Work history and education</li>
          <li>Skills and endorsements</li>
          <li>Session history and reviews</li>
          <li>Connection list visibility</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Search Visibility</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Appear in search results (on/off)</li>
          <li>Appear in match recommendations (on/off)</li>
          <li>Allow profile indexing by search engines</li>
          <li>Show profile to suggested connections</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Activity Visibility</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Show when you're online</li>
          <li>Display last active timestamp</li>
          <li>Show profile view notifications</li>
          <li>Activity feed visibility</li>
        </ul>
      </div>

      <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
        <p className="text-sm font-montserrat text-neutral-800">
          <strong>Note:</strong> Restricting visibility may limit your match opportunities. We recommend public profiles for active mentoring.
        </p>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Profile Visibility Settings"
      category="Profile Management"
      description="Control who can see your profile and what information is visible to different audiences."
      content={content}
      relatedArticles={[
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Editing Your Profile', href: '/help/edit-profile' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Blocking Users', href: '/help/block-users' }
      ]}
    />
  )
}
