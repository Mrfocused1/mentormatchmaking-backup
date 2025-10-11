'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function CreateProfileArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Welcome to Profile Creation!',
        description: 'This interactive guide will walk you through creating your profile step by step. Click "Next" to begin.',
      }
    },
    {
      element: '#profile-edit-link',
      popover: {
        title: 'Access Profile Settings',
        description: 'Click on your profile icon in the header, then select "Edit Profile" from the dropdown menu.',
        side: 'bottom' as const
      }
    },
    {
      popover: {
        title: 'Complete All Sections',
        description: 'Fill out all required fields including your name, bio, expertise, and availability to create a compelling profile.',
      }
    },
    {
      popover: {
        title: 'Add a Professional Photo',
        description: 'Upload a clear, professional photo to increase trust and engagement with potential matches.',
      }
    },
    {
      popover: {
        title: 'You\'re All Set!',
        description: 'Once you save your profile, you\'ll be ready to start connecting with mentors or mentees!',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Getting Started</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Creating a compelling profile is the first step to finding the perfect mentor or mentee match.
          Your profile is your opportunity to showcase your expertise, goals, and personality.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Access Profile Settings</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Navigate to your profile settings by clicking on your profile icon in the top-right corner of the navigation bar,
          then select "Edit Profile" from the dropdown menu.
        </p>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> You can also access your profile settings from the dashboard by clicking the "Edit Profile" button.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Fill Out Required Information</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Complete all required fields marked with an asterisk (*). This includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Full Name:</strong> Your real name helps build trust</li>
          <li><strong>Professional Title:</strong> What you do or aspire to do</li>
          <li><strong>Company/Organization:</strong> Where you work or study</li>
          <li><strong>Location:</strong> Your general area (city/region)</li>
          <li><strong>Bio:</strong> A compelling summary of your background and goals (150-300 words)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Add Your Expertise and Interests</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Select relevant skills, expertise areas, and industries that represent your knowledge or learning interests:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>For Mentors:</strong> Highlight your areas of expertise and what you can teach</li>
          <li><strong>For Mentees:</strong> Specify what you want to learn and your current skill level</li>
          <li>Choose at least 3-5 skills to improve match accuracy</li>
          <li>Be specific - "React Development" is better than just "Programming"</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Set Your Availability</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Configure your availability preferences to help potential matches know when you're available:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Select your preferred days and times for sessions</li>
          <li>Choose your timezone for accurate scheduling</li>
          <li>Indicate your preferred session frequency (weekly, bi-weekly, monthly)</li>
          <li>Specify session duration preferences (30 min, 60 min, flexible)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Upload a Profile Photo</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          A professional photo increases trust and engagement. Follow these guidelines:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use a clear, recent photo of yourself</li>
          <li>Ensure good lighting and a professional appearance</li>
          <li>Face should be clearly visible</li>
          <li>Supported formats: JPG, PNG (max 5MB)</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Note:</strong> Profiles with photos receive 40% more engagement than those without.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Add Social Links (Optional)</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Connect your professional social media profiles to provide additional credibility:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>LinkedIn (highly recommended)</li>
          <li>Twitter/X</li>
          <li>Personal website or portfolio</li>
          <li>GitHub (for technical fields)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 7: Save and Publish</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Once you've completed all sections:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Review all your information for accuracy</li>
          <li>Click "Save Profile" to save your changes</li>
          <li>Ensure your profile visibility is set to "Public" to receive matches</li>
          <li>You'll receive a confirmation that your profile is live</li>
        </ol>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Pro Tips for a Great Profile</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Write in first person - it's more engaging and personal</li>
          <li>Be specific about your goals and what you're looking for</li>
          <li>Update your profile regularly to keep it current</li>
          <li>Proofread for spelling and grammar errors</li>
          <li>Show personality - let your authentic self shine through</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="How to Create Your Profile"
      category="Getting Started"
      description="Learn how to create a compelling profile that attracts the right mentors or mentees."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Editing Your Profile', href: '/help/edit-profile' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' },
        { title: 'Adding Skills and Expertise', href: '/help/add-skills' },
        { title: 'Getting Verified', href: '/help/get-verified' }
      ]}
    />
  )
}
