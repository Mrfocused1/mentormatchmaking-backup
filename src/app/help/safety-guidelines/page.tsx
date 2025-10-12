'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function SafetyGuidelinesArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Your Safety is Our Priority</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          We're committed to providing a safe environment for all users. Follow these guidelines to protect yourself and maintain a positive mentorship experience.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">General Safety Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Keep initial conversations on the platform</li>
          <li>Trust your instincts - if something feels wrong, it probably is</li>
          <li>Never share financial information or send money</li>
          <li>Protect your personal information (address, phone, etc.)</li>
          <li>Use platform's video calling for virtual sessions</li>
          <li>Report suspicious behavior immediately</li>
          <li>Meet in public places for in-person sessions</li>
          <li>Tell someone where you're going for meetings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Protecting Personal Information</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Don't Share:</strong> Home address, full phone number, financial details</li>
          <li><strong>Limit Sharing:</strong> Social media profiles until trust is established</li>
          <li><strong>Be Cautious:</strong> With photos that show identifying information</li>
          <li><strong>Use Platform Tools:</strong> Built-in messaging and video</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Red Flags to Watch For</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm font-semibold font-montserrat text-red-900 mb-2">Warning Signs:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-800 font-montserrat ml-4">
            <li>Requests for money or financial information</li>
            <li>Pressure to move off-platform immediately</li>
            <li>Inappropriate or sexual content</li>
            <li>Aggressive or threatening behavior</li>
            <li>Too good to be true promises or guarantees</li>
            <li>Inconsistent information or stories</li>
            <li>Refusing video calls or photo verification</li>
            <li>Overly personal questions early on</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Safe Virtual Sessions</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use platform's integrated video calling</li>
          <li>Keep sessions professional and on-topic</li>
          <li>Record sessions if both parties agree (and it's allowed)</li>
          <li>Have a safe word or way to exit uncomfortable situations</li>
          <li>Don't feel obligated to continue if uncomfortable</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Safe In-Person Meetings</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Meet in public, well-lit locations</li>
          <li>Tell a friend or family member where you're going</li>
          <li>Share meeting details with someone you trust</li>
          <li>Arrange your own transportation</li>
          <li>Meet during daytime hours initially</li>
          <li>Trust your gut - leave if you feel unsafe</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">What to Do If You Feel Unsafe</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>End the conversation or session immediately</li>
          <li>Block the user on the platform</li>
          <li>Report the incident to platform support</li>
          <li>Document what happened (screenshots, messages)</li>
          <li>Contact local authorities if threats were made</li>
          <li>Reach out to platform safety team for assistance</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Platform Safety Features</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>User verification system</li>
          <li>Report and block functionality</li>
          <li>24/7 safety team support</li>
          <li>Encrypted messaging</li>
          <li>Session monitoring and recording options</li>
          <li>Privacy controls and settings</li>
          <li>Community guidelines enforcement</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Emergency Contact</h4>
        <p className="text-sm text-neutral-700 font-montserrat mb-2">
          If you experience harassment, threats, or feel unsafe:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Email: safety@mentorplatform.com</li>
          <li>Emergency hotline: Available in app</li>
          <li>Report button: On every profile and message</li>
          <li>Contact form: Available 24/7 on our contact page</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Safety Guidelines"
      category="Safety & Privacy"
      description="Essential safety guidelines to protect yourself and maintain a secure mentorship experience on our platform."
      content={content}
      relatedArticles={[
        { title: 'Reporting Inappropriate Behavior', href: '/help/report-behavior' },
        { title: 'Blocking Users', href: '/help/block-users' },
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' }
      ]}
    />
  )
}
