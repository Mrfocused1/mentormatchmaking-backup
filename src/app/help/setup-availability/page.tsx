'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function SetupAvailabilityArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Set Up Your Availability!',
        description: 'This guide will help you configure your availability settings for seamless scheduling. Let\'s begin!',
      }
    },
    {
      element: '#settings-menu',
      popover: {
        title: 'Access Settings',
        description: 'Click on your profile icon and select "Settings" from the dropdown menu.',
        side: 'bottom' as const
      }
    },
    {
      element: '#availability-tab',
      popover: {
        title: 'Navigate to Availability',
        description: 'Click on the "Availability" tab in the settings menu.',
        side: 'right' as const
      }
    },
    {
      element: '#calendar-settings',
      popover: {
        title: 'Configure Your Schedule',
        description: 'Set your available days, times, and timezone preferences.',
        side: 'left' as const
      }
    },
    {
      popover: {
        title: 'All Set!',
        description: 'Your availability is now configured. Others can now book sessions during your available times!',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Managing Your Availability</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Setting up your availability is essential for efficient scheduling and helps potential mentors or
          mentees know when you're available to exchange messages. A well-configured availability schedule leads to more
          successful connections and better communication timing.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Access Availability Settings</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Navigate to your availability settings:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click on your profile icon in the top-right corner</li>
          <li>Select "Settings" from the dropdown menu</li>
          <li>Click on the "Availability" or "Schedule" tab</li>
          <li>Alternatively, access from your dashboard's quick settings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Set Your Timezone</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          First, configure your timezone to ensure accurate scheduling:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Select your current timezone from the dropdown</li>
          <li>The system will auto-detect but verify it's correct</li>
          <li>Update this setting when traveling to different time zones</li>
          <li>All scheduled messaging times will be displayed in your selected timezone</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> If you frequently work across time zones, consider adding a note in your profile about your flexibility.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Configure Weekly Schedule</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Set up your standard weekly availability for message exchanges:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Select Days:</strong> Choose which days you're available to exchange messages</li>
          <li><strong>Set Time Blocks:</strong> Add available time slots for each day when you'll be responsive</li>
          <li><strong>Add Multiple Blocks:</strong> Create separate morning/afternoon/evening slots</li>
          <li><strong>Response Times:</strong> Set expectations for how quickly you'll respond to messages</li>
          <li><strong>Copy Days:</strong> Duplicate settings across similar days for efficiency</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Set Messaging Preferences</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Configure your messaging-specific preferences:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Response Time:</strong> Set expectations for how quickly you'll respond (within hours, same day, 24-48 hours)</li>
          <li><strong>Messaging Windows:</strong> Specify preferred times for exchanging messages</li>
          <li><strong>Advance Notice:</strong> How far in advance should scheduled message exchanges be arranged?</li>
          <li><strong>Rolling Availability:</strong> How many weeks ahead to show availability (2-8 weeks typical)</li>
          <li><strong>Daily Message Limit:</strong> Set a comfortable limit for message exchanges per day</li>
          <li><strong>Weekly Message Limit:</strong> Set an overall weekly cap to maintain work-life balance</li>
        </ul>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Start with conservative availability and increase as you get comfortable. It's easier to add messaging time than to reduce commitments.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Block Out Unavailable Times</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Mark specific dates or times when you're unavailable:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Vacation Mode:</strong> Block out entire date ranges for time off</li>
          <li><strong>One-Time Blocks:</strong> Mark specific days as unavailable</li>
          <li><strong>Recurring Blocks:</strong> Set up weekly recurring unavailable times</li>
          <li><strong>Emergency Override:</strong> Quickly mark yourself unavailable when needed</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Connect Calendar Integration</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Sync with external calendars to manage your messaging availability:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Connect Google Calendar, Outlook, or Apple Calendar</li>
          <li>Platform will automatically check for conflicts with your schedule</li>
          <li>Busy times are automatically blocked from your messaging availability</li>
          <li>Scheduled message exchange times are added to your connected calendar</li>
          <li>Updates and changes sync automatically</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Privacy Note:</strong> We only check for conflicts, not event details. Your calendar data remains private.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 7: Set Messaging Preferences</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Configure who can schedule messaging times with you:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Auto:</strong> Allow instant scheduling without confirmation</li>
          <li><strong>Manual Approval:</strong> Review and approve each messaging request</li>
          <li><strong>Connections Only:</strong> Restrict to established connections</li>
          <li><strong>Public Scheduling:</strong> Allow anyone to request messaging times</li>
          <li><strong>Scheduling Link:</strong> Generate a shareable link for arranging message exchanges</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Best Practices for Availability</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Be Realistic</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Don't overcommit. Consider your energy levels, other commitments, and preparation time needed.
              Quality mentorship requires mental presence and energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Stay Consistent</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Regular, predictable availability makes it easier for others to schedule and builds reliability.
              Try to maintain the same weekly pattern.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Update Regularly</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Review and update your availability weekly. Mark time off in advance, and adjust for seasonal
              changes in your schedule.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Communicate Changes</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              If your availability changes significantly, notify your regular connections in advance.
              This shows respect for their time and planning.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Recommended Availability Settings</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For New Mentors:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Start with 2-4 hours per week for message exchanges, spread across 2-3 days. Set response time to 24-48 hours. Manual approval recommended until you establish a routine.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Active Mentors:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              4-8 hours per week for messaging, 3-4 days. Mix of morning and afternoon availability. Faster response times (same day). Auto-approve for established connections.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Mentees:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Offer flexible messaging availability, 5-10 hours across multiple days. Show you're committed and responsive. Daily check-ins demonstrate engagement.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">For Casual Users:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              1-2 hours per week for messaging, one consistent day. 48-hour response time. Manual approval. Perfect for exploring mentorship at your pace.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Troubleshooting Common Issues</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Timezone Issues:</strong> Verify your timezone setting matches your location</li>
          <li><strong>Schedule Conflicts:</strong> Ensure calendar integration is connected and syncing</li>
          <li><strong>No Messaging Requests:</strong> Check that your availability is visible and you have enough time slots</li>
          <li><strong>Too Many Requests:</strong> Reduce available messaging slots or switch to manual approval</li>
          <li><strong>Calendar Not Syncing:</strong> Disconnect and reconnect your calendar integration</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Setting Up Your Availability"
      category="Getting Started"
      description="Configure your availability settings to enable seamless scheduling and maximize your mentorship opportunities."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'How to Schedule a Session', href: '/help/schedule-session' },
        { title: 'Cancelling or Rescheduling', href: '/help/cancel-reschedule' },
        { title: 'Editing Your Profile', href: '/help/edit-profile' },
        { title: 'Notification Settings', href: '/help/notification-settings' }
      ]}
    />
  )
}
