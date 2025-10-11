'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function CancelRescheduleArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Managing Schedule Changes',
        description: 'Learn how to reschedule or cancel messaging times professionally. Let\'s get started!',
      }
    },
    {
      element: '#sessions-list',
      popover: {
        title: 'Find Your Scheduled Time',
        description: 'Navigate to your schedule to see all upcoming messaging times.',
        side: 'right' as const
      }
    },
    {
      element: '#session-options',
      popover: {
        title: 'Access Options Menu',
        description: 'Click the three-dot menu on the scheduled time card to see available actions.',
        side: 'bottom' as const
      }
    },
    {
      element: '#reschedule-option',
      popover: {
        title: 'Choose Action',
        description: 'Select either "Reschedule" to propose a new time or "Cancel" to remove the scheduled time.',
        side: 'left' as const
      }
    },
    {
      popover: {
        title: 'Done!',
        description: 'The other participant will be notified of the change automatically.',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Managing Schedule Changes</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Life happens, and sometimes you need to reschedule or cancel a messaging time. This guide will help you
          handle these situations professionally while maintaining good relationships with your mentoring
          connections. Learn when and how to make changes, and how to communicate effectively.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">When to Reschedule vs Cancel</h3>

        <div className="space-y-3 mb-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm font-semibold font-montserrat text-green-900 mb-1">Reschedule When:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800 font-montserrat ml-4">
              <li>You want to continue but need a different time</li>
              <li>There's a scheduling conflict you can work around</li>
              <li>You're committed to the mentorship relationship</li>
              <li>The other person is flexible with timing</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Cancel When:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
              <li>You cannot commit to any alternative time soon</li>
              <li>There's an emergency or urgent situation</li>
              <li>The relationship isn't a good fit</li>
              <li>You need to take a break from mentoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Reschedule a Messaging Time</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">Follow these steps to reschedule:</p>

        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4 mb-4">
          <li>Navigate to your dashboard or calendar</li>
          <li>Find the scheduled time you need to reschedule</li>
          <li>Click the three-dot menu on the scheduled time card</li>
          <li>Select "Reschedule Time"</li>
          <li>Choose a new date and time from available slots</li>
          <li>Add a brief explanation for the change</li>
          <li>Click "Send Reschedule Request"</li>
        </ol>

        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Provide at least 24-48 hours notice when rescheduling. This shows respect for the other person's time.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Cancel a Scheduled Time</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">To cancel a scheduled time:</p>

        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4 mb-4">
          <li>Go to your upcoming scheduled times</li>
          <li>Locate the time you want to cancel</li>
          <li>Click the options menu (three dots)</li>
          <li>Select "Cancel Scheduled Time"</li>
          <li>Choose a cancellation reason from the dropdown</li>
          <li>Write a personalized message explaining why</li>
          <li>Confirm the cancellation</li>
        </ol>

        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Important:</strong> Frequent cancellations can affect your reputation score. Always provide adequate notice and explanation.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Cancellation Notice Guidelines</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">More than 48 hours notice:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Ideal timeframe. No penalties. Easy to reschedule. Shows professionalism.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">24-48 hours notice:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Acceptable with good reason. Provide detailed explanation. Offer specific alternative times.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Less than 24 hours notice:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Should be for emergencies only. May impact your reliability score. Send sincere apology.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Last-minute or no-show:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Serious impact on reputation. Account warnings possible. Contact support if it's an emergency.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Writing Effective Cancellation Messages</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">Your message should include:</p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Prompt Notice:</strong> Inform as soon as you know you can't make it</li>
          <li><strong>Sincere Apology:</strong> Acknowledge the inconvenience caused</li>
          <li><strong>Brief Reason:</strong> Explain why without oversharing</li>
          <li><strong>Alternative Options:</strong> Suggest new times (for reschedules)</li>
          <li><strong>Appreciation:</strong> Thank them for understanding</li>
          <li><strong>Commitment:</strong> Reaffirm your interest in continuing (if applicable)</li>
        </ul>

        <div className="mt-4 space-y-3">
          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">Good Reschedule Example:</p>
            <p className="text-sm text-neutral-700 font-montserrat italic">
              "Hi Sarah, I apologize for the short notice, but I need to reschedule our Thursday messaging time. An urgent
              work commitment just came up for that time. I'm still very interested in our conversation about
              product strategy. Could we message on Friday at 2pm or Monday at 10am instead? Thanks for understanding!"
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">Good Cancellation Example:</p>
            <p className="text-sm text-neutral-700 font-montserrat italic">
              "Hi Michael, I sincerely apologize, but I need to cancel our scheduled time next week. I've had a family
              emergency that requires my immediate attention. I value our mentorship and would like to reconnect
              once things settle down. I'll reach out in about two weeks to reschedule. Thank you for your
              understanding during this difficult time."
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Responding to Reschedule Requests</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">When someone asks to reschedule your messaging time:</p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Respond promptly (within 24 hours)</li>
          <li>Be understanding and flexible when possible</li>
          <li>Check your availability for their proposed times</li>
          <li>Suggest alternatives if their options don't work</li>
          <li>Confirm the new time clearly to avoid confusion</li>
          <li>Update your calendar immediately</li>
        </ul>

        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Being gracious about reschedules builds trust and shows you value the relationship over rigid schedules.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Handling Repeated Cancellations</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">If you or your connection repeatedly cancels:</p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>After 2 cancellations:</strong> Discuss scheduling challenges openly</li>
          <li><strong>After 3 cancellations:</strong> Re-evaluate the relationship fit</li>
          <li><strong>Consider:</strong> Different communication frequency or asynchronous messaging</li>
          <li><strong>Be honest:</strong> If it's not working, it's okay to part ways respectfully</li>
          <li><strong>Platform action:</strong> Excessive cancellations may result in account warnings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Emergency Situations</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">For genuine emergencies:</p>

        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Cancel the scheduled time immediately via the platform</li>
          <li>Send a brief message explaining it's an emergency</li>
          <li>Follow up when possible with more details</li>
          <li>Contact platform support if needed</li>
          <li>Don't worry about your reputation score - we understand emergencies happen</li>
        </ol>

        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Note:</strong> Emergency cancellations with valid reasons won't negatively impact your account standing.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Recurring Schedule Changes</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">For recurring messaging times:</p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Cancel Single Time:</strong> Affects only one occurrence</li>
          <li><strong>Cancel Remaining:</strong> Cancels current and all future scheduled times</li>
          <li><strong>Modify Series:</strong> Change time for all future occurrences</li>
          <li><strong>Pause Series:</strong> Temporarily stop scheduled times with option to resume</li>
          <li>Always communicate changes clearly to avoid confusion</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Platform Policies</h3>

        <div className="space-y-3">
          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Cancellation Limits</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              More than 3 cancellations in a month may trigger a review. Habitual cancellations can result in
              account restrictions or suspension.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">No-Show Policy</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Missing a scheduled time without notice is considered a no-show. Three no-shows result in account review
              and potential restrictions.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Reputation Impact</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Your cancellation rate is visible on your profile. Maintain above 85% attendance for best matching
              opportunities.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Alternative Solutions</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">Before canceling, consider these options:</p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Shorten Time:</strong> Reduce from 60 to 30 minutes of messaging</li>
          <li><strong>Switch to Asynchronous:</strong> Exchange messages at different times instead of real-time</li>
          <li><strong>Brief Check-in:</strong> Have a shorter conversation rather than canceling completely</li>
          <li><strong>Postpone Topics:</strong> Address urgent items now and save deeper discussions for later</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Best Practices Summary</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Provide maximum notice possible (48+ hours ideal)</li>
          <li>Always include a sincere apology and brief reason</li>
          <li>Offer specific alternative times when rescheduling</li>
          <li>Respond promptly to reschedule requests from others</li>
          <li>Be understanding when others need to cancel</li>
          <li>Keep cancellation rate below 15% for optimal reputation</li>
          <li>Use platform messaging for all cancellation communication</li>
          <li>Update your availability to prevent future conflicts</li>
          <li>Follow up to reschedule within a reasonable timeframe</li>
          <li>Contact support for questions or issues</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Cancelling or Rescheduling"
      category="Communication & Scheduling"
      description="Learn how to professionally reschedule or cancel scheduled messaging times while maintaining strong relationships."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'How to Schedule Messaging Time', href: '/help/schedule-session' },
        { title: 'Communication Best Practices', href: '/help/session-best-practices' },
        { title: 'Setting Up Your Availability', href: '/help/setup-availability' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' }
      ]}
    />
  )
}
