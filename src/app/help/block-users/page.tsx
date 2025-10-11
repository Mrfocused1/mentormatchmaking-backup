'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function BlockUsersArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Blocking Users</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Blocking allows you to prevent specific users from contacting you or viewing your profile. Use this feature to protect yourself from unwanted interactions and maintain your peace of mind.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Block Someone</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to the user's profile or conversation</li>
          <li>Click the three-dot menu</li>
          <li>Select "Block User"</li>
          <li>Confirm your decision</li>
          <li>Optionally, report the user as well</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What Happens When You Block</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>They can't send you messages</li>
          <li>They can't view your full profile</li>
          <li>They can't see your activity or posts</li>
          <li>All scheduled sessions are cancelled</li>
          <li>Previous conversations are hidden (not deleted)</li>
          <li>They won't appear in your search results</li>
          <li>They won't be notified you blocked them</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Managing Blocked Users</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Privacy → Blocked Users</li>
          <li>View list of all blocked users</li>
          <li>Unblock users if needed</li>
          <li>Add notes about why you blocked someone</li>
          <li>Export blocked list for your records</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Unblocking Users</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Blocked Users</li>
          <li>Find the user you want to unblock</li>
          <li>Click "Unblock"</li>
          <li>Confirm your decision</li>
          <li>Previous messages remain hidden until you choose to restore</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">When to Block vs Report</h3>
        <div className="space-y-3">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-yellow-900 mb-1">Block When:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 font-montserrat ml-4">
              <li>You want to avoid someone but they haven't violated rules</li>
              <li>Uncomfortable but not reportable behavior</li>
              <li>Personal preference to not interact</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Report AND Block When:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
              <li>Harassment or inappropriate behavior</li>
              <li>Violations of community guidelines</li>
              <li>Safety concerns</li>
              <li>Scams or fraud attempts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Block Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Block immediately if you feel unsafe</li>
          <li>Don't feel obligated to explain why you're blocking</li>
          <li>Consider reporting if behavior violates guidelines</li>
          <li>Review blocked list periodically</li>
          <li>Trust your instincts about who to block</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Blocking Users"
      category="Safety & Privacy"
      description="Learn how to block users to prevent unwanted contact and maintain your safety on the platform."
      content={content}
      relatedArticles={[
        { title: 'Reporting Inappropriate Behavior', href: '/help/report-behavior' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' }
      ]}
    />
  )
}
