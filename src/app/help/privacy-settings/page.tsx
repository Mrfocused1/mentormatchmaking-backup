'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function PrivacySettingsArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Privacy Settings</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Control how your data is used, who can see your information, and manage your privacy preferences across the platform. We're committed to protecting your privacy while enabling meaningful connections.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Accessing Privacy Settings</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click your profile icon</li>
          <li>Select "Settings"</li>
          <li>Navigate to "Privacy & Security"</li>
          <li>Customize each setting</li>
          <li>Changes save automatically</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Profile Privacy</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Profile Visibility:</strong> Public, connections only, or private</li>
          <li><strong>Search Visibility:</strong> Allow profile in search results</li>
          <li><strong>Photo Visibility:</strong> Who can see your profile photo</li>
          <li><strong>Contact Info:</strong> Control who sees email/phone</li>
          <li><strong>Activity Status:</strong> Show/hide online status</li>
          <li><strong>Profile Indexing:</strong> Allow search engines to index</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Data & Information</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Data Download:</strong> Request copy of your data</li>
          <li><strong>Data Deletion:</strong> Request account data deletion</li>
          <li><strong>Analytics:</strong> Opt out of usage analytics</li>
          <li><strong>Personalization:</strong> Control personalized recommendations</li>
          <li><strong>Third-Party:</strong> Manage third-party data sharing</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Communication Privacy</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Message Privacy:</strong> End-to-end encryption enabled</li>
          <li><strong>Read Receipts:</strong> Show/hide when you've read messages</li>
          <li><strong>Typing Indicators:</strong> Show when you're typing</li>
          <li><strong>Last Seen:</strong> Display last active time</li>
          <li><strong>Message Retention:</strong> How long to keep messages</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Session Privacy</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Session History:</strong> Control who sees past sessions</li>
          <li><strong>Recording Permissions:</strong> Allow/deny session recording</li>
          <li><strong>Calendar Integration:</strong> Manage calendar data sharing</li>
          <li><strong>Meeting Links:</strong> Who can access your meeting links</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Security Settings</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Two-Factor Authentication:</strong> Enable 2FA for extra security</li>
          <li><strong>Login Alerts:</strong> Notify on new device logins</li>
          <li><strong>Active Sessions:</strong> View and manage logged-in devices</li>
          <li><strong>Security Questions:</strong> Set up account recovery</li>
          <li><strong>Password Settings:</strong> Change password requirements</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Marketing & Communications</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Opt out of marketing emails</li>
          <li>Control newsletter subscriptions</li>
          <li>Manage promotional notifications</li>
          <li>Partner communications preferences</li>
          <li>Survey and feedback requests</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Data Rights (GDPR/CCPA)</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Right to Access:</strong> View all data we have</li>
          <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
          <li><strong>Right to Erasure:</strong> Request data deletion</li>
          <li><strong>Right to Portability:</strong> Export your data</li>
          <li><strong>Right to Object:</strong> Object to data processing</li>
        </ul>
      </div>

      <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Recommended Privacy Settings</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Enable two-factor authentication</li>
          <li>Set profile to "Connections Only" initially</li>
          <li>Disable search engine indexing</li>
          <li>Enable login alerts</li>
          <li>Review privacy settings monthly</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Privacy Settings"
      category="Safety & Privacy"
      description="Configure your privacy settings to control your data, visibility, and how you interact on the platform."
      content={content}
      relatedArticles={[
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Blocking Users', href: '/help/block-users' },
        { title: 'Deactivating Your Account', href: '/help/deactivate-account' }
      ]}
    />
  )
}
