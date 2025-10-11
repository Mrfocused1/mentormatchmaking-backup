'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function NotificationSettingsArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Configure Notifications!',
        description: 'Customize how and when you receive notifications to stay informed without being overwhelmed.',
      }
    },
    {
      element: '#settings-menu',
      popover: {
        title: 'Access Settings',
        description: 'Click your profile icon and select "Settings" from the menu.',
        side: 'bottom' as const
      }
    },
    {
      element: '#notifications-tab',
      popover: {
        title: 'Notifications Tab',
        description: 'Navigate to the "Notifications" section to see all available options.',
        side: 'right' as const
      }
    },
    {
      element: '#notification-preferences',
      popover: {
        title: 'Customize Preferences',
        description: 'Toggle different notification types and choose your preferred delivery methods.',
        side: 'left' as const
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Customizing Your Notifications</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Stay informed about important mentorship activities without feeling overwhelmed. This guide helps you
          configure notification settings to receive the right information at the right time through your
          preferred channels.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Accessing Notification Settings</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Navigate to your notification preferences:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click on your profile icon in the top-right corner</li>
          <li>Select "Settings" from the dropdown menu</li>
          <li>Click on the "Notifications" tab</li>
          <li>Alternatively, use the quick settings panel from your dashboard</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Notification Channels</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Choose how you want to receive notifications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>In-App:</strong> Notifications within the platform (always enabled)</li>
          <li><strong>Email:</strong> Sent to your registered email address</li>
          <li><strong>SMS/Text:</strong> Text messages to your phone (requires verification)</li>
          <li><strong>Push Notifications:</strong> Browser or mobile app alerts</li>
          <li><strong>Desktop:</strong> System notifications on your computer</li>
          <li><strong>Digest:</strong> Summary emails (daily or weekly)</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Enable multiple channels for important notifications and use digest for less urgent updates.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Notification Types</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Messages & Communication:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>New message received</li>
          <li>Message read receipts</li>
          <li>Connection requests</li>
          <li>Reply to your message</li>
          <li>Mentions in group conversations</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Sessions & Scheduling:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Session booking requests</li>
          <li>Session confirmations</li>
          <li>24-hour session reminders</li>
          <li>1-hour session reminders</li>
          <li>15-minute session reminders</li>
          <li>Session cancellations or reschedules</li>
          <li>Missed session notifications</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Matches & Connections:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>New AI-suggested matches</li>
          <li>Profile views</li>
          <li>Someone saved your profile</li>
          <li>Match recommendations</li>
          <li>Connection milestones</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Activity & Updates:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Profile completion reminders</li>
          <li>Availability updates needed</li>
          <li>New platform features</li>
          <li>Community events</li>
          <li>Tips and best practices</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Account & Security:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Login from new device</li>
          <li>Password changes</li>
          <li>Account updates</li>
          <li>Security alerts</li>
          <li>Privacy settings changes</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Notification Frequency</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Control how often you receive notifications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Instant:</strong> Receive notifications immediately as events occur</li>
          <li><strong>Batched:</strong> Group notifications (every 15 min, 30 min, or hourly)</li>
          <li><strong>Daily Digest:</strong> One summary email per day</li>
          <li><strong>Weekly Digest:</strong> One summary email per week</li>
          <li><strong>Custom Schedule:</strong> Set specific times for notifications</li>
        </ul>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Use instant for urgent items (sessions, messages) and digest for informational updates (tips, matches).
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Quiet Hours</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Set times when you don't want to be disturbed:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Define your quiet hours (e.g., 10 PM - 7 AM)</li>
          <li>Notifications are paused but not lost</li>
          <li>Receive accumulated notifications after quiet hours end</li>
          <li>Emergency notifications can override quiet hours</li>
          <li>Set different schedules for weekdays and weekends</li>
          <li>Timezone-aware (updates when you travel)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Priority Notifications</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Ensure you never miss important updates:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>VIP Contacts:</strong> Always notify for messages from starred connections</li>
          <li><strong>Session Alerts:</strong> Never miss session reminders</li>
          <li><strong>Urgent Messages:</strong> Flagged as urgent by sender</li>
          <li><strong>Security Alerts:</strong> Always enabled for account safety</li>
          <li>Priority notifications override quiet hours and other filters</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Per-Conversation Notifications</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Customize notifications for individual conversations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Open any conversation</li>
          <li>Click the three-dot menu</li>
          <li>Select "Notification Settings"</li>
          <li>Choose: All messages, Mentions only, or Muted</li>
          <li>Set custom sounds for specific contacts</li>
          <li>Override global settings for important mentors</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Mobile App Notifications</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Configure notifications for the mobile app:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Enable push notifications in device settings</li>
          <li>Allow app to send critical alerts</li>
          <li>Choose notification sound and vibration</li>
          <li>Show/hide message previews on lock screen</li>
          <li>Badge app icon with unread count</li>
          <li>Sync settings across devices</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Privacy Note:</strong> Disable lock screen previews if others can see your phone.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Email Notification Settings</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Customize your email notifications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Format:</strong> Choose HTML or plain text</li>
          <li><strong>Frequency:</strong> Instant, batched, or digest</li>
          <li><strong>Content:</strong> Full message or summary only</li>
          <li><strong>Reply-to:</strong> Reply directly from email (pro feature)</li>
          <li><strong>Unsubscribe:</strong> Opt-out of specific email types</li>
          <li>Update email address in account settings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Recommended Settings</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Active Mentors:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat ml-4">
              <li>Instant: Session reminders, new session requests, urgent messages</li>
              <li>Batched (hourly): Regular messages, connection requests</li>
              <li>Daily digest: Platform updates, tips, new matches</li>
              <li>Quiet hours: 10 PM - 7 AM</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Active Mentees:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat ml-4">
              <li>Instant: Mentor replies, session confirmations</li>
              <li>Batched (30 min): New matches, profile views</li>
              <li>Daily digest: Community events, tips</li>
              <li>Quiet hours: Based on your schedule</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Casual Users:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat ml-4">
              <li>Instant: Direct messages only</li>
              <li>Weekly digest: Everything else</li>
              <li>Push notifications: Disabled</li>
              <li>Reduce notification volume for work-life balance</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Troubleshooting Notifications</h3>

        <div className="space-y-3">
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Not Receiving Notifications:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
              <li>Check notification settings are enabled</li>
              <li>Verify email address is correct</li>
              <li>Check spam/junk folder for emails</li>
              <li>Ensure browser/app permissions are granted</li>
              <li>Clear cache and reload the page</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-yellow-900 mb-1">Too Many Notifications:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 font-montserrat ml-4">
              <li>Switch to batched or digest mode</li>
              <li>Mute less important conversations</li>
              <li>Disable optional notification types</li>
              <li>Set up quiet hours</li>
              <li>Use priority notifications only</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-blue-900 mb-1">Delayed Notifications:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 font-montserrat ml-4">
              <li>Check if batched mode is enabled</li>
              <li>Verify internet connection is stable</li>
              <li>Update browser or mobile app</li>
              <li>Check device battery/power saving settings</li>
              <li>Contact support if issue persists</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Notification Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Review and adjust settings monthly based on your needs</li>
          <li>Use different channels for different priority levels</li>
          <li>Set quiet hours to maintain work-life balance</li>
          <li>Enable VIP notifications for key mentorship relationships</li>
          <li>Use digest mode for non-urgent updates</li>
          <li>Test notification settings after making changes</li>
          <li>Whitelist platform emails to avoid spam folder</li>
          <li>Sync settings across all your devices</li>
          <li>Don't disable security notifications</li>
          <li>Update contact preferences when traveling</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Notification Settings"
      category="Messaging & Communication"
      description="Configure your notification preferences to stay informed without being overwhelmed by alerts."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Managing Your Conversations', href: '/help/manage-conversations' },
        { title: 'Sending Your First Message', href: '/help/send-message' },
        { title: 'Email Preferences', href: '/help/email-preferences' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' }
      ]}
    />
  )
}
