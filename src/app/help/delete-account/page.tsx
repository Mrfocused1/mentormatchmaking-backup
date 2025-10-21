'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function DeleteAccountArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Deleting Your Account</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Permanently delete your account and all associated data. This action cannot be undone. Please read carefully before proceeding.
        </p>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <h4 className="text-lg font-bold font-montserrat text-red-900 mb-2">Warning: Permanent Action</h4>
        <p className="text-sm text-red-800 font-montserrat mb-2">
          Account deletion is permanent and cannot be reversed. Consider deactivation if you might want to return.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What Gets Deleted</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Your profile and all personal information</li>
          <li>All messages and conversations</li>
          <li>Session history and recordings</li>
          <li>Connections and relationships</li>
          <li>Skills, endorsements, and reviews</li>
          <li>Saved preferences and settings</li>
          <li>Calendar integrations and data</li>
          <li>All uploaded files and documents</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What Remains</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Anonymized usage data (for analytics)</li>
          <li>Reviews you left (attributed to "Deleted User")</li>
          <li>Required legal/financial records (if applicable)</li>
          <li>Support tickets and communications</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Before You Delete</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Download your data (Settings → Privacy → Download Data)</li>
          <li>Export important conversations</li>
          <li>Notify important connections</li>
          <li>Withdraw any pending connection requests</li>
          <li>Consider deactivation as an alternative</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Delete Your Account</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Account → Delete Account</li>
          <li>Read all warnings carefully</li>
          <li>Select reason for deletion (helps us improve)</li>
          <li>Review what will be deleted</li>
          <li>Enter password to confirm</li>
          <li>Type "DELETE" in confirmation box</li>
          <li>Click "Permanently Delete My Account"</li>
          <li>Check email for final confirmation</li>
          <li>Click link in email to complete deletion</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">30-Day Grace Period</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          After initiating deletion:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Account immediately deactivated</li>
          <li>30-day waiting period before permanent deletion</li>
          <li>Can cancel deletion during this period</li>
          <li>After 30 days, deletion is final and cannot be reversed</li>
          <li>Email reminder sent at 7 days before final deletion</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Canceling Deletion</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Within the 30-day grace period:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Log in to your account</li>
          <li>Click "Cancel Account Deletion"</li>
          <li>Confirm you want to keep your account</li>
          <li>Account fully restored immediately</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">After Deletion</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Cannot log in or access platform</li>
          <li>Email address becomes available for new registration</li>
          <li>All connections permanently broken</li>
          <li>Cannot recover any data or information</li>
          <li>May create new account with same email after deletion</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Alternatives to Deletion</h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-blue-900 mb-1">Consider Instead:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 font-montserrat ml-4">
              <li><strong>Deactivate:</strong> Temporary pause, can reactivate anytime</li>
              <li><strong>Private Profile:</strong> Hide from search but keep data</li>
              <li><strong>Vacation Mode:</strong> Pause for specific period</li>
              <li><strong>Reduce Activity:</strong> Limit availability and notifications</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Data Portability Rights</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Download all your data before deletion</li>
          <li>Includes profile, messages, session history</li>
          <li>Receive data in JSON or CSV format</li>
          <li>Process takes 24-48 hours</li>
          <li>Download link valid for 7 days</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Need Help?</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Contact support before deleting: support@platform.com</li>
          <li>We may be able to address your concerns</li>
          <li>Chat with retention team about alternatives</li>
          <li>Get help with account issues</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Important Reminders</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Deletion is permanent after 30-day grace period</li>
          <li>Cannot recover data once deletion is complete</li>
          <li>Download data before deleting</li>
          <li>Consider deactivation as reversible alternative</li>
          <li>Notify important connections before deleting</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Deleting Your Account"
      category="Account Settings"
      description="Permanently delete your account and all data. Understand the process, what gets deleted, and your options."
      content={content}
      relatedArticles={[
        { title: 'Deactivating Your Account', href: '/help/deactivate-account' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Changing Your Password', href: '/help/change-password' }
      ]}
    />
  )
}
