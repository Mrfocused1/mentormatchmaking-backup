'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function FindingMentorOrMenteeArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Welcome to Match Discovery!',
        description: 'This interactive guide will show you how to find the perfect mentor or mentee. Click "Next" to begin.',
      }
    },
    {
      element: '#search-bar',
      popover: {
        title: 'Use the Search Feature',
        description: 'Start by entering keywords related to skills, expertise, or industries you\'re interested in.',
        side: 'bottom' as const
      }
    },
    {
      element: '#filters-panel',
      popover: {
        title: 'Apply Filters',
        description: 'Narrow down results using filters like location, experience level, availability, and more.',
        side: 'left' as const
      }
    },
    {
      element: '#match-results',
      popover: {
        title: 'Browse Matches',
        description: 'Review potential matches and read their profiles to find the best fit for your goals.',
        side: 'top' as const
      }
    },
    {
      popover: {
        title: 'Ready to Connect!',
        description: 'Once you find someone interesting, click "Send Message" or "Request Connection" to get started!',
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Finding Your Perfect Match</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Finding the right mentor or mentee is crucial for a successful mentorship relationship. Our platform
          uses advanced matching algorithms combined with powerful search tools to help you discover the perfect
          match based on your goals, skills, and preferences.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 1: Define Your Goals</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Before starting your search, take time to clarify what you're looking for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>For Mentees:</strong> What specific skills or knowledge do you want to gain?</li>
          <li><strong>For Mentors:</strong> What areas are you passionate about teaching?</li>
          <li>What's your preferred commitment level? (casual, regular, intensive)</li>
          <li>What format works best for you? (virtual, in-person, hybrid)</li>
          <li>What's your ideal meeting frequency? (weekly, bi-weekly, monthly)</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Write down your top 3 goals before you start searching. This helps you stay focused on finding the right match.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 2: Use Smart Search</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Navigate to the "Find Mentors" or "Find Mentees" page and use our search tools:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Keyword Search:</strong> Enter specific skills, industries, or job titles</li>
          <li><strong>Location Filter:</strong> Find people in your area or search globally</li>
          <li><strong>Availability Filter:</strong> Match your schedule with theirs</li>
          <li><strong>Experience Level:</strong> Filter by years of experience or seniority</li>
          <li><strong>Session Format:</strong> Choose virtual, in-person, or flexible options</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 3: Review AI-Suggested Matches</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Our AI matching system analyzes your profile and preferences to suggest highly compatible matches:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Check your dashboard for personalized recommendations</li>
          <li>Match scores indicate compatibility (85%+ is excellent)</li>
          <li>Review the "Why This Match?" section for compatibility insights</li>
          <li>Matches are updated weekly based on activity and preferences</li>
        </ul>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> The more complete your profile, the better your AI matches will be. Take time to fill out all sections!
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 4: Evaluate Profiles</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          When reviewing potential matches, look for these key indicators:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Profile Completeness:</strong> Complete profiles show commitment</li>
          <li><strong>Relevant Experience:</strong> Check their background aligns with your goals</li>
          <li><strong>Communication Style:</strong> Read their bio to gauge personality fit</li>
          <li><strong>Availability:</strong> Ensure schedules are compatible</li>
          <li><strong>Reviews & Ratings:</strong> Check feedback from previous connections</li>
          <li><strong>Verification Badge:</strong> Verified users have confirmed identities</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 5: Save and Compare Favorites</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Use the favorites feature to organize your search:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click the star icon to save profiles for later</li>
          <li>Access your favorites from your dashboard</li>
          <li>Compare up to 5 profiles side-by-side</li>
          <li>Add notes to remember why you saved each person</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Step 6: Reach Out</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Once you've identified potential matches:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Send a personalized connection request or message</li>
          <li>Mention specific aspects of their profile that interest you</li>
          <li>Clearly state your goals and what you hope to achieve</li>
          <li>Be professional but authentic in your approach</li>
          <li>Don't send identical messages to multiple people</li>
        </ol>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Important:</strong> Quality over quantity - it's better to send 3 thoughtful messages than 20 generic ones.
          </p>
        </div>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Red Flags to Watch For</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Incomplete profiles with minimal information</li>
          <li>Requests for payment or financial information</li>
          <li>Pushing to communicate off-platform immediately</li>
          <li>Negative reviews or low ratings</li>
          <li>Overly aggressive or unprofessional communication</li>
          <li>Promises of guaranteed outcomes or quick results</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Common Search Strategies</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Try these proven approaches:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Industry-Specific:</strong> Search by your target industry or role</li>
          <li><strong>Skill-Based:</strong> Focus on specific technical or soft skills</li>
          <li><strong>Career Stage:</strong> Find mentors 2-3 stages ahead of you</li>
          <li><strong>Geographic:</strong> Connect with local professionals for in-person options</li>
          <li><strong>Company-Based:</strong> Target professionals from your dream companies</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Finding the Right Mentor or Mentee"
      category="Getting Started"
      description="Discover effective strategies to find your ideal mentor or mentee match on our platform."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Making Your First Connection', href: '/help/first-connection' },
        { title: 'How to Create Your Profile', href: '/help/create-profile' },
        { title: 'Sending Your First Message', href: '/help/send-message' },
        { title: 'Profile Visibility Settings', href: '/help/profile-visibility' }
      ]}
    />
  )
}
