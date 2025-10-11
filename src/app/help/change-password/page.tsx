'use client'

import { HelpArticle } from '@/components/help/HelpArticle'

export default function ChangePasswordArticle() {
  const content = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">Changing Your Password</h2>
        <p className="text-neutral-700 font-montserrat leading-relaxed">
          Keep your account secure by using a strong password and updating it regularly. Learn how to change your password and follow best practices for account security.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">How to Change Password</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Click your profile icon → Settings</li>
          <li>Navigate to "Security" or "Account"</li>
          <li>Click "Change Password"</li>
          <li>Enter your current password</li>
          <li>Enter your new password</li>
          <li>Confirm new password</li>
          <li>Click "Save Changes"</li>
          <li>You'll be logged out and need to log back in</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Password Requirements</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Minimum 8 characters (12+ recommended)</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character (!@#$%^&*)</li>
          <li>Cannot be a previously used password</li>
          <li>Cannot contain your email or username</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Strong Password Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Use a unique password for this platform</li>
          <li>Consider using a passphrase (4+ random words)</li>
          <li>Use a password manager</li>
          <li>Avoid common words or patterns</li>
          <li>Don't use personal information</li>
          <li>Change password every 3-6 months</li>
          <li>Never share your password</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Forgot Password</h3>
        <ol className="list-decimal list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Go to login page</li>
          <li>Click "Forgot Password?"</li>
          <li>Enter your email address</li>
          <li>Check email for reset link</li>
          <li>Click link (valid for 1 hour)</li>
          <li>Create new password</li>
          <li>Log in with new password</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Security Alerts</h3>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Email confirmation sent on password change</li>
          <li>Notification if password changed from new device</li>
          <li>Alert if multiple failed login attempts</li>
          <li>Warning if password appears in known breaches</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">Two-Factor Authentication</h3>
        <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
          Add extra security beyond your password:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
          <li>Enable 2FA in Security Settings</li>
          <li>Choose SMS, authenticator app, or email</li>
          <li>Backup codes provided for emergencies</li>
          <li>Required for sensitive actions</li>
        </ul>
      </div>

      <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
        <h4 className="text-lg font-bold font-montserrat text-neutral-800 mb-2">Compromised Account?</h4>
        <p className="text-sm text-neutral-800 font-montserrat mb-2">
          If you suspect your account is compromised:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-neutral-800 font-montserrat ml-4">
          <li>Change password immediately</li>
          <li>Enable two-factor authentication</li>
          <li>Review active sessions and log out all</li>
          <li>Check account activity for unauthorized actions</li>
          <li>Contact support@platform.com</li>
        </ol>
      </div>
    </div>
  )

  return (
    <HelpArticle
      title="Changing Your Password"
      category="Account Settings"
      description="Learn how to change your password and maintain strong account security with best practices."
      content={content}
      relatedArticles={[
        { title: 'Privacy Settings', href: '/help/privacy-settings' },
        { title: 'Safety Guidelines', href: '/help/safety-guidelines' },
        { title: 'Deactivating Your Account', href: '/help/deactivate-account' },
        { title: 'Email Preferences', href: '/help/email-preferences' }
      ]}
    />
  )
}
