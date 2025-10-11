'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function EmailPreferencesArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Email Preferences</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Control what emails you receive, how often, and manage your email communication preferences to stay informed without inbox overload.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Accessing Email Settings</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Notifications → Email</li>
          <li>Or click "Manage Preferences" in any email footer</li>
          <li>Customize each email type</li>
          <li>Changes save automatically</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Email Categories</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Essential Emails (Cannot Unsubscribe):</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Password reset confirmations</li>
          <li>Security alerts and login notifications</li>
          <li>Account status changes</li>
          <li>Legal and policy updates</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Activity Emails (Customizable):</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>New messages and connection requests</li>
          <li>Session confirmations and reminders</li>
          <li>Profile views and match recommendations</li>
          <li>Comments and endorsements</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Marketing Emails (Optional):</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Platform updates and new features</li>
          <li>Tips and best practices</li>
          <li>Community events and webinars</li>
          <li>Partner offers and promotions</li>
          <li>Newsletters and success stories</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Email Frequency Options</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Instant:</strong> Receive emails as events happen</li>
          <li><strong>Daily Digest:</strong> One summary email per day</li>
          <li><strong>Weekly Digest:</strong> Weekly roundup on selected day</li>
          <li><strong>Monthly:</strong> Monthly summary</li>
          <li><strong>Never:</strong> Turn off specific email types</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Managing Email Address</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Update email in Account Settings</li>
          <li>Verify new email address</li>
          <li>Old email receives notification</li>
          <li>Add secondary email for backup</li>
          <li>Choose primary email for communications</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Digest Email Customization</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Choose which activities to include</li>
          <li>Select preferred delivery time</li>
          <li>Set digest frequency (daily/weekly)</li>
          <li>Choose day of week for weekly digest</li>
          <li>Preview digest format before saving</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Unsubscribe Options</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click "Unsubscribe" in email footer</li>
          <li>Unsubscribe from specific categories</li>
          <li>Or unsubscribe from all marketing emails</li>
          <li>Changes effective within 48 hours</li>
          <li>Re-subscribe anytime in settings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Email Troubleshooting</h3>
        <div className="space-y-2">
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Not receiving emails:</strong> Check spam folder, verify email address, whitelist sender</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Too many emails:</strong> Switch to digest mode, unsubscribe from optional categories</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Wrong email address:</strong> Update in Account Settings, verify new address</p>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Recommended Email Settings</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Instant: Messages, session reminders, security alerts</li>
          <li>Daily digest: Match recommendations, profile views</li>
          <li>Weekly digest: Tips, community updates, newsletters</li>
          <li>Unsubscribe: Marketing emails if not interested</li>
          <li>Add platform emails to contacts to avoid spam folder</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Email Preferences"
      category="Account Settings"
      description="Manage your email communication preferences to control what you receive and how often."
      content={content}
      relatedArticles={[
        { title: 'Notification Settings', href: '/help/notification-settings' },
        { title: 'Managing Your Conversations', href: '/help/manage-conversations' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Changing Your Password', href: '/help/change-password' }
      ]}
    />
  )
}
