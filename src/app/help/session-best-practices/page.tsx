'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function SessionBestPracticesArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Communication Best Practices!',
        description: 'Learn how to make your mentorship conversations productive and impactful. Let\'s begin!',
      }
    },
    {
      popover: {
        title: 'Prepare in Advance',
        description: 'Review discussion topics and prepare your questions 24 hours before your scheduled messaging time.',
      }
    },
    {
      popover: {
        title: 'Set Clear Goals',
        description: 'Start each conversation with specific objectives and desired outcomes.',
      }
    },
    {
      popover: {
        title: 'Take Action Notes',
        description: 'Document key insights and action items during the conversation for follow-through.',
      }
    },
    {
      popover: {
        title: 'Follow Up',
        description: 'Send a thank you message with your takeaways and next steps within 24 hours.',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Maximizing Communication Value</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Great mentorship conversations don't happen by accident - they require preparation, active participation,
          and thoughtful follow-through. This guide shares proven best practices for both mentors and mentees
          to ensure every conversation is productive, engaging, and drives real progress toward your goals.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Before Your Conversation: Preparation</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">For Mentees:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Define Your Goals:</strong> What do you want to accomplish in this conversation?</li>
          <li><strong>Prepare Questions:</strong> Write 5-7 specific questions in advance</li>
          <li><strong>Review Progress:</strong> Reflect on actions from previous conversation</li>
          <li><strong>Gather Materials:</strong> Collect any work samples, documents, or links to share</li>
          <li><strong>Set Context:</strong> Prepare to brief your mentor on recent developments or challenges</li>
          <li><strong>Be Specific:</strong> Replace vague topics with concrete discussion points</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">For Mentors:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Review History:</strong> Read message history from previous conversations</li>
          <li><strong>Check Progress:</strong> Follow up on action items you suggested</li>
          <li><strong>Prepare Resources:</strong> Gather relevant articles, tools, or contacts to share</li>
          <li><strong>Plan Structure:</strong> Think about conversation flow and topics to cover</li>
          <li><strong>Anticipate Needs:</strong> Consider common challenges they might face</li>
          <li><strong>Be Present:</strong> Set aside dedicated time to focus on messaging</li>
        </ul>

        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Golden Rule:</strong> Both parties should invest at least 15-30 minutes preparing for each conversation.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">During Your Conversation: Engagement</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Start Strong:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Begin messaging at the scheduled time</li>
          <li>Send a warm greeting to open the conversation</li>
          <li>Reference your discussion topics and adjust if needed</li>
          <li>Set expectations for what you'd like to accomplish</li>
          <li>Agree on desired outcomes</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Maintain Engagement:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Be Responsive:</strong> Reply thoughtfully and promptly during scheduled times</li>
          <li><strong>Ask Questions:</strong> Probe deeper to uncover root issues</li>
          <li><strong>Share Stories:</strong> Use relevant personal experiences in your messages</li>
          <li><strong>Encourage Dialogue:</strong> Make it conversational, not one-sided</li>
          <li><strong>Be Authentic:</strong> Share both successes and failures</li>
          <li><strong>Stay On Track:</strong> Gently redirect if the conversation drifts</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Effective Communication:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use clear, jargon-free language in your messages</li>
          <li>Check for understanding regularly</li>
          <li>Provide specific, actionable advice</li>
          <li>Balance praise with constructive feedback</li>
          <li>Use examples and analogies to illustrate points</li>
          <li>Encourage questions throughout the conversation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Conversation Structure & Time Management</h3>

        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">30-Minute Messaging Window:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat ml-4">
              <li>0-5 min: Greetings and topic review</li>
              <li>5-20 min: Main discussion and problem-solving</li>
              <li>20-25 min: Action items and key takeaways</li>
              <li>25-30 min: Next steps and closing</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">60-Minute Messaging Window:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat ml-4">
              <li>0-10 min: Check-in, progress review, topic setting</li>
              <li>10-40 min: Deep-dive discussions (2-3 topics)</li>
              <li>40-50 min: Action planning and resource sharing</li>
              <li>50-60 min: Recap, next conversation planning, closing</li>
            </ul>
          </div>
        </div>

        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Keep track of time to ensure balanced coverage of all topics during your messaging window.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Action-Oriented Outcomes</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Every conversation should end with clear action items:
        </p>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2">For Mentees:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Identify 2-3 specific actions to take before next conversation</li>
          <li>Set deadlines for each action item</li>
          <li>Clarify what success looks like for each task</li>
          <li>Note any resources or contacts to follow up on</li>
          <li>Document questions that arose for next conversation</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">For Mentors:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Share promised resources within 24 hours via message</li>
          <li>Make introductions to relevant contacts</li>
          <li>Provide follow-up materials or reading links</li>
          <li>Send summary of key points discussed</li>
          <li>Prepare accountability check-ins</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">After Your Conversation: Follow-Through</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2">Within 24 Hours:</h4>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Send thank you message to your mentor/mentee</li>
          <li>Share notes and key takeaways from the conversation</li>
          <li>Confirm action items and deadlines</li>
          <li>Provide any promised resources or contacts</li>
          <li>Schedule next messaging time if not already planned</li>
        </ol>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Ongoing Actions:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Work on assigned action items consistently</li>
          <li>Document progress and challenges</li>
          <li>Message with questions between scheduled times if needed</li>
          <li>Share wins and milestones as they happen</li>
          <li>Prepare updates for next conversation</li>
        </ul>

        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Accountability Matters:</strong> Following through on commitments builds trust and accelerates progress.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Common Conversation Pitfalls to Avoid</h3>

        <div className="space-y-3">
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Coming Unprepared</p>
            <p className="text-sm text-red-800 font-montserrat">
              Solution: Block 30 minutes before each conversation for preparation. Create a pre-conversation checklist.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Lack of Structure</p>
            <p className="text-sm text-red-800 font-montserrat">
              Solution: Always start with clear topics. Allocate time for each. Have a clear ending point.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">One-Sided Conversation</p>
            <p className="text-sm text-red-800 font-montserrat">
              Solution: Aim for balanced message exchange. Ask open-ended questions. Encourage participation.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">Vague Outcomes</p>
            <p className="text-sm text-red-800 font-montserrat">
              Solution: End with specific, measurable action items. Document them clearly. Set deadlines.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-red-900 mb-1">No Follow-Up</p>
            <p className="text-sm text-red-800 font-montserrat">
              Solution: Send recap within 24 hours. Check in on progress. Maintain momentum between conversations.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Advanced Communication Techniques</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2">GROW Model for Problem-Solving:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Goal:</strong> What do you want to achieve?</li>
          <li><strong>Reality:</strong> What's happening now?</li>
          <li><strong>Options:</strong> What could you do?</li>
          <li><strong>Will:</strong> What will you do?</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Active Reading and Responding:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Read messages carefully before responding</li>
          <li>Paraphrase to confirm understanding</li>
          <li>Ask clarifying questions</li>
          <li>Acknowledge emotions expressed in messages</li>
          <li>Take time to compose thoughtful responses</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Powerful Questions to Ask:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>"What would success look like?"</li>
          <li>"What's getting in your way?"</li>
          <li>"What have you tried so far?"</li>
          <li>"What would you do if you weren't afraid?"</li>
          <li>"What resources do you need?"</li>
          <li>"How will you know you've succeeded?"</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Measuring Conversation Effectiveness</h3>

        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Evaluate your conversations regularly using these criteria:
        </p>

        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Goal Achievement:</strong> Were conversation objectives met?</li>
          <li><strong>Action Items:</strong> Were specific next steps identified?</li>
          <li><strong>Engagement:</strong> Were both parties actively participating?</li>
          <li><strong>Value:</strong> Did both parties gain insights or progress?</li>
          <li><strong>Time Management:</strong> Was the messaging time used effectively?</li>
          <li><strong>Follow-Through:</strong> Are action items being completed?</li>
        </ul>

        <div className="bg-neutral-50 border border-neutral-200 p-3 rounded mt-3">
          <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Conversation Rating Framework:</p>
          <p className="text-sm text-neutral-700 font-montserrat">
            After each conversation, rate it 1-5 on the criteria above. If consistently scoring below 4, discuss
            adjustments with your mentor/mentee.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Adapting to Different Conversation Types</h3>

        <div className="space-y-3">
          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">First Conversation:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Focus on building rapport, setting expectations, discussing goals, and establishing communication norms.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Regular Conversations:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Review progress, tackle current challenges, provide guidance, and set new action items.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Crisis Conversations:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Listen first, ask questions, help analyze situation, provide perspective, and create action plan.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-primary-dark mb-1">Milestone Conversations:</p>
            <p className="text-sm text-neutral-700 font-montserrat">
              Celebrate achievements, reflect on growth, reassess goals, and plan next phase.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Communication Excellence Checklist</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Prepared topics shared in advance</li>
          <li>Clear objectives for the conversation</li>
          <li>Both parties actively engaged in messaging</li>
          <li>Structured time management during scheduled windows</li>
          <li>Specific, actionable outcomes defined</li>
          <li>Resources and contacts shared via messages</li>
          <li>Follow-up communication within 24 hours</li>
          <li>Progress tracking between conversations</li>
          <li>Regular effectiveness evaluation</li>
          <li>Continuous improvement mindset</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Communication Best Practices"
      category="Communication & Scheduling"
      description="Master the art of productive mentorship conversations with proven strategies for preparation, engagement, and follow-through."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'How to Schedule Messaging Time', href: '/help/schedule-session' },
        { title: 'Starting a Conversation', href: '/help/join-session' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' },
        { title: 'Making Your First Connection', href: '/help/first-connection' }
      ]}
    />
  )
}
