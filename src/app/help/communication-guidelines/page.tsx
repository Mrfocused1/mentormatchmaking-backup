'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function CommunicationGuidelinesArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Communication Guidelines',
        description: 'Learn the best practices for professional and effective communication on our platform.',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Professional Communication Standards</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Effective communication is the foundation of successful mentorship relationships. These guidelines
          help ensure all interactions on our platform are respectful, professional, and productive for
          everyone involved.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Core Communication Principles</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Respect:</strong> Treat everyone with courtesy and professionalism</li>
          <li><strong>Clarity:</strong> Communicate clearly and avoid ambiguity</li>
          <li><strong>Timeliness:</strong> Respond within reasonable timeframes</li>
          <li><strong>Honesty:</strong> Be truthful and authentic in your interactions</li>
          <li><strong>Confidentiality:</strong> Keep private conversations private</li>
          <li><strong>Professionalism:</strong> Maintain appropriate boundaries</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Response Time Expectations</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Initial messages:</strong> Respond within 48 hours</li>
          <li><strong>Active conversations:</strong> Respond within 24 hours</li>
          <li><strong>Session-related:</strong> Respond within 12 hours</li>
          <li><strong>Urgent matters:</strong> Respond as soon as possible</li>
          <li>Set au when unavailable for extended periods</li>
          <li>Communicate your typical response time in your profile</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Professional Language Guidelines</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">DO:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use proper grammar and punctuation</li>
          <li>Address people by their preferred name</li>
          <li>Be concise while being thorough</li>
          <li>Use inclusive language</li>
          <li>Proofread before sending</li>
          <li>Acknowledge receipt of important messages</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">DON'T:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use offensive or discriminatory language</li>
          <li>Write in all caps (it's considered shouting)</li>
          <li>Use excessive abbreviations or text speak</li>
          <li>Share confidential information without permission</li>
          <li>Make assumptions about others</li>
          <li>Send messages when emotional - take time to cool down</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Establishing Boundaries</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Clearly communicate your availability and preferences</li>
          <li>Set expectations about response times</li>
          <li>Define topics you're comfortable discussing</li>
          <li>Establish preferred communication channels</li>
          <li>Respect others' boundaries and preferences</li>
          <li>It's okay to say no or decline requests politely</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Handling Difficult Conversations</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Address issues directly but diplomatically</li>
          <li>Use "I" statements instead of "you" accusations</li>
          <li>Focus on specific behaviors, not personal attacks</li>
          <li>Listen actively and seek to understand</li>
          <li>Take breaks if conversations become heated</li>
          <li>Involve platform support if needed for mediation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Prohibited Behavior</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm font-semibold font-montserrat text-red-900 mb-2">The following are strictly prohibited:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
            <li>Harassment, bullying, or intimidation</li>
            <li>Discrimination based on any protected characteristic</li>
            <li>Sexual harassment or inappropriate advances</li>
            <li>Spam or unsolicited commercial messages</li>
            <li>Sharing others' personal information without consent</li>
            <li>Impersonation or misrepresentation</li>
            <li>Threatening or violent language</li>
            <li>Soliciting money or financial information</li>
          </ul>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Communication Excellence Checklist</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Messages are clear, concise, and well-structured</li>
          <li>Tone is professional yet friendly</li>
          <li>Response times meet platform standards</li>
          <li>Boundaries are clearly communicated and respected</li>
          <li>Feedback is constructive and specific</li>
          <li>Confidentiality is maintained</li>
          <li>Difficult conversations are handled diplomatically</li>
          <li>All interactions comply with platform guidelines</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Communication Guidelines"
      category="Messaging & Communication"
      description="Learn the professional communication standards and best practices for successful mentorship interactions."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Sending Your First Message', href: '/help/send-message' },
        { title: 'Managing Your Conversations', href: '/help/manage-conversations' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Reporting Inappropriate Behavior', href: '/help/report-behavior' }
      ]}
    />
  )
}
