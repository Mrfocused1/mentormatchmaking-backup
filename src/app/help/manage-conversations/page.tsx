'use client'

export const dynamic = 'force-dynamic'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function ManageConversationsArticle() {
  const interactiveSteps = [
    {
      popover: {
        title: 'Manage Your Conversations!',
        description: 'Learn how to organize and manage all your mentorship conversations effectively.',
      }
    },
    {
      element: '#messages-inbox',
      popover: {
        title: 'Your Inbox',
        description: 'Access all your conversations from the messages tab in the navigation.',
        side: 'right' as const
      }
    },
    {
      element: '#conversation-filters',
      popover: {
        title: 'Filter Conversations',
        description: 'Use filters to sort by unread, archived, favorites, or search for specific people.',
        side: 'left' as const
      }
    },
    {
      element: '#conversation-actions',
      popover: {
        title: 'Conversation Actions',
        description: 'Archive, star, mute, or delete conversations using the action menu.',
        side: 'bottom' as const
      }
    }
  ]

  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Organizing Your Messages</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          As you build mentorship connections, managing multiple conversations becomes essential. This guide
          will help you organize, prioritize, and efficiently handle all your messaging to ensure no important
          conversation falls through the cracks.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Accessing Your Conversations</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Find your messages in multiple ways:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click the Messages icon in the main navigation</li>
          <li>Use keyboard shortcut: Cmd/Ctrl + M</li>
          <li>Access from dashboard quick links</li>
          <li>Click on message notifications</li>
          <li>View recent conversations in the sidebar</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Inbox Organization</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Your inbox is organized into several sections:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Primary:</strong> All active conversations</li>
          <li><strong>Unread:</strong> Messages you haven't opened yet</li>
          <li><strong>Starred:</strong> Important conversations you've marked</li>
          <li><strong>Archived:</strong> Conversations you've archived but want to keep</li>
          <li><strong>Requests:</strong> New connection requests pending response</li>
          <li><strong>Sent:</strong> Messages you've initiated</li>
        </ul>
        <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Tip:</strong> Use the tab view to quickly switch between conversation types and stay organized.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Filtering and Searching</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Find conversations quickly using these tools:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Search Bar:</strong> Search by name, keyword, or message content</li>
          <li><strong>Filter by Status:</strong> Active, pending, completed relationships</li>
          <li><strong>Filter by Role:</strong> Mentors, mentees, or peers</li>
          <li><strong>Date Filter:</strong> Recent, this week, this month, older</li>
          <li><strong>Tag Filter:</strong> Custom tags you've created</li>
          <li><strong>Attachment Filter:</strong> Conversations with files or links</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Conversation Actions</h3>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Star/Favorite:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click the star icon to mark important conversations</li>
          <li>Starred conversations appear at the top of your inbox</li>
          <li>Quickly access via "Starred" filter</li>
          <li>Use for active mentorships or priority connections</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Archive:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Archive completed or inactive conversations</li>
          <li>Keeps your inbox clean without deleting</li>
          <li>Archived chats can be searched and retrieved</li>
          <li>New messages from archived contacts unarchive automatically</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Mute:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Mute notifications for specific conversations</li>
          <li>Messages still appear in inbox but without alerts</li>
          <li>Useful for group chats or less urgent contacts</li>
          <li>Unmute anytime from conversation settings</li>
        </ul>

        <h4 className="text-lg font-semibold font-montserrat text-primary-dark mb-2 mt-4">Delete:</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Permanently remove conversations</li>
          <li>Cannot be recovered after deletion</li>
          <li>Use with caution for spam or unwanted messages</li>
          <li>Consider archiving instead for important history</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Using Labels and Tags</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Create custom tags to organize conversations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click "Add Tag" on any conversation</li>
          <li>Create tags like "Career Change", "Technical", "Networking"</li>
          <li>Apply multiple tags to one conversation</li>
          <li>Filter inbox by tag for quick access</li>
          <li>Color-code tags for visual organization</li>
          <li>Edit or delete tags anytime from settings</li>
        </ul>
        <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-primary-dark">
            <strong>Pro Tip:</strong> Create tags for different mentorship goals to easily track progress across conversations.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Managing Notifications</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Control how you're notified about messages:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Per Conversation:</strong> Customize notifications for each chat</li>
          <li><strong>Priority Contacts:</strong> Set VIP notifications for important mentors</li>
          <li><strong>Quiet Hours:</strong> Disable notifications during specific times</li>
          <li><strong>Desktop Alerts:</strong> Toggle browser notifications</li>
          <li><strong>Email Digest:</strong> Receive daily/weekly message summaries</li>
          <li><strong>Mobile Push:</strong> Configure app notifications</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Message Thread Features</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Inside each conversation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>Pin Messages:</strong> Pin important messages to top of thread</li>
          <li><strong>React to Messages:</strong> Use emoji reactions for quick responses</li>
          <li><strong>Reply to Specific:</strong> Quote and reply to specific messages</li>
          <li><strong>Edit Messages:</strong> Edit sent messages within 15 minutes</li>
          <li><strong>Delete Messages:</strong> Remove messages you sent</li>
          <li><strong>Search in Thread:</strong> Find specific content within conversation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Conversation Settings</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Access settings via the three-dot menu in each conversation:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li><strong>View Profile:</strong> Quick access to their full profile</li>
          <li><strong>Schedule Session:</strong> Book a meeting directly from chat</li>
          <li><strong>Share Files:</strong> Upload documents, images, or links</li>
          <li><strong>Export Chat:</strong> Download conversation history</li>
          <li><strong>Report/Block:</strong> Safety options if needed</li>
          <li><strong>End Relationship:</strong> Formally conclude mentorship</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Bulk Actions</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Manage multiple conversations at once:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Select multiple conversations using checkboxes</li>
          <li>Archive all selected conversations</li>
          <li>Apply tags to multiple chats simultaneously</li>
          <li>Mark multiple as read/unread</li>
          <li>Delete multiple conversations (use carefully)</li>
          <li>Export selected conversations</li>
        </ul>
        <div className="bg-warning/10 border-l-4 border-warning p-4 rounded mt-3">
          <p className="text-sm font-montserrat text-neutral-800">
            <strong>Caution:</strong> Bulk delete cannot be undone. Consider archiving instead for important conversations.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Quick Reply Tips</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Respond efficiently to messages:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use saved replies for common questions</li>
          <li>Create message templates for consistency</li>
          <li>Enable typing indicators so others know you're responding</li>
          <li>Use keyboard shortcuts for faster navigation</li>
          <li>Preview messages before sending</li>
          <li>Schedule messages to send later</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Keyboard Shortcuts</h3>
        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg space-y-2">
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Cmd/Ctrl + M:</strong> Open messages</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Cmd/Ctrl + F:</strong> Search conversations</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Cmd/Ctrl + N:</strong> New message</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>E:</strong> Archive conversation</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>S:</strong> Star/unstar conversation</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>↑↓:</strong> Navigate conversations</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Enter:</strong> Open selected conversation</p>
          <p className="text-sm text-neutral-700 font-montserrat"><strong>Esc:</strong> Close conversation</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Best Practices for Organization</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Archive conversations weekly to keep inbox manageable</li>
          <li>Star your 3-5 most important active mentorships</li>
          <li>Use tags consistently across similar conversations</li>
          <li>Respond to messages within 24-48 hours when possible</li>
          <li>Mark messages as unread if you need to follow up later</li>
          <li>Set up filters for different types of conversations</li>
          <li>Review and clean up conversations monthly</li>
          <li>Export important conversations for record keeping</li>
        </ul>
      </div>

      <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-6 rounded-lg">
        <h4 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Inbox Zero Strategy</h4>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Process messages at specific times (morning, lunch, evening)</li>
          <li>Respond, archive, or flag each message - don't leave in limbo</li>
          <li>Use starred for "needs response" items</li>
          <li>Archive immediately after resolving conversations</li>
          <li>Unsubscribe from unnecessary group chats</li>
          <li>Set expectations about response times in your profile</li>
          <li>Use au when unavailable</li>
          <li>Review weekly to ensure nothing is overlooked</li>
        </ul>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Managing Your Conversations"
      category="Messaging & Communication"
      description="Learn how to organize, filter, and efficiently manage all your mentorship conversations in one place."
      content={content}
      interactiveSteps={interactiveSteps}
      relatedArticles={[
        { title: 'Sending Your First Message', href: '/help/send-message' },
        { title: 'Notification Settings', href: '/help/notification-settings' },
        { title: 'Communication Guidelines', href: '/help/communication-guidelines' },
        { title: 'Editing Your Profile', href: '/help/edit-profile' }
      ]}
    />
  )
}
