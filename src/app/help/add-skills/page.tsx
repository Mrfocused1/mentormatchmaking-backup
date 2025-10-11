'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function AddSkillsArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Add Your Skills!',
        description: 'Learn how to add and manage skills to improve your match recommendations.',
      }
    },
    {
      element: '#skills-section',
      popover: {
        title: 'Skills Section',
        description: 'Navigate to the Skills section in your profile editor.',
        side: 'right' as const
      }
    },
    {
      element: '#add-skill-button',
      popover: {
        title: 'Add New Skill',
        description: 'Click "Add Skill" and search or create your skills.',
        side: 'bottom' as const
      }
    },
    {
      element: '#skill-level',
      popover: {
        title: 'Set Proficiency',
        description: 'Indicate your proficiency level for each skill.',
        side: 'left' as const
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Showcasing Your Expertise</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Adding skills and expertise to your profile is crucial for accurate matching. The platform uses your
          skills to connect you with the right mentors or mentees based on what you know and what you want to learn.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Add Skills</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to Edit Profile → Skills & Expertise</li>
          <li>Click "Add Skill" button</li>
          <li>Search existing skills or create new ones</li>
          <li>Select proficiency level (Beginner, Intermediate, Advanced, Expert)</li>
          <li>Choose if you want to mentor/learn this skill</li>
          <li>Add endorsements or certifications (optional)</li>
          <li>Save changes</li>
        </ol>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Add at least 5-7 skills for optimal matching. Include both technical and soft skills.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Skill Categories</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Technical Skills:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Programming languages (Python, JavaScript, Java, etc.)</li>
          <li>Tools and platforms (AWS, Docker, Figma, etc.)</li>
          <li>Frameworks and libraries (React, Django, TensorFlow, etc.)</li>
          <li>Data analysis and visualization</li>
          <li>Design and creative tools</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Soft Skills:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Leadership and management</li>
          <li>Communication and presentation</li>
          <li>Problem-solving and critical thinking</li>
          <li>Project management</li>
          <li>Team collaboration</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Industry Knowledge:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Domain expertise (Healthcare, Finance, Education, etc.)</li>
          <li>Regulatory knowledge</li>
          <li>Market understanding</li>
          <li>Best practices and methodologies</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Proficiency Levels</h3>
        <div className="space-y-2">
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Beginner:</strong> Learning the basics, less than 1 year experience</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Intermediate:</strong> Working knowledge, 1-3 years experience</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Advanced:</strong> Deep expertise, 3-5 years experience</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Expert:</strong> Industry leader, 5+ years, can teach others</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Skill Endorsements</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Other users can endorse your skills</li>
          <li>Endorsements build credibility</li>
          <li>Request endorsements from past mentees/mentors</li>
          <li>Return endorsements to support your connections</li>
          <li>Verified skills show a badge on your profile</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Managing Skills</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Edit:</strong> Update proficiency levels as you grow</li>
          <li><strong>Reorder:</strong> Drag to prioritize most relevant skills</li>
          <li><strong>Remove:</strong> Delete outdated or irrelevant skills</li>
          <li><strong>Hide:</strong> Make certain skills private if needed</li>
          <li><strong>Feature:</strong> Highlight top 3 skills on profile</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Skills Best Practices</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Be honest about your proficiency levels</li>
          <li>Keep skills current - update as you learn</li>
          <li>Be specific (e.g., "React Native" vs "Mobile Development")</li>
          <li>Include both what you know and want to learn</li>
          <li>Add certifications and proof when available</li>
          <li>Balance technical and soft skills</li>
          <li>Regularly review and update your skill list</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Skill Matching Algorithm</h4>
        <p className="text-sm text-neutral-700 font-montserrat mb-2">
          Our AI matches you based on:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Skills you want to teach vs. skills others want to learn</li>
          <li>Complementary skill levels</li>
          <li>Related or adjacent skills</li>
          <li>Industry and domain overlap</li>
          <li>Learning paths and career trajectories</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Adding Skills and Expertise"
      category="Profile Management"
      description="Learn how to add, manage, and showcase your skills to improve match quality and attract the right connections."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Editing Your Profile', href: '/help/edit-profile' },
        { title: 'Getting Verified', href: '/help/get-verified' },
        { title: 'Finding the Right Mentor or Mentee', href: '/help/finding-mentor-or-mentee' },
        { title: 'How to Create Your Profile', href: '/help/create-profile' }
      ]}
    />
  )
}
