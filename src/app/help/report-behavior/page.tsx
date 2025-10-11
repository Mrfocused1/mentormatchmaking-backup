'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function ReportBehaviorArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Reporting Inappropriate Behavior</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          We take all reports seriously and investigate each one thoroughly. Your reports help us maintain a safe, respectful community for everyone. Reporting is confidential and protected.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What to Report</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Harassment or bullying</li>
          <li>Inappropriate or sexual content</li>
          <li>Hate speech or discrimination</li>
          <li>Threats or violence</li>
          <li>Scams or fraud attempts</li>
          <li>Impersonation</li>
          <li>Spam or unwanted commercial messages</li>
          <li>Privacy violations</li>
          <li>Any behavior violating community guidelines</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Report</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Report a User:</h4>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to the user's profile</li>
          <li>Click the three-dot menu</li>
          <li>Select "Report User"</li>
          <li>Choose reason for report</li>
          <li>Provide details and evidence</li>
          <li>Submit report</li>
        </ol>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Report a Message:</h4>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Open the conversation</li>
          <li>Long-press or right-click the message</li>
          <li>Select "Report Message"</li>
          <li>Choose violation type</li>
          <li>Add context if needed</li>
          <li>Submit report</li>
        </ol>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Report a Session Issue:</h4>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to session history</li>
          <li>Find the relevant session</li>
          <li>Click "Report Issue"</li>
          <li>Describe what happened</li>
          <li>Attach evidence if available</li>
          <li>Submit for review</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What Happens After You Report</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Immediate Acknowledgment:</strong> You receive confirmation of your report</li>
          <li><strong>Review Process:</strong> Safety team reviews within 24 hours</li>
          <li><strong>Investigation:</strong> Team gathers evidence and context</li>
          <li><strong>Action Taken:</strong> Appropriate measures based on severity</li>
          <li><strong>Follow-Up:</strong> You're notified of the outcome</li>
          <li><strong>Appeal Process:</strong> Reported user can appeal decisions</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Possible Actions</h3>
        <div className="space-y-2">
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Warning:</strong> First-time minor violations</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Temporary Suspension:</strong> Repeated or moderate violations</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Permanent Ban:</strong> Serious or repeated violations</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Legal Action:</strong> Criminal behavior or threats</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Evidence to Include</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Screenshots of messages or profiles</li>
          <li>Specific dates and times</li>
          <li>Description of what occurred</li>
          <li>Any witnesses or documentation</li>
          <li>Previous incidents with same user</li>
          <li>Impact on you or others</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Your Rights and Protections</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Confidentiality:</strong> Your identity is protected</li>
          <li><strong>No Retaliation:</strong> Protected from retaliation</li>
          <li><strong>Support:</strong> Access to support resources</li>
          <li><strong>Updates:</strong> Kept informed of investigation progress</li>
          <li><strong>Appeal:</strong> Right to appeal any decisions</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Anonymous Reporting</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          You can submit anonymous reports for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>General safety concerns</li>
          <li>Platform misuse observations</li>
          <li>Community guideline violations</li>
          <li>Note: Anonymous reports may be harder to investigate</li>
        </ul>
      </div>

      <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
        <p className="text-sm font-montserrat text-neutral-800">
          <strong>False Reports:</strong> Submitting false reports is a violation of our terms of service and may result in account suspension.
        </p>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Immediate Danger</h4>
        <p className="text-sm text-neutral-700 font-montserrat mb-2">
          If you're in immediate danger:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Call local emergency services (911 in US)</li>
          <li>Remove yourself from the situation</li>
          <li>Then report to platform safety team</li>
          <li>Document everything for authorities</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Reporting Inappropriate Behavior"
      category="Safety & Privacy"
      description="Learn how to report violations, inappropriate behavior, and safety concerns to keep our community safe."
      content={content}
      relatedArticles={[
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Blocking Users', href: '/help/block-users' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' }
      ]}
    />
  )
}
