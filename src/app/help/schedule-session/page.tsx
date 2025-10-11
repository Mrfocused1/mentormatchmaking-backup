'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function ScheduleSessionArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Schedule Your First Messaging Time!',
        description: 'This guide will walk you through the process of scheduling time to exchange messages. Let\'s get started!',
      }
    },
    {
      element: '#connection-profile',
      popover: {
        title: 'Navigate to Connection',
        description: 'Go to your connection\'s profile or open your conversation with them.',
        side: 'right' as const
      }
    },
    {
      element: '#schedule-button',
      popover: {
        title: 'Click Schedule Messaging Time',
        description: 'Click the "Schedule Time" or "Book Time" button to open the scheduler.',
        side: 'bottom' as const
      }
    },
    {
      element: '#calendar-picker',
      popover: {
        title: 'Select Date and Time',
        description: 'Choose an available date and time slot when you\'ll both be available to exchange messages.',
        side: 'left' as const
      }
    },
    {
      element: '#session-details',
      popover: {
        title: 'Add Communication Details',
        description: 'Enter a title, description, and any topics you want to discuss via messaging.',
        side: 'top' as const
      }
    },
    {
      popover: {
        title: 'Time Scheduled!',
        description: 'You\'ll both receive confirmation and reminders when it\'s time to start your conversation.',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Scheduling Made Simple</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Scheduling time to exchange messages with your mentor or mentee is straightforward with our integrated
          calendar system. Whether you're scheduling your first conversation or recurring communication times,
          this guide will help you coordinate availability, set expectations, and ensure both parties are prepared.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Choose Your Scheduling Method</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          There are several ways to schedule messaging time:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>From Profile:</strong> Visit their profile and click "Schedule Time"</li>
          <li><strong>From Messages:</strong> Use the calendar icon in your message thread</li>
          <li><strong>From Dashboard:</strong> Access via your connections dashboard</li>
          <li><strong>Via Booking Link:</strong> Use their shared availability link if provided</li>
          <li><strong>Time Request:</strong> Send a request through the platform</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: View Available Times</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          The scheduler will display their available time slots:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Green slots indicate full availability</li>
          <li>Yellow slots show limited availability</li>
          <li>Grayed-out slots are unavailable or booked</li>
          <li>Times are shown in your local timezone</li>
          <li>Hover over slots to see time in their timezone</li>
          <li>Use week/month view to see more options</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> If you don't see suitable times, you can send a message suggesting alternative times or ask them to expand their availability.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Select Date and Time</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Choose the perfect time slot:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click on your preferred date and time slot</li>
          <li>Confirm the timezone is correct for both parties</li>
          <li>Check the duration (30, 45, or 60 minutes typical)</li>
          <li>Adjust duration if needed and available</li>
          <li>The system checks for conflicts automatically</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Add Communication Details</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Provide important information for your scheduled conversation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Title:</strong> Brief, descriptive title (e.g., "Career Planning Discussion")</li>
          <li><strong>Description:</strong> What you want to discuss via messages</li>
          <li><strong>Topics:</strong> List topics or questions to address</li>
          <li><strong>Preparation Notes:</strong> Any materials to review beforehand</li>
          <li><strong>Goals:</strong> What you hope to accomplish during this messaging time</li>
        </ul>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Adding clear topics helps both parties prepare and makes your conversation more productive.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Set Reminders</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Configure when you want to be reminded:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>24 hours before (recommended for preparation)</li>
          <li>1 hour before (reminder to be available)</li>
          <li>15 minutes before (final reminder to start messaging)</li>
          <li>Custom reminder times available</li>
          <li>Choose email, SMS, or in-app notifications</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Review and Confirm</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Before finalizing:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Double-check the date and time in both timezones</li>
          <li>Review communication details and topics</li>
          <li>Confirm reminder settings</li>
          <li>Click "Schedule Time" or "Send Request"</li>
        </ol>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Important:</strong> If they require manual approval, your request will be pending until they confirm. Check your notifications for updates.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 7: Post-Scheduling Actions</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          After scheduling:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Both parties receive confirmation email</li>
          <li>Scheduled time appears in your dashboard calendar</li>
          <li>Calendar event added to connected calendars</li>
          <li>You'll receive a notification when it's time to start messaging</li>
          <li>You can add notes before the scheduled time</li>
          <li>Reschedule or cancel option remains available</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Recurring Communication Times</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          For ongoing mentorship, set up recurring messaging times:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Toggle "Make this recurring" when scheduling</li>
          <li>Choose frequency: weekly, bi-weekly, or monthly</li>
          <li>Set end date or number of occurrences</li>
          <li>Same time and day each period</li>
          <li>Modify or cancel individual times as needed</li>
          <li>End recurring series at any time</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Quick Scheduling Tips</h3>

        <div className="space-y-3">
          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Book in Advance</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Schedule at least 48 hours ahead when possible. This gives both parties time to prepare and reduces last-minute conflicts.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Consider Time Zones</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Always verify the time works for both parties. Use the timezone converter feature to avoid confusion.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Be Specific</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Clear titles and discussion topics help everyone prepare properly and get more value from your messaging time.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Stay Flexible</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Messaging allows for asynchronous communication, so you can exchange messages at your own pace during the scheduled time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Handling Scheduling Conflicts</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          If you encounter conflicts:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>No Available Times:</strong> Send a message requesting additional slots</li>
          <li><strong>Timezone Confusion:</strong> Use the built-in converter to clarify</li>
          <li><strong>Double Booking:</strong> Cancel one scheduled time promptly and notify the other party</li>
          <li><strong>Last-Minute Changes:</strong> Use the reschedule feature and communicate clearly</li>
          <li><strong>Availability Issues:</strong> Consider asynchronous messaging if synchronous time is difficult</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Scheduling Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Schedule your first messaging time within a week of connecting</li>
          <li>Allow 48-72 hours notice for best participation</li>
          <li>Always include clear discussion topics</li>
          <li>Set realistic time windows - 30-60 minutes is typical for focused messaging</li>
          <li>Start your conversation on the platform messaging system</li>
          <li>Confirm availability 24 hours before the scheduled time</li>
          <li>Keep your availability updated to avoid scheduling issues</li>
          <li>Respect their time - be responsive and prepared during scheduled messaging times</li>
          <li>Remember: If both parties agree, you can share external contact details to communicate outside the platform</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="How to Schedule Messaging Time"
      category="Communication & Scheduling"
      description="Learn how to schedule times to exchange messages with your mentor or mentee using our integrated calendar and scheduling tools."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Setting Up Your Availability', href: '/help/setup-availability' },
        { title: 'Starting a Conversation', href: '/help/join-session' },
        { title: 'Cancelling or Rescheduling', href: '/help/cancel-reschedule' },
        { title: 'Communication Best Practices', href: '/help/session-best-practices' }
      ]}
    />
  )
}
