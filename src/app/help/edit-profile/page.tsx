'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function EditProfileArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Edit Your Profile!',
        description: 'Learn how to update and optimize your profile for better matches.',
      }
    },
    {
      element: '#profile-menu',
      popover: {
        title: 'Access Profile',
        description: 'Click your profile icon and select "Edit Profile".',
        side: 'bottom' as const
      }
    },
    {
      element: '#profile-sections',
      popover: {
        title: 'Update Sections',
        description: 'Edit any section by clicking the edit icon next to it.',
        side: 'right' as const
      }
    },
    {
      element: '#save-button',
      popover: {
        title: 'Save Changes',
        description: 'Click "Save" to update your profile. Changes are visible immediately.',
        side: 'top' as const
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Keeping Your Profile Current</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Your profile is your digital first impression. Regular updates ensure you attract the right matches
          and accurately represent your current skills, goals, and availability. Learn how to make impactful
          edits that enhance your mentorship opportunities.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Accessing Profile Editor</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click your profile icon in the top-right corner</li>
          <li>Select "Edit Profile" from dropdown</li>
          <li>Or navigate to Settings → Profile</li>
          <li>Changes save automatically or click "Save" button</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Editable Profile Sections</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Basic Information:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Profile Photo:</strong> Update to recent, professional image</li>
          <li><strong>Display Name:</strong> How others see you on the platform</li>
          <li><strong>Headline:</strong> Brief professional title or tagline</li>
          <li><strong>Location:</strong> City, region, or "Remote"</li>
          <li><strong>Time Zone:</strong> Ensure accurate for scheduling</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Professional Details:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Current Role:</strong> Your job title and company</li>
          <li><strong>Industry:</strong> Primary industry or field</li>
          <li><strong>Experience Level:</strong> Years of experience</li>
          <li><strong>Education:</strong> Relevant degrees or certifications</li>
          <li><strong>Career Stage:</strong> Entry, mid-level, senior, executive</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">About & Bio:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Bio:</strong> 150-300 word professional summary</li>
          <li><strong>Mentorship Goals:</strong> What you want to learn or teach</li>
          <li><strong>Interests:</strong> Professional and personal interests</li>
          <li><strong>Values:</strong> What matters to you professionally</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Profile Optimization Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Update profile at least monthly</li>
          <li>Complete all sections for better match accuracy</li>
          <li>Use keywords relevant to your field</li>
          <li>Highlight recent achievements</li>
          <li>Keep availability current</li>
          <li>Add specific, measurable accomplishments</li>
          <li>Use active voice in your bio</li>
          <li>Include what makes you unique</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Photo Guidelines</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use recent photo (within last year)</li>
          <li>Professional appearance and background</li>
          <li>Good lighting and clear image</li>
          <li>Face clearly visible</li>
          <li>Appropriate business casual or professional attire</li>
          <li>Supported formats: JPG, PNG, HEIC</li>
          <li>Recommended size: 400x400px minimum</li>
          <li>Maximum file size: 5MB</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">When to Update Your Profile</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>New job or promotion</li>
          <li>Completed certification or degree</li>
          <li>Changed career goals</li>
          <li>Availability changes</li>
          <li>New skills acquired</li>
          <li>Location change</li>
          <li>Updated professional photo</li>
          <li>Quarterly profile refresh</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Profile Completeness Matters</h4>
        <p className="text-sm text-neutral-700 font-montserrat mb-2">
          Complete profiles receive 60% more match recommendations and 40% more connection requests.
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Aim for 100% profile completion</li>
          <li>Check completion percentage in profile settings</li>
          <li>Platform highlights incomplete sections</li>
          <li>Add missing information to improve visibility</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Editing Your Profile"
      category="Profile Management"
      description="Learn how to update and optimize your profile to attract better matches and showcase your expertise."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'How to Create Your Profile', href: '/help/create-profile' },
        { title: 'Adding Skills and Expertise', href: '/help/add-skills' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Getting Verified', href: '/help/get-verified' }
      ]}
    />
  )
}
