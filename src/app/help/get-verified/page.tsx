'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function GetVerifiedArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Profile Verification</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Get your profile verified to build trust, increase credibility, and improve your visibility on the platform. Verified users receive a badge and appear higher in search results.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Benefits of Verification</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Verified badge displayed on your profile</li>
          <li>Higher ranking in search results</li>
          <li>Increased trust from potential connections</li>
          <li>Priority in match recommendations</li>
          <li>Access to exclusive features</li>
          <li>75% higher connection acceptance rate</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Verification Requirements</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Identity Verification:</strong> Government-issued ID</li>
          <li><strong>Email Verification:</strong> Confirm your email address</li>
          <li><strong>Phone Verification:</strong> Verify phone number via SMS</li>
          <li><strong>Professional Verification:</strong> LinkedIn or work email</li>
          <li><strong>Complete Profile:</strong> 100% profile completion required</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Verification Process</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Settings → Verification</li>
          <li>Click "Start Verification"</li>
          <li>Upload required documents</li>
          <li>Complete identity verification (2-5 minutes)</li>
          <li>Verify email and phone number</li>
          <li>Connect professional accounts (optional but recommended)</li>
          <li>Submit for review</li>
          <li>Receive verification within 24-48 hours</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Types of Verification</h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-blue-900 mb-1">Basic Verification (Blue Badge)</p>
            <p className="text-sm text-blue-800 font-montserrat">Identity, email, and phone verified</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-green-900 mb-1">Professional Verification (Green Badge)</p>
            <p className="text-sm text-green-800 font-montserrat">Basic + LinkedIn/work email + credentials</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
            <p className="text-sm font-semibold font-montserrat text-purple-900 mb-1">Expert Verification (Purple Badge)</p>
            <p className="text-sm text-purple-800 font-montserrat">Professional + certifications + industry recognition</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Privacy & Security</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>All documents are encrypted and secure</li>
          <li>Information used only for verification</li>
          <li>Documents deleted after verification</li>
          <li>Compliant with data protection regulations</li>
          <li>Third-party verification service used</li>
        </ul>
      </div>

      <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
        <p className="text-sm font-montserrat text-primary-dark">
          <strong>Tip:</strong> Complete professional verification for maximum credibility and best match quality.
        </p>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Getting Verified"
      category="Profile Management"
      description="Learn how to get your profile verified to build trust and increase your credibility on the platform."
      content={content}
      relatedArticles={[
        { title: 'Editing Your Profile', href: '/help/edit-profile' },
        { title: 'Adding Skills and Expertise', href: '/help/add-skills' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' }
      ]}
    />
  )
}
