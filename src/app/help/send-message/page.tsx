'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function SendMessageArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Send Your First Message!',
        description: 'Learn how to send effective messages to mentors and mentees. Let\'s get started!',
      }
    },
    {
      element: '#messages-tab',
      popover: {
        title: 'Access Messages',
        description: 'Click on the Messages icon in the navigation or from a user\'s profile.',
        side: 'bottom' as const
      }
    },
    {
      element: '#new-message-button',
      popover: {
        title: 'Start New Conversation',
        description: 'Click "New Message" or the message button on someone\'s profile.',
        side: 'right' as const
      }
    },
    {
      element: '#message-composer',
      popover: {
        title: 'Compose Your Message',
        description: 'Write a personalized, thoughtful message introducing yourself and your goals.',
        side: 'left' as const
      }
    },
    {
      element: '#send-button',
      popover: {
        title: 'Send Message',
        description: 'Review your message and click Send. The recipient will be notified immediately!',
        side: 'top' as const
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Effective Messaging</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Your first message sets the tone for your mentorship relationship. Whether you're reaching out to a
          potential mentor or responding to a mentee, crafting thoughtful, professional messages is essential
          for making strong connections and building lasting relationships.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Access the Messaging System</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          There are several ways to send a message:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>From Profile:</strong> Click "Send Message" on anyone's profile page</li>
          <li><strong>From Search:</strong> Use the message icon on search result cards</li>
          <li><strong>From Messages Tab:</strong> Click the messages icon and select "New Message"</li>
          <li><strong>From Dashboard:</strong> Access quick messaging from your home dashboard</li>
          <li><strong>From Matches:</strong> Message your AI-recommended matches directly</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Choose Your Recipient</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When selecting who to message:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Review their profile thoroughly before messaging</li>
          <li>Ensure they match your goals and interests</li>
          <li>Check their availability and preferences</li>
          <li>Look for common ground or shared interests</li>
          <li>Verify they're accepting new connections</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Quality over quantity - send 3-5 thoughtful messages rather than 20 generic ones.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Craft Your Message</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          A great first message includes these key elements:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Personal Greeting:</strong> Use their name (e.g., "Hi Sarah,")</li>
          <li><strong>How You Found Them:</strong> Explain your connection (search, recommendation, etc.)</li>
          <li><strong>Specific Interest:</strong> Mention something specific from their profile</li>
          <li><strong>Your Background:</strong> Brief introduction (2-3 sentences)</li>
          <li><strong>Your Goals:</strong> What you hope to learn or offer</li>
          <li><strong>Clear Ask:</strong> Specific next step (call, meeting, question)</li>
          <li><strong>Professional Close:</strong> Thank them and sign off properly</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Message Templates & Examples</h3>

        <div className="space-y-4">
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">For Mentees (Seeking Guidance):</p>
            <p className="text-sm text-neutral-700 font-montserrat italic mb-2">
              "Hi Dr. Johnson,
              <br /><br />
              I came across your profile while searching for data science mentors and was impressed by your work
              in machine learning at TechCorp. I'm currently a junior data analyst looking to transition into
              an ML engineering role.
              <br /><br />
              I noticed you made a similar transition earlier in your career. I'd love to learn about your
              journey and get advice on skills I should prioritize. Would you be open to a 20-minute introductory
              call next week?
              <br /><br />
              Thank you for considering!
              <br />
              Best regards,
              <br />
              Alex"
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">For Mentors (Offering Help):</p>
            <p className="text-sm text-neutral-700 font-montserrat italic mb-2">
              "Hi Maria,
              <br /><br />
              I saw that you're looking for guidance in UX design and noticed you have a great background in
              graphic design. I've been a UX lead for 10 years and made the transition from graphic design
              myself, so I understand the challenges you're facing.
              <br /><br />
              I'd be happy to share insights about portfolio building, skill development, and breaking into
              the UX field. Would you like to schedule a chat to discuss your goals?
              <br /><br />
              Looking forward to connecting!
              <br />
              Rachel"
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-2">Follow-Up Message:</p>
            <p className="text-sm text-neutral-700 font-montserrat italic mb-2">
              "Hi James,
              <br /><br />
              I wanted to follow up on my message from last week about career coaching in product management.
              I understand you're busy, but I'm still very interested in learning from your experience.
              <br /><br />
              If now isn't a good time, I'd be happy to connect in a few weeks when your schedule opens up.
              <br /><br />
              Thanks again!
              <br />
              Sam"
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Add Attachments (Optional)</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          You can enhance your message with attachments:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Resume/CV:</strong> Share your background (keep it updated)</li>
          <li><strong>Portfolio:</strong> Link to your work samples</li>
          <li><strong>Articles:</strong> Relevant content you've written or found</li>
          <li><strong>Questions Doc:</strong> Prepared list of questions for reference</li>
          <li>Maximum file size: 10MB per attachment</li>
          <li>Supported formats: PDF, DOC, DOCX, JPG, PNG</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Note:</strong> Don't send attachments in your very first message unless specifically requested. Wait until they respond.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Use Message Features</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Enhance your messages with these features:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Formatting:</strong> Use bold, italics, and lists for clarity</li>
          <li><strong>Emojis:</strong> Add sparingly for warmth (professional context only)</li>
          <li><strong>Links:</strong> Share relevant articles or resources</li>
          <li><strong>Mentions:</strong> Tag others in group conversations</li>
          <li><strong>Scheduling:</strong> Propose meeting times directly in messages</li>
          <li><strong>Voice Messages:</strong> Send short audio clips (30 seconds max for first contact)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Review and Send</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Before hitting send:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Proofread for spelling and grammar errors</li>
          <li>Verify their name is spelled correctly</li>
          <li>Ensure tone is professional yet friendly</li>
          <li>Check that you've included all key elements</li>
          <li>Confirm message length is appropriate (150-300 words ideal)</li>
          <li>Click "Send Message"</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Message Best Practices</h3>

        <div className="space-y-3">
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-green-900 mb-1">DO:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800 font-montserrat ml-4">
              <li>Personalize each message based on their profile</li>
              <li>Be specific about what caught your attention</li>
              <li>Keep it concise but informative</li>
              <li>Propose concrete next steps</li>
              <li>Express genuine interest and enthusiasm</li>
              <li>Use proper grammar and punctuation</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">DON'T:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
              <li>Send generic copy-paste messages</li>
              <li>Write overly long messages (500+ words)</li>
              <li>Use overly casual language or slang</li>
              <li>Make demands or set expectations</li>
              <li>Share too much personal information initially</li>
              <li>Use all caps or excessive punctuation!!!</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Response Expectations</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          After sending your message:
        </p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Response Time:</strong> Most users reply within 24-48 hours</li>
          <li><strong>Notifications:</strong> You'll be notified when they read and respond</li>
          <li><strong>Follow-Up:</strong> If no response after 5-7 days, send one polite follow-up</li>
          <li><strong>No Response:</strong> After 2 messages with no reply, move on respectfully</li>
          <li><strong>Read Receipts:</strong> You can see when your message has been read</li>
        </ul>

        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Don't take non-responses personally. People get busy, and it's not always about you.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Message Etiquette</h3>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Timing:</strong> Send during business hours in their timezone</li>
          <li><strong>Frequency:</strong> Don't send multiple messages without a response</li>
          <li><strong>Respect:</strong> Honor their communication preferences</li>
          <li><strong>Privacy:</strong> Keep conversations on-platform initially</li>
          <li><strong>Boundaries:</strong> Don't pressure for immediate responses</li>
          <li><strong>Professional:</strong> Maintain professionalism even in casual chats</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Handling Different Response Types</h3>

        <div className="space-y-3">
          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Positive Response:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Express appreciation, propose specific next steps, and move quickly to schedule a meeting or call.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Questions/Clarifications:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Answer promptly and thoroughly. Provide additional context about your goals and expectations.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Not Available Now:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Thank them, ask when might be better, and follow up at the suggested time.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Decline:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Thank them for their time, wish them well, and move on to other potential matches.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Messaging Tips for Success</h3>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Send messages when you can respond to replies promptly</li>
          <li>Save successful message templates for reference (but always personalize)</li>
          <li>Track your response rates to improve your approach</li>
          <li>A/B test different message styles to see what works</li>
          <li>Ask for feedback if you're getting low response rates</li>
          <li>Be patient - building relationships takes time</li>
          <li>Stay authentic - don't try to be someone you're not</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">First Message Checklist</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Personalized greeting with their name</li>
          <li>Specific reference to their profile or work</li>
          <li>Clear, concise introduction of yourself</li>
          <li>Statement of your goals or what you offer</li>
          <li>Concrete ask or next step proposal</li>
          <li>Professional yet warm tone</li>
          <li>150-300 word length</li>
          <li>Proofread for errors</li>
          <li>Appropriate timing (business hours)</li>
          <li>Follow-up plan if no response</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Sending Your First Message"
      category="Messaging & Communication"
      description="Learn how to craft effective first messages that get responses and start meaningful mentorship connections."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Making Your First Connection', href: '/help/first-connection' },
        { title: 'Managing Your Conversations', href: '/help/manage-conversations' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' },
        { title: 'Finding the Right Mentor or Mentee', href: '/help/finding-mentor-or-mentee' }
      ]}
    />
  )
}
