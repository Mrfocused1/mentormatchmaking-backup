'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function DeactivateAccountArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Deactivating Your Account</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Temporarily pause your account without losing your data. Deactivation hides your profile and pauses all activity while preserving your information for when you return.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Deactivate vs Delete</h3>
        <div className="space-y-3">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-yellow-900 mb-1">Deactivate (Temporary):</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 font-montserrat ml-4">
              <li>Profile hidden from search</li>
              <li>Data preserved</li>
              <li>Can reactivate anytime</li>
              <li>Connections maintained</li>
              <li>Messages archived, not deleted</li>
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Delete (Permanent):</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
              <li>All data permanently deleted</li>
              <li>Cannot be undone</li>
              <li>Must create new account to return</li>
              <li>All connections lost</li>
              <li>30-day grace period before final deletion</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Deactivate</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Account</li>
          <li>Scroll to "Deactivate Account"</li>
          <li>Click "Deactivate My Account"</li>
          <li>Select reason for deactivation (optional)</li>
          <li>Review what happens when deactivated</li>
          <li>Enter password to confirm</li>
          <li>Click "Deactivate"</li>
          <li>Account immediately deactivated</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What Happens When Deactivated</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Profile hidden from all users</li>
          <li>Removed from search results</li>
          <li>All scheduled sessions cancelled</li>
          <li>Cannot send or receive messages</li>
          <li>Email notifications paused</li>
          <li>Active connections notified of your absence</li>
          <li>Data safely stored for reactivation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Reactivate</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to login page</li>
          <li>Enter your credentials</li>
          <li>Click "Reactivate Account" button</li>
          <li>Confirm you want to reactivate</li>
          <li>Review and update availability</li>
          <li>Profile immediately reactivated</li>
          <li>All data restored as it was</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Before You Deactivate</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Notify active connections about your break</li>
          <li>Cancel upcoming sessions</li>
          <li>Download any important data or conversations</li>
          <li>Update auto-responses if available</li>
          <li>Consider taking a break instead of full deactivation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Alternative to Deactivation</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Vacation Mode:</strong> Pause activity for set period</li>
          <li><strong>Limited Availability:</strong> Reduce session hours</li>
          <li><strong>Private Profile:</strong> Hide from search but keep connections</li>
          <li><strong>Notification Pause:</strong> Mute notifications temporarily</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Common Reasons to Deactivate</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Taking a break from mentoring</li>
          <li>Busy period at work</li>
          <li>Personal reasons or life changes</li>
          <li>Achieved mentorship goals</li>
          <li>Exploring other platforms temporarily</li>
          <li>Need time to reflect on goals</li>
        </ul>
      </div>

      <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Important Notes</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Deactivation is reversible - deletion is not</li>
          <li>No time limit on deactivation period</li>
          <li>Data remains secure while deactivated</li>
          <li>Reactivation is instant</li>
          <li>Consider alternatives before deactivating</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Deactivating Your Account"
      category="Account Settings"
      description="Learn how to temporarily deactivate your account and what happens to your data and connections."
      content={content}
      relatedArticles={[
        { title: 'Deleting Your Account', href: '/help/delete-account' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Changing Your Password', href: '/help/change-password' }
      ]}
    />
  )
}
