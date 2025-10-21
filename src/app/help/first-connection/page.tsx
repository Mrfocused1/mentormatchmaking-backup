'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function FirstConnectionArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Making Your First Connection!',
        description: 'This guide will help you successfully reach out and establish your first mentorship connection. Let\'s get started!',
      }
    },
    {
      element: '#profile-card',
      popover: {
        title: 'Review Their Profile',
        description: 'Read through their full profile to understand their background, expertise, and mentorship style.',
        side: 'right' as const
      }
    },
    {
      element: '#message-button',
      popover: {
        title: 'Start a Conversation',
        description: 'Click the "Send Message" button to compose your introduction message.',
        side: 'bottom' as const
      }
    },
    {
      element: '#message-composer',
      popover: {
        title: 'Write a Personal Message',
        description: 'Craft a thoughtful, personalized message that shows you\'ve read their profile and explains your goals.',
        side: 'top' as const
      }
    },
    {
      popover: {
        title: 'You\'re Ready!',
        description: 'Send your message and wait for a response. Most users reply within 48 hours!',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Making a Great First Impression</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Your first connection is an exciting step in your mentorship journey. A thoughtful, well-crafted
          introduction can set the foundation for a valuable long-term relationship. This guide will help you
          reach out confidently and professionally.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Do Your Research</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Before reaching out, thoroughly review their profile:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Read their entire bio and professional background</li>
          <li>Review their skills, expertise, and interests</li>
          <li>Check their mentorship goals and preferences</li>
          <li>Look at their availability and messaging schedule preferences</li>
          <li>Read reviews or testimonials if available</li>
          <li>Check their social media profiles for additional context</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Take notes on specific aspects of their profile that resonate with you. You'll reference these in your message.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Craft Your Introduction Message</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Your first message should be clear, concise, and personalized. Include these elements:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Personal Greeting:</strong> Use their name</li>
          <li><strong>How You Found Them:</strong> Mention search criteria or recommendations</li>
          <li><strong>Specific Interest:</strong> Reference something from their profile</li>
          <li><strong>Your Background:</strong> Brief intro about yourself (2-3 sentences)</li>
          <li><strong>Your Goals:</strong> What you hope to learn or teach</li>
          <li><strong>The Ask:</strong> Propose a specific next step (scheduled messaging time to get acquainted)</li>
          <li><strong>Gratitude:</strong> Thank them for their time</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Example Introduction Messages</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg mb-4">
          <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">For Mentees:</p>
          <p className="text-sm text-neutral-700 font-montserrat italic">
            "Hi Sarah, I found your profile while searching for marketing mentors, and your experience in
            digital transformation really caught my attention. I'm currently transitioning from sales to
            marketing management and would love to learn from your journey at TechCorp. Would you be open
            to scheduling a time next week to exchange messages and get acquainted? I'd appreciate any guidance you could offer.
            Thank you for considering!"
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
          <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">For Mentors:</p>
          <p className="text-sm text-neutral-700 font-montserrat italic">
            "Hi Michael, I noticed you're looking to break into product management and saw you have a strong
            engineering background - that's exactly how I started my PM career 8 years ago! I'd be happy to
            share insights about making that transition through our platform messaging. Would you like to schedule a time to
            discuss your goals? Looking forward to connecting!"
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Send Your Message</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When you're ready to send:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Proofread for spelling and grammar errors</li>
          <li>Ensure tone is professional yet friendly</li>
          <li>Double-check you've included all key elements</li>
          <li>Keep it between 150-250 words</li>
          <li>Click "Send Message" or "Send Connection Request"</li>
        </ol>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Avoid These Common Mistakes:</strong> Generic templates, overly casual language,
            extremely long messages, demanding immediate responses, or focusing only on what you want.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Wait for a Response</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          After sending your message:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Most users respond within 24-48 hours</li>
          <li>Check your notifications regularly</li>
          <li>Be patient - they may need time to consider</li>
          <li>If no response after 5-7 days, you can send a polite follow-up</li>
          <li>Don't take non-responses personally - people get busy</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Respond Promptly to Replies</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When they respond positively:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Reply within 24 hours to show you're serious</li>
          <li>Express enthusiasm about the connection</li>
          <li>Propose specific times for your first scheduled messaging exchange</li>
          <li>All communication happens through platform text messaging only</li>
          <li>Confirm any logistics (time zone, preferred messaging schedule, etc.)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Prepare for Your First Messaging Exchange</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Once your first messaging time is scheduled:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Research any topics you want to discuss</li>
          <li>Prepare questions in advance (5-7 questions)</li>
          <li>Have a brief introduction ready about yourself</li>
          <li>Ensure you'll have dedicated time to focus on the conversation without distractions</li>
          <li>Be ready to respond thoughtfully and engage in the text-based conversation</li>
          <li>Log in a few minutes early to be ready when the scheduled time starts</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Handling Different Responses</h3>

        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm font-semibold font-montserrat text-green-900 mb-1">Positive Response:</p>
            <p className="text-sm text-green-800 font-montserrat">
              Great! Move quickly to schedule your first meeting. Show appreciation and enthusiasm.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm font-semibold font-montserrat text-yellow-900 mb-1">Uncertain Response:</p>
            <p className="text-sm text-yellow-800 font-montserrat">
              They might need more information. Clarify your goals and time commitment. Be flexible.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Decline or No Response:</p>
            <p className="text-sm text-red-800 font-montserrat">
              Don't be discouraged. Thank them for their time and move on to other potential matches.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">First Connection Success Tips</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Reach out to 3-5 potential matches to increase your chances</li>
          <li>Personalize each message - no copy-paste templates</li>
          <li>Show genuine interest in their work and experience</li>
          <li>Be clear about what you're offering or seeking</li>
          <li>Respect their time and availability constraints</li>
          <li>Follow platform communication guidelines</li>
          <li>Stay positive and professional, even if rejected</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Making Your First Connection"
      category="Getting Started"
      description="Learn how to reach out and establish your first meaningful mentorship connection."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Finding the Right Mentor or Mentee', href: '/help/finding-mentor-or-mentee' },
        { title: 'Sending Your First Message', href: '/help/send-message' },
        { title: 'How to Schedule a Session', href: '/help/schedule-session' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' }
      ]}
    />
  )
}
