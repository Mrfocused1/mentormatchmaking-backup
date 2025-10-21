'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function StartConversationArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Start Your Conversation!',
        description: 'This guide will help you begin messaging with your mentor or mentee. Let\'s begin!',
      }
    },
    {
      element: '#upcoming-sessions',
      popover: {
        title: 'Find Your Scheduled Time',
        description: 'Navigate to your dashboard to see upcoming scheduled messaging times.',
        side: 'right' as const
      }
    },
    {
      element: '#session-card',
      popover: {
        title: 'Communication Details',
        description: 'Click on the scheduled time card to view details and access the messaging thread.',
        side: 'bottom' as const
      }
    },
    {
      element: '#join-button',
      popover: {
        title: 'Open Conversation',
        description: 'Click "Start Conversation" when it\'s time. You can begin messaging at the scheduled time.',
        side: 'top' as const
      }
    },
    {
      popover: {
        title: 'You\'re All Set!',
        description: 'You\'re now ready to have a productive conversation via messaging. Good luck!',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Starting Your Conversation</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Text messaging is how you connect with mentors and mentees on our platform. This guide
          covers everything you need to know about starting conversations, using the messaging features,
          and making the most of your scheduled communication time.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Before Your Scheduled Time</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Prepare in advance for the best experience:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>24 Hours Before:</strong> Review discussion topics and prepare questions</li>
          <li><strong>1 Hour Before:</strong> Gather any materials or information you want to share</li>
          <li><strong>15 Minutes Before:</strong> Be ready to start messaging at the scheduled time</li>
          <li><strong>At Scheduled Time:</strong> Open the messaging thread and begin your conversation</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Being ready to respond at the scheduled time shows professionalism and helps maintain conversation flow.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Access Your Conversation</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          There are multiple ways to start messaging:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Dashboard:</strong> Click "Start Conversation" on upcoming scheduled time card</li>
          <li><strong>Calendar:</strong> Access from your integrated calendar</li>
          <li><strong>Email Reminder:</strong> Click message link in reminder email</li>
          <li><strong>SMS Reminder:</strong> Tap link in text message</li>
          <li><strong>Direct Access:</strong> Navigate to Messages and find your connection</li>
          <li><strong>Mobile App:</strong> Tap notification to open conversation instantly</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Starting the Conversation</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When you're ready to begin:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Open the messaging thread with your mentor/mentee</li>
          <li>Send a friendly greeting to start the conversation</li>
          <li>Reference the scheduled topics or agenda</li>
          <li>Ask your first question or share your initial thoughts</li>
          <li>Wait for their response and continue the dialogue</li>
        </ol>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Start with context about what you'd like to discuss to make the conversation more focused and productive.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Using Messaging Features</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Familiarize yourself with available messaging features:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Text Messages:</strong> Send and receive text messages in real-time</li>
          <li><strong>Formatting:</strong> Use basic text formatting to emphasize points</li>
          <li><strong>File Sharing:</strong> Share documents, images, or other relevant files</li>
          <li><strong>Links:</strong> Share helpful resources and articles</li>
          <li><strong>Message History:</strong> Review past conversations for context</li>
          <li><strong>Notifications:</strong> Receive alerts when you get new messages</li>
          <li><strong>Read Receipts:</strong> See when messages have been read</li>
          <li><strong>Typing Indicators:</strong> Know when the other person is composing a message</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Messaging Etiquette</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Follow these best practices during your conversation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Be responsive during scheduled messaging times</li>
          <li>Write clear, concise messages that are easy to understand</li>
          <li>Use proper grammar and punctuation for professional communication</li>
          <li>Break long thoughts into multiple messages for easier reading</li>
          <li>Give the other person time to read and respond thoughtfully</li>
          <li>Stay on topic and reference your discussion agenda</li>
          <li>Be respectful and professional in all communications</li>
          <li>Acknowledge messages even if you need time to provide a full response</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Ending the Conversation</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When your scheduled time is complete:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Summarize key takeaways and action items</li>
          <li>Schedule next messaging time if continuing the relationship</li>
          <li>Thank the other person for their time and insights</li>
          <li>Let them know you're signing off for now</li>
          <li>Complete any post-conversation feedback if requested</li>
          <li>Add notes for future reference</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Communication Tips</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Be Clear and Specific</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Avoid vague questions. Instead of "How do I do better?", ask "What specific skills should I develop to advance to a senior role?"
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Provide Context</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Share relevant background information so your mentor/mentee can give more targeted advice and support.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Use Thoughtful Pacing</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Don't rush through topics. Give time for thoughtful responses. Messaging allows for reflection between exchanges.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-montserrat text-primary-dark mb-2">Save Important Information</h4>
            <p className="text-sm text-neutral-700 font-montserrat">
              Take notes or save key messages for future reference. You can review message history anytime.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Asynchronous vs Synchronous Messaging</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Synchronous (Real-time):</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Both parties are online at the same time, exchanging messages back and forth quickly. Best for scheduled messaging times where both have agreed to be available.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Asynchronous (Delayed):</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Messages are sent and read at different times. Allows for thoughtful responses and works well across different time zones. The conversation may span several hours or days.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Hybrid Approach:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Start with real-time messaging during scheduled times, then continue asynchronously for follow-up questions and updates between sessions.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Mobile Messaging Considerations</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When messaging from mobile:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Enable push notifications so you don't miss messages</li>
          <li>Use WiFi or good cellular data for reliable messaging</li>
          <li>Keep messages concise and scannable on small screens</li>
          <li>Review longer messages before sending</li>
          <li>Use voice- carefully - always proofread</li>
          <li>Access message history to review previous conversations</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Connecting Outside the Platform</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Users can choose to communicate outside the platform:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Build Trust First:</strong> Start on the platform to establish rapport</li>
          <li><strong>Mutual Agreement:</strong> Both parties must agree to exchange contact details</li>
          <li><strong>Share Privately:</strong> Exchange phone numbers, email, or other contact info via platform messages</li>
          <li><strong>Stay Safe:</strong> Only share contact details when you're comfortable</li>
          <li><strong>Platform Benefits:</strong> Remember that platform messaging keeps all communications documented</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Important:</strong> Sharing contact details is entirely optional and at your discretion. You can maintain a successful mentorship relationship entirely through platform messaging.
          </p>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Messaging Best Practices Checklist</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Be available and responsive during scheduled messaging times</li>
          <li>Start conversations with a clear purpose or question</li>
          <li>Write professional, well-structured messages</li>
          <li>Respect response time - allow for thoughtful replies</li>
          <li>Stay focused on your discussion topics</li>
          <li>Share relevant resources and links</li>
          <li>Save important information from conversations</li>
          <li>End conversations with clear next steps</li>
          <li>Maintain regular communication between scheduled times if needed</li>
          <li>Keep all communication respectful and professional</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Starting a Conversation"
      category="Communication & Scheduling"
      description="Complete guide to starting and maintaining conversations with your mentor or mentee through text messaging."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'How to Schedule Messaging Time', href: '/help/schedule-session' },
        { title: 'Communication Best Practices', href: '/help/session-best-practices' },
        { title: 'Cancelling or Rescheduling', href: '/help/cancel-reschedule' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' }
      ]}
    />
  )
}
